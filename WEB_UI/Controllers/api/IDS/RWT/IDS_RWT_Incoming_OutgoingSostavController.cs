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
    [RoutePrefix("api/ids/rwt/outgoing_sostav")]
    public class IDS_RWT_Incoming_OutgoingSostavController : ApiController
    {
        protected ILongRepository<OutgoingSostav> ef_ids;

        public IDS_RWT_Incoming_OutgoingSostavController(ILongRepository<OutgoingSostav> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/outgoing_sostav/all
        [Route("all")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostav()
        {
            try
            {
                List<OutgoingSostav> list = this.ef_ids.Context.ToList().Select(c => c.GetOutgoingSostav_OutgoingCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_sostav/id/4647
        [Route("id/{id:long}")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostav(long id)
        {
            try
            {
               OutgoingSostav sostav = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetOutgoingSostav_OutgoingCars()).FirstOrDefault();
               return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //// GET: api/ids/rwt/outgoing_sostav/current_num/station/id/6
        //[Route("current_num/station/id/{id:int}")]
        //[ResponseType(typeof(int))]
        //public IHttpActionResult GetCurrentNumOutgoingSostavOfStation(int id)
        //{
        //    try
        //    {
        //       OutgoingSostav sostav = this.ef_ids
        //            .Context
        //            .Where(s=>s.id_station_on == id & s.date_arrival.Year == DateTime.Now.Year)
        //            .ToList()
        //            .OrderByDescending(n=>n.num_doc).FirstOrDefault();
        //        return Ok(sostav!=null ? sostav.num_doc : 0);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        // GET: api/ids/rwt/outgoing_sostav/start/2020-08-27T00:00:00/stop/2020-08-27T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostav(DateTime start, DateTime stop)
        {
            try
            {
                List<OutgoingSostav> list = this.ef_ids
                    .Context
                    .Where(s => s.date_readiness_amkr >= start && s.date_readiness_amkr <= stop)
                    .ToList()
                    .Select(c => c.GetOutgoingSostav_OutgoingCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/outgoing_sostav/
        [HttpPost]
        [Route("")]
        public long PostOutgoingSostav([FromBody]OutgoingSostav value)
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

        // PUT api/ids/rwt/outgoing_sostav/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutOutgoingSostav(long id, [FromBody]OutgoingSostav value)
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

        // DELETE api/ids/rwt/outgoing_sostav/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteOutgoingSostav(long id)
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
