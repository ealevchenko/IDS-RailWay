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
            'title_label_date': 'PERIOD:',
            'title_select': 'Select ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //================================================================================
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
            element.append($default_option);
            //if (default_value === -1) {
            //    element.append($default_option);
            //}
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
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function () {
            this.$element.val(-1);
            this.$element.prop("disabled", true);
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
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function () {
            this.$element.val('');
            this.$element.prop("disabled", true);
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
                //return moment.utc(datetime, 'DD.MM.YYYY' + (time ? ' hh:mm' : '')).toISOString();
                // Преобразуем в формат без указания зоны, сместим utc и формат 'YYYY-MM-DDTHH:mm:ss'
                return moment.utc(datetime, 'DD.MM.YYYY' + (time ? ' hh:mm' : '')).format('YYYY-MM-DDTHH:mm:ss');
            } else {
                return null;
            }
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function () {
            this.set(null);
            this.$element.prop("disabled", true);
        };
        this.destroy = function () {
            this.$element.data('dateRangePicker').destroy();
        };
        this.init();

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
        this.destroy = function () {
            this.$element.data('dateRangePicker').destroy();
        };
        this.init();

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
            check: null,
        }, options);

        this.init = function () {
            this.alist = get_alist(this.settings.data);
            /*            this.$element = element.catcomplete({*/
            this.$element = element.autocomplete({
                minLength: this.settings.minLength,
                source: this.alist,
                change: function (event, ui) {
                    if (typeof this.settings.check === 'function') {
                        this.settings.check(element.val());
                    }
                }.bind(this),
                select: function (event, ui) {
                    //if (ui.item.value)
                }.bind(this),
                search: function (event, ui) {
                    if (typeof this.settings.check === 'function') {
                        this.settings.check(element.val());
                    }
                }.bind(this),
                focus: function (event, ui) {
                    if (ui.item.value)
                        if (typeof this.settings.check === 'function') {
                            this.settings.check(ui.item.value);
                        }
                }.bind(this)
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
        this.show = function () {
            this.$element.autocomplete("enable");
            this.$element.show();
        };
        this.hide = function () {
            this.$element.autocomplete("disable");
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.autocomplete("enable");
            this.$element.prop("disabled", false);
        };
        this.disable = function () {
            this.$element.autocomplete("disable");
            this.$element.val('');
            this.$element.prop("disabled", true);
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
            'class': 'col-' + prefix + '-' + col,
        });
        if (cl_col && cl_col !== '') {
            this.$col.addClass(cl_col);
        }
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
    // Элемент <textarea class="..." id="..." name="..." ></textarea>
    form_control.prototype.el_textarea = function (id, cl_tar, placeholder, required, maxlength, pattern) {
        this.$textarea = $('<textarea></textarea>', {
            'id': id,
            'name': id,
        });
        if (cl_tar && cl_tar !== '') { this.$textarea.addClass(cl_tar) };
        if (placeholder && placeholder !== '') { this.$textarea.attr('placeholder', placeholder) };
        if (required) { this.$textarea.attr('required', true) };
        if (maxlength !== null) { this.$textarea.attr('maxlength', maxlength) };
        if (pattern && pattern !== '') { this.$textarea.attr('pattern', pattern) };
    };
    // Элемент <input type="..." min="..." max="..." class="..." id="..." placeholder="...">
    form_control.prototype.el_input_number = function (id, cl_inp, placeholder, required, min, max, step) {
        this.$input = $('<input></input>', {
            'id': id,
            'name': id,
            'type': 'number'
        });
        if (cl_inp && cl_inp !== '') { this.$input.addClass(cl_inp) };
        if (placeholder && placeholder !== '') { this.$input.attr('placeholder', placeholder) };
        if (required) { this.$input.attr('required', true) };
        if (min !== null) { this.$input.attr('min', min) };
        if (max !== null) { this.$input.attr('max', max) };
        if (step !== null) { this.$input.attr('step', step) };
    };
    // Элемент <input class="..." type="checkbox" value="" id=".." name=".." required>
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
    //<div class="custom-control custom-switch">
    //    <input type="checkbox" class="custom-control-input" id="outer_cars">
    //    <label class="custom-control-label" for="outer_cars">Внешние стороние вагоны</label>
    // </div>
    form_control.prototype.el_switch = function (id, label) {
        this.$switch = $('<div></div>', {
            'class': 'custom-control custom-switch',
        });
        this.$input = $('<input></input>', {
            'id': id,
            'name': id,
            'class': 'custom-control-input',
            'type': 'checkbox',
        });
        var $label = $('<label></label>', {
            'for': id,
            'class': 'custom-control-label',
            'text': label,
        });
        this.$switch.append(this.$input).append($label);
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
        });
        if (icon && icon !== '') {
            var icon = $('<i></i>', {
                'class': icon,
                'aria-hidden': 'true'
            });
            this.$button.append(icon).append(' ');

        };
        if (title && title !== '') {
            this.$button.append(title);
        };
    };
    form_control.prototype.el_button_submit = function (prefix, cl_bt, id, title, icon) {

        this.$button = $('<button></button>', {
            'class': 'btn btn' + (prefix ? '-' + prefix + ' ' : ' ') + cl_bt,
            'id': id,
            'type': 'submit'
        });
        if (icon && icon !== '') {
            var icon = $('<i></i>', {
                'class': icon,
                'aria-hidden': 'true'
            });
            this.$button.append(icon).append(' ');

        };
        if (title && title !== '') {
            this.$button.append(title);
        };
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
    // Элемент 
    //<div class="alert alert-primary" role="alert">
    //    This is a primary alert—check it out!
    //</div>
    form_control.prototype.el_alert = function (id) {
        this.$alert = $('<div></div>', {
            'class': 'alert',
            'role': 'alert',
        });
        if (id && id !== '') {
            this.$alert.attr('id', id);
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
    form_control.prototype.el_div_input_group = function (id, cl_form) {
        this.$div = $('<div></div>', {
            'class': 'input-group',
        });
        if (id && id !== '') {
            this.$div.attr('id', id);
        }
        if (cl_form && cl_form !== '') {
            this.$div.addClass(cl_form);
        }
    };
    // Элемент <div class="input-group-prepend">
    form_control.prototype.el_div_input_group_prepend = function (id, cl_form) {
        this.$div = $('<div></div>', {
            'class': 'input-group-prepend',
        });
        if (id && id !== '') {
            this.$div.attr('id', id);
        }
        if (cl_form && cl_form !== '') {
            this.$div.addClass(cl_form);
        }
    };
    // Элемент <div class="input-group-append">
    form_control.prototype.el_div_input_group_append = function (id, cl_form) {
        this.$div = $('<div></div>', {
            'class': 'input-group-append',
        });
        if (id && id !== '') {
            this.$div.attr('id', id);
        }
        if (cl_form && cl_form !== '') {
            this.$div.addClass(cl_form);
        }
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
    // Выпадающий спсиок
    //<div class="dropdown mr-3">
    //  <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown">
    //      Отчетная документация
    //  </button>
    //<div class="dropdown-menu">
    //  <a class="dropdown-item" href="#" id="report_fst">Натурная ведомость поезда</a>
    //  <a class="dropdown-item" href="#" id="report_fsci">Натурная ведомость коммерческого осмотра</a>
    //  <a class="dropdown-item" href="#">Отчет с данными о перевеске</a>
    //  <a class="dropdown-item" href="#">Отчет о приеме груза</a>
    //  <a class="dropdown-item" href="#">Заявка на выдачу с проверкой груза КР Главный</a>
    //  <a class="dropdown-item" href="#">Заявка на выдачу с проверкой груза КР</a>
    //  <a class="dropdown-item" href="#">Заявка на взвешивание</a>
    //</div>
    //</div >
    form_control.prototype.el_div_dropdown = function (id, cls, prefix, bt_cls, title_button) {
        var $div = $('<div></div>', {
            'class': 'dropdown' + (cls && cls !== null ? ' ' + cls : ''),
        });
        var $button = $('<button></button>', {
            'class': 'btn btn' + (prefix ? '-' + prefix + ' ' : ' ') + ' dropdown-toggle' + (bt_cls && bt_cls !== null ? ' ' + bt_cls : ''),
            'type': 'button',
            'data-toggle': 'dropdown',
        });
        this.$div_menu = $('<div></div>', {
            'class': 'dropdown-menu',
        });
        // Надпись
        if (title_button && title_button !== '') {
            $button.append(title_button);
        };
        this.$element = $div.append($button).append(this.$div_menu);
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
    form_control.prototype.el_form_inline_interval_date = function (id, prefix, label) {
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
            'text': label !== null ? label : langView('title_label_date', App.Langs)
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
    form_control.prototype.el_form = function (id, cl_form, valid_html5) {
        this.$form = $('<form></form>', {
            'id': id
        });
        if (cl_form && cl_form !== '') {
            this.$form.addClass(cl_form);
        };
        if (!valid_html5) {
            this.$form.attr('novalidate', '');
        }
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
    //<div class="form-group col-xl-3 text-left">
    //    <label for="num_car" class="mb-1">@IDSRWTResource.title_num_car:</label>
    //    <div class="input-group">
    //        <input type="text" class="form-control inp-auto" id="num_car" title="Номер вагона" name="num_car" data-mode="" data-edit="" data-form="transceiver">
    //            <div class="input-group-append">
    //                <button type="button" class="btn btn-warning btn" id="car_return" title="Вернуть вагон" data-mode="edit" data-edit="" data-form="transceiver">
    //                    <i class="fa fa-retweet" aria-hidden="true"></i>
    //                </button>
    //            </div>
    //    </div>
    //</div>
    form_control.prototype.el_form_input = function (options) {
        this.settings = $.extend({
            fg_cl: null,
            id: null,
            lb_cl: null,
            lb_text: null,
            inp_type: null,
            inp_cl: null,
            inp_title: null,
            placeholder: null,
            required: null,
            min: null,
            max: null,
            step: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        }, options);
        var FC = App.form_control;
        var fc = new FC();
        var div = new fc.el_div_form_group();
        if (this.settings.fg_cl && this.settings.fg_cl !== '') {
            div.$div.addClass(this.settings.fg_cl);
        }
        var $label = $('<label></label>', {
            'for': this.settings.id,
            'text': this.settings.lb_text
        });
        if (this.settings.lb_cl && this.settings.lb_cl == '') {
            $label.addClass(this.settings.cl_lb);
        };
        var div_ig = new fc.el_div_input_group(null, null);
        var div_iga = new fc.el_div_input_group_append(null, null);
        var div_ifb = new fc.el_div_invalid_feedback();

        var input = new fc.el_input(this.settings.id, this.settings.inp_type, this.settings.inp_cl, this.settings.placeholder, this.settings.required, this.settings.min, this.settings.max, this.settings.step, this.settings.maxlength, this.settings.pattern);
        this.$input = input.$input.attr('title', this.settings.inp_title);
        div_ig.$div.append(this.$input);
        if (this.settings.el_iga && this.settings.el_iga !== '') {
            div_iga.$div.append(this.settings.el_iga);
            div_ig.$div.append(div_iga.$div);
        }
        div_ig.$div.append(div_ifb.$div);
        this.$element = div.$div.append($label).append(div_ig.$div);
    };
    //
    form_control.prototype.el_form_textarea = function (options) {
        this.settings = $.extend({
            fg_cl: null,
            id: null,
            lb_cl: null,
            lb_text: null,
            txar_cl: null,
            txar_title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            el_iga: null
        }, options);
        var FC = App.form_control;
        var fc = new FC();
        var div = new fc.el_div_form_group();
        if (this.settings.fg_cl && this.settings.fg_cl !== '') {
            div.$div.addClass(this.settings.fg_cl);
        }
        var $label = $('<label></label>', {
            'for': this.settings.id,
            'text': this.settings.lb_text
        });
        if (this.settings.lb_cl && this.settings.lb_cl == '') {
            $label.addClass(this.settings.cl_lb);
        };
        var div_ig = new fc.el_div_input_group(null, null);
        var div_iga = new fc.el_div_input_group_append(null, null);
        var div_ifb = new fc.el_div_invalid_feedback();

        var textarea = new fc.el_textarea(this.settings.id, this.settings.txar_cl, this.settings.placeholder, this.settings.required, this.settings.maxlength, this.settings.pattern);
        this.$textarea = textarea.$textarea.attr('title', this.settings.txar_title);
        div_ig.$div.append(this.$textarea);
        if (this.settings.el_iga && this.settings.el_iga !== '') {
            div_iga.$div.append(this.settings.el_iga);
            div_ig.$div.append(div_iga.$div);
        }
        div_ig.$div.append(div_ifb.$div);
        this.$element = div.$div.append($label).append(div_ig.$div);
    };
    //<div class="col-xl-3 text-left">
    //    <div class="form-check">
    //        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
    //        <label class="form-check-label" for="invalidCheck">Пример</label>
    //        <div class="invalid-feedback"></div>
    //    </div>
    //</div>
    form_control.prototype.el_form_checkbox = function (options) {
        this.settings = $.extend({
            div_cl: null,
            id: null,
            lb_cl: null,
            lb_text: null,
            inp_cl: null,
            inp_title: null,
            required: null,
        }, options);
        var FC = App.form_control;
        var fc = new FC();
        var div = new fc.el_div(null, this.settings.div_cl);
        var div_fc = new fc.el_div_form_check();
        div_fc.$div.addClass('text-left');
        var $label = $('<label></label>', {
            'for': this.settings.id,
            'class': 'form-check-label',
            'text': this.settings.lb_text
        });
        if (this.settings.lb_cl && this.settings.lb_cl == '') {
            $label.addClass(this.settings.cl_lb);
        };
        var div_ifb = new fc.el_div_invalid_feedback();

        var input = new fc.el_input(this.settings.id, 'checkbox', 'form-check-input', null, this.settings.required, null, null, null, null, null);
        if (this.settings.inp_cl && this.settings.inp_cl == '') {
            input.$input.addClass(this.settings.inp_cl);
        };
        this.$input = input.$input.attr('title', this.settings.inp_title);

        div_fc.$div.append(this.$input).append($label).append(div_ifb.$div);
        this.$element = div.$div.append(div_fc.$div);
    };

    //<div class="invalid-feedback">
    //    Please choose a username.
    //</div>
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
            'style': 'width:100%;'
        });
        if (cl_table && cl_table !== '') {
            $table.addClass(cl_table);
        }
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
            'class': 'modal-content border-primary',
        });
        this.$modal_header = $('<div></div>', {
            'class': 'modal-header bg-primary text-white',
        });
        //<h5 class="modal-title">Modal title</h5>
        this.$title = $('<h5></h5>', {
            'class': 'modal-title text-uppercase font-weight-bold ',
        });
        // Кнопка X
        //<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //    <span aria-hidden="true">&times;</span>
        //</button>
        var $bt_close = $('<button></button>', {
            'type': 'button',
            'class': 'close',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
        });
        var $span_close = $('<span aria-hidden="true">&times;</span>');
        this.$modal_header.append(this.$title).append($bt_close.append($span_close));
        this.$modal_body = $('<div></div>', {
            'class': 'modal-body',
        });
        this.$modal_footer = $('<div></div>', {
            'class': 'modal-footer bg-light',
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

    //================================================================================
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
                var element = new this.fc.el_form_inline_interval_date(el.id, el.prefix, el.title);
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

    //================================================================================
    // Конструктор формы с элементами по горизонтали
    function form_infield() {
        this.fc = new form_control();
    }
    //-----------------------------------------------------------------------------
    // Создание элементов
    // Добавим элемент 
    form_infield.prototype.add_element_form = function (el_field, type, col) {

        switch (el_field[type]) {
            case 'select': { this.add_select_element_form(el_field, type, col); break; }
            case 'text': { this.add_text_element_form(el_field, type, col); break; }
            case 'number': { this.add_number_element_form(el_field, type, col); break; }
            case 'checkbox': { this.add_checkbox_element_form(el_field, type, col); break; }
            case 'autocomplete': { this.add_autocomplete_element_form(el_field, type, col); break; }
            case 'datetime': { this.add_datetime_element_form(el_field, type, col); break; }
            case 'switch': { this.add_switch_element_form(el_field, type, col); break; }
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
    // Добавить и иницилизировать элемент INPUT-TEXT
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
            //this.el_validation.add($($form_input.$input));
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
    // Добавить и иницилизировать элемент INPUT-number
    form_infield.prototype.add_number_element_form = function (el_field, type, col) {
        // Создадим label
        var $form_label = new this.fc.el_label(el_field.name, null, el_field.label);
        if ($form_label && $form_label.$label && $form_label.$label.length > 0) {
            col.append($form_label.$label);
        } else {
            throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
        };
        // Создадим input
        var cl_inp = 'form-control' + (el_field.prefix && el_field.prefix !== '' ? ' form-control-' + el_field.prefix + ' ' : ' ');
        var $form_input = new this.fc.el_input_number(el_field.name, cl_inp, el_field.placeholder, el_field.required, el_field.min, el_field.max, el_field.step);
        if ($form_input && $form_input.$input && $form_input.$input.length > 0) {
            col.append($form_input.$input); // Добавить элемент на форму
            $form_input.$input.inputSpinner();
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
    // Добавить и иницилизировать элемент INPUT-checkbox
    form_infield.prototype.add_checkbox_element_form = function (el_field, type, col) {
        //<div class="form-check">
        //  <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        //  <label class="form-check-label" for="invalidCheck">...</label>
        //  <div class="invalid-feedback"></div>
        //</div>
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
                el_field['element_' + type] = new this.fc.init_checkbox($form_input.$input, el_field.default, el_field.change);
            } else {
                throw new Error('Не удалось создать элемент <select class="..." id=".." name=".." aria-describedby=".." required>');
            };
        } else {
            throw new Error('Не удалось создать элемент <div class="form-check">');
        };
    };
    // Добавить и иницилизировать элемент INPUT-autocomplete
    form_infield.prototype.add_autocomplete_element_form = function (el_field, type, col) {
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
            //this.el_validation.add($($form_input.$input));
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
            var obj_element = new this.fc.init_autocomplete($form_input.$input, {
                data: el_field.list,
                minLength: 1,
                out_value: false,
                val_inp: 'value',
            });
            el_field['element_' + type] = obj_element;
            this.el_destroy.push(obj_element);

        } else {
            throw new Error('Не удалось создать элемент <select class="..." id=".." name=".." aria-describedby=".." required>');
        };
    };
    // Добавить и иницилизировать элемент INPUT-datetime
    form_infield.prototype.add_datetime_element_form = function (el_field, type, col) {
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
            //this.el_validation.add($($form_input.$input));
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
            var obj_element = new this.fc.init_datetime_input($form_input.$input, null, el_field.close, true);
            el_field['element_' + type] = obj_element;
            this.el_destroy.push(obj_element);
        } else {
            throw new Error('Не удалось создать элемент <input class="..." type="checkbox" value="" id=".." name=".." required>');
        };
    };
    // Добавить и иницилизировать элемент INPUT-switch
    form_infield.prototype.add_switch_element_form = function (el_field, type, col) {
        //<div class="form-group">
        //  <div class="custom-control custom-switch">
        //      <input type="checkbox" class="custom-control-input" id="outer_cars">
        //      <label class="custom-control-label" for="outer_cars">Внешние стороние вагоны</label>
        //  </div>
        //</div>
        // Создадим <div class="custom-control custom-switch"></div>
        var $div_switch = $('<div></div>', {
            'class': 'custom-control custom-switch',
        });
        //col.append($div_switch);
        if ($div_switch && $div_switch.length > 0) {
            col.append($div_switch); // Добавить элемент на форму

            var cl_inp = 'custom-control-input';
            var $form_input = new this.fc.el_input_checkbox(el_field.name, cl_inp, el_field.required);
            if ($form_input && $form_input.$input && $form_input.$input.length > 0) {
                $div_switch.append($form_input.$input); // Добавить элемент на форму
                // Создаем label
                var $form_label = new this.fc.el_label(el_field.name, 'custom-control-label', el_field.label);
                if ($form_label && $form_label.$label && $form_label.$label.length > 0) {
                    $div_switch.append($form_label.$label);
                    // Проверить задана проверка валидации формы
                    if (this.settings.validation) {
                        // добавим контейнер для вывода сообщений
                        var $form_div_if = new this.fc.el_div_invalid_feedback();
                        if ($form_div_if && $form_div_if.$div && $form_div_if.$div.length > 0) {
                            $div_switch.append($form_div_if.$div);
                        }
                    }
                } else {
                    throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
                };
                // Инициализировать элемент
                el_field['element_' + type] = new this.fc.init_checkbox($form_input.$input, el_field.default, el_field.change);
            } else {
                throw new Error('Не удалось создать элемент <input class="..." type="checkbox" value="" id=".." name=".." required>');
            };
        }
        else {
            throw new Error('Не удалось создать элемент <div class="custom-control custom-switch"></div>');
        };
    };
    //-----------------------------------------------------------------------------
    // Инициализация формы
    form_infield.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            alert: null,
            mode: null,
            fields: [],
            mb: 2,
            id: '',
            cl_form: '',
            validation: true,
            fn_validation_ok: null,
            button_add_ok: null,
        }, options);
        var form_add = new this.fc.el_form(this.settings.id, this.settings.cl_form + ' text-left');
        var form_edit = new this.fc.el_form(this.settings.id, this.settings.cl_form + ' text-left');

        // Установим режим form по умолчанию ('add' & 'edit')
        this.mode = this.settings.mode !== null && this.settings.mode !== '' ? this.settings.mode : null;
        //var button_ok_edit = new this.fc.el_button('sm', 'btn-primary', null, 'Выполнить ', 'far fa-check-circle');

        // Добавить кнопку выполнить
        if (this.settings.button_add_ok) {
            var button_ok_add = new this.fc.el_button('sm', 'btn-primary', null, this.settings.button_add_ok.title, 'far fa-check-circle');
            button_ok_add.$button.on('click', function (e) {
                if (typeof this.settings.button_add_ok.click === 'function') {
                    this.settings.button_add_ok.click(e);
                };
            }.bind(this));
            form_add.$form.append(button_ok_add.$button);
        }

        this.$form_add = form_add.$form;
        this.$form_edit = form_edit.$form;
        // Алерт 
        if (!this.settings.alert) {
            var $alert = new this.fc.el_alert();
            if ($alert && $alert.$alert && $alert.$alert.length > 0) {
                var $alert_add = $alert.$alert;
                this.$form_add.append($alert_add);
                this.alert_add = new alert_form($alert_add);
                //TODO: решить вопрос привязки this.alert_add к общей валидации
            }
            var $alert = new this.fc.el_alert();
            if ($alert && $alert.$alert && $alert.$alert.length > 0) {
                var $alert_edit = $alert.$alert;
                this.$form_edit.append($alert_edit);
                this.alert_edit = new alert_form($alert_edit);
                //TODO: решить вопрос привязки this.alert_edit к общей валидации
            }


        };
        // Привяжем событие submit
        this.$form_add.on('submit', function (event) {
            this.submit(event);
        }.bind(this));
        // Привяжем событие submit
        this.$form_edit.on('submit', function (event) {
            this.submit(event);
        }.bind(this));
        //---------------------------------------------------------
        // Создаем элементы и отрисовываем их на форме
        // Получим список элементов которые должны отображатся на форме
        this.el_destroy = []; // Элементы которые нужно удалить методом destroy()
        this.data = null;
        /*        this.el_validation = $([]); // Элементы для валидации*/
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
        // Пройдемся по зависимостям
        $.each(form_elements.filter(function (i) { return i.control !== null }), function (i, el_control) {
            if (el_control.control) {
                var n_control = el_control.control;
                var element_control = form_elements.find(function (o) {
                    return o.name === n_control;
                });
                if (element_control) {
                    if (element_control.element_add && el_control.element_add) {
                        el_control.element_add['element_control'] = element_control.element_add;
                    }
                    if (element_control.element_edit && el_control.element_edit) {
                        el_control.element_edit['element_control'] = element_control.element_edit;
                    }
                } else {
                    throw new Error('Неопределен контролируемый элемент : ' + n_control);
                }
            }
        }.bind(this));
        // Валидация
        if (this.settings.validation) {
            this.validation = new validation_form();
            var elements_add = this.$form_add.find('input, select, textarea');
            var elements_edit = this.$form_edit.find('input, select, textarea');
            var elements = [];
            elements = $.merge(elements_add, elements_edit);
            this.validation.init({
                alert: this.settings.alert, //TODO: решить вопрос привязки this.alert_add или this.alert_edit к общей валидации
                elements: elements,
            });
        };
    };
    // Показать форму добавить
    form_infield.prototype.view_add = function () {
        this.$form_add.show();
        this.$form_edit.hide();
        this.mode = 'add';
        this.view(null);
    };
    // Показать форму править
    form_infield.prototype.view_edit = function (data) {
        this.$form_add.hide();
        this.$form_edit.show();
        this.mode = 'edit';
        this.view(data);
    };
    // Показать форму править
    form_infield.prototype.view = function (data) {
        this.data = data; // Запомним объект до ридактирования
        this.validation.clear_all();
        $.each(this.settings.fields, function (i, el_field) {
            if (el_field['element_' + this.mode]) {
                var form_element = el_field['element_' + this.mode];
                var field = el_field.field;
                var value = data ? data[field] : el_field.default;
                var type = el_field.type;
                form_element.val(value);
                // Проверим наличие элемента который должен быть изменен если изменить текущий элемент
                if (form_element.element_control) {
                    // Обновим текщий элемент, для запуска цепочки обновлений
                    form_element.$element.change();
                }
            }
        }.bind(this));

        this.form_elements = this.settings.fields.filter(function (i) {
            return i['element_' + this.mode];
        }.bind(this));

    };
    // Выполнить обработку события отправка формы
    form_infield.prototype.submit = function (event) {
        this.validation.clear_all();
        event.preventDefault();
        this.valid = true;
        var result = {};
        $.each(this.settings.fields, function (i, el_field) {
            if (el_field['element_' + this.mode]) {
                var form_element = el_field['element_' + this.mode];
                if (form_element) {
                    var element = form_element.$element;
                    if (element && element.length > 0) {
                        var valid_element = true;
                        var $element = element[0];
                        var valid = $element.validity;

                        var tagName = $element.tagName; // Получим тим элемента для детальной проверки
                        var required = $element.required;
                        var value = element.val();
                        var placeholder = element.attr('placeholder');
                        var id = element.attr('id');
                        // Проверим элемент активный
                        if (!$element.disabled) {
                            // Да активный выполнить проверку
                            if (tagName === "SELECT") {
                                if (value !== null && Number(value) === -1 && required) {
                                    this.valid = false;
                                    valid_element = false;
                                    this.validation.set_object_error($($element), "Элемент [" + (placeholder && placeholder !== "" ? placeholder : id) + "] - не выбран.");
                                }
                            }
                            // Установилась ошибка
                            if (!valid.valid) {
                                this.valid = false;
                                valid_element = false;
                                if (valid.valueMissing) {
                                    this.validation.set_object_error($($element), "Элемент [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не заполнен.");
                                }
                                if (valid.patternMismatch) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не соответствует шаблону.");
                                }
                                if (valid.patternMismatch) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не соответствует шаблону.");
                                }
                                if (valid.rangeOverflow) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - больше максимально допустимого (" + $element.max + ").");
                                }
                                if (valid.rangeUnderflow) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - меньше минимально допустимого (" + $element.min + ").");
                                }
                                if (valid.tooLong) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - значение превышает лимит (" + $element.maxlength + ").");
                                }
                                if (valid.tooShort) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не достигает минимума (" + $element.minlength + ").");
                                }
                                if (valid.typeMismatch) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не соответствует требуемому синтаксису (" + $element.type + ").");
                                }
                            } else {
                                if (valid_element) this.validation.set_control_ok($($element), "");
                            }
                        }
                    };
                };
            };
        }.bind(this));
        if (!this.valid) {
            event.stopPropagation();
        } else {
            // Заполним result полями
            $.each(this.settings.fields, function (i, el) {
                var element_form = this.data ? (el.element_edit ? el.element_edit : null) : (el.element_add ? el.element_add : null);
                var type = this.data ? el.edit : el.add;
                /*                    var value = element ? ($(element).attr('type') === "checkbox" ? $(element).prop('checked') : element.val()) : null;*/
                switch (type) {
                    case null: {
                        result[el.field] = this.data ? this.data[el.field] : el.default;
                        break;
                    };
                    case "select": {
                        var value = element_form.val();
                        result[el.field] = value !== null && value !== "-1" ? Number(value) : null;
                        break;
                    };
                    case "text": {
                        result[el.field] = element_form.val();
                        break;
                    };
                    case "textarea": {
                        result[el.field] = element_form.val();
                        break;
                    };
                    case "number": {
                        var value = element_form.val();
                        result[el.field] = value !== null && value !== "" ? Number(value) : null;
                        break;
                    };
                    case "checkbox": {
                        var value = element_form.val();
                        result[el.field] = value !== null && value !== "" ? Boolean(value) : null;
                        break;
                    };
                    case "datetime": {
                        var value = element_form.val();
                        result[el.field] = value;
                        break;
                    };
                    case "autocomplete": {
                        result[el.field] = element_form.val();
                        break;
                    };
                }
            }.bind(this));
        }
        if (typeof this.settings.fn_validation === 'function') {
            this.settings.fn_validation({ valid: Boolean(this.valid), old: this.data, new: result });
        }
    };
    //-----------------------------------------------------------------------------
    // Обновить списочный компонент
    form_infield.prototype.update_list_element = function (name, list, value) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field && field['element_' + this.mode]) {
                field['element_' + this.mode].update(list, value ? value : Number(field['element_' + this.mode].val()), null);
                // Проверим наличие элемента который должен быть изменен если изменить текущий элемент
                if (field['element_' + this.mode].element_control) {
                    // Обновим текщий элемент, для запуска цепочки обновлений
                    field['element_' + this.mode].$element.change();
                }
            }
        }
    };
    // Установит значение компонента
    form_infield.prototype.set = function (name, value) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field && field['element_' + this.mode]) {
                field['element_' + this.mode].val(value);
            }
        }
    };
    // Прочесть значение компонента
    form_infield.prototype.get = function (name) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field && field['element_' + this.mode]) {
                return field['element_' + this.mode].val();
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
    // Прочесть значение компонента
    form_infield.prototype.get_element = function (name) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field && field['element_' + this.mode] && field['element_' + this.mode].$element) {
                return field['element_' + this.mode].$element.val();
            }
        }
        return undefined;
    };
    // Показать спрятать элемент
    form_infield.prototype.enable = function (name, value) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field && field['element_' + this.mode]) {
                if (value) {
                    field['element_' + this.mode].enable();
                } else {
                    field['element_' + this.mode].disable();
                }
            }
        }
    };
    //
    form_infield.prototype.disabled = function (name, value) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field && field['element_' + this.mode]) {
                field['element_' + this.mode].$element.prop("disabled", value);
            }
        }
    };
    //-----------------------------------------------------------------------------
    // Очистить все сообщения и ошибки на форме
    form_infield.prototype.clear_all = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
        if (this.validation) {
            this.validation.clear_all();
        }

    }
    // Вывести на форме сообщение об ошибке под элементом (указав тип формы)
    form_infield.prototype.set_object_error_mode = function (name, mode, message) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field) {
                var el = field['element_' + mode].$element;
                if (this.validation) this.validation.set_object_error($(el), message);
            }
        }
    };
    // Вывести на форме сообщение об ошибке под элементом (определение формы автоматически this.mode)
    form_infield.prototype.set_object_error = function (name, message) {
        if (this.settings.fields) {
            var field = this.settings.fields.find(function (o) {
                return o.field === name
            });
            if (field) {
                var el = field['element_' + this.mode].$element;
                if (this.validation) this.validation.set_object_error($(el), message);
            }
        }
    };
    // Очистить сообщения
    form_infield.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    form_infield.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    form_infield.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    form_infield.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //-----------------------------------------------------------------------------
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

    //================================================================================
    // Класс для создания объектов 
    //--------------------------------Конструктор и инициализация---------------
    // создать класс
    function form_element() {

    };

    var add_class = function (element, tag) {
        if (element && tag && tag !== '') {
            element.addClass(tag);
        }
    }

    var add_id = function (element, tag) {
        if (element && tag && tag !== '') {
            element.attr('id', tag);
        }
    }

    var add_title = function (element, tag) {
        if (element && tag && tag !== '') {
            element.attr('title', tag);
        }
    }

    var add_value = function (element, value) {
        if (element && value && value !== '') {
            element.attr('value', value);
        }
    }
    var add_val = function (element, value) {
        if (element && value && value !== '') {
            element.val(value);
        }
    }
    var append_label = function (element, label) {
        if (element && label && label !== '') {
            element.append(label);
        }
    }

    var add_click = function (element, fn) {
        if (element && typeof fn === 'function') {
            element.on('click', fn);
        }
    }

    form_element.prototype.div = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.$div = $('<div></div>');
        if (!this.$div || this.$div.length === 0) {
            throw new Error('Не удалось создать элемент <div></div>');
        } else {
            add_class(this.$div, this.settings.class);
            add_id(this.$div, this.settings.id);
        }
    };
    // Элемент <div class="row">
    form_element.prototype.bs_row = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'row' });
        this.$row = div.$div;
        add_class(this.$row, this.settings.class);
        add_id(this.$row, this.settings.id);
    };
    // Элемент <div class="col-..-..">
    form_element.prototype.bs_col = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div();
        this.$col = div.$div;
        add_class(this.$col, this.settings.class);
        add_id(this.$col, this.settings.id);
    };
    // Элемент <button>...</button>
    form_element.prototype.bs_button = function (options) {
        this.settings = $.extend({
            color: null,
            size: null,
            class: null,
            id: null,
            label: null,
            title: null,
            icon: null,
            click: null,
        }, options);

        this.$button = $('<button></button>', {
            'class': 'btn',
        });
        if (!this.$button || this.$button.length === 0) {
            throw new Error('Не удалось создать элемент <button></button>');
        } else {
            if (this.settings.color && this.settings.color != null) {
                this.$button.addClass('btn-' + this.settings.color);
            };
            if (this.settings.size && this.settings.size != null) {
                this.$button.addClass('btn-' + this.settings.size);
            };
            add_class(this.$button, this.settings.class);
            add_id(this.$button, this.settings.id);
            if (this.settings.icon && this.settings.icon !== '') {
                var icon = $('<i></i>', {
                    'class': this.settings.icon,
                    'aria-hidden': 'true'
                });
                this.$button.append(icon).append(' ');
            };
            append_label(this.$button, this.settings.label);
            add_title(this.$button, this.settings.title);
            add_click(this.$button, this.settings.click);
        }
    };

    App.form_element = form_element;
    //================================================================================
    // Конструктор формы диалог, большие формы
    function form_dialog() {
        this.fc = new form_control();
        this.fe = new form_element();
    }
    //-----------------------------------------------------------------------------
    // Инициализация формы
    form_dialog.prototype.init = function (options) {
        this.init = true;
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            alert: null,
            objs: [],
            mb: 2,
            id: '',
            cl_form: null,
            validation: true,
            fn_validation_ok: null,
            fn_init: null,
        }, options);
        var form = new this.fc.el_form(this.settings.id, this.settings.cl_form + ' text-left');

        this.$form = form.$form;

        // Алерт 
        if (!this.settings.alert) {
            var $alert = new this.fc.el_alert();
            if ($alert && $alert.$alert && $alert.$alert.length > 0) {
                var $alert = $alert.$alert;
                this.$form.append($alert);
                this.alert = new alert_form($alert);
            }
        };
        // Привяжем событие submit
        this.$form.on('submit', function (event) {
            this.submit(event);
        }.bind(this));
        //---------------------------------------------------------
        // Создаем элементы и отрисовываем их на форме
        // Получим список элементов которые должны отображатся на форме
        this.el_destroy = []; // Элементы которые нужно удалить методом destroy()
        this.data = null;
        /*        this.el_validation = $([]); // Элементы для валидации*/
        // Пройдемся по элементам
        this.add_obj(this.$form, this.settings.objs, function (form) {
            // Инициализация закончена
            if (typeof this.settings.fn_init === 'function') {
                this.settings.fn_init(this.init);
            }
        }.bind(this));

    };

    form_dialog.prototype.add_obj = function (content, objs, callback) {
        // Добавить элемент
        var add_element = function (element, content, obj) {
            if (element && element.length > 0) {
                if (obj.childs && obj.childs.length > 0) {
                    this.add_obj(element, obj.childs, function (content) {
                        return content;
                    }.bind(this));
                }
                content.append(element);
            };
            return element;
        }.bind(this);
        // Пройдемся по элементам
        $.each(objs, function (i, obj) {
            if (obj && obj.obj) {
                if (obj.obj === 'row') {
                    var element = new this.fe.bs_row(obj.options);
                    add_element(element.$row, content, obj);
                };
                if (obj.obj === 'col') {
                    var element = new this.fe.bs_col(obj.options);
                    add_element(element.$col, content, obj);
                };
                if (obj.obj === 'bs_button') {
                    var element = new this.fe.bs_button(obj.options);
                    add_element(element.$button, content, obj);
                };
            }
        }.bind(this));
        if (typeof callback === 'function') {
            callback(content);
        };
    };
    // Удаление формы
    form_dialog.prototype.destroy = function () {

    };

    App.form_dialog = form_dialog;

    //================================================================================
    // Класс для создания объектов модальные окна
    // Конструктор формы с элементами по горизонтали
    function modal_form() {
        this.fc = new form_control();
    }
    // Инициализация формы
    modal_form.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            alert: null,
            id: 'mf',
            title: 'Править операторов',
            prefix: null,
            cl_modal: null,
            //form: null,
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
            // Алерт 
            if (!this.settings.alert) {
                var $alert = new this.fc.el_alert();
                if ($alert && $alert.$alert && $alert.$alert.length > 0) {
                    modal.$modal_body.append($alert.$alert);
                    this.alert = new alert_form($alert.$alert);
                }
            } else {
                this.alert = this.settings.alert;
            };

            // Привяжим события кнопок
            modal.$modal_bt_ok.on('click', this.settings.ok_click);
            modal.$modal_bt_close.on('click', this.settings.close_click);
            //if (this.settings.form) {
            //    this.form_add = this.settings.form.$form_add;
            //    this.form_edit = this.settings.form.$form_edit;
            //    modal.$modal_body.append(this.form_add).append(this.form_edit);
            //}
            // Привяжим html модальной формы
            this.$modal = modal.$modal;
            this.$body = modal.$modal_body;
            this.$title = modal.$title; // Надпись на форме
            this.$title.text(this.settings.title);
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
    // открыть окно
    modal_form.prototype.open = function (title) {
        this.$title.text(title ? title : this.settings.title);
        this.modal.modal('show');
    };
    // закрыть
    modal_form.prototype.close = function () {
        this.modal.modal('hide');
    };
    // Удалить форму
    modal_form.prototype.destroy = function () {
        // Если есть внутри форма FORM, тогда выполнить очистку формы
        //if (this.settings.form) {
        //    this.settings.form.destroy();
        //}

        // Удалим модальную форму
        if (this.modal) {
            this.modal.modal('dispose');
        }
        // Очистить html от формы
        if (this.$modal) {
            this.$modal.remove();
        }
    };
    // Очистить сообщения
    modal_form.prototype.out_clear = function () {
        if (this.alert) {
            this.alert.clear_message()
        }
    }
    // Вывести на форме сообщение об ошибке 
    modal_form.prototype.out_error = function (message) {
        if (this.alert) {
            this.alert.out_error_message(message)
        }
    };
    // Вывести на форме предупреждения
    modal_form.prototype.out_warning = function (message) {
        if (this.alert) {
            this.alert.out_warning_message(message)
        }
    }
    // Вывести на форме сообщение о выполнении действий
    modal_form.prototype.out_info = function (message) {
        if (this.alert) {
            this.alert.out_info_message(message)
        }
    }
    App.modal_form = modal_form;
    //================================================================================
    // Класс валидации элементов формы
    function validation_form() {

    }

    validation_form.prototype.init = function (options) {
        this.settings = $.extend({
            alert: null,
            elements: null,
        }, options);
        this.type_message = 0; // 0- ок 1-warning 2-error
        this.$alert = null;
        if (this.settings.alert && this.settings.alert.$alert) {
            this.$alert = this.settings.alert.$alert;
        }
    };

    validation_form.prototype.clear_all = function () {
        this.clear_message();
        this.clear_error();
    };
    // Очистить все ошибки
    validation_form.prototype.clear_error = function (obj) {
        if (obj) {
            obj.removeClass('is-valid is-invalid');
        } else {
            this.settings.elements.removeClass('is-valid is-invalid');
        }
    };
    // Очистить сообщения
    validation_form.prototype.clear_message = function () {
        if (this.$alert) {
            this.$alert.hide().text('').removeClass('alert-success alert-warning alert-danger');
            this.type_message = 0;
        }
    };
    // Вывести сообщение об ошибке
    validation_form.prototype.out_error_message = function (message) {
        if (this.$alert) {
            if (this.type_message <= 1) {
                this.$alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
                this.type_message = 2;
            }
            if (message) {
                this.$alert.append(message).append($('<br />'));
            }
        }
    };
    // Вывести сообщение внимание
    validation_form.prototype.out_warning_message = function (message) {
        if (this.$alert) {
            if (this.type_message <= 0) {
                this.$alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
                this.type_message = 1;
            }
            if (message) {
                this.$alert.append(message).append($('<br />'));
            }
        }
    };
    // Вывести информационное сообщение
    validation_form.prototype.out_info_message = function (message) {
        if (this.$alert) {
            if (this.type_message === 0) {
                this.$alert.show().removeClass('alert-warning alert-danger').addClass('alert-success');
            }
            if (message) {
                this.$alert.text(message).append($('<br />'));
            }
        }
    };
    // Установить признак ошибка
    //validation_form.prototype.set_control_error = function (o, message) {
    //    o.removeClass('is-valid').addClass('is-invalid');
    //    if (message) {
    //        o.next(".invalid-feedback").text(message);
    //    } else { o.next(".invalid-feedback").text('') };
    //};
    validation_form.prototype.set_control_error = function (o, message) {
        o.removeClass('is-valid').addClass('is-invalid');
        if (message) {
            o.nextAll(".invalid-feedback").text(message);
        } else { o.nextAll(".invalid-feedback").text('') };
    };
    // Установить признак Ok
    validation_form.prototype.set_control_ok = function (o, message) {
        o.removeClass('is-invalid').addClass('is-valid');
        if (message) {
            o.nextAll(".valid-feedback").text(message);
        } else { o.nextAll(".invalid-feedback").text('') };
    };
    // Установить признак ошибка
    validation_form.prototype.set_object_error = function (o, mes_error) {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    };
    // Установить признак ок
    validation_form.prototype.set_object_ok = function (o, mes_ok) {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    };

    App.validation_form = validation_form;

    //================================================================================
    // Класс вывода сообщений (Алерт)
    var alert_form = function ($alert) {
        if (!$alert) {
            throw new Error('Не указан элемент $alert');
        }
        if ($alert.length === 0) {
            throw new Error('Элемент $alert - неопределен');
        }
        this.$alert = $alert;
        //this.selector = this.$alert.attr('id');
        this.clear_message();
    };
    // Очистить сообщения
    alert_form.prototype.clear_message = function () {
        this.$alert.hide().text('').removeClass('alert-success alert-warning alert-danger');
    };
    // Вывести сообщение об ошибке
    alert_form.prototype.out_error_message = function (message) {
        this.$alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
        if (message) {
            this.$alert.append(message).append($('<br />'));
        }
    };
    // Вывести сообщение об ошибке
    alert_form.prototype.out_warning_message = function (message) {
        this.$alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
        if (message) {
            this.$alert.append(message).append($('<br />'));
        }
    };
    // Вывести информационное сообщение
    alert_form.prototype.out_info_message = function (message) {
        this.$alert.show().removeClass('alert-danger alert-warning').addClass('alert-success');
        if (message) {
            this.$alert.append(message).append($('<br />'));
        }
    };

    App.alert_form = alert_form;

    window.App = App;

})(window);