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
    /// ЭЛЕКТРОННЫЕ КАРТОЧКИ ВАГОНОВ
    /// </summary>
    [RoutePrefix("api/ids/mors/cards_wagons")]
    public class IDS_CardsWagonsController : ApiController
    {
        protected IRepository<CardsWagons> ef_cards;

        public IDS_CardsWagonsController(IRepository<CardsWagons> cards)
        {
            this.ef_cards = cards;
        }

        // GET: api/ids/mors/cards_wagons/all
        [Route("all")]
        [ResponseType(typeof(CardsWagons))]
        public IHttpActionResult GetCardsWagons()
        {
            try
            {
                List<CardsWagons> list = this.ef_cards.Context.ToList()
                    .Select(c => new CardsWagons
                    {
                        num = c.num,
                        id_genus_wagon = c.id_genus_wagon,
                        id_state = c.id_state,
                        id_wagon_manufacturer = c.id_wagon_manufacturer,
                        year_wagon_create = c.year_wagon_create,
                        code_station = c.code_station,
                        carrying_capacity = c.carrying_capacity,
                        tara = c.tara,
                        id_type_repairs = c.id_type_repairs,
                        date_type_repairs = c.date_type_repairs,
                        code_model_wagon = c.code_model_wagon,
                        id_type_wagon = c.id_type_wagon,
                        axis_length = c.axis_length,
                        body_volume = c.body_volume,
                        id_type_ownership = c.id_type_ownership,
                        id_owner_wagon = c.id_owner_wagon,
                        date_registration = c.date_registration,
                        id_lessor_wagon = c.id_lessor_wagon,
                        id_operator_wagon = c.id_operator_wagon,
                        id_poligon_travel_wagon = c.id_poligon_travel_wagon,
                        id_special_conditions = c.id_special_conditions,
                        sap = c.sap,
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

        // GET: api/ids/mors/cards_wagons/num/50030337
        [Route("num/{num:int}")]
        [ResponseType(typeof(CardsWagons))]
        public IHttpActionResult GetCardsWagons(int num)
        {
            try
            {
                CardsWagons wagon = this.ef_cards
                    .Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(c => new CardsWagons
                    {
                        num = c.num,
                        id_genus_wagon = c.id_genus_wagon,
                        id_state = c.id_state,
                        id_wagon_manufacturer = c.id_wagon_manufacturer,
                        year_wagon_create = c.year_wagon_create,
                        code_station = c.code_station,
                        carrying_capacity = c.carrying_capacity,
                        tara = c.tara,
                        id_type_repairs = c.id_type_repairs,
                        date_type_repairs = c.date_type_repairs,
                        code_model_wagon = c.code_model_wagon,
                        id_type_wagon = c.id_type_wagon,
                        axis_length = c.axis_length,
                        body_volume = c.body_volume,
                        id_type_ownership = c.id_type_ownership,
                        id_owner_wagon = c.id_owner_wagon,
                        date_registration = c.date_registration,
                        id_lessor_wagon = c.id_lessor_wagon,
                        id_operator_wagon = c.id_operator_wagon,
                        id_poligon_travel_wagon = c.id_poligon_travel_wagon,
                        id_special_conditions = c.id_special_conditions,
                        sap = c.sap,
                        note = c.note,
                        create = c.create,
                        create_user = c.create_user,
                        change = c.change,
                        change_user = c.change_user,
                        
                    }).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/mors/cards_wagons/
        [HttpPost]
        [Route("")]
        public int PostCardsWagons([FromBody]CardsWagons value)
        {
            try
            {
                this.ef_cards.Add(value);
                return this.ef_cards.Save();
                //this.ef_cards.Refresh(value);
                //return value.num;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/mors/cards_wagons/num
        [HttpPut]
        [Route("num/{num:int}")]
        public int PutCardsWagons(int num, [FromBody]CardsWagons value)
        {
            try
            {
                this.ef_cards.Update(value);
                return this.ef_cards.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/mors/cards_wagons/num
        [HttpDelete]
        [Route("num/{num:int}")]
        public int DeleteCardsWagons(int num)
        {
            try
            {
                this.ef_cards.Delete(num);
                return this.ef_cards.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
