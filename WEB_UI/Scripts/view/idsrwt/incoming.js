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

                'field_doc_id': 'Ідентифікатор документа у базі АТ «Укрзалізниця»',
                'field_description': 'Опис документа',
                'field_doc_date': 'Дата документу',
                'field_doc_type': 'Код типу супровідного документа',
                'field_doc_type_name': 'Найменування типу супровідного документу',
                'field_kod_zd_use': 'Код залізниці вилучення документа',
                'field_kol': 'Кількість екземплярів',

                'field_carrier_kod': 'Код перевізника',
                'field_carrier_name': 'Скорочене найменування перевізника',
                'field_date_akt': 'Дата складання акту',
                'field_date_dved': 'Дата укладання досильної дорожньої відомості',
                'field_esr_akt': 'ЄСР станції складання акту ',
                'field_stn_name_akt': 'Найменування станції складання акту',
                'field_nom_akt': 'Номер акту',
                'field_nom_dved': 'Номер досильної дорожньої відомості',
                'field_oper_date': 'Дата внесення даних по акту у перевізний документ',
                'field_prichina_akt': 'Причина',
                'field_responsible_person': 'Ім`я особи, відповідальної за внесення данних по акту у перевізний документ',
                'field_ser_dved': 'Серія досильної дорожньої відомості',
                'field_type': 'Тип акту',
                'field_vagon_nom': 'Номер вагону ',
                'field_zd_kod': 'Код залізниці перевантаження',

                'field_nom_cont': 'Номер контейнеру',
                'field_kod_tiporazmer': 'Типорозмір контейнеру',
                'field_gruzp': 'Маса брутто за трафаретом (т)',
                'field_ves_tary_arc': 'Маса тари контейнеру (кг)',
                'field_vesg': 'Вага вантажу нетто (кг)',
                'field_brutto': 'Вага вантажу брутто',
                'field_kod': 'Код платежу ',
                'field_summa': 'Cума платежу (коп.)',
                'field_nom_zpu': 'Номер ЗПП',
                'field_kol_pac': 'Кількість місць упаковки',
                'field_kod_etsng': 'Код вантажу по ЄТСНВ',

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

                'mess_searsh_epd': 'Поиск ЭПД ...',
                'mess_searsh_vagon': 'Поиск вагона ...',
                'mess_not_searsh_epd': 'Автоматически ЭПД не найден, попробуйте найти документ по номеру вагона в промежуточной базе данных (воспользовавшись кнопкой поиска справа от поля "№ Вагона") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',
                'mess_not_manual_epd': 'В промежуточной базе данных ЭПД не найден, введите данные вручную перейдя в режим "Ручной ввод" (воспользовавшись кнопкой "Правка" справа от поля "№ Вагона" или выбрав грузополучателя не "АМКР") или получите номер вагона по номеру накладной (колонка "Сведения ЭПД").',

            },
            'en':  //default language: English
            {
                'field_train': '# train',
            }
        };

    //**************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //**************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        incoming_alert = new ALERT($('div#incoming-alert')),// Создадим класс ALERTG
        ids_inc = new IDS_RWT_INCOMING(lang), // Создадим класс IDS_RWT_INCOMING
        list_sostav = null,
        data_start = null,
        data_stop = null,
        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_inc.load([], ['station'], [], false, function () {
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
        //======================================================================================
        // ОСНОВНАЯ ТАБЛИЦА СОСТАВОВ
        //======================================================================================
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
        //======================================================================================
        // ОСНОВНАЯ ПАНЕЛЬ ВЫБОРА СОСТАВОВ
        //======================================================================================
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
        //======================================================================================
        // ДИАЛОГОВОЕ ОКНО "ДОБАВИТЬ/ПРАВИТЬ СОСТАВ"
        //======================================================================================
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
        //======================================================================================
        // МЕНДАЛЬНОЕ ОКНО ДИАЛОГ
        //======================================================================================
        dialog_confirm = {
            result: false,
            callback_ok: null,
            obj: $("#dialog-confirm").dialog({
                resizable: false,
                autoOpen: false,
                height: "auto",
                width: 500,
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
        //======================================================================================
        // ОКНО ПРИНЯТЬ ВАГОНЫ
        //======================================================================================
        cars_detali = {
            content: $('.cd-cars-detali'),
            lang: null,
            user: null,
            ids_inc: null,
            id_sostav: null,
            sostav: null,
            alert: null,
            select_id: null,            // Выбранный id вагона
            select_num: null,           // Выбранный вагон
            select_otpr: null,          // Выбранный документ
            select_otpr_vagon: null,    // Информация по выбраному вагону эпд
            select_otpr_cont: null,     // Информация о контейнерах выбраного вагона эпд
            select_vagon: null,         // Информация по выбраному из справочника
            //-- валидация
            val_card_vag: null,                         // класс валидации card_vag
            alert_card_vag: $('div#card-vag-alert'),    // класс сообщений card_vag
            all_obj_card_vag: null,                     // массив всех элементов валидации card_vag

            // Поля -----------------------------------------------------------------
            sostav_title: $('h1#sostav-title'),
            // режимы
            bt_mode_view: $('button#mode-view').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_mode(false);
            }),
            bt_mode_edit: $('button#mode-edit').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_mode(true);
            }),
            bt_mode_open: $('button#mode-open').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_open_edit();
            }),
            bt_mode_close: $('button#mode-close').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_close_edit();
            }),
            // ЭПД
            num_car: $('input#num_car'),
            // Кнопка найти вагон в промежуточной базе
            search_cars_num_doc: $('button#search-car-num-doc').on('click', function (event) {
                event.preventDefault();
                //!!!!!!!!!!!!! тест
                //cars_detali.select_num = 56942493;
                LockScreen(langView('mess_searsh_epd', langs));
                cars_detali.alert.clear_message();
                cars_detali.ids_inc.ids_tr.getNumEPDOfIntermediateDB(cars_detali.select_num,
                    function (result_num) {
                        if (result_num !== null) {
                            // Документ найдент и сохранен в локальной базе
                            cars_detali.ids_inc.getArrivalCarsOfID(cars_detali.select_id, function (result_car) {
                                if (result_car !== null && result_car.num === cars_detali.select_num) {
                                    // Номера вагонов совподают, добавим номер документа и штамп изменений
                                    result_car.num_doc = result_num;
                                    result_car.change = toISOStringTZ(new Date());
                                    result_car.change_user = cars_detali.user;
                                    // Сохраним изменения 
                                    cars_detali.ids_inc.putArrivalCars(result_car, function (result_upd) {
                                        if (result_upd <= 0) {
                                            // Информация по вагону не обновилась
                                            cars_detali.alert.out_warning_message('ЭПД - найден (№ док. ' + result_num + ') и сохранен в базу данных "ЭПД по прибытию", но при обновлении информации по вагону №' + cars_detali.select_num + ' - произошла ошибка.');
                                            cars_detali.show_booton_epd_manual();
                                        } else {
                                            // Информация по вагону обновилась, добавим значек
                                            $('a#' + cars_detali.select_id).text(cars_detali.select_num + ' ');
                                            $('a#' + cars_detali.select_id).append(result_num ? $('<i class="fa fa-file-text-o" aria-hidden="true"></i>') : '');
                                        }
                                        // Прочитаем ЭПД
                                        cars_detali.ids_inc.getOTPR_UZ_DOCOfNum(result_num, function (result_otpr) {
                                            if (result_otpr === null) {
                                                // Документа нет пишим сообщение
                                                cars_detali.alert.out_warning_message(langView('mess_not_manual_epd', langs));
                                                cars_detali.show_booton_epd_manual();
                                            }
                                            cars_detali.view_cars_epd(cars_detali.select_num, result_otpr);
                                        });

                                    });
                                } else {
                                    if (result_car === null) {
                                        cars_detali.alert.out_warning_message('ЭПД - найден (№ док. ' + result_num + ') и сохранен в базу данных "ЭПД по прибытию", но при обновлении информации по вагону №' + cars_detali.select_num + ' - произошла ошибка чтения записи id:' + cars_detali.select_id);
                                    } else {
                                        cars_detali.alert.out_warning_message('ЭПД - найден (№ док. ' + result_num + ') и сохранен в базу данных "ЭПД по прибытию", но при обновлении информации по вагону №' + cars_detali.select_num + ' - произошла ошибка чтения записи id:' + cars_detali.select_id + ' номер вагона записи (' + result_car.num +') не совпадает с номер вагона обновления');
                                    }
                                    cars_detali.show_booton_epd_manual();
                                    LockScreenOff();
                                }
                            });

                        } else {
                            // Документа нет пишим сообщение
                            cars_detali.alert.out_warning_message(langView('mess_not_manual_epd', langs));
                            cars_detali.show_booton_epd_manual();
                            LockScreenOff();
                        }
                    });
            }),
            // Убрать кнопки ЭПД
            show_booton_not: function () {
                cars_detali.edit_car_num_doc.hide();
                cars_detali.search_cars_num_doc.hide();
            },
            // Показать кнопку найти документ
            show_booton_epd_search: function () {
                cars_detali.edit_car_num_doc.hide();
                cars_detali.search_cars_num_doc.show();
            },
            // Показать кнопку ввести значения в ручную
            show_booton_epd_manual: function () {
                cars_detali.edit_car_num_doc.show();
                cars_detali.search_cars_num_doc.hide();
            },
            // Кнопка ввести данные в ручную
            edit_car_num_doc: $('button#edit-car-num-doc').on('click', function (event) {
                event.preventDefault();
                cars_detali.set_mode(true);
            }),
            uz_doc_num_doc: $('input#uz_doc_num_doc'),
            uz_doc_num_new_doc: $('input#uz_doc_num_new_doc'),
            arrival_cars_position_arrival: $('input#arrival_cars_position_arrival').inputSpinner(),
            // Маршруты клиенты, станция отправки
            uz_route_stn_from: $('input#uz_route_stn_from'),
            uz_route_name_from: $('input#uz_route_name_from'),
            uz_route_name_railway_from: $('input#uz_route_name_railway_from'),
            bt_route_name_from_add: $('button#uz_route_name_from_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Внешних сетей и станций"', 'Будет добавлена новая запись внешней станции [ Код = ' + cars_detali.uz_route_stn_from.val() + ', Станция = ' + cars_detali.uz_route_name_from.val() + ', Дорога = ' + cars_detali.uz_route_name_railway_from.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_ExternalStation(cars_detali.uz_route_stn_from.val(), cars_detali.uz_route_name_from.val(), function () {
                            cars_detali.update_list_station_name_from(cars_detali.uz_route_stn_from.val());
                            cars_detali.view_epd_station_from(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Маршруты клиенты, станция приема
            uz_route_stn_on: $('input#uz_route_stn_on'),
            uz_route_name_on: $('input#uz_route_name_on'),
            uz_route_name_railway_on: $('input#uz_route_name_railway_on'),
            bt_route_name_on_add: $('button#uz_route_name_on_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Внешних сетей и станций"', 'Будет добавлена новая запись станции прибытия [ Код = ' + cars_detali.uz_route_stn_on.val() + ', Станция = ' + cars_detali.uz_route_name_on.val() + ', Дорога = ' + cars_detali.uz_route_name_railway_on.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_ExternalStation(cars_detali.uz_route_stn_on.val(), cars_detali.uz_route_name_on.val(), function () {
                            cars_detali.update_list_station_name_on(cars_detali.uz_route_stn_on.val());
                            cars_detali.view_epd_station_on(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Маршруты клиенты, пограничные пункты
            uz_route_stn_border: $('input#uz_route_stn_border'),
            uz_route_stn_border_name: $('input#uz_route_stn_border_name'),
            uz_route_border_cross_time: $('input#uz_route_border_cross_time'),
            bt_route_stn_border_add: $('button#uz_route_stn_border_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Пограничных пунктов"', 'Будет добавлена новая запись пограничного пункта [ Код = ' + cars_detali.uz_route_stn_border.val() + ', Станция = ' + cars_detali.uz_route_stn_border_name.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_BorderCheckpoint(cars_detali.uz_route_stn_border.val(), cars_detali.uz_route_stn_border_name.val(), function () {
                            cars_detali.update_list_station_border(cars_detali.uz_route_stn_border.val());
                            cars_detali.view_epd_station_border(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // Грузоотправители
            uz_cargo_client_kod_from: $('input#uz_cargo_client_kod_from'),
            uz_cargo_client_name_from: $('input#uz_cargo_client_name_from'),
            bt_client_name_from_add: $('button#uz_cargo_client_name_from_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Грузоотправителей"', 'Будет добавлена новая запись грузоотправителя [ Код = ' + cars_detali.uz_cargo_client_kod_from.val() + ', Название = ' + cars_detali.uz_cargo_client_name_from.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_Shipper(cars_detali.uz_cargo_client_kod_from.val(), cars_detali.uz_cargo_client_name_from.val(), function () {
                            cars_detali.update_list_shipper(cars_detali.uz_cargo_client_kod_from.val());
                            cars_detali.view_epd_client(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            // грузополучатели
            uz_cargo_client_kod_on: $('input#uz_cargo_client_kod_on'),
            uz_cargo_client_name_on: $('input#uz_cargo_client_name_on'),
            select_uz_cargo_client_name_on: $('select#uz_cargo_client_name_on'),
            // Возврат поставщику
            uz_cargo_returns: $('input#uz_cargo_returns'),
            // Отправка на станцию АМКР
            uz_vag_station_on_amkr: $('select#uz_vag_station_on_amkr'),
            // ВАГОН
            bt_card_vag_add: $('button#card_vag_add').on('click', function (event) {
                event.preventDefault();
                //cars_detali.val_card_vag.clear_all();
                dialog_confirm.open('Cправочник "Справочник вагонов"', 'Будет добавлена новая запись в карточку вагона №' + cars_detali.select_vagon.num + '', function (result) {
                    if (result) {
                        cars_detali.addDirectory_Cars(function () {
                            cars_detali.get_vagon_dir(cars_detali.select_otpr_vagon, cars_detali.select_num,
                                function (result_vagon) {
                                    cars_detali.select_vagon = result_vagon;
                                    if (cars_detali.select_vagon && cars_detali.select_vagon.id === 0) {
                                        // Запись вагона новая 
                                        cars_detali.bt_card_vag_add.show();
                                    } else {
                                        // Запись вагона из справочника
                                        cars_detali.bt_card_vag_add.hide();
                                    }
                                    // Показать информацию из справочника вагонов ИДС (вагон определяеется ранее)
                                    cars_detali.view_epd_card_vag(cars_detali.select_vagon);
                                });
                        }, null);
                    }
                });
            }),
            uz_vag_route: $('input#uz_vag_route'), // Признак маршрута
            //---------------------------------------------------------------
            // Админ.
            card_vag_kod_adm: $('input#card_vag_kod_adm'),
            card_vag_name_adm: $('select#card_vag_name_adm'),
            // Род
            card_vag_name_rod_vag: $('input#card_vag_name_rod_vag'),
            // Тип цистерны
            card_vag_usl_tip: $('input#card_vag_usl_tip'),
            // Количество осей
            card_vag_kol_os: $('select#card_vag_kol_os'),
            // Грузоподъемность
            card_vag_gruzp: $('input#card_vag_gruzp'),
            // Дата ремонта
            card_vag_date_rem_vag: cd_initDateTimeRangePicker($('input#card_vag_date_rem_vag'), { lang: lang, time: false }, function (datetime) {

            }),
            card_vag_date_rem_uz: cd_initDateTimeRangePicker($('input#card_vag_date_rem_uz'), { lang: lang, time: false }, function (datetime) {

            }),
            // Собственник
            card_vag_name_owner: $('input#card_vag_name_owner'),
            // Начало аренды
            card_vag_rent_start: cd_initDateTimeRangePicker($('input#card_vag_rent_start'), { lang: lang, time: true }, function (datetime) {

            }),
            // Оператор
            card_vag_name_operator: $('input#card_vag_name_operator'),
            // Ограничение погрузки
            card_vag_limiting_loading: $('input#card_vag_limiting_loading'),
            // Признак собственности
            card_vag_type_ownership: $('select#card_vag_type_ownership'),
            // Ограничение уз
            card_vag_note: $('textarea#card_vag_note'),
            // Грузоподъемность эпд
            uz_vag_gruzp: $('input#uz_vag_gruzp'),
            // Весы тары
            uz_vag_ves_tary_arc: $('input#uz_vag_ves_tary_arc'),
            // Весы тары (уточн)
            uz_vag_u_tara: $('input#uz_vag_u_tara'),
            // Примечание к вагону
            uz_vag_note: $('textarea#uz_vag_note'),
            //---------------------------------------------------------------
            // Годность по прибытию
            uz_vag_condition_arrival: $('select#uz_vag_condition_arrival'),
            // Тип вагона
            uz_vag_type_wagon: $('select#uz_vag_type_wagon'),
            //---------------------------------------------------------------
            // Код платильщика
            uz_rask_kod_plat: $('input#uz_rask_kod_plat'),
            // Название платильщика
            uz_rask_name_plat: $('input#uz_rask_name_plat'),
            // Кнопка добавить платильщика
            uz_rask_name_plat_add: $('button#uz_rask_name_plat_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Плательщик по прибытию"', 'Будет добавлена новая запись плательщика [ Код = ' + cars_detali.uz_rask_kod_plat.val() + ', Название = ' + cars_detali.uz_rask_name_plat.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_PayerArrival(cars_detali.uz_rask_kod_plat.val(), cars_detali.uz_rask_name_plat.val(), function () {
                            cars_detali.update_list_name_plat(cars_detali.uz_rask_name_plat.val());
                            cars_detali.view_epd_plat(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),

            // Тарифное расстояние
            uz_rask_distance_way: $('input#uz_rask_distance_way'),
            // Тариф при выдачи
            uz_rask_pl_pay_summa: $('input#uz_rask_pl_pay_summa'),
            //---------------------------------------------------------------
            // ГРУЗЫ
            uz_cargo_kod_etsng: $('input#uz_cargo_kod_etsng'),
            uz_cargo_name_etsng: $('textarea#uz_cargo_name_etsng'),
            uz_cargo_name_etsng_add: $('button#uz_cargo_name_etsng_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Грузы ЕТСНГ"', 'Будет добавлена новая запись груза [ Код = ' + cars_detali.uz_cargo_kod_etsng.val() + ', Название = ' + cars_detali.uz_cargo_name_etsng.text() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_CargoETSNG(cars_detali.uz_cargo_kod_etsng.val(), cars_detali.uz_cargo_name_etsng.val(), function () {
                            cars_detali.update_list_cargo_etsng(cars_detali.uz_cargo_name_etsng.val());
                            if (cars_detali.select_otpr_cont) {
                                cars_detali.view_epd_cargo_etsng_of_cont(cars_detali.select_otpr_cont);
                            } else {
                                cars_detali.view_epd_cargo_etsng_of_vagon(cars_detali.select_otpr_vagon);
                            }
                        }, null);
                    }
                });
            }),
            uz_cargo_kod_gng: $('input#uz_cargo_kod_gng'),
            uz_cargo_name_gng: $('textarea#uz_cargo_name_gng'),
            uz_cargo_name_gng_add: $('button#uz_cargo_name_gng_add').on('click', function (event) {
                event.preventDefault();
                dialog_confirm.open('Cправочник "Грузы ГНГ"', 'Будет добавлена новая запись груза [ Код = ' + cars_detali.uz_cargo_kod_gng.val() + ', Название = ' + cars_detali.uz_cargo_name_gng.val() + ']', function (result) {
                    if (result) {
                        cars_detali.addDirectory_CargoGNG(cars_detali.uz_cargo_kod_gng.val(), cars_detali.uz_cargo_name_gng.val(), function () {
                            cars_detali.update_list_cargo_gng(cars_detali.uz_cargo_name_gng.val());
                            cars_detali.view_epd_cargo_gng(cars_detali.select_otpr);
                        }, null);
                    }
                });
            }),
            uz_cargo_group_cargo: $('input#uz_cargo_group_cargo'),
            // Сертификационные данные
            uz_cargo_certificate_data: $('select#uz_cargo_certificate_data'),
            // Сертификационные данные
            uz_cargo_commercial_condition: $('select#uz_cargo_commercial_condition'),
            // Анализ груза
            uz_cargo_cargo_analysis: $('textarea#uz_cargo_cargo_analysis'),
            // Кол пас
            uz_cargo_kol_pac: $('input#uz_cargo_kol_pac'),
            // Вес груза по ЭПД
            uz_cargo_vesg_doc: $('input#uz_cargo_vesg_doc'),
            // ЗПУ
            uz_cargo_nom_zpu: $('input#uz_cargo_nom_zpu'),
            //----------------------------------------------------------
            // Опасность
            // класс опасности
            uz_cargo_danger_class: $('input#uz_cargo_danger_class'),
            uz_cargo_danger_name: $('select#uz_cargo_danger_name'),
            // код опасности
            uz_cargo_danger_kod: $('input#uz_cargo_danger_kod'),
            //---------------------------------------------------------------
            // Таблица с документами на груз
            table_dosc: {
                html_table: $('#table-sender-doc'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_dosc.obj = cars_detali.table_dosc.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "id", title: langView('field_doc_id', langs), width: "50px", orderable: true, searchable: false },
                            { data: "description", title: langView('field_description', langs), width: "50px", orderable: true, searchable: false },
                            { data: "doc_date", title: langView('field_doc_date', langs), width: "50px", orderable: true, searchable: false },
                            { data: "doc_type", title: langView('field_doc_type', langs), width: "50px", orderable: true, searchable: false },
                            { data: "doc_type_name", title: langView('field_doc_type_name', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod_zd_use", title: langView('field_kod_zd_use', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kol", title: langView('field_kol', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    });
                },
                // Показать таблицу с данными
                view: function (sender_doc) {
                    cars_detali.table_dosc.load(sender_doc);
                    cars_detali.table_dosc.obj.draw();
                },
                // Загрузить данные
                load: function (sender_doc) {
                    cars_detali.table_dosc.list = sender_doc;
                    cars_detali.table_dosc.obj.clear();
                    for (i = 0; i < sender_doc.length; i++) {
                        cars_detali.table_dosc.obj.row.add(cars_detali.table_dosc.get_row(sender_doc[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    return {
                        "id": data.id,
                        "description": data.description,
                        "doc_date": data.doc_date !== null ? data.doc_date.replace(/T/g, ' ') : null,
                        "doc_type": data.doc_type,
                        "doc_type_name": data.doc_type_name,
                        "kod_zd_use": data.kod_zd_use !== null ? Number(data.kod_zd_use) : null,
                        "kol": data.kol !== null ? Number(data.kol) : null,
                    };
                }
            },
            // Акты
            table_acts: {
                html_table: $('#table-acts'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_acts.obj = cars_detali.table_acts.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "carrier_kod", title: langView('field_carrier_kod', langs), width: "50px", orderable: true, searchable: false },
                            { data: "carrier_name", title: langView('field_carrier_name', langs), width: "50px", orderable: true, searchable: false },
                            { data: "date_akt", title: langView('field_date_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "date_dved", title: langView('field_date_dved', langs), width: "50px", orderable: true, searchable: false },
                            { data: "esr_akt", title: langView('field_esr_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "stn_name_akt", title: langView('field_stn_name_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_akt", title: langView('field_nom_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_dved", title: langView('field_nom_dved', langs), width: "50px", orderable: true, searchable: false },
                            { data: "oper_date", title: langView('field_oper_date', langs), width: "50px", orderable: true, searchable: false },
                            { data: "prichina_akt", title: langView('field_prichina_akt', langs), width: "50px", orderable: true, searchable: false },
                            { data: "responsible_person", title: langView('field_responsible_person', langs), width: "50px", orderable: true, searchable: false },
                            { data: "ser_dved", title: langView('field_ser_dved', langs), width: "50px", orderable: true, searchable: false },
                            { data: "type", title: langView('field_type', langs), width: "50px", orderable: true, searchable: false },
                            { data: "vagon_nom", title: langView('field_vagon_nom', langs), width: "50px", orderable: true, searchable: false },
                            { data: "zd_kod", title: langView('field_zd_kod', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    });
                },
                // Показать таблицу с данными
                view: function (act) {
                    cars_detali.table_acts.load(act);
                    cars_detali.table_acts.obj.draw();
                },
                // Загрузить данные
                load: function (act) {
                    cars_detali.table_acts.list = act;
                    cars_detali.table_acts.obj.clear();
                    for (i = 0; i < act.length; i++) {
                        cars_detali.table_acts.obj.row.add(cars_detali.table_acts.get_row(act[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    return {
                        "carrier_kod": data.carrier_kod !== null ? Number(data.carrier_kod) : null,
                        "carrier_name": data.carrier_name,
                        "date_akt": data.date_akt !== null ? data.date_akt.replace(/T/g, ' ') : null,
                        "date_dved": data.date_dved !== null ? data.date_dved.replace(/T/g, ' ') : null,
                        "esr_akt": data.esr_akt,
                        "stn_name_akt": data.stn_name_akt,
                        "nom_akt": data.nom_akt,
                        "nom_dved": data.nom_dved !== null ? Number(data.nom_dved) : null,
                        "oper_date": data.oper_date !== null ? data.oper_date.replace(/T/g, ' ') : null,
                        "prichina_akt": data.prichina_akt,
                        "responsible_person": data.responsible_person,
                        "ser_dved": data.ser_dved,
                        "type": data.type, // ActKind
                        "vagon_nom": data.vagon_nom,
                        "zd_kod": data.zd_kod !== null ? Number(data.zd_kod) : null,
                    };
                }
            },
            // Контейнеры
            table_cont: {
                html_table: $('#table-cont'),
                obj: null,
                list: null,
                // Инициализировать таблицу
                init: function () {
                    cars_detali.table_cont.obj = cars_detali.table_cont.html_table.DataTable({
                        "paging": false,
                        "searching": false,
                        "ordering": true,
                        "info": false,
                        "select": false,
                        "autoWidth": true,
                        //"filter": true,
                        //"scrollY": "600px",
                        "scrollX": true,
                        language: language_table(langs),
                        jQueryUI: false,
                        "createdRow": function (row, data, index) {
                            //$(row).attr('id', data.num);
                        },
                        columns: [
                            { data: "nom_cont", title: langView('field_nom_cont', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod_tiporazmer", title: langView('field_kod_tiporazmer', langs), width: "50px", orderable: true, searchable: false },
                            { data: "gruzp", title: langView('field_gruzp', langs), width: "50px", orderable: true, searchable: false },
                            { data: "ves_tary_arc", title: langView('field_ves_tary_arc', langs), width: "50px", orderable: true, searchable: false },
                            { data: "vesg", title: langView('field_vesg', langs), width: "50px", orderable: true, searchable: false },
                            { data: "brutto", title: langView('field_brutto', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod_etsng", title: langView('field_kod_etsng', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kol_pac", title: langView('field_kol_pac', langs), width: "50px", orderable: true, searchable: false },
                            { data: "kod", title: langView('field_kod', langs), width: "50px", orderable: true, searchable: false },
                            { data: "summa", title: langView('field_summa', langs), width: "50px", orderable: true, searchable: false },
                            { data: "nom_zpu", title: langView('field_nom_zpu', langs), width: "50px", orderable: true, searchable: false },
                        ],
                        stateSave: false,
                    });
                },
                // Показать таблицу с данными
                view: function (conts) {
                    cars_detali.table_cont.load(conts);
                    cars_detali.table_cont.obj.draw();
                },
                // Загрузить данные
                load: function (conts) {
                    cars_detali.table_cont.list = conts;
                    cars_detali.table_cont.obj.clear();
                    for (i = 0; i < conts.length; i++) {
                        cars_detali.table_cont.obj.row.add(cars_detali.table_cont.get_row(conts[i]));
                    }
                },
                // Получить строку для таблицы
                get_row: function (data) {
                    return {

                        "nom_cont": data.nom_cont,
                        "kod_tiporazmer": data.kod_tiporazmer,
                        "gruzp": data.gruzp ? Number(data.gruzp) : null,
                        "ves_tary_arc": data.ves_tary_arc ? Number(Number(data.ves_tary_arc) / 1000).toFixed(3) : null,
                        "vesg": data.collect_k ? Number(Number(data.collect_k.vesg) / 1000).toFixed(3) : null,
                        "brutto": data.ves_tary_arc && data.collect_k ? Number((Number(data.ves_tary_arc) + Number(data.collect_k.vesg)) / 1000).toFixed(3) : null,
                        "kod": data.pay_k && data.pay_k.length > 0 ? data.pay_k[0].kod : null,
                        "summa": data.pay_k && data.pay_k.length > 0 ? Number(Number(data.pay_k[0].summa) / 100).toFixed(3) : null,
                        "nom_zpu": data.zpu_k && data.zpu_k.length > 0 ? data.zpu_k[0].nom_zpu : null,
                        "kol_pac": data.collect_k ? Number(data.collect_k.kol_pac) : null,
                        "kod_etsng": data.collect_k ? Number(data.collect_k.kod_etsng) : null,

                    };
                }
            },

            //======================================================================================
            // ВАЛИДАЦИЯ СПРАВОЧНИКОВ
            //======================================================================================
            // Валидация данных справочника "Карточки вагонов"
            validation_card_vag: function () {
                cars_detali.val_card_vag.clear_all();
                var valid = true;
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_kod_adm, "Укажите код администрации");
                valid = valid & cars_detali.val_card_vag.checkSelection(cars_detali.card_vag_name_adm, "Выберите администрацию");
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_name_rod_vag, "Укажите род вагона");
                valid = valid & cars_detali.val_card_vag.checkInputOfList(cars_detali.card_vag_name_rod_vag, cars_detali.ids_inc.ids_dir.getListGenusWagons('id', 'genus', cars_detali.lang, null), "Указаного 'Рода вагона' нет в справочнике");
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_name_owner, "Укажите собственника");
                valid = valid & cars_detali.val_card_vag.checkInputOfList(cars_detali.card_vag_name_owner, cars_detali.ids_inc.ids_dir.getListOwnersWagons('id', 'owner', cars_detali.lang, null), "Указаного 'Владельца' нет в справочнике");
                //cars_detali.val_card_vag.set_control_ok(cars_detali.card_vag_name_operator);
                valid = valid & cars_detali.val_card_vag.checkInputOfList_IsNull(cars_detali.card_vag_name_operator, cars_detali.ids_inc.ids_dir.getListOperatorsWagons('id', 'operators', cars_detali.lang, null), "Указаного 'Оператора' нет в справочнике");
                //valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_gruzp, "Укажите грузоподъемность");
                valid = valid & cars_detali.val_card_vag.checkInputOfRange(cars_detali.card_vag_gruzp, 60.0, 80.0, "Грузоподъемность должна быть в диапазоне от 60.0 до 80.0 тон.");
                valid = valid & cars_detali.val_card_vag.checkSelection(cars_detali.card_vag_kol_os, "Укажите количество осей (0- по умолчанию, 4,8,12,16,32)");
                cars_detali.val_card_vag.set_control_ok(cars_detali.card_vag_usl_tip);
                valid = valid & cars_detali.val_card_vag.checkInputOfDateTime_IsNull(cars_detali.card_vag_date_rem_vag.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & cars_detali.val_card_vag.checkInputOfDateTime_IsNull(cars_detali.card_vag_date_rem_uz.obj, lang === 'ru' ? 'DD.MM.YYYY' : 'MM/DD/YYYY');
                valid = valid & cars_detali.val_card_vag.checkInputOfList_IsNull(cars_detali.card_vag_limiting_loading, cars_detali.ids_inc.ids_dir.getListLimitingLoading('id', 'limiting_name', cars_detali.lang, null), "Указаного 'Ограничения погрузки' нет в справочнике");
                valid = valid & cars_detali.val_card_vag.checkInputOfList_IsNull(cars_detali.card_vag_type_ownership, cars_detali.ids_inc.ids_dir.getListTypeOwnerShip('id', 'type_ownership', cars_detali.lang, null), "Указаного 'Признака собственности' нет в справочнике");
                valid = valid & cars_detali.val_card_vag.checkInputOfNull(cars_detali.card_vag_rent_start.obj, "Укажите время начало аренды");
                cars_detali.val_card_vag.set_control_ok(cars_detali.card_vag_note);

                return valid;
            },
            //======================================================================================
            // ПРАВКА СПРАВОЧНИКОВ
            //======================================================================================
            // Добавить запись в справочник Shipper
            addDirectory_Shipper: function (stn, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postShipper({
                    code: stn,
                    shipper_name_ru: name,
                    shipper_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadShipper(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                })
            },
            // Добавить запись в справочник ExternalNetworkStation
            addDirectory_ExternalStation: function (stn, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                var ir = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn);
                cars_detali.ids_inc.ids_dir.postExternalStation({
                    code: stn,
                    station_name_ru: name,
                    station_name_en: name,
                    code_inlandrailway: ir.code,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadExternalStation(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                })
            },
            // Добавить запись в справочник BorderCheckpoint
            addDirectory_BorderCheckpoint: function (stn, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                var ir = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn);
                cars_detali.ids_inc.ids_dir.postBorderCheckpoint(
                    {
                        code: stn,
                        station_name_ru: name,
                        station_name_en: name,
                        code_inlandrailway: ir.code,
                        create: toISOStringTZ(new Date()),
                        create_user: cars_detali.user
                    },
                    function (result_add) {
                        if (result_add > 0) {
                            // Ок
                            cars_detali.ids_inc.ids_dir.loadBorderCheckpoint(function () {
                                if (typeof callback_ok === 'function') {
                                    callback_ok();
                                }
                                LockScreenOff();
                            });
                        } else {
                            cars_detali.alert.clear_message();
                            cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                            if (typeof callback_err === 'function') {
                                callback_err();
                            }
                            LockScreenOff();
                        }
                    });
            },
            // Добавить запись в справочник "Карточки вагонов"
            addDirectory_Cars: function (callback_ok, callback_err) {
                var valid = cars_detali.validation_card_vag();
                if (valid) {
                    LockScreen(langView('mess_save', langs));
                    var new_card_vag = {
                        id: 0,
                        num: cars_detali.select_num,
                        id_countrys: get_select_number_value(cars_detali.card_vag_name_adm),
                        id_genus: cars_detali.ids_inc.ids_dir.getID_GenusWagons_Internal_Of_Name(cars_detali.card_vag_name_rod_vag.val(), 'genus', cars_detali.lang),
                        id_owner: cars_detali.ids_inc.ids_dir.getID_OwnersWagons_Internal_Of_Name(cars_detali.card_vag_name_owner.val(), 'owner', cars_detali.lang),
                        ban_changes_operator: cars_detali.select_vagon.ban_changes_operator,
                        id_operator: cars_detali.ids_inc.ids_dir.getID_OperatorsWagons_Internal_Of_Name(cars_detali.card_vag_name_operator.val(), 'operators', cars_detali.lang),
                        gruzp: cars_detali.uz_vag_gruzp.val() !== '' ? Number(cars_detali.uz_vag_gruzp.val()) : null,
                        kol_os: Number(cars_detali.card_vag_kol_os.val()),
                        usl_tip: cars_detali.card_vag_usl_tip.val(),
                        date_rem_uz: toISOStringTZ(get_date_value(cars_detali.card_vag_date_rem_uz.val(), cars_detali.lang)),
                        date_rem_vag: toISOStringTZ(get_date_value(cars_detali.card_vag_date_rem_vag.val(), cars_detali.lang)),
                        id_limiting: cars_detali.ids_inc.ids_dir.getID_LimitingLoading_Internal_Of_Name(cars_detali.card_vag_name_operator.val(), 'limiting_name', cars_detali.lang),
                        id_type_ownership: cars_detali.ids_inc.ids_dir.getID_TypeOwnerShip_Internal_Of_Name(cars_detali.card_vag_name_operator.val(), 'type_ownership', cars_detali.lang),
                        rent_start: toISOStringTZ(get_date_value(cars_detali.card_vag_rent_start.val(), cars_detali.lang)),
                        rent_end: null,
                        note: cars_detali.card_vag_note.val(),
                        sobstv_kis: null,
                        create: toISOStringTZ(new Date()),
                        create_user: cars_detali.user
                    };
                    cars_detali.ids_inc.ids_dir.postCars(new_card_vag, function (result_add) {
                        if (result_add > 0) {
                            // Ок
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        } else {
                            cars_detali.val_card_vag.clear_all();
                            cars_detali.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                            if (typeof callback_err === 'function') {
                                callback_err();
                            }
                            LockScreenOff();
                        }
                    });
                };
            },
            // Добавить запись в справочник PayerArrival
            addDirectory_PayerArrival: function (code, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postPayerArrival({
                    code: code,
                    payer_name_ru: name,
                    payer_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadPayerArrival(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            // Добавить запись в справочник CargoETSNG
            addDirectory_CargoETSNG: function (code, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postCargoETSNG({
                    code: code,
                    cargo_etsng_name_ru: name,
                    cargo_etsng_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.postCargo({
                            id: 0,
                            id_group: 0,
                            id_cargo_etsng: result_add,
                            cargo_name_ru: name.substr(0, 49),
                            cargo_name_en: name.substr(0, 49),
                            create: toISOStringTZ(new Date()),
                            create_user: cars_detali.user
                        }, function (result_add_cargo) {
                            if (result_add_cargo > 0) {
                                cars_detali.ids_inc.ids_dir.loadCargoETSNG(function () {
                                    cars_detali.ids_inc.ids_dir.loadCargo(function () {
                                        if (typeof callback_ok === 'function') {
                                            callback_ok();
                                        }
                                        LockScreenOff();
                                    });
                                });
                            } else {
                                cars_detali.alert.clear_message();
                                cars_detali.alert.out_error_message("Ошибка. При добавлении записи в в основной справочник 'Грузов' возникла ошибка.");
                                if (typeof callback_err === 'function') {
                                    callback_err();
                                }
                                LockScreenOff();
                            }
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник 'Грузов ЕТСНГ' возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            // Добавить запись в справочник CargoGNG
            addDirectory_CargoGNG: function (code, name, callback_ok, callback_err) {
                LockScreen(langView('mess_save', langs));
                cars_detali.ids_inc.ids_dir.postCargoGNG({
                    code: code,
                    cargo_gng_name_ru: name,
                    cargo_gng_name_en: name,
                    create: toISOStringTZ(new Date()),
                    create_user: cars_detali.user
                }, function (result_add) {
                    if (result_add > 0) {
                        // Ок
                        cars_detali.ids_inc.ids_dir.loadCargoGNG(function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                            LockScreenOff();
                        });
                    } else {
                        cars_detali.alert.clear_message();
                        cars_detali.alert.out_error_message("Ошибка. При добавлении записи в справочник 'Грузов ЕТСНГ' возникла ошибка.");
                        if (typeof callback_err === 'function') {
                            callback_err();
                        }
                        LockScreenOff();
                    }
                });
            },
            //======================================================================================
            // ИНИЦИАЛИЗАЦИЯ И ОБНОВЛЕНИЕ ЭЛЕМЕНТОВ
            //======================================================================================
            // Загрузка библиотек
            loadReference: function (callback) {
                LockScreen(langView('mess_load', langs));
                var count = 1;
                cars_detali.ids_inc.load([], ['hazard_class', 'commercial_condition', 'certification_data', 'payer_arrival', 'cargo', 'cargo_gng', 'cargo_etsng', 'cargo_group', 'type_wagons', 'condition_arrival', 'type_owner_ship', 'limiting_loading', 'operators_wagons', 'owners_wagons', 'genus_wagon', 'countrys', 'railway', 'inlandrailway', 'external_station', 'station', 'consignee', 'shipper', 'border_checkpoint'], ['internal_railroad'], false, function () {
                    count -= 1;
                    if (count === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            },
            // Инициализация
            init: function (lang, user_name) {
                cars_detali.lang = lang;
                cars_detali.user = user_name;
                // создадим классы
                cars_detali.ids_inc = new IDS_RWT_INCOMING(cars_detali.lang); // Создадим класс IDS_RWT_INCOMING
                cars_detali.alert = new ALERT($('div#car-detali-alert'));// Создадим класс ALERTG
                //
                // Соберем все элементы в массив
                cars_detali.all_obj_card_vag = $([])
                    .add(cars_detali.card_vag_kod_adm)
                    .add(cars_detali.card_vag_name_adm)
                    .add(cars_detali.card_vag_name_rod_vag)
                    .add(cars_detali.card_vag_name_owner)
                    .add(cars_detali.card_vag_name_operator)
                    .add(cars_detali.card_vag_gruzp)
                    .add(cars_detali.card_vag_kol_os)
                    .add(cars_detali.card_vag_usl_tip)
                    .add(cars_detali.card_vag_date_rem_vag.obj)
                    .add(cars_detali.card_vag_date_rem_uz.obj)
                    .add(cars_detali.card_vag_limiting_loading)
                    .add(cars_detali.card_vag_type_ownership)
                    .add(cars_detali.card_vag_note)
                    .add(cars_detali.card_vag_rent_start.obj);
                // Валидации
                cars_detali.val_card_vag = new VALIDATION(cars_detali.lang, cars_detali.alert_card_vag, cars_detali.all_obj_card_vag); // Создадим класс VALIDATION
                // Таблицы
                cars_detali.table_dosc.init();// Инициализация таблицы с документами
                cars_detali.table_acts.init();// Инициализация таблицы с акт
                cars_detali.table_cont.init();// Инициализация таблицы с контейнера
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
            // Загрузить списочные компоненты
            init_select: function () {
                cars_detali.update_list_station_name_from(null);        // Станция отправитель
                cars_detali.update_list_station_name_on(null);          // Станция получатель
                cars_detali.update_list_station_border(null);           // Пограничный пункт
                cars_detali.update_list_consignee(null);                // Грузополучатели
                cars_detali.update_list_shipper(null);                  // Грузопоотправитель
                cars_detali.update_list_station_on_amkr(-1);            // Станция АМКР
                cars_detali.update_list_adm(-1);                        // Администрации
                cars_detali.update_list_rod(null);                      // Род вагона
                cars_detali.update_list_owner(null);                    // Владелец вагона
                cars_detali.update_list_operator(null);                 // Оператор вагона
                cars_detali.update_list_kol_os(0);                      // Количество осей
                cars_detali.update_list_limiting_loading(null);         // Ограничение погрузки
                cars_detali.update_list_type_ownership(-1);             // Признак собственности
                cars_detali.update_list_condition_arrival(-1);          // Годность по прибытию
                cars_detali.update_list_type_wagon(-1);                 // Тип вагона
                cars_detali.update_list_name_plat(null);                // Плательщик по прибытию
                cars_detali.update_list_cargo_etsng(null);              // Грузы ЕТ СНГ
                cars_detali.update_list_cargo_gng(null);                // Грузы ЕТ ГНГ
                cars_detali.update_list_certificate_data(-1);           // сертификационные данные
                cars_detali.update_list_commercial_condition(-1);       // комерчиское состояние
                cars_detali.update_list_danger_name(-1);                // класс опасности
            },
            // -------- ОБНОВЛЕНИЕ ------------------------------------------------------
            // Обновить компонент список грузоотправителей
            update_list_shipper: function (text) {
                cars_detali.uz_cargo_client_name_from = this.uz_cargo_client_name_from.autocomplete({
                    minLength: 2,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListShipper('code', 'shipper_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент список грузополучателей
            update_list_consignee: function (code) {
                cars_detali.select_uz_cargo_client_name_on = cd_initSelect(
                    $('select#uz_cargo_client_name_on'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListConsignee('code', 'name', null, function (i) { return !i.auxiliary }),
                    null,
                    code ? Number(code) : -1,
                    function (event) {
                        event.preventDefault();
                        var code = $(this).val();
                        if (Number(code) === 7932) {
                            cars_detali.set_mode(false);
                        } else {
                            cars_detali.set_mode(true);
                        }
                    },
                    null);
            },
            // Обновить компонент станция отправки
            update_list_station_name_from: function (text) {
                cars_detali.uz_route_name_from = this.uz_route_name_from.autocomplete({
                    minLength: 3,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListExternalStation('code', 'station_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент станция отправки
            update_list_station_name_on: function (text) {
                cars_detali.uz_route_name_on = this.uz_route_name_on.autocomplete({
                    minLength: 3,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListExternalStation('code', 'station_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент пограничные пункты
            update_list_station_border: function (text) {
                cars_detali.uz_route_stn_border_name = this.uz_route_stn_border_name.autocomplete({
                    minLength: 3,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListBorderCheckpoint('code', 'station_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент станций АМКР
            update_list_station_on_amkr: function (id) {
                cars_detali.uz_vag_station_on_amkr = cd_initSelect(
                    $('select#uz_vag_station_on_amkr'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListStation('id', 'station_name', cars_detali.lang, function (i) { return !i.station_uz }),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент Администрации
            update_list_adm: function (id) {
                cars_detali.card_vag_name_adm = cd_initSelect(
                    $('select#card_vag_name_adm'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListCountrys('id', 'countrys_name', cars_detali.lang, function (i) { return i.code_sng !== null ? true : false; }),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                        cars_detali.card_vag_kod_adm.val(cars_detali.ids_inc.ids_dir.getValue_Countrys_Of_ID(Number(id), 'code_sng'));
                    },
                    null);
            },
            // Обновить компонент род вагона
            update_list_rod: function (text) {
                cars_detali.card_vag_name_rod_vag = cars_detali.card_vag_name_rod_vag.autocomplete({
                    minLength: 2,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListGenusWagons('rod_uz', 'genus', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {
                        //var text = cars_detali.card_vag_name_rod_vag.val();
                        //var id = cars_detali.ids_inc.ids_dir.getID_GenusWagons_Internal_Of_Name(text, 'genus', cars_detali.lang);
                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент владелец
            update_list_owner: function (text) {
                cars_detali.card_vag_name_owner = cars_detali.card_vag_name_owner.autocomplete({
                    minLength: 2,
                    source: getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListOwnersWagons('id', 'owner', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент оператор
            update_list_operator: function (text) {
                cars_detali.card_vag_name_operator = cars_detali.card_vag_name_operator.autocomplete({
                    minLength: 2,
                    source: getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListOperatorsWagons('id', 'operators', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент станций АМКР
            update_list_kol_os: function (id) {
                cars_detali.card_vag_kol_os = cd_initSelect(
                    $('select#card_vag_kol_os'),
                    { lang: lang },
                    [{ value: 0, text: "0" }, { value: 4, text: "4" }, { value: 8, text: "8" }, { value: 12, text: "12" }, { value: 16, text: "16" }, { value: 32, text: "32" }],
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент ограничение погрузки
            update_list_limiting_loading: function (text) {
                cars_detali.card_vag_limiting_loading = cars_detali.card_vag_limiting_loading.autocomplete({
                    minLength: 2,
                    source: getAutocompleteListText(cars_detali.ids_inc.ids_dir.getListLimitingLoading('id', 'limiting_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент признак собственности
            update_list_type_ownership: function (id) {
                cars_detali.card_vag_type_ownership = cd_initSelect(
                    $('select#card_vag_type_ownership'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListTypeOwnerShip('id', 'type_ownership', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент годность по прибытию
            update_list_condition_arrival: function (id) {
                cars_detali.uz_vag_condition_arrival = cd_initSelect(
                    $('select#uz_vag_condition_arrival'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getList2ConditionArrival('id', 'condition_abbr', 'condition_name', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент тип вагона
            update_list_type_wagon: function (id) {
                cars_detali.uz_vag_type_wagon = cd_initSelect(
                    $('select#uz_vag_type_wagon'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListTypeWagons('id', 'type', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент платильщик по прибытию
            update_list_name_plat: function (text) {
                cars_detali.uz_rask_name_plat = this.uz_rask_name_plat.autocomplete({
                    minLength: 2,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListPayerArrival('code', 'payer_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент грузы ЕТ СНГ
            update_list_cargo_etsng: function (text) {
                cars_detali.uz_cargo_name_etsng = this.uz_cargo_name_etsng.autocomplete({
                    minLength: 2,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListCargoETSNG('code', 'cargo_etsng_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент грузы ГНГ
            update_list_cargo_gng: function (text) {
                cars_detali.uz_cargo_name_gng = this.uz_cargo_name_gng.autocomplete({
                    minLength: 2,
                    source: getAutocompleteList(cars_detali.ids_inc.ids_dir.getListCargoGNG('code', 'cargo_gng_name', cars_detali.lang, null), 'text'),
                    change: function (event, ui) {

                    },
                    select: function (event, ui) {

                    }
                }).val(text ? text : '');
            },
            // Обновить компонент сертификационные данные
            update_list_certificate_data: function (id) {
                cars_detali.uz_cargo_certificate_data = cd_initSelect(
                    $('select#uz_cargo_certificate_data'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListCertificationData('id', 'certification_data', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить компонент комерчиские данные
            update_list_commercial_condition: function (id) {
                cars_detali.uz_cargo_commercial_condition = cd_initSelect(
                    $('select#uz_cargo_commercial_condition'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListCommercialCondition('id', 'commercial_condition', cars_detali.lang, null),
                    null,
                    id ? Number(id) : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },
            // Обновить класс опасности
            update_list_danger_name: function (code) {
                cars_detali.uz_cargo_danger_name = cd_initSelect(
                    $('select#uz_cargo_danger_name'),
                    { lang: lang },
                    cars_detali.ids_inc.ids_dir.getListHazardClass('code', 'hazard_class', cars_detali.lang, null),
                    null,
                    code ? code : -1,
                    function (event) {
                        event.preventDefault();
                    },
                    null);
            },

            // -------- УПРАВЛЕНИЕ РЕЖИМАМИ ------------------------------------------------------
            // Возвращает свойство "редактирование разрешено" - true, запрещено -false
            is_edit_mode_of_element: function (el) {
                var d = $(el).attr('data-edit');
                var res = $(el).attr('data-edit') === 'open' || $(el).attr('data-edit') === '' ? true : false;
                return res;
            },
            // Устоновить режим эементов (false-view; true-edit)
            set_mode: function (mode) {
                $('[data-mode]').each(function (i, el) {
                    var edit = $(el).attr('data-edit');
                    switch ($(el).attr('data-mode')) {
                        case 'all': {
                            if (cars_detali.is_edit_mode_of_element(el)) { $(el).prop("disabled", !mode); }
                            else { $(el).prop("disabled", true); }
                            break;
                        }
                        case 'view': {
                            $(el).prop("disabled", true);
                            if (cars_detali.is_edit_mode_of_element(el)) { if (!mode) { $(el).show(); } else { $(el).hide(); } }
                            else { $(el).show(); }
                            break;
                        }
                        case 'view-global': {
                            $(el).prop("disabled", true);
                            break;
                        }
                        case 'edit': {
                            $(el).prop("disabled", false);
                            if (cars_detali.is_edit_mode_of_element(el)) { if (mode) { $(el).show(); } else { $(el).hide(); } }
                            else { $(el).hide(); }
                            break;
                        }
                        case 'edit-global': {
                            // Глобальный элемент для редактирования (не активный только когда - close)
                            //$(el).show(); убрал иза элемента bootstrap-input-spinner (он скрыт), можно добавить атрибут этого элемента и тогда пропускать
                            if (cars_detali.is_edit_mode_of_element(el)) { $(el).prop("disabled", false); }
                            else { $(el).prop("disabled", true); }
                            break;
                        }
                    }
                });
            },
            // Закрыть элементы для редактирования (вагон принят)
            set_open_edit: function () {
                $('[data-form="transceiver"]').each(function (i, el) {
                    $(el).attr('data-edit', 'open');
                    cars_detali.set_mode(false);
                });
            },
            // Открыть элементы для редактирования (вагон новый или принемается)
            set_close_edit: function () {
                $('[data-form="transceiver"]').each(function (i, el) {
                    $(el).attr('data-edit', 'close');
                });
                cars_detali.set_mode(false);
            },
            // -------- ОЧИСТКА ------------------------------------------------------
            // Очистить все ячейки
            clear: function () {
                // Очистить сообщения
                cars_detali.alert.clear_message();
                // Очистить не принятые вагоны.. ! добавить остальные ячейки
                cars_detali.select_otpr = null;
                cars_detali.select_id = null;
                cars_detali.select_num = null;
                cars_detali.select_otpr_vagon = null;
                cars_detali.select_otpr_cont = null;
                cars_detali.select_vagon = null;
                $('div#list-cars-not-arrival').empty();
                cars_detali.clear_cars_epd(); // Очистить ячейки ЭПД
            },
            // Очистить ячейки ЭПД
            clear_cars_epd: function () {
                // Показать кнопку поиска по номеру вагона
                cars_detali.show_booton_not(); // Убрать отображение кнопок

                cars_detali.num_car.val('');
                cars_detali.uz_doc_num_doc.val('');
                cars_detali.uz_doc_num_new_doc.val('');

                cars_detali.uz_route_stn_from.val('');
                cars_detali.uz_route_name_from.val('');
                cars_detali.uz_route_name_railway_from.val('');
                cars_detali.bt_route_name_from_add.hide();

                cars_detali.uz_route_stn_on.val('');
                cars_detali.uz_route_name_on.val('');
                cars_detali.uz_route_name_railway_on.val('');
                cars_detali.bt_route_name_on_add.hide();

                cars_detali.uz_route_stn_border.val('');
                cars_detali.uz_route_stn_border_name.val('');
                cars_detali.bt_route_stn_border_add.hide();
                cars_detali.uz_route_border_cross_time.val('');

                cars_detali.uz_cargo_client_kod_from.val('');
                cars_detali.uz_cargo_client_name_from.val('');
                cars_detali.bt_client_name_from_add.hide();

                cars_detali.bt_card_vag_add.hide();
                cars_detali.uz_cargo_client_kod_on.val('');
                cars_detali.select_uz_cargo_client_name_on.val(-1);


                cars_detali.val_card_vag.clear_all();       // Очистим ошибки и сообщения в разделе вагоны;
                cars_detali.card_vag_kod_adm.val('');
                cars_detali.card_vag_name_adm.val(-1);
                cars_detali.card_vag_name_rod_vag.val('');
                cars_detali.card_vag_usl_tip.val('');
                cars_detali.card_vag_kol_os.val('');
                cars_detali.card_vag_gruzp.val('');
                cars_detali.card_vag_date_rem_vag.setDateTime(null); // уберем дату
                cars_detali.card_vag_date_rem_uz.setDateTime(null); // уберем дату
                cars_detali.card_vag_name_owner.val('');
                cars_detali.card_vag_rent_start.setDateTime(null); // уберем дату
                cars_detali.card_vag_name_operator.val('');
                cars_detali.card_vag_limiting_loading.val('');
                cars_detali.card_vag_type_ownership.val(-1);
                cars_detali.card_vag_note.val('');

                cars_detali.uz_vag_condition_arrival.val(-1);
                cars_detali.uz_vag_type_wagon.val(-1);

                cars_detali.uz_vag_gruzp.val('');
                cars_detali.uz_vag_ves_tary_arc.val('');
                cars_detali.uz_vag_u_tara.val('');

                cars_detali.table_dosc.view([]);
                cars_detali.table_acts.view([]);
                $('span#count-docs').text('');
                $('span#count-acts').text('');

                cars_detali.uz_rask_kod_plat.val('');
                cars_detali.uz_rask_name_plat.val('');
                cars_detali.uz_rask_name_plat_add.hide();
                cars_detali.uz_rask_distance_way.val('');
                cars_detali.uz_rask_pl_pay_summa.val('');

                cars_detali.uz_cargo_kod_etsng.val('');
                cars_detali.uz_cargo_name_etsng.val('');
                cars_detali.uz_cargo_name_etsng_add.hide();
                cars_detali.uz_cargo_kod_gng.val('');
                cars_detali.uz_cargo_name_gng.val('');
                cars_detali.uz_cargo_name_gng_add.hide();
                cars_detali.uz_cargo_group_cargo.val('');

                cars_detali.uz_cargo_certificate_data.val(-1);
                cars_detali.uz_cargo_commercial_condition.val(-1);
                cars_detali.uz_cargo_cargo_analysis.val('');

                cars_detali.uz_cargo_kol_pac.val('');
                cars_detali.uz_cargo_vesg_doc.val('');
                cars_detali.uz_cargo_nom_zpu.val('');

                cars_detali.uz_cargo_danger_class.val('');
                cars_detali.uz_cargo_danger_name.val(-1);
                cars_detali.uz_cargo_danger_kod.val('');

                cars_detali.table_cont.view([]);
                $('span#count-cont').text('');
            },
            //=================================================================================
            // ОТОБРАЖЕНИЕ ЭПД
            //=================================================================================
            // Показать грузоотправителя и грузополучателя
            view_epd_client: function (otpr) {
                cars_detali.select_uz_cargo_client_name_on.prop("disabled", false);
                var client_kod_from = null, client_name_from = null, client_kod_on = null, client_name_on = null;
                if (otpr && otpr.client && otpr.client.length > 0) {
                    otpr.client.forEach(function (el, i, arr) {
                        if (Number(el.type) === 1) {
                            client_kod_from = el.kod;
                            client_name_from = el.name;
                            var shipper = cars_detali.ids_inc.ids_dir.getShipper_Of_Code(el.kod); // Иногда код россии пустой
                            if (!el.kod || shipper) {
                                cars_detali.bt_client_name_from_add.hide();
                            } else {
                                cars_detali.bt_client_name_from_add.show();
                            }
                        };
                        if (Number(el.type) === 2) {
                            client_kod_on = el.kod;
                            client_name_on = el.name;
                            cars_detali.select_uz_cargo_client_name_on.prop("disabled", true);
                        };
                    });
                }
                cars_detali.uz_cargo_client_kod_from.val(client_kod_from);
                cars_detali.uz_cargo_client_name_from.val(client_name_from);
                cars_detali.uz_cargo_client_kod_on.val(client_kod_on);
                cars_detali.select_uz_cargo_client_name_on.val(client_kod_on);
            },
            // Показать станцию отправления
            view_epd_station_from: function (otpr) {
                var stn_from = null, name_from = null, ir_name_from = null;
                if (otpr && otpr.route && otpr.route.length > 0) {
                    stn_from = cars_detali.select_otpr.route[0].stn_from;
                    name_from = cars_detali.select_otpr.route[0].name_from;
                    var enstation = cars_detali.ids_inc.ids_dir.getExternalStation_Of_Code(stn_from); // Определим запись в справочнике
                    if (enstation) {
                        cars_detali.bt_route_name_from_add.hide();
                        if (enstation.Directory_InlandRailway) {
                            ir_name_from = cars_detali.ids_inc.ids_dir.getValueCultureObj(enstation.Directory_InlandRailway, 'inlandrailway_name');
                        }
                    } else {
                        cars_detali.bt_route_name_from_add.show();
                        // Определим дорогу
                        var ir_from = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn_from);
                        if (ir_from) {
                            ir_name_from = ir_from.internal_railroad;
                        }
                    }
                }
                cars_detali.uz_route_stn_from.val(stn_from);
                cars_detali.uz_route_name_from.val(name_from);
                cars_detali.uz_route_name_railway_from.val(ir_name_from);
            },
            // Показать станцию прибытия
            view_epd_station_on: function (otpr) {
                var stn_on = null, name_on = null, ir_name_on = null;
                if (otpr && otpr.route && otpr.route.length > 0) {
                    stn_on = cars_detali.select_otpr.route[0].stn_to;
                    name_on = cars_detali.select_otpr.route[0].name_to;
                    var enstation = cars_detali.ids_inc.ids_dir.getExternalStation_Of_Code(stn_on); // Определим запись в справочнике
                    if (enstation) {
                        cars_detali.bt_route_name_on_add.hide();
                        if (enstation.Directory_InlandRailway) {
                            ir_name_on = cars_detali.ids_inc.ids_dir.getValueCultureObj(enstation.Directory_InlandRailway, 'inlandrailway_name');
                        }
                    } else {
                        cars_detali.bt_route_name_on_add.show();
                        // Определим дорогу
                        var ir_on = cars_detali.ids_inc.uz_dir.getInternalRailroad_Internal_Of_StationCode(stn_on);
                        if (ir_on) {
                            ir_name_on = ir_on.internal_railroad;
                        }
                    }
                }
                cars_detali.uz_route_stn_on.val(stn_on);
                cars_detali.uz_route_name_on.val(name_on);
                cars_detali.uz_route_name_railway_on.val(ir_name_on);
            },
            // Показать пограничный пункт
            view_epd_station_border: function (otpr) {
                var cross_time = null, stn = null, stn_name = null;
                if (otpr && otpr.route && otpr.route.length > 0) {
                    // Определим "Погран переход"
                    if (otpr.route[0].joint.length > 0) {
                        for (i = 0; i < otpr.route[0].joint.length; i++) {
                            var joint = otpr.route[0].joint[i];
                            if (joint.admin === 22) {
                                cross_time = joint.cross_time;
                                stn = joint.stn;
                                stn_name = joint.stn_name;
                                var border = cars_detali.ids_inc.ids_dir.getBorderCheckpoint_Of_Code(stn); // Определим запись в справочнике
                                if (border) {
                                    cars_detali.bt_route_stn_border_add.hide();
                                } else {
                                    cars_detali.bt_route_stn_border_add.show();
                                }
                            }
                        }
                    }
                }
                cars_detali.uz_route_stn_border.val(stn);
                cars_detali.uz_route_stn_border_name.val(stn_name);
                cars_detali.uz_route_border_cross_time.val(cross_time);
            },
            // Показать администрацию
            view_epd_adm: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_name_adm.val(vagon.id_countrys);
                    cars_detali.card_vag_kod_adm.val(cars_detali.ids_inc.ids_dir.getValue_Countrys_Of_ID(vagon.id_countrys, 'code_sng'));
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать род вагона
            view_epd_rod: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_name_rod_vag.val(cars_detali.ids_inc.ids_dir.getValueCulture_GenusWagons_Of_ID(vagon.id_genus, 'genus'));
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать тип цистерны
            view_epd_usl_tip: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_usl_tip.val(vagon.usl_tip);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать кол осей
            view_epd_kol_os: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_kol_os.val(vagon.kol_os);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать грузоподъемность
            view_epd_gruzp_uz: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_gruzp.val(vagon.gruzp);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать дату ремонта вагона по уз
            view_epd_date_rem_vag: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_date_rem_vag.setDateTime(vagon.date_rem_vag !== null ? vagon.date_rem_vag.replace(/T/g, ' ') : null);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать дату ремонта вагона по уз
            view_epd_date_rem_uz: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_date_rem_uz.setDateTime(vagon.date_rem_uz !== null ? vagon.date_rem_uz.replace(/T/g, ' ') : null);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать владельца
            view_epd_owner: function (vagon) {
                if (vagon) {
                    if (vagon.id === 0) {
                        // Обновить справочник
                        cars_detali.ids_inc.ids_dir.loadOwnersWagons(function () {
                            cars_detali.card_vag_name_owner.val(cars_detali.ids_inc.ids_dir.getValueCulture_OwnersWagons_Of_ID(vagon.id_owner, 'owner'));
                        });
                    } else {
                        cars_detali.card_vag_name_owner.val(cars_detali.ids_inc.ids_dir.getValueCulture_OwnersWagons_Of_ID(vagon.id_owner, 'owner'));
                    }
                    cars_detali.card_vag_name_owner.prop("disabled", vagon.card_vag_name_owner); // если запрет смены владельца
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать дату начала аренды
            view_epd_rent_start: function (vagon) {
                if (vagon) {
                    if (vagon.rent_start) {
                        cars_detali.card_vag_rent_start.setDateTime(vagon.rent_start !== null ? vagon.rent_start.replace(/T/g, ' ') : null);
                        cars_detali.card_vag_rent_start.enable(false);
                    } else {
                        cars_detali.card_vag_rent_start.setDateTime(null);
                        cars_detali.card_vag_rent_start.enable(true);
                    }
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать оператор
            view_epd_operator: function (vagon) {
                if (vagon) {
                    if (vagon.id === 0) {
                        // Обновить справочник
                        cars_detali.ids_inc.ids_dir.loadOperatorsWagons(function () {
                            cars_detali.card_vag_name_operator.val(cars_detali.ids_inc.ids_dir.getValueCulture_OperatorsWagons_Of_ID(vagon.id_operator, 'operators'));
                        });
                    } else {
                        cars_detali.card_vag_name_operator.val(cars_detali.ids_inc.ids_dir.getValueCulture_OperatorsWagons_Of_ID(vagon.id_operator, 'operators'));
                    }
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать ограничения погрузки
            view_epd_limiting_loading: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_limiting_loading.val(cars_detali.ids_inc.ids_dir.getValueCulture_LimitingLoading_Of_Code(vagon.id_limiting, 'limiting_name'));
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать признак собственности
            view_epd_type_ownership: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_type_ownership.val(vagon.id_type_ownership);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать ограничение УЗ
            view_epd_card_vag_note: function (vagon) {
                if (vagon) {
                    cars_detali.card_vag_note.val(vagon.note);
                }
                //!!! если вагона нет тогда наверное нужно создать в ручную
            },
            // Показать всю информацию по справочнику вагона
            view_epd_card_vag: function (vagon) {
                cars_detali.view_epd_adm(vagon);
                cars_detali.view_epd_rod(vagon);
                cars_detali.view_epd_usl_tip(vagon);
                cars_detali.view_epd_kol_os(vagon);
                cars_detali.view_epd_gruzp_uz(vagon);
                cars_detali.view_epd_date_rem_vag(vagon);
                cars_detali.view_epd_date_rem_uz(vagon);
                cars_detali.view_epd_owner(vagon);
                cars_detali.view_epd_rent_start(vagon);
                cars_detali.view_epd_operator(vagon);
                cars_detali.view_epd_limiting_loading(vagon);
                cars_detali.view_epd_type_ownership(vagon);
                cars_detali.view_epd_card_vag_note(vagon);
            },
            // Показать всю информацию по вагону из ЭПД
            view_epd_uz_vag: function (vagon) {
                if (vagon) {
                    cars_detali.uz_vag_gruzp.val(vagon.gruzp);
                    cars_detali.uz_vag_ves_tary_arc.val(vagon.ves_tary_arc ? Number(Number(vagon.ves_tary_arc) / 1000).toFixed(3) : null);
                    cars_detali.uz_vag_u_tara.val(vagon.u_tara ? Number(Number(vagon.u_tara) / 1000).toFixed(3) : null);
                }

            },
            // Показать доп документацию
            view_epd_docs: function (otpr) {
                if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
                    $('span#count-docs').text(otpr.sender_doc.length);
                    cars_detali.table_dosc.view(otpr.sender_doc);
                } else {
                    $('span#count-docs').text('');
                }
            },
            // Показать акты
            view_epd_acts: function (otpr) {
                if (otpr && otpr.acts && otpr.acts.length > 0) {
                    var acts = otpr.acts.filter(function (i) {
                        if (Number(i.vagon_nom) === cars_detali.select_num) return true; else return false;
                    });
                    $('span#count-acts').text(acts.length > 0 ? acts.length : '');
                    cars_detali.table_acts.view(acts);
                } else {
                    $('span#count-acts').text('');
                }
            },
            // Показать плательщика
            view_epd_plat: function (otpr) {
                var pl = null;
                if (otpr && otpr.pl && otpr.pl.length > 0) {
                    if (otpr.pl.length === 1) {
                        // если плательщик один тогда берем его
                        pl = otpr.pl[0];
                    } else {
                        // если плательщиков много тогда берем только УЗ или только отправителя type=0
                        for (var i = 0; i < otpr.pl.length; i++) {
                            if (Number(otpr.pl[i].carrier_kod) === 22 || Number(otpr.pl[i].type) === 0) {
                                pl = otpr.pl[i];
                                break;
                            }

                        }
                    }
                    // Если опрелен платильщик отобразим его
                    if (pl) {
                        var plat = cars_detali.ids_inc.ids_dir.getPayerArrival_Of_Code(pl.kod_plat); // Определим запись в справочнике
                        if (plat) {
                            cars_detali.uz_rask_name_plat_add.hide();
                        } else {
                            cars_detali.uz_rask_name_plat_add.show();
                        }
                        cars_detali.uz_rask_kod_plat.val(pl.kod_plat);
                        cars_detali.uz_rask_name_plat.val(pl.name_plat);
                    }
                }
            },
            // Показать тарифное расстояние
            view_epd_distance_way: function (otpr) {
                if (otpr) {
                    cars_detali.uz_rask_distance_way.val(otpr.distance_way);
                }
            },
            // Показать тариф при выдаче по вагону
            view_epd_pay_summa_of_vagon: function (vagon) {
                if (vagon && vagon.pay_v && vagon.pay_v.length > 0) {
                    cars_detali.view_epd_pay_summa(vagon.pay_v);
                }
            },
            // Показать тариф при выдаче по контейнеру
            view_epd_pay_summa_of_cont: function (conts) {
                if (conts && conts.length > 0) {
                    var pays = [];
                    for (var i = 0; i < conts.length; i++) {
                        pays.push(conts[i].pay_k && conts[i].pay_k.length > 0 ? conts[i].pay_k[0] : []);
                    }
                    cars_detali.view_epd_pay_summa(pays);
                }
            },
            // Показать тариф при выдаче
            view_epd_pay_summa: function (pays) {
                pl_summ = 0;
                if (pays && pays.length > 0) {
                    for (var i = 0; i < pays.length; i++) {
                        if (Number(pays[i].kod) === 1 || Number(pays[i].kod) === 21) {
                            pl_summ += pays[i].summa ? Number(pays[i].summa) : 0;
                        }
                    }
                }
                cars_detali.uz_rask_pl_pay_summa.val(pl_summ ? Number(Number(pl_summ) / 100).toFixed(2) : '');
            },
            // Показать груз и группу ет снг вагона
            view_epd_cargo_etsng_of_vagon: function (vagon) {
                var code = null, name = null;
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    code = vagon.collect_v[0].kod_etsng ? Number(vagon.collect_v[0].kod_etsng) : null;
                    name = vagon.collect_v[0].name_etsng;
                    cars_detali.view_epd_cargo_etsng(code, name);
                }
            },
            // Показать груз и группу ет снг контейнеров вагона
            view_epd_cargo_etsng_of_cont: function (conts) {
                var code = null, name = null;
                if (conts && conts.length > 0) {
                    code = conts[0].collect_k.kod_etsng ? Number(conts[0].collect_k.kod_etsng) : null;
                    name = conts[0].collect_k.name_etsng;
                    cars_detali.view_epd_cargo_etsng(code, name);
                }
            },
            // Показать груз и группу ет снг
            view_epd_cargo_etsng: function (code, name) {
                var etsng = cars_detali.ids_inc.ids_dir.list_cargo_etsng.filter(function (i) {
                    if (i.code === code && i['cargo_etsng_name_' + cars_detali.lang] === name) return true; else false;
                });
                if (etsng && etsng.length > 0) {
                    cars_detali.uz_cargo_name_etsng_add.hide();
                    var cargo = cars_detali.ids_inc.ids_dir.list_cargo.filter(function (i) {
                        if (i.id_cargo_etsng === etsng[0].id) return true; else false;
                    });
                    if (cargo && cargo.length > 0) {
                        var cargo_group = cars_detali.ids_inc.ids_dir.getCargoGroup_Of_Code(cargo[0].id_group);
                        cars_detali.uz_cargo_group_cargo.val(cars_detali.ids_inc.ids_dir.getValueObj(cargo_group, 'cargo_group_name', cars_detali.lang));
                    }

                } else {
                    cars_detali.uz_cargo_name_etsng_add.show();
                }
                cars_detali.uz_cargo_kod_etsng.val(code);
                cars_detali.uz_cargo_name_etsng.val(name);

            },
            // Показать груз и группу гнг
            view_epd_cargo_gng: function (vagon) {
                var code = null, name = null;
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    code = vagon.collect_v[0].kod_gng ? Number(vagon.collect_v[0].kod_gng) : null;
                    name = vagon.collect_v[0].name_gng;
                    var gng = cars_detali.ids_inc.ids_dir.list_cargo_gng.filter(function (i) {
                        if (i.code === code && i['cargo_gng_name_' + cars_detali.lang] === name) return true; else false;
                    });
                    if (!code || (gng && gng.length > 0)) {
                        cars_detali.uz_cargo_name_gng_add.hide();
                    } else {
                        cars_detali.uz_cargo_name_gng_add.show();
                    }
                    cars_detali.uz_cargo_kod_gng.val(code);
                    cars_detali.uz_cargo_name_gng.val(name);
                }
            },
            // Показать анализ груза
            view_epd_cargo_analysis: function (otpr) {
                if (otpr && otpr.text) {
                    cars_detali.uz_cargo_cargo_analysis.val(otpr.text.zayava);
                }
            },
            // Показать анализ груза
            view_epd_kol_pac: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_kol_pac.val(vagon.collect_v[0].kol_pac);
                }
            },
            // Показать вес груза вагона по ЭПД
            view_epd_vesg_doc_of_vagon: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_vesg_doc.val(vagon.collect_v[0].vesg ? Number(Number(vagon.collect_v[0].vesg) / 1000).toFixed(3) : null);
                }
            },
            // Показать вес груза контейнеров вагона по ЭПД
            view_epd_vesg_doc_of_cont: function (conts) {
                if (conts && conts.length > 0) {
                    var vesg = 0;
                    for (var i = 0; i < conts.length; i++) {
                        vesg += conts[i].collect_k.vesg ? Number(conts[i].collect_k.vesg) : 0;
                    }
                    cars_detali.uz_cargo_vesg_doc.val(vesg > 0 ? Number(Number(vesg) / 1000).toFixed(3) : null);
                }
            },
            // Показать вес груза по ЭПД
            view_epd_nom_zpu: function (vagon) {
                if (vagon && vagon.zpu_v && vagon.zpu_v.length > 0) {
                    cars_detali.uz_cargo_nom_zpu.val(vagon.zpu_v[0].nom_zpu);
                }
            },
            // Показать класс опасности
            view_epd_danger_class: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_danger_class.val(vagon.collect_v[0].danger);
                    cars_detali.uz_cargo_danger_name.val(vagon.collect_v[0].danger);
                }
            },
            // Показать код опасности
            view_epd_danger_kod: function (vagon) {
                if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
                    cars_detali.uz_cargo_danger_kod.val(vagon.collect_v[0].danger_kod);
                }
            },
            // Показать контейнеры
            view_epd_cont: function (conts) {
                if (conts && conts.length > 0) {
                    $('span#count-cont').text(conts.length > 0 ? conts.length : '');
                    // Показать тариф при выдаче
                    cars_detali.view_epd_pay_summa_of_cont(conts);
                    // Вес груза
                    cars_detali.view_epd_vesg_doc_of_cont(conts);
                    // Груз ет снг
                    cars_detali.view_epd_cargo_etsng_of_cont(conts);
                    // Показать контейнера
                    cars_detali.table_cont.view(conts);
                } else {
                    $('span#count-cont').text('');
                }
            },

            // показать электронно перевозочный документ
            view_cars_epd: function (num, otpr) {
                cars_detali.select_otpr = otpr; // Сохраним документ
                cars_detali.select_num = num;   // Сохраним номер вагона
                cars_detali.set_open_edit();   // Перевести в режим "open-edit"
                cars_detali.clear_cars_epd();   // Очистить параметры окна ЭПД

                cars_detali.num_car.val(cars_detali.select_num);
                if (cars_detali.select_otpr !== null) {
                    // Документ найден
                    //--------------------------------------------------------
                    // Обновим информацию о вагоне
                    // Выбрать вагон
                    cars_detali.select_otpr_vagon = cars_detali.get_vagon_epd(cars_detali.select_otpr, cars_detali.select_num);
                    // Выбрать контейнеры пренадлежащие вагону
                    cars_detali.select_otpr_cont = cars_detali.get_vagon_cont_epd(cars_detali.select_otpr, cars_detali.select_num);

                    cars_detali.get_vagon_dir(cars_detali.select_otpr_vagon, cars_detali.select_num, function (result_vagon) {
                        cars_detali.select_vagon = result_vagon;
                        if (cars_detali.select_vagon && cars_detali.select_vagon.id === 0) {
                            // Запись вагона новая 
                            cars_detali.bt_card_vag_add.show();
                        } else {
                            // Запись вагона из справочника
                            cars_detali.bt_card_vag_add.hide();
                        }
                        //--------------------------------------------------------
                        // требования
                        //cars_detali.search_cars_num_doc.prop("disabled", true);
                        cars_detali.show_booton_not(); // убрать все кнопки
                        cars_detali.uz_doc_num_doc.val(cars_detali.select_otpr.otprdp === null ? cars_detali.select_otpr.nom_doc : cars_detali.select_otpr.otprdp.nom_osn_doc);
                        cars_detali.uz_doc_num_new_doc.val(cars_detali.select_otpr.otprdp !== null ? cars_detali.select_otpr.nom_doc : null);
                        //---------------------------------------------------------------------------------------------
                        // Маршруты клиенты OTPR\ROUTE
                        cars_detali.view_epd_station_from(cars_detali.select_otpr);
                        cars_detali.view_epd_station_on(cars_detali.select_otpr);
                        cars_detali.view_epd_station_border(cars_detali.select_otpr);
                        //-------------------------------------------------------------------
                        // Оределим грузоотправителя и грузополучателя OTPR\CLIENT  
                        cars_detali.view_epd_client(cars_detali.select_otpr);
                        //-------------------------------------------------------------------
                        // Показать информацию из справочника вагонов ИДС (вагон определяеется ранее)
                        cars_detali.view_epd_card_vag(cars_detali.select_vagon);
                        // Показать информацию из ЭПД
                        cars_detali.view_epd_uz_vag(cars_detali.select_otpr_vagon);
                        // Показать сопроводительные документы
                        cars_detali.view_epd_docs(cars_detali.select_otpr);
                        cars_detali.view_epd_acts(cars_detali.select_otpr);
                        // Платильщик по прибытию
                        cars_detali.view_epd_plat(cars_detali.select_otpr);
                        cars_detali.view_epd_distance_way(cars_detali.select_otpr);
                        cars_detali.view_epd_pay_summa_of_vagon(cars_detali.select_otpr_vagon);
                        // Грузы
                        cars_detali.view_epd_cargo_etsng_of_vagon(cars_detali.select_otpr_vagon);
                        cars_detali.view_epd_cargo_gng(cars_detali.select_otpr_vagon);
                        cars_detali.view_epd_cargo_analysis(cars_detali.select_otpr);
                        cars_detali.view_epd_kol_pac(cars_detali.select_otpr_vagon);
                        cars_detali.view_epd_vesg_doc_of_vagon(cars_detali.select_otpr_vagon);
                        cars_detali.view_epd_nom_zpu(cars_detali.select_otpr_vagon);
                        // Опасность
                        cars_detali.view_epd_danger_class(cars_detali.select_otpr_vagon);
                        cars_detali.view_epd_danger_kod(cars_detali.select_otpr_vagon);
                        // Контейнер
                        cars_detali.view_epd_cont(cars_detali.select_otpr_cont);
                        LockScreenOff();
                    });

                } else {
                    // Документ не найден
                    //cars_detali.search_cars_num_doc.prop("disabled", false);
                    cars_detali.show_booton_epd_search(); // Показать кнопку поиска документа
                    LockScreenOff();
                }

            },
            // Показать не принятые вагоны
            view_cars_not_arrival: function (list) {
                $('div#list-cars-not-arrival').empty();
                $.each(list, function (i, el) {
                    $('div#list-cars-not-arrival').append('<a class="list-group-item list-group-item-action ' + (el.consignee === 7932 ? 'list-group-item-success' : '') + '" id="' + el.id + '" data-toggle="list" href="#" role="tab" aria-controls="">' + el.num + ' ' + (el.num_doc ? '<i class="fa fa-file-text-o" aria-hidden="true"></i>' : '') + '</a>');
                });
                // Определим событие
                $('#list-cars-not-arrival a').on('click', function (e) {
                    e.preventDefault();
                    var id = $(this).attr('id');
                    var car = getObjOflist(cars_detali.sostav.ArrivalCars, 'id', id);
                    if (car !== null) {
                        cars_detali.select_id = car.id; // Сохраним id вагона
                        // Если есть вагон найти и ЭПД документ
                        LockScreen(langView('mess_searsh_epd', langs));
                        cars_detali.alert.clear_message();
                        cars_detali.ids_inc.getOTPR_UZ_DOCOfNum(car.num_doc, function (result_otpr) {
                            if (result_otpr === null) {
                                // Документа нет пишим сообщение
                                cars_detali.alert.out_warning_message(langView('mess_not_searsh_epd', langs));
                            }
                            cars_detali.view_cars_epd(car.num, result_otpr);
                            //LockScreenOff();
                        });
                    }
                });
            },

            // Показать информацию по составу
            view: function (id) {
                cars_detali.clear();            // Очистить все ячейки
                cars_detali.set_close_edit();   // Перевести в режим "close" по умолчанию
                if (id === null) return;
                cars_detali.id_sostav = id;
                // Загрузка библиотек
                cars_detali.loadReference(function () {
                    // Получим текуший состав
                    LockScreen(langView('mess_delay', langs));
                    cars_detali.ids_inc.getArrivalSostavOfID(cars_detali.id_sostav, function (result_sostav) {
                        cars_detali.sostav = result_sostav[0];
                        // Покаать информацию по составу
                        cars_detali.sostav_title.text('Информация по составу (№ поезда :' + cars_detali.sostav.train + ', Индекс поезда :' + cars_detali.sostav.composition_index + ', Прибыл:' + (cars_detali.sostav.date_arrival ? cars_detali.sostav.date_arrival.replace(/T/g, ' ') : null) + ')');
                        // Загрузим списочные компоненты
                        cars_detali.init_select();
                        // Показать список не принятых вагонов
                        cars_detali.view_cars_not_arrival(cars_detali.sostav.ArrivalCars.filter(function (i) { return i.arrival === null ? true : false; }));
                        // Показать страницу детально
                        cars_detali.content.addClass('is-visible');
                        LockScreenOff();
                    });
                });
            },
            //================================================================
            // Обработка ЭПД
            //=================================================================
            // Получить из ЭПД информацию о вагоне
            get_vagon_epd: function (otpr, num) {
                if (otpr && otpr.vagon && otpr.vagon.length > 0) {
                    for (var i = 0; i < otpr.vagon.length; i++) {
                        if (Number(otpr.vagon[i].nomer) === num)
                            return otpr.vagon[i];
                    }
                }
            },
            // Получить из ЭПД информацию о контейнерах на вагонах
            get_vagon_cont_epd: function (otpr, num) {
                if (otpr && otpr.cont && otpr.cont.length > 0) {
                    var conts = otpr.cont.filter(function (i) {
                        if (Number(i.nom_vag) === cars_detali.select_num) return true; else return false;
                    });
                    return conts;
                }
            },
            // Получить текущий вагон из справочника
            get_vagon_dir: function (vagon, num, callback) {
                cars_detali.ids_inc.ids_dir.getCurrentCarsOfNum(num, vagon.kod_adm, vagon.rod_vag, vagon.kol_os, vagon.usl_tip, function (result_card) {
                    if (typeof callback === 'function') {
                        callback(result_card);
                    }
                });
            }
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Загрузка основных библиотек
    loadReference(function (result) {
        // Инициализация
        if (lang === 'ru') $.datepicker.setDefaults($.datepicker.regional.ru);
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