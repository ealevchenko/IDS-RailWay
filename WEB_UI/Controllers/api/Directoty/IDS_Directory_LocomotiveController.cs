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
    /// СПИСОК ЛОКОМОТИВОВ
    /// </summary>
    [RoutePrefix("api/ids/directory/locomotive")]
    public class IDS_Directory_LocomotiveController : ApiController
    {
        protected IStringRepository<Directory_Locomotive> ef_dir;

        public IDS_Directory_LocomotiveController(IStringRepository<Directory_Locomotive> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/locomotive/all
        [Route("all")]
        [ResponseType(typeof(Directory_Locomotive))]
        public IHttpActionResult GetLocomotive()
        {
            try
            {
                List<Directory_Locomotive> list = this.ef_dir.Context.ToList()
                    .Select(l => l.GetDirectory_Locomotive()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/locomotive/locomotive/
        [Route("locomotive/{locomotive}")]
        [ResponseType(typeof(Directory_Locomotive))]
        public IHttpActionResult GetLocomotiveOfID(string locomotive)
        {
            try
            {
                Directory_Locomotive ens = this.ef_dir
                    .Context
                    .Where(l => l.locomotive == locomotive)
                    .ToList()
                    .Select(m => m.GetDirectory_Locomotive()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/locomotive/
        [HttpPost]
        [Route("")]
        public int PostWays([FromBody]Directory_Locomotive value)
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

        // PUT api/ids/directory/locomotive/locomotive
        [HttpPut]
        [Route("locomotive/{locomotive}")]
        public int PutWays(string locomotive, [FromBody]Directory_Locomotive value)
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

        // DELETE api/ids/directory/locomotive/locomotive
        [HttpDelete]
        [Route("locomotive/{locomotive}")]
        public int DeleteWays(string locomotive)
        {
            try
            {
                this.ef_dir.Delete(locomotive);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
