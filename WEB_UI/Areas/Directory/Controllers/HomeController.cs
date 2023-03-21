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
        // GET: Directory/Countrys
        [AccessOfDB(LogVisit = true)]
        public ActionResult Countrys()
        {
            return View();
        }
        // GET: Directory/Shipper
        [AccessOfDB(LogVisit = true)]
        public ActionResult Shipper()
        {
            return View();
        }
        // GET: Directory/Ways
        [AccessOfDB(LogVisit = true)]
        public ActionResult Ways()
        {
            return View();
        }
        // GET: Directory/Ways
        [AccessOfDB(LogVisit = true)]
        public ActionResult Park()
        {
            return View();
        }

        // Справочник операторы вагонов
        [AccessOfDB(LogVisit = true)]
        public ActionResult OperatorsWagons()
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
        // Разметка по предъявлению
        [AccessOfDB(LogVisit = true)]
        public ActionResult PresentWagonMarking()
        {
            return View();
        }
        // Состояние парка
        [AccessOfDB(LogVisit = true)]
        public ActionResult ParkState()
        {
            return View();
        }
        // Коммерческое состояние
        [AccessOfDB(LogVisit = true)]
        public ActionResult ComCondition()
        {
            return View();
        }
        // Плата за пользование
        [AccessOfDB(LogVisit = true)]
        public ActionResult UsageFee()
        {
            return View();
        }
    }
}