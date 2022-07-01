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

    [RoutePrefix("api/ids/rwt/wir")]
    public class IDS_RWT_WagonInternalRoutesController : ApiController
    {
        protected ILongRepository<WagonInternalRoutes> ef_ids;

        public IDS_RWT_WagonInternalRoutesController(ILongRepository<WagonInternalRoutes> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/wir/all
        [Route("all")]
        [ResponseType(typeof(WagonInternalRoutes))]
        public IHttpActionResult GetWagonInternalRoutes()
        {
            try
            {
                List<WagonInternalRoutes> list = this.ef_ids.Context.ToList().Select(c => c.GetWagonInternalRoutes()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wir/wagon/num/63462121
        [Route("wagon/num/{num:int}")]
        [ResponseType(typeof(WagonInternalRoutes))]
        public IHttpActionResult GetWagonInternalRoutesOfWagonNum(int num)
        {
            try
            {
                List<WagonInternalRoutes> list = this.ef_ids
                    .Context
                    .Where(s => s.num == num)
                    .ToList()
                    .Select(c => c.GetWagonInternalRoutes()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Получить последнюю открытую строку внутреннего перемещения
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/wir/open/wagon/num/63462121
        [Route("open/wagon/num/{num:int}")]
        [ResponseType(typeof(WagonInternalRoutes))]
        public IHttpActionResult GetOpenWagonInternalRoutesOfWagonNum(int num)
        {
            try
            {
                WagonInternalRoutes wir = this.ef_ids
                    .Context
                    .Where(s => s.num == num && s.close == null)
                    .OrderByDescending(w=>w.id)
                    .ToList()
                    .Select(c => c.GetWagonInternalRoutes()).FirstOrDefault();
                return Ok(wir);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wir/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(WagonInternalRoutes))]
        public IHttpActionResult GetWagonInternalRoutesOfID(long id)
        {
            try
            {
                WagonInternalRoutes cars = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalRoutes()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wir/wagon/outgoing/id/132183
        /// <summary>
        /// Найти внутренее перемещение вагона по id строки отправления вагона таблица OutgoingCars
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("wagon/outgoing/id/{id:long}")]
        [ResponseType(typeof(WagonInternalRoutes))]
        public IHttpActionResult GetWagonInternalRoutesOfOutgoingCarsID(long id)
        {
            try
            {
                WagonInternalRoutes cars = this.ef_ids
                    .Context
                    .Where(s => s.id_outgoing_car == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalRoutes()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wir/wagon/outgoing/id/132183
        /// <summary>
        /// Найти внутренее перемещение вагона по id строки отправления вагона таблица OutgoingCars
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("wagon/arrival/id/{id:long}")]
        [ResponseType(typeof(WagonInternalRoutes))]
        public IHttpActionResult GetWagonInternalRoutesOfArrivalCarsID(long id)
        {
            try
            {
                WagonInternalRoutes cars = this.ef_ids
                    .Context
                    .Where(s => s.id_arrival_car == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalRoutes()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //// POST api/ids/rwt/wir/
        //[HttpPost]
        //[Route("")]
        //public long PostWagonInternalRoutes([FromBody]WagonInternalRoutes value)
        //{
        //    try
        //    {
        //        this.ef_ids.Add(value);
        //        int res = this.ef_ids.Save();
        //        return res > 0 ? value.id : res;
        //    }
        //    catch (Exception e)
        //    {
        //        return -1;
        //    }
        //}

        //// PUT api/ids/rwt/wir/id
        //[HttpPut]
        //[Route("id/{id:long}")]
        //public long PutWagonInternalRoutes(long id, [FromBody]WagonInternalRoutes value)
        //{
        //    try
        //    {
        //        this.ef_ids.Update(value);
        //        int res = this.ef_ids.Save();
        //        return res > 0 ? value.id : res;
        //    }
        //    catch (Exception e)
        //    {
        //        return -1;
        //    }
        //}

        //// DELETE api/ids/rwt/wir/id
        //[HttpDelete]
        //[Route("id/{id:long}")]
        //public int DeleteWagonInternalRoutes(long id)
        //{
        //    try
        //    {
        //        this.ef_ids.Delete(id);
        //        return this.ef_ids.Save();
        //    }
        //    catch (Exception e)
        //    {
        //        return -1;
        //    }
        //}

        //// DELETE api/ids/rwt/wir/sostav/id/17
        //[HttpDelete]
        //[Route("sostav/id/{id:long}")]
        //public int DeleteWagonInternalRoutesOfSostav(long id)
        //{
        //    try
        //    {
        //        List<WagonInternalRoutes> list = this.ef_ids
        //            .Context
        //            .Where(s => s.id_outgoing == id)
        //            .ToList()
        //            .Select(c => c.GetWagonInternalRoutes()).ToList();
        //        List<long> list_del = new List<long>();

        //        foreach (WagonInternalRoutes car in list) {
        //            list_del.Add(car.id);
        //        }

        //        this.ef_ids.Delete(list_del);
        //        return this.ef_ids.Save();
        //    }
        //    catch (Exception e)
        //    {
        //        return -1;
        //    }
        //}

    }
}
