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
    public class SostavOfFirstLast
    {
        public int num { get; set; }
        public int position { get; set; }
    }

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

        // GET: api/metrans/arrival_sostav/first/53550521/last/56267057/count/39
        [Route("first/{first:int}/last/{last:int}/count/{count:int}")]
        [ResponseType(typeof(SostavOfFirstLast))]
        public IHttpActionResult GetSostavOfFirstLast(int first, int last, int count)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_first = new System.Data.SqlClient.SqlParameter("@FirstNumber", first);
                System.Data.SqlClient.SqlParameter p_last = new System.Data.SqlClient.SqlParameter("@LastNumber", last);
                System.Data.SqlClient.SqlParameter p_count = new System.Data.SqlClient.SqlParameter("@Count", count);
                string sql = "select * from [IDS].[get_metrans_sostav_of_first_last_num](@FirstNumber, @LastNumber, @Count)";
                List<SostavOfFirstLast> list = this.ef_metrans.Database.SqlQuery<SostavOfFirstLast>(sql, p_first, p_last, p_count).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
