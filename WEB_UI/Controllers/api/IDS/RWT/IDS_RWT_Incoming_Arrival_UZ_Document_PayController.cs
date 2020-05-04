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
    /// Тариф по документу
    /// </summary>
    [RoutePrefix("api/ids/rwt/arrival_uz_document_pay")]
    public class IDS_RWT_Incoming_Arrival_UZ_Document_PayController : ApiController
    {
        protected IRepository<Arrival_UZ_Document_Pay> ef_ids;

        public IDS_RWT_Incoming_Arrival_UZ_Document_PayController(IRepository<Arrival_UZ_Document_Pay> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/arrival_uz_document_pay/all
        [Route("all")]
        [ResponseType(typeof(Arrival_UZ_Document_Pay))]
        public IHttpActionResult GetArrival_UZ_Document_Pay()
        {
            try
            {
                List<Arrival_UZ_Document_Pay> list = this.ef_ids.Context.ToList().Select(c => c.GetArrival_UZ_Document_Pay()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_document_pay/id/78943
        [Route("id/{id:int}")]
        [ResponseType(typeof(Arrival_UZ_Document_Pay))]
        public IHttpActionResult GetArrival_UZ_Document_Pay(int id)
        {
            try
            {
                Arrival_UZ_Document_Pay item = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Document_Pay()).FirstOrDefault();
                return Ok(item);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/arrival_uz_document_pay/document/id/1
        [Route("document/id/{id:long}")]
        [ResponseType(typeof(Arrival_UZ_Document_Pay))]
        public IHttpActionResult GetArrival_UZ_Document_Pay(long id)
        {
            try
            {
                List<Arrival_UZ_Document_Pay> list = this.ef_ids
                    .Context
                    .Where(s => s.id_document == id)
                    .ToList()
                    .Select(c => c.GetArrival_UZ_Document_Pay()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/arrival_uz_document_pay/
        [HttpPost]
        [Route("")]
        public int PostArrival_UZ_Document_Pay([FromBody]Arrival_UZ_Document_Pay value)
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

        // POST api/ids/rwt/arrival_uz_document_pay/list
        [HttpPost]
        [Route("list")]
        public int PostListArrival_UZ_Document_Pay([FromBody]List<Arrival_UZ_Document_Pay> list)
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

        // PUT api/ids/rwt/arrival_uz_document_pay/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutArrival_UZ_Document_Pay(int id, [FromBody]Arrival_UZ_Document_Pay value)
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

        // DELETE api/ids/rwt/arrival_uz_document_pay/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteArrival_UZ_Document_Pay(int id)
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
