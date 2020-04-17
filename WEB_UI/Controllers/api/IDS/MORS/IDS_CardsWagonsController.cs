using EFIDS.Abstract;
using EFIDS.Entities;
using EFUZ.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFIDS.Helper;

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

        [Route("all")]
        [ResponseType(typeof(CardsWagons))]
        public IHttpActionResult GetCardsWagons()
        {
            try
            {
                List<CardsWagons> list = this.ef_cards.Context.ToList().Select(c=> c.GetCardsWagons()).ToList();
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
                    .Select(c => c.GetCardsWagons()).FirstOrDefault();
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
