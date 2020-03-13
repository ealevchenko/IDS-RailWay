jQuery(document).ready(function ($) {
    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                'field_train': '№ поезда',
                'field_composition_index': 'Индекс поезда',
                'field_date_arrival': 'Время прибытия',
                'field_date_adoption': 'Время приема',
                'field_date_adoption_act': 'Время приема по акту',
                'field_station_from': 'Отправлено со станции',
                'field_station_on': 'Принят на станцию',
                'field_way': 'Принят на путь',
                'field_num_doc': '№ Ведомости',
                'field_count': 'Кол. вагонов',
                'field_status': 'Статус состава',
                'field_create': 'Строка создана',
                'field_create_user': 'Создал',
                'field_change': 'Строка изменена',
                'field_change_user': 'Правил',
                'field_create_sostav': 'Добавил',
                'field_change_sostav': 'Правил',
                'title_button_buffer': 'Буфер',
                'title_button_excel': 'Excel',
                'title_button_field': 'Поля',
                'title_button_field_all': 'Все поля',
                'title_button_add': 'Добавить',
                'title_button_edit': 'Изменить',
                'title_button_del': 'Удалить(Отклонить)',
            },
            'en':  //default language: English
            {
                'field_train': '# train',
            }
        };

    //================================================================
    // Объявление обектов
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
        list_sostav = null,
        data_start = null,
        data_stop = null,
        //
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_inc.load(['ids'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
        },
        // Показать составы
        view_sostav = function (start, stop, filter) {
            LockScreen(langView('mess_delay', langs));
            if (data_start === null || data_stop === null || data_start !== start || data_stop !== stop) {
                ids_inc.getArrivalSostav(start, stop, function (data) {
                    list_sostav = data;
                    data_start = start;
                    data_stop = stop;
                    table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav);
                });
            } else {
                table_sostav.view(typeof filter === 'function' ? list_sostav.filter(filter) : list_sostav);
            }
        },
        // Таблица 
        table_sostav = {
            html_table: $('table#table-sostav-arrival'),
            obj: null,
            select_sostav: null,
            init: function () {
                this.obj = this.html_table.DataTable({
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    select: {
                        style: "single"
                    },
                    "autoWidth": true,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table(langs),
                    jQueryUI: false,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                        switch (data.status) {
                            case 1: $(row).addClass('status-in-work'); break;
                            case 2: $(row).addClass('status-accepted'); break;
                            case 3: $(row).addClass('status-rejected'); break;
                        }
                        if (data.id_arrived !== null && data.id_sostav !== null) {
                            $('td', row).eq(0).addClass('icon-ok');
                        } else { $('td', row).eq(0).addClass('icon-warning'); }
                    },
                    columns: [
                        {
                            orderable: false,
                            data: null,
                            defaultContent: ""
                        },
                        { data: "train", title: langView('field_train', langs), width: "50px", orderable: true, searchable: true },
                        { data: "composition_index", title: langView('field_composition_index', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_arrival", title: langView('field_date_arrival', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_adoption", title: langView('field_date_adoption', langs), width: "150px", orderable: true, searchable: true },
                        { data: "date_adoption_act", title: langView('field_date_adoption_act', langs), width: "150px", orderable: false, searchable: false },
                        { data: "station_from", title: langView('field_station_from', langs), width: "150px", orderable: true, searchable: true },
                        { data: "station_on", title: langView('field_station_on', langs), width: "150px", orderable: true, searchable: true },
                        { data: "id_way", title: langView('field_way', langs), width: "150px", orderable: true, searchable: true },
                        { data: "num_doc", title: langView('field_num_doc', langs), width: "50px", orderable: true, searchable: true },
                        { data: "count", title: langView('field_count', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "status", title: langView('field_status', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create", title: langView('field_create', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "create_user", title: langView('field_create_user', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change", title: langView('field_change', langs), width: "50px", orderable: true, searchable: true },
                        //{ data: "change_user", title: langView('field_change_user', langs), width: "50px", orderable: true, searchable: true },
                        { data: "create_sostav", title: langView('field_create_sostav', langs), width: "150px", orderable: true, searchable: true },
                        { data: "change_sostav", title: langView('field_change_sostav', langs), width: "150px", orderable: true, searchable: true }
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            text: langView('title_button_buffer', langs),
                            extend: 'copyHtml5',
                        },
                        {
                            text: langView('title_button_excel', langs),
                            extend: 'excelHtml5',
                            sheetName: 'Поезда по прибытию',
                            messageTop: function () {
                                return '';
                            }
                        },
                        {
                            extend: 'colvis',
                            text: langView('title_button_field', langs),
                            collectionLayout: 'fixed two-column',
                            //postfixButtons: ['colvisRestore']
                        },
                        {
                            extend: 'colvisGroup',
                            text: langView('title_button_field_all', langs),
                            show: ':hidden'
                        },
                        {
                            text: langView('title_button_add', langs),
                            action: function (e, dt, node, config) {
                                pn_edit_sostav.Open(null)
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    pn_edit_sostav.Open(table_sostav.select_sostav.id)
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_del', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    //wagon_card.load_card(table_wagon_cards.select.num);
                                }
                            },
                            enabled: false
                        },
                    ],
                }).on('select', function (e, dt, type, indexes) {
                    var rowData = table_sostav.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_sostav.select_sostav = rowData[0];
                        table_sostav.obj.button(5).enable(true);
                        table_sostav.obj.button(6).enable(true);
                    } else {
                        table_sostav.obj.button(5).enable(false);
                        table_sostav.obj.button(6).enable(false);
                    }
                }).on('deselect', function (e, dt, type, indexes) {
                    table_sostav.select_sostav = null;
                    table_sostav.obj.button(5).enable(false);
                    table_sostav.obj.button(6).enable(false);
                });


                //    .on('select', function (e, dt, type, indexes) {
                //    var row = table_sostav.obj.rows(indexes).data();
                //    if (row && row.length > 0) {
                //        view_select(row[0]);
                //    }
                //    //var rowData = table_sostav.obj.rows(indexes).data().toArray();
                //    var rows = table_sostav.obj.rows('.selected').data();
                //    table_sostav.update_button_delete(rows.length);

                //});
            },
            // Показать таблицу с данными
            view: function (data) {
                table_sostav.obj.clear();
                $.each(data, function (i, el) {
                    table_sostav.obj.row.add(table_sostav.get_sostav(el));
                });
                table_sostav.obj.order([3, 'asc']);
                table_sostav.obj.draw();
                LockScreenOff();
            },
            // Получить полную информацию по составау
            get_sostav: function (data) {

                //var cs = mt.getConsignee_Internal_Of_ID(data.consignee);
                return {
                    "id": data.id,
                    "id_arrived": data.id_arrived,
                    "id_sostav": data.id_sostav,
                    "train": data.train,
                    "composition_index": data.composition_index,
                    "date_arrival": data.date_arrival.replace(/T/g, ' '),
                    "date_adoption": data.date_adoption !== null ? data.date_adoption.replace(/T/g, ' ') : null,
                    "date_adoption_act": data.date_adoption_act !== null ? data.date_adoption_act.replace(/T/g, ' ') : null,
                    "id_station_from": data.id_station_from,
                    "station_from": data.id_station_from !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_from, 'station_name', lang) : '',
                    "id_station_on": data.id_station_on,
                    "station_on": data.id_station_on !== null && ids_inc !== null ? ids_inc.ids_dir.getValue_Station_Of_ID(data.id_station_on, 'station_name', lang) : '',
                    "id_way": data.id_way,
                    "num_doc": data.num_doc,
                    "count": data.count !== null ? data.count : (data.ArrivalCars !== null ? data.ArrivalCars.length : 0),
                    "status": data.status,
                    "note": data.note,
                    "create": data.create !== null ? data.create.replace(/T/g, ' ') : null,
                    "create_user": data.create_user,
                    "change": data.change !== null ? data.change.replace(/T/g, ' ') : null,
                    "change_user": data.change_user,
                    "create_sostav": data.create !== null && data.create_user !== null ? data.create_user + ' (' + data.create.replace(/T/g, ' ') + ')' : null,
                    "change_sostav": data.change !== null && data.change_user !== null ? data.change_user + ' (' + data.change.replace(/T/g, ' ') + ')' : null
                };
            }
        },
        // панель выбора исходных данных для запроса
        pn_sel = {
            cur_dt: moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
            start_dt: null,
            stop_dt: null,
            code_ctation: null,
            dt_obj: null,
            select_station: $('select#select-station'),
            span_range_date: $('span#select-date'),
            input_data_start: $('input#date-start'),
            input_data_stop: $('input#date-stop'),
            init: function (list_station) {
                // настроим компонент дата
                pn_sel.dt_obj = pn_sel.span_range_date.dateRangePicker(
                    {
                        language: 'ru',
                        format: 'DD.MM.YYYY HH:mm',
                        separator: '-',
                        autoClose: false,
                        time: {
                            enabled: true
                        },
                        setValue: function (s, s1, s2) {
                            pn_sel.input_data_start.val(s1);
                            pn_sel.input_data_stop.val(s2);
                        }
                    }).
                    bind('datepicker-change', function (evt, obj) {
                        pn_sel.start_dt = obj.date1;
                        pn_sel.stop_dt = obj.date2;
                    })
                    .bind('datepicker-closed', function () {
                        pn_sel.view();
                    });
                pn_sel.start_dt = moment(pn_sel.cur_dt).set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 })._d;
                pn_sel.stop_dt = moment(pn_sel.cur_dt).set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 0 })._d;
                pn_sel.dt_obj.data('dateRangePicker').setDateRange(moment(pn_sel.start_dt).format('DD.MM.YYYY HH:mm:'), moment(pn_sel.stop_dt).format('DD.MM.YYYY HH:mm:'), true);
                // настроим селект
                pn_sel.select_station = cd_initSelect(
                    pn_sel.select_station,
                    { lang: lang },
                    list_station,
                    null,
                    -1,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор смены
                        pn_sel.view();
                    },
                    null);
            },
            view: function () {
                view_sostav(pn_sel.start_dt, pn_sel.stop_dt, Number(pn_sel.select_station.val()) !== -1 ? function (i) { return i.id_station_from === Number(pn_sel.select_station.val()) ? true : false; } : null);
            }
        }
    // Панель добавить\править состав
    pn_edit_sostav = {
        obj: null,
        table: null,
        lang: null,
        list_station: null,
        ids_inc: null,
        id: null,
        sostav: null,
        // Поля формы
        train_edit: $('input#train-edit'),
        composition_index_edit: $('input#composition-index-edit'),
        date_arrival_edit: $('input#date-arrival-edit'),
        date_arrival: null,
        date_arrival_select: null,
        station_from_edit: $('select#station-from-edit'),
        note_edit: $('textarea#note-edit'),
        // инициализвция Диалога
        init: function (lang, list_station, callback_ok) {
            pn_edit_sostav.lang = lang;
            pn_edit_sostav.list_station = list_station;
            pn_edit_sostav.ids_inc = new IDS_RWT_INCOMING(lang); // Создадим класс
            // Инициализация элементов
            pn_edit_sostav.station_from_edit = cd_initSelect(
                pn_edit_sostav.station_from_edit,
                { lang: pn_edit_sostav.lang },
                pn_edit_sostav.list_station,
                null,
                -1,
                function (event) {
                    event.preventDefault();
                    var id = $(this).val();
                },
                null);
            // настроим компонент выбора времени
            pn_edit_sostav.date_arrival = cd_initDateTimeRangePicker(pn_edit_sostav.date_arrival_edit, { lang: pn_edit_sostav.lang }, function (datetime) {

            })

            pn_edit_sostav.obj = $("div#edit-sostav").dialog({
                resizable: false,
                //title: 'Принять состав',
                modal: true,
                autoOpen: false,
                height: "auto",
                width: 500,
                classes: {
                    "ui-dialog": "card",
                    "ui-dialog-titlebar": "card-header bg-primary text-white",
                    "ui-dialog-content": "card-body",
                    "ui-dialog-buttonpane": "card-footer text-muted"
                },
                open: function (event, ui) {

                },
                buttons: [
                    {
                        text: "Ок",
                        class: "btn btn-outline-primary btn",
                        click: function () {
                            //var rows = pn_edit_sostav.table.rows('.selected').data();
                            $(this).dialog("close");
                            var s = pn_edit_sostav.date_arrival.getDateTime();

                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }

                        }
                    },
                    {
                        text: "Отмена",
                        class: "btn btn-outline-primary btn",
                        click: function () {
                            $(this).dialog("close");
                        }
                    },
                ]
            });
        },
        // открыть диалог
        Open: function (id) {
            pn_edit_sostav.id = id;
            if (pn_edit_sostav.id !== null) {
                // Получим текуший состав
                pn_edit_sostav.ids_inc.getArrivalSostavOfID(pn_edit_sostav.id, function (result_sostav) {
                    pn_edit_sostav.sostav = result_sostav[0];
                    pn_edit_sostav.train_edit.val(pn_edit_sostav.sostav.train);
                    pn_edit_sostav.composition_index_edit.val(pn_edit_sostav.sostav.composition_index);
                    pn_edit_sostav.station_from_edit.val(pn_edit_sostav.sostav.id_station_from);
                    pn_edit_sostav.date_arrival.setDateTime(pn_edit_sostav.sostav.date_arrival !== null ? pn_edit_sostav.sostav.date_arrival.replace(/T/g, ' '): null)
                    pn_edit_sostav.note_edit.val(pn_edit_sostav.sostav.note);

                })
            } else {
                // 
                pn_edit_sostav.sostav = null;
                pn_edit_sostav.train_edit.val('');
                pn_edit_sostav.composition_index_edit.val('');
                pn_edit_sostav.station_from_edit.val(-1);
                pn_edit_sostav.date_arrival.setDateTime(null)
                pn_edit_sostav.note_edit.val('');
                
            }
            pn_edit_sostav.obj.dialog("open");
        },
    };

    //================================================================
    // Основной вход
    //=================================================================

    // Загрузка основных библиотек
    loadReference(function (result) {
        // Инициализация
        var list_station = ids_inc.ids_dir.getListStation('id', 'station_name', lang, function (i) { return i.station_uz === true ? true : false; });
        pn_sel.init(list_station);
        pn_edit_sostav.init(lang, list_station, function (result) {

        });
        table_sostav.init();
        pn_sel.view();
    });





});