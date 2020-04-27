using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFIDS.Helper;
using EFIDS.Abstract;
using EFIDS.Entities;

namespace WEB_UI.Controllers.api
{
    [RoutePrefix("api/ids/rwt/arrival_sostav")]
    public class IDS_RWT_Incoming_ArrivalSostavController : ApiController
    {
        protected ILongRepository<ArrivalSostav> ef_ids;

        public IDS_RWT_Incoming_ArrivalSostavController(ILongRepository<ArrivalSostav> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/arrival_sostav/all
        [Route("all")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav()
        {
            try
            {
                List<ArrivalSostav> list = this.ef_ids.Context.ToList().Select(c => c.GetArrivalSostav_ArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_sostav/id/4647
        [Route("id/{id:long}")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav(long id)
        {
            try
            {
                List<ArrivalSostav> list = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetArrivalSostav_ArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_sostav/start/2020-03-12T00:00:00/stop/2020-03-20T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav(DateTime start, DateTime stop)
        {
            try
            {
                List<ArrivalSostav> list = this.ef_ids
                    .Context
                    .Where(s => s.date_arrival >= start && s.date_arrival <= stop)
                    .ToList()
                    .Select(c => c.GetArrivalSostav_ArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_sostav/
        [HttpPost]
        [Route("")]
        public long PostArrivalSostav([FromBody]ArrivalSostav value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/arrival_sostav/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutArrivalSostav(long id, [FromBody]ArrivalSostav value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/arrival_sostav/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteArrivalSostav(long id)
        {
            try
            {
                this.ef_ids.Delete(id);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
