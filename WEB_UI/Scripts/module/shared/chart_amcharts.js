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

        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
            maxDeviation: 0.3,
            categoryField: "name",
            renderer: this.xRenderer,
            tooltip: am5.Tooltip.new(this.root, {})
        }));

        this.xRenderer.labels.template.setAll({
            //rotation: -90,
            //oversizedBehavior: "wrap",
            //textAlign: "center",
            //centerY: am5.p50,
            //centerX: am5.p100,
            //paddingRight: 15

            oversizedBehavior: "wrap",
            maxWidth: 100,
            //maxHeight: 100,
            textAlign: "center"
        });

        // Set up automatic width calculation using an adapter
        //this.xRenderer.labels.template.adapters.add("width", function (width, target) {
        //    var x0 = this.xAxis.getDataItemCoordinateY(this.xAxis.dataItems[0], "category", 0);
        //    var x1 = this.xAxis.getDataItemCoordinateY(this.xAxis.dataItems[0], "category", 1);
        //    target.set("maxWidth", x1 - x0)
        //    return x1 - x0;
        //}.bind(this));

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
            categoryXField: "name",
            tooltip: am5.Tooltip.new(this.root, {
                labelText: "{valueY}"
            })
        }));

        this.series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
        // Сделайте так, чтобы каждый столбец был другого цвета
        this.series.columns.template.adapters.add("fill", function (fill, target) {
            return this.chart.get("colors").getIndex(this.series.columns.indexOf(target));
        }.bind(this));

        this.series.columns.template.adapters.add("stroke", function (stroke, target) {
            return this.chart.get("colors").getIndex(this.series.columns.indexOf(target));
        }.bind(this));

        // Маркер "Добавить метку"
        this.series.bullets.push(function () {
            return am5.Bullet.new(this.root, {
                locationY: 1,
                sprite: am5.Label.new(this.root, {
                    text: "{valueYWorking.formatNumber('#.')}",
                    fill: this.root.interfaceColors.get("alternativeText"),
                    centerY: 0,
                    centerX: am5.p50,
                    populateText: true
                })
            });
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
                categoryField: "name",
                endAngle: 270
            })
        );

        this.series.states.create("hidden", {
            endAngle: -90
        });
    };
    // Инициализация Пончик с радиальным градиентом
    chart_amcharts.prototype.init_donut_with_radial_gradient = function () {

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        this.chart = this.root.container.children.push(
            am5percent.PieChart.new(this.root, {
                radius: am5.percent(90),
                innerRadius: am5.percent(50),
                layout: this.root.horizontalLayout
            }));

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        this.series = this.chart.series.push(am5percent.PieSeries.new(this.root, {
            name: "Series",
            valueField: "value",
            categoryField: "name",
        }));

        // Отключение меток и тиков
        this.series.labels.template.set("visible", false);
        this.series.ticks.template.set("visible", false);

        // Adding gradients
        this.series.slices.template.set("strokeOpacity", 0);
        this.series.slices.template.set("fillGradient", am5.RadialGradient.new(this.root, {
            stops: [{
                brighten: -0.8
            }, {
                brighten: -0.8
            }, {
                brighten: -0.5
            }, {
                brighten: 0
            }, {
                brighten: -0.5
            }]
        }));

        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        this.legend = this.chart.children.push(am5.Legend.new(this.root, {
            centerY: am5.percent(50),
            y: am5.percent(50),
            layout: this.root.verticalLayout
        }));
        // set value labels align to right
        this.legend.valueLabels.template.setAll({ textAlign: "right" })
        // set width and max width of labels
        this.legend.labels.template.setAll({
            maxWidth: 140,
            width: 140,
            oversizedBehavior: "wrap"
        });

    };
    // Инициализация Круговая диаграмма переменного радиуса
    chart_amcharts.prototype.init_variable_radius_pie_chart = function () {
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        this.chart = this.root.container.children.push(am5percent.PieChart.new(this.root, {
            layout: this.root.verticalLayout
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        this.series = this.chart.series.push(am5percent.PieSeries.new(this.root, {
            alignLabels: true,
            calculateAggregates: true,
            valueField: "value",
            categoryField: "name",
        }));

        this.series.slices.template.setAll({
            strokeWidth: 3,
            stroke: am5.color(0xffffff)
        });

        this.series.labelsContainer.set("paddingTop", 30)


        // Set up adapters for variable slice radius
        // https://www.amcharts.com/docs/v5/concepts/settings/adapters/
        this.series.slices.template.adapters.add("radius", function (radius, target) {
            var dataItem = target.dataItem;
            var high = this.series.getPrivate("valueHigh");

            if (dataItem) {
                var value = target.dataItem.get("valueWorking", 0);
                return radius * value / high
            }
            return radius;
        }.bind(this));

        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        this.legend = this.chart.children.push(am5.Legend.new(this.root, {
            centerX: am5.p50,
            x: am5.p50,
            marginTop: 15,
            marginBottom: 15
        }));
    };
    // Инициализация Радиальная гистограмма
    chart_amcharts.prototype.init_radial_histogram = function () {

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = this.root.container.children.push(am5radar.RadarChart.new(this.root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            startAngle: -84,
            endAngle: 264,
            innerRadius: am5.percent(40)
        }));


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = this.chart.set("cursor", am5radar.RadarCursor.new(this.root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("forceHidden", true);


        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
            orientation: "horizontal",
            exportable: false
        }));

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5radar.AxisRendererCircular.new(this.root, {
            minGridDistance: 30
        });

        xRenderer.grid.template.set("forceHidden", true);

        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
            maxDeviation: 0,
            categoryField: "name",
            renderer: xRenderer
        }));

        this.yRenderer = am5radar.AxisRendererRadial.new(this.root, {});
        this.yRenderer.labels.template.set("centerX", am5.p50);

        this.yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
            maxDeviation: 0.3,
            min: 0,
            renderer: this.yRenderer
        }));

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.series = this.chart.series.push(am5radar.RadarColumnSeries.new(this.root, {
            name: "Series 1",
            sequencedInterpolation: true,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            valueYField: "value",
            categoryXField: "name"
        }));

        // Rounded corners for columns
        this.series.columns.template.setAll({
            cornerRadius: 5,
            tooltipText: "{categoryX}: {valueY}"
        });

        // Make each column to be of a different color
        this.series.columns.template.adapters.add("fill", function (fill, target) {
            return this.chart.get("colors").getIndex(this.series.columns.indexOf(target));
        }.bind(this));

        this.series.columns.template.adapters.add("stroke", function (stroke, target) {
            return this.chart.get("colors").getIndex(this.series.columns.indexOf(target));
        }.bind(this));
    };
    // Инициализация круговая диаграмма
    chart_amcharts.prototype.init_pie_exploding_pie_chart = function () {

        this.container = this.root.container.children.push(
            am5.Container.new(this.root, {
                width: am5.p100,
                height: am5.p100,
                layout: this.root.horizontalLayout
            })
        );

        // Create main chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        this.chart = this.container.children.push(
            am5percent.PieChart.new(this.root, {
                tooltip: am5.Tooltip.new(this.root, {})
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        this.series = this.chart.series.push(
            am5percent.PieSeries.new(this.root, {
                valueField: "value",
                categoryField: "name",
                alignLabels: false
            })
        );

        this.series.labels.template.setAll({
            textType: "circular",
            radius: 4
        });
        this.series.ticks.template.set("visible", false);
        this.series.slices.template.set("toggleKey", "none");

        // add events
        this.series.slices.template.events.on("click", function (e) {
            this.selectSlice(e.target);
        }.bind(this));

        // Create sub chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var subChart = this.container.children.push(
            am5percent.PieChart.new(this.root, {
                radius: am5.percent(50),
                tooltip: am5.Tooltip.new(this.root, {})
            })
        );

        // Create sub series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        this.subSeries = subChart.series.push(
            am5percent.PieSeries.new(this.root, {
                valueField: "value",
                categoryField: "name"
            })
        );

        //this.subData = [];

        //if (this.settings.list_name) {
        //    $.each(this.settings.list_name, function (key, el) {
        //        this.subData.push({ name: el['cargo_group_name_' + App.Lang], value: 0 });
        //    }.bind(this));
        //}
        //this.subSeries.data.setAll(this.subData)

        //this.subSeries.data.setAll([
        //    { name: "АПП рр", value: 0 },
        //    { name: "B", value: 0 },
        //    { name: "C", value: 0 },
        //    { name: "D", value: 0 },
        //    { name: "E", value: 0 },
        //    { name: "F", value: 0 },
        //    { name: "G", value: 0 }
        //]);

        this.subSeries.data.setAll([
            { name: "1", value: 0 },
            { name: "2", value: 0 },
            { name: "3", value: 0 },
            { name: "4", value: 0 },
            { name: "5", value: 0 },
            { name: "6", value: 0 },
            { name: "7", value: 0 },
            { name: "8", value: 0 },
            { name: "9", value: 0 },
            { name: "10", value: 0 },
            { name: "11", value: 0 },
            { name: "12", value: 0 },
            { name: "13", value: 0 },
            { name: "14", value: 0 },
            { name: "15", value: 0 },
            { name: "16", value: 0 },
            { name: "17", value: 0 },
            { name: "18", value: 0 },
            { name: "19", value: 0 },
            { name: "20", value: 0 },
        ]);

        this.subSeries.slices.template.set("toggleKey", "none");

        this.selectedSlice;

        this.series.on("startAngle", function () {
            updateLines.call(this);
        }.bind(this));

        this.container.events.on("boundschanged", function () {
            this.root.events.on("frameended", function () {
                updateLines.call(this);
            }.bind(this))
        }.bind(this))

        function updateLines() {
            if (this.selectedSlice) {
                var startAngle = this.selectedSlice.get("startAngle");
                var arc = this.selectedSlice.get("arc");
                var radius = this.selectedSlice.get("radius");

                var x00 = radius * am5.math.cos(startAngle);
                var y00 = radius * am5.math.sin(startAngle);

                var x10 = radius * am5.math.cos(startAngle + arc);
                var y10 = radius * am5.math.sin(startAngle + arc);

                var subRadius = this.subSeries.slices.getIndex(0).get("radius");
                var x01 = 0;
                var y01 = -subRadius;

                var x11 = 0;
                var y11 = subRadius;

                var point00 = this.series.toGlobal({ x: x00, y: y00 });
                var point10 = this.series.toGlobal({ x: x10, y: y10 });

                var point01 = this.subSeries.toGlobal({ x: x01, y: y01 });
                var point11 = this.subSeries.toGlobal({ x: x11, y: y11 });

                this.line0.set("points", [point00, point01]);
                this.line1.set("points", [point10, point11]);
            }
        }

        // lines
        this.line0 = this.container.children.push(
            am5.Line.new(this.root, {
                position: "absolute",
                stroke: this.root.interfaceColors.get("text"),
                strokeDasharray: [2, 2]
            })
        );
        this.line1 = this.container.children.push(
            am5.Line.new(this.root, {
                position: "absolute",
                stroke: this.root.interfaceColors.get("text"),
                strokeDasharray: [2, 2]
            })
        );

        //-----------------

        this.selectSlice = function (slice) {
            this.selectedSlice = slice;
            var dataItem = slice.dataItem;
            var dataContext = dataItem.dataContext;

            if (dataContext) {
                var i = 0;
                this.subSeries.data.each(function (dataObject) {
                    var dataObj = dataContext.subData[i];
                    if (dataObj) {
                        this.subSeries.data.setIndex(i, dataObj);
                        if (!this.subSeries.dataItems[i].get("visible")) {
                            this.subSeries.dataItems[i].show();
                        }
                    }
                    else {
                        this.subSeries.dataItems[i].hide();
                    }

                    i++;
                }.bind(this));
            }

            var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
            var firstAngle = this.series.dataItems[0].get("slice").get("startAngle");

            this.series.animate({
                key: "startAngle",
                to: firstAngle - middleAngle,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic)
            });
            this.series.animate({
                key: "endAngle",
                to: firstAngle - middleAngle + 360,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic)
            });
        }

        this.series.events.on("datavalidated", function () {
            this.selectSlice(this.series.slices.getIndex(0));
        }.bind(this));
    };
    // Инициализация Разделенная гистограмма
    chart_amcharts.prototype.init_partitioned_bar_chart = function () {
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            layout: this.root.horizontalLayout
        }));
        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        //this.legendData = [];
        this.legend = this.chart.children.push(
            am5.Legend.new(this.root, {
                nameField: "name",
                fillField: "color",
                strokeField: "color",
                //centerY: am5.p50,
                marginLeft: 20,
                y: 20,
                layout: this.root.verticalLayout,
                clickTarget: "none"
            })
        );
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        this.yAxis = this.chart.yAxes.push(am5xy.CategoryAxis.new(this.root, {
            categoryField: "name",
            renderer: am5xy.AxisRendererY.new(this.root, {
                minGridDistance: 10
            }),
            tooltip: am5.Tooltip.new(this.root, {})
        }));

        this.yAxis.get("renderer").labels.template.setAll({
            fontSize: 12,
            location: 0.5
        })

        //this.yAxis.data.setAll(data);

        this.xAxis = this.chart.xAxes.push(am5xy.ValueAxis.new(this.root, {
            renderer: am5xy.AxisRendererX.new(this.root, {}),
            tooltip: am5.Tooltip.new(this.root, {})
        }));

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.series = this.chart.series.push(am5xy.ColumnSeries.new(this.root, {
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            valueXField: "value",
            categoryYField: "name",
            tooltip: am5.Tooltip.new(this.root, {
                pointerOrientation: "horizontal"
            })
        }));

        this.series.columns.template.setAll({
            tooltipText: "{categoryY}: [bold]{valueX}[/]",
            width: am5.percent(90),
            strokeOpacity: 0
        });

        //// Add cursor
        //// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        //var cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
        //    xAxis: this.xAxis,
        //    yAxis: this.yAxis
        //}));
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
            // Пончик с радиальным градиентом
            case 'donut_with_radial_gradient': {
                this.init_donut_with_radial_gradient();
                break;
            };
            // Круговая диаграмма переменного радиуса
            case 'variable_radius_pie_chart': {
                this.init_variable_radius_pie_chart();
                break;
            };
            // Радиальная гистограмма
            case 'radial_histogram': {
                this.init_radial_histogram();
                break;
            };
            // круговая диаграмма
            case 'pie_exploding_pie_chart': {
                this.init_pie_exploding_pie_chart();
                break;
            };
            // Разделенная гистограмма
            case 'partitioned_bar_chart': {
                this.init_partitioned_bar_chart();
                break;
            };
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
            list_name: null,
        }, options);

        this.root = null;
        this.xRenderer = null;
        this.container = null;
        this.series = null;
        this.subSeries = null;
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
            case 'donut_with_radial_gradient': {
                this.view_donut_with_radial_gradient(data);
                break;
            };
            case 'variable_radius_pie_chart': {
                this.view_variable_radius_pie_chart(data);
                break;
            };
            case 'radial_histogram': {
                this.view_radial_histogram(data);
                break;
            };
            case 'pie_exploding_pie_chart': {
                this.view_pie_exploding_pie_chart(data);
                break;
            };
            // Разделенная гистограмма
            case 'partitioned_bar_chart': {
                this.view_partitioned_bar_chart(data);
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

            // Get series item by category
            function getSeriesItem(category, series) {
                for (var i = 0; i < series.dataItems.length; i++) {
                    var dataItem = series.dataItems[i];
                    if (dataItem.get("categoryX") == category) {
                        return dataItem;
                    }
                }
            };

            // Axis sorting
            function sortCategoryAxis(series, xAxis) {
                // Sort by value
                series.dataItems.sort(function (x, y) {
                    return y.get("valueY") - x.get("valueY"); // descending
                    //return y.get("valueY") - x.get("valueY"); // ascending
                })

                // Go through each axis item
                am5.array.each(xAxis.dataItems, function (dataItem) {
                    // get corresponding series item
                    var seriesDataItem = getSeriesItem(dataItem.get("category"), series);

                    if (seriesDataItem) {
                        // get index of series data item
                        var index = series.dataItems.indexOf(seriesDataItem);
                        // calculate delta position
                        var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
                        // set index to be the same as series data item index
                        dataItem.set("index", index);
                        // set deltaPosition instanlty
                        dataItem.set("deltaPosition", -deltaPosition);
                        // animate delta position to 0
                        dataItem.animate({
                            key: "deltaPosition",
                            to: 0,
                            duration: 1000,
                            easing: am5.ease.out(am5.ease.cubic)
                        })
                    }
                });

                // Sort axis items by index.
                // This changes the order instantly, but as deltaPosition is set,
                // they keep in the same places and then animate to true positions.
                xAxis.dataItems.sort(function (x, y) {
                    return x.get("index") - y.get("index");
                });
            };

            this.xAxis.data.setAll(data);
            this.series.data.setAll(data);


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            this.series.appear(1000);
            this.chart.appear(1000, 100);
            // сортируем
            sortCategoryAxis(this.series, this.xAxis);
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
    // Пончик с радиальным градиентом
    chart_amcharts.prototype.view_donut_with_radial_gradient = function (data) {
        if (this.chart) {
            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            this.series.data.setAll(data);

            this.legend.data.setAll(this.series.dataItems);

            this.series.appear(1000, 100);
        }
    };
    // Круговая диаграмма переменного радиуса
    chart_amcharts.prototype.view_variable_radius_pie_chart = function (data) {
        if (this.chart) {
            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            this.series.data.setAll(data);

            this.legend.data.setAll(this.series.dataItems);

            this.series.appear(1000, 100);
        }
    };
    // Радиальная гистограмма
    chart_amcharts.prototype.view_radial_histogram = function (data) {
        // Set data
        if (this.chart) {
            //var data = [];

            //for (var i = 1; i < 21; i++) {
            //    data.push({ name: i, value: Math.round(Math.random() * 100) });
            //}

            this.xAxis.data.setAll(data);
            this.series.data.setAll(data);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            this.series.appear(1000);
            this.chart.appear(1000, 100);
        }

    };
    // Круговая диаграмма
    chart_amcharts.prototype.view_pie_exploding_pie_chart = function (data) {
        //if (this.chart) {
        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        this.series.data.setAll(data);
        //this.series.appear(1000, 100);

        //this.selectSlice(this.series.slices.getIndex(0))
        //}
    };
    // Разделенная гистограмма
    chart_amcharts.prototype.view_partitioned_bar_chart = function (data) {
        if (this.chart && this.series) {
            //

            // Очистим отчет
            this.chart.series.clear();
            this.yAxis.axisRanges.clear();

            this.rng = [];
            var index = 0;

            // Подготовим данные
            $.each(data, function (key, el) {
                var res = this.rng.find(function (o) { return o.group === el.group }.bind(this));
                if (res === undefined) {
                    this.rng.push({ group: el.group, value: el.value, name: el.name, index: index });
                    index++;
                } else {
                    if (el.value > res.value) {
                        res.value = el.value;
                        res.name = el.name;
                    }
                }
            }.bind(this));

            this.legendData = [];

            this.yAxis.data.setAll(data);

            this.series.columns.template.adapters.add("fill", function (fill, target) {
                if (target.dataItem) {

                    var group = this.rng.find(function (o) { return o.group === target.dataItem.dataContext.group }.bind(this));
                    if (group) {
                        return this.chart.get("colors").getIndex(group.index);
                    }

                    //switch (target.dataItem.dataContext.region) {
                    //    case "Central":
                    //        return this.chart.get("colors").getIndex(0);
                    //        break;
                    //    case "East":
                    //        return this.chart.get("colors").getIndex(1);
                    //        break;
                    //    case "South":
                    //        return this.chart.get("colors").getIndex(2);
                    //        break;
                    //    case "West":
                    //        return this.chart.get("colors").getIndex(3);
                    //        break;
                    //}
                }
                return fill;
            }.bind(this))

            this.series.data.setAll(data);

            function createRange(label, category, color) {
                var rangeDataItem = this.yAxis.makeDataItem({
                    category: category
                });

                var range = this.yAxis.createAxisRange(rangeDataItem);

                rangeDataItem.get("label").setAll({
                    fill: color,
                    text: label,
                    location: 1,
                    fontWeight: "bold",
                    dx: -130
                });

                rangeDataItem.get("grid").setAll({
                    stroke: color,
                    strokeOpacity: 1,
                    location: 1
                });

                rangeDataItem.get("tick").setAll({
                    stroke: color,
                    strokeOpacity: 1,
                    location: 1,
                    visible: true,
                    length: 130
                });

                this.legendData.push({ name: label, color: color });

            }

            $.each(this.rng, function (key, el) {
                createRange.call(this, el.group, el.name, this.chart.get("colors").getIndex(el.index));
            }.bind(this));

            //createRange.call(this, "Central", "Texas", this.chart.get("colors").getIndex(0));
            //createRange.call(this, "East", "New York", this.chart.get("colors").getIndex(1));
            //createRange.call(this, "South", "Florida", this.chart.get("colors").getIndex(2));
            //createRange.call(this, "West", "California", this.chart.get("colors").getIndex(3));

            this.legend.data.setAll(this.legendData);

            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            var cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
                xAxis: this.xAxis,
                yAxis: this.yAxis
            }));


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            this.series.appear();
            this.chart.appear(1000, 100);
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