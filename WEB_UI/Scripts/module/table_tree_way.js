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
            'title_card_header': 'Дерево путей',
            'title_inp_out': 'Прин.-Отпр.',
            'title_count': 'Всего',
            'title_count_amkr': 'АМКР',
            'title_max': 'Мак.',
            'title_totals': 'ИТОГО:',
            'title_info_detali': 'Информация детально...',
            'title_open_tree_park': 'Открыть парки дерева путей...',
            'title_open_tree_way': 'Открыть все пути...',
            'title_close_tree': 'Закрыть дерево путей',
            'title_refresh_tree': 'Обновить дерево путей',
            'mess_load_station': 'Загружаю список станций...',
            'mess_load_park': 'Загружаю список парков...',
            'mess_load_way': 'Загружаю список путей...',
            'mess_update_status': 'Обновляю информацию по состоянию дерева путей...',
            'mess_open_tree': 'Раскрываю дерево путей...',
        },
        'en':  //default language: English
        {
            'title_card_header': 'Path Tree',
            'title_inp_out': 'Receive-Send',
            'title_count': 'Total',
            'title_count_amkr': 'AMKR',
            'title_max': 'Mac.',
            'title_totals': 'TOTAL:',
            'title_info_detali': 'Information in detail ...',
            'title_open_tree_park': 'Open path tree parks ...',
            'title_open_tree_way': 'Open all paths ...',
            'title_close_tree': 'Close path tree',
            'title_refresh_tree': 'Refresh path tree',
            'mess_load_station': 'Loading the list of stations ...',
            'mess_load_park': 'Loading list of parks ...',
            'mess_load_way': 'Loading the list of paths ...',
            'mess_update_status': 'Updating information on the state of the path tree ...',
            'mess_open_tree': 'Expanding the path tree ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    //---------------------------Формирование элементов дерева---------------
    // Создать раздел кнопки
    function table_button(selector, base) {
        var $div_bt = $('<div></div>', {
            'class': 'text-left'
        });
        var $bt_icon_open_park = $('<i></i>', {
            'class': 'far fa-folder-open'
        });
        var $bt_open_park = $('<button></button>', {
            'id': 'button-open-park',
            'class': 'btn btn-sm',
            'title': langView('title_open_tree_park', App.Langs),
        });
        var $bt_icon_open_all = $('<i></i>', {
            'class': 'fas fa-folder-open'
        });
        var $bt_open_all = $('<button></button>', {
            'id': 'button-open-all',
            'class': 'btn btn-sm',
            'title': langView('title_open_tree_way', App.Langs),
        });
        var $bt_icon_close = $('<i></i>', {
            'class': 'far fa-folder'
        });
        var $bt_close = $('<button></button>', {
            'id': 'button-close',
            'class': 'btn btn-sm',
            'title': langView('title_close_tree', App.Langs),
        });
        var $bt_icon_refresh = $('<i></i>', {
            'class': 'fas fa-sync-alt'
        });
        var $bt_refresh = $('<button></button>', {
            'class': 'btn btn-sm',
            'id': 'button-refresh',
            'title': langView('title_refresh_tree', App.Langs),
        });

        //$div_bt.append($bt_station.append($bt_icon_station)).append($bt_open.append($bt_icon_open)).append($bt_close.append($bt_icon_close)).append($bt_refresh.append($bt_icon_refresh));
        $div_bt.append($bt_open_park.append($bt_icon_open_park)).append($bt_open_all.append($bt_icon_open_all)).append($bt_close.append($bt_icon_close)).append($bt_refresh.append($bt_icon_refresh));
        this.$element = $div_bt;
    };
    // Создать основу TREE-WAY
    function table_tree_way(selector) {
        var $div = $('<div></div>', {
            'style': 'overflow-x:auto'
        });
        var $div_table = $('<table></table>', {
            'id': selector + '-table',
            'class': 'table table-hover',
        });

        this.$element_table = $div_table;
        $div.append(this.$element_table);
        this.$element = $div;
    };
    // Создать заголовок таблицы
    function table_heading(selector, base) {
        var $thead = $('<thead></thead>', {
            'class': 'thead-light'
        });
        var $tr = $('<tr></tr>');
        var $th_name = $('<th></th>', {
            'width': '60%',
            'scope': 'col',
            'colspan': '5',
        });
        var $th_pb = $('<th></th>', {
            'width': '20%',
            'scope': 'col',
            'text': langView('title_inp_out', App.Langs),
            'colspan': '1',
        });
        var $th_count = $('<th></th>', {
            'width': '5%',
            'scope': 'col',
            'text': langView('title_count', App.Langs),
            'colspan': '1',
        });
        var $th_amkr = $('<th></th>', {
            'width': '5%',
            'scope': 'col',
            'text': langView('title_count_amkr', App.Langs),
            'colspan': '1',
        });
        var $th_capacity = $('<th></th>', {
            'width': '10%',
            'scope': 'col',
            'text': langView('title_max', App.Langs),
            'colspan': '1',
        });

        var btElement = new table_button(selector, base);
        $th_name.append(btElement.$element);
        $tr.append($th_name).append($th_pb).append($th_count).append($th_amkr).append($th_capacity);
        $thead.append($tr);
        this.$element = $thead;

    };
    // Создать подвал(итог) таблицы
    function table_tfoot(base) {
        var $tfoot = $('<tfoot></tfoot>', {
            'class': 'bg-secondary text-white'
        });
        var $tr = $('<tr></tr>', {
            'data-tree-area': 'foot',
        });
        var $th_name = $('<th></th>', {
            'width': '60%',
            'scope': 'col',
            'text': langView('title_totals', App.Langs),
            'colspan': '5',
            'class': 'text-right font-weight-bold'
        });
        var $th_pb = $('<th></th>', {
            'width': '20%',
            'scope': 'col',
            'class': 'text-center',
            'colspan': '1',
        });
        var $th_count = $('<th></th>', {
            'width': '5%',
            'scope': 'col',
            'class': 'text-right font-weight-bold',
            'colspan': '1'
        });
        var $th_amkr = $('<th></th>', {
            'width': '5%',
            'scope': 'col',
            'class': 'text-right font-weight-bold',
            'colspan': '1'
        });
        var $th_capacity = $('<th></th>', {
            'width': '10%',
            'scope': 'col',
            'class': 'text-right font-weight-bold',
            'colspan': '1'
        });
        $tr.append($th_name).append($th_pb).append($th_count).append($th_amkr).append($th_capacity);
        $tfoot.append($tr);
        this.$element = $tfoot;
    };
    // Создать раздел данных таблицы
    function table_body(selector) {
        var $tbody = $('<tbody></tbody>', {
            'class': ''
        });
        this.$element = $tbody;

    };
    // Создать раздел tr станции
    function table_tr_station(selector, el) {
        var $tr = $('<tr></tr>', {
            'data-tree-area': 'station',
            'data-station': el.id,

        });
        var $td_control = $('<td></td>', {
            'class': 'station-control',
            'width': '18px',
        });
        var $td_img_station = $('<td></td>', {
            'class': 'icon-station',
            'width': '18px',
        });
        var $td_name = $('<td></td>', {
            'text': el["station_name_" + App.Lang],
            'class': 'text-left',
            'colspan': '3'
        });

        var as_Element = new arr_send(selector, el.id, el.count_arrives_wagons, el.count_sent_wagons);

        var $td_pb = $('<td></td>', {
            'class': 'text-centr'
        });
        var $td_count = $('<td></td>', {
            'text': el.count_all_wagons,
            'class': 'text-right'
        });
        var $td_amkr = $('<td></td>', {
            'text': el.count_amkr_wagons,
            'class': 'text-right'
        });
        var $td_capacity = $('<td></td>', {
            'text': el.capacity_wagons,
            'class': 'text-right'
        });

        $td_pb.append(as_Element.$element);
        $tr.append($td_control).append($td_img_station).append($td_name).append($td_pb).append($td_count).append($td_amkr).append($td_capacity);
        this.$element = $tr;
    };
    // Создать раздел tr парк
    function table_tr_park(selector, id_station, el, index) {
        var $tr = $('<tr></tr>', {
            'data-tree-area': 'park',
            'data-station': id_station,
            'data-park': el.id,
            'data-tree-end': index === 0 ? '1' : '0',
        });
        var $td_img_true_open = $('<td></td>', {
            'class': '',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $td_control = $('<td></td>', {
            'class': 'park-control',
            'width': '18px',
        });
        var $td_img_park = $('<td></td>', {
            'class': 'icon-park',
            'width': '18px',
        });
        var $td_name = $('<td></td>', {
            'text': el["park_abbr_" + App.Lang],
            'class': 'text-left',
            'colspan': '2'
        });
        var $td_pb = $('<td></td>', {
            'class': 'text-centr'
        });
        var $td_count = $('<td></td>', {
            'text': el.count_all_wagons,
            'class': 'text-right'
        });
        var $td_amkr = $('<td></td>', {
            'text': el.count_amkr_wagons,
            'class': 'text-right'
        });
        var $td_capacity = $('<td></td>', {
            'text': el.capacity_wagons,
            'class': 'text-right'
        });
        $td_img_true_open.addClass(index === 0 ? 'icon-tree-open-end' : 'icon-tree-open');
        $tr.append($td_img_true_open).append($td_control).append($td_img_park).append($td_name).append($td_pb).append($td_count).append($td_amkr).append($td_capacity);
        this.$element = $tr;
    };
    // Создать раздел tr пути
    function table_tr_way(selector, id_station, id_park, el, index, end_tree) {
        var $tr = $('<tr></tr>', {
            'style': 'cursor:pointer;',
            'data-tree-area': 'way',
            'data-station': id_station,
            'data-park': id_park,
            'data-way': el.id,
            'crossing-uz': el.crossing_uz ? '1' : '0',
            'crossing-amkr': el.crossing_amkr ? '1' : '0',
            'dissolution': el.dissolution ? '1' : '0',
            'output-dissolution': el.output_dissolution ? '1' : '0',
        });
        var $td_img_tree_open_skeep = $('<td></td>', {
            'class': '',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $td_not = $('<td></td>', {
            'class': 'row-select',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $td_img_true_open = $('<td></td>', {
            'class': '',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $td_img_way = $('<td></td>', {
            'class': 'icon-way',
            'width': '18px',
        });
        var $td_name = $('<td></td>', {
            'text': el["way_num_" + App.Lang] + '-' + el["way_abbr_" + App.Lang],
            'class': 'text-left',
            'colspan': '1'
        });
        var $td_pb = $('<td></td>', {
            'class': 'text-centr'
        });
        var pbElement = new progress_bar(selector, 'way', el.id, el.capacity_wagons, el.count_all_wagons);
        var $td_count = $('<td></td>', {
            'text': el.count_all_wagons,
            'class': 'text-right'
        });
        var $td_amkr = $('<td></td>', {
            'text': el.count_amkr_wagons,
            'class': 'text-right'
        });
        var $td_capacity = $('<td></td>', {
            'text': el.capacity_wagons,
            'class': 'text-right'
        });

        $td_pb.append(pbElement.$element); // добавим прогрес бар
        $td_img_tree_open_skeep.addClass(end_tree === 0 ? 'icon-tree-open-skeep' : '');
        $td_img_true_open.addClass(index === 0 ? 'icon-tree-open-end' : 'icon-tree-open');
        $tr.append($td_img_tree_open_skeep).append($td_not).append($td_img_true_open).append($td_img_way).append($td_name).append($td_pb).append($td_count).append($td_amkr).append($td_capacity);
        this.$element = $tr;
    };
    // Элемент прогресс бар
    function progress_bar(selector, name, id, max, count) {
        // Определим компонент прогресс бар
        var max_capacity = max ? Number(max) : 0
        var count_wagon = count ? Number(count) : 0
        var progress = Number(count_wagon > max_capacity ? 100.0 : max_capacity === 0 ? 0.0 : (count_wagon * 100.0) / max_capacity);
        var progress_collor = "";
        if (progress <= 25) {
            progress_collor = 'bg-success';
        } else {
            if (progress <= 50) {
                progress_collor = 'bg-info';
            } else {
                if (progress <= 75) {
                    progress_collor = 'bg-warning';
                } else {
                    progress_collor = 'bg-danger';
                }
            }
        };
        var $div = $('<div></div>', {
            'data-tree-pb-name': name,
            'data-tree-pb-id': id,
            'class': 'progress',
            'title': langView('title_info_detali', App.Langs)
        });
        var $div_pb = $('<div></div>', {
            'class': 'progress-bar ' + progress_collor,
            'role': 'progressbar',
            'style': 'width: ' + progress + '%',
            'aria-valuenow': progress,
            'aria-valuemin': '0',
            'aria-valuemax': '100',
            'text': progress.toFixed(0) + '%'

        });
        $div.append($div_pb);
        this.$element = $div;
    };
    // Элемент прибыло\отправлено
    function arr_send(selector, id, arrival, send) {
        var $div = $('<div></div>', {
            'data-as-id': id,
            'class': '',
        });
        var $a_arrive = $('<a></a>',
            {
                'text': arrival,
                'href': '#',
                'class': 'badge badge-warning'
            });
        var $a_send = $('<a></a>',
            {
                'text': send,
                'href': '#',
                'class': 'badge badge-success'
            });
        $div.append(arrival > 0 ? $a_arrive : '0').append('-').append(send > 0 ? $a_send : '0');
        this.$element = $div;
    };
    //--------------------------------Конструктор и инициализация---------------
    // Таблица дерева путей
    function ids_tree_way(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$div_tree_way = $(selector);
        if (this.$div_tree_way.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$div_tree_way.attr('id');
    }
    //
    ids_tree_way.prototype.init = function (fn_select_way, fn_detali) {
        this.fn_select_way = fn_select_way;
        this.fn_detali = fn_detali;
        // Загрузим нужные данные
        // теперь выполним инициализацию
        var cardElement = new table_tree_way(this.selector);
        this.$div_tree_way.empty();
        this.$div_tree_way.append(cardElement.$element);
        this.$t_tree_way = cardElement.$element_table;
        // Заголовок
        var headElement = new table_heading(this.selector, this);
        // Привяжим событие обработки кнопок
        headElement.$element.on('click', 'button', function (e) {
            e.preventDefault();
            e.stopPropagation(); // отменим событие дальше
            var id = $(e.currentTarget).attr('id');
            switch (id) {
                case 'button-open-park': this.open_tree(false); break;
                case 'button-open-all': this.open_tree(true); break;
                case 'button-close': this.close_tree(); break;
                case 'button-refresh': this.update(); break;
            };
        }.bind(this));
        this.$t_tree_way.empty();
        this.$t_tree_way.append(headElement.$element);
        // Раздел с данными
        var bodyElement = new table_body(this.selector);
        this.body = bodyElement.$element;
        this.$t_tree_way.append(this.body);
        // Подвал
        var tfootElement = new table_tfoot(this);
        this.foot = tfootElement.$element;
        this.$t_tree_way.append(this.foot);

    };
    // инициализация таблицы
    ids_tree_way.prototype.view = function (list_station, id_station, id_park, id_way) {
        this.view_station(list_station, id_station, id_park, id_way, function () {
            LockScreenOff();
        })
    };
    // обновление дерева путей
    ids_tree_way.prototype.update = function () {
        var tr = this.body.find('tr');
        this.count_update = tr.length;
        if (tr && tr.length > 0) LockScreen(langView('mess_update_status', App.Langs)); // выведем сообщение
        $.each(tr, function (i, el) {
            var area = $(el).attr('data-tree-area');
            var id_station = $(el).attr('data-station');
            var id_park = $(el).attr('data-park');
            var id_way = $(el).attr('data-way');
            switch (area) {
                case 'station': {
                    this.update_station_of_id(Number(id_station), function () {
                        this.count_update--;
                        if (this.count_update <= 0) {
                            this.update_foot();
                            LockScreenOff();
                        }
                    }.bind(this));
                    break
                };
                case 'park': {
                    this.update_park_of_id(Number(id_station), Number(id_park), function () {
                        this.count_update--;
                        if (this.count_update <= 0) {
                            this.update_foot();
                            LockScreenOff();
                        }
                    }.bind(this));
                    break
                };
                case 'way': {
                    this.update_way_of_id(Number(id_way), function () {
                        this.count_update--;
                        if (this.count_update <= 0) {
                            this.update_foot();
                            LockScreenOff();
                        }
                    }.bind(this));
                    break
                };

            };
        }.bind(this));

    };
    // Обновить подвал
    ids_tree_way.prototype.update_foot = function () {
        var count_all = 0;
        var amkr_all = 0;
        var capacity_all = 0;
        var tr = this.body.find('tr[data-tree-area="station"]');
        $.each(tr, function (i, el) {
            var $div_pb = $(el.cells[3]);
            var $td_count = $(el.cells[4]);
            var $td_amkr = $(el.cells[5]);
            var $td_capacity = $(el.cells[6]);
            var count = $td_count.text();
            var amkr = $td_amkr.text();
            var capacity = $td_capacity.text();
            count_all += count ? Number(count) : 0;
            amkr_all += amkr ? Number(amkr) : 0;
            capacity_all += capacity ? Number(capacity) : 0;
        }.bind(this));
        // вывести итого
        var tr_foot = this.foot.find('tr');
        if (tr_foot && tr_foot.length > 0) {
            $(tr_foot[0].cells[2]).text(count_all);
            $(tr_foot[0].cells[3]).text(amkr_all);
            $(tr_foot[0].cells[4]).text(capacity_all);
        };
    };
    //--------------------------------Станции-----------------------------------
    // Загрузить станции из базы
    ids_tree_way.prototype.load_station = function (list_station, callback) {
        LockScreen(langView('mess_load_station', App.Langs));
        ids_rwt.getViewStatusAllStation(function (station) {
            if (typeof callback === 'function') {
                //callback(station.filter(function (i) { return !i.station_uz; }));
                var current_station = station.filter(function (i) {
                    return !i.station_uz;
                });
                if (list_station && list_station.length > 0) {
                    current_station = current_station.filter(function (i) {
                        return list_station.find(function (o) {
                            return o === i.id
                        });
                    });
                }
                callback(current_station);
            }
        }.bind(this));
    };
    // Загрузить станцию по id из базы
    ids_tree_way.prototype.load_station_of_id = function (id, callback) {
        ids_rwt.getViewStatusStationOfID(id, function (station) {
            if (typeof callback === 'function') {
                callback(station);
            }
        }.bind(this));
    };
    // Показать станции
    ids_tree_way.prototype.view_station = function (list_station, id_station, id_park, id_way, callback) {
        this.body.empty(); // Очистим все tr
        var base = this;
        this.list_station = list_station;
        this.load_station(this.list_station, function (stations) {
            $.each(stations, function (i, el) {
                var trbodyElement = new table_tr_station(base.selector, el); // Получим парк
                // Настроим событие нажатия на "открыть"\"закрыть" парк
                trbodyElement.$element.on('click', 'td.station-control', function (e) {
                    var tr = $(e.currentTarget).closest('tr');
                    var id_station = tr.attr('data-station');
                    this.view_park(id_station, null, null, function () {
                        LockScreenOff();
                    }); // Показать парки
                }.bind(base));
                // Добавим элемент
                base.body.append(trbodyElement.$element);
                if (id_station && el.id === id_station) {
                    base.view_park(id_station, id_park, id_way, function () {
                        LockScreenOff();
                    }); // Показать парки
                }
            }.bind(this));
            base.update_foot();
            if (typeof callback === 'function') {
                callback();
            }
        });
    };
    // Обновить станциию по id
    ids_tree_way.prototype.update_station_of_id = function (id_station, callback) {
        // Получим строку 
        var tr = this.body.find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (tr && tr.length > 0) {
            var $div_pb = $(tr[0].cells[3]);
            var $td_count = $(tr[0].cells[4]);
            var $td_amkr = $(tr[0].cells[5]);
            var $td_capacity = $(tr[0].cells[6]);
            // Получаем данные
            this.load_station_of_id(id_station, function (station) {
                if (station && station.length > 0) {
                    var as_Element = new arr_send(this.selector, station[0].id, station[0].count_arrives_wagons, station[0].count_sent_wagons);
                    $div_pb.empty().append(as_Element.$element);
                    $td_count.empty().text(station[0].count_all_wagons);
                    $td_amkr.empty().text(station[0].count_amkr_wagons);
                    $td_capacity.empty().text(station[0].capacity_wagons);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };
    // Обновить станциию по id c выводом сообщения
    ids_tree_way.prototype.message_update_station_of_id = function (id_station, callback) {
        LockScreen(langView('mess_load_station', App.Langs));
        this.update_station_of_id(id_station, function () {
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        });
    };
    //--------------------------------ПАРКИ-----------------------------------
    // Загрузить парки станции из базы
    ids_tree_way.prototype.load_park = function (id_station, callback) {
        LockScreen(langView('mess_load_park', App.Langs));
        ids_rwt.getViewStatusAllParkOfStationID(id_station, function (park) {
            if (typeof callback === 'function') {
                callback(park);
            }
        }.bind(this));
    };
    // Загрузить парк по id станции из базы
    ids_tree_way.prototype.load_park_of_id = function (id_station, id_park, callback) {
        //LockScreen(langView('mess_load_park', App.Langs));
        ids_rwt.getViewStatusParkOfID(id_station, id_park, function (park) {
            if (typeof callback === 'function') {
                callback(park);
            }
        }.bind(this));
    };
    // показать парки станции
    ids_tree_way.prototype.view_park = function (id_station, id_park, id_way, callback) {
        var station = $(this.body).find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (station && station.length > 0) {
            // Проверим парк открыт
            var show = $(station).hasClass('shown');
            if (show) {
                this.close_way_of_station(id_station); // Удалить (закрыть) - пути
                this.close_park_of_station(id_station); // Удалить (закрыть) - парки
                $(station).removeClass('shown');
                if (typeof callback === 'function') {
                    callback(id_station);
                }
            } else {
                $(station).addClass('shown');
                this.load_park(id_station, function (park) {
                    var base = this;
                    // Отобразим парки
                    $.each(park.sort(function (a, b) { return b.position - a.position }), function (i, el) {
                        var trbodyElement = new table_tr_park(base.selector, id_station, el, i);
                        // Привязать событие выбора
                        trbodyElement.$element.on('click', 'td.park-control', function (e) {
                            var tr = $(e.currentTarget).closest('tr');
                            var id_station = tr.attr('data-station');
                            var id_park = tr.attr('data-park');
                            this.view_way(id_station, id_park, null, function () {
                                LockScreenOff();
                            }); // Показать пути
                        }.bind(base));
                        station.after(trbodyElement.$element);
                        if (id_park && el.id === id_park) {
                            base.view_way(id_station, id_park, id_way, function () {
                                LockScreenOff();
                            }); // Показать парки
                        }
                    });
                    if (typeof callback === 'function') {
                        callback(id_station);
                    }
                }.bind(this));
            }
        } else {
            if (typeof callback === 'function') {
                callback(id_station);
            }
        }
    };
    // Обновить положение парка по id
    ids_tree_way.prototype.update_park_of_id = function (id_station, id_park, callback) {
        // Получим строку 
        var tr = this.body.find('tr[data-tree-area="park"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        if (tr && tr.length > 0) {
            var $div_pb = $(tr[0].cells[4]);
            var $td_count = $(tr[0].cells[5]);
            var $td_amkr = $(tr[0].cells[6]);
            var $td_capacity = $(tr[0].cells[7]);
            // Получаем данные
            this.load_park_of_id(id_station, id_park, function (park) {
                if (park && park.length > 0) {
                    $td_count.empty().text(park[0].count_all_wagons);
                    $td_amkr.empty().text(park[0].count_amkr_wagons);
                    $td_capacity.empty().text(park[0].capacity_wagons);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };
    // Обновить положение парка по id с выводом сообщения
    ids_tree_way.prototype.message_update_park_of_id = function (id_station, id_park, callback) {
        LockScreen(langView('mess_load_park', App.Langs));
        this.update_park_of_id(id_station, id_park, function () {
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        });
    };
    //--------------------------------Пути-----------------------------------
    // Загрузить пути из базы
    ids_tree_way.prototype.load_way = function (id_station, id_park, callback) {
        LockScreen(langView('mess_load_way', App.Langs));
        ids_rwt.getViewStatusWayOfStationParkID(id_station, id_park, function (ways) {
            if (typeof callback === 'function') {
                callback(ways);
            }
        }.bind(this));
    };
    // Загрузить парк по id станции из базы
    ids_tree_way.prototype.load_way_of_id = function (id_way, callback) {
        //LockScreen(langView('mess_load_park', App.Langs));
        ids_rwt.getViewStatusWayOfID(id_way, function (way) {
            if (typeof callback === 'function') {
                callback(way);
            }
        }.bind(this));
    };
    // показать парки станции
    ids_tree_way.prototype.view_way = function (id_station, id_park, id_way, callback) {
        var park = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        var end_park = park.attr('data-tree-end');
        if (park && park.length > 0) {
            var show = $(park).hasClass('shown');
            if (show) {
                this.close_way_of_park(id_station, id_park);
                $(park).removeClass('shown');
                if (typeof callback === 'function') {
                    callback([]);
                }
            } else {
                $(park).addClass('shown');
                this.load_way(id_station, id_park, function (ways) {
                    var base = this;
                    // Отобразим парки
                    $.each(ways.sort(function (a, b) { return b.position_way - a.position_way }), function (i, el) {
                        var trbodyElement = new table_tr_way(base.selector, id_station, id_park, el, i, Number(end_park));
                        // Обработать события выбора пути
                        trbodyElement.$element.on('click', 'div.progress', function (e) {
                            // Обработка события информация детально
                            e.preventDefault();
                            e.stopPropagation(); // отменим событие дальше
                            var name = $(e.currentTarget).attr('data-tree-pb-name');
                            var id = Number($(e.currentTarget).attr('data-tree-pb-id'));
                            if (typeof this.fn_detali === 'function') {
                                this.fn_detali(name, id);
                            }
                        }.bind(base)).on('click', function (e) {
                            var tr = $(e.currentTarget).closest('tr');
                            if (tr && tr.length > 0) {
                                this.select_way(Number(tr.attr('data-way')));
                            }
                        }.bind(base));
                        park.after(trbodyElement.$element);
                    });
                    if (id_way) {
                        base.select_way(id_way);
                    }
                    if (typeof callback === 'function') {
                        callback(ways);
                    }
                }.bind(this));
            }
        } else {
            if (typeof callback === 'function') {
                callback([]);
            }
        }
    };
    // Обновить путь по id
    ids_tree_way.prototype.update_way_of_id = function (id_way, callback) {
        // Получим строку 
        var tr = this.body.find('tr[data-tree-area="way"][data-way="' + id_way + '"]');
        if (tr && tr.length > 0) {
            var $div_pb = $(tr[0].cells[5]);
            var $td_count = $(tr[0].cells[6]);
            var $td_amkr = $(tr[0].cells[7]);
            var $td_capacity = $(tr[0].cells[8]);
            // Получаем данные
            this.load_way_of_id(id_way, function (park) {
                if (park && park.length > 0) {
                    var pbElement = new progress_bar(this.selector, 'park', park[0].id, park[0].capacity_wagons, park[0].count_all_wagons);
                    $div_pb.empty().append(pbElement.$element);
                    $td_count.empty().text(park[0].count_all_wagons);
                    $td_amkr.empty().text(park[0].count_amkr_wagons);
                    $td_capacity.empty().text(park[0].capacity_wagons);
                    //LockScreenOff();
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };
    // Обновить путь по id с выводом сообщения
    ids_tree_way.prototype.message_update_way_of_id = function (id_way, callback) {
        LockScreen(langView('mess_load_park', App.Langs));
        this.update_way_of_id(id_way, function () {
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    // Выбрать путь
    ids_tree_way.prototype.select_way = function (id_way) {
        var way = this.body.find('tr[data-way="' + id_way + '"]');
        if (way && way.length > 0) {
            this.deselect_way();
            way.addClass('select');
            var id_station = Number(way.attr('data-station'));
            var id_park = Number(way.attr('data-park'));
            var id_way = Number(way.attr('data-way'));
            if (typeof this.fn_select_way === 'function') {
                this.fn_select_way(id_station, id_park, id_way);
            }
        }
    };
    //-----------------------------Управление ветками дерева-----------------
    // Закрыть все дерево
    ids_tree_way.prototype.close_tree = function () {
        $(this.body).find('tr[data-tree-area="station"]').removeClass('shown'); // Сбросить признак раскрыт
        this.close_way();
        this.close_park();
        if (typeof this.fn_select_way === 'function') {
            this.fn_select_way(null, null, null);
        }
    };
    // Закрыть все парки по станции
    ids_tree_way.prototype.close_park_of_station = function (id_station) {
        var park = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
        park.remove();
    };
    // Закрыть все парки
    ids_tree_way.prototype.close_park = function () {
        var ways = $(this.body).find('tr[data-tree-area="park"]');
        ways.remove();
    };
    // Закрыть все пути по станции
    ids_tree_way.prototype.close_way_of_station = function (id_station) {
        var ways = $(this.body).find('tr[data-tree-area="way"][data-station="' + id_station + '"]');
        ways.remove();
    };
    // Закрыть все пути
    ids_tree_way.prototype.close_way = function () {
        var ways = $(this.body).find('tr[data-tree-area="way"]');
        ways.remove();
    };
    // Закрыть все пути парка
    ids_tree_way.prototype.close_way_of_park = function (id_station, id_park) {
        var ways = $(this.body).find('tr[data-tree-area="way"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        ways.remove();
    };
    // Убрать все выбранные пути
    ids_tree_way.prototype.deselect_way = function () {
        var ways = $(this.body).find('tr[data-tree-area="way"].select');
        ways.removeClass('select');
    };

    // Раскрыть парки по указаной станции и раскрыть пути и выбрать путь
    ids_tree_way.prototype.open_way = function (id_station, id_park, id_way) {
        var tr_station = this.body.find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (tr_station && tr_station.length > 0) {
            var show = $(tr_station).hasClass('shown');
            if (!show) {
                // Раскроем парки и пути
                this.view_park(id_station, null, null, function (id_stat) {
                    // раскрыть путь
                    this.open_park(id_station, id_park, id_way);
                }.bind(this));
            } else {
                this.open_park(id_station, id_park, id_way);
            }
        }

    };
    // Раскрыть пути по выбранному парку и выбрать путь
    ids_tree_way.prototype.open_park = function (id_station, id_park, id_way) {
        var tr_park = this.body.find('tr[data-tree-area="park"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        if (tr_park && tr_park.length > 0) {
            var show = $(tr_park).hasClass('shown');
            if (!show) {
                // Раскрыть пути и выбрать путь
                this.view_way(id_station, id_park, null, function () {
                    // выбрать путь
                    this.select_way(id_way);
                    LockScreenOff();
                }.bind(this));
            } else {
                // пути раскрыты выбрать путь
                this.select_way(id_way);
                LockScreenOff();
            }
        }
    };

    // открыть все ветки (b_way - true раскрыть путь)
    ids_tree_way.prototype.open_tree = function (b_way) {
        var tr = this.body.find('tr[data-tree-area="station"]');
        this.count_tr_st = tr.length;
        if (tr && tr.length > 0) LockScreen(langView('mess_open_tree', App.Langs)); // выведем сообщение
        $.each(tr, function (i, el) {
            var id_station = $(el).attr('data-station');
            var show = $(el).hasClass('shown');
            if (!show) {
                // Раскроем парки и пути
                this.view_park(id_station, null, null, function (id_stat) {
                    if (b_way) {
                        // раскрыть путь
                        this.open_way_of_park_station(id_stat, function () {
                            this.count_tr_st--;
                            if (this.count_tr_st <= 0) {
                                LockScreenOff();
                            }
                        }.bind(this));
                    } else {
                        // путь не раскрывать
                        this.count_tr_st--;
                        if (this.count_tr_st <= 0) {
                            LockScreenOff();
                        }
                    }


                }.bind(this));
            } else {
                if (b_way) {
                    // раскрыть путь
                    this.open_way_of_park_station(id_station, function () {
                        this.count_tr_st--;
                        if (this.count_tr_st <= 0) {
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    // путь не раскрывать
                    this.count_tr_st--;
                    if (this.count_tr_st <= 0) {
                        LockScreenOff();
                    }
                }
            }
        }.bind(this));
    };
    // открыть все ветки путей по паркам указаной станции
    ids_tree_way.prototype.open_way_of_park_station = function (id_station, callback) {
        var tr_park = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
        var count_tr_prk = tr_park.length;
        //this.count_tr_prk[id_station] = tr_park.length;
        $.each(tr_park, function (i, el_park) {
            var id_park = $(el_park).attr('data-park');
            var show_tr_park = $(el_park).hasClass('shown');
            if (!show_tr_park) {
                this.view_way(id_station, id_park, null, function () {
                    count_tr_prk--;
                    if (count_tr_prk <= 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }.bind(this));
            } else {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }.bind(this));

    };

    App.ids_tree_way = ids_tree_way;

    window.App = App;
})(window);