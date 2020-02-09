using EFMT.Abstract;
using EFMT.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFMT.Helper;

namespace WEB_UI.Controllers.api
{
    [RoutePrefix("api/metrans/arrival_sostav")]
    public class Metrans_ArrivalSostavController : ApiController
    {
        protected IRepository<ArrivalSostav> ef_metrans;

        public Metrans_ArrivalSostavController(IRepository<ArrivalSostav> metrans)
        {
            this.ef_metrans = metrans;
        }


        // GET: api/metrans/arrival_sostav/all
        [Route("all")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav()
        {
            try
            {
                List<ArrivalSostav> list = this.ef_metrans.Context.ToList().Select(c => c.GetArrivalSostav()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/metrans/arrival_sostav/id/4647
        [Route("id/{id:int}")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav(int id)
        {
            try
            {
                List<ArrivalSostav> list = this.ef_metrans
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

        // GET: api/metrans/arrival_sostav/start/2020-01-10T00:00:00/stop/2020-01-20T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetArrivalSostav(DateTime start, DateTime stop)
        {
            try
            {
                List<ArrivalSostav> list = this.ef_metrans
                    .Context
                    .Where(s=>s.date_time >=start && s.date_time<=stop)
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
