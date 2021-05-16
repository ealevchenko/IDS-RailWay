using Moveax.Mvc.ErrorHandler;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using WEB_UI.Infrastructure;

namespace WEB_UI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            ViewEngines.Engines.Add(new CustomLocationViewEngine());

            Application["park_state_apply"] = "";
            Application["host_session"] = "";
        }

        protected void Application_BeginRequest()
        {
            string cultureName = null;
            // Получаем куки из контекста, которые могут содержать установленную культуру
            HttpCookie cultureCookie = HttpContext.Current.Request.Cookies["lang"];
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
                cultureName = "ru";

            // Список культур
            List<string> cultures = new List<string>() { "ru", "en" };
            if (!cultures.Contains(cultureName))
            {
                cultureName = "ru";
            }
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureName);
            Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(cultureName);
        }

        protected void Application_Error(object sender, System.EventArgs e)
        {
            var errorHandler = new MvcApplicationErrorHandler(application: this, exception: this.Server.GetLastError())
            {
                EnableHttpReturnCodes = true,
                PassThroughHttp401 = false
            };

            errorHandler.Execute();
        }


        protected void Session_Start(object sender, EventArgs e)
        {
            // More secure than storing it application variables(does not rest on application start

            try
            {
                //string host = Dns.GetHostEntry(Request.UserHostAddress).HostName.ToString();

                Application.Lock();
                // Определим и добавим имя нового клиента
                string host_session;
                string new_host = Dns.GetHostEntry(Request.UserHostAddress).HostName.ToString();
                if (HttpContext.Current.Application["host_session"] != null)
                {
                    host_session = (string)(object)HttpContext.Current.Application["host_session"];
                    if (String.IsNullOrWhiteSpace(host_session))
                    {
                        host_session = new_host;
                    }
                    else
                    {
                        host_session = host_session + ";" + new_host;
                    }
                }
                else
                {
                    host_session = new_host;
                }
                HttpContext.Current.Application["host_session"] = host_session;
                // Подчитаем количество клиентов
                int count = 0;
                if (Application["UsersCount"] != null)
                    count = (int)Application["UsersCount"];
                count++;
                Application["UsersCount"] = count;
                // Запоминаю id сесии
                Session["session_id"] = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
                // Снять закрытый доступ        
                Application.UnLock();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }

        protected void Session_End(Object sender, EventArgs e)
        {

            try
            {
                Application.Lock();
                // Определим и добавим имя нового клиента
                string host_session = "";
                string end_host = Dns.GetHostEntry(Request.UserHostAddress).HostName.ToString();
                if (HttpContext.Current.Application["host_session"] != null)
                {
                    host_session = (string)(object)HttpContext.Current.Application["park_state_apply"];
                    if (!String.IsNullOrWhiteSpace(host_session))
                    {
                        string[] arr_host_session = host_session.Split(';');
                        host_session = "";
                        foreach (string hs in arr_host_session) {
                            if (hs != end_host) {
                                host_session = host_session + (!String.IsNullOrWhiteSpace(host_session) ? ";" : "") + hs;
                            }
                        }
                    }

                }
                HttpContext.Current.Application["host_session"] = host_session;



                int count = 0;
                if (Application["UsersCount"] != null)
                    count = (int)Application["UsersCount"];

                count--;
                Application["UsersCount"] = count;

                // Снять закрытый доступ        
                Application.UnLock();
            }
            catch (Exception)
            {
                //throw;
            }
            finally
            {

            }
        }
    }
}
