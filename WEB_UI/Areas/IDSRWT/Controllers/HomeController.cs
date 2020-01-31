using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Areas.IDSRWT.Controllers
{
    public class HomeController : Controller
    {
        // GET: IDSRWT/Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Arrival()
        {
            return View();
        }
    }
}