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
    };
    // Инициализация "BUTTON"
    form_control.prototype.init_button = function (element, fn_click) {
        this.$element = element;
        if (typeof fn_click === 'function') {
            this.$element.on("click", fn_click.bind(this));
        }
    };
    //-----------------------------------------------------------------------------------------------------
    // Элемент <div class="..." id="..."></div>
    form_control.prototype.el_div = function (id, cl_div) {
        this.$div = $('<div></div>');
        if (cl_div && cl_div !== '') {
            this.$div.addClass(cl_div);
        }
        if (id && id !== '') { this.$div.attr('id', id) };
        if (!this.$div || this.$div.length === 0) {
            throw new Error('Не удалось создать элемент <div class="..." id="..."></div>');
        }
    };
    // Элемент <div class="row">
    form_control.prototype.el_row = function () {
        this.$row = $('<div></div>', {
            'class': 'row',
        });
    };
    // Элемент <div class="col-..-..">
    form_control.prototype.el_col = function (prefix, col, cl_col) {
        this.$col = $('<div></div>', {
            'class': 'col-' + prefix + '-' + col + ' ' + (cl_col ? $.trim(cl_col) + ' ' : ''),
        });
        if (!this.$col || this.$col.length === 0) {
            throw new Error('Не удалось создать элемент <div class="col-' + prefix + '-' + col + '"></div>');
        }
    };
    // Элемент <label class=".." for="...">...</label>
    form_control.prototype.el_label = function (for_el, cl_lab, label) {
        this.$label = $('<label></label>', {
            'text': label,
        });
        if (cl_lab && cl_lab !== '') {
            this.$label.addClass(cl_lab);
        }
        if (for_el && for_el !== '') {
            this.$label.attr('for', for_el);
        }
        if (!this.$label || this.$label.length === 0) {
            throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
        }
    };
    // Элемент <input class="..." type=".." value="" id=".." name=".." aria-describedby=".." required>
    form_control.prototype.el_input = function (id, type, cl_inp, placeholder, required, min, max, step, maxlength, pattern) {
        this.$input = $('<input></input>', {
            'type': type,
            'id': id,
            'name': id
        });
        if (cl_inp && cl_inp !== '') { this.$input.addClass(cl_inp) };
        if (placeholder && placeholder !== '') { this.$input.attr('placeholder', placeholder) };
        if (required) { this.$input.attr('required', true) };
        if (min !== null) { this.$input.attr('min', min) };
        if (max !== null) { this.$input.attr('max', max) };
        if (step !== null) { this.$input.attr('step', step) };
        if (maxlength !== null) { this.$input.attr('maxlength', maxlength) };
        if (pattern && pattern !== '') { this.$input.attr('pattern', pattern) };
    };
    // Элемент <input class="..." type="text" value="" id=".." name=".." aria-describedby=".." required>
    form_control.prototype.el_input_text = function (id, cl_inp, placeholder, required, maxlength, pattern) {
        this.$input = $('<input></input>', {
            'id': id,
            'name': id,
            'type': 'text'
        });
        if (cl_inp && cl_inp !== '') { this.$input.addClass(cl_inp) };
        if (placeholder && placeholder !== '') { this.$input.attr('placeholder', placeholder) };
        if (required) { this.$input.attr('required', true) };
        if (maxlength !== null) { this.$input.attr('maxlength', maxlength) };
        if (pattern && pattern !== '') { this.$input.attr('pattern', pattern) };
    };

    form_control.prototype.el_input_checkbox = function (id, cl_inp, required) {
        this.$input = $('<input></input>', {
            'id': id,
            'name': id,
            'type': 'checkbox'
        });
        if (cl_inp && cl_inp !== '') { this.$input.addClass(cl_inp) };
        if (required) { this.$input.attr('required', true) };
    };
    // Элемент <select class="..." id=".." name=".." aria-describedby=".." required>
    form_control.prototype.el_select = function (id, cl_sel, placeholder, required) {
        this.$select = $('<select></select>', {
            'id': id,
            'name': id,
        });
        if (cl_sel && cl_sel !== '') { this.$select.addClass(cl_sel) };
        if (placeholder && placeholder !== '') { this.$select.attr('placeholder', placeholder) };
        if (required) { this.$select.attr('required', true) };
    };
    // Элемент <input type=".." class=".." id=".." name="..">
    form_control.prototype.el_input1 = function (prefix, id, type) {
        this.$input = $('<input></input>', {
            'class': 'form-control' + (prefix ? '-' + prefix + ' ' : ' '),
            'type': type,
            'id': id,
            'name': id
        });
    };
    // Элемент <select class="form-control-.. id=".." name=".." required></select>
    form_control.prototype.el_select1 = function (prefix, id, required) {
        this.$select = $('<select></select>', {
            'class': 'form-control' + (prefix ? '-' + prefix + ' ' : ' '),
            'id': id,
            'name': id,
        });
        if (required)
            this.$select.attr('required', true);
    };
    // Элемент 
    //<button type="submit" class="btn btn-sm  btn-primary mb-2" id="view_ways" name="view_ways">
    //    <i class="fas fa-retweet" aria-hidden="true"></i>
    //</button>
    form_control.prototype.el_button = function (prefix, cl_bt, id, title, icon) {

        this.$button = $('<button></button>', {
            'class': 'btn btn' + (prefix ? '-' + prefix + ' ' : ' ') + cl_bt,
            'id': id,
            'name': id,
            'text': title,
        });
        if (icon && icon !== '') {
            var icon = $('<i></i>', {
                'class': icon,
                'aria-hidden': 'true'
            });
            this.$button.append(icon);
        }
    };
    // Элемент 
    //<div class="progress">
    //  <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
    //</div >
    form_control.prototype.el_progress_bar = function (cl_pb, max, duration) {
        var progress = Number(Number(duration > max ? 100.0 : max === 0 ? 0.0 : (duration * 100.0) / max).toFixed(0));
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
        }
        this.$pb = $('<div></div>', {
            'class': 'progress',
        });
        var $pb = $('<div></div>', {
            'class': 'progress-bar ' + progress_collor + ' ' + (cl_pb && cl_pb !== '' ? cl_pb + ' ' : ''),
            'role': 'progressbar',
            'style': 'width:' + progress + '%',
            'aria-valuenow': progress,
            'aria-valuemin': '0',
            'aria-valuemax': '100',
            'text': progress + '%'
        });
        this.$pb.append($pb);
    }
    //<a class="..." id="..." href='...' target="_blank">...</a>
    form_control.prototype.el_a = function (id, cl_a, href, text, target, title) {
        this.$alink = $('<a></a>', {
            'text': text,
        });
        if (cl_a && cl_a !== '') {
            this.$alink.attr('class', cl_a);
        }
        if (href && href !== '') {
            this.$alink.attr('href', href);
        }
        if (id && id !== '') {
            this.$alink.attr('id', id);
        }
        if (target && target !== '') {
            this.$alink.attr('target', target);
        }
        if (title && title !== '') {
            this.$alink.attr('title', title);
        }
    };
    // Элемент <div class="form-row">
    form_control.prototype.el_div_form_row = function () {
        this.$div = $('<div></div>', {
            'class': 'form-row',
        });
    };
    // Элемент <div class="form-group">
    form_control.prototype.el_div_form_group = function () {
        this.$div = $('<div></div>', {
            'class': 'form-group',
        });
    };
    // Элемент <div class="form-check">
    form_control.prototype.el_div_form_check = function () {
        this.$div = $('<div></div>', {
            'class': 'form-check',
        });
    };
    // Элемент <div class="input-group">
    form_control.prototype.el_div_input_group = function () {
        this.$div = $('<div></div>', {
            'class': 'input-group',
        });
    };
    // Элемент <div id="..." class="invalid-feedback"></div >
    form_control.prototype.el_div_invalid_feedback = function () {
        this.$div = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        if (!this.$div || this.$div.length === 0) {
            throw new Error('Не удалось создать элемент <div id="..." class="invalid-feedback"></div >');
        }
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
        var start = new fc.el_input1(prefix, id + '-start', 'datetime');
        start.$input.attr('data-type', 'start');
        this.$start = start.$input;
        //
        var stop = new fc.el_input1(prefix, id + '-stop', 'datetime');
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
        var select = new fc.el_select1(prefix, id, true);
        this.$select = select.$select;
        this.$element = div.$div.append($label).append(this.$select);
    };
    //---------------------------------------------------------------------------------
    // Элемент <form class="">
    form_control.prototype.el_form = function (id, cl_form) {
        this.$form = $('<form></form>', {
            'class': cl_form,
            'id': id
        });
    };
    // Элемент список для формы <form class="form-inline">
    //<div class="form-group">
    //    <label class="col-form-label-.. mr-2" for="">...</label>
    //    <select class="form-control-.." id="" name="" required></select>
    //</div>
    form_control.prototype.el_form_select = function (id, prefix, title) {
        var FC = App.form_control;
        var fc = new FC();

        var div = new fc.el_div_form_group();
        var $label = $('<label></label>', {
            'class': (prefix ? '-' + prefix + ' ' : ' ') + 'mb-1',
            'for': id,
            'text': title
        });
        //
        var select = new fc.el_select1(prefix, id, true);
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
    //--------------------------------------------------------------------
    // Элемент fieldset
    form_control.prototype.el_fieldset = function (cl_fieldset, cl_legend, legend) {
        var $fieldset = $('<fieldset></fieldset>', {
            'class': cl_fieldset,
        });
        if (legend) {
            this.$legend = $('<legend></legend>', {
                'class': cl_legend,
                'text': legend
            });
            $fieldset.append(this.$legend);
        }

        this.$fieldset = $fieldset;
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
    //---------------------------------------------------------------------------
    // Элемент
    //    <div class="modal fade" id="em-dir-way" tabindex="-1" aria-labelledby="ml-dir-way" aria-hidden="true">
    //        <div class="modal-dialog modal-..">
    //            <div class="modal-content">
    //                <div class="modal-header">
    //
    //                </div>
    //                <div class="modal-body">
    //
    //                </div>
    //                <div class="modal-footer">
    //                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //                    <button type="button" class="btn btn-primary">Save changes</button>
    //                </div>
    //            </div>
    //        </div>
    //    </div>
    form_control.prototype.el_modal_form = function (id, prefix, cl_modal, label_ok, label_close) {
        this.$modal = $('<div></div>', {
            'class': 'modal fade',
            'id': id,
            'aria-labelledby': id,
            'tabindex': "-1",
            'aria-hidden': "true"
        });
        var $div_md = $('<div></div>', {
            'class': 'modal-dialog ',
        });
        // Добавим размер формы
        if (prefix && prefix !== '') {
            $div_md.addClass('modal-' + prefix);
        }
        var $div_mc = $('<div></div>', {
            'class': 'modal-content',
        });
        this.$modal_header = $('<div></div>', {
            'class': 'modal-header',
        });
        this.$modal_body = $('<div></div>', {
            'class': 'modal-body',
        });
        this.$modal_footer = $('<div></div>', {
            'class': 'modal-footer',
        });
        //<button type="button" class="btn btn-primary">Save changes</button>
        this.$modal_bt_ok = $('<button></button>', {
            'type': 'button',
            'class': 'btn btn-primary',
            'text': label_ok
        });
        // <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        this.$modal_bt_close = $('<button></button>', {
            'type': 'button',
            'class': 'btn btn-primary',
            'data-dismiss': 'modal',
            'text': label_close
        });
        this.$modal_footer.append(this.$modal_bt_ok).append(this.$modal_bt_close);
        this.$modal.append($div_md.append($div_mc.append(this.$modal_header).append(this.$modal_body).append(this.$modal_footer)));
    };

    App.form_control = form_control;
    //-----------------------------------------------------------------------------
    // Конструктор формы с элементами по вертикали
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
        this.el_destroy = []; // Элементы которые нужно удалить
        // создадим поля
        $.each(this.settings.fields, function (i, el) {
            if (el.type === 'interval_date') {
                var element = new this.fc.el_form_inline_interval_date(el.id, el.prefix);
                if (element && element.$element && element.$element.length > 0) {
                    this.$form.append(element.$element);
                    el['element'] = new this.fc.init_datetime_range(element.$span, el.start, el.stop, el.select);
                    this.el_destroy.push(el['element']); // Этот элемент нужно удалить из HTML формы
                }
            };
            if (el.type === 'select') {
                var element = new this.fc.el_form_inline_select(el.id, el.prefix, el.title);
                if (element && element.$element && element.$element.length > 0) {
                    this.$form.append(element.$element);
                    el['element'] = new this.fc.init_select(element.$select, el.list, -1, null, el.select);
                }
            };
            if (el.type === 'button') {
                //var element = function (prefix, cl_bt, id, title, icon)
                var element = new this.fc.el_button(el.prefix, 'btn-primary ml-2', el.id, el.title, el.icon);
                if (element && element.$button && element.$button.length > 0) {
                    this.$form.append(element.$button);
                    el['element'] = new this.fc.init_button(element.$button, el.select);
                }
            };
        }.bind(this));
    };
    // Получить значения выбоа
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
    // Удаление формы
    form_inline.prototype.destroy = function () {
        $.each(this.el_destroy, function (i, el) {
            el.destroy();
        }.bind(this));
        if (this.$form && this.$form.length > 0) {
            this.$form.remove();
            this.$form = null;
        }
    };

    App.form_inline = form_inline;
    //-----------------------------------------------------------------------------
    // Конструктор формы с элементами по горизонтали
    function form_infield() {
        this.fc = new form_control();
    }
    // Инициализация формы
    form_infield.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            fields: [],
            mb: 2,
            id: '',
            cl_form: '',
            validation: true
        }, options);
        var form_add = new this.fc.el_form(this.settings.id, this.settings.cl_form + ' text-left');
        var form_edit = new this.fc.el_form(this.settings.id, this.settings.cl_form + ' text-left');
        this.$form_add = form_add.$form;
        this.$form_edit = form_edit.$form;

        //---------------------------------------------------------
        // Создаем элементы и отрисовываем их на форме
        // Получим список элементов которые должны отображатся на форме
        this.el_destroy = []; // Элементы которые нужно удалить методом destroy()
        // Отсортируем элементы по row
        var form_elements = this.settings.fields.filter(function (i) {
            return i.row !== null;
        }).sort(function (a, b) {
            return a.row - b.row;
        });
        var row = 0;
        var col = 0;
        var row_add$ = null;
        var row_edit$ = null;
        // Пройдемся по элементам и отрисуем их на форме
        $.each(form_elements, function (i, el_field) {
            if (el_field.row !== row) {
                // Это новая строка, создадим ее
                row = el_field.row; // запомним для следующей проверки
                col = 0;            // начнем счет col с 0;
                // Форма добавить
                var form_row_add$ = new this.fc.el_div_form_row();
                if (form_row_add$ && form_row_add$.$div && form_row_add$.$div.length > 0) {
                    row_add$ = form_row_add$.$div;
                    this.$form_add.append(row_add$); // добавим на форму
                } else {
                    throw new Error('Не удалось создать элемент <div class="form-row">');
                };
                // форма править
                var form_row_edit$ = new this.fc.el_div_form_row();
                if (form_row_edit$ && form_row_edit$.$div && form_row_edit$.$div.length > 0) {
                    row_edit$ = form_row_edit$.$div;
                    this.$form_edit.append(row_edit$); // добавим на форму
                } else {
                    throw new Error('Не удалось создать элемент <div class="form-row">');
                };
            };
            if (el_field.col !== col) {
                // Это новая ячейка сетки, строки
                col = el_field.col; // запомним для следующей проверки
                // Форма добавить
                var $form_col_add = new this.fc.el_col(el_field.col_prefix, el_field.col_size, (this.settings.mb ? 'mb-' + this.settings.mb : ''))
                if ($form_col_add && $form_col_add.$col && $form_col_add.$col.length > 0) {
                    row_add$.append($form_col_add.$col); // добавим на форму
                    this.add_element_form(el_field, 'add', $form_col_add.$col);
                } else {
                    throw new Error('Не удалось создать элемент <div class="col-..-..">');
                };
                // форма править
                var $form_col_edit = new this.fc.el_col(el_field.col_prefix, el_field.col_size, (this.settings.mb ? 'mb-' + this.settings.mb : ''))
                if ($form_col_edit && $form_col_edit.$col && $form_col_edit.$col.length > 0) {
                    row_edit$.append($form_col_edit.$col); // добавим на форму
                    this.add_element_form(el_field, 'edit', $form_col_edit.$col);
                } else {
                    throw new Error('Не удалось создать элемент <div class="col-..-..">');
                };
            }
        }.bind(this));
    };
    // Добавим элемент
    form_infield.prototype.add_element_form = function (el_field, type, col) {

        switch (el_field[type]) {
            case 'select': { this.add_select_element_form(el_field, type, col); break; }
            case 'text': { this.add_text_element_form(el_field, type, col); break; }
            case 'checkbox': { this.add_checkbox_element_form(el_field, type, col); break; }
        }
    };
    // Добавить и иницилизировать элемент SELECT
    form_infield.prototype.add_select_element_form = function (el_field, type, col) {
        // Создадим label
        var $form_label = new this.fc.el_label(el_field.name, null, el_field.label);
        if ($form_label && $form_label.$label && $form_label.$label.length > 0) {
            col.append($form_label.$label);
        } else {
            throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
        };
        // Создадим select
        var cl_sel = 'custom-select' + (el_field.prefix && el_field.prefix !== '' ? ' custom-select-' + el_field.prefix + ' ' : ' ');
        var $form_select = new this.fc.el_select(el_field.name, cl_sel, el_field.placeholder, el_field.required);
        if ($form_select && $form_select.$select && $form_select.$select.length > 0) {
            col.append($form_select.$select); // Добавить элемент на форму
            // Проверить задана проверка валидации формы
            if (this.settings.validation) {
                // добавим контейнер для вывода сообщений
                var $form_div_if = new this.fc.el_div_invalid_feedback();
                if ($form_div_if && $form_div_if.$div && $form_div_if.$div.length > 0) {
                    col.append($form_div_if.$div);
                }
            }
            // Инициализировать элемент
            el_field['element_' + type] = new this.fc.init_select($form_select.$select, el_field.list, -1, null, el_field.select);
        } else {
            throw new Error('Не удалось создать элемент <select class="..." id=".." name=".." aria-describedby=".." required>');
        };
    };
    // Добавить и иницилизировать элемент TEXT
    form_infield.prototype.add_text_element_form = function (el_field, type, col) {
        // Создадим label
        var $form_label = new this.fc.el_label(el_field.name, null, el_field.label);
        if ($form_label && $form_label.$label && $form_label.$label.length > 0) {
            col.append($form_label.$label);
        } else {
            throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
        };
        // Создадим input
        var cl_inp = 'form-control' + (el_field.prefix && el_field.prefix !== '' ? ' form-control-' + el_field.prefix + ' ' : ' ');
        var $form_input = new this.fc.el_input_text(el_field.name, cl_inp, el_field.placeholder, el_field.required, el_field.maxlength, el_field.pattern);
        if ($form_input && $form_input.$input && $form_input.$input.length > 0) {
            col.append($form_input.$input); // Добавить элемент на форму
            // Проверить задана проверка валидации формы
            if (this.settings.validation) {
                // добавим контейнер для вывода сообщений
                var $form_div_if = new this.fc.el_div_invalid_feedback();
                if ($form_div_if && $form_div_if.$div && $form_div_if.$div.length > 0) {
                    col.append($form_div_if.$div);
                }
            }
            // Инициализировать элемент
            el_field['element_' + type] = new this.fc.init_input($form_input.$input, el_field.default, el_field.change);
        } else {
            throw new Error('Не удалось создать элемент <select class="..." id=".." name=".." aria-describedby=".." required>');
        };
    };
    // Добавить и иницилизировать элемент TEXT
    form_infield.prototype.add_checkbox_element_form = function (el_field, type, col) {
        //<div class="form-check">
        //    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        //        <label class="form-check-label" for="invalidCheck">
        //            Agree to terms and conditions
        //                        </label>
        //        <div class="invalid-feedback">
        //            You must agree before submitting.
        //                        </div>
        //                    </div>
        // Создадим form-check
        var div = new this.fc.el_div_form_check();
        if (div && div.$div && div.$div.length > 0) {
            var $div = div.$div;
            col.append($div);
            // Создадим <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
            var cl_inp = 'form-check-input';
            var $form_input = new this.fc.el_input_checkbox(el_field.name, cl_inp, el_field.required);
            if ($form_input && $form_input.$input && $form_input.$input.length > 0) {
                $div.append($form_input.$input); // Добавить элемент на форму
                // Создаем label
                var $form_label = new this.fc.el_label(el_field.name, 'form-check-label', el_field.label);
                if ($form_label && $form_label.$label && $form_label.$label.length > 0) {
                    $div.append($form_label.$label);
                    // Проверить задана проверка валидации формы
                    if (this.settings.validation) {
                        // добавим контейнер для вывода сообщений
                        var $form_div_if = new this.fc.el_div_invalid_feedback();
                        if ($form_div_if && $form_div_if.$div && $form_div_if.$div.length > 0) {
                            $div.append($form_div_if.$div);
                        }
                    }

                } else {
                    throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
                };
                // Инициализировать элемент
                el_field['element_' + type] = new this.fc.init_input($form_input.$input, el_field.default, el_field.change);
            } else {
                throw new Error('Не удалось создать элемент <select class="..." id=".." name=".." aria-describedby=".." required>');
            };
        } else {
            throw new Error('Не удалось создать элемент <div class="form-check">');
        };
    };
    // Обновить списочный компонент
    form_infield.prototype.update_list_element = function (name, list, value) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.name === name
            });
            if (field && field.element) {
                field.element.update(list, value ? value : Number(field.element.val()), null);
            }
        }
    };
    // Установит значение компонента
    form_infield.prototype.set = function (name, value) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.name === name
            });
            if (field && field.element) {
                field.element.val(value);
            }
        }
    };
    // Прочесть значение компонента
    form_infield.prototype.get = function (name) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.name === name
            });
            if (field && field.element) {
                return field.element.val();
            }
        }
        return undefined;
    };
    // Установить или обновить значение компонента
    form_infield.prototype.val = function (name, value) {
        if (value !== undefined) {
            this.set(name, value);
        } else {
            return this.get(name);
        }
    }
    // Получить значения выбоа
    form_infield.prototype.get_value = function () {
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
    // Удаление формы
    form_infield.prototype.destroy = function () {
        $.each(this.el_destroy, function (i, el) {
            el.destroy();
        }.bind(this));
        if (this.$form_add && this.$form_add.length > 0) {
            this.$form_add.remove();
            this.$form_add = null;
        }
        if (this.$form_edit && this.$form_edit.length > 0) {
            this.$form_edit.remove();
            this.$form_edit = null;
        }
    };

    App.form_infield = form_infield;
    //--------------------------------------------------------------------------
    // Класс для создания объектов модальные окна
    // Конструктор формы с элементами по горизонтали
    function modal_form() {
        this.fc = new form_control();
    }
    // Инициализация формы
    modal_form.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            id: 'mf',
            prefix: null,
            cl_modal: null,
            form: null,
            label_ok: 'Ok',
            label_close: 'Close',
            ok_click: function () {

                this.close();
            }.bind(this),
            close_click: function () {

                this.close();
            }.bind(this),
        }, options);
        var modal = new this.fc.el_modal_form(
            this.settings.id,
            this.settings.prefix,
            this.settings.cl_modal,
            this.settings.label_ok,
            this.settings.label_close);
        if (modal && modal.$modal && modal.$modal.length > 0) {
            // Привяжим события кнопок
            modal.$modal_bt_ok.on('click', this.settings.ok_click);
            modal.$modal_bt_close.on('click', this.settings.close_click);
            if (this.settings.form) {
                this.form_add = this.settings.form.$form_add;
                this.form_edit = this.settings.form.$form_edit;
                modal.$modal_body.append(this.form_add).append(this.form_edit);
            }
            // Привяжим html модальной формы
            this.$modal = modal.$modal;
            $('body').append(modal.$modal);
            // создадим объект модальная форма
            this.modal = this.$modal.modal({
                keyboard: false,
                show: false
            }).on('show.bs.modal', function (event) {
                // do something...
            });

        } else {
            throw new Error('Не удалось создать модальную форму ' + this.settings.id);
        }
    };
    // открыть
    modal_form.prototype.open = function () {
        this.modal.modal('show');
    };
    // закрыть
    modal_form.prototype.close = function () {
        this.modal.modal('hide');
    };
    // Удалить форму
    modal_form.prototype.destroy = function () {
        // Если есть внутри форма FORM, тогда выполнить очистку формы
        if (this.settings.form) {
            this.settings.form.destroy();
        }

        // Удалим модальную форму
        if (this.modal) {
            this.modal.modal('dispose');
        }
        // Очистить html от формы
        if (this.$modal) {
            this.$modal.remove();
        }
    };

    App.modal_form = modal_form;

    window.App = App;

})(window);