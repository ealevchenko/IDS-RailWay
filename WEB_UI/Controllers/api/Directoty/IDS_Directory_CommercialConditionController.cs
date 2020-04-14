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
    /// СПИСОК СТРАН
    /// </summary>
    [RoutePrefix("api/ids/directory/commercial_condition")]
    public class IDS_Directory_CommercialConditionController : ApiController
    {
        protected IRepository<Directory_CommercialCondition> ef_dir;

        public IDS_Directory_CommercialConditionController(IRepository<Directory_CommercialCondition> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/commercial_condition/all
        [Route("all")]
        [ResponseType(typeof(Directory_CommercialCondition))]
        public IHttpActionResult GetCommercialCondition()
        {
            try
            {
                List<Directory_CommercialCondition> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_CommercialCondition()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/commercial_condition/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_CommercialCondition))]
        public IHttpActionResult GetCommercialConditionOfID(int id)
        {
            try
            {
                Directory_CommercialCondition ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_CommercialCondition()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/commercial_condition/
        [HttpPost]
        [Route("")]
        public int PostCommercialCondition([FromBody]Directory_CommercialCondition value)
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

        // PUT api/ids/directory/commercial_condition/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCommercialCondition(int id, [FromBody]Directory_CommercialCondition value)
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

        // DELETE api/ids/directory/commercial_condition/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCommercialCondition(int id)
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
