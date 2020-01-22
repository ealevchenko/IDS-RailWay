using EFIDS.Concrete;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Infrastructure
{
    public class ViewOfDBAttribute : FilterAttribute, IActionFilter
    {
        public string Name = "";
        private string[] allowedUsers = new string[] { };
        private string[] allowedRoles = new string[] { };
        private string RulesAccess = null;
        private bool? access = false;

        EFWebView ef_wv = new EFWebView(new EFDbContext());

        public ViewOfDBAttribute()
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

            WebView wv = ef_wv.GetWebView(this.Name);

            if (wv != null)
            {
                if (!String.IsNullOrEmpty(wv.users))
                {
                    allowedUsers = wv.users.Split(new char[] { ',' });
                    for (int i = 0; i < allowedUsers.Length; i++)
                    {
                        allowedUsers[i] = allowedUsers[i].Trim();
                    }
                }
                if (!String.IsNullOrEmpty(wv.roles))
                {
                    allowedRoles = wv.roles.Split(new char[] { ',' });
                    for (int i = 0; i < allowedRoles.Length; i++)
                    {
                        allowedRoles[i] = allowedRoles[i].Trim();
                    }
                }
                bool us = User(filterContext.HttpContext);
                bool rl = Role(filterContext.HttpContext);
                if (!(us | rl))
                {
                    filterContext.Result = new EmptyResult();
                }
            }

        }
    }
}