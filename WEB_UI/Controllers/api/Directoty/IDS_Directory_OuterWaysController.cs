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
    [RoutePrefix("api/ids/directory/outer_ways")]
    public class IDS_Directory_OuterWaysController : ApiController
    {
        protected IRepository<Directory_OuterWays> ef_dir;

        public IDS_Directory_OuterWaysController(IRepository<Directory_OuterWays> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/outer_ways/all
        [Route("all")]
        [ResponseType(typeof(Directory_OuterWays))]
        public IHttpActionResult GetOuterWays()
        {
            try
            {
                List<Directory_OuterWays> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_OuterWays()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/outer_ways/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_OuterWays))]
        public IHttpActionResult GetOuterWaysOfID(int id)
        {
            try
            {
                Directory_OuterWays ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_OuterWays()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/outer_ways/
        [HttpPost]
        [Route("")]
        public int PostWays([FromBody]Directory_OuterWays value)
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

        // PUT api/ids/directory/outer_ways/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutWays(int id, [FromBody]Directory_OuterWays value)
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

        // DELETE api/ids/directory/outer_ways/id
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
