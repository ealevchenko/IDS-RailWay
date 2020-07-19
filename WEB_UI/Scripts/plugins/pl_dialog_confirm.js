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
    // Добавить элемент контроля
    var add_control = function (control_field, id_name, controls, options) {
        if (control_field) {
            var name = id_name + '_' + control_field.name;
            var control;
            switch (control_field.control) {
                case 'select': {
                    control = cd_initSelect(
                        $('select#' + name),
                        { lang: options.lang },
                        control_field.list,
                        null,
                        -1,
                        function (event) {
                            event.preventDefault();
                            var id = Number($(this).val());
                        }, null);
                    controls[name] = control;
                    return control;
                };
                case 'textarea': {
                    control = $('textarea#' + name).val('');
                    controls[name] = control;
                    return control;
                };
                case 'input': {
                    control = $('input#' + name).val('');
                    controls[name] = control;
                    return control;
                };
                case 'checkbox': {
                    control = $('input#' + name).val('');
                    controls[name] = control;
                    return control;
                };
            }
        }
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
            title: 'справочника',
            validation_callback: null,
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

                        dialog_add_edit = {
                            obj: null,
                            lang: options.lang,
                            user_name: options.user_name,
                            //ids_dir: null,
                            alert: $('div#' + id_control + '_alert'),                                       // Сообщения
                            all_obj: null,                                                                  // массив всех элементов формы 
                            val: null,                                                                      // класс валидации
                            //select_id: null,                                                              // id строки
                            row: null,                                                                          // строка
                            list_controls: options.fields.filter(function (i) { return i.control; }),           // Список полей по которым заданы Conrols
                            // Поля формы
                            controls: [],
                            // инициализвция Окна
                            init: function (callback_ok) {
                                //dialog_add_edit.lang = lang;
                                //dialog_add_edit.user_name = user_name;
                                //dialog_add_edit.ids_dir = new IDS_DIRECTORY(dialog_add_edit.lang), // Создадим класс IDS_DIRECTORY
                                //dialog_add_edit.loadReference(function () {
                                // Инициализация элементов
                                // Список всех элементов
                                dialog_add_edit.all_obj = $([]);
                                // Пройдемся по всем элементам выбора и инициализируем их
                                if (dialog_add_edit.list_controls && dialog_add_edit.list_controls.length > 0) {
                                    // Формируем элементы выбора (controls)
                                    for (icontrol = 0; icontrol < dialog_add_edit.list_controls.length; icontrol++) {
                                        dialog_add_edit.all_obj.push(add_control(dialog_add_edit.list_controls[icontrol], id_control, dialog_add_edit.controls, options)[0]);
                                    };
                                }
                                // создадим классы 
                                dialog_add_edit.val = new VALIDATION(dialog_add_edit.lang, dialog_add_edit.alert, dialog_add_edit.all_obj); // Создадим класс VALIDATION
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
                            Open: function (row) {
                                dialog_add_edit.row = row;
                                if (row) {
                                    // Правка
                                    dialog_add_edit.obj.dialog("option", "title", "Править строку " + options.title);
                                    // Пройдемся по всем элементам выбора и заполним их
                                    if (dialog_add_edit.list_controls && dialog_add_edit.list_controls.length > 0) {
                                        for (ivc = 0; ivc < dialog_add_edit.list_controls.length; ivc++) {
                                            // получим имя элемента выбора
                                            var name = id_control + '_' + dialog_add_edit.list_controls[ivc].name;
                                            var value = row[dialog_add_edit.list_controls[ivc].name];
                                            if (dialog_add_edit.list_controls[ivc].control !== 'checkbox') {
                                                dialog_add_edit.controls[name].val(value);
                                            } else {
                                                dialog_add_edit.controls[name].prop('checked', value);
                                            }
                                        };
                                    }

                                } else {
                                    // добавить
                                    dialog_add_edit.obj.dialog("option", "title", "Добавить строку " + options.title);
                                }
                                dialog_add_edit.obj.dialog("open");
                            },
                            save: function (callback_ok) {
                                var valid = dialog_add_edit.validation();
                                if (valid) {
                                    if (typeof callback_ok === 'function') {
                                        dialog_add_edit.obj.dialog("close");
                                        callback_ok({ type: 0, result: 1 });
                                    }
                                }


                            },
                            // Валидация данных
                            validation: function () {
                                dialog_add_edit.val.clear_all();
                                // Проверим задана функция пользовательской валидаци
                                if (typeof options.validation_callback === 'function') {
                                    // Да, выполним пользовательскую валидацию
                                    return options.validation_callback();
                                } else {
                                    // Нет, выполним валидацию по умолчанию
                                    var valid = true;
                                    // Пройдемся по всем элементам выбора и выполним валидацию
                                    if (dialog_add_edit.list_controls && dialog_add_edit.list_controls.length > 0) {
                                        for (ivalid = 0; ivalid < dialog_add_edit.list_controls.length; ivalid++) {
                                            var valid_control = dialog_add_edit.list_controls[ivalid];
                                            var name = id_control + '_' + valid_control.name;
                                            if (valid_control.required) {
                                                // Поле обязательно тогда валидация
                                                switch (valid_control.control) {
                                                    case 'select': {
                                                        valid = valid & dialog_add_edit.val.checkSelection(dialog_add_edit.controls[name], valid_control.message_error);
                                                        break;
                                                    }
                                                    case 'textarea': {
                                                        valid = valid & dialog_add_edit.val.checkInputOfNull(dialog_add_edit.controls[name], valid_control.message_error);
                                                        break;
                                                    }
                                                    case 'input': {
                                                        valid = valid & dialog_add_edit.val.checkInputOfNull(dialog_add_edit.controls[name], valid_control.message_error);
                                                        break;
                                                    }
                                                    case 'checkbox': {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    return valid;
                                }
                            },
                            // Вернуть новую или обнавленную строку
                            get_object: function () {
                                if (dialog_add_edit.row) {
                                    //
                                }
                                var new_obj;
                                // Формируем поля
                                for (ifo = 0; ifo < options.fields.length; ifo++) {
                                    var fl = options.fields[ifo];

                                    var name = id_control + '_' + fl.name;
                                    //new_obj[options.fields[ifo].name] = !fl.control && dialog_add_edit.row ? dialog_add_edit.row[fl.name] : 
                                };

                                return {
                                    id: dialog_add_edit.select_obj ? dialog_add_edit.select_obj.id : 0,
                                    id_group: get_select_number_value(dialog_add_edit.add_edit_cargo_group),
                                    id_cargo_etsng: get_select_number_value(dialog_add_edit.add_edit_cargo_etsng),
                                    cargo_name_ru: dialog_add_edit.add_edit_cargo_name_ru.val(),
                                    cargo_name_en: dialog_add_edit.add_edit_cargo_name_en.val(),
                                    code_sap: dialog_add_edit.add_edit_code_sap.val(),
                                    sending: dialog_add_edit.add_edit_sending.prop('checked'),
                                    create: dialog_add_edit.select_obj ? dialog_add_edit.select_obj.create : toISOStringTZ(new Date()),
                                    create_user: dialog_add_edit.select_obj ? dialog_add_edit.select_obj.create_user : dialog_add_edit.user_name,
                                    change: dialog_add_edit.select_obj ? toISOStringTZ(new Date()) : null,
                                    change_user: dialog_add_edit.select_obj ? dialog_add_edit.user_name : null,
                                }
                            },


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

            Open: function (row) {
                return this.each(function () {
                    var $this = $(this),
                        data = $this.data('pl_dialog_add_edit');
                    if (data) {
                        dialog_add_edit = data.dialog_add_edit;
                        dialog_add_edit.Open(row);
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