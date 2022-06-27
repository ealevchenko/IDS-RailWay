using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Areas.IDSReport.Controllers
{
    public class HomeController : Controller
    {
        // GET: IDSReport/Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Report_TD()
        {
            return View();
        }
        public ActionResult Report_SD()
        {
            return View();
        }
        public ActionResult Report_SD1()
        {
            return View();
        }
    }
}