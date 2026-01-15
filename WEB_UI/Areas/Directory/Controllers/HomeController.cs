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
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Cargo()
        {
            return View();
        }
        // GET: Directory/Cargo
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult CargoGroup()
        {
            return View();
        }
        // GET: Directory/Cars
        [AccessOfDB(LogVisit = true)]
        //[ViewAuthorize(Users = @"EUROPE\ykkozir,EUROPE\nabondarenko,EUROPE\vvoleynik,EUROPE\nnlavrenko,EUROPE\osnechaeva,EUROPE\tfivashina,EUROPE\ealevchenko,EUROPE\ivshuba,EUROPE\lvgubarenko")]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Cars()
        {
            return View();
        }
        // GET: Directory/ExternalStation
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult ExternalStation()
        {
            return View();
        }
        // GET: Directory/InlandRailway
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult InlandRailway()
        {
            return View();
        }
        // GET: Directory/Railway
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Railway()
        {
            return View();
        }
        // GET: Directory/Countrys
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Countrys()
        {
            return View();
        }
        // GET: Directory/Shipper
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Shipper()
        {
            return View();
        }
        // GET: Directory/Ways
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Ways()
        {
            return View();
        }
        // GET: Directory/Ways
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult Park()
        {
            return View();
        }

        // Справочник операторы вагонов
        [AccessOfDB(LogVisit = true)]
        //[ViewAuthorize(Users = @"EUROPE\ealevchenko,EUROPE\ivshuba,EUROPE\lvgubarenko")]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_DIRECTORY,UAKRR\KRR-LG_TD-IDSRW_DIRECTORY")]
        public ActionResult OperatorsWagons()
        {
            return View();
        }
        //******************************************************
        // СЕРВИСЫ
        //******************************************************

        // Инструктивные письма
        //[AccessOfDB(LogVisit = true)]
        //public ActionResult InstructionalLetters()
        //{
        //    return View();
        //}
        // Поиск вагонов
        [AccessOfDB(LogVisit = true)]
        public ActionResult SearchWagon()
        {
            return View();
        }
        // Разметка по прибытию
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_COND_ARR,UAKRR\KRR-LG_TD-IDSRW_COND_ARR,EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN")]
        public ActionResult WagonMarking()
        {
            return View();
        }
        // Разметка по предъявлению
        [AccessOfDB(LogVisit = true)]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_COND_SEND,UAKRR\KRR-LG_TD-IDSRW_COND_SEND,EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN")]
        public ActionResult PresentWagonMarking()
        {
            return View();
        }
        // Состояние парка
        [AccessOfDB(LogVisit = true)]
        //[View(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko")]
        //[ViewOfDB(Name = "IDSMORS_Home_ElectronicCards_Edit")]
        //[ViewAuthorize(Users = @"EUROPE\ealevchenko,EUROPE\ivshuba,EUROPE\lvgubarenko")]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN")] 
        public ActionResult ParkState()
        {
            return View();
        }
        // Коммерческое состояние
        [AccessOfDB(LogVisit = true)]
        //[ViewAuthorize(Users = @"EUROPE\nvbubleykin,EUROPE\iayanovskaya,EUROPE\vsyanovskaya,EUROPE\nabondarenko,EUROPE\nnlavrenko,EUROPE\osnechaeva,EUROPE\ealevchenko,EUROPE\ivshuba,EUROPE\lvgubarenko")]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_COM_STAT,UAKRR\KRR-LG_TD-IDSRW_COM_STAT,EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN")] 
        public ActionResult ComCondition()
        {
            return View();
        }
        // Плата за пользование
        [AccessOfDB(LogVisit = true)]
        //[ViewAuthorize(Users = @"EUROPE\nykozhevnikova,EUROPE\lgcherepenko,EUROPE\vvoleynik,EUROPE\nnlavrenko,EUROPE\osnechaeva,EUROPE\ealevchenko,EUROPE\ivshuba,EUROPE\lvgubarenko")]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_PAY,UAKRR\KRR-LG_TD-IDSRW_PAY,EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN")] //,EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN
        
        public ActionResult UsageFee()
        {
            return View();
        }
        // Заадресовка вагона
        [AccessOfDB(LogVisit = true)]
        //[ViewAuthorize(Users = @"EUROPE\nnlavrenko,EUROPE\sabubleykina,EUROPE\osnechaeva,EUROPE\ealevchenko,EUROPE\ivshuba,EUROPE\lvgubarenko")]
        [ViewAuthorize(Roles = @"EUROPE\KRR-LG_TD-IDSRW_ADDRESS,UAKRR\KRR-LG_TD-IDSRW_ADDRESS,EUROPE\KRR-LG_TD-IDSRW_ADMIN,UAKRR\KRR-LG_TD-IDSRW_ADMIN")] 

        public ActionResult WagonAddressing()
        {
            return View();
        }
    }
}