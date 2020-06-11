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
    /// СПИСОК ПОДРАЗДЕЛЕНИЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/division")]
    public class IDS_Directory_DivisionsController : ApiController
    {
        protected IRepository<Directory_Divisions> ef_dir;

        public IDS_Directory_DivisionsController(IRepository<Directory_Divisions> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/division/all
        [Route("all")]
        [ResponseType(typeof(Directory_Divisions))]
        public IHttpActionResult GetDivisions()
        {
            try
            {
                List<Directory_Divisions> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Divisions()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/division/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Divisions))]
        public IHttpActionResult GetDivisionsOfID(int id)
        {
            try
            {
                Directory_Divisions ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Divisions()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/division/
        [HttpPost]
        [Route("")]
        public int PostDivisions([FromBody]Directory_Divisions value)
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

        // PUT api/ids/directory/division/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutDivisions(int id, [FromBody]Directory_Divisions value)
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

        // DELETE api/ids/directory/division/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteDivisions(int id)
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
