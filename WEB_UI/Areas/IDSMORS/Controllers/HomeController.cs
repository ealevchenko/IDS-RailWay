using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WEB_UI.Infrastructure;

namespace WEB_UI.Areas.IDSMORS.Controllers
{
    public class HomeController : Controller
    {
        // GET: IDSMORS/Home
        public ActionResult Index()
        {
            return View();
        }

        //[ViewAuthorize(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"HP_EDIK\lev75,EUROPE\avzaytsev,EUROPE\nashidlovskiy,EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko,EUROPE\igarih,EUROPE\rvpopov,EUROPE\anrybalkin,EUROPE\vvkisel,EUROPE\osnechaeva,EUROPE\anvalekseenko,EUROPE\tfivashina,EUROPE\yaradko")]

        [AccessOfDB()]
        public ActionResult ElectronicCards()
        {
            return View();
        }

        //[View(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko")]
        [ViewOfDB(Name = "IDSMORS_Home_ElectronicCards_Edit")]
        public PartialViewResult ElectronicCardsEdit()
        {
            return PartialView();
        }

        //[View(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko")]
        [ViewOfDB(Name = "IDSMORS_Home_ElectronicCards_Edit")]
        public PartialViewResult ElectronicCardsEditDEPO()
        {
            return PartialView();
        }

        //[View(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko")]
        [ViewOfDB(Name = "IDSMORS_Home_ElectronicCards_Edit")]
        public PartialViewResult ElectronicCardsEditKap()
        {
            return PartialView();
        }

        //[View(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\tamalina,EUROPE\nnlavrenko")]
        [ViewOfDB(Name = "IDSMORS_Home_ElectronicCards_Edit")]
        public PartialViewResult ElectronicCardsEditCur()
        {
            return PartialView();
        }
    }
}