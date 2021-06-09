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
            'title_select_station': 'Выбрать активные станции...',
        },
        'en':  //default language: English
        {
            'title_select_station': 'Выбрать активные станции...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_rwt = new IDS_RWT(App.Lang);                // Создадим класс IDS_RWT

    //---------------------------Формирование элементов дерева---------------

    function dd_select(base) {
        //base.selector;
        var $div_bt = $('<div></div>', {
            'class': 'dropdown show',
            'style': 'float:left;'
        });
        var $bt_icon_station = $('<i></i>', {
            'class': 'fas fa-tasks'
        });
        var $bt_station = $('<button></button>', {
            'id': 'sel_st',
            'type': 'button',
            'class': 'btn btn-default dropdown-toggle',
            'data-toggle': 'dropdown',
            'aria-haspopup': 'true',
            'aria-expanded': 'true',
            'title': langView('title_select_station', App.Langs),
        });
        var $ul_station = $('<ul></ul>', {
            'class': 'dropdown-menu checkbox-menu allow-focus',
            'aria-labelledby': 'sel_st',
            'style': 'overflow-x:auto;'
        });

        var $div_bt_st = $('<div></div>', {
            'class':'text-center'
        });
        var $bt_select = $('<button></button>', {
            'id': base.selector + '-select',
            'class': 'btn btn-primary btn-sm mr-3',
            //'title': langView('title_open_tree_way', App.Langs),
            'text': 'Выбрать все',
        });
        var $bt_deselect = $('<button></button>', {
            'id': base.selector + '-deselect',
            'class': 'btn btn-primary btn-sm',
            //'title': langView('title_open_tree_way', App.Langs),
            'text': 'Убрать все',
        });

        $div_bt_st.append($bt_select).append($bt_deselect);

        // height:400px;
        var $bt_aplly = $('<button></button>', {
            'id': base.selector + '-apply',
            'class': 'btn btn-default ',
            'type': 'button',
            'text': 'Применить'
        });
        $ul_station.append($div_bt_st);
        //$ul_station.append($bt_aplly);
        $.each(base.list_enable_station, function (i, el) {
            //var $input = $('<input type="checkbox" />');
            //$input.text(el.text);
            var $label = $('<label></label>');
            var $div_li = $('<li></li>', {
                //'dds': '',
                'id': el.value,
                'class': (el.enable ? "active" : ""),
            });
            //$div_li.append($label.append($input));
            $div_li.append($label.append('<input type="checkbox" ' + (el.enable ? 'checked' : '') + ' />' + el.text));
            //$div_li.toggleClass("active", el.enable);
            $ul_station.append($div_li);
        });



        this.$element_ul = $ul_station;
        $bt_station.append($bt_icon_station);
        $div_bt.append($bt_station).append($bt_aplly).append($ul_station);
        this.$element = $div_bt;
    }
    //--------------------------------Конструктор и инициализация---------------
    // Выпадающий список станций
    function cblist_station(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$cblist = $(selector);
        if (this.$cblist.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$cblist.attr('id');
    }
    //  Загрузить список станций
    cblist_station.prototype.load_init = function (list_enable, callback) {
        this.list_enable_station = [];
        ids_rwt.ids_dir.getStation(function (stations) {
            $.each(stations.filter(function (i) {
                return !i.station_uz;
            }), function (i, el) {
                // Определим станция уже выбрана
                var st_enable = true;
                if (list_enable) {
                    st_enable = list_enable.find(function (o) {
                        return o === el.id;
                    });
                }
                this.list_enable_station.push({ value: el.id, text: el['station_name_' + App.Lang], enable: st_enable });
            }.bind(this));

            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this))
    };
    // инициализация
    cblist_station.prototype.init = function (list_enable, fn_apply) {
        this.fn_apply = fn_apply;
        // Загрузим нужные данные
        this.load_init(list_enable, function () {
            // теперь выполним инициализацию
            var ddsElement = new dd_select(this);
            ddsElement.$element.on('click', 'button', function (e) {
                e.preventDefault();
                //e.stopPropagation(); // отменим событие дальше
                var id = $(e.currentTarget).attr('id');
                switch (id) {
                    case this.selector + '-apply': this.apply(); break;
                    case this.selector + '-select': this.select(); break;
                    case this.selector + '-deselect': this.deselect(); break;
                };
            }.bind(this));
            this.$cblist.empty();
            this.$cblist.append(ddsElement.$element);
            $(".checkbox-menu").on("change", "input[type='checkbox']", function () {
                $(this).closest("li").toggleClass("active", this.checked);
            });

            $(document).on('click', '.allow-focus', function (e) {
                e.stopPropagation();
            });
        }.bind(this));


    };
    // Применить 
    cblist_station.prototype.apply = function () {
        // Получим список выбранных
        var list = this.$cblist.find('li.active');
        this.select_station = [];
        $.each(list, function (i, el) {
            var id = $(el).attr('id');
            if (id !== null) {
                this.select_station.push(Number(id));
            }
        }.bind(this));
        // выполним функцию которую задали
        if (typeof this.fn_apply === 'function') {
            this.fn_apply(this.select_station);
        }
    };

    cblist_station.prototype.select = function () {
    };

    cblist_station.prototype.deselect = function () {
        var li = this.$cblist.find('.allow-focus li.active');
        $(li).removeClass('active');

        var cb = this.$cblist.find('input[type="checkbox"]:checked');
    };

    App.cblist_station = cblist_station;

    window.App = App;
})(window);