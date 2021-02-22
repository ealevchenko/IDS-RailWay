using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WEB_UI.Infrastructure;

namespace WEB_UI.Areas.Directory.Controllers
{
    public class HomeController : Controller
    {
        // GET: Directory/Home
        [AccessOfDB(LogVisit = true)]
        public ActionResult Index()
        {
            return View();
        }

        // GET: Directory/Cargo
        [AccessOfDB(LogVisit = true)]
        public ActionResult Cargo()
        {
            return View();
        }
        // GET: Directory/Cargo
        [AccessOfDB(LogVisit = true)]
        public ActionResult CargoGroup()
        {
            return View();
        }
        // GET: Directory/Cars
        [AccessOfDB(LogVisit = true)]
        public ActionResult Cars()
        {
            return View();
        }
        // GET: Directory/ExternalStation
        [AccessOfDB(LogVisit = true)]
        public ActionResult ExternalStation()
        {
            return View();
        }
        // GET: Directory/InlandRailway
        [AccessOfDB(LogVisit = true)]
        public ActionResult InlandRailway()
        {
            return View();
        }
        // GET: Directory/Railway
        [AccessOfDB(LogVisit = true)]
        public ActionResult Railway()
        {
            return View();
        }

        //******************************************************
        // СЕРВИСЫ
        //******************************************************

        // Инструктивные письма
        [AccessOfDB(LogVisit = true)]
        public ActionResult InstructionalLetters()
        {
            return View();
        }
        // Поиск вагонов
        [AccessOfDB(LogVisit = true)]
        public ActionResult SearchWagon()
        {
            return View();
        }
        // Разметка по прибытию
        [AccessOfDB(LogVisit = true)]
        public ActionResult WagonMarking()
        {
            return View();
        }
        // Состояние парка
        [AccessOfDB(LogVisit = true)]
        public ActionResult ParkState()
        {
            return View();
        }
    }
}