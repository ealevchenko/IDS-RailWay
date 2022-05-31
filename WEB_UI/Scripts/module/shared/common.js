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
        this.disable = function (clear) {
            if (clear) this.$element.val(-1);
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
        this.disable = function (clear) {
            if (clear) this.$element.val('');
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
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function (clear) {
            if (clear) this.$element.val('');
            this.$element.prop("disabled", true);
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
                var ms = moment(datetime).format('DD.MM.YYYY' + (time ? ' HH:mm' : ''));
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
        this.disable = function (clear) {
            if (clear) this.set(null);
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
        // вернуть value
        this.val = function (value) {
            if (value !== undefined) {
                var text_out = value;
                if (this.settings.val_inp === 'value') {
                    var select = this.settings.data.find(function (o) {
                        if (value === null) {
                            return o.value === value;
                        } else {
                            return o.value == $.trim(value);
                        };
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
        // вернуть техт
        this.text = function (text) {
            if (text !== undefined) {
                this.$element.val(text);
            } else {
                return this.$element.val();
            };
        };
        //this.set = function (value) {
        //    if (value !== undefined && value !== null) {
        //        this.$element.val(value);
        //    } else {
        //        this.$element.val('');
        //    }
        //};
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
        this.disable = function (clear) {
            this.$element.autocomplete("disable");
            if (clear) this.$element.val('');
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
            case 'textarea': { this.add_textarea_element_form(el_field, type, col); break; }
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
    // Добавить и иницилизировать элемент TEXTAREA
    form_infield.prototype.add_textarea_element_form = function (el_field, type, col) {
        // Создадим label
        var $form_label = new this.fc.el_label(el_field.name, null, el_field.label);
        if ($form_label && $form_label.$label && $form_label.$label.length > 0) {
            col.append($form_label.$label);
        } else {
            throw new Error('Не удалось создать элемент <label class=".." for="...">...</label>');
        };
        // Создадим input
        var cl_inp = 'form-control' + (el_field.prefix && el_field.prefix !== '' ? ' form-control-' + el_field.prefix + ' ' : ' ');
        var $form_textarea = new this.fc.el_textarea(el_field.name, cl_inp, el_field.placeholder, el_field.required, el_field.maxlength, el_field.pattern);
        if ($form_textarea && $form_textarea.$textarea && $form_textarea.$textarea.length > 0) {
            col.append($form_textarea.$textarea); // Добавить элемент на форму
            // Проверить задана проверка валидации формы
            if (this.settings.validation) {
                // добавим контейнер для вывода сообщений
                var $form_div_if = new this.fc.el_div_invalid_feedback();
                if ($form_div_if && $form_div_if.$div && $form_div_if.$div.length > 0) {
                    col.append($form_div_if.$div);
                }
            }
            // Инициализировать элемент
            el_field['element_' + type] = new this.fc.init_textarea($form_textarea.$textarea, el_field.default, el_field.change);

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
        this.init = true;
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            alert: null,
            mode: null,
            fields: [],
            mb: 2,
            id: '',
            cl_form: '',
            validation: true,
            fn_init: null,
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
        // Завершение инициализации
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.init);
        }
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
                                //if (valid.patternMismatch) {
                                //    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не соответствует шаблону.");
                                //}
                                if (valid.rangeOverflow) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - больше максимально допустимого (" + $element.max + ").");
                                }
                                if (valid.rangeUnderflow) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - меньше минимально допустимого (" + $element.min + ").");
                                }
                                if (valid.tooLong) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - значение превышает лимит (" + $element.maxLength + ").");
                                }
                                if (valid.tooShort) {
                                    this.validation.set_object_error($($element), "Значение элемента [" + ($element.placeholder !== "" ? $element.placeholder : $element.id) + "] - не достигает минимума (" + $element.minLength + ").");
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

    var add_tag = function (element, tag_name, tag_value) {
        if (element && tag_name && tag_name !== '' && tag_value !== null) {
            element.attr(tag_name, tag_value);
        }
    }

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

    var add_for = function (element, tag) {
        if (element && tag && tag !== '') {
            element.attr('for', tag);
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
    };

    var add_click = function (element, fn) {
        if (element && typeof fn === 'function') {
            element.on('click', fn);
        }
    };
    //---------------- ИНИЦИАЛИЗАЦИЯ ЭЛЕМЕНТОВ ----------------------
    // Инициализация поля дата "INPUT" типа SELECT
    form_element.prototype.init_select = function (element, options) {
        //TODO: создать и настроить SELECT сделать надпись выберите через placeholder, чтобы работала required
        this.$element = element;
        var $default_option = $('<option></option>', {
            'value': '-1',
            'text': langView('title_select', App.Langs),
        });
        this.settings = $.extend({
            data: [],
            default_value: null,
            fn_change: null,
            check: null,
        }, options);
        this.init = function () {
            this.update(this.settings.data, this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", function (event) {
                    //this.settings.fn_change.bind(this);
                    if (typeof this.settings.fn_change) {
                        this.settings.fn_change(event);
                    }
                    if (typeof this.settings.check === 'function') {
                        this.settings.check(element.val());
                    };
                }.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                var disabled = this.$element.prop("disabled");
                if (disabled) {
                    this.$element.prop("disabled", false);
                }
                this.$element.val(value);
                if (disabled) {
                    this.$element.prop("disabled", true);
                }
            } else {
                return this.$element.val();
            };
        };
        this.getNumber = function () {
            return this.$element.val() === null ? null : Number(this.$element.val());
        };
        this.getNumberNull = function () {
            return this.$element.val() === null || Number(this.$element.val()) === -1 ? null : Number(this.$element.val());
        };
        this.text = function (text) {
            if (text !== undefined) {
                this.$element.text(text);
            } else {
                return this.$element.text();
            };
        };
        this.update = function (data, default_value) {
            this.$element.empty();
            element.append($default_option);
            //if (default_value === -1) {
            //    element.append($default_option);
            //}
            if (data) {
                $.each(data, function (i, el) {
                    // Преобразовать формат
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
        this.disable = function (clear) {
            if (clear) this.$element.val(-1);
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация текстового поля "INPUT"
    form_element.prototype.init_input = function (element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
        }, options);
        this.type = element.attr('type');
        this.$element = element;
        this.init = function () {
            this.update(this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", this.settings.fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
                //this.$element.change();
            } else {
                if (this.type === 'number') {
                    return this.$element.val() !== '' ? Number(this.$element.val()) : null;
                }
                if (this.type === 'text') {
                    return this.$element.val() !== '' ? $.trim(String(this.$element.val())) : null;
                }
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
        this.disable = function (clear) {
            if (clear) this.$element.val('');
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация флажка "CHECKBOX"
    form_element.prototype.init_checkbox = function (element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
        }, options);
        this.$element = element;
        this.init = function () {
            this.update(this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", this.settings.fn_change.bind(this));
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
            this.val(default_value);
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
        this.disable = function (clear) {
            if (clear) this.$element.val('');
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация поля дата и время "INPUT"
    form_element.prototype.init_datetime_input = function (element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_close: null,
            time: true,
        }, options);
        this.$element = element;
        this.init = function () {
            this.update(this.settings.default_value);
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
                    format: App.Lang === 'ru' ? 'DD.MM.YYYY' + (this.settings.time ? ' HH:mm' : '') : 'DD\MM\YYYY' + (this.settings.time ? ' HH:mm' : ''),
                    autoClose: false,
                    singleDate: true,
                    singleMonth: true,
                    showShortcuts: false,
                    time: {
                        enabled: this.settings.time
                    },
                }).
                bind('datepicker-change', function (evt, obj) {
                    this.select_date = obj.date1;
                }.bind(this)).bind('datepicker-closed', function () {
                    // Преобразовать формат
                    if (typeof this.settings.fn_close === 'function') {
                        this.settings.fn_close(this.get());
                    }
                }.bind(this));
            this.set(default_datetime);
        };
        this.set = function (datetime) {
            var disabled = this.$element.prop("disabled");
            if (disabled) {
                this.$element.prop("disabled", false);
            }
            if (datetime !== null) {
                //var ms = moment(datetime).format('DD.MM.YYYY' + (this.settings.time ? ' HH:mm' : ''));
                this.$element.data('dateRangePicker').setDateRange(moment(datetime).format('DD.MM.YYYY' + (this.settings.time ? ' HH:mm' : '')), moment(datetime).format('DD.MM.YYYY' + (this.settings.time ? ' HH:mm' : '')), true);
            } else {
                // Установить текущую дату и время
                this.$element.data('dateRangePicker').setDateRange(moment().format('DD.MM.YYYY' + (this.settings.time ? ' HH:mm' : '')), moment().format('DD.MM.YYYY' + (this.settings.time ? ' HH:mm' : '')), true);
                this.$element.data('dateRangePicker').clear();
            }
            if (disabled) {
                this.$element.prop("disabled", true);
            }
        };
        this.get = function () {
            var datetime = this.$element.val();
            if (datetime !== null && datetime !== "") {
                return moment.utc(datetime, 'DD.MM.YYYY' + (this.settings.time ? ' hh:mm' : '')).format('YYYY-MM-DDTHH:mm:ss');
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
        this.disable = function (clear) {
            if (clear) this.set(null);
            this.$element.prop("disabled", true);
        };
        this.destroy = function () {
            this.$element.data('dateRangePicker').destroy();
        };
        this.init();

    };
    // Инициализация поля дата "TEXTAREA"
    form_element.prototype.init_textarea = function (element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
        }, options);
        this.$element = element;
        this.init = function () {
            this.update(this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", this.settings.fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
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
    form_element.prototype.init_autocomplete = function (element, options) {
        var get_alist = function (data) {
            var alist = [];
            $.each(data, function (i, el) {
                if (this.settings.out_value) {
                    alist.push({ value: el.text !== null ? $.trim(el.text) : el.text, label: el.value + '-' + el.text !== null ? $.trim(el.text) : el.text, disabled: el.disabled ? el.disabled : null });
                } else {
                    alist.push({ value: el.text !== null ? $.trim(el.text) : el.text, label: el.text !== null ? $.trim(el.text) : el.text, disabled: el.disabled ? el.disabled : null });
                }

            }.bind(this));
            return alist;
        }.bind(this);
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
        // вернуть value
        this.val = function (value) {
            if (value !== undefined) {
                var text_out = value;
                if (this.settings.val_inp === 'value') {
                    var select = this.settings.data.find(function (o) {
                        if (value === null) {
                            return o.value === value;
                        } else {
                            return o.value == $.trim(value);
                        };
                    }.bind(this));
                    text_out = select ? select.text : null;
                }
                this.$element.val(text_out !== null ? $.trim(text_out): text_out);
            } else {
                var select = this.settings.data.find(function (o) {
                    return o.text === $.trim(this.$element.val());
                }.bind(this));
                return select ? select.value : undefined;
            };
        };
        // вернуть техт
        this.text = function (text) {
            if (text !== undefined) {
                this.$element.val(text);
            } else {
                return this.$element.val();
            };
        };
        //this.set = function (value) {
        //    if (value !== undefined && value !== null) {
        //        this.$element.val(value);
        //    } else {
        //        this.$element.val('');
        //    }
        //};
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
        this.disable = function (clear) {
            this.$element.autocomplete("disable");
            if (clear) this.$element.val('');
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    //---------------- HTML ----------------------------
    // Элемент <div></div>
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
    //Элемент <a class="..." id="..." href='...' target="_blank">...</a>
    form_element.prototype.a = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            href: null,
            text: null,
            target: null,
            title: null,
        }, options);
        this.$alink = $('<a></a>');
        if (!this.$alink || this.$alink.length === 0) {
            throw new Error('Не удалось создать элемент <a></a>');
        } else {
            add_id(this.$alink, this.settings.id);
            add_class(this.$alink, this.settings.class);
            add_title(this.$alink, this.settings.title);
            append_label(this.$alink, this.settings.text);
            add_tag(this.$alink, 'target', this.settings.target);
            add_tag(this.$alink, 'href', this.settings.href);
        }
    };
    // Элемент <fieldset">
    //            <legend></legend>
    //            ...
    //         </fieldset>
    form_element.prototype.fieldset = function (options) {
        this.settings = $.extend({
            class: null,
            legend: null,
            class_legend: null,
        }, options);
        this.$fieldset = $('<fieldset></fieldset>');
        if (!this.$fieldset || this.$fieldset.length === 0) {
            throw new Error('Не удалось создать элемент <fieldset></fieldset>');
        } else {
            add_class(this.$fieldset, this.settings.class);
            if (this.settings.legend && this.settings.legend !== '') {
                this.$legend = $('<legend></legend>');
                this.$legend.append(this.settings.legend);
                if (this.settings.class_legend && this.settings.class_legend !== '') {
                    add_class(this.$legend, this.settings.class_legend);
                }
                this.$fieldset.append(this.$legend);
            }
        }
    };
    // Элемент <label for="..." class="..">..</label>
    form_element.prototype.label = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
            for: null,
            label: null
        }, options);
        this.$label = $('<label></label>');
        if (!this.$label || this.$label.length === 0) {
            throw new Error('Не удалось создать элемент <div></div>');
        } else {
            add_class(this.$label, this.settings.class);
            add_id(this.$label, this.settings.id);
            append_label(this.$label, this.settings.label);
            add_for(this.$label, this.settings.for);
        }
    };
    // Элемент <input type=".." class=".." id="num_car" title=".." name="..".>
    form_element.prototype.input = function (options) {
        this.settings = $.extend({
            id: null,
            type: 'text',
            class: null,
            title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            readonly: false,
            min: null,
            max: null,
            step: null,
        }, options);
        this.$input = $('<input></input>', {
            'type': this.settings.type
        });

        if (!this.$input || this.$input.length === 0) {
            throw new Error('Не удалось создать элемент <input></input>');
        } else {
            add_class(this.$input, this.settings.class);
            add_id(this.$input, this.settings.id);
            add_tag(this.$input, 'name', this.settings.id);
            add_tag(this.$input, 'title', this.settings.title);
            add_tag(this.$input, 'placeholder', this.settings.placeholder);
            add_tag(this.$input, 'required', this.settings.required);
            add_tag(this.$input, 'maxlength', this.settings.maxlength);
            add_tag(this.$input, 'pattern', this.settings.pattern);
            add_tag(this.$input, 'min', this.settings.min);
            add_tag(this.$input, 'max', this.settings.max);
            add_tag(this.$input, 'step', this.settings.step);
            this.$input.prop('readonly', this.settings.readonly);
        }
    };
    // Элемент <textarea rows=".." class=".." id=".." title=".." name="..".></textarea>
    form_element.prototype.textarea = function (options) {
        this.settings = $.extend({
            id: null,
            rows: null,
            cols: null,
            class: null,
            title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            readonly: false,
        }, options);
        this.$textarea = $('<textarea></textarea>', {
            'type': this.settings.type
        });

        if (!this.$textarea || this.$textarea.length === 0) {
            throw new Error('Не удалось создать элемент <textarea></textarea>');
        } else {
            add_class(this.$textarea, this.settings.class);
            add_id(this.$textarea, this.settings.id);
            add_tag(this.$textarea, 'name', this.settings.id);
            add_tag(this.$textarea, 'rows', this.settings.rows);
            add_tag(this.$textarea, 'cols', this.settings.cols);
            add_tag(this.$textarea, 'title', this.settings.title);
            add_tag(this.$textarea, 'placeholder', this.settings.placeholder);
            add_tag(this.$textarea, 'required', this.settings.required);
            add_tag(this.$textarea, 'maxlength', this.settings.maxlength);
            this.$textarea.prop('readonly', this.settings.readonly);
        }
    };
    // Элемент <select type=".." class=".." id="num_car" title=".." name="..".></select>
    form_element.prototype.select = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            title: null,
            placeholder: null,
            required: null,
            size: null,
            multiple: null,
            readonly: false,
        }, options);
        this.$select = $('<select></select>', {
            'type': this.settings.type
        });
        if (!this.$select || this.$select.length === 0) {
            throw new Error('Не удалось создать элемент <select></select>');
        } else {
            add_class(this.$select, this.settings.class);
            add_id(this.$select, this.settings.id);
            add_tag(this.$select, 'name', this.settings.id);
            add_tag(this.$select, 'title', this.settings.title);
            add_tag(this.$select, 'placeholder', this.settings.placeholder);
            add_tag(this.$select, 'required', this.settings.required);
            add_tag(this.$select, 'size', this.settings.size);
            add_tag(this.$select, 'multiple', this.settings.size);
            this.$select.prop('readonly', this.settings.readonly);
        }
    };
    // Элемент <table class=".." id=".." title=".." name="..".></table>
    form_element.prototype.table = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            title: null,
        }, options);
        this.$table = $('<table></table>');

        if (!this.$table || this.$table.length === 0) {
            throw new Error('Не удалось создать элемент <table></table>');
        } else {
            add_class(this.$table, this.settings.class);
            add_id(this.$table, this.settings.id);
            add_tag(this.$table, 'title', this.settings.title);
        }
    };
    //--------------- bootstrap ------------------------
    // Элемент <div class="row"></div>
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
    // Элемент <div class="col-..-.."></div>
    form_element.prototype.bs_col = function (options) {
        this.settings = $.extend({
            id: null,
            size: null,
            col: null,
            class: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div();
        this.$col = div.$div;
        var cl = 'col';
        if (this.settings.size && this.settings.size !== '') {
            cl += '-' + this.settings.size;
        }
        if (this.settings.col && this.settings.col !== '') {
            cl += '-' + this.settings.col;
        }
        add_class(this.$col, cl);
        add_class(this.$col, this.settings.class);
        add_id(this.$col, this.settings.id);
    };
    // Элемент <div class="form-row"></div>
    form_element.prototype.bs_form_row = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'form-row' });
        this.$row = div.$div;
        add_class(this.$row, this.settings.class);
        add_id(this.$row, this.settings.id);
    };
    // Элемент <div class="form-check"></div>
    form_element.prototype.bs_form_check = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'form-check' });
        this.$div = div.$div;
        add_class(this.$row, this.settings.class);
        add_id(this.$row, this.settings.id);
    };
    // Элемент <div class="input-group"></div>
    form_element.prototype.bs_input_group = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'input-group' });
        this.$div = div.$div;
        add_class(this.$div, this.settings.class);
        add_id(this.$div, this.settings.id);
    };
    // Элемент <div class="input-group-prepend"></div>
    form_element.prototype.bs_input_group_prepend = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
            objs: null,
            obj_form: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'input-group-prepend' });
        this.$div = div.$div;
        add_class(this.$div, this.settings.class);
        add_id(this.$div, this.settings.id);
        this.fe.add_obj(this.$div, this.settings.objs, this.settings.obj_form, function (content) {

        }.bind(this))
    };
    // Элемент <div class="input-group-append"></div>
    form_element.prototype.bs_input_group_append = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
            objs: null,
            obj_form: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'input-group-append' });
        this.$div = div.$div;
        add_class(this.$div, this.settings.class);
        add_id(this.$div, this.settings.id);
        this.fe.add_obj(this.$div, this.settings.objs, this.settings.obj_form, function (content) {

        }.bind(this))
    };
    // Элемент <div class="invalid-feedback"></div>
    form_element.prototype.bs_invalid_feedback = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'invalid-feedback' });
        this.$div = div.$div;
        add_class(this.$div, this.settings.class);
        add_id(this.$div, this.settings.id);
    };
    // Элемент <div class="alert"></div>
    form_element.prototype.bs_alert = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.fe = new form_element();
        var div = new this.fe.div({ class: 'alert' });
        this.$alert = div.$div;
        add_class(this.$alert, this.settings.class);
        add_id(this.$alert, this.settings.id);
        this.alert = new alert_form(this.$alert);
    };
    // Элемент <span class="badge badge-light">...</span>
    form_element.prototype.bs_badge = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
        }, options);
        this.$badge = $('<span></span>', { class: 'badge' });
        add_class(this.$badge, this.settings.class);
        add_id(this.$badge, this.settings.id);
    };
    // Элемент card
    //<div class="card border-success mb-3">
    //    <div class="card-header bg-transparent border-success">Header</div>
    //    <div class="card-body text-success"></div>
    //    <div class="card-footer bg-transparent border-success">Footer</div>
    //</div>
    form_element.prototype.bs_card = function (options) {
        this.settings = $.extend({
            id: null,
            class_card: null,
            header: true,
            class_header: null,
            class_body: null,
            title_header: null,
            footer: false,
            class_footer: null,
        }, options);

        this.fe = new form_element();
        var div_card = new this.fe.div({ class: 'card' });
        this.$card = div_card.$div;
        add_id(this.$card, this.settings.id);
        add_class(this.$card, this.settings.class_card);

        if (this.settings.header) {
            var div_header = new this.fe.div({ class: 'card-header' });
            this.$header = div_header.$div;
            add_class(this.$header, this.settings.class_header);
            append_label(this.$header, this.settings.title_header);
            this.$card.append(this.$header);
        }

        var div_body = new this.fe.div({ class: 'card-body' });
        this.$body = div_body.$div;
        add_class(this.$body, this.settings.class_body);
        this.$card.append(this.$body);

        if (this.settings.footer) {
            var div_footer = new this.fe.div({ class: 'card-footer' });
            this.$footer = div_footer.$div;
            add_class(this.$footer, this.settings.class_footer);
            this.$card.append(this.$footer);
        }
    };
    // Элемент accordion
    form_element.prototype.bs_accordion = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            multiselectable: true,
        }, options);
        this.fe = new form_element();
        var div_accordion = new this.fe.div({ class: 'accordion' });
        this.$accordion = div_accordion.$div;
        add_id(this.$accordion, this.settings.id);
        add_class(this.$accordion, this.settings.class);
        add_tag(this.$accordion, 'role', 'tablist');
        add_tag(this.$accordion, 'aria-multiselectable', this.settings.multiselectable);
    };
    // Элемент card accordion
    //<div class="card border-primary">
    //    <div class="card-header text-left" role="tab" id="headingOne">
    //        <div class="mb-0">
    //            <a data-toggle="collapse" title="..." data-parent="#accordion" href="#epd-cars" aria-expanded="false" aria-controls="epd-cars" class="collapsed">
    //                <i class="fa fa-file-text-o fa-lg" aria-hidden="true"></i>
    //                @*<h3>ЭПД</h3>*@
    //                <p>@IDSRWTResource.title_vagon_doc<span class="badge badge-primary text-white ml-2" id="count-docs"></span></p>
    //            </a>
    //            <i class="fa fa-angle-right" aria-hidden="true"></i>
    //        </div>
    //    </div>
    //    <div id="epd-cars" class="collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="">
    //        <div class="card-block">
    //            <table class="table table-striped table-sm " id="table-sender-doc" style="width:100%; font-size:0.8rem;"></table>
    //        </div>
    //    </div>
    //</div>
    form_element.prototype.bs_accordion_card_1 = function (options) {
        this.settings = $.extend({
            id: null,
            accordion_id: null,
            card_class: null,
            header_id: null,
            header_class: null,
            header_title: null,
            header_icon: null,
            header_text: null,
            header_badge: false,
            header_badge_id: null,
            header_badge_class: null,
            collapse_id: null,
            body_id: null,
            body_class: null,
            body_objs: null,
            body_obj_form: null,
        }, options);

        this.fe = new form_element();
        var div_card = new this.fe.div({ class: 'card' });
        this.$card = div_card.$div;
        add_id(this.$card, this.settings.id);
        add_class(this.$card, this.settings.card_class);
        // заголовок
        var div_header = new this.fe.div({ class: 'card-header' });
        this.$header = div_header.$div;
        add_id(this.$header, this.settings.header_id);
        add_class(this.$header, this.settings.header_class);
        add_tag(this.$header, 'role', 'tab');
        var div_header_1 = new this.fe.div({ class: 'mb-0' });
        var div_header_a = new this.fe.a({
            id: null,
            class: 'collapsed',
            href: '#' + this.settings.collapse_id,
            text: null,
            target: null,
            title: this.settings.header_title,
        });
        add_tag(div_header_a.$alink, 'data-toggle', 'collapse');
        add_tag(div_header_a.$alink, 'data-parent', '#' + this.settings.accordion_id);
        add_tag(div_header_a.$alink, 'aria-expanded', 'false');
        add_tag(div_header_a.$alink, 'aria-controls', this.settings.collapse_id);
        var $icon = $('<i></i>', {
            'class': this.settings.header_icon,
            'aria-hidden': 'true'
        });
        var $icon_collapse = $('<i></i>', {
            'class': 'fa fa-angle-right',
            'aria-hidden': 'true'
        });
        var $p = $('<p></p>');
        $p.append(this.settings.header_text);
        if (this.settings.header_badge) {
            var div_header_badge = new this.fe.bs_badge({
                class: this.settings.header_badge_class,
                id: this.settings.header_badge_id,
            });
            $p.append(div_header_badge.$badge);
        }
        this.$header.append(div_header_1.$div.append(div_header_a.$alink.append($icon).append($p)).append($icon_collapse));

        var div_collapse = new this.fe.div({ class: 'collapse' });

        add_id(div_collapse.$div, this.settings.collapse_id);
        add_tag(div_collapse.$div, 'role', 'tabpanel');
        add_tag(div_collapse.$div, 'aria-labelledby', this.settings.header_id);
        add_tag(div_collapse.$div, 'aria-expanded', 'false');
        var div_body = new this.fe.div({ class: 'card-block' });
        this.$body = div_body.$div;
        add_id(this.$body, this.settings.body_id);
        add_class(this.$body, this.settings.body_class);
        //
        this.$card.append(this.$header);
        this.$card.append(div_collapse.$div.append(this.$body));
        // 
        if (this.settings.body_objs && this.settings.body_objs !== null) {
            this.fe.add_obj(this.$body, this.settings.body_objs, this.settings.body_obj_form, function (content) {

            }.bind(this))
        };

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
            icon_left: null,
            icon_right: null,
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
            if (this.settings.icon_left && this.settings.icon_left !== '') {
                var icon = $('<i></i>', {
                    'class': this.settings.icon_left,
                    'aria-hidden': 'true'
                });
                this.$button.append(icon).append(' ');
            };
            append_label(this.$button, this.settings.label);
            if (this.settings.icon_right && this.settings.icon_right !== '') {
                var icon = $('<i></i>', {
                    'class': this.settings.icon_right,
                    'aria-hidden': 'true'
                });
                this.$button.append(' ').append(icon);
            };

            add_title(this.$button, this.settings.title);
            add_click(this.$button, this.settings.click);
        }
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
    form_element.prototype.bs_input_number = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            input_size: null,
            input_class: null,
            input_title: null,
            input_placeholder: null,
            input_required: null,
            input_min: null,
            input_max: null,
            input_step: null,
            input_readonly: null,
            input_spinner: true,
            input_group: false,
            input_group_prepend_class: null,
            input_group_prepend_objs: null,
            input_group_append_class: null,
            input_group_append_objs: null,
            input_group_obj_form: null,
            element_default: null,
            element_fn_change: null,

        }, options);
        //
        this.fe = new form_element();
        this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        // Подпись
        var label = new this.fe.label({
            class: this.settings.label_class,
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        this.$element.append(label.$label);
        // Input
        var input = new this.fe.input({
            id: this.settings.id,
            type: 'number',
            class: 'form-control',
            title: this.settings.input_title,
            placeholder: this.settings.input_placeholder,
            required: this.settings.input_required,
            maxlength: this.settings.input_maxlength,
            pattern: this.settings.input_pattern,
            readonly: this.settings.input_readonly,
            min: this.settings.input_min,
            max: this.settings.input_max,
            step: this.settings.input_step,
        });
        add_class(input.$input, this.settings.input_class);
        this.element = new this.fe.init_input(input.$input, {
            default_value: this.settings.element_default,
            fn_change: this.settings.element_fn_change,
        });
        //
        var ifb = new this.fe.bs_invalid_feedback();

        if (this.settings.input_group) {
            var ig = new this.fe.bs_input_group();
            if (this.settings.input_group_prepend_objs && this.settings.input_group_prepend_objs !== null) {
                var input_group_prepend = new this.fe.bs_input_group_prepend({
                    class: this.settings.input_group_prepend_class,
                    objs: this.settings.input_group_prepend_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_prepend.$div);
            };
            //
            ig.$div.append(input.$input);
            if (this.settings.input_group_append_objs && this.settings.input_group_append_objs !== null) {
                var input_group_append = new this.fe.bs_input_group_append({
                    class: this.settings.input_group_append_class,
                    objs: this.settings.input_group_append_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_append.$div);
            };
            ig.$div.append(ifb.$div);
            this.$element.append(ig.$div);
        } else {
            this.$element.append(input.$input);
            this.$element.append(ifb.$div);
        }
    };
    //
    form_element.prototype.bs_input_text = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            input_size: null,
            input_class: null,
            input_title: null,
            input_placeholder: null,
            input_required: null,
            input_min: null,
            input_max: null,
            input_step: null,
            input_readonly: null,
            input_group: false,
            input_group_prepend_class: null,
            input_group_prepend_objs: null,
            input_group_append_class: null,
            input_group_append_objs: null,
            input_group_obj_form: null,
            element_default: null,
            element_fn_change: null,
        }, options);
        //
        this.fe = new form_element();
        this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        // Подпись
        var label = new this.fe.label({
            class: this.settings.label_class,
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        this.$element.append(label.$label);
        // Input
        var input = new this.fe.input({
            id: this.settings.id,
            type: 'text',
            class: 'form-control',
            title: this.settings.input_title,
            placeholder: this.settings.input_placeholder,
            required: this.settings.input_required,
            maxlength: this.settings.input_maxlength,
            pattern: this.settings.input_pattern,
            readonly: this.settings.input_readonly,
            min: this.settings.input_min,
            max: this.settings.input_max,
            step: this.settings.input_step,

        });
        add_class(input.$input, this.settings.input_class);
        /*        this.element = new this.fc.init_input(input.$input, '', null);*/
        this.element = new this.fe.init_input(input.$input, {
            default_value: '',
            fn_change: this.settings.element_fn_change,
        });
        //
        var ifb = new this.fe.bs_invalid_feedback();

        if (this.settings.input_group) {
            var ig = new this.fe.bs_input_group();
            if (this.settings.input_group_prepend_objs && this.settings.input_group_prepend_objs !== null) {
                var input_group_prepend = new this.fe.bs_input_group_prepend({
                    class: this.settings.input_group_prepend_class,
                    objs: this.settings.input_group_prepend_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_prepend.$div);
            };
            //
            ig.$div.append(input.$input);
            if (this.settings.input_group_append_objs && this.settings.input_group_append_objs !== null) {
                var input_group_append = new this.fe.bs_input_group_append({
                    class: this.settings.input_group_append_class,
                    objs: this.settings.input_group_append_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_append.$div);
            };
            ig.$div.append(ifb.$div);
            this.$element.append(ig.$div);
        } else {
            this.$element.append(input.$input);
            this.$element.append(ifb.$div);
        }
    };
    //
    form_element.prototype.bs_input_datetime = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            input_size: null,
            input_class: null,
            input_title: null,
            input_placeholder: null,
            input_required: null,
            input_min: null,
            input_max: null,
            input_step: null,
            input_group: false,
            input_group_prepend_class: null,
            input_group_prepend_objs: null,
            input_group_append_class: null,
            input_group_obj_form: null,
            element_time: null,
            element_default: null,
            element_fn_close: null,

        }, options);
        //
        this.fe = new form_element();
        //this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        // Подпись
        var label = new this.fe.label({
            class: this.settings.label_class,
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        this.$element.append(label.$label);
        // Input
        var input = new this.fe.input({
            id: this.settings.id,
            type: 'datetime',
            class: 'form-control',
            title: this.settings.input_title,
            placeholder: this.settings.input_placeholder,
            required: this.settings.input_required,
            maxlength: this.settings.input_maxlength,
            pattern: this.settings.input_pattern,
            min: this.settings.input_min,
            max: this.settings.input_max,
            step: this.settings.input_step,
        });
        add_class(input.$input, this.settings.input_class);
        this.element = new this.fe.init_datetime_input(input.$input, { default_value: this.settings.element_default, fn_close: this.settings.element_fn_close, time: this.settings.element_time });
        //
        var ifb = new this.fe.bs_invalid_feedback();

        if (this.settings.input_group) {
            var ig = new this.fe.bs_input_group();
            if (this.settings.input_group_prepend_objs && this.settings.input_group_prepend_objs !== null) {
                var input_group_prepend = new this.fe.bs_input_group_prepend({
                    class: this.settings.input_group_prepend_class,
                    objs: this.settings.input_group_prepend_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_prepend.$div);
            };
            //
            ig.$div.append(input.$input);
            if (this.settings.input_group_append_objs && this.settings.input_group_append_objs !== null) {
                var input_group_append = new this.fe.bs_input_group_append({
                    class: this.settings.input_group_append_class,
                    objs: this.settings.input_group_append_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_append.$div);
            };
            ig.$div.append(ifb.$div);
            this.$element.append(ig.$div);
        } else {
            this.$element.append(input.$input);
            this.$element.append(ifb.$div);
        }
    };
    //<div class="form-group col-xl-3 text-left">
    //  <div class="form-check">
    //      <input class="form-check-input" type="checkbox" id="gridCheck">
    //      <label class="form-check-label" for="gridCheck">Check me out</label>
    //  </div>
    //</div>
    form_element.prototype.bs_checkbox = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            checkbox_class: null,
            checkbox_title: null,
            checkbox_required: null,
            checkbox_readonly: false,
            element_default: null,
            element_change: null,
        }, options);
        //
        this.fe = new form_element();
        //this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        //
        var form_check = new this.fe.bs_form_check();
        // Input
        var input = new this.fe.input({
            id: this.settings.id,
            type: 'checkbox',
            class: 'form-check-input',
            title: this.settings.checkbox_title,
            placeholder: null,
            required: this.settings.checkbox_required,
            //readonly: this.settings.checkbox_readonly,
        });
        add_class(input.$input, this.settings.checkbox_class);
        //
        this.element = new this.fe.init_checkbox(input.$input, { default_value: this.settings.element_default, fn_change: this.settings.element_change });
        if (this.settings.checkbox_readonly) {
            this.element.disable();
        }
        // Подпись
        var label = new this.fe.label({
            class: 'form-check-label',
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        add_class(label.$label, this.settings.label_class);
        //
        var ifb = new this.fe.bs_invalid_feedback();

        form_check.$div.append(input.$input).append(label.$label).append(ifb.$div);
        this.$element.append(form_check.$div);
    };
    //
    form_element.prototype.bs_textarea = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            textarea_size: null,
            textarea_rows: null,
            textarea_cols: null,
            textarea_class: null,
            textarea_title: null,
            textarea_maxlength: null,
            textarea_placeholder: null,
            textarea_required: null,
            textarea_readonly: null,
            input_group: false,
            input_group_prepend_class: null,
            input_group_prepend_objs: null,
            input_group_append_class: null,
            input_group_append_objs: null,
            input_group_obj_form: null,
        }, options);
        //
        this.fe = new form_element();
        //this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        // Подпись
        var label = new this.fe.label({
            class: this.settings.label_class,
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        this.$element.append(label.$label);
        // Input
        var textarea = new this.fe.textarea({
            id: this.settings.id,
            rows: this.settings.textarea_rows,
            cols: this.settings.textarea_cols,
            class: 'form-control',
            title: this.settings.input_title,
            placeholder: this.settings.textarea_placeholder,
            required: this.settings.textarea_required,
            maxlength: this.settings.textarea_maxlength,
            readonly: this.settings.textarea_readonly,
        });
        add_class(textarea.$textarea, this.settings.textarea_class);
        this.element = new this.fe.init_textarea(textarea.$textarea, { default_value: '', fn_change: null });
        //
        var ifb = new this.fe.bs_invalid_feedback();

        if (this.settings.input_group) {
            var ig = new this.fe.bs_input_group();
            if (this.settings.input_group_prepend_objs && this.settings.input_group_prepend_objs !== null) {
                var input_group_prepend = new this.fe.bs_input_group_prepend({
                    class: this.settings.input_group_prepend_class,
                    objs: this.settings.input_group_prepend_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_prepend.$div);
            };
            //
            ig.$div.append(textarea.$textarea);
            if (this.settings.input_group_append_objs && this.settings.input_group_append_objs !== null) {
                var input_group_append = new this.fe.bs_input_group_append({
                    class: this.settings.input_group_append_class,
                    objs: this.settings.input_group_append_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_append.$div);
            };
            ig.$div.append(ifb.$div);
            this.$element.append(ig.$div);
        } else {
            this.$element.append(textarea.$textarea);
            this.$element.append(ifb.$div);
        }
    };
    //
    form_element.prototype.bs_autocomplete = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            input_type: 'input',
            input_size: null,
            input_class: null,
            input_title: null,
            input_placeholder: null,
            input_required: null,
            input_min: null,
            input_max: null,
            input_step: null,
            input_readonly: null,
            textarea_rows: null,
            textarea_cols: null,
            input_group: false,
            input_group_prepend_class: null,
            input_group_prepend_objs: null,
            input_group_append_class: null,
            input_group_append_objs: null,
            input_group_obj_form: null,
            element_data: [],
            element_minLength: 0,
            element_out_value: false,
            element_val_inp: 'value',
            element_check: null,
        }, options);
        //
        this.fe = new form_element();
        //this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        // Подпись
        var label = new this.fe.label({
            class: this.settings.label_class,
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        this.$element.append(label.$label);
        var obj_el = null;
        switch (this.settings.input_type) {
            case 'input': {
                var input = new this.fe.input({
                    id: this.settings.id,
                    type: 'text',
                    class: 'form-control',
                    title: this.settings.input_title,
                    placeholder: this.settings.input_placeholder,
                    required: this.settings.input_required,
                    maxlength: this.settings.input_maxlength,
                    pattern: this.settings.input_pattern,
                    min: this.settings.input_min,
                    max: this.settings.input_max,
                    step: this.settings.input_step,
                });
                obj_el = input.$input;
                break;
            };
            case 'textarea': {
                var textarea = new this.fe.textarea({
                    id: this.settings.id,
                    rows: this.settings.textarea_rows,
                    cols: this.settings.textarea_cols,
                    class: 'form-control',
                    title: this.settings.input_title,
                    placeholder: this.settings.input_placeholder,
                    required: this.settings.input_required,
                    maxlength: this.settings.input_maxlength,
                    readonly: this.settings.input_readonly,
                });
                obj_el = textarea.$textarea;
                break;
            };
        }
        //
        add_class(obj_el, this.settings.input_class);
        this.element = new this.fe.init_autocomplete(obj_el, {
            data: this.settings.element_data,
            minLength: this.settings.element_minLength,
            out_value: this.settings.element_out_value,
            val_inp: this.settings.element_val_inp,
            check: this.settings.element_check,
        });
        //
        var ifb = new this.fe.bs_invalid_feedback();
        //
        if (this.settings.input_group) {
            var ig = new this.fe.bs_input_group();
            if (this.settings.input_group_prepend_objs && this.settings.input_group_prepend_objs !== null) {
                var input_group_prepend = new this.fe.bs_input_group_prepend({
                    class: this.settings.input_group_prepend_class,
                    objs: this.settings.input_group_prepend_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_prepend.$div);
            };
            //
            ig.$div.append(obj_el);
            if (this.settings.input_group_append_objs && this.settings.input_group_append_objs !== null) {
                var input_group_append = new this.fe.bs_input_group_append({
                    class: this.settings.input_group_append_class,
                    objs: this.settings.input_group_append_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_append.$div);
            };
            ig.$div.append(ifb.$div);
            this.$element.append(ig.$div);
        } else {
            this.$element.append(obj_el);
            this.$element.append(ifb.$div);
        }
    };
    //
    form_element.prototype.bs_select = function (options) {
        this.settings = $.extend({
            id: null,
            form_group_size: null,
            form_group_col: null,
            form_group_class: null,
            label: null,
            label_class: null,
            input_size: null,
            input_class: null,
            input_title: null,
            input_placeholder: null,
            input_multiple: null,
            input_required: null,
            input_readonly: null,
            input_group: false,
            input_group_prepend_class: null,
            input_group_prepend_objs: null,
            input_group_append_class: null,
            input_group_append_objs: null,
            input_group_obj_form: null,
            element_data: [],
            element_default: -1,
            element_change: null,
            element_check: null,
        }, options);
        //
        this.fe = new form_element();
        //this.fc = new form_control();

        var div = new this.fe.div();
        this.$element = div.$div;
        if (this.settings.input_group) {
            add_class(this.$element, 'form-group');
        }
        var cl = 'col';
        if (this.settings.form_group_size && this.settings.form_group_size !== '') {
            cl += '-' + this.settings.form_group_size;
        }
        if (this.settings.form_group_col && this.settings.form_group_col !== '') {
            cl += '-' + this.settings.form_group_col;
        }
        add_class(this.$element, cl);
        add_class(this.$element, this.settings.form_group_class);
        // Подпись
        var label = new this.fe.label({
            class: this.settings.label_class,
            id: null,
            for: this.settings.id,
            label: this.settings.label
        });
        this.$element.append(label.$label);
        // SELECT
        var select = new this.fe.select({
            id: this.settings.id,
            type: 'text',
            class: 'form-control',
            title: this.settings.input_title,
            placeholder: this.settings.input_placeholder,
            size: this.settings.input_size,
            multiple: this.settings.input_multiple,
            required: this.settings.input_required,
            readonly: this.settings.input_readonly,
        });
        add_class(select.$select, this.settings.input_class);
        this.element = new this.fe.init_select(select.$select, {
            data: this.settings.element_data,
            default_value: this.settings.element_default,
            fn_change: this.settings.element_change,
            check: this.settings.element_check
        });
        //
        var ifb = new this.fe.bs_invalid_feedback();

        if (this.settings.input_group) {
            var ig = new this.fe.bs_input_group();
            if (this.settings.input_group_prepend_objs && this.settings.input_group_prepend_objs !== null) {
                var input_group_prepend = new this.fe.bs_input_group_prepend({
                    class: this.settings.input_group_prepend_class,
                    objs: this.settings.input_group_prepend_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_prepend.$div);
            };
            //
            ig.$div.append(select.$select);
            if (this.settings.input_group_append_objs && this.settings.input_group_append_objs !== null) {
                var input_group_append = new this.fe.bs_input_group_append({
                    class: this.settings.input_group_append_class,
                    objs: this.settings.input_group_append_objs,
                    obj_form: this.settings.input_group_obj_form
                });
                ig.$div.append(input_group_append.$div);
            };
            ig.$div.append(ifb.$div);
            this.$element.append(ig.$div);
        } else {
            this.$element.append(select.$select);
            this.$element.append(ifb.$div);
        }
    };
    //----------------------------------------------------------------------------
    // Автоматически формируем документы на форме
    form_element.prototype.add_obj = function (content, objs, obj_form, callback) {
        // Добавить элемент
        var add_element = function (element, content, obj) {
            if (element && element.length > 0) {
                if (obj.childs && obj.childs.length > 0) {
                    this.add_obj(element, obj.childs, obj_form, function (content) {
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
                if (obj.obj === 'bs_row') {
                    var element = new this.bs_row(obj.options);
                    add_element(element.$row, content, obj);
                };
                if (obj.obj === 'bs_col') {
                    var element = new this.bs_col(obj.options);
                    add_element(element.$col, content, obj);
                };
                if (obj.obj === 'bs_form_row') {
                    var element = new this.bs_form_row(obj.options);
                    add_element(element.$row, content, obj);
                };
                if (obj.obj === 'fieldset') {
                    var element = new this.fieldset(obj.options);
                    add_element(element.$fieldset, content, obj);
                };
                if (obj.obj === 'table') {
                    var element = new this.table(obj.options);
                    add_element(element.$table, content, obj);
                };
                if (obj.obj === 'div') {
                    var element = new this.div(obj.options);
                    add_element(element.$div, content, obj);
                };
                if (obj.obj === 'bs_alert') {
                    var element = new this.bs_alert(obj.options);
                    if (element && element.alert) {
                        obj_form.alerts.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'alert',
                            element: element.alert,
                            $element: element.alert.$alert,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(element.$alert, content, obj);
                };
                if (obj.obj === 'bs_accordion') {
                    var element = new this.bs_accordion(obj.options);
                    add_element(element.$accordion, content, obj);
                };
                if (obj.obj === 'bs_accordion_card_1') {
                    obj.options.body_obj_form = obj_form;
                    var element = new this.bs_accordion_card_1(obj.options);
                    add_element(element.$card, content, obj);
                };
                if (obj.obj === 'bs_button') {
                    var element = new this.bs_button(obj.options);
                    if (element && element.$button) {
                        obj_form.buttons.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'button',
                            element: null,
                            $element: element.$button,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(element.$button, content, obj);
                };
                if (obj.obj === 'bs_input_number') {
                    obj.options.input_group_obj_form = obj_form;
                    var input = new this.bs_input_number(obj.options);
                    // Включил отображение компонента inputSpinner
                    if (obj.options.input_spinner) {
                        input.element.$element.inputSpinner();
                    }
                    if (input && input.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'input_number',
                            element: input.element,
                            $element: input.element.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(input.$element, content, obj);
                };
                if (obj.obj === 'bs_input_text') {
                    obj.options.input_group_obj_form = obj_form;
                    var input = new this.bs_input_text(obj.options);
                    if (input && input.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'input_text',
                            element: input.element,
                            $element: input.element.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(input.$element, content, obj);
                };
                if (obj.obj === 'bs_input_datetime') {
                    obj.options.input_group_obj_form = obj_form;
                    var input = new this.bs_input_datetime(obj.options);
                    if (input && input.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'input_datetime',
                            element: input.element,
                            $element: input.element.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(input.$element, content, obj);
                };
                if (obj.obj === 'bs_checkbox') {
                    var checkbox = new this.bs_checkbox(obj.options);
                    if (checkbox && checkbox.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'checkbox',
                            element: checkbox.element,
                            $element: checkbox.element.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(checkbox.$element, content, obj);
                };
                if (obj.obj === 'bs_textarea') {
                    obj.options.input_group_obj_form = obj_form;
                    var textarea = new this.bs_textarea(obj.options);
                    if (textarea && textarea.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'textarea',
                            element: textarea.element,
                            $element: textarea.element.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(textarea.$element, content, obj);
                };
                if (obj.obj === 'bs_autocomplete') {
                    obj.options.input_group_obj_form = obj_form;
                    var input = new this.bs_autocomplete(obj.options);
                    if (input && input.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'autocomplete',
                            element: input.element,
                            $element: input.element.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(input.$element, content, obj);
                };
                if (obj.obj === 'bs_select') {
                    obj.options.input_group_obj_form = obj_form;
                    var input = new this.bs_select(obj.options);
                    if (input && input.element) {
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'select',
                            element: input.element,
                            $element: input.element.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                    add_element(input.$element, content, obj);
                };
            }
        }.bind(this));
        if (typeof callback === 'function') {
            callback(content);
        };
    };
    // 
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
            fn_html_init: function () { },
            fn_init: null,
        }, options);
        var form = new this.fc.el_form(this.settings.id, this.settings.cl_form + ' text-left');

        this.$form = form.$form;
        // Алерт 
        //if (!this.settings.alert) {
        //    var $alert = new this.fc.el_alert();
        //    if ($alert && $alert.$alert && $alert.$alert.length > 0) {
        //        var $alert = $alert.$alert;
        //        this.$form.append($alert);
        //        this.alert = new alert_form($alert);
        //    }
        //};
        // Привяжем событие submit
        this.$form.on('submit', function (event) {

        }.bind(this));
        //---------------------------------------------------------
        // Создаем элементы и отрисовываем их на форме
        // Получим список элементов которые должны отображатся на форме
        this.obj_form = {
            alerts: [],
            views: [],
            buttons: [],
            validations: [],
        };
        // Пройдемся по элементам
        this.fe.add_obj(this.$form, this.settings.objs, this.obj_form, function (form) {
            // Построение HTML закончена
            // -------------НАСТРОИМ ВАЛИДАЦИЮ -----------------------
            // Получим список validation
            this.list_validation = [];
            $.each(this.obj_form.views, function (i, obj) {
                if (obj.validation_group) {
                    var val = this.list_validation.find(function (o) { return o === obj.validation_group; }.bind(this));
                    if (!val) {
                        this.list_validation.push(obj.validation_group);
                    }
                }
            }.bind(this));
            // Создадим validation для элементов
            $.each(this.list_validation, function (i, validation_name) {
                this['validation_' + validation_name] = new validation_form();
                // Настроим валидацию
                var validation = {};
                validation.name = validation_name;
                validation.elements = [];
                // Настроим Alert
                if (validation_name === 'common') {
                    validation.alert = this.settings.alert;
                } else {
                    var alert = this.obj_form.alerts.find(function (o) { return o.validation_group === validation_name && o.type === 'alert'; });
                    validation.alert = alert && alert.element ? alert.element : this.settings.alert;
                }
                // Получим перечень элементов
                $.each(this.obj_form.views.filter(function (i) { return i.validation_group === validation_name; }),
                    function (i, obj) {
                        validation.elements.push(obj.$element);
                    }.bind(this));
                validation.$elements = $([]).add($(validation.elements));
                this['validation_' + validation_name].init({
                    alert: validation.alert,
                    elements: validation.$elements,
                });
                validation.validation = this['validation_' + validation_name];
                this.obj_form.validations.push(validation);
            }.bind(this));
            // -------------------------------------------------------
            if (typeof this.settings.fn_init === 'function') {
                this.settings.fn_init(this.init);
            }
            // -------------------------------------------------------
        }.bind(this));
    };
    // Создать элементы и привязать элементы к ссылке
    form_dialog.prototype.create_element = function (link, add_type) {
        $.each(this.obj_form.views, function (i, obj) {
            var type = ''
            if (add_type) {
                type = obj.type + '_';
            }
            link[type + obj.name] = obj.element;
        }.bind(this));
        $.each(this.obj_form.buttons, function (i, obj) {
            var type = ''
            if (add_type) {
                type = obj.type + '_';
            }
            link[(type !== '' ? type : '$bt_') + obj.name] = obj.$element;
        }.bind(this));
    };
    // Установит значение компонента
    form_dialog.prototype.set = function (id, value) {
        if (this.obj_form.views) {
            var element = this.obj_form.views.find(function (o) {
                return o.name === id;
            });
            if (element && element.element) {
                element.element.val(value);
            }
        }
    };
    // Прочесть значение компонента
    form_dialog.prototype.get = function (id) {
        if (this.obj_form.views) {
            var element = this.obj_form.views.find(function (o) {
                return o.name === id;
            });
            if (element && element.element) {
                return element.element.val();
            }
        }
        return undefined;
    };
    // Установить или обновить значение компонента
    form_dialog.prototype.val = function (id, value) {
        if (value !== undefined) {
            this.set(id, value);
        } else {
            return this.get(id);
        }
    };
    // Показать кнопку
    form_dialog.prototype.bt_show = function (id) {
        if (this.obj_form.buttons) {
            var element = this.obj_form.buttons.find(function (o) {
                return o.name === id;
            });
            if (element && element.$element) {
                element.$element.show();
            }
        }
    };
    // убрать кнопку
    form_dialog.prototype.bt_hide = function (id) {
        if (this.obj_form.buttons) {
            var element = this.obj_form.buttons.find(function (o) {
                return o.name === id;
            });
            if (element && element.$element) {
                element.$element.hide();
            }
        }
    };
    // Вывести на форме сообщение об ошибке под элементом 
    form_dialog.prototype.set_validation_object_error = function (validation_name, id, message, not_alert) {
        var element = this.obj_form.views.find(function (o) {
            return o.name === id;
        });
        if (element) {
            if (!validation_name) {
                validation_name = 'common';
            }
            if (this['validation_' + validation_name]) {
                if (not_alert) {
                    this['validation_' + validation_name].set_control_error(element.$element, message);
                } else {
                    this['validation_' + validation_name].set_object_error(element.$element, message);
                }
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    // Вывести на форме сообщение об успехе под элементом 
    form_dialog.prototype.set_validation_object_ok = function (validation_name, id, message, not_alert) {
        var element = this.obj_form.views.find(function (o) {
            return o.name === id;
        });
        if (element) {
            if (!validation_name) {
                validation_name = 'common';
            }
            if (this['validation_' + validation_name]) {
                if (not_alert) {
                    this['validation_' + validation_name].set_control_ok(element.$element, message);
                } else {
                    this['validation_' + validation_name].set_object_ok(element.$element, message);
                }
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    // Вывести на форме сообщение об ошибке под элементом и на Alert
    form_dialog.prototype.set_validation_control_error = function (validation_name, id, message) {
        var element = this.obj_form.views.find(function (o) {
            return o.name === id;
        });
        if (element) {
            if (!validation_name) {
                validation_name = 'common';
            }
            if (this['validation_' + validation_name]) {
                this['validation_' + validation_name].set_control_error(element.$element, message);
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    // Вывести на форме сообщение об успехе под элементом и на Alert
    form_dialog.prototype.set_validation_control_ok = function (validation_name, id, message) {
        var element = this.obj_form.views.find(function (o) {
            return o.name === id;
        });
        if (element) {
            if (!validation_name) {
                validation_name = 'common';
            }
            if (this['validation_' + validation_name]) {
                this['validation_' + validation_name].set_control_ok(element.$element, message);
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    // Дестрой
    form_dialog.prototype.destroy = function () {
        if (this.obj_form) {
            $.each(this.obj_form.views.filter(function (i) { return i.destroy; }),
                function (i, obj) {
                    obj.element.destroy();
                }.bind(this));
        };
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
            // Привяжим события кнопок и кнопки
            modal.$modal_bt_ok.on('click', this.settings.ok_click);
            modal.$modal_bt_close.on('click', this.settings.close_click);
            this.$bt_ok = modal.$modal_bt_ok;
            this.$bt_close = modal.$modal_bt_close;
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

    validation_form.prototype.clear_all = function (not_clear_message) {
        if (!not_clear_message) this.clear_message();
        this.clear_error();
    };
    // Очистить все ошибки
    validation_form.prototype.clear_error = function (obj) {
        if (obj) {
            obj.removeClass('is-valid is-invalid');
        } else {
            if (this.settings.elements && this.settings.elements.length > 0) {
                this.settings.elements.each(function () {
                    $(this).removeClass('is-valid is-invalid').nextAll(".invalid-feedback").text('');
                });
            };
        };
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
    // --------------------------------------------------------------------------

    // Установить признак ошибка
    validation_form.prototype.set_form_element_error = function (o, mes_error, out_message) {
        this.set_control_error(o.$element, mes_error);
        if (out_message) this.out_error_message(mes_error);
        return false;
    };
    // Установить признак ок
    validation_form.prototype.set_form_element_ok = function (o, mes_ok, out_message) {
        this.set_control_ok(o.$element, mes_ok);
        if (out_message) this.out_info_message(mes_ok);
        return true;
    };
    // Проверка на условие если true-Ок, false - error
    validation_form.prototype.check_control_condition = function (result, o, mes_error, mes_ok, out_message) {
        if (result) {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверка на пустое значение "INPUT"
    validation_form.prototype.check_control_input_not_null = function (o, mes_error, mes_ok, out_message) {
        var val = o.val();
        if (o.val() !== null && o.val() !== '') {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверим Input введенное значение входит в диапазон (пустое значение - не допускается)
    validation_form.prototype.checkInputOfRange = function (o, min, max, mes_error, mes_ok, out_message) {
        if (o.val() !== '' && o.val() !== null) {
            var value = Number(o.val());
            if (isNaN(value) || value > max || value < min) {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверим Input введенное значение входит в диапазон (пустое значение - допускается)
    validation_form.prototype.checkInputOfRange_IsNull = function (o, min, max, mes_error, mes_ok, out_message) {
        if (o.val() !== '' && o.val() !== null) {
            var value = Number(o.val());
            if (isNaN(value) || value > max || value < min) {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }
    };
    // Проверка на пустое значение "SELECT"
    validation_form.prototype.check_control_select_not_null = function (o, mes_error, mes_ok, out_message) {
        if (Number(o.val()) >= 0) {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверить элемент "autocomplete" на введенное значение
    validation_form.prototype.check_control_autocomplete = function (o, mes_error, mes_ok, mes_null, out_message) {
        if (o.text()) {
            var s = o.val();
            var s1 = o.text();
            if (o.val()) {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            } else {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            }
        } else {
            this.set_control_error(o.$element, mes_null);
            if (out_message) this.out_error_message(mes_null);
            return false;
        }
    };
    // Проверить элемент "autocomplete" на введенное значение (c учетом value = null)
    validation_form.prototype.check_control_autocomplete_is_value_null = function (o, mes_error, mes_ok, mes_null, out_message) {
        if (o.text()) {
            var s = o.val();
            if (o.val() !== undefined) {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            } else {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            }
        } else {
            this.set_control_error(o.$element, mes_null);
            if (out_message) this.out_error_message(mes_null);
            return false;
        }
    };
    // Проверить элемент "autocomplete" на введенное значение
    validation_form.prototype.check_control_autocomplete_null = function (o, mes_error, mes_ok, out_message) {
        if (o.text()) {
            if (o.val()) {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            } else {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            }
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }
    };
    // Проверить элемент "datetime_input" на введенное значение
    validation_form.prototype.check_control_datetime_input = function (o, mes_error, mes_ok, out_message) {
        var datetime = moment(o.val());
        if (!datetime.isValid()) {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }
    };
    // Проверить элемент "datetime_input" на введенное значение (с подержкой пустого значения)
    validation_form.prototype.check_control_datetime_input_null = function (o, mes_error, mes_ok, out_message) {
        if (o.val() !== null && o.val() !== '') {
            var datetime = moment(o.val());
            if (!datetime.isValid()) {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }

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