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
    /// СПИСОК ПУТЕЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/ways")]
    public class IDS_Directory_WaysController : ApiController
    {
        protected IRepository<Directory_Ways> ef_dir;

        public IDS_Directory_WaysController(IRepository<Directory_Ways> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/ways/all
        [Route("all")]
        [ResponseType(typeof(Directory_Ways))]
        public IHttpActionResult GetWays()
        {
            try
            {
                List<Directory_Ways> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Ways()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/ways/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Ways))]
        public IHttpActionResult GetWaysOfID(int id)
        {
            try
            {
                Directory_Ways ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Ways()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/ways/
        [HttpPost]
        [Route("")]
        public int PostWays([FromBody]Directory_Ways value)
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

        // PUT api/ids/directory/ways/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutWays(int id, [FromBody]Directory_Ways value)
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

        // DELETE api/ids/directory/ways/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteWays(int id)
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
