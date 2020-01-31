using System.Web.Mvc;

namespace WEB_UI.Areas.IDSRWT
{
    public class IDSRWTAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "IDSRWT";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "IDSRWT_default",
                "IDSRWT/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WEB_UI.Areas.IDSRWT.Controllers" }
            );
        }
    }
}