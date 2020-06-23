jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {

            },
            'en':  //default language: English
            {

            }
        };

    //*************************************************************************************
    // ОБЪЯВЛЕНИЕ ОСНОВНЫХ ОБЪЕКТОВ ПРИЛОЖЕНИЯ
    //*************************************************************************************
    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        ids_dir = new IDS_DIRECTORY(lang), // Создадим класс IDS_DIRECTORY
        // Загрузка основных справочников приложения
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            ids_dir.load(['cargo', 'cargo_group', 'cargo_etsng'], false, function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        },
        dae = null,
        bt = $('button#test').on('click', function (event) {
            //dae.dialog_add_edit("Open", "1", "2", function (result) {

            //});
            ids_dir.getCargoOfID(10, function (result_obj) {
                if (result_obj) {
                    dae.dialog_add_edit("Open", result_obj);
                }
            });
        });
            //================================================================
            // Основной вход
            //=================================================================
            loadReference(function () {

                dae = $('div#dae').dialog_add_edit({
                    fields: [
                        { name: 'id', type: 'number', control: null, text: null, required: true, message_error: null},
                        { name: 'id_group', type: 'number', control: 'select', text: 'Группа груза', required: true, list: ids_dir.getListCargoGroup('id', 'cargo_group_name', lang, null), message_error: "Выберите группу"  },
                        { name: 'id_cargo_etsng', type: 'number', control: 'select', text: 'Груз ЕТ СНГ', required: true, list: ids_dir.getListCargoETSNG('id', 'cargo_etsng_name', lang, null), message_error: "Выберите груз из справочника ЕТ СНГ" },
                        { name: 'cargo_name_ru', type: 'text', control: 'textarea', text: 'Наименование в ИДС (рус.)', required: true, list: null, message_error: "Не указано наименование груза в ИДС (рус.)" },
                        { name: 'cargo_name_en', type: 'text', control: 'textarea', text: 'Наименование в ИДС (анг.)', required: true, list: null, message_error: "Не указано наименование груза в ИДС (анг.)" },
                        { name: 'code_sap', type: 'text', control: 'input', text: 'Кол в SAP', required: false, list: null, message_error: null },
                        { name: 'sending', type: 'bit', control: 'checkbox', text: 'Отправляемые', required: false, list: null, message_error: null  },
                        { name: 'create', type: 'datetime', control: null, text: null, required: true, list: null, message_error: null  },
                        { name: 'create_user', type: 'text', control: null, text: null, required: true, list: null , message_error: null },
                        { name: 'change', type: 'datetime', control: null, text: null, required: false, list: null, message_error: null  },
                        { name: 'change_user', type: 'text', control: null, text: null, required: false, list: null, message_error: null  }
                    ],
                    lang: lang,
                    user_name: user_name,
                    callback_ok: function (result) {

                    },
                    title : 'Справочника Грузов',

                });
            });

        });