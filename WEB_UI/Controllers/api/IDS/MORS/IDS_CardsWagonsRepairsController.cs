﻿using EFIDS.Abstract;
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
        public IHttpActionResult GetCardsWagonsRepairsOfNum(int num)
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

        // GET: api/ids/mors/cards_wagons_repairs/id/50030337
        [Route("id/{id:int}")]
        [ResponseType(typeof(CardsWagonsRepairs))]
        public IHttpActionResult GetCardsWagonsRepairs(int id)
        {
            try
            {
                CardsWagonsRepairs repairs = this.ef_cwr.Context
                    .Where(w => w.id == id)
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
                    }).FirstOrDefault();
                return Ok(repairs);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/mors/cards_wagons_repairs/
        [HttpPost]
        [Route("")]
        public int PostCardsWagonsRepairs([FromBody]CardsWagonsRepairs value)
        {
            try
            {
                this.ef_cwr.Add(value);
                return this.ef_cwr.Save();
                //this.ef_cards.Refresh(value);
                //return value.num;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/mors/cards_wagons_repairs/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCardsWagonsRepairs(int id, [FromBody]CardsWagonsRepairs value)
        {
            try
            {
                this.ef_cwr.Update(value);
                return this.ef_cwr.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/mors/cards_wagons_repairs/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCardsWagonsRepairs(int id)
        {
            try
            {
                this.ef_cwr.Delete(id);
                return this.ef_cwr.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
