/*Модуль Таблица "Прибываемые составы"*/
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
            'camc_mess_init_module': 'Инициализация модуля chart_amcharts...',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function chart_amcharts(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        //this.fc_ui = new FC();
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }
    //==========================================================================================
    // Инициализация диаграммы Гистограмма с накоплением
    chart_amcharts.prototype.init_stacked_column_chart_percent = function () {
        this.chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: this.root.verticalLayout
        }));
        // добавим в диограмму скролер
        this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
            orientation: "horizontal"
        }));
        // Создадим Оси
        // Ось X (Группы)
        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
            categoryField: "group",
            //autoGridCount: false,
            //strictMinMaxSelection: true,
            //strictMinMax: true,
            //extraMax: 0.1,
            //maxPrecision: 1,
            renderer: am5xy.AxisRendererX.new(this.root, {}),
            tooltip: am5.Tooltip.new(this.root, {})
        }));
        // Ось Y (Содержимое групп)
        this.yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
            min: 0,
            max: 100,
            numberFormat: "#'%'",
            strictMinMax: true,
            calculateTotals: true,
            renderer: am5xy.AxisRendererY.new(this.root, {})
        }));
        // Add legend
        this.legend = this.chart.children.push(am5.Legend.new(this.root, {
            centerX: am5.p50,
            x: am5.p50
        }));
    };
    // Инициализация диаграммы Простая древовидная карта
    chart_amcharts.prototype.init_simple_treemap = function () {
        // Create wrapper container
        this.container = this.root.container.children.push(
            am5.Container.new(this.root, {
                width: am5.percent(100),
                height: am5.percent(100),
                layout: this.root.verticalLayout
            })
        );
        // Create series
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
        this.series = this.container.children.push(
            am5hierarchy.Treemap.new(this.root, {
                singleBranchOnly: false,
                downDepth: 1,
                upDepth: -1,
                initialDepth: 2,
                valueField: "value",
                categoryField: "name",
                childDataField: "children",
                nodePaddingOuter: 0,
                nodePaddingInner: 0
            })
        );
        this.series.rectangles.template.setAll({
            strokeWidth: 2
        });

        var data = {
            name: "Root",
            children: []
        };
    };
    // Инициализация диаграммы Столбец с повернутыми метками
    chart_amcharts.prototype.init_column_with_rotated_labels = function () {
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        this.cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {}));
        this.cursor.lineY.set("visible", false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        this.xRenderer = am5xy.AxisRendererX.new(this.root, { minGridDistance: 30 });
        this.xRenderer.labels.template.setAll({
            //rotation: -90,
            //centerY: am5.p50,
            //centerX: am5.p100,
            paddingRight: 15
        });

        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: this.xRenderer,
            tooltip: am5.Tooltip.new(this.root, {})
        }));

        this.yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(this.root, {})
        }));

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.series = this.chart.series.push(am5xy.ColumnSeries.new(this.root, {
            name: "Series 1",
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(this.root, {
                labelText: "{valueY}"
            })
        }));

        this.series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
        this.series.columns.template.adapters.add("fill", function (fill, target) {
            return this.chart.get("colors").getIndex(this.series.columns.indexOf(target));
        }.bind(this));

        this.series.columns.template.adapters.add("stroke", function (stroke, target) {
            return this.chart.get("colors").getIndex(this.series.columns.indexOf(target));
        }.bind(this));


    };
    // Инициализация круговая диаграмма
    chart_amcharts.prototype.init_pie_chart = function () {

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        this.chart = this.root.container.children.push(
            am5percent.PieChart.new(this.root, {
                endAngle: 270
            })
        );
        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        this.series = this.chart.series.push(
            am5percent.PieSeries.new(this.root, {
                valueField: "value",
                categoryField: "category",
                endAngle: 270
            })
        );

        this.series.states.create("hidden", {
            endAngle: -90
        });
    };

    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    chart_amcharts.prototype.init_type_chart = function () {
        switch (this.settings.type_chart) {
            case 'stacked_column_chart_percent': {
                this.init_stacked_column_chart_percent();
                break;
            };
            case 'simple_treemap': {
                this.init_simple_treemap();
                break;
            };
            case 'column_with_rotated_labels': {
                this.init_column_with_rotated_labels();
                break;
            };
            // круговая диаграмма
            case 'pie_chart': {
                this.init_pie_chart();
                break;
            };
            // 
            default: {
                break;
            };
        };
    };
    // Инициализация диаграмы
    chart_amcharts.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('camc_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_chart: null,     // 
            fn_init: null,
        }, options);

        this.root = null;
        this.xRenderer = null;
        this.container = null;
        this.series = null;
        this.chart = null;
        this.cursor = null;
        this.xAxis = null;
        this.yAxis = null;
        this.legend = null;

        am5.ready(function () {
            // Создадим элемент root
            this.root = am5.Root.new(this.selector);
            // Установим тему
            this.root.setThemes([
                am5themes_Animated.new(this.root)
            ]);
            //
            this.init_type_chart();
        }.bind(this));

        this.data = [];

        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Показать диаграму
    chart_amcharts.prototype.view = function (data) {
        this.data = data;
        switch (this.settings.type_chart) {
            //Гистограмма с накоплением
            case 'stacked_column_chart_percent': {
                this.view_stacked_column_chart_percent(data);
                break;
            };
            case 'simple_treemap': {
                this.view_simple_treemap(data);
                break;
            };
            case 'column_with_rotated_labels': {
                this.view_column_with_rotated_labels(data);
                break;
            };
            case 'pie_chart': {
                this.view_pie_chart(data);
                break;
            };
            // 
            default: {
                break;
            };
        }
    };
    // Гистограмма с накоплением
    chart_amcharts.prototype.view_stacked_column_chart_percent = function (data) {
        if (this.chart) {
            // Очистим отчет
            this.chart.series.clear();
            this.legend.data.clear();
            // Очистим данные для отчета
            var dchart = [];        // Данные для отчета
            var list_series = [];   // Список Series
            // Сформируем данные для отчета 
            $.each(data, function (key, element) {
                var gr = dchart.find(function (o) { return o.group === element.group }.bind(this));
                if (!gr) {
                    var list_gr = data.filter(function (i) { return i.group === element.group }.bind(this));
                    var element_gr = {};
                    element_gr["group"] = element.group;
                    $.each(list_gr, function (key, el_gr) {
                        element_gr[el_gr.fieldName] = el_gr.value;
                        // Проверим список series
                        var ser = list_series.find(function (o) { return o.fieldName === el_gr.fieldName }.bind(this));
                        if (!ser) {
                            list_series.push({ "fieldName": el_gr.fieldName, "name": el_gr.name });
                        }
                    }.bind(this));
                    dchart.push(element_gr);
                }
            }.bind(this));
            // Применим данные для отчета
            this.xAxis.data.setAll(dchart);
            // Добавим серию
            function makeSeries(name, fieldName) {
                var series = this.chart.series.push(am5xy.ColumnSeries.new(this.root, {
                    name: name,
                    stacked: true,
                    xAxis: this.xAxis,
                    yAxis: this.yAxis,
                    valueYField: fieldName,
                    valueYShow: "valueYTotalPercent",
                    categoryXField: "group",
                }));

                series.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
                    tooltipY: am5.percent(10)
                });
                series.data.setAll(dchart);

                // Заставить вещи анимироваться при загрузке
                // https://www.amcharts.com/docs/v5/concepts/animations/
                series.appear();

                series.bullets.push(function () {
                    return am5.Bullet.new(this.root, {
                        sprite: am5.Label.new(this.root, {
                            //text: "{name}:{valueYTotalPercent.formatNumber('#.#')}%",
                            text: "{valueYTotalPercent.formatNumber('#.#')}%",
                            fill: this.root.interfaceColors.get("alternativeText"),
                            centerY: am5.p50,
                            centerX: am5.p50,
                            populateText: true
                        })
                    });
                }.bind(this));

                this.legend.data.push(series);
            }
            // Создадим все Series
            $.each(list_series, function (key, el_ser) {
                makeSeries.call(this, el_ser.name, el_ser.fieldName);
            }.bind(this));
            // Заставьте вещи анимироваться при загрузке
            // https://www.amcharts.com/docs/v5/concepts/animations/
            this.chart.appear(1000, 100);
        }
    };
    // Простая древовидная карта
    chart_amcharts.prototype.view_simple_treemap = function (data) {
        //&& data.children && data.children.length>0
        if (this.series && data) {
            am5.ready(function () {
                // Очистим отчет
                //this.series.data.clear();
                // Generate and set data
                // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
                //var maxLevels = 2;
                //var maxNodes = 10;
                //var maxValue = 100;

                this.series.data.setAll([data]);
                this.series.set("selectedDataItem", this.series.dataItems[0]);

                // Make stuff animate on load
               this.series.appear(1000, 100);
            }.bind(this));
        };
    };
    // Столбец с повернутыми метками
    chart_amcharts.prototype.view_column_with_rotated_labels = function (data) {
        if (this.chart) {
            this.xAxis.data.setAll(data);
            this.series.data.setAll(data);


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            this.series.appear(1000);
            this.chart.appear(1000, 100);
        }
    };
    // Круговая диаграмма
    chart_amcharts.prototype.view_pie_chart = function (data) {
        if (this.chart) {
            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            this.series.data.setAll(data);

            this.series.appear(1000, 100);
        }
    };

    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    chart_amcharts.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    chart_amcharts.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    chart_amcharts.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    chart_amcharts.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    // Очистить объект
    chart_amcharts.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    };
    //
    App.chart_amcharts = chart_amcharts;

    window.App = App;
})(window);