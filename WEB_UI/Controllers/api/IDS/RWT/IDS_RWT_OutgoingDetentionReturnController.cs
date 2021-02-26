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
  
    
    [RoutePrefix("api/ids/rwt/outgoing_detention_return")]
    public class IDS_RWT_OutgoingDetentionReturnController : ApiController
    {
        protected IRepository<OutgoingDetentionReturn> ef_ids;

        public IDS_RWT_OutgoingDetentionReturnController(IRepository<OutgoingDetentionReturn> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/outgoing_detention_return/all
        [Route("all")]
        [ResponseType(typeof(OutgoingDetentionReturn))]
        public IHttpActionResult GetOutgoingDetentionReturn()
        {
            try
            {
                List<OutgoingDetentionReturn> list = this.ef_ids.Context.ToList().Select(c => c.GetOutgoingDetentionReturn()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_detention_return/id/4647
        [Route("id/{id:int}")]
        [ResponseType(typeof(OutgoingDetentionReturn))]
        public IHttpActionResult GetOutgoingDetentionReturn(int id)
        {
            try
            {
               OutgoingDetentionReturn dr = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetOutgoingDetentionReturn()).FirstOrDefault();
               return Ok(dr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_detention_return/num/6111111
        [Route("num/{num:int}")]
        [ResponseType(typeof(OutgoingDetentionReturn))]
        public IHttpActionResult GetOutgoingDetentionReturnOfNum(int num)
        {
            try
            {
                List<OutgoingDetentionReturn> list = this.ef_ids
                     .Context
                     .Where(s => s.num == num)
                     .ToList()
                     .Select(c => c.GetOutgoingDetentionReturn()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/outgoing_detention_return/
        [HttpPost]
        [Route("")]
        public long PostOutgoingDetentionReturn([FromBody]OutgoingDetentionReturn value)
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

        // PUT api/ids/rwt/outgoing_detention_return/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutOutgoingDetentionReturn(int id, [FromBody]OutgoingDetentionReturn value)
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

        // DELETE api/ids/rwt/outgoing_detention_return/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteOutgoingDetentionReturn(int id)
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
