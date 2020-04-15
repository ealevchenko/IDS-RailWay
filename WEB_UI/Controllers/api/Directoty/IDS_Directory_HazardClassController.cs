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
    /// СПИСОК КЛАССОВ ОПАСНОСТЕЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/hazard_class")]
    public class IDS_Directory_HazardClassController : ApiController
    {
        protected IStringRepository<Directory_HazardClass> ef_dir;

        public IDS_Directory_HazardClassController(IStringRepository<Directory_HazardClass> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/hazard_class/all
        [Route("all")]
        [ResponseType(typeof(Directory_HazardClass))]
        public IHttpActionResult GetHazardClass()
        {
            try
            {
                List<Directory_HazardClass> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_HazardClass()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/hazard_class/code/
        [Route("code/{code}")]
        [ResponseType(typeof(Directory_HazardClass))]
        public IHttpActionResult GetHazardClassOfID(string code)
        {
            try
            {
                Directory_HazardClass ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_HazardClass()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/hazard_class/
        [HttpPost]
        [Route("")]
        public int PostHazardClass([FromBody]Directory_HazardClass value)
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

        // PUT api/ids/directory/hazard_class/code
        [HttpPut]
        [Route("code/{code}")]
        public int PutHazardClass(string code, [FromBody]Directory_HazardClass value)
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

        // DELETE api/ids/directory/hazard_class/code
        [HttpDelete]
        [Route("code/{code}")]
        public int DeleteHazardClass(string code)
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
