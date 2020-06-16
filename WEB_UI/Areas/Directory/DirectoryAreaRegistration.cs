using System.Web.Mvc;

namespace WEB_UI.Areas.Directory
{
    public class DirectoryAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Directory";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Directory_default",
                "Directory/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WEB_UI.Areas.Directory.Controllers" }
            );
        }
    }
}