using System.Web;
using System.Web.Optimization;

namespace WEB_UI
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. на странице https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //bootstrap
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/bootstrap/css").Include(
                      "~/Content/bootstrap.css"));

            // font-awesome
            bundles.Add(new StyleBundle("~/font-awesome/css").Include(
                      "~/Content/font-awesome/css/font-awesome.min.css"));

            // magnific-popup
            bundles.Add(new ScriptBundle("~/bundles/magnific-popup").Include(
                      "~/Scripts/jquery.magnific-popup.min.js"));

            bundles.Add(new StyleBundle("~/magnific-popup/css").Include(
                      "~/Content/magnific-popup.css"));

            // scrollreveal
            bundles.Add(new ScriptBundle("~/bundles/scrollreveal").Include(
                      "~/Scripts/scrollreveal/scrollreveal.min.js"));

            // jquery.easing
            bundles.Add(new ScriptBundle("~/bundles/easing").Include(
                      "~/Scripts/jquery.easing.1.3.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // готово к выпуску, используйте средство сборки по адресу https://modernizr.com, чтобы выбрать только необходимые тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));
        }
    }
}
