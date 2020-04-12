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
    /// СПИСОК ВНЕШНИХ СТАНЦИЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/external_station")]
    public class IDS_Directory_ExternalStationController : ApiController
    {
        protected IRepository<Directory_ExternalStation> ef_dir;

        public IDS_Directory_ExternalStationController(IRepository<Directory_ExternalStation> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/external_station/all
        [Route("all")]
        [ResponseType(typeof(Directory_ExternalStation))]
        public IHttpActionResult GetExternalStation()
        {
            try
            {
                List<Directory_ExternalStation> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_ExternalStation()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/external_station/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_ExternalStation))]
        public IHttpActionResult GetExternalStationOfID(int code)
        {
            try
            {
                Directory_ExternalStation ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_ExternalStation()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/external_station/
        [HttpPost]
        [Route("")]
        public int PostExternalStation([FromBody]Directory_ExternalStation value)
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

        // PUT api/ids/directory/external_station/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutExternalStation(int code, [FromBody]Directory_ExternalStation value)
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

        // DELETE api/ids/directory/external_station/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteExternalStation(int code)
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
