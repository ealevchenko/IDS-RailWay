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
            'vicr_title_report_podp_priem': 'Подпись приемосдатчика ______________________',
            'vicr_title_form_nums': 'Укажите вагоны',
            'vicr_title_form_move_nums': 'Выберите вагоны',

        },
        'en':  //default language: English
        {
            'vicr_mess_init_module': 'Module initialization(view_incoming_report)...',
            'vicr_mess_load_sostav': 'Loading composition info...',
            'vicr_mess_load_print': 'Creating a document to print...',
            'vicr_title_report_nvt': 'Train sheet #{0}',
            'vicr_title_report_podp_priem': 'Signature of podp_priem ______________________',
            'vicr_title_form_nums': 'Specify wagons',
            'vicr_title_form_move_nums': 'Select wagons',
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
        this.type_report = null;
        this.rows = [];
        this.rows_list1 = [];
        this.rows_list2 = [];
        //-----------------------------------------
        // Создать модальную форму "Выбор из списка вагонов"
        var MF = App.modal_form
        this.mf_select_nums = new MF();
        this.mf_select_nums.init({
            alert: null,
            id: 'mf-fvir-sn',
            prefix: 'sm',
            cl_modal: null,
            //form: this.form,
            label_ok: langView('fmic_title_edit', App.Langs),
            label_close: langView('fmic_title_cancel', App.Langs),
            ok_click: function (e) {
                e.preventDefault();
                this.mf_select_nums.close();
                this.report();
            }.bind(this),
            form_open: function () {
                if (this.table_manual_cars) {
                    this.table_manual_cars.obj_t_manual.columns.adjust();
                }
            }.bind(this),
            form_close: function () {
                //this.clear();
            }.bind(this),
        });
        this.mf_select_nums.$bt_ok.prop('disabled', true);
        // Форма выбора вагонов
        var form_sn = new this.fe_ui.form({
            class: '',
            id: null,
            novalidate: null,
        });
        // Формируем таблицу
        var fs = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: 'ВАГОНЫ',
            class_legend: null,
        });
        var div_table = new this.fe_ui.div({
            id: 'result-nums',
        });
        form_sn.$form.append(fs.$fieldset.append(div_table.$div));
        //-----------------------------------------
        this.mf_select_nums.$body.append(form_sn.$form);
        //
        var TMC = App.table_manual_cars; // Выбрать вагоны вагоны
        this.table_manual_cars = new TMC('div#result-nums');                         // Создадим экземпляр
        this.table_manual_cars.init({
            type_report: 'table-nums-cars',
            alert: this.alert,
            fn_select_rows: function (rows) {
                if (rows && rows.length > 0) {
                    this.rows = rows;
                    this.mf_select_nums.$bt_ok.prop('disabled', false);
                } else {
                    this.mf_select_nums.$bt_ok.prop('disabled', true);
                    this.rows = [];
                }
            }.bind(this),
            fn_init: function (init) {
                // На проверку окончания инициализации
            },
            fn_refresh: function () {
                //this.out_clear();
                //this.update();
            }.bind(this),
        });
        this.table_manual_cars.view([]);
        //-----------------------------------------
        // Создать модальную форму "Перенос выбранных вагонов"
        this.mf_move_nums = new MF();
        this.mf_move_nums.init({
            alert: null,
            id: 'mf-fvir-sn',
            prefix: 'lg',
            cl_modal: null,
            //form: this.form,
            label_ok: langView('fmic_title_edit', App.Langs),
            label_close: langView('fmic_title_cancel', App.Langs),
            ok_click: function (e) {
                e.preventDefault();
                var page_nums1 = [];
                var page_nums2 = [];
                $(this.$ul_page1.find('li')).each(function () {
                    page_nums1.push(Number(this.innerText));
                });
                $(this.$ul_page2.find('li')).each(function () {
                    page_nums2.push(Number(this.innerText));
                });
                this.rows_list1 = page_nums1;
                this.rows_list2 = page_nums2;
                this.mf_move_nums.close();
                this.report();
            }.bind(this),
            form_open: function () {

            }.bind(this),
            form_close: function () {
                //this.clear();
            }.bind(this),
        });
        //this.mf_move_nums.$bt_ok.prop('disabled', true);
        // Форма переноса вагонов
        var form_mn = new this.fe_ui.form({
            class: '',
            id: null,
            novalidate: null,
        });
        var row = new this.fe_ui.bs_row({
            class: null,
            id: null,
        });
        var col1 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 4,
            class: null,
        });
        var col2 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 4,
            class: null,
        });
        var col3 = new this.fe_ui.bs_col({
            size: 'xl',
            col: 4,
            class: null,
        });
        var fs1 = new this.fe_ui.fieldset({
            class: 'border-primary',
            legend: 'ВАГОНЫ',
            class_legend: null,
        });
        var fs2 = new this.fe_ui.fieldset({
            class: 'border-info',
            legend: 'Страница-1',
            class_legend: null,
        });
        var fs3 = new this.fe_ui.fieldset({
            class: 'border-info',
            legend: 'Страница-2',
            class_legend: null,
        });
        var div1 = new this.fe_ui.div({
            class: 'connectedSortable',
            id: 'fs-list-nums',
        });
        var div2 = new this.fe_ui.div({
            class: null,
            id: 'fs-report-page1',
        });
        var div3 = new this.fe_ui.div({
            class: null,
            id: 'fs-report-page2',
        });
        this.$ul_page1 = $('<ul id="report_page1" class="connectedSortable"></ul>');
        this.$ul_page2 = $('<ul id="report_page2" class="connectedSortable"></ul>');
        div2.$div.append(this.$ul_page1);
        div3.$div.append(this.$ul_page2);
        this.$div_list_nums = div1.$div;
        // Заполнить
        fs1.$fieldset.append(div1.$div);
        fs2.$fieldset.append(div2.$div);
        fs3.$fieldset.append(div3.$div);
        //
        col1.$col.append(fs1.$fieldset);
        col2.$col.append(fs2.$fieldset);
        col3.$col.append(fs3.$fieldset);
        row.$row.append(col1.$col).append(col2.$col).append(col3.$col);
        form_mn.$form.append(row.$row);
        this.mf_move_nums.$body.append(form_mn.$form);
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
                var certification_data = (list_cars[i].arrival_uz_vagon_id_certification_data !== null ? (' ' + list_cars[i]['arrival_uz_vagon_sertification_data_' + App.Lang]) : '');
                var id_operator = list_cars[i].arrival_uz_vagon_arrival_wagons_rent_id_operator ? list_cars[i].arrival_uz_vagon_arrival_wagons_rent_id_operator : 0;
                var operator = list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
                var vesg = list_cars[i].arrival_uz_vagon_vesg ? Number(Number(list_cars[i].arrival_uz_vagon_vesg) / 1000) : 0;
                var nom_main_doc = list_cars[i].arrival_uz_document_nom_main_doc !== null && Number(list_cars[i].arrival_uz_document_nom_main_doc) > 0 ? list_cars[i].arrival_uz_document_nom_main_doc : '';
                doc.write('<tr>');
                doc.write('<th>' + list_cars[i].arrival_car_position_arrival + '</th>');
                doc.write('<td>' + list_cars[i]['arrival_uz_document_station_from_name_' + App.Lang] + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_vagon_cargo_name_' + App.Lang] + certification_data + '</td>');
                doc.write('<td>' + list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang] + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i]['arrival_uz_vagon_owner_wagon_' + App.Lang]) + '</td>');
                doc.write('<td>' + OutText(list_cars[i].arrival_uz_vagon_wagon_adm) + '</td>');
                doc.write('<td>' + list_cars[i].num + '</td>');
                doc.write('<td>' + nom_main_doc + (list_cars[i].arrival_uz_document_nom_doc ? '(' + list_cars[i].arrival_uz_document_nom_doc + ')' : '') + '</td>');
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
    view_incoming_report.prototype.view_table_info_car_fsci = function (mywindow, wagons, callback) {
        mywindow.document.write('<table class="table-info">');
        mywindow.document.write('<tr>');
        mywindow.document.write('<th scope="col">№</th>');
        mywindow.document.write('<th scope="col">Код</th>');
        mywindow.document.write('<th scope="col">Грузоподъемность</th>');
        mywindow.document.write('<th scope="col">Вес,тн</th>');
        mywindow.document.write('<th scope="col">Род</th>');
        mywindow.document.write('<th scope="col">№ вагона</th>');
        mywindow.document.write('<th scope="col">№ ж.д. накладной</th>');
        mywindow.document.write('<th scope="col">Груз</th>');
        mywindow.document.write('<th scope="col">Станция отправления</th>');
        mywindow.document.write('<th scope="col">Оператор</th>');
        mywindow.document.write('<th scope="col">Собственник</th>');
        mywindow.document.write('<th scope="col">Цех-получатель</th>');
        mywindow.document.write('<th scope="col">Ограничение погрузки</th>');
        mywindow.document.write('<th scope="col">Судно</th>');
        mywindow.document.write('<th scope="col">Ком. состояние груза</th>');
        mywindow.document.write('<th scope="col">Акты</th>');
        mywindow.document.write('</tr>');
        var list_cars = wagons.filter(function (i) {
            return i.arrival_car_position_arrival
        }).sort(function (a, b) {
            return Number(a.arrival_car_position_arrival) - Number(b.arrival_car_position_arrival)
        });
        var group_operators = [];
        var total_vesg = 0;
        var count = list_cars.length;
        $.each(list_cars, function (i, el) {
            var gruzp = el.arrival_uz_vagon_gruzp ? Number(el.arrival_uz_vagon_gruzp) : 0;
            //var id_operator = el.arrival_uz_vagon_arrival_wagons_rent_id_operator ? el.arrival_uz_vagon_arrival_wagons_rent_id_operator : 0;
            //var operator = el['arrival_uz_vagon_arrival_wagons_rent_operators_' + App.Lang];
            var vesg = el.arrival_uz_vagon_vesg ? Number(Number(el.arrival_uz_vagon_vesg) / 1000) : 0;
            var certification_data = (el.arrival_uz_vagon_id_certification_data !== null ? el['arrival_uz_vagon_sertification_data_' + App.Lang] : '');
            var acts_uz = '';
            this.ids_wsd.getArrival_UZ_Vagon_ActsOfID_Vagon(el.arrival_uz_vagon_id, function (acts) {
                var cur_el = el;
                acts_uz = '';
                for (var ia = 0; ia < acts.length; ia++) {
                    acts_uz += ('id=' + acts[ia].id_document + ' №' + acts[ia].nom_akt + ' от ' + (acts[ia].date_akt ? acts[ia].date_akt.replace(/T/g, ' ') : '') + ' ' + acts[ia].prichina_akt + ' ст.' + acts[ia].stn_name_akt + ';');
                }
                var nom_main_doc = cur_el.arrival_uz_document_nom_main_doc !== null && Number(cur_el.arrival_uz_document_nom_main_doc) > 0 ? cur_el.arrival_uz_document_nom_main_doc : '';
                //--------------------------------------------------------------------
                mywindow.document.write('<tr>');
                mywindow.document.write('<th>' + cur_el.arrival_car_position_arrival + '</th>');
                mywindow.document.write('<td>' + OutText(cur_el.arrival_uz_vagon_wagon_adm) + '</td>');
                mywindow.document.write('<td>' + gruzp.toFixed(2) + '</td>');
                mywindow.document.write('<td>' + vesg.toFixed(2) + '</td>');
                mywindow.document.write('<td>' + OutText(cur_el['arrival_uz_vagon_rod_abbr_' + App.Lang]) + '</td>');
                mywindow.document.write('<td>' + cur_el.num + '</td>');
                mywindow.document.write('<td>' + nom_main_doc + (cur_el.arrival_uz_document_nom_doc ? '(' + cur_el.arrival_uz_document_nom_doc + ')' : '') + '</td>');
                mywindow.document.write('<td>' + cur_el['arrival_uz_vagon_cargo_name_' + App.Lang] + certification_data + '</td>');
                mywindow.document.write('<td>' + cur_el['arrival_uz_document_station_from_name_' + App.Lang] + '</td>');
                mywindow.document.write('<td>' + cur_el['arrival_uz_vagon_arrival_wagons_rent_operator_abbr_' + App.Lang] + '</td>');
                mywindow.document.write('<td>' + OutText(cur_el['arrival_uz_vagon_owner_wagon_' + App.Lang]) + '</td>');
                mywindow.document.write('<td>' + OutText(cur_el['arrival_uz_vagon_name_division_' + App.Lang]) + '</td>');
                mywindow.document.write('<td>' + OutText(cur_el['arrival_uz_vagon_arrival_wagons_rent_limiting_abbr_' + App.Lang]) + '</td>');
                mywindow.document.write('<td></td>');
                mywindow.document.write('<td>' + OutText(cur_el['arrival_uz_vagon_commercial_condition_' + App.Lang]) + '</td>');
                mywindow.document.write('<td>' + acts_uz + '</td>');
                mywindow.document.write('</tr>');
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
                count--;
                if (count === 0) {
                    mywindow.document.write('<tr>');
                    mywindow.document.write('<th colspan="3" class="total">Общий вес</th>');
                    mywindow.document.write('<td class="total">' + total_vesg.toFixed(2) + '</td>');
                    mywindow.document.write('<th class="total"></th>');
                    mywindow.document.write('<td class="total">' + list_cars.length + '</td>');
                    mywindow.document.write('<th colspan="10"></td>');
                    mywindow.document.write('</tr>');
                    mywindow.document.write('</table>');
                    if (typeof callback === 'function') {
                        callback(mywindow);
                    }
                }
            }.bind(this));
        }.bind(this));
    };
    // Добавить пробелы
    var add_nbsp = function (count) {
        var result = '';
        for (var i = 0; i < count; i++) {
            // Добавить документ в таблицу
            result += '&nbsp;';
        }
        return result;
    }
    // Добавить документ
    view_incoming_report.prototype.add_document = function (mywindow, nums, num_doc) {
        var vagons_page1 = [];
        if (nums && nums.length > 0) {
            $.each(nums, function (i, el) {
                var wagon = this.wagons.find(function (i) { return i.num === el });
                if (wagon) {
                    vagons_page1.push(wagon);
                }
            }.bind(this));
        }
        mywindow.document.write('<p class=MsoNormal><b><span>ПАО «АРСЕЛОРМИТТАЛ КРИВОЙ РОГ»</span></b><span>' + add_nbsp(40) + '<i>Форма ДГ-20</i></span></p>');
        mywindow.document.write('<p class=MsoNormal><span>' + add_nbsp(80) + '<b>НАКЛАДНАЯ ПРЕДПРИЯТИЯ</b></span></p>');
        mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>                                                     НАКЛАДНАЯ № ' + num_doc + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>                                              Ведомость прибытия груза № ' + this.sostav.num_doc + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>Заадресовка груза:</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>Дата:     ________________</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>Ф.И.О.  ________________</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
        mywindow.document.write('<p class=MsoNormal><b><span>Станция назначения</span></b><span>&nbsp;' + OutText(vagons_page1[0]['arrival_uz_vagon_station_amkr_name_' + App.Lang]) + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><b><span>Место выгрузки (цех-получатель)</span></b><span>&nbsp;' + OutText(vagons_page1[0]['arrival_uz_vagon_division_abbr_' + App.Lang]) + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><b><span>Род груза</span></b><span>&nbsp;' + OutText(vagons_page1[0]['arrival_uz_vagon_cargo_name_' + App.Lang]) + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><b><span>Станция отправления</span></b><span>&nbsp;' + OutText(vagons_page1[0]['arrival_uz_document_station_from_name_' + App.Lang]) + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><b><span>Отправитель</span></b><span>&nbsp;' + OutText(vagons_page1[0]['arrival_uz_document_shipper_name_' + App.Lang]) + '</span></p>');
        mywindow.document.write('<p class=MsoNormal><b><span>Примечание</span></b><span>&nbsp;_________________________________________________</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>___________________________________________________________</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
        mywindow.document.write('<table class="MsoNormalTable" border=1 cellspacing=0 cellpadding=0 width=0>');
        mywindow.document.write('<tr style="height:25.45pt">');
        mywindow.document.write('<td width=29 rowspan=2 style="width:21.3pt;border:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center;text-indent:.4pt"><span style="font-size:8.0pt;line-height:107%">№ п/п</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=46 rowspan=2 style="width:33.05pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">№ вагона</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=65 rowspan=2 style="width:40.15pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">№ ж.д. накладной</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=74 rowspan=2 style="width:40.15pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Сертификат. данные</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=106 colspan=2 style="width:80.3pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Вес нетто, тн</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=90 colspan=2 style="width:80.35pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Начало грузовых операций</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=90 colspan=2 style="width:80.35pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Окончание грузовых операций</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('</tr>');
        mywindow.document.write('<tr style="height:40.4pt">');
        mywindow.document.write('<td width=44 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">По ж.д. накл.</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=62 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">После перевески</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=42 style="width:40.2pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Дата</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=47 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Время</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=42 style="width:40.2pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Дата</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('<td width=47 style="width:40.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:40.4pt">');
        mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><span style="font-size:8.0pt;line-height:107%">Время</span></p>');
        mywindow.document.write('</td>');
        mywindow.document.write('</tr>');
        // Отображение данных
        $.each(vagons_page1, function (i, el) {
            var vesg = el.arrival_uz_vagon_vesg ? Number(Number(el.arrival_uz_vagon_vesg) / 1000) : 0;
            var vesg_reweighing = el.arrival_uz_vagon_vesg_reweighing ? Number(Number(el.arrival_uz_vagon_vesg_reweighing) / 1000) : 0;
            var nom_main_doc = el.arrival_uz_document_nom_main_doc !== null && Number(el.arrival_uz_document_nom_main_doc) > 0 ? el.arrival_uz_document_nom_main_doc : '';

            mywindow.document.write('<tr style="height:14.35pt">');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
            mywindow.document.write(i + 1);
            mywindow.document.write('</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt;font-size:12px">');
            mywindow.document.write(el.num);
            mywindow.document.write('</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt;font-size:12px">');
            mywindow.document.write(nom_main_doc + (el.arrival_uz_document_nom_doc ? '(' + el.arrival_uz_document_nom_doc + ')' : ''));
            mywindow.document.write('</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
            mywindow.document.write(OutText(el['arrival_uz_vagon_sertification_data_' + App.Lang]));
            mywindow.document.write('</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
            mywindow.document.write(vesg.toFixed(2));
            mywindow.document.write('</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
            mywindow.document.write(vesg_reweighing.toFixed(2));
            mywindow.document.write('</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
            mywindow.document.write('<td valign=top style="width:21.3pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">&nbsp;</td>');
            mywindow.document.write('</tr>');
        }.bind(this));
        mywindow.document.write('</table>');
        mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>&nbsp;</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>Приемосдатчик груза и багажа ____________________   ____________________</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>' + add_nbsp(65) + '(подпись)' + add_nbsp(30) + '(Ф.И.О.)</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>Грузополучатель' + add_nbsp(24) + '_____________________   ____________________</span></p>');
        mywindow.document.write('<p class=MsoNormal><span>' + add_nbsp(65) + '(подпись)' + add_nbsp(30) + '(Ф.И.О.)</span></p>');
    };
    // Натурная ведомость
    view_incoming_report.prototype.fst = function (id_sostav) {
        this.type_report = null;
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
        this.type_report = null;
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                LockScreen(langView('vicr_mess_load_print', App.Langs));
                var mywindow = window.open('', 'Натурная ведомость коммерческого осмотра №' + this.sostav.num_doc);
                mywindow.document.write('<html><head><title>Натурная ведомость коммерческого осмотра №' + this.sostav.num_doc + '</title>');
                mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print.css">');
                mywindow.document.write('</head><body>');
                mywindow.document.write('<h2>Натурная ведомость коммерческого осмотра №' + this.sostav.num_doc + '</h2>');
                this.title_report(mywindow.document);      // Заголовок
                this.view_table_info_car_fsci(mywindow, wagons, function (mywindow) {
                    mywindow.document.write('<br />');
                    mywindow.document.write('<br />');
                    mywindow.document.write('<div">Подпись приемосдатчика ______________________</div>');
                    mywindow.document.write('</body></html>');
                    LockScreenOff();
                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10
                }.bind(this));     // Вагоны в составе
            }
        }.bind(this));
    };
    // Вывести отчеты где участвует выбор вагонов
    view_incoming_report.prototype.select_nums = function (id_sostav, type_report) {
        this.type_report = type_report;
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                var list_cars = wagons.filter(function (i) {
                    return i.arrival_car_position_arrival;
                });
                this.mf_select_nums.open(langView('vicr_title_form_nums', App.Langs));
                if (this.table_manual_cars) {
                    this.table_manual_cars.view(list_cars);
                };
            }
        }.bind(this));
    };
    // Вывести отчеты где выбирается несколько отчетов
    view_incoming_report.prototype.move_nums = function (id_sostav, type_report) {
        this.type_report = type_report;
        this.rows_list1 = [];
        this.rows_list2 = [];
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                var list_cars = wagons.filter(function (i) {
                    return i.arrival_car_position_arrival;
                }).sort(function (a, b) {
                    return a.arrival_uz_vagon_id_division_on_amkr - b.arrival_uz_vagon_id_division_on_amkr;
                });
                //
                var nums = list_cars.reduce(function (r, i) {
                    r[i['arrival_uz_vagon_division_abbr_' + App.Lang]] = r[i['arrival_uz_vagon_division_abbr_' + App.Lang]] || [];
                    r[i['arrival_uz_vagon_division_abbr_' + App.Lang]].push(i);
                    return r;
                }, {});
                //
                this.mf_move_nums.open(langView('vicr_title_form_move_nums', App.Langs));
                //
                this.$div_list_nums.empty();
                this.$ul_page1.empty();
                this.$ul_page2.empty();
                $.each(nums, function (i, el) {
                    if (el && el.length > 0) {
                        var $list_nums = $('<ul id="list_nums" class="connectedSortable"></ul>');
                        for (var inum = 0; inum < el.length; inum++) {
                            // Добавить документ в таблицу
                            $list_nums.append($('<li num="' + el[inum].num + '" class="ui-state-default">' + el[inum].num + '</li>'));
                        }
                        this.$div_list_nums.append($('<div class="name_division mb-1 mt-1 text-center text-primary font-weight-bold font-italic">' + i + '</div>')).append($list_nums);
                    }
                }.bind(this));
                //
                $("#list_nums, #report_page1, #report_page2").sortable({
                    connectWith: ".connectedSortable"
                }).disableSelection();
            }
        }.bind(this));
    };
    //
    view_incoming_report.prototype.report = function () {
        switch (this.type_report) {
            case 'aica_kr': {
                this.aica('Кривий Ріг');
                break;
            };
            case 'aica_kr_gl': {
                this.aica('Кривий Ріг-Головний');
                break;
            };
            case 'api_kr': {
                this.api('Кривий Ріг');
                break;
            };
            case 'api_kr_gl': {
                this.api('Кривий Ріг-Головний');
                break;
            };
            case 'apaca_kr': {
                this.api('Кривий Ріг');
                break;
            };
            case 'apaca_kr_gl': {
                this.api('Кривий Ріг-Головний');
                break;
            };
            case 'gfa': {
                this.gfa();
                break;
            };
            case 'dg20': {
                this.dg20();
                break;
            };
            case 'way': {
                this.way();
                break;
            };
        }
    };
    //
    view_incoming_report.prototype.aica = function (station_name) {
        if (this.rows && this.rows.length > 0) {
            var mywindow = window.open('', 'Заявка на выдачу коммерческого акта ст. ' + station_name);
            mywindow.document.write('<html><head><title>Заявка на выдачу коммерческого акта ст. ' + station_name + '</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
            mywindow.document.write('</head><body>');
            mywindow.document.write('<div class=WordSection1>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику станції</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">' + station_name + '</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
            mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">на видачу комерційного акту</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год.________хв.</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Згідно зі ст. 129 Статуту залізниць України прошу скласти та надати комерційний акт на вантаж , що прибув потягом № ­­­­­­­ ­­­­­­­­­­­­­­_______________(дата)</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">__________(год./хв.) з невідповідності маси вантажу натурою з даними, зазначеними у залізничній накладній</span></p>');

            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
            mywindow.document.write('<tr>');
            mywindow.document.write('<td>Вагон №</td>');
            mywindow.document.write('<td>Найменування вантажу</td>');
            mywindow.document.write('<td>Станція відправлення</td>');
            mywindow.document.write('<td>Відправник</td>');
            mywindow.document.write('</tr>');

            $.each(this.rows, function (i, el) {
                mywindow.document.write('<tr>');
                mywindow.document.write('<td>');
                mywindow.document.write(el.num);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(el['arrival_uz_vagon_cargo_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(el['arrival_uz_document_station_from_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td class="shipper">');
                mywindow.document.write(el['arrival_uz_document_shipper_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('</tr>');
            }.bind(this));
            mywindow.document.write('</table>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Представник</span></p>');
            mywindow.document.write('</div>');
            mywindow.document.write('</body></html>');
            LockScreenOff();
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
        }
    };
    //
    view_incoming_report.prototype.api = function (station_name) {
        if (this.rows && this.rows.length > 0) {

            var mywindow = window.open('', 'Заявка на участие в выдаче ст. ' + station_name);
            mywindow.document.write('<html><head><title>Заявка на участие в выдаче ст. ' + station_name + '</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
            mywindow.document.write('</head><body>');
            mywindow.document.write('<div class=WordSection1>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику станції</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">' + station_name + '</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год.________хв.</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Відповідно до ст. 52 Статуту залізниць України , прошу направити представника залізниці для участі у видачі ( переважуванні) вантажу, що прибув поїздом</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">________________________________________(дата)</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">____________________(год/хв)</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
            mywindow.document.write('<tr>');
            mywindow.document.write('<td>Вагон №</td>');
            mywindow.document.write('<td>Найменування вантажу</td>');
            mywindow.document.write('<td>Відправник</td>');
            mywindow.document.write('<td>Станція відправлення</td>');
            mywindow.document.write('<td>Вага по документу</td>');
            mywindow.document.write('</tr>');
            $.each(this.rows, function (i, el) {
                var vesg = el.arrival_uz_vagon_vesg ? Number(Number(el.arrival_uz_vagon_vesg) / 1000) : 0;
                mywindow.document.write('<tr>');
                mywindow.document.write('<td>');
                mywindow.document.write(el.num);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(el['arrival_uz_vagon_cargo_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td class="shipper">');
                mywindow.document.write(el['arrival_uz_document_shipper_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(el['arrival_uz_document_station_from_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(vesg.toFixed(2));
                mywindow.document.write('</td>');
                mywindow.document.write('</tr>');
            }.bind(this));
            mywindow.document.write('</table>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">За результатами перевірки  прошу видати комерційний акт відповідно до Правил.</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">ПП « Стіл Сервіс»&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Ст. ' + station_name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('</div>');
            mywindow.document.write('</body></html>');
            LockScreenOff();
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
        }
    };
    //
    view_incoming_report.prototype.apaca = function (station_name) {
        if (this.rows && this.rows.length > 0) {
            var mywindow = window.open('', 'Заявка на участие с попутным коммерческим Актом ст. ' + station_name);
            mywindow.document.write('<html><head><title>Заявка на участие с попутным коммерческим Актом ст. ' + station_name + '</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_aica.css">');
            mywindow.document.write('</head><body>');
            mywindow.document.write('<div class=WordSection1>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Начальнику УЗТ</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">транспортного департаменту</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">ПАТ «АрселорМіттал</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;text-indent:14.0cm"><span lang=UK style="font-size:14.0pt;line-height:107%;">Кривий Ріг»</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal align=center style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:center"><span style="font-size:14.0pt;line-height:107%;">ЗАЯВКА№________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">від__________ 20     р.</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:14.0pt;line-height:107%;">________год. ________хв.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ст. ' + station_name + '</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Відповідно до ст. 52 Статуту залізниць України , прошу подати вагон(и), якій (які) прибув( ли) з попутним комерційним актом, для перевірки маси вантажу . Прибули на адресу ПАТ «« АрселорМіттал  Кривий Ріг» поїздом №_____________</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">____________________( дата , год/хв)</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<br />');
            mywindow.document.write('<table border=1 cellspacing=0 cellpadding=0 width=95% style="border-collapse:collapse;border:none">');
            mywindow.document.write('<tr>');
            mywindow.document.write('<td>Вагон №</td>');
            mywindow.document.write('<td>Найменування вантажу</td>');
            mywindow.document.write('<td>Станція відправлення</td>');
            mywindow.document.write('<td>№ комерційного акту</td>');
            mywindow.document.write('</tr>');
            $.each(this.rows, function (i, el) {

                mywindow.document.write('<tr>');
                mywindow.document.write('<td>');
                mywindow.document.write(el.num);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(el['arrival_uz_vagon_cargo_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write(el['arrival_uz_document_station_from_name_' + App.Lang]);
                mywindow.document.write('</td>');
                mywindow.document.write('<td>');
                mywindow.document.write('</td>');
                mywindow.document.write('</tr>');
            }.bind(this));
            mywindow.document.write('</table>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">За результатами перевірки  прошу видати комерційний акт відповідно до Правил.</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">ПП « Стіл Сервіс»&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Прийомоздавальник вантажу та багажу</span></p>');
            mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt"><span lang=UK style="font-size:14.0pt;line-height:107%;">Ст. ' + station_name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________( П.І.Б)</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('</div>');
            mywindow.document.write('</body></html>');
            LockScreenOff();
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
        }
    };
    //
    view_incoming_report.prototype.gfa = function () {
        if (this.rows && this.rows.length > 0) {
            var mywindow = window.open('', 'Акт общей формы');
            mywindow.document.write('<html><head><title>Акт общей формы</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_gfa.css">');
            mywindow.document.write('</head><body>');
            mywindow.document.write('<div class=WordSection1>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal style="margin-left:450pt"><span lang=UK>Форма ГУ-23</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal align=center style="text-align:center"><b><span lang=UK>АКТ ЗАГАЛЬНОЇ ФОРМИ №</span></b><span lang=UK>    ____</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Станція       <u>___________________________</u></span><u><span lang=EN-US>_________</span></u><u><span lang=UK>______________________</span></u><span lang=UK>залізниця  </span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Поїзд № _________на перегоні________________________________________                               </span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK> «____»________________2020р.       </span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Цей акт  складений  у присутності таких осіб:</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK> </span><span lang=UK> </span><span lang=UK>прийомоздавальник ПП « Стіл-Сервис» ________________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>  прийомоздавальник ПП « Стіл-Сервис»   _______________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>  прийомоздавальник АТ «Укрзалізниця»  _______________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Станція відправлення            <u>_____________________</u>  залізниця</span>_____________________</p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Станція призначення            <u> ________</u>_____________  залізниця</span><span lang=UK> </span><span lang=EN-US>______________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Накладна №    <u> ______</u>    від «_____»  _______________20__ р.</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Вагон, контейнер № </span></p>');
            mywindow.document.write('<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style="border-collapse:collapse;border:none">');
            mywindow.document.write('<tr>');
            mywindow.document.write('<td border:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
            mywindow.document.write('<p class=MsoNormal>');
            $.each(this.rows, function (i, el) {
                mywindow.document.write(el.num + '; ');
            }.bind(this));
            mywindow.document.write('</p>');
            mywindow.document.write('</td>');
            mywindow.document.write('</tr>');
            mywindow.document.write('</table>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>Найменування вантажу_______________________________________________________________________</span></p>');
            mywindow.document.write('<p class=MsoNormalCxSpMiddle style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal"><span lang=UK>Опис обставин , що викликали складання акта: </span></p>');
            mywindow.document.write('<p class=MsoNormalCxSpMiddle style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal"><span lang=UK>_____________________________________________________________________________________________</span></p>');
            mywindow.document.write('<p class=MsoNormalCxSpMiddle style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal"><span lang=UK>_____________________________________________________________________________________________</span></p>');
            mywindow.document.write('<p class=MsoNormalCxSpMiddle style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal"><span lang=UK>_____________________________________________________________________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormalCxSpMiddle style="margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify;line-height:normal"><b><span lang=UK>Підписи</span></b></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>прийомоздавальник ПП « Стіл-Сервис» ___________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>прийомоздавальник ПП « Стіл-Сервис»   ___________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>прийомоздавальник АТ «Укрзалізниця»  ___________________________________</span></p>');
            mywindow.document.write('<br />');
            mywindow.document.write('<p class=MsoNormal><span lang=UK>оглядач</span> вагонів  <span lang=UK>П</span>П «Стіл<span lang=UK>-</span>Сервис»        <span lang=UK>  ____________________________________</span></p>');
            mywindow.document.write('</div>');
            mywindow.document.write('</body>');
            mywindow.document.write('</html>');
            LockScreenOff();
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
        }
    };
    //
    view_incoming_report.prototype.dg20 = function () {
        if ((this.rows_list1 && this.rows_list1.length > 0) ||
            (this.rows_list2 && this.rows_list2.length > 0)) {
            var mywindow = window.open('', 'Форма ДГ-20');
            mywindow.document.write('<html><head><title>Форма ДГ-20</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_dg20.css">');
            mywindow.document.write('<div class=WordSection1>');
            mywindow.document.write('<table class="MsoTableGrid" border=0 cellspacing=0 cellpadding=0>');
            mywindow.document.write('<tr>');
            mywindow.document.write('<td width=525 valign=top>');
            if (this.rows_list1 && this.rows_list1.length > 0) {
                this.add_document(mywindow, this.rows_list1, 1)
            }
            mywindow.document.write('</td>');
            mywindow.document.write('<td width=525 valign=top>');
            if (this.rows_list2 && this.rows_list2.length > 0) {
                this.add_document(mywindow, this.rows_list2, 2)
            }
            mywindow.document.write('</td>');
            mywindow.document.write('</tr>');
            mywindow.document.write('</table>');
            mywindow.document.write('</div>');
            mywindow.document.write('</head><body>');
            mywindow.document.write('</body></html>');
            LockScreenOff();
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10
        }
    };
    //
    view_incoming_report.prototype.way = function () {
        if (this.rows && this.rows.length > 0) {
            var mywindow = window.open('', 'Путевые');
            mywindow.document.write('<html><head><title>Путевые на вагоны</title>');
            mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print_way.css">');
            mywindow.document.write('</head><body>');
            mywindow.document.write('<div class=WordSection1>');
            var count = this.rows.length;
            $.each(this.rows, function (i, el) {
                var process = 2;
                var date_otpr = null;
                var num_sert = null;
                var num_act = null;
                // Выход из загрузок
                var out_load = function (process) {
                    if (process === 0) {
                        var rod = el['arrival_uz_vagon_rod_abbr_' + App.Lang];
                        var station_from_name = el['arrival_uz_document_station_from_name_' + App.Lang];
                        var shipper_name = el['arrival_uz_document_shipper_name_' + App.Lang];
                        var ves_tary_arc = el.arrival_uz_vagon_ves_tary_arc ? Number(Number(el.arrival_uz_vagon_ves_tary_arc) / 1000) : 0;
                        var certification_data = el['arrival_uz_vagon_sertification_data_' + App.Lang];
                        var vesg = el.arrival_uz_vagon_vesg ? Number(Number(el.arrival_uz_vagon_vesg) / 1000) : 0;
                        var cargo_name = el['arrival_uz_vagon_cargo_name_' + App.Lang];
                        //-------------------
                        mywindow.document.write('<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style="border-collapse:collapse;border:none">');
                        mywindow.document.write('<tr><td width=704 valign=top style="width:528.1pt;border:solid white 1.0pt;border-bottom:dashed windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style="margin-left:5.4pt;border-collapse:collapse;border:none">');
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=181 colspan=2 valign=top style="width:136.1pt;border:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">ПУТЕВАЯ</span></b><span class="text-title"> <b>№</b>  __________</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=276 colspan=2 valign=top style="width:206.8pt;border:solid white 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Дата отгрузки ТМЦ </span></b><span class="text-title"><i>' + date_otpr + '</i></span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=223 colspan=4 valign=top style="width:167.4pt;border:solid white 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Дата приема </span></b><span style="color:black" class="text-title"><i>' + this.sostav.date_adoption + '</i></span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        //
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=130 valign=top style="border:solid white 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Вагон № </span></b><span class="text-title-num">' + el.num + '</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=80 colspan=2 valign=top style="border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Род вагона </span></b><i><span class="text-title">' + (rod ? rod : '______') + '</span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=300 colspan=3 valign=top style="border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><i><span class="text-title">Серт.: </span></i></b><span class="text-title"></span><i><span lang=EN-US class="text-title">' + (num_sert ? num_sert : '_______') + '</span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=220 colspan=2 valign=top style="border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt"><p class=MsoNormal class="p-text-title"><b><i><span class="text-title">Удост.: </span></i></b><i><span class="text-title"><span lang=EN-US>' + (num_act ? num_act : '_______') + '</span></span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        //
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=482 colspan=5 valign=top style="width:361.5pt;border:solid white 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:normal"><b><span class="text-title1">Станция отправления </span></b><span class="text-title1"><i>' + (station_from_name ? station_from_name : '________________________________') + '</i> </span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=94 colspan=2 valign=top style="width:70.85pt;border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Вес по ж. д.</span></b></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=104 valign=top style="width:77.95pt;border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Вес по перев.</span></b></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        //
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=482 colspan=5 valign=top style="width:361.5pt;border:solid white 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:normal"><b><span class="text-title1">Отправитель </span></b><span class="text-title1"><i>' + (shipper_name ? shipper_name : '________________________________') + '</i></span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=94 colspan=2 valign=top style="width:70.85pt;border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">накладной</span></b></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=104 valign=top style="width:77.95pt;border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><i><span class="text-title">бр. </span></i><span class="text-title">_________</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        //
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=482 colspan=5 valign=top style="width:361.5pt;border:solid white 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Получатель </span></b><span class="text-title"><i>______________________________________</i></span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=94 colspan=2 valign=top style="width:70.85pt;border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><i><span class="text-title">т. </span></i><span class="text-title"> </span><i><span lang=EN-US class="text-title">' + (ves_tary_arc > 0 ? ves_tary_arc.toFixed(2) : '_________') + '</span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=104 valign=top style="width:77.95pt;border-top:none;border-left:none;border-bottom:solid white 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><i><span class="text-title">т. </span></i><span class="text-title"> </span><i><span lang=EN-US class="text-title">' + (ves_tary_arc > 0 ? ves_tary_arc.toFixed(2) : '_________') + '</span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        //
                        mywindow.document.write('<tr>');
                        mywindow.document.write('<td width=482 colspan=5 valign=top style="width:361.5pt;border-top:none;border-left:solid white 1.0pt;border-bottom:none windowtext 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Наименование груза </span></b><span class="text-title"><i>' + (cargo_name ? cargo_name : '________________________________') + '</i></span></p>');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><b><span class="text-title">Сертификатные данные </span></b><span class="text-title"> </span><i><span lang=EN-US class="text-title">' + (certification_data ? certification_data : '________________________________') + '</span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=94 colspan=2 valign=top style="width:70.85pt;border-top:none;border-left:none;border-bottom:none windowtext 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><i><span class="text-title">н. </span></i><span class="text-title"></span><i><span lang=EN-US class="text-title">' + (vesg > 0 ? vesg.toFixed(2) : '_________') + '</span></i></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=104 valign=top style="width:77.95pt;border-top:none;border-left:none;border-bottom:none windowtext 1.0pt;border-right:solid white 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><i><span class="text-title">н. </span></i><span class="text-title">_________</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        mywindow.document.write('</table>');
                        //
                        mywindow.document.write('<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 width=680 style="width:18.0cm;margin-left:5.4pt;border-collapse:collapse;border:none">');
                        mywindow.document.write('<tr style="height:14.35pt">');
                        mywindow.document.write('<td width=160 rowspan=2 valign=top style="width:120.35pt;border:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Станция назначения предприятия</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=173 colspan=2 valign=top style="width:129.95pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Дата и время прибытия на станцию</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=173 colspan=2 valign=top style="width:130.0pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Дата и время подачи под выгрузку</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=173 colspan=2 valign=top style="width:130.0pt;border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt;height:14.35pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Дата и время окончания выгрузки</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        mywindow.document.write('<tr style="height:14.45pt">');
                        mywindow.document.write('<td width=87 valign=top style="width:64.95pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Дата</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Время</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Дата</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Время</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Дата</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:14.45pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">Время</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        mywindow.document.write('<tr style="height:21.0pt">');
                        mywindow.document.write('<td width=160 valign=top style="width:120.35pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:64.95pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title">&nbsp;</span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('<td width=87 valign=top style="width:65.0pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;height:21.0pt">');
                        mywindow.document.write('<p class=MsoNormal align=center class="p-text-title1"><span class="text-title"></span></p>');
                        mywindow.document.write('</td>');
                        mywindow.document.write('</tr>');
                        mywindow.document.write('</table>');
                        mywindow.document.write('<br />');
                        //
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><span class="text-title">Приемосдатчик гр. и баг. ст. примыкания АМКР__________________________________ (Ф.И.О.,подпись)</span></p>');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><span class="text-title">Приемосдатчик гр. и баг. станции-назначения___________________________________ (Ф.И.О.,подпись)</span></p>');
                        mywindow.document.write('<p class=MsoNormal class="p-text-title"><span class="text-title">Расписка цеха-получателя___________________________________________________ (Ф.И.О.,подпись)</span></p>');

                        mywindow.document.write('</td></tr>');
                        mywindow.document.write('</table>');
                        mywindow.document.write('<br />');
                        count--;
                        // Выход из цикла закрываем документ
                        if (count === 0) {
                            mywindow.document.write('</body>');
                            mywindow.document.write('</html>');
                            LockScreenOff();
                            mywindow.document.close(); // necessary for IE >= 10
                            mywindow.focus(); // necessary for IE >= 10
                        }
                    }
                }.bind(this);
                // Поиск по документу УЗ
                this.ids_wsd.getOTPR_UZ_DOCOfNum(el.arrival_car_num_doc, function (doc_uz_sms) {
                    if (doc_uz_sms !== null) {
                        // Получим дату отправки
                        date_otpr = doc_uz_sms.date_otpr ? moment(doc_uz_sms.date_otpr).format(format_datetime) : '';
                    }
                    process--;
                    out_load(process);
                }.bind(this));
                // Поиск по документу идс
                this.ids_wsd.getArrival_UZ_Document_DocsOfID_Document(el.arrival_uz_document_id, function (docs) {
                    var sert = null;
                    var act = null;
                    if (docs && docs.length > 0) {
                        sert = docs.find(function (o) { return o.doc_type === "210" || o.doc_type === "220"; });
                        if (sert) {
                            var index_start = sert.description.indexOf('№', 0);
                            num_sert = sert.description.substring(index_start);
                        }
                        act = docs.find(function (o) { return o.doc_type === "160"; });
                        if (act) {
                            var index_start = act.description.indexOf('№', 0);
                            num_act = act.description.substring(index_start);
                        }
                    }
                    process--;
                    out_load(process);
                }.bind(this));
            }.bind(this));
        }
    };
    //
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
        if (this.mf_select_nums) {
            this.mf_select_nums.destroy();
            this.mf_select_nums = null;
        }
        this.table_manual_cars.destroy();
        if (this.mf_move_nums) {
            this.mf_move_nums.destroy();
            this.mf_move_nums = null;
        }
    }

    App.view_incoming_report = view_incoming_report;

    window.App = App;
})(window);