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
    [RoutePrefix("api/ids/directory/cargo")]
    public class IDS_Directory_CargoController : ApiController
    {
        protected IRepository<Directory_Cargo> ef_dir;

        public IDS_Directory_CargoController(IRepository<Directory_Cargo> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/cargo/all
        [Route("all")]
        [ResponseType(typeof(Directory_Cargo))]
        public IHttpActionResult GetCargo()
        {
            try
            {
                List<Directory_Cargo> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Cargo()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cargo/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Cargo))]
        public IHttpActionResult GetCargoOfID(int id)
        {
            try
            {
                Directory_Cargo ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Cargo()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/cargo/
        [HttpPost]
        [Route("")]
        public int PostCargo([FromBody]Directory_Cargo value)
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

        // PUT api/ids/directory/cargo/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCargo(int id, [FromBody]Directory_Cargo value)
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

        // DELETE api/ids/directory/cargo/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCargo(int id)
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
