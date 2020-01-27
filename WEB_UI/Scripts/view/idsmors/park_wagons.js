jQuery(document).ready(function ($) {

    // Массив текстовых сообщений 
    $.Text_View =
        {
            'default':  //default language: ru
            {
                //'mess_load_ids_dir': 'Загрузка справочников (Справочники ИДС - загружены)...',
                //'mess_load_uz_dir': 'Загрузка справочников (Справочники УЗ - загружены)...',

                //'field_num': '№ вагона',
                //'field_genus_wagon': 'Род вагона',
                //'field_state': 'Государство собственник',
                //'field_wagon_manufacturer': 'Завод изготовитель',
                //'field_year_wagon_create': 'Год постройки',
                //'field_station': 'Станция приписки',
                //'field_carrying_capacity': 'Грузоподъемность, тонн',
                //'field_tara': 'Тара, тонн',
                //'field_type_repairs': 'Тип планируемого ремонта',
                //'field_date_type_repairs': 'Дата планируемого ремонта',
                //'field_code_model_wagon': 'Модель',
                //'field_type_wagon': 'Тип подвижного состава',
                //'field_axis_length': 'Длина по осям, м',
                //'field_body_volume': 'Объем кузова',
                //'field_type_ownership': 'Признак собственности',
                //'field_owner_wagon': 'Собственник',
                //'field_date_registration': 'Дата последней регистрации',
                //'field_lessor_wagon': 'Арендодатель',
                //'field_operator_wagon': 'Оперативное управление',
                //'field_poligon_travel_wagon': 'Полигон курсирования',
                //'field_special_conditions': 'Особые условия',
                //'field_sap': 'SAP',

                //'text_link_tabs_control_1': 'Характеристики',
                //'text_link_tabs_control_2': 'Ремонты',
            },
            'en':  //default language: English
            {
                //'mess_load_ids_dir': 'Loading directories (IID directories - loaded) ...',
                //'mess_load_uz_dir': 'Downloading directories (UZ directories - loaded) ...',

                //'field_num': '# wagon',
                //'field_genus_wagon': 'Rod wagon',
                //'field_state': 'State Owner',
                //'field_wagon_manufacturer': 'Завод изготовитель',
                //'field_year_wagon_create': 'Год постройки',
                //'field_station': 'Станция приписки',
                //'field_carrying_capacity': 'Грузоподъемность, тонн',
                //'field_tara': 'Тара, тонн',
                //'field_type_repairs': 'Тип планируемого ремонта',
                //'field_date_type_repairs': 'Дата планируемого ремонта',
                //'field_code_model_wagon': 'Модель',
                //'field_type_wagon': 'Тип подвижного состава',
                //'field_axis_length': 'Длина по осям, м',
                //'field_body_volume': 'Объем кузова',
                //'field_type_ownership': 'Признак собственности',
                //'field_owner_wagon': 'Собственник',
                //'field_date_registration': 'Дата последней регистрации',
                //'field_lessor_wagon': 'Арендодатель',
                //'field_operator_wagon': 'Оперативное управление',
                //'field_poligon_travel_wagon': 'Полигон курсирования',
                //'field_special_conditions': 'Особые условия',
                //'field_sap': 'SAP',
            }
        };


    //--------------------------------------------------------------------------------

    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
        langs = $.extend(true, $.extend(true, getLanguages($.Text_View, lang), getLanguages($.Text_Common, lang)), getLanguages($.Text_Table, lang)),
        user_name = $('input#username').val(),
        mors = new IDS_MORS(lang), // Создадим класс IDS_MORS
        loadReference = function (callback) {
            LockScreen(langView('mess_load', langs));
            var count = 1;
            mors.load(['ids', 'uz', 'park_wagons'], function () {
                count -= 1;
                if (count === 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        },
        // элементы окна
        select_park_wagon = null,
        // Обновить компонент список парков
        update_list_park = function (id_park) {
            select_park_wagon = cd_initSelect(
                    $('select#select-park-wagon'),
                    { lang: lang },
                    mors.getListParksWagons('id', 'name_park', lang),
                    null,
                    id_park ? Number(id_park) : -1,
                    function (event) {
                        event.preventDefault();
                        var id = $(this).val();
                    },
                    null);

        },
        // Панель "Править название парка"
        pn_edit_park_name = {
            obj: null,
            id: null,
            name_park_wagon_ru: $('input#name-park-wagon-ru'),
            name_park_wagon_en: $('input#name-park-wagon-en'),
            alert_park_wagon: $('#edit-park-name-alert'),
            // список парков
            list_park_wagons: null,
            lang: ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang')),
            mors: null,
            val: null,
            loadReference: function (callback) {
                // загрузим список парков
                if (!pn_edit_park_name.list_park_wagons) {
                    pn_edit_park_name.mors.load(['park_wagons'], function () {
                        pn_edit_park_name.list_park_wagons = pn_edit_park_name.mors.list_park_wagons;
                        if (typeof callback === 'function') {
                            callback();
                        }
                    });
                } else {
                    callback();
                }
            },
            validation: function () {
                pn_edit_park_name.val.clear_error($('form#form-park-name'));
                var valid = true;
                valid = valid & pn_edit_park_name.val.checkInputOfNull(pn_edit_park_name.name_park_wagon_ru, "Укажите название парка на русском");
                valid = valid & pn_edit_park_name.val.checkInputOfNull(pn_edit_park_name.name_park_wagon_en, "Укажите название парка на английском");
                return valid;
            },
            init: function (list_park_wagons, callback_ok) {
                pn_edit_park_name.list_park_wagons = list_park_wagons;
                this.mors = new IDS_MORS(pn_edit_park_name.lang); // Создадим класс IDS_MORS
                this.val = new VALIDATION(pn_edit_park_name.lang, pn_edit_park_name.alert_park_wagon); // Создадим класс VALIDATION
                pn_edit_park_name.obj = $("div#edit-park-name").dialog({
                    resizable: false,
                    modal: true,
                    autoOpen: false,
                    height: "auto",
                    width: 500,
                    buttons: [
                      {
                          text: "Сохранить",
                          class: "btn btn-warning btn-lg",
                          click: function () {
                              var valid = pn_edit_park_name.validation();
                              if (valid) {
                                  var park = pn_edit_park_name.getNew();
                                  if (pn_edit_park_name.id) {
                                      // править

                                  } else {
                                      // добавить
                                      pn_edit_park_name.mors.postParksWagons(park,
                                          function (result_add) {
                                              if (result_add > 0) {
                                                  // Ок
                                                  pn_edit_park_name.obj.dialog("close");
                                                  if (typeof callback_ok === 'function') {
                                                      callback_ok(result_add);
                                                  }
                                              } else {
                                                  pn_edit_park_name.val.clear_message();
                                                  pn_edit_park_name.val.out_error_message("При добавлении нового парка произошла ошибка!");
                                              }
                                          })
                                  }
                              }
                          }
                      },
                      {
                          text: "Отмена",
                          class: "btn btn-warning btn-lg",
                          click: function () {
                              $(this).dialog("close");
                          }
                      },
                    ]
                });
            },
            Open: function (id) {
                pn_edit_park_name.id = id;
                pn_edit_park_name.loadReference(function () {
                    pn_edit_park_name.obj.dialog("open");
                    if (id) {
                        pn_edit_park_name.obj.dialog("option", "title", 'Изменить название парка подвижного состава');
                    } else {
                        pn_edit_park_name.obj.dialog("option", "title", 'Добавить парк подвижного состава');
                    }
                })


                //if (id) {
                //    // пистолеты
                //    if (trk_num > 0 && trk_num < 10) {
                //        confirm_rfid_card.obj.dialog("option", "title", 'RFID-карта (Колонка №' + trk_num + ', сторона :' + (side == 0 ? 'левая' : 'правая') + ')');
                //    }
                //    // Наливной стояк
                //    if (trk_num >= 10 && trk_num <= 12) {
                //        var num = trk_num - 9;
                //        confirm_rfid_card.obj.dialog("option", "title", 'RFID-карта (Наливной стояк №' + num + ')');
                //    }

                //    var card = cards.getCardOfNumSide(trk_num, side);
                //    if (card) {
                //        $('#id').val(card.Id);
                //        $('#Number').val(card.Number);
                //        $('#DriverName').val(card.DriverName);
                //        $('#AutoNumber').val(card.AutoNumber);
                //        $('#Debitor').val(card.Debitor);
                //        $('#Sn1').val(card.Sn1);
                //        $('#Sn2').val(card.Sn2);
                //        $('#AutoModel').val(card.AutoModel);
                //        $('#Street').val(card.Street);
                //        $('#House').val(card.Name);
                //        $('#CreateDate').val(card.CreateDate);
                //        $('#CreateTime').val(card.CreateTime);
                //        $('#UpdateDate').val(card.UpdateDate);
                //        $('#UpdateTime').val(card.UpdateTime);
                //        $('#Owner').val(card.Owner);
                //        $('#Active').prop('checked', card.Active);
                //    }
                //}
            },
            getNew: function () {
                return {
                    id: (pn_edit_park_name.id ? pn_edit_park_name.id : 0),
                    name_park_ru: pn_edit_park_name.name_park_wagon_ru.val(),
                    name_park_en: pn_edit_park_name.name_park_wagon_en.val(),
                }
            }
        };

    //================================================================
    // Основной вход
    //=================================================================
    // Добавить парк
    $('button#add-park').on('click', function () {
        pn_edit_park_name.Open();
    });
    // Инициализация
    pn_edit_park_name.init(null, function (result) {
        var id = result;
        mors.loadParksWagons(function (result) {
            update_list_park(id)
        })
    });
    // Загрузка основных библиотек
    loadReference(function (result) {
        update_list_park()
    });





});

