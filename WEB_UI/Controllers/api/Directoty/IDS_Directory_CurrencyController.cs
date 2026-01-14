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
    /// СПИСОК ВАЛЮТ
    /// </summary>
    [RoutePrefix("api/ids/directory/currency")]
    public class IDS_Directory_CurrencyController : ApiController
    {
        protected IRepository<Directory_Currency> ef_dir;

        public IDS_Directory_CurrencyController(IRepository<Directory_Currency> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/currency/all
        [Route("all")]
        [ResponseType(typeof(Directory_Currency))]
        public IHttpActionResult GetCurrency()
        {
            try
            {
                List<Directory_Currency> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Currency()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/currency/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Currency))]
        public IHttpActionResult GetCurrencyOfID(int id)
        {
            try
            {
                Directory_Currency ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Currency()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/currency/code/UAH
        [Route("code_sng/{code:int}")]
        [ResponseType(typeof(Directory_Currency))]
        public IHttpActionResult GetCurrencyOfCode(int code)
        {
            try
            {
                Directory_Currency ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_Currency()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/currency/code_cc/UAH
        [Route("code_sng/{code_cc}")]
        [ResponseType(typeof(Directory_Currency))]
        public IHttpActionResult GetCurrencyOfCodeCC(string code_cc)
        {
            try
            {
                Directory_Currency ens = this.ef_dir
                    .Context
                    .Where(w => w.code_cc == code_cc)
                    .ToList()
                    .Select(m => m.GetDirectory_Currency()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/currency/
        [HttpPost]
        [Route("")]
        public int PostCurrency([FromBody]Directory_Currency value)
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

        // PUT api/ids/directory/currency/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCurrency(int id, [FromBody]Directory_Currency value)
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

        // DELETE api/ids/directory/currency/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCurrency(int id)
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
