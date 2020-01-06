using System.Web.Mvc;

namespace WEB_UI.Areas.IDSMORS
{
    public class IDSMORSAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "IDSMORS";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "IDSMORS_default",
                "IDSMORS/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WEB_UI.Areas.IDSMORS.Controllers" }
            );
        }
    }
}