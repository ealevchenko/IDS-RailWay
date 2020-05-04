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
    /// Приложеныее документы по документу
    /// </summary>
    [RoutePrefix("api/ids/rwt/arrival_uz_document_docs")]
    public class IDS_RWT_Incoming_Arrival_UZ_Document_DocsController : ApiController
    {
        protected IRepository<Arrival_UZ_Document_Docs> ef_ids;

        public IDS_RWT_Incoming_Arrival_UZ_Document_DocsController(IRepository<Arrival_UZ_Document_Docs> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/arrival_uz_document_docs/all
        [Route("all")]
        [ResponseType(typeof(Arrival_UZ_Document_Docs))]
        public IHttpActionResult GetArrival_UZ_Document_Docs()
        {
            try
            {
                List<Arrival_UZ_Document_Docs> list = this.ef_ids.Context.ToList().Select(c => c.GetArrival_UZ_Document_Docs()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_document_docs/id/78943
        [Route("id/{id:int}")]
        [ResponseType(typeof(Arrival_UZ_Document_Docs))]
        public IHttpActionResult GetArrival_UZ_Document_Docs(int id)
        {
            try
            {
                Arrival_UZ_Document_Docs item = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Document_Docs()).FirstOrDefault();
                return Ok(item);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_document_docs/document/id/1
        [Route("document/id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Document_Docs))]
        public IHttpActionResult GetArrival_UZ_Document_Docs(long id)
        {
            try
            {
                List<Arrival_UZ_Document_Docs> list = this.ef_ids
                    .Context
                    .Where(s => s.id_document == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Document_Docs()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_uz_document_docs/
        [HttpPost]
        [Route("")]
        public int PostArrival_UZ_Document_Docs([FromBody]Arrival_UZ_Document_Docs value)
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

        // POST api/ids/rwt/arrival_uz_document_docs/list
        [HttpPost]
        [Route("list")]
        public int PostListArrival_UZ_Document_Docs([FromBody]List<Arrival_UZ_Document_Docs> list)
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

        // PUT api/ids/rwt/arrival_uz_document_docs/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutArrival_UZ_Document_Docs(int id, [FromBody]Arrival_UZ_Document_Docs value)
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

        // DELETE api/ids/rwt/arrival_uz_document_docs/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteArrival_UZ_Document_Docs(int id)
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
