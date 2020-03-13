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
        protected IRepository<ArrivalSostav> ef_ids;

        public IDS_RWT_Incoming_ArrivalSostavController(IRepository<ArrivalSostav> metrans)
        {
            this.ef_ids = metrans;
        }


        // GET: api/ids/rwt/arrival_sostav/all
        [Route("all")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav()
        {
            try
            {
                List<ArrivalSostav> list = this.ef_ids.Context.ToList().Select(c => c.GetArrivalSostav()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_sostav/id/4647
        [Route("id/{id:int}")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav(int id)
        {
            try
            {
                List<ArrivalSostav> list = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetArrivalSostav()).ToList();
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
                    .Select(c => c.GetArrivalSostav()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
