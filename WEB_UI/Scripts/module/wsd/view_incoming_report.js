/*Модуль Отображения информации по ЭПД*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vicr_mess_init_module': 'Инициализация модуля(view_incoming_report)...',
            'vicr_mess_load_sostav': 'Загружаю информацию по составу...',
            'vicr_mess_load_print': 'Формирую документ для печати...',
            'vicr_title_report_nvt': 'Натурная ведомость поезда № {0}',
            //'vicr_title_report_composition_index': 'Индекс поезда',
            //'vicr_title_report_composition_arrival': 'Прибытие',
            //'vicr_title_report_composition_adoption': 'Прием',
            'vicr_title_report_podp_priem': 'Подпись приемосдатчика ______________________',

        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FE = App.form_element;

    var wsd = App.ids_wsd;

    var OutText = function (obj) {
        return obj !== null ? obj : '';
    }

    //-----------------------------------------------------------------------------------------
    // Крнструктор
    function view_incoming_report() {
        this.fe_ui = new FE();
    }
    //==========================================================================================
    // Инициализация
    view_incoming_report.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('vicr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            ids_wsd: null,
        }, options);

        this.ids_wsd = this.settings.ids_wsd ? this.settings.ids_wsd : new wsd();
        this.id_sostav = null;
        this.wagons = null;
        this.sostav = {}; // Основная информация по составу
    };
    //
    view_incoming_report.prototype.load_sostav = function (id_sostav, callback) {
        this.id_sostav = id_sostav;
        if (this.id_sostav) {
            LockScreen(langView('vicr_mess_load_sostav', App.Langs));
            this.ids_wsd.getViewIncomingCarsOfIDSostav(this.id_sostav, function (wagons) {
                this.wagons = wagons;
                // Получим информацию по составу
                this.get_sostav(wagons);
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.wagons = null;
            this.sostav = {};
            if (typeof callback === 'function') {
                callback(null);
            }
        }
    }
    //
    view_incoming_report.prototype.get_sostav = function (wagons) {
        if (wagons && wagons.length > 0) {
            this.sostav = {};
            this.sostav.num_doc = wagons[0].arrival_sostav_num_doc;
            this.sostav.station_on = wagons[0]['arrival_sostav_station_on_name_' + App.Lang];
            this.sostav.way_on_num = wagons[0]['arrival_sostav_way_on_num_' + App.Lang];
            this.sostav.way_on_name = wagons[0]['arrival_sostav_way_on_name_' + App.Lang];
            this.sostav.way_on_abbr = wagons[0]['arrival_sostav_way_on_abbr_' + App.Lang];
            this.sostav.composition_index = wagons[0].arrival_sostav_composition_index;
            this.sostav.date_arrival = wagons[0].arrival_sostav_date_arrival ? moment(wagons[0].arrival_sostav_date_arrival).format(format_datetime) : '';
            this.sostav.date_adoption = wagons[0].arrival_sostav_date_adoption ? moment(wagons[0].arrival_sostav_date_adoption).format(format_datetime) : '';
            this.sostav.numeration = wagons[0].arrival_sostav_numeration;
        }

    };
    // Вывисти заголовок прибытия
    view_incoming_report.prototype.title_report = function (doc) {
        doc.write('<table class="table-title">');
        doc.write('<tr>');
        doc.write('<th>Индекс поезда</th>');
        doc.write('<td>' + this.sostav.composition_index + '</td>');
        doc.write('<th>Прибытие</th>');
        doc.write('<td>' + this.sostav.date_arrival + '</td>');
        doc.write('<th>Прием</th>');
        doc.write('<td>' + this.sostav.date_adoption + '</td>');
        doc.write('</tr>');
        doc.write('<tr>');
        doc.write('<th>Поезд прибыл на станцию</th>');
        doc.write('<td>' + this.sostav.station_on + '</td>');
        doc.write('<th>Путь</th>');
        doc.write('<td>' + this.sostav.way_on_num + ' - ' + this.sostav.way_on_name + '</td>');
        doc.write('<th>Нумерация</th>');
        doc.write('<td>' + (this.sostav.numeration ? 'с хвоста' : this.sostav.numeration === false ? 'с головы' : 'не указана') + '</td>');
        doc.write('</tr>');
        doc.write('</table>');
    };
    // Вывести вагоны в составе
    view_incoming_report.prototype.view_table_info_car_fst = function (doc, wagons) {

        doc.write('<table class="table-info">');
        doc.write('<tr>');
        doc.write('<th scope="col">№</th>');
        doc.write('<th scope="col">Станция отправления</th>');
        doc.write('<th scope="col">Груз</th>');
        doc.write('<th scope="col">Оператор</th>');
        doc.write('<th scope="col">Ограничение</th>');
        doc.write('<th scope="col">Собственник</th>');
        doc.write('<th scope="col">Код</th>');
        doc.write('<th scope="col">№ Вагона</th>');
        doc.write('<th scope="col">№ ж.д. накладной</th>');
        doc.write('<th scope="col">Вес. тн</th>');
        doc.write('<th scope="col">Цех получатель</th>');
        doc.write('<th scope="col">Разметка</th>');
        doc.write('<th scope="col">Примечание</th>');
        doc.write('</tr>');

        var list_cars = wagons.filter(function (i) {
            return i.arrival_car_position_arrival
        }).sort(function (a, b) {
            return Number(a.arrival_car_position_arrival) - Number(b.arrival_car_position_arrival)
        });

        var total_vesg = 0;
        var group_operators = [];
        // Список вагонов есть
        if (list_cars) {
            for (var i = 0; i < list_cars.length; i++) {
                var certification_data = (list_cars[i].arrival_uz_vagon_id_certification_data !== null ? list_cars[i]['arrival_uz_vagon_sertification_data_' + App.Lang] : '');
                var id_operator = list_cars[i].arrival_uz_vagon_arrival_wagons_rent_id_operator ? list_cars[i].arrival_uz_vagon_arrival_wagons_rent_id_operator : 0;
                var operator = list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
                var vesg = list_cars[i].arrival_uz_vagon_vesg ? Number(Number(list_cars[i].arrival_uz_vagon_vesg) / 1000) : 0;

                doc.write('<tr>');
                doc.write('<th>' + list_cars[i].arrival_car_position_arrival + '</th>');
                doc.write('<td>' + list_cars[i]['arrival_uz_document_station_from_name_' + App.Lang] + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_vagon_cargo_name_' + App.Lang] + certification_data + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang] + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_owner_wagon_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i].arrival_uz_vagon_wagon_adm) + '</td>');
                doc.write('<td>' + list_cars[i].num + '</td>');
                doc.write('<td>' + OutText(list_cars[i].arrival_uz_document_nom_main_doc) + (list_cars[i].arrival_uz_document_nom_doc ? '(' + list_cars[i].arrival_uz_document_nom_doc + ')' : '') + '</td>');
                doc.write('<td>' + (list_cars[i].arrival_uz_vagon_vesg ? Number(Number(list_cars[i].arrival_uz_vagon_vesg) / 1000).toFixed(2) : '0.00') + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_division_abbr_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_condition_abbr_' + App.Lang]) + '</td>');
                doc.write('<td></td>');
                doc.write('</tr>');
                // Подчет общего веса
                total_vesg += vesg;
                // Группировка операторов
                var opr = getObjects(group_operators, 'id', id_operator)
                if (opr && opr.length > 0) {
                    opr[0].count += 1;
                    opr[0].vesg = Number(opr[0].vesg) + vesg;
                } else {
                    if (operator !== null) {
                        group_operators.push({ id: id_operator, operator: operator, count: 1, vesg: vesg });
                    } else {
                        group_operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: vesg });
                    }
                }
            }
        }
        doc.write('<tr>');
        doc.write('<th colspan="6" class="total">Всего вагонов</th>');
        doc.write('<td class="total">' + list_cars.length + '</td>');
        doc.write('<th colspan="2" class="total">Общий вес</th>');
        doc.write('<td class="total">' + total_vesg.toFixed(2) + '</td>');
        doc.write('<th colspan="3"></td>');
        doc.write('</tr>');
        doc.write('<tr>');
        doc.write('<th colspan="13">Информация по операторам</th>');
        doc.write('</tr>');
        if (group_operators && group_operators.length > 0) {
            for (var io = 0; io < group_operators.length; io++) {
                doc.write('<tr>');
                doc.write('<th colspan="6" class="total">' + group_operators[io].operator + '</th>');
                doc.write('<td class="total">' + group_operators[io].count + '</td>');
                doc.write('<th colspan="2"></th>');
                doc.write('<td class="total">' + group_operators[io].vesg.toFixed(2) + '</td>');
                doc.write('<th colspan="3"></td>');
                doc.write('</tr>');
            }
        }
        doc.write('</table>');
    };
    // Вывести вагоны в составе
    view_incoming_report.prototype.view_table_info_car_fsci = function (doc, wagons) {
        doc.write('<table class="table-info">');
        doc.write('<tr>');
        doc.write('<th scope="col">№</th>');
        doc.write('<th scope="col">Код</th>');
        doc.write('<th scope="col">Грузоподъемность</th>');
        doc.write('<th scope="col">Вес,тн</th>');
        doc.write('<th scope="col">Род</th>');
        doc.write('<th scope="col">№ вагона</th>');
        doc.write('<th scope="col">№ ж.д. накладной</th>');
        doc.write('<th scope="col">Груз</th>');
        doc.write('<th scope="col">Станция отправления</th>');
        doc.write('<th scope="col">Оператор</th>');
        doc.write('<th scope="col">Собственник</th>');
        doc.write('<th scope="col">Цех-получатель</th>');
        doc.write('<th scope="col">Ограничение погрузки</th>');
        doc.write('<th scope="col">Судно</th>');
        doc.write('<th scope="col">Ком. состояние груза</th>');
        doc.write('<th scope="col">Акты</th>');
        doc.write('</tr>');

        var list_cars = wagons.filter(function (i) {
            return i.arrival_car_position_arrival
        }).sort(function (a, b) {
            return Number(a.arrival_car_position_arrival) - Number(b.arrival_car_position_arrival)
        });

        var total_vesg = 0;
        var group_operators = [];
        // Список вагонов есть
        if (list_cars) {
            for (var i = 0; i < list_cars.length; i++) {

                //var vag_acts_uz = vag_uz && vag_uz.Arrival_UZ_Vagon_Acts ? vag_uz.Arrival_UZ_Vagon_Acts : null;
                //var acts_uz = null;
                //for (ia = 0; ia < vag_acts_uz.length; ia++) {
                //    acts_uz += ('id=' + vag_acts_uz[ia].id_document + ' №' + vag_acts_uz[ia].nom_akt + ' от ' + (vag_acts_uz[ia].date_akt ? vag_acts_uz[ia].date_akt.replace(/T/g, ' ') : '') + ' ' + vag_acts_uz[ia].prichina_akt + ' ст.' + vag_acts_uz[ia].stn_name_akt + ';');
                //}


                var gruzp = list_cars[i].arrival_uz_vagon_gruzp ? Number(list_cars[i].arrival_uz_vagon_gruzp) : 0;
                var id_operator = list_cars[i].arrival_uz_vagon_arrival_wagons_rent_id_operator ? list_cars[i].arrival_uz_vagon_arrival_wagons_rent_id_operator : 0;
                var operator = list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
                var vesg = list_cars[i].arrival_uz_vagon_vesg ? Number(Number(list_cars[i].arrival_uz_vagon_vesg) / 1000) : 0;
                var certification_data = (list_cars[i].arrival_uz_vagon_id_certification_data !== null ? list_cars[i]['arrival_uz_vagon_sertification_data_' + App.Lang] : '');
                var acts_uz = '';
                //this.ids_wsd.getArrival_UZ_Vagon_ActsOfID_Vagon(id_vagon, function (acts) {

                //}.bind(this));

                doc.write('<tr>');
                doc.write('<th>' + list_cars[i].arrival_car_position_arrival + '</th>');
                doc.write('<td>' + OutText(list_cars[i].arrival_uz_vagon_wagon_adm) + '</td>');
                doc.write('<td>' + gruzp.toFixed(2) + '</td>');
                doc.write('<td>' + vesg.toFixed(2) + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_rod_abbr_' + App.Lang]) + '</td>');
                doc.write('<td>' + list_cars[i].num + '</td>');
                doc.write('<td>' + OutText(list_cars[i].arrival_uz_document_nom_main_doc) + (list_cars[i].arrival_uz_document_nom_doc ? '(' + list_cars[i].arrival_uz_document_nom_doc + ')' : '') + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_vagon_cargo_name_' + App.Lang] + certification_data + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_document_station_from_name_' + App.Lang] + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang] + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_owner_wagon_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_name_division_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang]) + '</td>');
                doc.write('<td></td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_commercial_condition_' + App.Lang]) + '</td>');
                doc.write('<td>' + acts_uz + '</td>');
                doc.write('</tr>');
                // Подчет общего веса
                //total_vesg += vesg;
                // Группировка операторов
                //var opr = getObjects(group_operators, 'id', id_operator)
                //if (opr && opr.length > 0) {
                //    opr[0].count += 1;
                //    opr[0].vesg = Number(opr[0].vesg) + vesg;
                //} else {
                //    if (operator !== null) {
                //        group_operators.push({ id: id_operator, operator: operator, count: 1, vesg: vesg });
                //    } else {
                //        group_operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: vesg });
                //    }
                //};
            }
        }
        doc.write('<tr>');
        doc.write('<th colspan="3" class="total">Общий вес</th>');
        doc.write('<td class="total">' + total_vesg.toFixed(2) + '</td>');
        doc.write('<th class="total"></th>');
        doc.write('<td class="total">' + list_cars.length + '</td>');
        doc.write('<th colspan="10"></td>');
        doc.write('</tr>');
        doc.write('</table>');
    };
    // Натурная ведомость
    view_incoming_report.prototype.fst = function (id_sostav) {
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                LockScreen(langView('vicr_mess_load_print', App.Langs));
                var mywindow = window.open('', langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc));
                mywindow.document.write('<html><head><title>' + langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc) + '</title>');
                mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print.css">');
                mywindow.document.write('</head><body>');
                mywindow.document.write('<h2>' + langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc) + '</h2>');
                this.title_report(mywindow.document);      // Заголовок
                this.view_table_info_car_fst(mywindow.document, wagons);  // Вагоны в составе
                mywindow.document.write('<br />');
                mywindow.document.write('<br />');
                mywindow.document.write('<div>' + langView('vicr_title_report_podp_priem', App.Langs) + '</div>');
                mywindow.document.write('</body></html>');
                LockScreenOff();
                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10
            }
        }.bind(this));
    }
    // Вывести отчет Натурная ведомость коммерческого осмотра
    view_incoming_report.prototype.fsci = function (id_sostav) {
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                LockScreen(langView('vicr_mess_load_print', App.Langs));
                var mywindow = window.open('', 'Натурная ведомость коммерческого осмотра №' + this.sostav.num_doc);
                mywindow.document.write('<html><head><title>Натурная ведомость коммерческого осмотра №' + this.sostav.num_doc + '</title>');
                mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print.css">');
                mywindow.document.write('</head><body>');
                mywindow.document.write('<h2>Натурная ведомость коммерческого осмотра №' + this.sostav.num_doc + '</h2>');
                this.title_report(mywindow.document);      // Заголовок
                this.view_table_info_car_fsci(mywindow.document, wagons);     // Вагоны в составе
                mywindow.document.write('<br />');
                mywindow.document.write('<br />');
                mywindow.document.write('<div">Подпись приемосдатчика ______________________</div>');
                mywindow.document.write('</body></html>');
                LockScreenOff();
                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10
            }
        }.bind(this));
    };
    // Вывести отчет "Заявка на выдачу коммерческого акта ст. КР."
    view_incoming_report.prototype.aica = function (id_sostav, station_name) {
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                var list_cars = wagons.filter(function (i) {
                    return i.arrival_car_position_arrival;
                });
            var nums = getArrOfNameObjArr(list_cars, 'num');

            }
        }.bind(this));
        //pn_sel_wagon.Open(nums, function (select_nums) {
        //     Получить отчет
        //    if (select_nums && select_nums.length > 0) {

        //        var mywindow = window.open('', 'Заявка на выдачу коммерческого акта ст. ' + station_name);
        //        mywindow.document.write('<html><head><title>Заявка на выдачу коммерческого акта ст. ' + station_name + '</title>');
        //        mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
        //        mywindow.document.write('</head><body>');
        //        mywindow.document.write('<div class=WordSection1>');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику станції</span></p>');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">' + station_name + '</span></p>');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
        //        mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">на видачу комерційного акту</span></p>');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год.________хв.</span></p>');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Згідно зі ст. 129 Статуту залізниць України прошу скласти та надати комерційний акт на вантаж , що прибув потягом № ­­­­­­­ ­­­­­­­­­­­­­­_______________(дата)</span></p>');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">__________(год./хв.) з невідповідності маси вантажу натурою з даними, зазначеними у залізничній накладній</span></p>');

        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
        //        mywindow.document.write('<tr>');
        //        mywindow.document.write('<td>Вагон №</td>');
        //        mywindow.document.write('<td>Найменування вантажу</td>');
        //        mywindow.document.write('<td>Станція відправлення</td>');
        //        mywindow.document.write('<td>Відправник</td>');
        //        mywindow.document.write('</tr>');

        //        select_nums.forEach(function (item, index, array) {
        //            var wag = getObjOflist(sostav.ArrivalCars, 'num', item);

        //            var doc_uz = wag.Arrival_UZ_Vagon && wag.Arrival_UZ_Vagon.Arrival_UZ_Document ? wag.Arrival_UZ_Vagon.Arrival_UZ_Document : null;
        //            var vag_uz = wag.Arrival_UZ_Vagon ? wag.Arrival_UZ_Vagon : null;
        //            var dir_cargo = vag_uz && vag_uz.Directory_Cargo ? vag_uz.Directory_Cargo : null;
        //            var dir_es = doc_uz && doc_uz.Directory_ExternalStation ? doc_uz.Directory_ExternalStation : null;
        //            var dir_ship = doc_uz && doc_uz.Directory_Shipper ? doc_uz.Directory_Shipper : null;

        //            mywindow.document.write('<tr>');
        //            mywindow.document.write('<td>');
        //            mywindow.document.write(wag.num);
        //            mywindow.document.write('</td>');
        //            mywindow.document.write('<td>');
        //            mywindow.document.write(dir_cargo ? ids_inc.ids_dir.getValueObj(dir_cargo, 'cargo_name', lang) : '');
        //            mywindow.document.write('</td>');
        //            mywindow.document.write('<td>');
        //            mywindow.document.write(dir_es ? ids_inc.ids_dir.getValueObj(dir_es, 'station_name', lang) : '');
        //            mywindow.document.write('</td>');
        //            mywindow.document.write('<td class="shipper">');
        //            mywindow.document.write(dir_ship ? ids_inc.ids_dir.getValueObj(dir_ship, 'shipper_name', lang) : '');
        //            mywindow.document.write('</td>');
        //            mywindow.document.write('</tr>');

        //        });
        //        mywindow.document.write('</table>');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<br />');
        //        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Представник</span></p>');
        //        mywindow.document.write('</div>');
        //        mywindow.document.write('</body></html>');

        //        mywindow.document.close(); // necessary for IE >= 10
        //        mywindow.focus(); // necessary for IE >= 10
        //    }
        //});
    };
    //--------------------------------------------------------------------
    // Очистить сообщения
    view_incoming_report.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_incoming_report.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    }
    // Показать предупреждения
    view_incoming_report.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    }
    // Показать сообщения о выполнении действий
    view_incoming_report.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    }
    //------------------------------------------------------------------
    // Очистить объект
    view_incoming_report.prototype.destroy = function () {

    }

    App.view_incoming_report = view_incoming_report;

    window.App = App;
})(window);