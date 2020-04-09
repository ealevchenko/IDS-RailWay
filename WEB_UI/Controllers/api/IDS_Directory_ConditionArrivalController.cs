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
    /// ГОДНОСТЬ ПО ПРИБЫТИЮ
    /// </summary>
    [RoutePrefix("api/ids/directory/condition_arrival")]
    public class IDS_Directory_ConditionArrivalController : ApiController
    {
        protected IRepository<Directory_ConditionArrival> ef_dir;

        public IDS_Directory_ConditionArrivalController(IRepository<Directory_ConditionArrival> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/condition_arrival/all
        [Route("all")]
        [ResponseType(typeof(Directory_ConditionArrival))]
        public IHttpActionResult GetConditionArrival()
        {
            try
            {
                List<Directory_ConditionArrival> list = this.ef_dir.Context.ToList()
                    .Select(l => l.GetDirectory_ConditionArrival()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/condition_arrival/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_ConditionArrival))]
        public IHttpActionResult GetDirectory_ConditionArrivalOfID(int id)
        {
            try
            {
                Directory_ConditionArrival ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_ConditionArrival()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/condition_arrival/
        [HttpPost]
        [Route("")]
        public int PostDirectory_ConditionArrival([FromBody]Directory_ConditionArrival value)
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

        // PUT api/ids/directory/condition_arrival/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutDirectory_ConditionArrival(int id, [FromBody]Directory_ConditionArrival value)
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

        // DELETE api/ids/directory/condition_arrival/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteDirectory_ConditionArrival(int id)
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
