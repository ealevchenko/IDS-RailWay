using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WEB_UI.Infrastructure;

namespace WEB_UI.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Directory/Home
        [AccessOfDB(LogVisit = true)]
        public ActionResult Index()
        {
            return View();
        }

        [AccessOfDB(LogVisit = true)]
        public ActionResult ErrorLog()
        {
            return View();
        }
    }
}