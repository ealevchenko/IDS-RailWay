using System.Web.Mvc;

namespace WEB_UI.Areas.IDSOP
{
    public class IDSOPAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "IDSOP";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "IDSOP_default",
                "IDSOP/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WEB_UI.Areas.IDSOP.Controllers" }
            );
        }
    }
}