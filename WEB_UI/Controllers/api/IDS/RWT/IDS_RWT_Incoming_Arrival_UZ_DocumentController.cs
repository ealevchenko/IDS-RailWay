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
    /// ЭПД - по прибытию
    /// </summary>
    [RoutePrefix("api/ids/rwt/arrival_uz_document")]
    public class IDS_RWT_Incoming_Arrival_UZ_DocumentController : ApiController
    {
        protected ILongRepository<Arrival_UZ_Document> ef_ids;

        public IDS_RWT_Incoming_Arrival_UZ_DocumentController(ILongRepository<Arrival_UZ_Document> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/arrival_uz_document/all
        [Route("all")]
        [ResponseType(typeof(Arrival_UZ_Document))]
        public IHttpActionResult GetArrival_UZ_Document()
        {
            try
            {
                List<Arrival_UZ_Document> list = this.ef_ids.Context.ToList().Select(c => c.GetArrival_UZ_Document()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_document/id/78943
        [Route("id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Document))]
        public IHttpActionResult GetArrival_UZ_Document(long id)
        {
            try
            {
                Arrival_UZ_Document cars = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Document()).FirstOrDefault();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_uz_document/
        [HttpPost]
        [Route("")]
        public long PostArrival_UZ_Document([FromBody]Arrival_UZ_Document value)
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

        // PUT api/ids/rwt/arrival_uz_document/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutArrival_UZ_Document(long id, [FromBody]Arrival_UZ_Document value)
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

        // DELETE api/ids/rwt/arrival_uz_document/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteArrival_UZ_Document(long id)
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
