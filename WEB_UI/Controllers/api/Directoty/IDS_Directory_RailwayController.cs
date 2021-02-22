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
    /// СПИСОК Ж.Д.
    /// </summary>
    [RoutePrefix("api/ids/directory/railway")]
    public class IDS_Directory_RailwayController : ApiController
    {
        protected IRepository<Directory_Railway> ef_dir;

        public IDS_Directory_RailwayController(IRepository<Directory_Railway> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/railway/all
        [Route("all")]
        [ResponseType(typeof(Directory_Railway))]
        public IHttpActionResult GetRailway()
        {
            try
            {
                List<Directory_Railway> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Railway()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/railway/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_Railway))]
        public IHttpActionResult GetRailwayOfCode(int code)
        {
            try
            {
                Directory_Railway ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_Railway()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/railway/
        [HttpPost]
        [Route("")]
        public int PostRailway([FromBody]Directory_Railway value)
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

        // PUT api/ids/directory/railway/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutRailway(int code, [FromBody]Directory_Railway value)
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

        // DELETE api/ids/directory/railway/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteRailway(int code)
        {
            try
            {
                this.ef_dir.Delete(code);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
