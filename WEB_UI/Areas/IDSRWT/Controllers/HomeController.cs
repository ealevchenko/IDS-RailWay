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
        [AccessOfDB(LogVisit = true)]
        public ActionResult Index()
        {
            return View();
        }

        [AccessOfDB(LogVisit = true)]
        public ActionResult Arrival()
        {
            return View();
        }
        [AccessOfDB(LogVisit = true)]
        public ActionResult Incoming()
        {
            return View();
        }
        [AccessOfDB(LogVisit = true)]
        public ActionResult Outgoing()
        {
            return View();
        }

        public ActionResult Report()
        {
            return View();
        }
        /// <summary>
        /// АРМ Диспетчера
        /// </summary>
        /// <returns></returns>
        [AccessOfDB(LogVisit = true)]
        public ActionResult WSD()
        {
            return View();
        }


    }
}