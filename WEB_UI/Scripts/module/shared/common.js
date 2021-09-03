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
            'title_label_date': 'ПЕРИОД :',
            'title_select': 'Выберите...',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //--------------------------------------------------------------------------
    // Класс для создания объектов контроля для элементов HTML
    //--------------------------------Конструктор и инициализация---------------
    // создать класс
    function form_control() {

    };
    // Инициализация компонента "SELECT"
    form_control.prototype.init_select = function (element, data, default_value, fn_option, fn_change) {
        //TODO: создать и настроить SELECT сделать надпись выберите через placeholder, чтобы работала required
        this.$element = element;
        var $default_option = $('<option></option>', {
            'value': '-1',
            'text': langView('title_select', App.Langs),
        });
        this.init = function () {
            this.update(data, default_value, fn_option);
            if (typeof fn_change === 'function') {
                this.$element.on("change", fn_change.bind(this));
            }

        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
                //this.$element.change();
            } else {
                return this.$element.val();
            };
        };
        this.update = function (data, default_value, fn_option) {
            this.$element.empty();

            if (default_value === -1) {
                element.append($default_option);
            }
            if (data) {
                $.each(data, function (i, el) {
                    // Преобразовать формат
                    if (typeof fn_option === 'function') {
                        el = fn_option(el);
                    }
                    if (el) {
                        var $option = $('<option></option>', {
                            'value': el.value,
                            'text': el.text,
                            'disabled': el.disabled,
                        });
                        this.$element.append($option);
                    }
                }.bind(this));
            };
            this.$element.val(default_value);
        };
        this.init();
    };
    // Инициализация текстового поля "INPUT"
    form_control.prototype.init_input = function (element, default_value, fn_change) {
        this.$element = element;
        this.init = function () {
            this.update(default_value);
            if (typeof fn_change === 'function') {
                this.$element.on("change", fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
                //this.$element.change();
            } else {
                return this.$element.val();
            };
        };
        this.update = function (default_value) {
            this.$element.val(default_value);
        };
        this.init();
    };
    // Инициализация флажка "CHECKBOX"
    form_control.prototype.init_checkbox = function (element, default_value, fn_change) {
        this.$element = element;
        this.init = function () {
            this.update(default_value);
            if (typeof fn_change === 'function') {
                this.$element.on("change", fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.prop('checked', Boolean(value));
                //this.$element.change();
            } else {
                return this.$element.prop('checked');
            };
        };
        this.update = function (default_value) {
            this.$element.val(default_value);
        };
        this.init();
    };
    // Инициализация поля дата и время "INPUT"
    form_control.prototype.init_datetime_input = function (element, default_datetime, fn_close, time) {
        this.$element = element;
        this.init = function () {
            this.update(default_datetime);
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.set(value);
            } else {
                return this.get();
            };
        };
        this.update = function (default_datetime) {
            this.$element = element.dateRangePicker(
                {
                    language: App.Lang,
                    format: App.Lang === 'ru' ? 'DD.MM.YYYY' + (time ? ' HH:mm' : '') : 'DD\MM\YYYY' + (time ? ' HH:mm' : ''),
                    autoClose: false,
                    singleDate: true,
                    singleMonth: true,
                    showShortcuts: false,
                    time: {
                        enabled: time
                    },
                }).
                bind('datepicker-change', function (evt, obj) {
                    this.select_date = obj.date1;
                }.bind(this)).bind('datepicker-closed', function () {
                    // Преобразовать формат
                    if (typeof fn_close === 'function') {
                        fn_close(this.get());
                    }
                }.bind(this));
            this.set(default_datetime);
        };
        this.set = function (datetime) {
            if (datetime !== null) {
                this.$element.data('dateRangePicker').setDateRange(moment(datetime).format('DD.MM.YYYY' + (time ? ' HH:mm' : '')), moment(datetime).format('DD.MM.YYYY' + (time ? ' HH:mm' : '')), true);
            } else {
                // Установить текущую дату и время
                this.$element.data('dateRangePicker').setDateRange(moment().format('DD.MM.YYYY' + (time ? ' HH:mm' : '')), moment().format('DD.MM.YYYY' + (time ? ' HH:mm' : '')), true);
                this.$element.data('dateRangePicker').clear();
            }
        };
        this.get = function () {
            var datetime = this.$element.val();
            if (datetime !== null && datetime !== "") {
                //var dt = moment.utc(datetime, 'DD.MM.YYYY' + (time ? ' hh:mm' : '')).tz('Europe/Kiev');
                //return moment(dt).toISOString();
                return moment.utc(datetime, 'DD.MM.YYYY' + (time ? ' hh:mm' : '')).toISOString();
            } else {
                return null;
            }
        };
        this.init();
        this.destroy = function () {
            this.$element.data('dateRangePicker').destroy();
        };
    };
    // Инициализация поля дата и время "SPAN"
    form_control.prototype.init_datetime_range = function (element, start, stop, fn_close) {
        this.$element = element;
        this.$start = element.find('input[data-type="start"]');
        this.$stop = element.find('input[data-type="stop"]');
        this.init = function () {
            this.update(start, stop);
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.set(value);
            } else {
                return this.get();
            };
        };
        this.update = function (start, stop) {
            this.$element = element.dateRangePicker(
                {
                    language: App.Lang,
                    format: App.Lang === 'ru' ? 'DD.MM.YYYY HH:mm' : 'DD\MM\YYYY  HH:mm',
                    separator: '-',
                    autoClose: false,
                    //singleDate: true,
                    //singleMonth: true,
                    //showShortcuts: false,
                    time: {
                        enabled: true
                    },
                    setValue: function (s, s1, s2) {
                        this.$start.val(s1);
                        this.$stop.val(s2);
                    }.bind(this)
                }).bind('datepicker-change', function (evt, obj) {
                    this.start_date = obj.date1;
                    this.stop_date = obj.date2;
                }.bind(this)).bind('datepicker-closed', function () {
                    // Преобразовать формат
                    if (typeof fn_close === 'function') {
                        fn_close(this.get());
                    }
                }.bind(this));
            this.set(start, stop);
        };
        this.set = function (start, stop) {
            if (start !== null && stop !== null) {
                this.$element.data('dateRangePicker').setDateRange(moment(start).format('DD.MM.YYYY HH:mm'), moment(stop).format('DD.MM.YYYY HH:mm'), true);
            } else {
                // Установить текущую дату и время
                this.$element.data('dateRangePicker').setDateRange(moment().format('DD.MM.YYYY HH:mm:'), moment().format('DD.MM.YYYY HH:mm:'), true);
                this.$element.data('dateRangePicker').clear();
            }
        };
        this.get = function () {
            var start = this.$start.val();
            var stop = this.$stop.val();
            var dt_start = start !== null && start !== "" ? moment(start, 'DD.MM.YYYY hh:mm') : null;
            if (dt_start === null || !dt_start.isValid()) this.$start.val('');
            var dt_stop = stop !== null && stop !== "" ? moment(stop, 'DD.MM.YYYY hh:mm') : null;
            if (dt_stop === null || !dt_stop.isValid()) this.$stop.val('');
            if (dt_start !== null && dt_stop !== null && dt_start.isValid() && dt_stop.isValid()) {
                this.set(dt_start._d, dt_stop._d);
                //return { start: (start !== null && start !== "" ? moment.utc(start, 'DD.MM.YYYY hh:mm').toISOString() : null), stop: (stop !== null && stop !== "" ? .utc(stop, 'DD.MM.YYYY hh:mm').toISOString() : null) }
                return { start: dt_start.format('YYYY-MM-DDTHH:mm:ss.SSS'), stop: dt_stop.format('YYYY-MM-DDTHH:mm:ss.SSS') };
            } else {
                // Оштбка формата
                return null;

            }


        };
        this.init();
        this.destroy = function () {
            this.$element.data('dateRangePicker').destroy();
        };
    };
    // Инициализация поля дата "INPUT"
    form_control.prototype.init_textarea = function (element, default_value, fn_change) {
        /*        this.options = [];*/
        this.$element = element;
        this.init = function () {
            this.update(default_value);
            if (typeof fn_change === 'function') {
                this.$element.on("change", fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
                //this.$element.change();
            } else {
                return this.$element.val();
            };
        };
        this.update = function (default_value) {
            this.$element.val(default_value);
        };
        this.init();
    };
    // Инициализация поля дата "INPUT" типа Autocomplete
    form_control.prototype.init_autocomplete = function (element, options) {
        var get_alist = function (data) {
            var alist = [];
            $.each(data, function (i, el) {
                alist.push({ value: el.text, label: el.text, disabled: el.disabled ? el.disabled : null });
            }.bind(this));
            return alist;
        };

        this.$element = element;
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            data: [],
            minLength: 0,
            out_value: false,
            val_inp: 'value',
        }, options);

        this.init = function () {
            this.alist = get_alist(this.settings.data);
            /*            this.$element = element.catcomplete({*/
            this.$element = element.autocomplete({
                minLength: this.settings.minLength,
                source: this.alist,
            });
            var widgetInst = this.$element.autocomplete('instance');
            widgetInst._renderItem = function (ul, item) {
                return $("<li>")
                    .append($("<div>").text(item.label))
                    .addClass(item.disabled ? 'exist' : 'new')
                    .appendTo(ul);
            };
        };
        this.update = function (data, value) {
            this.settings.data = data;
            this.alist = get_alist(this.settings.data);
            this.$element.autocomplete("option", "source", this.alist);
            this.val(value);
        };
        this.val = function (value) {
            if (value !== undefined) {
                var text_out = value;
                if (this.settings.val_inp === 'value') {
                    var select = this.settings.data.find(function (o) {
                        return o.value == $.trim(value);
                    }.bind(this));
                    text_out = select ? select.text : null;
                }
                this.$element.val(text_out);
            } else {
                var select = this.settings.data.find(function (o) {
                    return o.text === $.trim(this.$element.val());
                }.bind(this));
                return select ? select.value : null;
            };
        };
        this.destroy = function (data) {
            this.$element.autocomplete("destroy");
        };
        this.init();
    }
    //-----------------------------------------------------------------------------------------------------
    // Элемент <div class="row">
    form_control.prototype.el_row = function () {
        this.$row = $('<div></div>', {
            'class': 'row',
        });
    };
    // Элемент <div class="col-..-..">
    form_control.prototype.el_col = function (prefix, col) {
        this.$col = $('<div></div>', {
            'class': 'col-' + prefix + '-' + col + ' mb-1 mt-1',
        });
    };
    // Элемент <input type=".." class=".." id=".." name="..">
    form_control.prototype.el_input = function (prefix, id, type) {
        this.$input = $('<input></input>', {
            'class': 'form-control' + (prefix ? '-' + prefix + ' ' : ' '),
            'type': type,
            'id': id,
            'name': id
        });
    };
    // Элемент <select class="form-control-.. id=".." name=".." required></select>
    form_control.prototype.el_select = function (prefix, id, required) {
        this.$select = $('<select></select>', {
            'class': 'form-control' + (prefix ? '-' + prefix + ' ' : ' '),
            'id': id,
            'name': id,
        });
        if (required)
            this.$select.attr('required', true);
    };
    // Элемент <div class="form-group">
    form_control.prototype.el_div_form_group = function () {
        this.$div = $('<div></div>', {
            'class': 'form-group',
        });
    };
    // Элемент <div class="input-group">
    form_control.prototype.el_div_input_group = function () {
        this.$col = $('<div></div>', {
            'class': 'input-group',
        });
    };
    //--------------------------------------------------------------------
    // Элемент <form class="form-inline">
    form_control.prototype.el_form_inline = function (id, cl_form) {
        this.$form = $('<form></form>', {
            'class': 'form-inline ' + cl_form,
            'id': id
        });
    };
    // Элемент выбора интервала времени для формы <form class="form-inline">
    //<div class="form-group">
    //    <label class="col-form-label-sm mr-2" for="select-date">ПЕРИОД:</label>
    //    <span id="select-date" class="mr-2">
    //        <input type="datetime" class="form-control-sm" id="date-start" name="date-start">
    //        <input type="datetime" class="form-control-sm" id="date-stop" name="date-stop">
    //    </span>
    //</div>
    form_control.prototype.el_form_inline_interval_date = function (id, prefix) {
        var FC = App.form_control;
        var fc = new FC();

        var div = new fc.el_div_form_group();
        this.$span = $('<span></span>', {
            'class': 'mr-2',
            'id': id
        });
        var $label = $('<label></label>', {
            'class': 'col-form-label' + (prefix ? '-' + prefix + ' ' : ' ') + 'mr-2',
            'for': id,
            'text': langView('title_label_date', App.Langs)
        });
        //
        var start = new fc.el_input(prefix, id + '-start', 'datetime');
        start.$input.attr('data-type', 'start');
        this.$start = start.$input;
        //
        var stop = new fc.el_input(prefix, id + '-stop', 'datetime');
        stop.$input.attr('data-type', 'stop');
        this.$stop = stop.$input;

        this.$span.append(this.$start).append(this.$stop);

        this.$element = div.$div.append($label).append(this.$span);
    };
    // Элемент список для формы <form class="form-inline">
    //<div class="form-group">
    //    <label class="col-form-label-.. mr-2" for="">...</label>
    //    <select class="form-control-.." id="" name="" required></select>
    //</div>
    form_control.prototype.el_form_inline_select = function (id, prefix, title) {
        var FC = App.form_control;
        var fc = new FC();

        var div = new fc.el_div_form_group();
        var $label = $('<label></label>', {
            'class': 'col-form-label' + (prefix ? '-' + prefix + ' ' : ' ') + 'mr-2',
            'for': id,
            'text': title
        });
        //
        var select = new fc.el_select(prefix, id, true);
        this.$select = select.$select;
        this.$element = div.$div.append($label).append(this.$select);
    };
    //--------------------------------------------------------------------
    // Элемент CARD
    form_control.prototype.el_card = function (cl_card, cl_header, cl_body, title) {
        var $card = $('<div></div>', {
            'class': 'card ' + cl_card,
        });

        this.$header = $('<div></div>', {
            'class': 'card-header ' + cl_header,
            'text': title
        });

        this.$body = $('<div></div>', {
            'class': 'card-body ' + cl_body,
        });

        this.$card = $card.append(this.$header).append(this.$body);
    };
    // Элемент TABLE
    form_control.prototype.el_table = function (id, cl_table) {
        var $table = $('<table></table>', {
            'id': id,
            'class': cl_table,
            'style': 'width:100%;'
        });
        this.$element = $table;
    };
    //
    App.form_control = form_control;

    // Конструктор формы 
    function form_inline() {
        this.fc = new form_control();
    }
    // Инициализация формы
    form_inline.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            fields: [],
            id: '',
            cl_form: '',
        }, options);
        var form = new this.fc.el_form_inline(this.settings.id, this.settings.cl_form);
        this.$form = form.$form;
        // создадим поля
        $.each(this.settings.fields, function (i, el) {
            if (el.type === 'interval_date') {
                var element = new this.fc.el_form_inline_interval_date(el.id, el.prefix);
                if (element && element.$element && element.$element.length > 0) {
                    this.$form.append(element.$element);
                    el['element'] = new this.fc.init_datetime_range(element.$span, el.start, el.stop, el.select);
                }
            }
            if (el.type === 'select') {
                var element = new this.fc.el_form_inline_select(el.id, el.prefix, el.title);
                if (element && element.$element && element.$element.length > 0) {
                    this.$form.append(element.$element);
                    el['element'] = new this.fc.init_select(element.$select, el.list, -1, null, el.select);
                }
            }
        }.bind(this));
    };

    form_inline.prototype.get_value = function () {
        var result = {};
        $.each(this.settings.fields, function (i, el) {
            if (el.type === 'interval_date' && el.element) {
                result[el.id] = el.element.val();
            }
            if (el.type === 'select' && el.element) {
                result[el.id] = el.element.val();
            }
        }.bind(this));
        return result;
    };

    App.form_inline = form_inline;


    window.App = App;

})(window);