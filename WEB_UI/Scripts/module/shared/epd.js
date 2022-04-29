//Модуль набора методов работы с ЭПД УЗ

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

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //================================================================================
    // Класс для создания объектов контроля для элементов HTML
    //--------------------------------Конструктор и инициализация---------------
    // создать класс
    function epd() {

    };
    //-----------------------------------------------------------------------------
    //-- Функции обработки информации из ЭПД
    //-----------------------------------------------------------------------------
    // Функция чтения всех необходимых полей ЭПД
    epd.prototype.get_all_field_epd = function (main_otpr, otpr, num) {
        var epd = {};           // сбросим
        epd.route = {};         // сбросим
        epd.client = {};        // сбросим
        epd.vagon = {};         // сбросим вагоны основной документ
        epd.cont = {};          // сбросим контейнеры основной документ
        epd.vagon_new = {};     // сбросим вагоны досылочный документ
        epd.cont_new = {};      // сбросим контейнеры досылочный документ
        epd.pl = {};            // сбросим платильщика
        epd.cargo = {};         // сбросим груз
        epd.zayava = null;      // сбросим Особливі відмітки відправника
        epd.vagon_nom_zpu = null;      // сбросим Номер ЗПП
        epd.num = num;
        // Получим данные по основному ЭПД
        if (main_otpr) {
            epd.vagon = this.get_vagon_epd(main_otpr, num);
            epd.cont = this.get_vagon_cont_epd(main_otpr, num);
            epd.nom_main_doc = main_otpr.nom_doc;
            // Тарифное расстояние
            epd.distance_way = main_otpr.distance_way;
            epd.vagon_pay_summa = null; // Сбросим посчитаем позже (Раздел VAGON)
            //------------------------------------------------------------------
            // Раздел TEXT станции отправки и прибытия и коды администрации отпр и прибытия

            if (main_otpr.text && main_otpr.text)
                epd.zayava = main_otpr.text.zayava;
            //----------------------------------------------------------
            // Раздел ROUTE станции отправки и прибытия и коды администрации отпр и прибытия
            if (main_otpr.route && main_otpr.route.length > 0) {
                var route = main_otpr.route[0];
                // Данные по умолчанию
                epd.route.stn_from = route.stn_from; //887500;
                epd.route.name_from = route.name_from; //'АБАЗА'
                epd.route.stn_to = route.stn_to;
                epd.route.name_to = route.name_to;
                // Определим "Погран переход"
                if (route.joint.length > 0) {
                    for (var i = 0; i < route.joint.length; i++) {
                        var joint = route.joint[i];
                        if (joint.admin === 22) {
                            epd.route.joint_cross_time = joint.cross_time;
                            epd.route.joint_stn = joint.stn;//887500;
                            epd.route.joint_stn_name = joint.stn_name;//'АБАЗА'
                        }
                    }
                }
            };
            //---------------------------------------------------------------
            // Раздел CLIENT Определим Грузополучтеля
            if (main_otpr && main_otpr.client && main_otpr.client.length > 0) {
                var clients = main_otpr.client;
                clients.forEach(function (el, i, arr) {
                    if (Number(el.type) === 1) {
                        epd.client.kod_from = el.kod;//1;
                        epd.client.name_from = el.name; //"Тестовый грузоотправитель";
                    };
                    if (Number(el.type) === 2) {
                        epd.client.kod_on = el.kod;
                        epd.client.name_on = el.name;
                    };
                }.bind(this));
            }
            //-------------------------------------------------------------------
            // Раздел PL Определим платильщтка по прибытию
            var pl = null;
            if (main_otpr && main_otpr.pl && main_otpr.pl.length > 0) {
                if (main_otpr.pl.length === 1) {
                    // если плательщик один тогда берем его
                    pl = main_otpr.pl[0];
                } else {
                    // если плательщиков много тогда берем только УЗ или только отправителя type=0
                    for (var i = 0; i < main_otpr.pl.length; i++) {
                        if (Number(main_otpr.pl[i].carrier_kod) === 22 || Number(main_otpr.pl[i].type) === 0) {
                            pl = main_otpr.pl[i];
                            break;
                        }
                    }
                }
                if (pl) {
                    epd.pl.kod_plat = pl.kod_plat;      //'090909'; 
                    epd.pl.name_plat = pl.name_plat;    //'TEST';
                }
            }
            //-------------------------------------------------------------------
            // Раздел VAGON 
            if (epd.vagon && epd.vagon.nomer) {
                // Раздел VAGON/PAY_V
                if (epd.vagon.pay_v && epd.vagon.pay_v.length > 0) {
                    //Тариф при выдачи
                    epd.vagon_pay_summa = this.get_pay_summa(epd.vagon.pay_v);
                };
                // Раздел VAGON/ZPU_V
                if (epd.vagon.zpu_v && epd.vagon.zpu_v.length > 0) {
                    // Номер ЗПУ
                    epd.vagon_nom_zpu = vagon.zpu_v[0].nom_zpu;
                };
                // Определим груз ! далее если есть контейнеры уточним по ним
                epd.cargo = this.get_epd_cargo_vagon(epd.vagon);
            }
            // Раздел CONT
            if (epd.cont && epd.cont.nom_vag) {
                // Указаны контейнеры, уточним груз
                epd.cargo = this.get_epd_cargo_cont(epd.cont);
            };

        }
        // Получим данные по досылочному документу
        if (otpr) {
            epd.vagon_new = this.get_vagon_epd(otpr, num);
            epd.cont_new = this.get_vagon_cont_epd(otpr, num);
            epd.nom_doc = otpr.nom_doc;
        }
        return epd;
    };
    // Получить информацию по вагону из документа ЭПД
    epd.prototype.get_vagon_epd = function (otpr, num) {
        if (otpr && otpr.vagon && otpr.vagon.length > 0) {
            for (var i = 0; i < otpr.vagon.length; i++) {
                if (Number(otpr.vagon[i].nomer) === num)
                    return otpr.vagon[i];
            }
        }
        return null;
    };
    // Получить информацию по контейнеру из документа ЭПД
    epd.prototype.get_vagon_cont_epd = function (otpr, num) {
        if (otpr && otpr.cont && otpr.cont.length > 0) {
            var conts = otpr.cont.filter(function (i) {
                if (Number(i.nom_vag) === cars_detali.select_num) return true; else return false;
            });
            return conts ? conts : null;
        }
        return null;
    };
    // Получить документы по ЭПД
    epd.prototype.get_sender_doc = function (otpr) {
        if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
            return otpr.sender_doc
        } else {
            return []
        }
    };
    // Получить акты по ЭПД
    epd.prototype.get_wagon_acts = function (otpr, num) {
        var acts = [];
        if (otpr && otpr.acts && otpr.acts.length > 0) {
            if (num) {
                acts = otpr.acts.filter(function (i) {
                    if (Number(i.vagon_nom) === num) return true; else return false; // вернуть акты по указаному вагону
                });
            } else {
                acts = otpr.acts.filter(function (i) {
                    if (i.vagon_nom) return false; else return true; // вернуть акты без вагона
                });
            }
        }
        return acts
    };
    // Получить тариф при выдаче
    epd.prototype.get_pay_summa = function (pays) {
        var pl_summ = 0;
        if (pays && pays.length > 0) {
            for (var i = 0; i < pays.length; i++) {
                if (Number(pays[i].kod) === 1 || Number(pays[i].kod) === 21) {
                    pl_summ += pays[i].summa ? Number(pays[i].summa) : 0;
                }
            }
        }
        return pl_summ;
    };
    // Показать груз и группу ет снг вагона
    epd.prototype.get_epd_cargo_vagon = function (vagon) {
        var cargo = {};
        if (vagon && vagon.collect_v && vagon.collect_v.length > 0) {
            cargo.kod_etsng = vagon.collect_v[0].kod_etsng ? Number(vagon.collect_v[0].kod_etsng) : null;
            cargo.name_etsng = vagon.collect_v[0].name_etsng;
            cargo.kod_gng = vagon.collect_v[0].kod_gng ? Number(vagon.collect_v[0].kod_gng) : null;
            cargo.name_gng = vagon.collect_v[0].name_gng;
            cargo.kol_pac = vagon.collect_v[0].kol_pac;
            cargo.vesg = vagon.collect_v[0].vesg;
            cargo.danger = vagon.collect_v[0].danger; // класс опасности
            cargo.danger_kod = vagon.collect_v[0].danger_kod; // код опасности
            // Тест
            //cargo.kod_etsng = 99999;
            //cargo.name_etsng = "Тест";
            //cargo.kod_gng = 99999;
            //cargo.name_gng = "Тест";
        }
        return cargo;
    };
    // Показать груз и группу ет снг контейнеров вагона
    epd.prototype.get_epd_cargo_cont = function (conts) {
        if (conts && conts.length > 0) {
            // ! берем груз первого контейнера
            cargo.kod_etsng = conts[0].collect_k.kod_etsng ? Number(conts[0].collect_k.kod_etsng) : null;
            cargo.name_etsng = conts[0].collect_k.name_etsng;
            cargo.kod_gng = conts[0].collect_k.kod_gng ? Number(conts[0].collect_k.kod_gng) : null;
            cargo.name_gng = conts[0].collect_k.name_gng;
            // Уточним количество пас. мест был определен в разделе Vagon
            if (cargo.kol_pac === null || cargo.kol_pac === 0) {
                cargo.kol_pac = 0;
                for (var i = 0; i < conts.length; i++) {
                    cargo.kol_pac += conts[i].collect_k.kol_pac ? Number(conts[i].collect_k.kol_pac) : 0;
                }
            }
            // Уточним вес груза был определен в разделе Vagon
            if (cargo.vesg === null || cargo.vesg === 0) {
                cargo.vesg = 0;
                for (var i = 0; i < conts.length; i++) {
                    cargo.vesg += conts[i].collect_k.vesg ? Number(conts[i].collect_k.vesg) : 0;
                }
            };
            // Уточним класс опасности был определен в разделе Vagon
            cargo.danger = cargo.danger ? conts[0].collect_k.danger : cargo.danger; // класс опасности
            cargo.danger_kod = cargo.danger_kod ? conts[0].collect_k.danger_kod : cargo.danger_kod; // код опасности
        }
    };

    App.epd = epd;

    window.App = App;

})(window);