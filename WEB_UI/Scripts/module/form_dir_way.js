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
            'class': 'modal-dialog',

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
    // Добавить элемент
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
            'for': 'el-' + name,
            'text': text,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        this.$element = $select;
        col.append($lab).append(this.$element).append($div_invalid);
    };
    // Добавить элемент
    function form_element(base, text, name, type) {
        var $div_row = $('<div></div>', {
            'class': 'form-row',
        });
        var $div_col = $('<div></div>', {
            'class': 'col-xl-12 mb-1',
        });
        var $lab = $('<label></label>', {
            'class': 'col-form-label',
            'for': 'el-' + name,
            'text': text,
        });
        var $select = $('<select></select>', {
            'class': 'form-control',
            'id': 'el-' + name,
            'name': 'el-' + name,
            'for': 'el-' + name,
            'text': text,
        });
        var $div_invalid = $('<div></div>', {
            'class': 'invalid-feedback',
        });
        this.$el = $select;
        $div_col.append($lab).append(this.$el).append($div_invalid);
        $div_row.append($div_col);
        this.$element = $div_row;
    };
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
            //this.$element.empty();
            //if (default_value === -1) {
            //    element.append($default_option);
            //}
            //if (data) {
            //    $.each(data, function (i, el) {
            //        // Преобразовать формат
            //        if (typeof fn_option === 'function') {
            //            el = fn_option(el);
            //        }
            //        if (el) {
            //            var $option = $('<option></option>', {
            //                'value': el.value,
            //                'text': el.text,
            //                'disabled': el.disabled,
            //            });
            //            this.$element.append($option);
            //        }
            //    }.bind(this));
            //};
            //this.$element.val(default_value);
            this.$element.on("change", fn_change);
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
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
        //
        $.each(this.rows_form, function (i, el_row) {
            var count = el_row.length;
            var rowElement = new row_element();
            var $row = rowElement.$element;
            $.each(el_row, function (i, el) {
                var colElement = new col_element(el.col);
                var $col = colElement.$element;
                var colElement = new select_element($col, this, el.name, el.label);

                var element = new init_select(colElement.$element, el.list, -1, null, el.select);
                this.element.push({ field: el.field, name: el.name, type: 'select', element: element });
                //$row.append(colElement)
                $row.append($col);
            }.bind(this));
            this.$form_modal.append($row);
        }.bind(this));
        //
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