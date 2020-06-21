(function ($) {


    var form_div = $('<div class="form-group row" style="margin-bottom:0.5rem"></div>');
    //var form_label = $('<label for="add_edit_cargo_group" class="col-sm-5 col-form-label"> :</label>');
    var form_div_div = $('<div class="col-sm-7"></div>');
    var form_div_checkbox = $('<div class="custom-control custom-checkbox offset-5 col-sm-7">');
    //var form_div_div_select = $('<select class="form-control" id="add_edit_cargo_group" name="add_edit_cargo_group" required="required"></select>');
    //var form_div_div_textarea = $('<textarea class="form-control" id="add_edit_cargo_name_ru" name="add_edit_cargo_name_ru" required="required"></textarea>');
    // var form_div_div_input = $('<input type="text" class="form-control" id="add_edit_code_sap" name="add_edit_code_sap">');
    var form_div_div_error = $('<div class="invalid-feedback"></div>');
    var form_input_sumbit = $('<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">');

    // Вернуть эдемент согласно указаному полю
    var get_control = function (control_field, id_name) {

        var name;
        var div1;
        var div2;
        var select;
        var textarea;
        var input;

        if (control_field) {
            name = id_name + '_' + control_field.name;
            switch (control_field.control) {
                case 'select': {
                    div1 = form_div.clone();
                    div2 = form_div_div.clone();
                    select = $('<select class="form-control" id="' + name + '" name="' + name + '"></select>');
                    if (control_field.required) select.attr('required', true);
                    div2.append(select);
                    div2.append(form_div_div_error.clone());
                    div1.append($('<label for="' + name + '" class="col-sm-5 col-form-label">' + control_field.text + ':</label>'));
                    div1.append(div2);
                    return div1;
                }
                case 'textarea': {
                    div1 = form_div.clone();
                    div2 = form_div_div.clone();
                    textarea = $('<textarea class="form-control" id="' + name + '" name="' + name + '"></textarea>');
                    if (control_field.required) textarea.attr('required', true);
                    div2.append(textarea);
                    div2.append(form_div_div_error.clone());
                    div1.append($('<label for="' + name + '" class="col-sm-5 col-form-label">' + control_field.text + ':</label>'));
                    div1.append(div2);
                    return div1;
                }
                case 'input': {
                    div1 = form_div.clone();
                    div2 = form_div_div.clone();
                    input = $('<input type="' + control_field.type + '" class="form-control" id="' + name + '" name="' + name + '">');
                    if (control_field.required) input.attr('required', true);
                    div2.append(input);
                    div2.append(form_div_div_error.clone());
                    div1.append($('<label for="' + name + '" class="col-sm-5 col-form-label">' + control_field.text + ':</label>'));
                    div1.append(div2);
                    return div1;
                }
                case 'checkbox': {
                    div1 = form_div.clone();
                    div2 = form_div_checkbox.clone();
                    input = $('<input type="checkbox" class="" id="' + name + '">');
                    if (control_field.required) input.attr('required', true);
                    div2.append(input);
                    div2.append($('<label for="' + name + '" class="">' + control_field.text + ':</label>'));
                    div2.append(form_div_div_error.clone());
                    div1.append(div2);
                    return div1;
                }
            };
        }
        return '';
    };
    //----------------------------------------------------------------------------------------
    //
    //
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
                        };





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

                });

            },

            Open: function (titlt, text, callback_ok) {
                return this.each(function () {

                    var $this = $(this),
                        data = $this.data('pl_dialog_confirm');
                    if (data) {
                        dialog_confirm = data.dialog_confirm;
                        dialog_confirm.Open(titlt, text, callback_ok);
                    }


                    //// пространства имён рулят!!11
                    //$(window).unbind('.dialog_confirm');
                    //data.dialog_confirm.remove();
                    //$this.removeData('pl_dialog_confirm');

                });
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
    //-----------------------------------------------------------------------------------------
    //
    //
    $.fn.dialog_add_edit = function (method) {

        var defaults = {
            lang: 'ru',
            user_name: null,
            fields: [],
            callback_ok: null,

        };

        var methods = {

            init: function (params) {

                var options = $.extend({}, defaults, params);

                return this.each(function () {

                    var $this = $(this),
                        id_control = $this.attr('id'),
                        data = $this.data('pl_dialog_add_edit'),
                        dialog_add_edit = (data) ? data.dialog_add_edit : null;

                    // Если плагин ещё не проинициализирован
                    if (!data) {

                        /*
                         * Тут выполняем инициализацию
                        */

                        // Создадим окно
                        $this = create_html_dialog_add_edit($this, options);
                        // Добавить элемент контроля
                        var add_control = function (control_field, id_name) {
                            if (control_field) {
                                var name = id_name + '_' + control_field.name;
                                switch (control_field.control) {
                                    case 'select': {
                                        var control = cd_initSelect(
                                            $('select#' + name),
                                            { lang: options.lang },
                                            control_field.list,
                                            null,
                                            -1,
                                            function (event) {
                                                event.preventDefault();
                                                var id = Number($(this).val());
                                            }, null);
                                        return control;
                                    }
                                }
                            }
                        };

                        dialog_add_edit = {
                            obj: null,
                            lang: options.lang,
                            user_name: options.user_name,
                            //ids_dir: null,
                            alert: $('div#' + id_control + '_alert'),                                             // Сообщения
                            all_obj: null,                                                              // массив всех элементов формы 
                            val: null,                                                                  // класс валидации
                            //select_id: null,                                                            // id строки
                            //select_obj: null,                                                           // строка
                            // Поля формы
                            controls: [],
                            //add_edit_cargo_group: $('select#add_edit_cargo_group'),
                            //add_edit_cargo_etsng: $('select#add_edit_cargo_etsng'),
                            //add_edit_cargo_name_ru: $('textarea#add_edit_cargo_name_ru'),
                            //add_edit_cargo_name_en: $('textarea#add_edit_cargo_name_en'),
                            //add_edit_code_sap: $('input#add_edit_code_sap'),
                            //add_edit_sending: $('input#add_edit_sending'),
                            // инициализвция Окна
                            init: function (callback_ok) {
                                //dialog_add_edit.lang = lang;
                                //dialog_add_edit.user_name = user_name;
                                //dialog_add_edit.ids_dir = new IDS_DIRECTORY(dialog_add_edit.lang), // Создадим класс IDS_DIRECTORY
                                //dialog_add_edit.loadReference(function () {
                                // Инициализация элементов

                                var control = options.fields.filter(function (i) {
                                    return i.control;
                                });

                                // Формируем поля
                                for (icontrol = 0; icontrol < control.length; icontrol++) {
                                    dialog_add_edit.controls.push(add_control(control[icontrol], id_control));
                                };

                                //dialog_add_edit.add_edit_cargo_group = cd_initSelect(
                                //    dialog_add_edit.add_edit_cargo_group,
                                //    { lang: dialog_add_edit.lang },
                                //    dialog_add_edit.ids_dir.getListCargoGroup('id', 'cargo_group_name', dialog_add_edit.lang, null),
                                //    null,
                                //    -1,
                                //    function (event) {
                                //        event.preventDefault();
                                //        var id = Number($(this).val());
                                //    }, null);
                                //dialog_add_edit.add_edit_cargo_etsng = cd_initSelect(
                                //    dialog_add_edit.add_edit_cargo_etsng,
                                //    { lang: dialog_add_edit.lang },
                                //    dialog_add_edit.ids_dir.getListCargoETSNG('id', 'cargo_etsng_name', dialog_add_edit.lang, null),
                                //    null,
                                //    -1,
                                //    function (event) {
                                //        event.preventDefault();
                                //        var id = Number($(this).val());
                                //    }, null);
                                //// Соберем все элементы в массив
                                //dialog_add_edit.all_obj = $([])
                                //    .add(dialog_add_edit.add_edit_cargo_group)
                                //    .add(dialog_add_edit.add_edit_cargo_etsng)
                                //    .add(dialog_add_edit.add_edit_cargo_name_ru)
                                //    .add(dialog_add_edit.add_edit_cargo_name_en)
                                //    .add(dialog_add_edit.add_edit_code_sap)
                                //    .add(dialog_add_edit.add_edit_sending)
                                //    ;
                                //// создадим классы 

                                //dialog_add_edit.val = new VALIDATION(dialog_add_edit.lang, dialog_add_edit.alert, dialog_add_edit.all_obj); // Создадим класс VALIDATION
                                dialog_add_edit.obj = $this.dialog({
                                    resizable: false,
                                    //title: 'Изменить группу груза',
                                    modal: true,
                                    autoOpen: false,
                                    height: "auto",
                                    width: 800,
                                    classes: {
                                        "ui-dialog": "card",
                                        "ui-dialog-titlebar": "card-header bg-primary text-white",
                                        "ui-dialog-content": "card-body",
                                        "ui-dialog-buttonpane": "card-footer text-muted"
                                    },
                                    open: function (event, ui) {

                                    },
                                    buttons: [
                                        {

                                            disabled: false,
                                            text: "Ок",
                                            class: "btn btn-outline-primary btn",
                                            click: function () {
                                                dialog_add_edit.save(options.callback_ok);
                                            }
                                        },
                                        {
                                            text: "Отмена",
                                            class: "btn btn-outline-primary btn",
                                            click: function () {
                                                $(this).dialog("close");
                                            }
                                        },
                                    ]
                                });
                                // Sumbit form
                                dialog_add_edit.obj.find("form").on("submit", function (event) {
                                    event.preventDefault();
                                });
                                //});

                            },
                            //// открыть окно добавмить вагоны вручную
                            Open: function () {
                                dialog_add_edit.obj.dialog("open");
                            },
                            save: function (callback_ok) {
                                if (typeof callback_ok === 'function') {
                                    dialog_add_edit.obj.dialog("close");
                                    callback_ok({ type: 0, result: 1 });
                                }
                            }
                            //Open: function (id) {
                            //    dialog_add_edit.select_id = id;
                            //    dialog_add_edit.select_obj = null;
                            //    if (dialog_add_edit.select_id) {
                            //        // Правим запись
                            //        dialog_add_edit.obj.dialog("option", "title", "Править груз");
                            //        dialog_add_edit.ids_dir.getCargoOfID(dialog_add_edit.select_id, function (result_obj) {
                            //            if (result_obj) {
                            //                dialog_add_edit.select_obj = result_obj;
                            //                dialog_add_edit.add_edit_cargo_group.val(result_obj.id_group);
                            //                dialog_add_edit.add_edit_cargo_etsng.val(result_obj.id_cargo_etsng);
                            //                dialog_add_edit.add_edit_cargo_name_ru.val(result_obj.cargo_name_ru);
                            //                dialog_add_edit.add_edit_cargo_name_en.val(result_obj.cargo_name_en);
                            //                dialog_add_edit.add_edit_code_sap.val(result_obj.code_sap);
                            //                dialog_add_edit.add_edit_sending.prop('checked', result_obj.sending);
                            //                dialog_add_edit.obj.dialog("open");

                            //            }
                            //            //else {
                            //            //    dialog_add_edit.val.clear_all();
                            //            //    dialog_add_edit.val.out_error_message("Ошибка. Не могу найти строку по id = " + dialog_add_edit.select_id);
                            //            //}
                            //        });




                            //    } else {
                            //        dialog_add_edit.obj.dialog("option", "title", "Добавить груз");
                            //        dialog_add_edit.add_edit_cargo_group.val(-1);
                            //        dialog_add_edit.add_edit_cargo_etsng.val(-1);
                            //        dialog_add_edit.add_edit_cargo_name_ru.val('');
                            //        dialog_add_edit.add_edit_cargo_name_en.val('');
                            //        dialog_add_edit.add_edit_code_sap.val('');
                            //        dialog_add_edit.add_edit_sending.prop('checked', false);
                            //        // Добавим запись
                            //        dialog_add_edit.obj.dialog("open");
                            //    }
                            //},
                            //// Валидация данных
                            //validation: function () {
                            //    dialog_add_edit.val.clear_all();
                            //    var valid = true;
                            //    valid = valid & dialog_add_edit.val.checkSelection(dialog_add_edit.add_edit_cargo_group, "Выберите группу");
                            //    valid = valid & dialog_add_edit.val.checkSelection(dialog_add_edit.add_edit_cargo_etsng, "Выберите груз из справочника ЕТ СНГ");
                            //    valid = valid & dialog_add_edit.val.checkInputOfNull(dialog_add_edit.add_edit_cargo_name_ru, "Не указано наименование груза на русском языке");
                            //    valid = valid & dialog_add_edit.val.checkInputOfNull(dialog_add_edit.add_edit_cargo_name_en, "Не указано наименование груза на английском языке");
                            //    return valid;
                            //},
                            //// Сохранить прибытие состава
                            //save: function (callback_ok) {
                            //    var valid = dialog_add_edit.validation();
                            //    if (valid) {
                            //        var new_object = dialog_add_edit.get_object();

                            //        if (dialog_add_edit.select_obj) {
                            //            // Править
                            //            dialog_add_edit.ids_dir.putCargo(new_object, function (result_upd) {
                            //                if (result_upd > 0) {
                            //                    if (typeof callback_ok === 'function') {
                            //                        dialog_add_edit.obj.dialog("close");
                            //                        callback_ok({ type: 0, result: result_upd });
                            //                    }
                            //                } else {
                            //                    dialog_add_edit.val.clear_all();
                            //                    dialog_add_edit.val.out_error_message("Ошибка. При обновлении строки грузов, произошла ошибка!");
                            //                    LockScreenOff();
                            //                }
                            //            });
                            //        } else {
                            //            // добавить
                            //            dialog_add_edit.ids_dir.postCargo(new_object, function (result_add) {
                            //                if (result_add > 0) {
                            //                    if (typeof callback_ok === 'function') {
                            //                        dialog_add_edit.obj.dialog("close");
                            //                        callback_ok({ type: 1, result: result_add });
                            //                    }
                            //                } else {
                            //                    dialog_add_edit.val.clear_all();
                            //                    dialog_add_edit.val.out_error_message("Ошибка. При добавлении строки грузов, произошла ошибка!");
                            //                    LockScreenOff();
                            //                }
                            //            });
                            //        }
                            //    }
                            //},
                            //// Получить новый груз с измененной группой
                            //get_object: function () {
                            //    return {
                            //        id: dialog_add_edit.select_obj ? dialog_add_edit.select_obj.id : 0,
                            //        id_group: get_select_number_value(dialog_add_edit.add_edit_cargo_group),
                            //        id_cargo_etsng: get_select_number_value(dialog_add_edit.add_edit_cargo_etsng),
                            //        cargo_name_ru: dialog_add_edit.add_edit_cargo_name_ru.val(),
                            //        cargo_name_en: dialog_add_edit.add_edit_cargo_name_en.val(),
                            //        code_sap: dialog_add_edit.add_edit_code_sap.val(),
                            //        sending: dialog_add_edit.add_edit_sending.prop('checked'),
                            //        create: dialog_add_edit.select_obj ? dialog_add_edit.select_obj.create : toISOStringTZ(new Date()),
                            //        create_user: dialog_add_edit.select_obj ? dialog_add_edit.select_obj.create_user : dialog_add_edit.user_name,
                            //        change: dialog_add_edit.select_obj ? toISOStringTZ(new Date()) : null,
                            //        change_user: dialog_add_edit.select_obj ? dialog_add_edit.user_name : null,
                            //    }
                            //},
                        };

                        dialog_add_edit.init(options.callback_ok);





                        //dialog_add_edit = {
                        //    result: false,
                        //    callback_ok: null,
                        //    obj: $this.dialog({
                        //        resizable: false,
                        //        autoOpen: false,
                        //        height: "auto",
                        //        width: 500,
                        //        modal: true,
                        //        open: function (event, ui) {
                        //        },
                        //        close: function (event, ui) {
                        //            if (typeof dialog_confirm.callback_ok === 'function') {
                        //                dialog_confirm.callback_ok(dialog_confirm.result);
                        //            }
                        //        },
                        //        classes: {
                        //            "ui-dialog": "card",
                        //            "ui-dialog-titlebar": "card-header bg-primary text-white",
                        //            "ui-dialog-content": "card-body",
                        //            "ui-dialog-buttonpane": "card-footer text-muted"
                        //        },
                        //        buttons: [
                        //            {
                        //                text: "Ок",
                        //                class: "btn btn-outline-primary btn-sm",
                        //                click: function () {
                        //                    dialog_confirm.result = true;
                        //                    $(this).dialog("close");
                        //                }
                        //            },
                        //            {
                        //                text: "Отмена",
                        //                class: "btn btn-outline-primary btn-sm",
                        //                click: function () {
                        //                    $(this).dialog("close");
                        //                }
                        //            }]
                        //    }),
                        //    Open: function (titlt, text, callback_ok) {
                        //        dialog_confirm.result = false;
                        //        dialog_confirm.obj.dialog("option", "title", titlt);
                        //        $('p#dialog-confirm-text').text(text);
                        //        dialog_confirm.callback_ok = callback_ok;
                        //        dialog_confirm.obj.dialog("open");
                        //    }
                        //}

                        $(this).data('pl_dialog_add_edit', {
                            target: $this,
                            dialog_add_edit: dialog_add_edit
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

                });

            },

            Open: function () {
                return this.each(function () {
                    var $this = $(this),
                        data = $this.data('pl_dialog_add_edit');
                    if (data) {
                        dialog_add_edit = data.dialog_add_edit;
                        dialog_add_edit.Open();
                    }

                });
            },
        };
        // Создадим и добавим на страницу html код формы 
        var create_html_dialog_add_edit = function (el, options) {
            // Создадим окно
            var id_control = el.attr('id');
            if (id_control && options && options.fields) {
                var html_alert = $('<div class="alert" id="' + id_control + '_alert"></div>');
                var html_form = $('<form id="form_' + id_control + '"></form>');
                // Формируем поля
                for (ic = 0; ic < options.fields.length; ic++) {
                    html_form.append(get_control(options.fields[ic], id_control));
                };
                html_form.append(form_input_sumbit);
                el.append(html_alert);
                el.append(html_form);
                el.attr('style', "display:none");
            }
            return el;
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.dialog_add_edit');
        }

    };

})(jQuery);