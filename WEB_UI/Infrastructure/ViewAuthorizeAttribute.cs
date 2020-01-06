using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Infrastructure
{
    public class ViewAuthorizeAttribute : AuthorizeAttribute, IActionFilter
    {
        private string[] allowedUsers = new string[] { };
        private string[] allowedRoles = new string[] { };
        private string RulesAccess = null;
        private bool? access = false;

        public ViewAuthorizeAttribute()
        {
        }



        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return httpContext.Request.IsAuthenticated;
        }

        private bool User(HttpContextBase httpContext)
        {
            if (allowedUsers.Length > 0)
            {
                return allowedUsers.Contains(httpContext.User.Identity.Name);
            }
            return true;
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
            return true;
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
            if (!String.IsNullOrEmpty(base.Users))
            {
                allowedUsers = base.Users.Split(new char[] { ',' });
                for (int i = 0; i < allowedUsers.Length; i++)
                {
                    allowedUsers[i] = allowedUsers[i].Trim();
                }
            }
            if (!String.IsNullOrEmpty(base.Roles))
            {
                allowedRoles = base.Roles.Split(new char[] { ',' });
                for (int i = 0; i < allowedRoles.Length; i++)
                {
                    allowedRoles[i] = allowedRoles[i].Trim();
                }
            }
            bool us = User(filterContext.HttpContext);
            bool rl = Role(filterContext.HttpContext);
            if (!us && !rl)
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


                // если не локал хост
                ////if (!filterContext.HttpContext.Request.IsLocal) logVisit.SaveVisit(filterContext, this.RulesAccess, this.access);
                //filterContext.Result = new ViewResult
                //{
                //    ViewName = "AccessDenied",
                //    ViewData = new ViewDataDictionary<string>("test")
                //};
            }
        }
    }
}