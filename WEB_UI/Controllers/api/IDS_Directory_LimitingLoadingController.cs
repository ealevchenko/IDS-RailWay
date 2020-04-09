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
    /// ОГРАНИЧЕНИЕ ПОГРУЗКИ 
    /// </summary>
    [RoutePrefix("api/ids/directory/limiting_loading")]
    public class IDS_Directory_LimitingLoadingController : ApiController
    {
        protected IRepository<Directory_LimitingLoading> ef_dir;

        public IDS_Directory_LimitingLoadingController(IRepository<Directory_LimitingLoading> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/limiting_loading/all
        [Route("all")]
        [ResponseType(typeof(Directory_LimitingLoading))]
        public IHttpActionResult GetLimitingLoading()
        {
            try
            {
                List<Directory_LimitingLoading> list = this.ef_dir.Context.ToList()
                    .Select(l => l.GetDirectory_LimitingLoading()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/limiting_loading/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_LimitingLoading))]
        public IHttpActionResult GetDirectory_LimitingLoadingOfID(int id)
        {
            try
            {
                Directory_LimitingLoading ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_LimitingLoading()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/limiting_loading/
        [HttpPost]
        [Route("")]
        public int PostDirectory_LimitingLoading([FromBody]Directory_LimitingLoading value)
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

        // PUT api/ids/directory/limiting_loading/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutDirectory_LimitingLoading(int id, [FromBody]Directory_LimitingLoading value)
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

        // DELETE api/ids/directory/limiting_loading/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteDirectory_LimitingLoading(int id)
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
