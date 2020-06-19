(function ($) {

    $.fn.dialog_confirm = function (method) {

        var html_form = $('<p id="dialog-confirm-text"><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span></p>');

        var methods = {

            init: function (options) {

                return this.each(function () {

                    var $this = $(this),
                        data = $this.data('pl_dialog_confirm'),
                        dialog_confirm = (data) ? data.dialog_confirm : null;

                    // Если плагин ещё не проинициализирован
                    if (!data) {

                        /*
                         * Тут выполняем инициализацию
                        */
                        $this.append(html_form);
                        $this.attr('style', "display:none");
                        $this.attr('title', "Empty the recycle bin?");
                        dialog_confirm = {
                            result: false,
                            callback_ok: null,
                            obj: $this.dialog({
                                resizable: false,
                                autoOpen: false,
                                height: "auto",
                                width: 500,
                                modal: true,
                                open: function (event, ui) {
                                },
                                close: function (event, ui) {
                                    if (typeof dialog_confirm.callback_ok === 'function') {
                                        dialog_confirm.callback_ok(dialog_confirm.result);
                                    }
                                },
                                classes: {
                                    "ui-dialog": "card",
                                    "ui-dialog-titlebar": "card-header bg-primary text-white",
                                    "ui-dialog-content": "card-body",
                                    "ui-dialog-buttonpane": "card-footer text-muted"
                                },
                                buttons: [
                                    {
                                        text: "Ок",
                                        class: "btn btn-outline-primary btn-sm",
                                        click: function () {
                                            dialog_confirm.result = true;
                                            $(this).dialog("close");
                                        }
                                    },
                                    {
                                        text: "Отмена",
                                        class: "btn btn-outline-primary btn-sm",
                                        click: function () {
                                            $(this).dialog("close");
                                        }
                                    }]
                            }),
                            Open: function (titlt, text, callback_ok) {
                                dialog_confirm.result = false;
                                dialog_confirm.obj.dialog("option", "title", titlt);
                                $('p#dialog-confirm-text').text(text);
                                dialog_confirm.callback_ok = callback_ok;
                                dialog_confirm.obj.dialog("open");
                            }
                        }





                        $(this).data('pl_dialog_confirm', {
                            target: $this,
                            dialog_confirm: dialog_confirm
                        });

                    }
                });
            },

            destroy: function () {

                return this.each(function () {

                    var $this = $(this),
                        data = $this.data('pl_dialog_confirm');

                    // пространства имён рулят!!11
                    $(window).unbind('.dialog_confirm');
                    data.dialog_confirm.remove();
                    $this.removeData('pl_dialog_confirm');

                })

            },

            Open: function (titlt, text, callback_ok) {
                return this.each(function () {

                    var $this = $(this),
                        data = $this.data('pl_dialog_confirm');
                    if (data) {
                        dialog_confirm = data.dialog_confirm;
                        dialog_confirm.Open(titlt,text,callback_ok);
                    }
                        

                    //// пространства имён рулят!!11
                    //$(window).unbind('.dialog_confirm');
                    //data.dialog_confirm.remove();
                    //$this.removeData('pl_dialog_confirm');

                })
            },
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.dialog_confirm');
        }

    };

})(jQuery);