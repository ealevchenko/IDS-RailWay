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

        [ViewAuthorize(Roles = @"EUROPE\KRR-LG-PA-RailWay_Developers", Users = @"HP_EDIK\lev75,EUROPE\mpkulenko,EUROPE\vabelyaev,EUROPE\vabalbekin,EUROPE\lspolischuk,EUROPE\avshepeta,EUROPE\lvtverdohleb,EUROPE\igarih,EUROPE\rvpopov,EUROPE\anrybalkin")]
        public ActionResult ElectronicCards()
        {
            return View();
        }
    }
}