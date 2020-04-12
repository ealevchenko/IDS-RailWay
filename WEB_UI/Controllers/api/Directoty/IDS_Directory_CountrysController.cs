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
    /// СПИСОК СТРАН
    /// </summary>
    [RoutePrefix("api/ids/directory/countrys")]
    public class IDS_Directory_CountrysController : ApiController
    {
        protected IRepository<Directory_Countrys> ef_dir;

        public IDS_Directory_CountrysController(IRepository<Directory_Countrys> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/countrys/all
        [Route("all")]
        [ResponseType(typeof(Directory_Countrys))]
        public IHttpActionResult GetCountrys()
        {
            try
            {
                List<Directory_Countrys> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Countrys()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/countrys/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Countrys))]
        public IHttpActionResult GetCountrysOfID(int id)
        {
            try
            {
                Directory_Countrys ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Countrys()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/countrys/code_sng/22
        [Route("code_sng/{code:int}")]
        [ResponseType(typeof(Directory_Countrys))]
        public IHttpActionResult GetCountrysOfCodeSNG(int code)
        {
            try
            {
                Directory_Countrys ens = this.ef_dir
                    .Context
                    .Where(w => w.code_sng == code)
                    .ToList()
                    .Select(m => m.GetDirectory_Countrys()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/countrys/
        [HttpPost]
        [Route("")]
        public int PostCountrys([FromBody]Directory_Countrys value)
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

        // PUT api/ids/directory/countrys/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCountrys(int id, [FromBody]Directory_Countrys value)
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

        // DELETE api/ids/directory/countrys/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCountrys(int id)
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
