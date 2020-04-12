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
    /// СПИСОК Платильщиков при получении
    /// </summary>
    [RoutePrefix("api/ids/directory/payer_arrival")]
    public class IDS_Directory_PayerArrivalController : ApiController
    {
        protected IRepository<Directory_PayerArrival> ef_dir;

        public IDS_Directory_PayerArrivalController(IRepository<Directory_PayerArrival> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/payer_arrival/all
        [Route("all")]
        [ResponseType(typeof(Directory_PayerArrival))]
        public IHttpActionResult GetPayerArrival()
        {
            try
            {
                List<Directory_PayerArrival> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_PayerArrival()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/payer_arrival/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_PayerArrival))]
        public IHttpActionResult GetPayerArrivalOfID(int id)
        {
            try
            {
                Directory_PayerArrival ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_PayerArrival()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/payer_arrival/
        [HttpPost]
        [Route("")]
        public int PostPayerArrival([FromBody]Directory_PayerArrival value)
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

        // PUT api/ids/directory/payer_arrival/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutPayerArrival(int id, [FromBody]Directory_PayerArrival value)
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

        // DELETE api/ids/directory/payer_arrival/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeletePayerArrival(int id)
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
