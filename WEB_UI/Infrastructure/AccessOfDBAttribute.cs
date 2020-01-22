using EFIDS.Abstract;
using EFIDS.Concrete;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Infrastructure
{
    public class AccessOfDBAttribute : FilterAttribute, IActionFilter
    {
        private string[] allowedUsers = new string[] { };
        private string[] allowedRoles = new string[] { };
        private string RulesAccess = null;
        private bool? access = false;

        EFWebAccess ef_wa = new EFWebAccess(new EFDbContext());

        public AccessOfDBAttribute()
        {

        }

        private bool User(HttpContextBase httpContext)
        {
            if (allowedUsers.Length > 0)
            {
                return allowedUsers.Contains(httpContext.User.Identity.Name);
            }
            return false;
        }

        private bool Role(HttpContextBase httpContext)
        {
            if (allowedRoles.Length > 0)
            {
                for (int i = 0; i < allowedRoles.Length; i++)
                {
                    if (httpContext.User.IsInRole(allowedRoles[i]))
                    {
                        this.RulesAccess = allowedRoles[i];
                        this.access = true;
                        return true;
                    }

                }
                return false;
            }
            return false;
        }

        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (filterContext.Result is PartialViewResult) return;
            // записываем логи только ViewResult
            if (filterContext.Result is ViewResult)
            {
                // если не локал хост
                //if (!filterContext.HttpContext.Request.IsLocal) logVisit.SaveVisit(filterContext, this.RulesAccess, this.access);
                return;
            }
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string areas = filterContext.ActionDescriptor.ControllerDescriptor.ControllerType.FullName.Trim();
            areas = areas.Substring(areas.IndexOf("Areas.") + 6, areas.IndexOf(".Controllers") - (areas.IndexOf("Areas.") + 6));
            string controller = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName.Trim();
            string action = filterContext.ActionDescriptor.ActionName.Trim();

            WebAccess wa = ef_wa.GetWebAccess(areas, controller, action);

            if (wa != null)
            {
                if (!String.IsNullOrEmpty(wa.users))
                {
                    allowedUsers = wa.users.Split(new char[] { ',' });
                    for (int i = 0; i < allowedUsers.Length; i++)
                    {
                        allowedUsers[i] = allowedUsers[i].Trim();
                    }
                }
                if (!String.IsNullOrEmpty(wa.roles))
                {
                    allowedRoles = wa.roles.Split(new char[] { ',' });
                    for (int i = 0; i < allowedRoles.Length; i++)
                    {
                        allowedRoles[i] = allowedRoles[i].Trim();
                    }
                }
                bool us = User(filterContext.HttpContext);
                bool rl = Role(filterContext.HttpContext);
                if (!(us | rl))
                {

                    string message = filterContext.HttpContext.User.Identity.Name + ";" + filterContext.ActionDescriptor.ActionName;
                    filterContext.Result = new ViewResult()
                    {
                        ViewName = "AccessDenied",
                        ViewData = new ViewDataDictionary(filterContext.Controller.ViewData)
                        {
                            Model = message, // set the model
                        }
                    };
                }
            }
        }
    }
}