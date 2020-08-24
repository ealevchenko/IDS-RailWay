using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFIDS.Helper;
using EFIDS.Abstract;
using EFIDS.Entities;

namespace WEB_UI.Controllers.api
{
    /// <summary>
    /// ЭПД - по прибытию
    /// </summary>
    [RoutePrefix("api/ids/rwt/instructional_letters")]
    public class IDS_RWT_Incoming_InstructionalLettersController : ApiController
    {
        protected IRepository<InstructionalLetters> ef_ids;

        public IDS_RWT_Incoming_InstructionalLettersController(IRepository<InstructionalLetters> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/instructional_letters/all
        [Route("all")]
        [ResponseType(typeof(InstructionalLetters))]
        public IHttpActionResult GetInstructionalLetters()
        {
            try
            {
                List<InstructionalLetters> list = this.ef_ids.Context.ToList().Select(c => c.GetInstructionalLetters()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/instructional_letters/num/1/date/2020-08-24T00:00:00
        [Route("num/{num}/date/{date:datetime}")]
        [ResponseType(typeof(InstructionalLetters))]
        public IHttpActionResult GetInstructionalLettersOfNumDate(string num, DateTime date)
        {
            try
            {
                InstructionalLetters list = this.ef_ids
                    .Context
                    .Where(s => s.num == num & s.dt == date)
                    .ToList()
                    .OrderByDescending(s => s.id)
                    .Select(c => c.GetInstructionalLetters()).FirstOrDefault();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/instructional_letters/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(InstructionalLetters))]
        public IHttpActionResult GetInstructionalLetters(int id)
        {
            try
            {
                InstructionalLetters list = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetInstructionalLetters()).FirstOrDefault();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST api/ids/rwt/instructional_letters/
        [HttpPost]
        [Route("")]
        public int PostInstructionalLetters([FromBody]InstructionalLetters value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/instructional_letters/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutInstructionalLetters(int id, [FromBody]InstructionalLetters value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/instructional_letters/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteInstructionalLetters(int id)
        {
            try
            {
                this.ef_ids.Delete(id);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
