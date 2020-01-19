using EFIDS.Abstract;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api
{

    /// <summary>
    /// ЭЛЕКТРОННАЯ КАРТОЧКА РЕМОНТОВ ВАГОНОВ
    /// </summary>
    [RoutePrefix("api/ids/mors/cards_wagons_repairs")]
    public class IDS_CardsWagonsRepairsController : ApiController
    {
        protected IRepository<CardsWagonsRepairs> ef_cwr;

        public IDS_CardsWagonsRepairsController(IRepository<CardsWagonsRepairs> cwr)
        {
            this.ef_cwr = cwr;
        }

        // GET: api/ids/mors/cards_wagons_repairs/all
        [Route("all")]
        [ResponseType(typeof(CardsWagonsRepairs))]
        public IHttpActionResult GetCardsWagonsRepairs()
        {
            try
            {
                List<CardsWagonsRepairs> list = this.ef_cwr.Context.ToList()
                    .Select(c => new CardsWagonsRepairs
                    {
                        id = c.id,
                        num = c.num,
                        id_type_repair_wagon = c.id_type_repair_wagon,
                        date_repair = c.date_repair,
                        id_internal_railroad = c.id_internal_railroad,
                        code_depo = c.code_depo,
                        date_non_working = c.date_non_working,
                        id_wagons_condition = c.id_wagons_condition,
                        note = c.note,
                        create = c.create,
                        create_user = c.create_user,
                        change = c.change,
                        change_user = c.change_user,
                    }).ToList();
                //if (list == null || list.Count() == 0)
                //{
                //    return NotFound();
                //}
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/cards_wagons_repairs/num/50030337
        [Route("num/{num:int}")]
        [ResponseType(typeof(CardsWagonsRepairs))]
        public IHttpActionResult GetCardsWagonsRepairs(int num)
        {
            try
            {
                List<CardsWagonsRepairs> list = this.ef_cwr.Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(c => new CardsWagonsRepairs
                    {
                        id = c.id,
                        num = c.num,
                        id_type_repair_wagon = c.id_type_repair_wagon,
                        date_repair = c.date_repair,
                        id_internal_railroad = c.id_internal_railroad,
                        code_depo = c.code_depo,
                        date_non_working = c.date_non_working,
                        id_wagons_condition = c.id_wagons_condition,
                        note = c.note,
                        create = c.create,
                        create_user = c.create_user,
                        change = c.change,
                        change_user = c.change_user,
                    }).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
