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
    /// СПИСОК ГРУПП ГРУЗОВ
    /// </summary>
    [RoutePrefix("api/ids/directory/cargo_group")]
    public class IDS_Directory_CargoGroupController : ApiController
    {
        protected IRepository<Directory_CargoGroup> ef_dir;

        public IDS_Directory_CargoGroupController(IRepository<Directory_CargoGroup> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/cargo_group/all
        [Route("all")]
        [ResponseType(typeof(Directory_CargoGroup))]
        public IHttpActionResult GetCargoGroup()
        {
            try
            {
                List<Directory_CargoGroup> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_CargoGroup()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cargo_group/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_CargoGroup))]
        public IHttpActionResult GetCargoGroupOfID(int id)
        {
            try
            {
                Directory_CargoGroup ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_CargoGroup()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/cargo_group/
        [HttpPost]
        [Route("")]
        public int PostCargoGroup([FromBody]Directory_CargoGroup value)
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

        // PUT api/ids/directory/cargo_group/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCargoGroup(int id, [FromBody]Directory_CargoGroup value)
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

        // DELETE api/ids/directory/cargo_group/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCargoGroup(int id)
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
