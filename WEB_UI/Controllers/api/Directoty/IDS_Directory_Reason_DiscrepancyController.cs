using EFIDS.Abstract;
using EFIDS.Entities;
using EFIDS.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api
{
    /// <summary>
    /// СПИСОК ПРИЧИН РАСХОЖДЕНИЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/reason_discrepancy")]
    public class IDS_Directory_Reason_DiscrepancyController : ApiController
    {
        protected IRepository<Directory_Reason_Discrepancy> ef_dir;

        public IDS_Directory_Reason_DiscrepancyController(IRepository<Directory_Reason_Discrepancy> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/reason_discrepancy/all
        [Route("all")]
        [ResponseType(typeof(Directory_Reason_Discrepancy))]
        public IHttpActionResult GetReason_Discrepancy()
        {
            try
            {
                List<Directory_Reason_Discrepancy> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Reason_Discrepancy()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/reason_discrepancy/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Reason_Discrepancy))]
        public IHttpActionResult GetReason_DiscrepancyOfID(int id)
        {
            try
            {
                Directory_Reason_Discrepancy ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Reason_Discrepancy()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/reason_discrepancy/
        [HttpPost]
        [Route("")]
        public int PostReason_Discrepancy([FromBody]Directory_Reason_Discrepancy value)
        {
            try
            {
                this.ef_dir.Add(value);
                return ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // POST api/ids/directory/reason_discrepancy/list
        [HttpPost]
        [Route("list")]
        public int PostListReason_Discrepancy([FromBody]List<Directory_Reason_Discrepancy> list)
        {
            try
            {
                this.ef_dir.Add(list);
                int res = this.ef_dir.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/reason_discrepancy/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutReason_Discrepancy(int id, [FromBody]Directory_Reason_Discrepancy value)
        {
            try
            {
                this.ef_dir.Update(value);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }


        // PUT api/ids/directory/reason_discrepancy/list
        [HttpPut]
        [Route("list")]
        public int PutListReason_Discrepancy(List<Directory_Reason_Discrepancy> list)
        {
            try
            {
                this.ef_dir.Update(list);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/reason_discrepancy/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteReason_Discrepancy(int id)
        {
            try
            {
                this.ef_dir.Delete(id);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
