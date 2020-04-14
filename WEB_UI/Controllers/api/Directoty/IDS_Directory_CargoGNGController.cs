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
    /// СПИСОК ГРУЗОВ ГНГ
    /// </summary>
    [RoutePrefix("api/ids/directory/cargo_gng")]
    public class IDS_Directory_CargoGNGController : ApiController
    {
        protected IRepository<Directory_CargoGNG> ef_dir;

        public IDS_Directory_CargoGNGController(IRepository<Directory_CargoGNG> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/cargo_gng/all
        [Route("all")]
        [ResponseType(typeof(Directory_CargoGNG))]
        public IHttpActionResult GetCargoGNG()
        {
            try
            {
                List<Directory_CargoGNG> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_CargoGNG()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cargo_gng/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_CargoGNG))]
        public IHttpActionResult GetCargoGNGOfID(int id)
        {
            try
            {
                Directory_CargoGNG ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_CargoGNG()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cargo_gng/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_CargoGNG))]
        public IHttpActionResult GetCargoGNGOfCode(int code)
        {
            try
            {
                List<Directory_CargoGNG> ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_CargoGNG()).ToList();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/cargo_gng/
        [HttpPost]
        [Route("")]
        public int PostCargoGNG([FromBody]Directory_CargoGNG value)
        {
            try
            {
                this.ef_dir.Add(value);
                int res = ef_dir.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/cargo_gng/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutCargoGNG(int code, [FromBody]Directory_CargoGNG value)
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

        // DELETE api/ids/directory/cargo_gng/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteCargoGNG(int code)
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
