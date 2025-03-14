﻿using System.Web;
using System.Web.Optimization;

namespace WEB_UI
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. на странице https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //jquery --------------------------------------------------------------------------            
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //jquery.cookie --------------------------------------------------------------------------            
            bundles.Add(new ScriptBundle("~/bundles/jquery-cookie").Include(
                        "~/Scripts/jquery.cookie.js"));

            //jquery-ui --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                    "~/Scripts/jquery-ui-1.12.1.min.js"
                    //,"~/Scripts/datepicker-ru.js"
                    //"~/Scripts/datepicker-en-GB.js"
                    ));
            bundles.Add(new StyleBundle("~/jquery-ui/css").Include(
                "~/Content/themes/base/jquery-ui.css",
                "~/Content/themes/base/jquery-ui.structure.css",
                "~/Content/themes/base/jquery-ui.theme.css"));

            //bootstrap --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                       //"~/Scripts/jquery-3.5.1.slim.js",
                       "~/Scripts/umd/popper.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/respond.js",
                        "~/Scripts/bootstrap-input-spinner.js",
                        "~/Scripts/bootstrap-select.js",
                        "~/Scripts/bootstrap-multiselect.js"
                       ));

            bundles.Add(new StyleBundle("~/bootstrap/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-select.min.css",
                      "~/Content/bootstrap-multiselect.min.css"
                      ));

            // Календарь -------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/DateTime").Include(
                "~/Scripts/DateTime/jquery.daterangepicker.min.js"));

            bundles.Add(new StyleBundle("~/DateTime/css").Include("~/Content/DateTime/daterangepicker.css"));

            // font-awesome --------------------------------------------------------------------------
            bundles.Add(new StyleBundle("~/font-awesome/css").Include(
                      "~/Content/fontawesome-free/css/all.min.css"));

            // magnific-popup --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/magnific-popup").Include(
                      "~/Scripts/jquery.magnific-popup.min.js"));

            bundles.Add(new StyleBundle("~/magnific-popup/css").Include(
                      "~/Content/magnific-popup.css"));

            // scrollreveal --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/scrollreveal").Include(
                      "~/Scripts/scrollreveal/scrollreveal.min.js"));

            // jquery.easing --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/easing").Include(
                      "~/Scripts/jquery.easing.1.3.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // готово к выпуску, используйте средство сборки по адресу https://modernizr.com, чтобы выбрать только необходимые тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            // Плагин таблицы --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/DataTables").Include(
                // ------- 
                //"~/Scripts/DataTables/media/js/jquery.dataTables.min.js",
                "~/Scripts/jquery.dataTables.min.js",
                //"~/Scripts/DataTables/media/js/dataTables.jqueryui.min.js",
                //"~/Scripts/DataTables/media/js/dataTables.bootstrap4.min.js",
                // ------- КНОПКИ
                "~/Scripts/DataTables/extensions/Buttons/js/dataTables.buttons.min.js",
                //"~/Scripts/DataTables/extensions/Buttons/js/buttons.jqueryui.min.js",
                //"~/Scripts/DataTables/extensions/Buttons/js/buttons.bootstrap4.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.html5.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.print.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.colVis.min.js",
                // ------- ВЫБОР
                "~/Scripts/DataTables/extensions/Select/js/dataTables.select.min.js",
                //"~/Scripts/DataTables/extensions/Select/js/select.jqueryui.min.js",
                //"~/Scripts/DataTables/extensions/Select/js/select.bootstrap4.min.js",
                // ------- ПЕРЕТАСКИВАНИЕ ПОЛЕЙ
                "~/Scripts/DataTables/extensions/ColReorder/dataTables.colReorder.min.js",
                // ------- Фиксирование заголовка табоицы
                "~/Scripts/DataTables/extensions/FixedColumns/dataTables.fixedColumns.min.js",
                // ------- Фиксирование заголовка табоицы
                "~/Scripts/DataTables/extensions/FixedHeader/dataTables.fixedHeader.min.js",
                // ------- ДЛЯ двойной прокрутки
                "~/Scripts/jquery.doubleScroll.js",
                // ------- ДЛЯ EXCEL
                "~/Scripts/jszip.min.js"
                ));

            bundles.Add(new StyleBundle("~/DataTables/css").Include(
                // ------- СТИЛЬ DATATABLES
                "~/Content/DataTables/media/css/jquery.dataTables.min.css",
                 //, "~/Content/DataTables/media/css/dataTables.jqueryui.min.css",
                 //"~/Content/DataTables/media/css/dataTables.bootstrap4.min.css",
                 // ------- СТИЛЬ КНОПОК
                 "~/Content/DataTables/extensions/Buttons/css/buttons.dataTables.min.css",
                 //, "~/Content/DataTables/extensions/Buttons/css/buttons.jqueryui.min.css",
                 //"~/Content/DataTables/extensions/Buttons/css/buttons.bootstrap4.min.css",
                 // ------- СТИЛЬ ВЫБОРА
                 "~/Content/DataTables/extensions/Select/css/select.dataTables.min.css",
                 //, "~/Content/DataTables/extensions/Select/css/select.jqueryui.min.css",
                 //"~/Content/DataTables/extensions/Select/css/select.bootstrap4.min.css"
                 //,"~/Content/DataTables/css/datatables.css"
                 // ------- СТИЛЬ ПЕРЕТАСКИВАНИЯ
                 "~/Content/DataTables/extensions/ColReorder/colReorder.dataTables.min.css",
                 // ------- СТИЛЬ Фиксирование поле
                 "~/Content/DataTables/extensions/FixedColumns/dataTables.fixedColumns.min.css",
                 // ------- СТИЛЬ Фиксирование заголовка табоицы
                 "~/Content/DataTables/extensions/FixedHeader/fixedHeader.dataTables.min.css"
                ));

            // Moment ---------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/Moment").Include(
                "~/Scripts/moment.min.js"//,
                                         //"~/Scripts/moment-timezone.min.js"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));
        }
    }
}
