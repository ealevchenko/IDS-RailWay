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
    /// ПАРК ВАГОНОВ ВАГОНОВ
    /// </summary>
    [RoutePrefix("api/ids/mors/park_wagons")]
    public class IDS_ParksWagonsController : ApiController
    {
        protected IRepository<ParksWagons> ef_park;

        public IDS_ParksWagonsController(IRepository<ParksWagons> park)
        {
            this.ef_park = park;
        }

        // GET: api/ids/mors/park_wagons/all
        [Route("all")]
        [ResponseType(typeof(ParksWagons))]
        public IHttpActionResult GetParksWagons()
        {
            try
            {
                List<ParksWagons> list = this.ef_park.Context.ToList()
                    .Select(p => new ParksWagons
                    {
                        id = p.id,
                        name_park_ru = p.name_park_ru,
                        name_park_en = p.name_park_en
                    }).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/park_wagons/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(ParksWagons))]
        public IHttpActionResult GetParksWagons(int id)
        {
            try
            {
                ParksWagons wagon = this.ef_park
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(p => new ParksWagons
                    {
                        id = p.id,
                        name_park_ru = p.name_park_ru,
                        name_park_en = p.name_park_en

                    }).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/mors/park_wagons/
        [HttpPost]
        [Route("")]
        public int PostParksWagons([FromBody]ParksWagons value)
        {
            try
            {
                this.ef_park.Add(value);
                this.ef_park.Save();
                this.ef_park.Refresh(value);
                return value.id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/mors/park_wagons/num
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutParksWagons(int id, [FromBody]ParksWagons value)
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

        // DELETE api/ids/mors/park_wagons/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteParksWagons(int id)
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
