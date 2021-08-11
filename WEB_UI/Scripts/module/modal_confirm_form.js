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

        },
        'en':  //default language: English
        {
            'title_select': 'Select...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //-------------------------------------------------------------------------------
    // Создадим макет "Модальной формы"
    function modal_form(base) {
        //<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        //    <div class="modal-dialog modal-dialog-centered" role="document">
        //        <div class="modal-content">
        //            <div class="modal-header">
        //                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        //                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                    <span aria-hidden="true">&times;</span>
        //                </button>
        //            </div>
        //            <div class="modal-body">
        //                ...
        //            </div>
        //            <div class="modal-footer">
        //                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                <button type="button" class="btn btn-primary">Save changes</button>
        //            </div>
        //        </div>
        //    </div>
        //</div>
        var $div_modal = $('<div></div>', {
            'id': 'mcf-' + base.selector,
            'class': 'modal fade',
            'tabindex': '-1',
            'role': 'dialog',
            'aria-labelledby': 'mcf-' + base.selector + 'Title',
            'aria-hidden': 'true',
        });
        var $div_md = $('<div></div>', {
            'class': 'modal-dialog modal-dialog-centered',
            'role': 'document',
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
            'id': 'mcf-' + base.selector + 'Title',
            'class': 'modal-title font-weight-bold',
            'text': '',
        });
        var $button_modal_close = $('<button></button>', {
            'type': 'button',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
            'class': 'close',
        });
        var $span = $('<span aria-hidden="true">&times;</span>');
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
        this.$modal = $div_modal;
        var $mes = $('<p></p>');
        $button_modal_close.append($span);
        this.$title = $h5;
        $div_mh.append($h5).append($button_modal_close);
        $div_mf.append($button_modal_cancel).append($button_modal_ok);
        this.$message = $mes;
        this.$bt_ok = $button_modal_ok;
        $div_mb.append(this.$message);
        this.$body = $div_mb;
        $div_mc.append($div_mh).append(this.$body).append($div_mf);
        $div_md.append($div_mc);
        $div_modal.append($div_md);
        this.$element = $div_modal;
    };
    //-------------------------------------------------------------------------------
    // Конструктор формы 
    function modal_confirm_form(selector) {
        if (!selector) {
            throw new Error('Не указан селектор!');
        }
        this.selector = selector;
    }
    // Инициализация модальной формы
    modal_confirm_form.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({

        }, options);
        this.result = false;
        this.fn_ok = null; // Функция отложеного вызова обработки события Ок
        //---------------------------------------------------------
        // Создадим модальную форму для редактирования и добавим ее в секции body
        var modalElement = new modal_form(this);
        //this.$body_modal = modalElement.$body;
        // Создадим ссылку на форму
        this.$modal = modalElement.$modal;
        this.$modal_body = modalElement.$body;
        this.$modal_title = modalElement.$title;
        this.$modal_message = modalElement.$message;
        // Создадим ссылку на кнопку и обработку события нажатия
        this.$bt_ok = modalElement.$bt_ok;
        this.$bt_ok.on('click', function (e) {
            e.preventDefault();
            this.result = true;
            this.$modal_obj.modal('hide');
        }.bind(this));
        $('body').append(modalElement.$element);
        //---------------------------------------------------------
        // Инициализация модальной формы
        this.$modal_obj = this.$modal.modal({
            keyboard: false,
            show: false
        }).on('show.bs.modal', function (event) {
            // do something...
        }.bind(this)).on('hide.bs.modal', function (event) {
            if (typeof this.fn_ok === 'function') {
                this.fn_ok(this.result);
            }
        }.bind(this));
    };
    // Показать данные 
    modal_confirm_form.prototype.view = function (title, message, fn_ok) {
        this.result = false;
        this.$modal_title.empty().append(title);
        this.$modal_message.empty().append(message);
        this.fn_ok = fn_ok;
        this.$modal_obj.modal('show');
    };
    // Закрыть форму 
    modal_confirm_form.prototype.close = function () {
        this.$modal_obj.modal('hide');
    };
    // 
    App.modal_confirm_form = modal_confirm_form;

    window.App = App;
})(window);