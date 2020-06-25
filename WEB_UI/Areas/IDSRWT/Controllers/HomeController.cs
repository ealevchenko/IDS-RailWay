using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WEB_UI.Infrastructure;

namespace WEB_UI.Areas.IDSRWT.Controllers
{
    public class HomeController : Controller
    {
        // GET: IDSRWT/Home
        public ActionResult Index()
        {
            return View();
        }

        [AccessOfDB(LogVisit = true)]
        public ActionResult Arrival()
        {
            return View();
        }
        public ActionResult Incoming()
        {
            return View();
        }

        public ActionResult Report()
        {
            return View();
        }
        //public ActionResult Outgoing()
        //{
        //    return View();
        //}


    }
}