using System.Web.Mvc;

namespace WEB_UI.Areas.IDSReport
{
    public class IDSReportAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "IDSReport";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "IDSReport_default",
                "IDSReport/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WEB_UI.Areas.IDSReport.Controllers" }
            );
        }
    }
}