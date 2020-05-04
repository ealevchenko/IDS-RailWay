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
    /// <summary>
    /// Акты по вагонам
    /// </summary>
    [RoutePrefix("api/ids/rwt/arrival_uz_vagon")]
    public class IDS_RWT_Incoming_Arrival_UZ_VagonController : ApiController
    {
        protected ILongRepository<Arrival_UZ_Vagon> ef_ids;

        public IDS_RWT_Incoming_Arrival_UZ_VagonController(ILongRepository<Arrival_UZ_Vagon> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/arrival_uz_vagon/all
        [Route("all")]
        [ResponseType(typeof(Arrival_UZ_Vagon))]
        public IHttpActionResult GetArrival_UZ_Vagon()
        {
            try
            {
                List<Arrival_UZ_Vagon> list = this.ef_ids.Context.ToList().Select(c => c.GetArrival_UZ_Vagon()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_vagon/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Vagon))]
        public IHttpActionResult GetArrival_UZ_Vagon(long id)
        {
            try
            {
                Arrival_UZ_Vagon item = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Vagon()).FirstOrDefault();
                return Ok(item);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_vagon/document/id/1
        [Route("document/id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Vagon))]
        public IHttpActionResult GetArrival_UZ_VagonOfVagon(long id)
        {
            try
            {
                List<Arrival_UZ_Vagon> list = this.ef_ids
                    .Context
                    .Where(s => s.id_document == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Vagon()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_uz_vagon/
        [HttpPost]
        [Route("")]
        public long PostArrival_UZ_Vagon([FromBody]Arrival_UZ_Vagon value)
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

        // POST api/ids/rwt/arrival_uz_vagon/list
        [HttpPost]
        [Route("list")]
        public int PostListArrival_UZ_Vagon([FromBody]List<Arrival_UZ_Vagon> list)
        {
            try
            {
                this.ef_ids.Add(list);
                int res = this.ef_ids.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/arrival_uz_vagon/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutArrival_UZ_Vagon(long id, [FromBody]Arrival_UZ_Vagon value)
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

        // DELETE api/ids/rwt/arrival_uz_vagon/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteArrival_UZ_Vagon(long id)
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
