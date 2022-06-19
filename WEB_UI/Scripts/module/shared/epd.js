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
        epd.main_doc_pay = []   // все платильщики для сохранения (основной документ)
        epd.doc_pay = []        // все платильщики для сохранения (досылочный)
        epd.main_doc_acts = []  // все акты для сохранения (основной документ)
        epd.doc_acts = []       // все акты для сохранения (досылочный)
        epd.main_doc_docs = []  // все документы для сохранения (основной документ)
        epd.doc_docs = []       // все документы для сохранения (досылочный)
        epd.main_doc_conts = []  // все документы для сохранения (основной документ)
        epd.doc_conts = []       // все документы для сохранения (досылочный)
        epd.main_doc_vagon_pay = []   // все платильщики для сохранения (основной документ вагон)
        epd.doc_vagon_pay = []        // все платильщики для сохранения (досылочный документ вагон)
        epd.main_doc_vagon_acts = []  // все акты на вагон для сохранения (основной документ)
        epd.doc_vagon_acts = []       // все акты на вагон для сохранения (досылочный)

        epd.cargo = {};         // сбросим груз
        epd.zayava = null;      // сбросим Особливі відмітки відправника
        epd.vagon_nom_zpu = null;      // сбросим Номер ЗПП
        epd.num = num;
        // Получим данные по основному ЭПД
        if (main_otpr) {
            epd.nom_main_doc = main_otpr.nom_doc;
            epd.vagon = this.get_vagon_epd(main_otpr, num);
            epd.cont = this.get_vagon_cont_epd(main_otpr, num);
            // Тарифное расстояние
            epd.distance_way = main_otpr.distance_way;
            epd.vagon_pay_summa = null; // Сбросим посчитаем позже (Раздел VAGON)
            //------------------------------------------------------------------
            // Раздел ACTS
            epd.main_doc_acts = this.get_doc_acts(main_otpr);
            epd.main_doc_vagon_acts = this.get_doc_vagon_acts(main_otpr, num);
            // Раздел SENDER_DOC
            epd.main_doc_docs = this.get_doc_docs(main_otpr);
            // Раздел TEXT станции отправки и прибытия и коды администрации отпр и прибытия
            if (main_otpr.text && main_otpr.text)
                epd.zayava = main_otpr.text.zayava;
            //----------------------------------------------------------
            // Раздел ROUTE станции отправки и прибытия и коды администрации отпр и прибытия
            if (main_otpr.route && main_otpr.route.length > 0) {
                var route = main_otpr.route[main_otpr.route.length-1];
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
            // Тариф по перевозкам основной документ
            epd.main_doc_pay = this.get_doc_pay(main_otpr);
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
            // Тариф по перевозкам основной документ по вагону
            epd.main_doc_vagon_pay = this.get_doc_vagon_pay(epd.vagon);
            if (epd.vagon && epd.vagon.nomer) {
                // Раздел VAGON/PAY_V
                if (epd.vagon.pay_v && epd.vagon.pay_v.length > 0) {
                    //Тариф при выдачи
                    epd.vagon_pay_summa = this.get_pay_summa(epd.vagon.pay_v);
                };
                // Раздел VAGON/ZPU_V
                if (epd.vagon.zpu_v && epd.vagon.zpu_v.length > 0) {
                    // Номер ЗПУ
                    epd.vagon_nom_zpu = epd.vagon.zpu_v[0].nom_zpu;
                };
                // Определим груз ! далее если есть контейнеры уточним по ним
                epd.cargo = this.get_epd_cargo_vagon(epd.vagon);
            }
            // Раздел CONT
            epd.main_doc_conts = this.get_doc_conts(main_otpr, num); // Получим список контейнеров
            if (epd.cont && epd.cont.nom_vag) {
                // Указаны контейнеры, уточним груз
                epd.cargo = this.get_epd_cargo_cont(epd.cont);
            };
        }
        // Получим данные по досылочному документу
        if (otpr) {
            epd.nom_doc = otpr.nom_doc;
            // Раздел PL
            epd.doc_pay = this.get_doc_pay(otpr);
            // Раздел ACTS
            epd.doc_acts = this.get_doc_acts(otpr);
            epd.doc_vagon_acts = this.get_doc_vagon_acts(otpr, num);
            // Раздел SENDER_DOC
            epd.doc_docs = this.get_doc_docs(otpr);
            // Раздел VAGON
            epd.vagon_new = this.get_vagon_epd(otpr, num);
            // Тариф по перевозкам досылочный документ по вагону
            epd.doc_vagon_pay = this.get_doc_vagon_pay(epd.vagon_new);
            // Раздел CONT
            epd.doc_conts = this.get_doc_conts(otpr, num); // Получим список контейнеров
            epd.cont_new = this.get_vagon_cont_epd(otpr, num);
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
                if (Number(i.nom_vag) === num) return true; else return false;
            });
            return conts ? conts : null;
        }
        return null;
    };
    // Получить тариф по перевозкам по ЭПД
    epd.prototype.get_doc_pay = function (otpr) {
        var doc_pay = [];
        if (otpr && otpr.pl && otpr.pl.length > 0) {
            for (var i = 0; i < otpr.pl.length; i++) {
                if (otpr.pl[i].pay && otpr.pl[i].pay.length > 0) {
                    for (var p = 0; p < otpr.pl[i].pay.length; p++) {
                        doc_pay.push({
                            code_payer: Number(otpr.pl[i].kod_plat),
                            type_payer: Number(otpr.pl[i].type),
                            kod: otpr.pl[i].pay[p].kod,
                            summa: Number(otpr.pl[i].pay[p].summa),
                        });
                    }
                }
            }
        }
        return doc_pay;
    };
    // Получить акты по ЭПД без вагонов
    epd.prototype.get_doc_acts = function (otpr) {
        var doc_acts = [];
        if (otpr.acts && otpr.acts.length > 0) {
            for (var i = 0; i < otpr.acts.length; i++) {
                var act = otpr.acts[i];
                if (!act.vagon_nom) {
                    doc_acts.push({
                        date_akt: act.date_akt,
                        date_dved: act.date_akt,
                        nom_akt: act.nom_akt ? Number(act.nom_akt) : act.nom_akt,
                        nom_dved: act.nom_dved,
                        prichina_akt: act.prichina_akt,
                        stn_akt: act.stn_akt ? Number(act.stn_akt) : act.stn_akt,
                        stn_name_akt: act.stn_name_akt,
                        type: act.type ? Number(act.type) : act.type,
                        vagon_nom: null
                    });
                }
            }
        }
        return doc_acts
    };
    // Получить акты по ЭПД по вагону
    epd.prototype.get_doc_vagon_acts = function (otpr, num) {
        var doc_acts = [];
        if (otpr.acts && otpr.acts.length > 0) {
            for (var i = 0; i < otpr.acts.length; i++) {
                var act = otpr.acts[i];
                if (act.vagon_nom == num) {
                    doc_acts.push({
                        date_akt: act.date_akt,
                        date_dved: act.date_akt,
                        nom_akt: act.nom_akt ? Number(act.nom_akt) : act.nom_akt,
                        nom_dved: act.nom_dved,
                        prichina_akt: act.prichina_akt,
                        stn_akt: act.stn_akt ? Number(act.stn_akt) : act.stn_akt,
                        stn_name_akt: act.stn_name_akt,
                        type: act.type ? Number(act.type) : act.type,
                        vagon_nom: act.vagon_nom,
                    });
                }
            }
        }
        return doc_acts
    };

    // Получить документы по ЭПД
    epd.prototype.get_doc_docs = function (otpr) {
        var doc_docs = [];
        if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
            for (var i = 0; i < otpr.sender_doc.length; i++) {
                var doc = otpr.sender_doc[i];
                doc_docs.push({
                    id_doc: doc.id,
                    description: doc.description,
                    doc_date: doc.doc_date,
                    doc_type: doc.doc_type,
                    doc_type_name: doc.doc_type_name,
                    doc: null, //TODO: !Сдесь должен сохранится документ
                });
            }
        }
        return doc_docs;
    };
    // Получить документы по ЭПД
    epd.prototype.get_sender_doc = function (otpr) {
        if (otpr && otpr.sender_doc && otpr.sender_doc.length > 0) {
            return otpr.sender_doc
        } else {
            return []
        }
    };
    // Получить документы контейнера на вагон по ЭПД
    epd.prototype.get_doc_conts = function (otpr, num) {
        var doc_conts = [];
        if (otpr && otpr.cont && otpr.cont.length > 0) {
            var conts = otpr.cont.filter(function (i) {
                if (Number(i.nom_vag) === num) return true; else return false;
            });
            if (conts) {
                for (var i = 0; i < conts.length; i++) {
                    var cont = conts[i];
                    var collect = cont.collect_k && cont.collect_k.length > 0 ? cont.collect_k[0] : null
                    var zpu = cont.zpu_k && cont.zpu_k.length > 0 ? cont.zpu_k[0] : null
                    var pay = cont.pay_k && cont.pay_k.length > 0 ? cont.zpu_k : [];
                    var pays = [];
                    for (var p = 0; p < pay.length; p++) {
                        pays.push({
                            kod: pay.kod,
                            summa: Number(pay.summa),
                        });
                    }
                    //
                    doc_conts.push({
                        nom_cont: cont.nom_cont,
                        kod_tiporazmer: cont.kod_tiporazmer,
                        gruzp: cont.gruzp,
                        ves_tary_arc: cont.ves_tary_arc,
                        id_cargo: null,
                        id_cargo_gng: null,
                        kol_pac: collect ? collect.kol_pac : null,
                        pac: collect ? collect.pac : null,
                        vesg: collect ? collect.vesg : null,
                        vesg_reweighing: null,
                        nom_zpu: zpu ? zpu.nom_zpu : null,
                        pays: pays,
                    });
                }
            }
        }
        return doc_conts;
    };
    // Получить тарифы на вагон
    epd.prototype.get_doc_vagon_pay = function (vagon) {
        var doc_vagon_pay = [];
        if (vagon && vagon.nomer && vagon.pay_v && vagon.pay_v.length > 0) {
            for (var p = 0; p < vagon.pay_v.length; p++) {
                var pay = vagon.pay_v[p];
                doc_vagon_pay.push({
                    kod: pay.kod,
                    summa: Number(pay.summa),
                });
            }
        }
        return doc_vagon_pay;
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
            cargo.pac = vagon.collect_v[0].pac; // Код роду упаковки
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
            cargo.pac = cargo.pac ? conts[0].collect_k.pac : cargo.pac; // Код роду упаковки
        }
    };

    App.epd = epd;

    window.App = App;

})(window);