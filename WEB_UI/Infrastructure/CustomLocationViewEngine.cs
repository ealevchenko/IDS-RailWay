using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Infrastructure
{
    public class CustomLocationViewEngine : RazorViewEngine
    {
        public CustomLocationViewEngine()
        {
            ViewLocationFormats = new string[] { "~/Views/{1}/{0}.cshtml", "~/Views/Error/{0}.cshtml" };
        }
    }
}