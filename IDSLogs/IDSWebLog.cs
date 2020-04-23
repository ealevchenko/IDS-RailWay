using Moveax.Mvc.ErrorHandler;
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

        private static string GetAreas(string full_name)
        {
            if (!String.IsNullOrWhiteSpace(full_name))
            {
                return full_name.Substring(full_name.IndexOf("Areas.") + 6, full_name.IndexOf(".Controllers") - (full_name.IndexOf("Areas.") + 6));
            }
            return null;
        }

        #region WebVisit

        public static long VisitLog(this ActionExecutingContext filterContext, string RolesAccess, bool? Access)
        {

            return filterContext.HttpContext.User.Identity.Name.SaveVisit((bool?)filterContext.HttpContext.User.Identity.IsAuthenticated,
                filterContext.HttpContext.User.Identity.AuthenticationType, filterContext.HttpContext.Request.UserHostName,
                filterContext.HttpContext.Request.UserHostAddress, filterContext.HttpContext.Request.Url.AbsoluteUri,
                filterContext.HttpContext.Request.PhysicalPath,
                GetAreas(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType.FullName.Trim()),
                filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
                filterContext.ActionDescriptor.ActionName,
                RolesAccess, (bool?)Access);
        }

        public static long VisitLog(this ActionExecutedContext filterContext, string RolesAccess, bool? Access)
        {
            return filterContext.HttpContext.User.Identity.Name.SaveVisit((bool?)filterContext.HttpContext.User.Identity.IsAuthenticated,
                filterContext.HttpContext.User.Identity.AuthenticationType, filterContext.HttpContext.Request.UserHostName,
                filterContext.HttpContext.Request.UserHostAddress, filterContext.HttpContext.Request.Url.AbsoluteUri,
                filterContext.HttpContext.Request.PhysicalPath,
                GetAreas(filterContext.ActionDescriptor.ControllerDescriptor.ControllerType.FullName.Trim()),
                filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
                filterContext.ActionDescriptor.ActionName,
                 RolesAccess, (bool?)Access);
        }
        #endregion

        #region WebException

        public static long WebExceptionLog(this Exception Exception, int? HttpCode, HttpRequest Request)
        {
            try
            {
                return Exception.SaveWebException(Request.LogonUserIdentity.Name, Request.IsAuthenticated, Request.LogonUserIdentity.AuthenticationType,
                     Request.UserHostName, Request.UserHostAddress, Request.Url.AbsolutePath, Request.PhysicalPath, Request.UserAgent, Request.RequestType, HttpCode);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
        }

        public static long WebExceptionLog(this ErrorDescription errorDescription)
        {
            try
            {
                return errorDescription.Exception.WebExceptionLog(errorDescription.HttpCode, errorDescription.Request);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
        }

        #endregion

    }
}
