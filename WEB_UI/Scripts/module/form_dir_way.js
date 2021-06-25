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
            'title_select': 'Выберите...',
            'mess_load_reference': 'Загружаю справочники...',
        },
        'en':  //default language: English
        {
            'title_select': 'Select...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var ids_dir = new IDS_DIRECTORY(App.Lang);                // Создадим класс IDS_RWT
    //
    function modal_edit(base) {
        var $div_modal = $('<div></div>', {
            'id': 'em-' + base.selector,
            'class': 'modal fade',
            'tabindex': '1',
            'aria-labelledby': 'ml-' + base.selector,
            'aria-hidden': 'true',
        });
        var $div_md = $('<div></div>', {
            'class': 'modal-dialog modal-lg',

        });
        var $div_mc = $('<div></div>', {
            'class': 'modal-content',

        });
        var $div_mh = $('<div></div>', {
            'class': 'modal-header',
        });
        var $div_mb = $('<div></div>', {
            'class': 'modal-body',
        });
        var $div_mf = $('<div></div>', {
            'class': 'modal-footer',
        });
        var $h5 = $('<h5></h5>', {
            'id': 'ml-' + base.selector,
            'class': 'modal-title',
            'text': 'Титле',
        });
        var $button_modal_close = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
            'class': 'close',
        });
        //var $span = $('<span></span>', {
        //    'aria-hidden': 'true',
        //    'text': '&times',
        //});
        var $span = $('<span aria-hidden="true">&times;</span>');
        //<span aria-hidden="true">&times;</span>
        var $button_modal_cancel = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'text': 'Отмена',
            'class': 'btn btn-secondary',
        });
        var $button_modal_ok = $('<button></button>', {
            'type': 'button',
            'text': 'Ок',
            'class': 'btn btn-primary',
        });
        var $form = $('<form></form>', {
            'id': 'fm-' + base.selector,
            'novalidate': '',
            'class': 'needs-validation',
        });
        //<form class="needs-validation" novalidate>
        //<button type="button" class="close" data-dismiss="modal" aria-label="Close">

        $button_modal_close.append($span);
        $div_mh.append($h5).append($button_modal_close);
        $div_mf.append($button_modal_cancel).append($button_modal_ok);
        this.$form = $form;
        $div_mb.append(this.$form);
        this.$body = $div_mb;
        $div_mc.append($div_mh).append(this.$body).append($div_mf);
        $div_md.append($div_mc);
        $div_modal.append($div_md);
        this.$element = $div_modal;
    };
    // ROW
    function row_element() {
        var $div_row = $('<div></div>', {
            'class': 'form-row',
        });
        this.$element = $div_row;
    };
    // COL
    function col_element(size) {
        var $div_col = $('<div></div>', {
            'class': 'col-xl-' + size + ' mb-1',
        });
        this.$element = $div_col;
    };
    // Добавить элемент select
    function select_element(col, base, name, text) {
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': 'el-' + name,
            'text': text,
        });
        var $select = $('<select></select>', {
            'class': 'form-control',
            'id': 'el-' + name,
            'name': 'el-' + name,
            /*            'for': 'el-' + name,*/
            //'text': text,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        this.$element = $select;
        col.append($lab).append(this.$element).append($div_invalid);
    };
    // Добавить элемент input
    function input_element(col, base, name, text, type) {
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': 'el-' + name,
            'text': text,
        });
        var $input = $('<input>', {
            'class': 'form-control',
            'id': 'el-' + name,
            'name': 'el-' + name,
            'type': type,
            //'text': text,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        this.$element = $input;
        col.append($lab).append(this.$element).append($div_invalid);
    };
    // Добавить элемент checkbox
    function checkbox_element(col, base, name, text) {
        var div_fm_check = $('<div></div>', {
            'class': 'form-check',
            //<div class="form-check">
        });
        var $lab = $('<label></label>', {
            'class': 'form-check-label',
            'for': 'el-' + name,
            'text': text,
        });
        var $input = $('<input>', {
            'class': 'form-check-input',
            'id': 'el-' + name,
            'name': 'el-' + name,
            'type': 'checkbox',
            //'text': text,
        });

        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        this.$element = $input;
        div_fm_check.append(this.$element).append($lab).append($div_invalid);
        col.append(div_fm_check);
    };

    // Добавить элемент input
    function datetime_element(col, base, name, text, type) {
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': 'el-' + name,
            'text': text,
        });
        var $input = $('<input>', {
            'class': 'form-control',
            'id': 'el-' + name,
            'name': 'el-' + name,
            'type': type,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        this.$element = $input;
        col.append($lab).append(this.$element).append($div_invalid);
    };
    //// Добавить элемент
    //function form_element(base, text, name, type) {
    //    var $div_row = $('<div></div>', {
    //        'class': 'form-row',
    //    });
    //    var $div_col = $('<div></div>', {
    //        'class': 'col-xl-12 mb-1',
    //    });
    //    var $lab = $('<label></label>', {
    //        'class': 'col-form-label',
    //        'for': 'el-' + name,
    //        'text': text,
    //    });
    //    var $select = $('<select></select>', {
    //        'class': 'form-control',
    //        'id': 'el-' + name,
    //        'name': 'el-' + name,
    //        'for': 'el-' + name,
    //        'text': text,
    //    });
    //    var $div_invalid = $('<div></div>', {
    //        'class': 'invalid-feedback',
    //    });
    //    this.$el = $select;
    //    $div_col.append($lab).append(this.$el).append($div_invalid);
    //    $div_row.append($div_col);
    //    this.$element = $div_row;
    //};
    //
    function form_dir_way(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$form = $(selector);
        if (this.$form.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        this.selector = this.$form.attr('id');
    }
    //
    function init_select(element, data, default_value, fn_option, fn_change) {
        /*        this.options = [];*/
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

    function init_input(element, default_value, fn_change) {
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

    function init_checkbox(element, default_value, fn_change) {
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

    function datetime_input(element, default_datetime, fn_close, time) {
        this.$element = element;
        this.select_date;
        this.init = function () {
            this.update(default_datetime);
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.set(value);
            } else {
                return this.select_date;
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
                    var dt = this.$element.val();
                    if (dt !== null && dt !== "") {
                        this.select_date = moment(dt, 'DD.MM.YYYY' + (time ? ' hh:mm' : ''));
                    } else {
                        this.select_date = null;
                    }
                    // Преобразовать формат
                    if (typeof fn_close === 'function') {
                        fn_close(this.select_date);
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
                this.select_date = null; // чтобы вернуло нет даты
            }
        };
        this.init();
    };
    //
    form_dir_way.prototype.init = function (rows_form, source) {
        this.source = source
        this.rows_form = rows_form;
        this.element = [];
        // теперь выполним инициализацию
        //Форма для редактирования
        var modalElement = new modal_edit(this);

        this.$body_modal = modalElement.$body;
        this.$form_modal = modalElement.$form;
        this.$form.append(modalElement.$element);
        // Создаем элементы и отрисовываем их на форме
        $.each(this.rows_form, function (i, el_row) {
            var count = el_row.length;
            var rowElement = new row_element();
            var $row = rowElement.$element;
            $.each(el_row, function (i, el) {
                var colElement = new col_element(el.col);
                var $col = colElement.$element;

                if (el.type === 'select') {
                    var colElement = new select_element($col, this, el.name, el.label);
                    var element = new init_select(colElement.$element, el.list, -1, null, el.select);
                    this.element.push({ field: el.field, name: el.name, type: 'select', element: element, control: el.control });
                }
                if (el.type === 'number') {
                    var colElement = new input_element($col, this, el.name, el.label, 'number');
                    var element = new init_input(colElement.$element, null, el.select);
                    this.element.push({ field: el.field, name: el.name, type: 'number', element: element, control: null });
                }
                if (el.type === 'text') {
                    var colElement = new input_element($col, this, el.name, el.label, 'text');
                    var element = new init_input(colElement.$element, null, el.select);
                    this.element.push({ field: el.field, name: el.name, type: 'text', element: element, control: null });
                }
                if (el.type === 'checkbox') {
                    $col.attr('style', 'display:flex;align-items:center');
                    var colElement = new checkbox_element($col, this, el.name, el.label);
                    var element = new init_checkbox(colElement.$element, null, el.select);
                    this.element.push({ field: el.field, name: el.name, type: 'checkbox', element: element, control: null });
                }
                if (el.type === 'datetime') {
                    var colElement = new datetime_element($col, this, el.name, el.label, 'datetime');
                    var element = new datetime_input(colElement.$element, null, el.close, true);
                    this.element.push({ field: el.field, name: el.name, type: 'datetime', element: element, control: null });
                }

                $row.append($col);
            }.bind(this));
            this.$form_modal.append($row);
        }.bind(this));
        // Пройдемся по зависимостям
        $.each(this.element.filter(function (i) { return i.control !== null }), function (i, el_control) {
            var n_control = el_control.control;
            var element_control = this.element.find(function (o) {
                return o.name === n_control;
            });
            if (element_control && element_control.element) {
                el_control.element['element_control'] = element_control.element;
            } else {
                throw new Error('Неопределен контролируемый элемент : ' + n_control);
            }
        }.bind(this))
        this.$modal_edit = $('div#em-' + this.selector).modal({
            keyboard: false,
            show: false
        }).on('show.bs.modal', function (event) {
            // do something...
        });
    };
    // Показать данные 
    form_dir_way.prototype.view = function (data) {
        if (data) {
            $.each(this.element, function (i, el) {
                var value = data[el.field];
                if (value !== undefined) {
                    el.element.val(value);
                    // Проверим наличие элемента контроля
                    if (el.element.element_control) {
                        // если есть элемент контроля обновим инфу по нему
                        el.element.$element.change();
                    }
                }
            });
        };
        //
        this.$modal_edit.modal('show');
    };
    // 
    App.form_dir_way = form_dir_way;

    window.App = App;
})(window);