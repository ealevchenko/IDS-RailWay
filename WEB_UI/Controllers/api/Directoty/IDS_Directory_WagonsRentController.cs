using EFIDS.Abstract;
using EFIDS.Entities;
using EFIDS.Helper;
using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using WEB_UI.Infrastructure;

namespace WEB_UI.Controllers.api
{
    /// <summary>
    /// СПИСОК СТРАН
    /// </summary>
    [RoutePrefix("api/ids/directory/wagon_rent")]
    public class IDS_Directory_WagonsRentController : ApiController
    {
        protected IRepository<Directory_WagonsRent> ef_dir;

        public IDS_Directory_WagonsRentController(IRepository<Directory_WagonsRent> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/wagon_rent/all
        [Route("all")]
        [ResponseType(typeof(Directory_WagonsRent))]
        public IHttpActionResult GetWagons()
        {
            try
            {
                List<Directory_WagonsRent> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_WagonsRent()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon_rent/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_WagonsRent))]
        public IHttpActionResult GetWagonsOfID(int id)
        {
            try
            {
                Directory_WagonsRent wagon = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_WagonsRent()).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon_rent/num/65201857
        [Route("num/{num:int}")]
        [ResponseType(typeof(Directory_WagonsRent))]
        public IHttpActionResult GetWagonsOfNum(int num)
        {
            try
            {
                List<Directory_WagonsRent> list = this.ef_dir
                    .Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(m => m.GetDirectory_WagonsRent()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // POST api/ids/directory/wagon_rent/
        [HttpPost]
        [Route("")]
        public int PostWagon([FromBody]Directory_WagonsRent value)
        {
            try
            {
                this.ef_dir.Add(value);
                int result = ef_dir.Save();
                return result > 0 ? value.id : result;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/wagon_rent/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutWagon(int num, [FromBody]Directory_WagonsRent value)
        {
            try
            {
                this.ef_dir.Update(value);
                int result = this.ef_dir.Save();
                return result > 0 ? value.id : result;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/wagon_rent/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteWagon(int id)
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
