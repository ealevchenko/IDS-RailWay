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
               ArrivalSostav sostav = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetArrivalSostav_ArrivalCars()).FirstOrDefault();
               return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_sostav/current_num/station/id/6
        [Route("current_num/station/id/{id:int}")]
        [ResponseType(typeof(int))]
        public IHttpActionResult GetCurrentNumArrivalSostavOfStation(int id)
        {
            try
            {
               ArrivalSostav sostav = this.ef_ids
                    .Context
                    .Where(s=>s.id_station_on == id & s.date_arrival.Year == DateTime.Now.Year)
                    .ToList()
                    .OrderByDescending(n=>n.num_doc).FirstOrDefault();
                return Ok(sostav!=null ? sostav.num_doc : 0);
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

        // GET: api/ids/rwt/arrival_sostav/start/2020-09-01T00:00:00/stop/2020-09-01T23:59:59/station/amkr/id/6
        [Route("start/{start:datetime}/stop/{stop:datetime}/station/amkr/id/{id:int}")]
        [ResponseType(typeof(ArrivalSostav))]
        public IHttpActionResult GetDocsArrivalSostav(DateTime start, DateTime stop, int id)
        {
            try
            {
                string sql = "SELECT [id],[id_arrived],[id_sostav],[train],[composition_index],[date_arrival],[date_adoption],[date_adoption_act],[id_station_from],[id_station_on],[id_way],[numeration],[num_doc],[count],[status],[note],[create],[create_user],[change],[change_user] " +
                "FROM [KRR-PA-CNT-Railway].[IDS].[ArrivalSostav] where [date_arrival]>=convert(datetime, '" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and [date_arrival]<=convert(datetime, '" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and [id_station_on]=" + id.ToString();
                List<ArrivalSostav> list = this.ef_ids.Database.SqlQuery<ArrivalSostav>(sql).ToList();
                
                //List<ArrivalSostav> list = this.ef_ids
                //    .Context
                //    .Where(s => s.date_arrival >= start && s.date_arrival <= stop && s.id_station_on == id)
                //    .ToList()
                //    .Select(c => c.GetArrivalSostav_ArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



            //        string sql = "SELECT " + field + " FROM " + table + " where [Num]= " + num.ToString() + " order by [id] desc";
            //return this.db.Database.SqlQuery<ApproachesCars>(sql).FirstOrDefault();

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
