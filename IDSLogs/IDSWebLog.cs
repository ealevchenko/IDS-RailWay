using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace IDSLogs
{
    public static class IDSWebLog
    {
        static IDSWebLog()
        {

        }

        private static string GetAreas(string full_name) {
            if (!String.IsNullOrWhiteSpace(full_name)) {
                return full_name.Substring(full_name.IndexOf("Areas.") + 6, full_name.IndexOf(".Controllers") - (full_name.IndexOf("Areas.") + 6));               
            }
            return null;
        }

        #region WebVisit
        public static void VisitLog(this ActionExecutingContext filterContext, string RolesAccess, bool? Access)
        {

            filterContext.HttpContext.User.Identity.Name.SaveVisit((bool?)filterContext.HttpContext.User.Identity.IsAuthenticated,
                filterContext.HttpContext.User.Identity.AuthenticationType, filterContext.HttpContext.Request.UserHostName,
                filterContext.HttpContext.Request.UserHostAddress, filterContext.HttpContext.Request.Url.AbsoluteUri,
                filterContext.HttpContext.Request.PhysicalPath,
                GetAreas(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType.FullName.Trim()),
                filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
                filterContext.ActionDescriptor.ActionName, 
                RolesAccess, (bool?)Access);
        }

        public static void VisitLog(this ActionExecutedContext filterContext, string RolesAccess, bool? Access)
        {
            filterContext.HttpContext.User.Identity.Name.SaveVisit((bool?)filterContext.HttpContext.User.Identity.IsAuthenticated,
                filterContext.HttpContext.User.Identity.AuthenticationType, filterContext.HttpContext.Request.UserHostName,
                filterContext.HttpContext.Request.UserHostAddress, filterContext.HttpContext.Request.Url.AbsoluteUri,
                filterContext.HttpContext.Request.PhysicalPath, 
                GetAreas(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType.FullName.Trim()),
                filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
                filterContext.ActionDescriptor.ActionName, 
                 RolesAccess, (bool?)Access);
        }
        #endregion

    }
}
