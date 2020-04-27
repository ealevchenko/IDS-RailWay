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
    [RoutePrefix("api/ids/rwt/arrival_cars")]
    public class IDS_RWT_Incoming_ArrivalCarsController : ApiController
    {
        protected ILongRepository<ArrivalCars> ef_ids;

        public IDS_RWT_Incoming_ArrivalCarsController(ILongRepository<ArrivalCars> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/arrival_cars/all
        [Route("all")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCars()
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids.Context.ToList().Select(c => c.GetArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/sostav/id/17
        [Route("sostav/id/{id:long}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCarsOfSostav(long id)
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.id_arrival == id)
                    .ToList()
                    .Select(c => c.GetArrivalCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCars(long id)
        {
            try
            {
                ArrivalCars cars = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrivalCars()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_cars/start/2020-03-13T00:00:00/stop/2020-03-13T23:59:59/nums/56681562,52740883
        [Route("start/{start:datetime}/stop/{stop:datetime}/nums/{nums}")]
        [ResponseType(typeof(ArrivalCars))]
        public IHttpActionResult GetArrivalCars(DateTime start, DateTime stop, string nums)
        {
            try
            {
                //string sql = "SELECT IDS.ArrivalCars.* FROM IDS.ArrivalCars INNER JOIN IDS.ArrivalSostav ON IDS.ArrivalCars.id = IDS.ArrivalSostav.id WHERE (IDS.ArrivalSostav.date_arrival >= CONVERT(datetime,'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and IDS.ArrivalSostav.date_arrival <= CONVERT(datetime,'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120) and num in("+ nums + "))";
                //List<ArrivalCars> list = this.ef_ids.Database.SqlQuery<ArrivalCars>(sql).ToList().Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                List<ArrivalCars> list_result = new List<ArrivalCars>();
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.ArrivalSostav.date_arrival >= start && s.ArrivalSostav.date_arrival <= stop)
                    //.ToList()
                    //.TakeWhile(x => nums.IndexOf(x.num.ToString()) > -1)
                    .ToList()
                    .Select(c => c.GetArrivalCars_ArrivalSostav()).ToList();
                foreach (ArrivalCars car in list)
                {
                    if (nums.IndexOf(car.num.ToString()) > -1)
                    {
                        list_result.Add(car);
                    }
                }
                return Ok(list_result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_cars/
        [HttpPost]
        [Route("")]
        public long PostArrivalCars([FromBody]ArrivalCars value)
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

        // PUT api/ids/rwt/arrival_cars/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutArrivalCars(long id, [FromBody]ArrivalCars value)
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

        // DELETE api/ids/rwt/arrival_cars/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteArrivalCars(long id)
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

        // DELETE api/ids/rwt/arrival_cars/sostav/id/17
        [HttpDelete]
        [Route("sostav/id/{id:long}")]
        public int DeleteArrivalCarsOfSostav(long id)
        {
            try
            {
                List<ArrivalCars> list = this.ef_ids
                    .Context
                    .Where(s => s.id_arrival == id)
                    .ToList()
                    .Select(c => c.GetArrivalCars()).ToList();
                List<long> list_del = new List<long>();

                foreach (ArrivalCars car in list) {
                    list_del.Add(car.id);
                }

                this.ef_ids.Delete(list_del);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
