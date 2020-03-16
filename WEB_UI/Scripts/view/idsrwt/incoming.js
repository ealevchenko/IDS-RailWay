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
                'field_status': 'Статус',
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
                'title_button_wagon': 'Вагоны',
                'title_button_wagon_accept': 'Принять вагоны',
                'title_button_wagon_view': 'Показать вагоны',
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
        incoming_alert = new ALERT($('div#incoming-alert')),// Создадим класс ALERTG
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
        view_sostav = function (refresh, start, stop, filter) {
            incoming_alert.clear_message();
            LockScreen(langView('mess_delay', langs));
            if (refresh || data_start === null || data_stop === null || data_start !== start || data_stop !== stop) {

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
                            case 1: $(row).addClass('status-in-work'); $('td', row).eq(0).addClass('icon-warning'); break;
                            case 2: $(row).addClass('status-accepted'); $('td', row).eq(0).addClass('icon-ok'); break;
                            case 3: $(row).addClass('status-rejected'); $('td', row).eq(0).addClass('icon-delete'); break;
                        }
                        if (data.id_arrived !== null && data.id_sostav !== null) {
                            $('td', row).eq(1).addClass('icon-right');
                        } else { $('td', row).eq(1).addClass('icon-user'); }
                    },
                    columns: [
                        {
                            orderable: false,
                            title: langView('field_status', langs),
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
                                pn_edit_sostav.Open(null);
                            },
                            enabled: true
                        },
                        {
                            text: langView('title_button_edit', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    pn_edit_sostav.Open(table_sostav.select_sostav.id);
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_del', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    if (table_sostav.select_sostav.id_arrived === null) {
                                        dialog_confirm.open('Удалить?', 'Вы уверены что хотите удалить состав : ' + table_sostav.select_sostav.composition_index, function (result) {
                                            if (result) {
                                                ids_inc.deleteArrivalSostav(table_sostav.select_sostav.id,
                                                    function (result_del) {
                                                        if (result_del > 0) {
                                                            pn_sel.view(true);
                                                        } else {
                                                            incoming_alert.clear_message();
                                                            incoming_alert.out_error_message("При удалении сотава произошла ошибка");
                                                        }
                                                    });
                                            }
                                        });
                                    } else {
                                        dialog_confirm.open('Отклонить?', 'Вы уверены что хотите отклонить состав : ' + table_sostav.select_sostav.composition_index, function (result) {
                                            if (result) {
                                                table_sostav.select_sostav.status = 3;                          // Присвоим статус отклонить
                                                table_sostav.select_sostav.change = toISOStringTZ(new Date());  // Сохраним кто менял
                                                table_sostav.select_sostav.change_user = user_name;
                                                ids_inc.putArrivalSostav(table_sostav.select_sostav,
                                                    function (result_upd) {
                                                        if (result_upd > 0) {
                                                            pn_sel.view(true);
                                                            incoming_alert.clear_message();
                                                            incoming_alert.out_info_message("Статус состава (отклонить) - установлен.");
                                                        } else {
                                                            incoming_alert.clear_message();
                                                            incoming_alert.out_error_message("При обновлении статуса сотава произошла ошибка");
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                }
                            },
                            enabled: false
                        },
                        {
                            text: langView('title_button_wagon', langs),
                            action: function (e, dt, node, config) {
                                if (table_sostav.select_sostav) {
                                    cars_detali.view(table_sostav.select_sostav.id)
                                }
                            },
                            enabled: false
                        }
                    ]
                }).on('select', function (e, dt, type, indexes) {
                    var rowData = table_sostav.obj.rows(indexes).data();
                    if (rowData && rowData.length > 0) {
                        table_sostav.select_sostav = rowData[0];
                        table_sostav.obj.button(7).enable(true);
                        if (table_sostav.select_sostav.status < 2) {
                            table_sostav.obj.button(5).enable(true);
                            table_sostav.obj.button(6).enable(true);
                            table_sostav.obj.button(7).text(langView('title_button_wagon_accept', langs));
                        } else {
                            // Если статус принят или удален 
                            table_sostav.obj.button(5).enable(false);
                            table_sostav.obj.button(6).enable(false);
                            table_sostav.obj.button(7).text(langView('title_button_wagon_view', langs));
                        }
                    } else {
                        table_sostav.obj.button(5).enable(false);
                        table_sostav.obj.button(6).enable(false);
                        table_sostav.obj.button(7).enable(false);
                    }
                }).on('deselect', function (e, dt, type, indexes) {
                    table_sostav.deselect();
                });
            },
            // Показать таблицу с данными
            view: function (data) {
                table_sostav.obj.clear();
                // Сбросить выделенный состав
                table_sostav.deselect();
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
            },
            // Deselect
            deselect: function () {
                table_sostav.select_sostav = null;
                table_sostav.obj.button(5).enable(false);
                table_sostav.obj.button(6).enable(false);
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
                        pn_sel.view(false);
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
                        pn_sel.view(false);
                    },
                    null);
            },
            view: function (refresh) {
                view_sostav(refresh, pn_sel.start_dt, pn_sel.stop_dt, Number(pn_sel.select_station.val()) !== -1 ? function (i) { return i.id_station_from === Number(pn_sel.select_station.val()) ? true : false; } : null);
            }
        },
        // Панель добавить\править состав
        pn_edit_sostav = {
            obj: null,
            table: null,
            lang: null,
            list_station: null,
            user_name: null,
            ids_inc: null,
            id: null,
            sostav: null,
            // Поля формы
            train_edit: $('input#train-edit'),
            composition_index_edit: $('input#composition-index-edit'),
            date_arrival_edit: $('input#date-arrival-edit'),
            date_arrival: null,
            station_from_edit: $('select#station-from-edit'),
            note_edit: $('textarea#note-edit'),
            alert_sostav: $('div#edit-sostav-alert'),
            all_obj: null,  // массив всех элементов формы 
            val: null,      // класс валидации
            // инициализвция Диалога
            init: function (lang, list_station, user_name, callback_ok) {
                pn_edit_sostav.lang = lang;
                pn_edit_sostav.list_station = list_station;
                pn_edit_sostav.user_name = user_name;
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

                });
                // Соберем все элементы в массив
                pn_edit_sostav.all_obj = $([])
                    .add(pn_edit_sostav.train_edit)
                    .add(pn_edit_sostav.composition_index_edit)
                    .add(pn_edit_sostav.date_arrival_edit)
                    .add(pn_edit_sostav.station_from_edit)
                    .add(pn_edit_sostav.note_edit)
                    .add(pn_edit_sostav.alert_park_wagon);
                // создадим классы
                pn_edit_sostav.ids_inc = new IDS_RWT_INCOMING(lang); // Создадим класс IDS_RWT_INCOMING
                pn_edit_sostav.val = new VALIDATION(pn_edit_sostav.lang, pn_edit_sostav.alert_sostav, pn_edit_sostav.all_obj); // Создадим класс VALIDATION
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
                                pn_edit_sostav.save(callback_ok);
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
                // Sumbit form
                pn_edit_sostav.obj.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
            },
            // открыть диалог
            Open: function (id) {
                pn_edit_sostav.val.clear_all(); // Очистим ошибки и сообщения;
                pn_edit_sostav.id = id;
                if (pn_edit_sostav.id !== null) {
                    pn_edit_sostav.obj.dialog("option", "title", "Изменить состав");
                    // Получим текуший состав
                    pn_edit_sostav.ids_inc.getArrivalSostavOfID(pn_edit_sostav.id, function (result_sostav) {
                        pn_edit_sostav.sostav = result_sostav[0];
                        pn_edit_sostav.train_edit.val(pn_edit_sostav.sostav.train);
                        pn_edit_sostav.composition_index_edit.val(pn_edit_sostav.sostav.composition_index);
                        pn_edit_sostav.station_from_edit.val(pn_edit_sostav.sostav.id_station_from);
                        pn_edit_sostav.date_arrival.setDateTime(pn_edit_sostav.sostav.date_arrival !== null ? pn_edit_sostav.sostav.date_arrival.replace(/T/g, ' ') : null);
                        pn_edit_sostav.note_edit.val(pn_edit_sostav.sostav.note);

                    });
                } else {
                    // 
                    pn_edit_sostav.obj.dialog("option", "title", "Добавить состав");
                    pn_edit_sostav.sostav = null;
                    pn_edit_sostav.train_edit.val('');
                    pn_edit_sostav.composition_index_edit.val('');
                    pn_edit_sostav.station_from_edit.val(-1);
                    pn_edit_sostav.date_arrival.setDateTime(null);
                    pn_edit_sostav.note_edit.val('');

                }
                pn_edit_sostav.obj.dialog("open");
            },
            // Валидация данных
            validation: function () {
                pn_edit_sostav.val.clear_all();
                var valid = true;
                valid = valid & pn_edit_sostav.val.checkInputOfNull(pn_edit_sostav.train_edit, "Укажите номер поезда");
                valid = valid & pn_edit_sostav.val.checkRegexp(pn_edit_sostav.train_edit, /[0-9]{4}/, "Номер поезда должен содержать 4-и цифры");
                valid = valid & pn_edit_sostav.val.checkInputOfNull(pn_edit_sostav.composition_index_edit, "Укажите индекс поезда");
                valid = valid & pn_edit_sostav.val.checkRegexp(pn_edit_sostav.composition_index_edit, /[0-9]{4}[-]{1}[0-9]{3}[-]{1}[0-9]{4}/, "Индекс поезда должен быть в формате (XXXX-XXX-XXXX)");
                valid = valid & pn_edit_sostav.val.checkInputOfNull(pn_edit_sostav.date_arrival_edit, "Укажите время прибытия поезда");
                valid = valid & pn_edit_sostav.val.checkSelection(pn_edit_sostav.station_from_edit, "Укажите станцию прибытия");
                return valid;
            },
            // Сохранить изменения
            save: function (callback_ok) {
                var valid = pn_edit_sostav.validation();
                if (valid) {
                    var arrival_sostav = pn_edit_sostav.getArrivalSostav();
                    if (pn_edit_sostav.id) {
                        // Править
                        pn_edit_sostav.ids_inc.putArrivalSostav(arrival_sostav,
                            function (result_edit) {
                                if (result_edit > 0) {
                                    // Ок
                                    pn_edit_sostav.obj.dialog("close");
                                    if (typeof callback_ok === 'function') {
                                        callback_ok(pn_edit_sostav.id, false);
                                    }
                                } else {
                                    pn_edit_sostav.val.clear_message();
                                    pn_edit_sostav.val.out_error_message("При обновлении состава произошла ошибка!");
                                }
                            });
                    } else {
                        // Добавить
                        pn_edit_sostav.ids_inc.postArrivalSostav(arrival_sostav,
                            function (result_add) {
                                if (result_add > 0) {
                                    // Ок
                                    pn_edit_sostav.obj.dialog("close");
                                    if (typeof callback_ok === 'function') {
                                        callback_ok(result_add, true);
                                    }
                                } else {
                                    pn_edit_sostav.val.clear_message();
                                    pn_edit_sostav.val.out_error_message("При добавлении состава произошла ошибка!");
                                }
                            });
                    }
                }
            },
            // Получить новый состав
            getArrivalSostav: function () {
                return {
                    id: pn_edit_sostav.id ? pn_edit_sostav.id : 0,
                    id_arrived: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_arrived : null,
                    id_sostav: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_sostav : null,
                    train: pn_edit_sostav.train_edit.val(),
                    composition_index: pn_edit_sostav.composition_index_edit.val(),
                    date_arrival: pn_edit_sostav.date_arrival.getDateTime(),
                    date_adoption: pn_edit_sostav.id ? pn_edit_sostav.sostav.date_adoption : 0,
                    date_adoption_act: pn_edit_sostav.id ? pn_edit_sostav.sostav.date_adoption_act : 0,
                    id_station_from: get_select_number_value(pn_edit_sostav.station_from_edit),
                    id_station_on: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_station_on : null,
                    id_way: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.id_way : null,
                    num_doc: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.num_doc : null,
                    count: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.count : null,
                    status: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.status : 0,
                    note: pn_edit_sostav.note_edit.val(),
                    create: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.create : toISOStringTZ(new Date()),
                    create_user: pn_edit_sostav.id !== null ? pn_edit_sostav.sostav.create_user : pn_edit_sostav.user_name,
                    change: pn_edit_sostav.id !== null ? toISOStringTZ(new Date()) : null,
                    change_user: pn_edit_sostav.id !== null ? pn_edit_sostav.user_name : null,
                };
            },
        },
        // Форма диалога
        dialog_confirm = {
            result: false,
            callback_ok: null,
            obj: $("#dialog-confirm").dialog({
                resizable: false,
                autoOpen: false,
                height: "auto",
                width: 400,
                modal: true,
                open: function (event, ui) {
                },
                close: function (event, ui) {
                    if (typeof dialog_confirm.callback_ok === 'function') {
                        dialog_confirm.callback_ok(dialog_confirm.result);
                    }
                },
                classes: {
                    "ui-dialog": "card",
                    "ui-dialog-titlebar": "card-header bg-primary text-white",
                    "ui-dialog-content": "card-body",
                    "ui-dialog-buttonpane": "card-footer text-muted"
                },
                buttons: [
                    {
                        text: "Ок",
                        class: "btn btn-outline-primary btn-sm",
                        click: function () {
                            dialog_confirm.result = true;
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "Отмена",
                        class: "btn btn-outline-primary btn-sm",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }]
            }),
            open: function (titlt, text, callback_ok) {
                dialog_confirm.result = false;
                dialog_confirm.obj.dialog("option", "title", titlt);
                $('p#dialog-confirm-text').text(text);
                dialog_confirm.callback_ok = callback_ok;
                dialog_confirm.obj.dialog("open");
            }
        },
         // Окно вагоны детально
        cars_detali = {
            content: $('.cd-cars-detali'),
            lang: null,
            user: null,
            ids_inc: null,
            id_sostav: null,
            sostav: null,
            // Поля
            sostav_title: $('h1#sostav-title'),
            // ЭПД
            epd_num_doc: $('input#epd_num_doc'),
            epd_num_rev: $('input#epd_num_rev'),
            otpr_nom_doc: $('input#otpr_nom_doc'),
            init: function (lang, user_name) {
                cars_detali.lang = lang;
                cars_detali.user = user_name;
                // создадим классы
                cars_detali.ids_inc = new IDS_RWT_INCOMING(cars_detali.lang); // Создадим класс IDS_RWT_INCOMING

                // Sumbit form
                cars_detali.content.find("form").on("submit", function (event) {
                    event.preventDefault();
                });
                // Настройка закрыть детали проекта
                cars_detali.content.on('click', '.close', function (event) {
                    event.preventDefault();
                    cars_detali.content.removeClass('is-visible');
                });
            },
            // Очистить все ячейки
            clear: function () {
                cars_detali.clear_cars_epd(); // Очистить ячейки ЭПД
            },
            // Очистить ячейки ЭПД
            clear_cars_epd: function () {
                cars_detali.epd_num_doc.val('');
                cars_detali.epd_num_rev.val('');
            },
            // показать электронно перевозочный документ
            view_cars_epd: function (car) {
                if (car === null) return;
                cars_detali.epd_num_doc.val(car.UZ_DOC !== null ? car.UZ_DOC.num_doc : null);
                cars_detali.epd_num_rev.val(car.UZ_DOC !== null ? car.UZ_DOC.revision : null);

            },
            // Показать не принятые вагоны
            view_cars_not_arrival: function (list) {
                $('div#list-cars-not-arrival').empty();
                $.each(list, function (i, el) {
                    $('div#list-cars-not-arrival').append('<a class="list-group-item list-group-item-action ' + (el.consignee === 7932 ? 'list-group-item-success' : '') + '" id="' + el.id + '" data-toggle="list" href="#" role="tab" aria-controls="">' + el.num + '</a>')
                });
                $('#list-cars-not-arrival a').on('click', function (e) {
                    e.preventDefault()
                    var id = $(this).attr('id');
                    var car = getObjOflist(cars_detali.sostav.ArrivalCars, 'id', id);
                    cars_detali.view_cars_epd(car);
                });
            },
            // Показать информацию по составу
            view: function (id) {
                cars_detali.clear();  // Очистить все ячейки
                if (id === null) return;
                cars_detali.id_sostav = id;
                // Получим текуший состав
                cars_detali.ids_inc.getArrivalSostavOfID(cars_detali.id_sostav, function (result_sostav) {
                    cars_detali.sostav = result_sostav[0];
                    // Покаать информацию по составу
                    cars_detali.sostav_title.text('Информация по составу (№ поезда :' + cars_detali.sostav.train + ', Индекс поезда :' + cars_detali.sostav.composition_index + ', Прибыл:' + cars_detali.sostav.date_arrival + ')');
                    // Очистить список не принятых вагонов
                    $('div#list-cars-not-arrival').empty();
                    cars_detali.view_cars_not_arrival(cars_detali.sostav.ArrivalCars.filter(function (i) { return i.arrival === null ? true : false; }));



                });
                // Показать страницу детально
                this.content.addClass('is-visible');
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
        pn_edit_sostav.init(lang, list_station, user_name, function (result) {
            pn_sel.view(true);
        });
        cars_detali.init(lang, user_name);
        table_sostav.init();
        pn_sel.view(true);
    });





});