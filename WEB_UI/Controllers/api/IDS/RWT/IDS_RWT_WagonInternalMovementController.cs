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

    [RoutePrefix("api/ids/rwt/wim")]
    public class IDS_RWT_WagonInternalMovementController : ApiController
    {
        protected ILongRepository<WagonInternalMovement> ef_ids;

        public IDS_RWT_WagonInternalMovementController(ILongRepository<WagonInternalMovement> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/wim/all
        [Route("all")]
        [ResponseType(typeof(WagonInternalMovement))]
        public IHttpActionResult GetWagonInternalMovement()
        {
            try
            {
                List<WagonInternalMovement> wims = this.ef_ids.Context.ToList().Select(c => c.GetWagonInternalMovement()).ToList();
                return Ok(wims);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wim/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(WagonInternalMovement))]
        public IHttpActionResult GetWagonInternalMovementOfID(long id)
        {
            try
            {
                WagonInternalMovement wim = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalMovement()).FirstOrDefault();
                return Ok(wim);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/wim/wir/id/132183
        /// <summary>
        /// Найти внутренее перемещение вагона по id строки отправления вагона таблица OutgoingCars
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("wir/id/{id:long}")]
        [ResponseType(typeof(WagonInternalMovement))]
        public IHttpActionResult GetWagonInternalMovementOfWIRID(long id)
        {
            try
            {
               List<WagonInternalMovement> wims = this.ef_ids
                    .Context
                    .Where(s => s.id_wagon_internal_routes == id)
                    .ToList()
                    .Select(c => c.GetWagonInternalMovement()).ToList();
                return Ok(wims);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
