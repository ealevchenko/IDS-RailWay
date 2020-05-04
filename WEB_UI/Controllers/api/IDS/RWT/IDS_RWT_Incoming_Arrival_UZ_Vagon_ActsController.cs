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
    [RoutePrefix("api/ids/rwt/arrival_uz_vagon_acts")]
    public class IDS_RWT_Incoming_Arrival_UZ_Vagon_ActsController : ApiController
    {
        protected IRepository<Arrival_UZ_Vagon_Acts> ef_ids;

        public IDS_RWT_Incoming_Arrival_UZ_Vagon_ActsController(IRepository<Arrival_UZ_Vagon_Acts> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/arrival_uz_vagon_acts/all
        [Route("all")]
        [ResponseType(typeof(Arrival_UZ_Vagon_Acts))]
        public IHttpActionResult GetArrival_UZ_Vagon_Acts()
        {
            try
            {
                List<Arrival_UZ_Vagon_Acts> list = this.ef_ids.Context.ToList().Select(c => c.GetArrival_UZ_Vagon_Acts()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_vagon_acts/id/78943
        [Route("id/{id:int}")]
        [ResponseType(typeof(Arrival_UZ_Vagon_Acts))]
        public IHttpActionResult GetArrival_UZ_Vagon_Acts(int id)
        {
            try
            {
                Arrival_UZ_Vagon_Acts item = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Vagon_Acts()).FirstOrDefault();
                return Ok(item);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_vagon_acts/vagon/id/1
        [Route("vagon/id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Vagon_Acts))]
        public IHttpActionResult GetArrival_UZ_Vagon_Acts(long id)
        {
            try
            {
                List<Arrival_UZ_Vagon_Acts> list = this.ef_ids
                    .Context
                    .Where(s => s.id_vagon == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Vagon_Acts()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_uz_vagon_acts/
        [HttpPost]
        [Route("")]
        public int PostArrival_UZ_Vagon_Acts([FromBody]Arrival_UZ_Vagon_Acts value)
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

        // POST api/ids/rwt/arrival_uz_vagon_acts/list
        [HttpPost]
        [Route("list")]
        public int PostListArrival_UZ_Vagon_Acts([FromBody]List<Arrival_UZ_Vagon_Acts> list)
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

        // PUT api/ids/rwt/arrival_uz_vagon_acts/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutArrival_UZ_Vagon_Acts(int id, [FromBody]Arrival_UZ_Vagon_Acts value)
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

        // DELETE api/ids/rwt/arrival_uz_vagon_acts/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteArrival_UZ_Vagon_Acts(int id)
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
