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
    [RoutePrefix("api/ids/rwt/arrival_uz_vagon_cont")]
    public class IDS_RWT_Incoming_Arrival_UZ_Vagon_ContController : ApiController
    {
        protected ILongRepository<Arrival_UZ_Vagon_Cont> ef_ids;

        public IDS_RWT_Incoming_Arrival_UZ_Vagon_ContController(ILongRepository<Arrival_UZ_Vagon_Cont> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/arrival_uz_vagon_cont/all
        [Route("all")]
        [ResponseType(typeof(Arrival_UZ_Vagon_Cont))]
        public IHttpActionResult GetArrival_UZ_Vagon_Cont()
        {
            try
            {
                List<Arrival_UZ_Vagon_Cont> list = this.ef_ids.Context.ToList().Select(c => c.GetArrival_UZ_Vagon_Cont()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_vagon_cont/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Vagon_Cont))]
        public IHttpActionResult GetArrival_UZ_Vagon_Cont(long id)
        {
            try
            {
                Arrival_UZ_Vagon_Cont item = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Vagon_Cont()).FirstOrDefault();
                return Ok(item);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_vagon_cont/vagon/id/1
        [Route("vagon/id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Vagon_Cont))]
        public IHttpActionResult GetArrival_UZ_Vagon_ContOfVagon(long id)
        {
            try
            {
                List<Arrival_UZ_Vagon_Cont> list = this.ef_ids
                    .Context
                    .Where(s => s.id_vagon == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Vagon_Cont()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_uz_vagon_cont/
        [HttpPost]
        [Route("")]
        public long PostArrival_UZ_Vagon_Cont([FromBody]Arrival_UZ_Vagon_Cont value)
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

        // POST api/ids/rwt/arrival_uz_vagon_cont/list
        [HttpPost]
        [Route("list")]
        public int PostListArrival_UZ_Vagon_Cont([FromBody]List<Arrival_UZ_Vagon_Cont> list)
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

        // PUT api/ids/rwt/arrival_uz_vagon_cont/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutArrival_UZ_Vagon_Cont(long id, [FromBody]Arrival_UZ_Vagon_Cont value)
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

        // DELETE api/ids/rwt/arrival_uz_vagon_cont/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteArrival_UZ_Vagon_Cont(long id)
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
