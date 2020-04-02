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
    /// СПИСОК ВНУТРЕНИХ Ж.Д.
    /// </summary>
    [RoutePrefix("api/ids/directory/inlandrailway")]
    public class IDS_Directory_InlandRailwayController : ApiController
    {
        protected IRepository<Directory_InlandRailway> ef_dir;

        public IDS_Directory_InlandRailwayController(IRepository<Directory_InlandRailway> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/inlandrailway/all
        [Route("all")]
        [ResponseType(typeof(Directory_InlandRailway))]
        public IHttpActionResult GetInlandRailway()
        {
            try
            {
                List<Directory_InlandRailway> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_InlandRailway()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/inlandrailway/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_InlandRailway))]
        public IHttpActionResult GetInlandRailwayOfID(int code)
        {
            try
            {
                Directory_InlandRailway ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_InlandRailway()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/inlandrailway/
        [HttpPost]
        [Route("")]
        public int PostInlandRailway([FromBody]Directory_InlandRailway value)
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

        // PUT api/ids/directory/inlandrailway/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutInlandRailway(int code, [FromBody]Directory_InlandRailway value)
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

        // DELETE api/ids/directory/inlandrailway/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteInlandRailway(int code)
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
