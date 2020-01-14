using System.Web;
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

            //jquery-ui
            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                    "~/Scripts/jquery-ui-1.12.1.min.js"
                    //,"~/Scripts/datepicker-ru.js"
                //"~/Scripts/datepicker-en-GB.js"
                    ));


            //bootstrap --------------------------------------------------------------------------
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/bootstrap/css").Include(
                      "~/Content/bootstrap.css"));

            // font-awesome --------------------------------------------------------------------------
            bundles.Add(new StyleBundle("~/font-awesome/css").Include(
                      "~/Content/font-awesome/css/font-awesome.min.css"));

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
                "~/Scripts/DataTables/media/js/jquery.dataTables.min.js",
                "~/Scripts/DataTables/media/js/dataTables.jqueryui.min.js",

                "~/Scripts/DataTables/extensions/Buttons/js/dataTables.buttons.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.jqueryui.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.html5.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.print.min.js",
                "~/Scripts/DataTables/extensions/Buttons/js/buttons.colVis.min.js",

                "~/Scripts/DataTables/extensions/Select/js/dataTables.select.min.js",
                "~/Scripts/DataTables/extensions/Select/js/select.jqueryui.min.js",

                "~/Scripts/DataTables/extensions/JSZip/jszip.min.js"
                ));

            bundles.Add(new StyleBundle("~/DataTables/css").Include(
                "~/Content/DataTables/media/css/jquery.dataTables.min.css"
                ,"~/Content/DataTables/media/css/dataTables.jqueryui.min.css"

                , "~/Content/DataTables/extensions/Buttons/css/buttons.dataTables.min.css"
                , "~/Content/DataTables/extensions/Buttons/css/buttons.jqueryui.min.css"

                

                ,"~/Content/DataTables/extensions/Select/css/select.dataTables.min.css"
                ,"~/Content/DataTables/extensions/Select/css/select.jqueryui.min.css"
                //,"~/Content/DataTables/css/datatables.css"
                ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));
        }
    }
}
