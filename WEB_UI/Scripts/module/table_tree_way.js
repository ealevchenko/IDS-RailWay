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
            'field_num': '№ вагона',
            'field_train': '№ поезда',
            'field_composition_index': 'Индекс поезда',
            'field_date_arrival': 'Прибил в составе',
            'field_date_adoption': 'Принят в составе',
            'field_date_adoption_act': 'Принят в составе по акту',
            'field_date_adoption_act_wagon': 'Вагон принят по акту',
            'field_processed': 'Обработан',
            'field_station_from': 'Отправлен со станции',
            'field_station_on': 'Принят на станцию',
            'field_way': 'Принят на путь',
            'field_doc_uz': '№ накладной УЗ',
            'field_status': 'Статус состава',
            'field_note': 'Примечание',

            'title_button_export': 'Экспорт',
            'title_button_buffer': 'Буфер',
            'title_button_excel': 'Excel',

            'mess_load_arr_wagons': 'Загружаю список принятых вагонов...',
        },
        'en':  //default language: English
        {
            'field_id': 'row id',
            'field_num': 'Wagon number',
            'field_train': 'Train no.',
            'field_composition_index': 'Train index',
            'field_date_arrival': 'Arrived in lineup',
            'field_date_adoption': 'Adopted with',
            'field_date_adoption_act': 'Adopted as part of the act',
            'field_date_adoption_act_wagon': 'The car was accepted according to the act',
            'field_processed': 'Processed',
            'field_station_from': 'Sent from station',
            'field_station_on': 'Received at station',
            'field_way': 'Accepted on path',
            'field_doc_uz': 'UZ waybill no.',
            'field_status': 'Squad status',
            'field_note': 'Note',

            'title_button_export': 'Export',
            'title_button_buffer': 'Buffer',
            'title_button_excel': 'Excel',

            'mess_load_arr_wagons': 'Loading the list of accepted wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    // Перечень полей
    var list_collums = [
        {
            field: 'arr_car_details_control',
            className: 'details-control  details-control-arrival',
            orderable: false,
            data: null,
            defaultContent: '',
            width: "30px",
            searchable: false
        },
        {
            field: 'arr_car_button_view',
            targets: 0,
            data: null,
            defaultContent: '<button class="btn arrival-button"><i class="far fa-eye"></i></button>',
            orderable: false,
            //className: 'select-checkbox',
            width: "20px"
        },
        {
            field: 'arr_car_num',
            data: function (row, type, val, meta) {
                return row.num;
            },
            className: 'dt-body-center',
            title: langView('field_num', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            //data: "train",
            field: 'arr_car_train',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return sostav ? sostav.train : null;
            },
            className: 'dt-body-center',
            title: langView('field_train', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            //data: "composition_index",
            field: 'arr_car_composition_index',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return sostav ? sostav.composition_index : null;
            },
            className: 'dt-body-center',
            title: langView('field_composition_index', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_date_arrival',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return getReplaceTOfDT(sostav ? sostav.date_arrival : null);
            },
            className: 'dt-body-center',
            title: langView('field_date_arrival', App.Langs), width: "100px", orderable: true, searchable: false
        },
        {
            field: 'arr_car_date_adoption',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                if (row.arrival !== null) {
                    return getReplaceTOfDT(sostav ? sostav.date_adoption : null);
                } else {
                    return getReplaceTOfDT(sostav ? sostav.date_adoption : null) ? 'Нет' : null;
                }
            },
            className: 'dt-body-center',
            title: langView('field_date_adoption', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            //data: "date_adoption_act",
            field: 'arr_car_date_adoption_act',
            data: function (row, type, val, meta) {
                if (row.arrival !== null) {
                    var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                    return getReplaceTOfDT(sostav ? sostav.date_adoption_act : null);
                } else {
                    return null;
                }
            },
            className: 'dt-body-center',
            title: langView('field_date_adoption_act', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'arr_car_date_adoption_act_wagon',
            data: function (row, type, val, meta) {
                return getReplaceTOfDT(row.date_adoption_act);
            },
            className: 'dt-body-center',
            title: langView('field_date_adoption_act_wagon', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'arr_car_date_arrival_wagon',
            data: function (row, type, val, meta) {
                return row.arrival ? (row.arrival_user + '<br />[' + getReplaceTOfDT(row.arrival) + ']') : null;
            },
            className: 'dt-body-center',
            title: langView('field_processed', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            field: 'arr_car_station_from',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                var station = sostav ? sostav.Directory_Station : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station_from', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_station_on',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                var station = sostav ? sostav.Directory_Station1 : null;
                return station ? station['station_name_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_station_on', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            //data: "id_way",
            field: 'arr_car_way',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                var way = sostav ? sostav.Directory_Ways : null;
                return way ? way['way_num_' + App.Lang] : null;
            },
            className: 'dt-body-center',
            title: langView('field_way', App.Langs), width: "100px", orderable: false, searchable: false
        },
        {
            //data: "status_name",
            field: 'arr_car_status',
            data: function (row, type, val, meta) {
                var sostav = row.ArrivalSostav ? row.ArrivalSostav : null;
                return sostav ? outStatusArrivalSostav(sostav.status) : null;
            },
            className: 'dt-body-center',
            title: langView('field_status', App.Langs), width: "100px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_doc_uz',
            data: function (row, type, val, meta) {
                var doc = row.UZ_DOC ? row.UZ_DOC : null;
                return doc ? doc.num_uz : null;
            },
            className: 'dt-body-center',
            title: langView('field_doc_uz', App.Langs), width: "50px", orderable: false, searchable: true
        },
        {
            field: 'arr_car_note',
            data: function (row, type, val, meta) {
                return row.note;
            },
            className: 'dt-body-left',
            title: langView('field_note', App.Langs), width: "300px", orderable: false, searchable: false
        },
    ];

    function table_heading(selector) {
        var $thead = $('<thead></thead>', {
            'class': 'thead-light'
        });
        var $tr = $('<tr></tr>');
        var $th_name = $('<th></th>', {
            'width': '60%',
            'scope': 'col',
            'text': 'Дерево путей',
            'colspan': '5'
        });
        var $th_pb = $('<th></th>', {
            'width': '20%',
            'scope': 'col',
            'text': 'пр.\от.',
            'colspan': '1'
        });
        var $th_count = $('<th></th>', {
            'width': '10%',
            'scope': 'col',
            'text': 'кол. ваг.',
            'colspan': '1'
        });
        var $th_capacity = $('<th></th>', {
            'width': '10%',
            'scope': 'col',
            'text': 'мах. ваг.',
            'colspan': '1'
        });

        $tr.append($th_name).append($th_pb).append($th_count).append($th_capacity);
        $thead.append($tr);
        this.$element = $thead;

    };

    function table_body(selector) {
        var $tbody = $('<tbody></tbody>', {
            'class': ''
        });
        this.$element = $tbody;

    };

    function table_tr_station(selector, el) {
        var $tr = $('<tr></tr>', {
            'data-tree-area': 'station',
            'data-station': el.id
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
            'class': '',
            'colspan': '3'
        });
        var $a_arrive = $('<a></a>',
            {
                'text': el.count_arrive,
                'href': '#',
                'class': 'badge badge-warning'
            })
        var $a_send = $('<a></a>',
            {
                'text': el.count_sent,
                'href': '#',
                'class': 'badge badge-success'
            })
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

    function table_tr_park(selector, id_station, el, index) {
        var $tr = $('<tr></tr>', {
            'data-tree-area': 'park',
            'data-station': id_station,
            'data-park': el.id
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
            'class': '',
            'colspan': '2'
        });
        var $a_arrive = $('<a></a>',
            {
                'text': el.count_arrive,
                'href': '#',
                'class': 'badge badge-warning'
            })
        var $a_send = $('<a></a>',
            {
                'text': el.count_sent,
                'href': '#',
                'class': 'badge badge-success'
            })
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
        $td_pb.append(el.count_arrive > 0 ? $a_arrive : '0').append('-').append(el.count_sent > 0 ? $a_send : '0');
        $tr.append($td_img_true_open).append($td_control).append($td_img_park).append($td_name).append($td_pb).append($td_count).append($td_capacity);
        this.$element = $tr;
    };

    // Таблица дерева путей
    function table_tree_way(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$t_tree_way = $(selector);
        if (this.$t_tree_way.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$t_tree_way.attr('id');
    }

    // инициализация таблицы
    table_tree_way.prototype.init = function () {
        var headElement = new table_heading(this.selector);
        this.$t_tree_way.empty();
        this.$t_tree_way.append(headElement.$element);
        var bodyElement = new table_body(this.selector);
        this.body = bodyElement.$element;
        this.$t_tree_way.append(this.body);
    };

    // инициализация таблицы
    table_tree_way.prototype.view = function () {
        this.load_station();
    };
    //
    table_tree_way.prototype.view_station = function (stations) {
        var base = this;
        $.each(stations, function (i, el) {
            var trbodyElement = new table_tr_station(base.selector, el);
            trbodyElement.$element.on('click', 'td.station-control', function (e) {
                var tr = $(e.target).closest('tr');
                var id_station = tr.attr('data-station');

                this.view_park(id_station);

                //var el = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
                //if (el && el.length > 0) {
                //    el.remove();
                //} else {

                //}
            }.bind(base));
            base.body.append(trbodyElement.$element);
        });
    };
    //table_tree_way.prototype.view_park = function (tr_station, park) {
    //    var base = this;
    //    $.each(park, function (i, el) {
    //        var trbodyElement = new table_tr_park(base.selector, el);
    //        //trbodyElement.$element.on('click', 'td.station-control', function (e) {
    //        //    var tr = $(e.target).closest('tr');
    //        //    var id_station = tr.attr('data-station');
    //        //    var el = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station +'"]');
    //        //    if (el && el.length > 0) {
    //        //        el.remove();
    //        //    } else {

    //        //    }
    //        //}.bind(base));
    //        tr_station.after(trbodyElement.$element);
    //    });
    //};

    // Загрузить станции
    table_tree_way.prototype.load_station = function () {
        /*        LockScreen(langView('title_mess_load_station', langs));*/
        ids_rwt.getViewStationStatus(function (station) {
            this.view_station(station.filter(function (i) { return !i.station_uz; }));
        }.bind(this));
    };
    // Загрузить парки станции
    table_tree_way.prototype.load_park = function (id_station, callback) {
        /*        LockScreen(langView('title_mess_load_station', langs));*/
        ids_rwt.getViewParkWaysOfStation(id_station, function (park) {
            if (typeof callback === 'function') {
                callback(park);
            }
        }.bind(this));
    };
    // показать парки станции
    table_tree_way.prototype.view_park = function (id_station) {
        this.load_park(id_station, function (park) {
            var base = this;
            var station = $(this.body).find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
            if (station && station.length > 0) {
                var parks = $(this.body).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
                if (parks && parks.length > 0) {
                    parks.remove();
                } else {
                    // Отобразим парки
                    $.each(park, function (i, el) {
                        /*var count =  park.length - i;*/
                        var trbodyElement = new table_tr_park(base.selector, id_station, el, i);
                        station.after(trbodyElement.$element);
                    });
                }
            }
        }.bind(this));
    };


    App.table_tree_way = table_tree_way;

    window.App = App;
})(window);