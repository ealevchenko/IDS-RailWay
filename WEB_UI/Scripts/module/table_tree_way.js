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
            'title_inp_out': 'прин.-отпр.',
            'title_count': 'кол.',
            'title_max': 'мак.',
            'title_info_detali': 'Информация детально...',
            'title_select_station': 'Выбрать активные станции...',
            'title_open_tree': 'Открыть дерево путей',
            'title_close_tree': 'Закрыть дерево путей',
            'title_refresh_tree': 'Обновить дерево путей',

            'mess_load_station': 'Загружаю список станций...',
            'mess_load_park': 'Загружаю список парков...',
            'mess_load_way': 'Загружаю список путей...',
        },
        'en':  //default language: English
        {
            'title_card_header': 'Дерево путей',
            'title_inp_out': 'прин.-отпр.',
            'title_count': 'кол.',
            'title_max': 'мак.',
            'title_info_detali': 'Информация детально...',
            'title_select_station': 'Выбрать активные станции...',
            'title_open_tree': 'Открыть дерево путей',
            'title_close_tree': 'Закрыть дерево путей',
            'title_refresh_tree': 'Обновить дерево путей',

            'mess_load_station': 'Загружаю список станций...',
            'mess_load_park': 'Загружаю список парков...',
            'mess_load_way': 'Загружаю список путей...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT
    // Создать раздел кнопки
    function table_button(selector) {
        var $div_bt = $('<div></div>', {
            'class': 'text-left'
        });
        var $bt_icon_station = $('<i></i>', {
            'class': 'far fa-calendar-check'
        });
        var $bt_station = $('<button></button>', {
            'id': 'button-station',
            'class': 'btn btn-sm',
            'title': langView('title_select_station', App.Langs),
        });
        var $bt_icon_open = $('<i></i>', {
            'class': 'far fa-folder-open'
        });
        var $bt_open = $('<button></button>', {
            'id': 'button-open',
            'class': 'btn btn-sm',
            'title': langView('title_open_tree', App.Langs),
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

        $div_bt.append($bt_station.append($bt_icon_station)).append($bt_open.append($bt_icon_open)).append($bt_close.append($bt_icon_close)).append($bt_refresh.append($bt_icon_refresh));
        this.$element = $div_bt;
    };
    //function card(selector) {
    //    var $div = $('<div></div>', {
    //        'class': 'card border-primary'
    //    });
    //    var $div_header = $('<div></div>', {
    //        'class': 'card-header',
    //        'text': langView('title_card_header', App.Langs)
    //    });
    //    var $div_body = $('<div></div>', {
    //        'class': 'card-body',
    //    });
    //    var $div_row = $('<div></div>', {
    //        'class': 'row',
    //    });
    //    var $div_row_xl = $('<div></div>', {
    //        //'class': 'col-xl-12',
    //        'style':'overflow-x:auto'
    //    });
    //    var $div_table = $('<table></table>', {
    //        'id': selector + '-table',
    //        'class': 'table table-hover',
    //    });

    //    /*        var btElement = new table_button(selector);*/
    //    this.$element_table = $div_table;
    //    /*        $div_body.append(btElement.$element);*/
    //    $div_body.append($div_row.append($div_row_xl.append(this.$element_table)));
    //    $div.append($div_header).append($div_body);
    //    this.$element = $div;
    //};
    // Создать таблицу
    function table_tree_way(selector) {
        var $div = $('<div></div>', {
            'style':'overflow-x:auto'
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
    function table_heading(selector) {
        var $thead = $('<thead></thead>', {
            'class': 'thead-light'
        });
        var $tr = $('<tr></tr>');
        var $th_name = $('<th></th>', {
            'width': '60%',
            'scope': 'col',
            //'text': 'Дерево путей',
            'colspan': '5',
            'class': 'text-left'
        });
        var $th_pb = $('<th></th>', {
            'width': '20%',
            'scope': 'col',
            'text': langView('title_inp_out', App.Langs),
            'class': 'text-center',
            'colspan': '1',
        });
        var $th_count = $('<th></th>', {
            'width': '10%',
            'scope': 'col',
            'text': langView('title_count', App.Langs),
            'class': 'text-center',
            'colspan': '1'
        });
        var $th_capacity = $('<th></th>', {
            'width': '10%',
            'scope': 'col',
            'text': langView('title_max', App.Langs),
            'class': 'text-center',
            'colspan': '1'
        });

        var btElement = new table_button(selector);

        $th_name.append(btElement.$element);
        $tr.append($th_name).append($th_pb).append($th_count).append($th_capacity);
        $thead.append($tr);
        this.$element = $thead;

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
        var $img_station = $('<img>', {
            'class': 'icon-station',
            'width': '18px',
        }); //<img class="icon-station">
        var $td_img_station = $('<td></td>', {
            'class': ''
        });
        var $td_name = $('<td></td>', {
            'text': el["station_name_" + App.Lang],
            'class': 'text-left',
            'colspan': '3'
        });
        var $a_arrive = $('<a></a>',
            {
                'text': el.count_arrive,
                'href': '#',
                'class': 'badge badge-warning'
            });
        var $a_send = $('<a></a>',
            {
                'text': el.count_sent,
                'href': '#',
                'class': 'badge badge-success'
            });
        var $td_pb = $('<td></td>', {
            'class': 'text-centr'
        });
        var $td_count = $('<td></td>', {
            'text': el.count_wagon,
            'class': 'text-right'
        });
        var $td_capacity = $('<td></td>', {
            'text': el.count_capacity,
            'class': 'text-right'
        });
        $td_img_station.append($img_station);
        $td_pb.append(el.count_arrive > 0 ? $a_arrive : '0').append('-').append(el.count_sent > 0 ? $a_send : '0');
        $tr.append($td_control).append($td_img_station).append($td_name).append($td_pb).append($td_count).append($td_capacity);
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
        var $img_true_open = $('<img>', {
            'class': 'icon-tree-open',
            'width': '18px',
        });
        var $img_true_open_end = $('<img>', {
            'class': 'icon-tree-open-end',
            'width': '18px',
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
        var $img_park = $('<img>', {
            'class': 'icon-park',
            'width': '18px',
        });
        var $td_img_park = $('<td></td>', {
            'class': ''
        });
        var $td_name = $('<td></td>', {
            'text': el["park_abbr_" + App.Lang],
            'class': 'text-left',
            'colspan': '2'
        });
        //var $a_arrive = $('<a></a>',
        //    {
        //        'text': el.count_arrive,
        //        'href': '#',
        //        'class': 'badge badge-warning'
        //    });
        //var $a_send = $('<a></a>',
        //    {
        //        'text': el.count_sent,
        //        'href': '#',
        //        'class': 'badge badge-success'
        //    });
        var $td_pb = $('<td></td>', {
            'class': 'text-centr'
        });
        var $td_count = $('<td></td>', {
            'text': el.count_wagon,
            'class': 'text-right'
        });
        var $td_capacity = $('<td></td>', {
            'text': el.count_capacity,
            'class': 'text-right'
        });

        $td_img_true_open.append(index === 0 ? $img_true_open_end : $img_true_open);
        $td_img_park.append($img_park);
        //$td_pb.append(el.count_arrive > 0 ? $a_arrive : '0').append('-').append(el.count_sent > 0 ? $a_send : '0');
        $tr.append($td_img_true_open).append($td_control).append($td_img_park).append($td_name).append($td_pb).append($td_count).append($td_capacity);
        this.$element = $tr;
    };
    // Создать раздел tr пути
    function table_tr_way(selector, id_station, id_park, el, index, end_tree) {
        var $tr = $('<tr></tr>', {
            'data-tree-area': 'way',
            'data-station': id_station,
            'data-park': id_park,
            'data-way': el.id
        });
        var $img_tree_open_skeep = $('<img>', {
            'class': 'icon-tree-open-skeep',
            'width': '18px',
        });
        var $td_img_tree_open_skeep = $('<td></td>', {
            'class': '',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $td_not = $('<td></td>', {
            'class': '',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $img_true_open = $('<img>', {
            'class': 'icon-tree-open',
            'width': '18px',
        });
        var $img_true_open_end = $('<img>', {
            'class': 'icon-tree-open-end',
            'width': '18px',
        });
        var $td_img_true_open = $('<td></td>', {
            'class': '',
            'width': '18px',
            'style': 'border-top-color:#fff'
        });
        var $img_way = $('<img>', {
            'class': 'icon-way',
            'width': '18px',
        });
        var $td_img_way = $('<td></td>', {
            'class': ''
        });
        var $td_name = $('<td></td>', {
            'text': el["way_abbr_" + App.Lang],
            'class': 'text-left',
            'colspan': '1'
        });
        var $td_pb = $('<td></td>', {
            'class': 'text-centr'
        });
        var pbElement = new progress_bar(selector, 'way', el.id, el.capacity, el.count_wagon);
        var $td_count = $('<td></td>', {
            'text': el.count_wagon,
            'class': 'text-right'
        });
        var $td_capacity = $('<td></td>', {
            'text': el.capacity,
            'class': 'text-right'
        });

        $td_pb.append(pbElement.$element); // добавим прогрес бар
        $td_img_tree_open_skeep.append(end_tree === 0 ? $img_tree_open_skeep : '');
        $td_img_true_open.append(index === 0 ? $img_true_open_end : $img_true_open);
        $td_img_way.append($img_way);
        $tr.append($td_img_tree_open_skeep).append($td_not).append($td_img_true_open).append($td_img_way).append($td_name).append($td_pb).append($td_count).append($td_capacity);
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
        //<div class="progress-bar bg-success" ="" ="" ="" ="" =""></div>
        $div.append($div_pb);
        this.$element = $div;
    };
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
    // инициализация таблицы
    ids_tree_way.prototype.init = function (fn_select_way, fn_detali) {
        this.fn_select_way = fn_select_way;
        this.fn_detali = fn_detali;

        var cardElement = new table_tree_way(this.selector);
        this.$div_tree_way.empty();
        this.$div_tree_way.append(cardElement.$element);
        this.$t_tree_way = cardElement.$element_table;

        var headElement = new table_heading(this.selector);
        // Привяжим событие обработки кнопок
        headElement.$element.on('click', 'button', function (e) {
            e.preventDefault();
            e.stopPropagation(); // отменим событие дальше
            var id = $(e.target).attr('id');
            switch (id) {
                case 'button-close': this.close_tree(); break;
            };
        }.bind(this));

        this.$t_tree_way.empty();

        this.$t_tree_way.append(headElement.$element);
        var bodyElement = new table_body(this.selector);
        this.body = bodyElement.$element;
        this.$t_tree_way.append(this.body);
    };
    // инициализация таблицы
    ids_tree_way.prototype.view = function (id_station, id_park, id_way) {
        //this.load_station();
        this.view_station(id_station, id_park, id_way)
    };
    // Загрузить станции из базы
    ids_tree_way.prototype.load_station = function (callback) {
        LockScreen(langView('mess_load_station', App.Langs));
        ids_rwt.getViewStationStatus(function (station) {
            if (typeof callback === 'function') {
                callback(station.filter(function (i) { return !i.station_uz; }));
            }
        }.bind(this));
    };
    // Показать станции
    ids_tree_way.prototype.view_station = function (id_station, id_park, id_way) {
        var base = this;
        this.load_station(function (stations) {
            $.each(stations, function (i, el) {
                var trbodyElement = new table_tr_station(base.selector, el); // Получим парк
                // Настроим событие нажатия на "открыть"\"закрыть" парк
                trbodyElement.$element.on('click', 'td.station-control', function (e) {
                    var tr = $(e.target).closest('tr');
                    var id_station = tr.attr('data-station');
                    this.view_park(id_station); // Показать парки
                }.bind(base));
                // Добавим элемент
                base.body.append(trbodyElement.$element);
                if (id_station && el.id === id_station) {
                    base.view_park(id_station, id_park, id_way); // Показать парки
                }
            }.bind(this));
            LockScreenOff();
        })
    };
    // Загрузить парки станции из базы
    ids_tree_way.prototype.load_park = function (id_station, callback) {
        LockScreen(langView('mess_load_park', App.Langs));
        ids_rwt.getViewParkWaysOfStation(id_station, function (park) {
            if (typeof callback === 'function') {
                callback(park);
            }
        }.bind(this));
    };
    // показать парки станции
    ids_tree_way.prototype.view_park = function (id_station, id_park, id_way) {
        var station = $(this.body).find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (station && station.length > 0) {
            // Проверим парк открыт
            var parks = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
            if (parks && parks.length > 0) {
                /*parks.remove();*/
                this.close_way_of_station(id_station); // Удалить (закрыть) - пути
                this.close_park_of_station(id_station); // Удалить (закрыть) - парки
                $(station).removeClass('shown');
                LockScreenOff();
            } else {
                $(station).addClass('shown');
                this.load_park(id_station, function (park) {
                    var base = this;
                    // Отобразим парки
                    $.each(park, function (i, el) {
                        var trbodyElement = new table_tr_park(base.selector, id_station, el, i);
                        // Привязать событие выбора
                        trbodyElement.$element.on('click', 'td.park-control', function (e) {
                            var tr = $(e.target).closest('tr');
                            var id_station = tr.attr('data-station');
                            var id_park = tr.attr('data-park');
                            this.view_way(id_station, id_park); // Показать пути
                        }.bind(base));
                        station.after(trbodyElement.$element);
                        if (id_park && el.id === id_park) {
                            base.view_way(id_station, id_park, id_way); // Показать парки
                        }
                    });
                    LockScreenOff();
                }.bind(this));
            }
        }
    };
    // Загрузить пути из базы
    ids_tree_way.prototype.load_way = function (id_station, id_park, callback) {
        LockScreen(langView('mess_load_way', App.Langs));
        ids_rwt.getViewWaysOfStationPark(id_station, id_park, function (ways) {
            if (typeof callback === 'function') {
                callback(ways);
            }
        }.bind(this));
    };
    // показать парки станции
    ids_tree_way.prototype.view_way = function (id_station, id_park, id_way) {
        var park = $(this.body).find('tr[data-tree-area="park"][data-park="' + id_park + '"]');
        var end_park = park.attr('data-tree-end');
        if (park && park.length > 0) {
            var ways = $(this.body).find('tr[data-tree-area="way"][data-park="' + id_park + '"]');
            if (ways && ways.length > 0) {
                ways.remove();
                $(park).removeClass('shown');
                LockScreenOff();
            } else {
                $(park).addClass('shown');
                this.load_way(id_station, id_park, function (ways) {
                    var base = this;
                    // Отобразим парки
                    $.each(ways, function (i, el) {
                        var trbodyElement = new table_tr_way(base.selector, id_station, id_park, el, i, Number(end_park));
                        // Обработать события выбора пути
                        trbodyElement.$element.on('click', 'div.progress', function (e) {
                            // Обработка события информация детально
                            e.preventDefault();
                            e.stopPropagation(); // отменим событие дальше
                            var name = $(e.target).attr('data-tree-pb-name');
                            var id = Number($(e.target).attr('data-tree-pb-id'));
                            if (typeof this.fn_detali === 'function') {
                                this.fn_detali(name, id);
                            }
                        }.bind(base)).on('click', function (e) {
                            var tr = $(e.target).closest('tr');
                            if (tr && tr.length > 0) {
                                this.select_way(Number(tr.attr('data-way')));
                            }
                            //this.deselect_way();
                            //tr.addClass('select');
                            //var id_station = Number(tr.attr('data-station'));
                            //var id_park = Number(tr.attr('data-park'));
                            //var id_way = Number(tr.attr('data-way'));
                            //if (typeof this.fn_select_way === 'function') {
                            //    this.fn_select_way(id_station, id_park, id_way);
                            //}
                        }.bind(base));
                        park.after(trbodyElement.$element);
                    });
                    if (id_way) {
                        base.select_way(id_way);
                    }
                    LockScreenOff();
                }.bind(this));
            }
        }
    };

    // Выбрать путь
    ids_tree_way.prototype.select_way = function (id_way) {
        var way = this.body.find('tr[data-way="'+id_way+'"]');
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
        var ways = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
        ways.remove();
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
    ids_tree_way.prototype.close_way_of_park = function (id_park) {
        var ways = $(this.body).find('tr[data-tree-area="way"][data-park="' + id_park + '"]');
        ways.remove();
    };

    // Убрать все выбранные пути
    ids_tree_way.prototype.deselect_way = function () {
        var ways = $(this.body).find('tr[data-tree-area="way"].select');
        ways.removeClass('select');
    };

    App.ids_tree_way = ids_tree_way;

    window.App = App;
})(window);