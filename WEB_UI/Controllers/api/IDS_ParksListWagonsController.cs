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
    /// СПИСОК ВАГОНОВ ПАРКА ВАГОНОВ
    /// </summary>
    [RoutePrefix("api/ids/mors/park_list_wagons")]
    public class IDS_ParksListWagonsController : ApiController
    {
        protected IRepository<ParksListWagons> ef_park;

        public IDS_ParksListWagonsController(IRepository<ParksListWagons> park)
        {
            this.ef_park = park;
        }

        // GET: api/ids/mors/park_list_wagons/all
        [Route("all")]
        [ResponseType(typeof(ParksListWagons))]
        public IHttpActionResult GetParksListWagons()
        {
            try
            {
                List<ParksListWagons> list = this.ef_park.Context.ToList()
                    .Select(l => new ParksListWagons
                    {
                        id = l.id,
                        id_park_wagon = l.id_park_wagon,
                        num = l.num
                    }).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/park_list_wagons/park/id/
        [Route("park/id")]
        [ResponseType(typeof(ParksListWagons))]
        public IHttpActionResult GetParksListWagonsOfPark(int id)
        {
            try
            {
                List<ParksListWagons> list = this.ef_park
                    .Context
                    .Where(l => l.id_park_wagon == id)
                    .ToList()
                    .Select(l => new ParksListWagons
                    {
                        id = l.id,
                        id_park_wagon = l.id_park_wagon,
                        num = l.num
                    }).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/park_list_wagons/id/
        [Route("num/{num:int}")]
        [ResponseType(typeof(ParksListWagons))]
        public IHttpActionResult GetParksListWagons(int id)
        {
            try
            {
                ParksListWagons wagon = this.ef_park
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(l => new ParksListWagons
                    {
                        id = l.id,
                        id_park_wagon = l.id_park_wagon,
                        num = l.num

                    }).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/mors/park_list_wagons/
        [HttpPost]
        [Route("")]
        public int PostParksListWagons([FromBody]ParksListWagons value)
        {
            try
            {
                this.ef_park.Add(value);
                return this.ef_park.Save();
                //this.ef_cards.Refresh(value);
                //return value.num;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/mors/park_list_wagons/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutParksListWagons(int id, [FromBody]ParksListWagons value)
        {
            try
            {
                this.ef_park.Update(value);
                return this.ef_park.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/mors/park_list_wagons/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteParksListWagons(int id)
        {
            try
            {
                this.ef_park.Delete(id);
                return this.ef_park.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
