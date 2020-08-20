using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_UI.Areas.Directory.Controllers
{
    public class HomeController : Controller
    {
        // GET: Directory/Home
        public ActionResult Index()
        {
            return View();
        }

        // GET: Directory/Cargo
        public ActionResult Cargo()
        {
            return View();
        }
        // GET: Directory/Cargo
        public ActionResult CargoGroup()
        {
            return View();
        }
        // GET: Directory/Cars
        public ActionResult Cars()
        {
            return View();
        }

        //******************************************************
        // СЕРВИСЫ
        //******************************************************

        // Инструктивные письма
        public ActionResult InstructionalLetters()
        {
            return View();
        }
    }
}