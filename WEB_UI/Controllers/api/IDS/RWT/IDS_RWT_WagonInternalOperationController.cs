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

    [RoutePrefix("api/ids/rwt/wio")]
    public class IDS_RWT_WagonInternalOperationController : ApiController
    {
        protected ILongRepository<WagonInternalOperation> ef_ids;

        public IDS_RWT_WagonInternalOperationController(ILongRepository<WagonInternalOperation> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/wio/all
        [Route("all")]
        [ResponseType(typeof(WagonInternalOperation))]
        public IHttpActionResult GetWagonInternalOperation()
        {
            try
            {
                List<WagonInternalOperation> wios = this.ef_ids.Context.ToList().Select(c => c.GetWagonInternalOperation()).ToList();
                return Ok(wios);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wio/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(WagonInternalOperation))]
        public IHttpActionResult GetWagonInternalOperationOfID(long id)
        {
            try
            {
                WagonInternalOperation wio = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalOperation()).FirstOrDefault();
                return Ok(wio);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wio/wir/id/132183
        /// <summary>
        /// Найти внутренее перемещение вагона по id строки отправления вагона таблица OutgoingCars
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("wir/id/{id:long}")]
        [ResponseType(typeof(WagonInternalOperation))]
        public IHttpActionResult GetWagonInternalOperationOfWIRID(long id)
        {
            try
            {
               List<WagonInternalOperation> wios = this.ef_ids
                    .Context
                    .Where(s => s.id_wagon_internal_routes == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalOperation()).ToList();
                return Ok(wios);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
