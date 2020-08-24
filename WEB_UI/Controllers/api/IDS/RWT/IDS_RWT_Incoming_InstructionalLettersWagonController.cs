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
    [RoutePrefix("api/ids/rwt/instructional_letters_wagon")]
    public class IDS_RWT_Incoming_InstructionalLettersWagonController : ApiController
    {
        protected IRepository<InstructionalLettersWagon> ef_ids;

        public IDS_RWT_Incoming_InstructionalLettersWagonController(IRepository<InstructionalLettersWagon> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/instructional_letters_wagon/all
        [Route("all")]
        [ResponseType(typeof(InstructionalLettersWagon))]
        public IHttpActionResult GetInstructionalLettersWagon()
        {
            try
            {
                List<InstructionalLettersWagon> list = this.ef_ids.Context.ToList().Select(c => c.GetInstructionalLettersWagon()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/instructional_letters_wagon/id/78943
        [Route("id/{id:int}")]
        [ResponseType(typeof(InstructionalLettersWagon))]
        public IHttpActionResult GetInstructionalLettersWagonOfID(int id)
        {
            try
            {
                InstructionalLettersWagon list = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetInstructionalLettersWagon()).FirstOrDefault();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/instructional_letters_wagon/letter/id/78943
        [Route("letter/id/{id:int}")]
        [ResponseType(typeof(InstructionalLettersWagon))]
        public IHttpActionResult GetInstructionalLettersWagonOfIDLetter(int id)
        {
            try
            {
                List<InstructionalLettersWagon> list = this.ef_ids
                    .Context
                    .Where(s => s.id_instructional_letters == id)
                    .ToList()
                    .Select(c => c.GetInstructionalLettersWagon()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/ids/rwt/instructional_letters_wagon/open/list_nums/
        [HttpPost]
        [Route("open/list_nums/")]
        [ResponseType(typeof(InstructionalLettersWagon))]
        public IHttpActionResult PostOpenInstructionalLettersWagonOfNums([FromBody] List<int> nums)
        {
            try
            {
                List<InstructionalLettersWagon> wagons = new List<InstructionalLettersWagon>();

                foreach (int num in nums)
                {
                    InstructionalLettersWagon ilw = this.ef_ids
                        .Context
                        .Where(r => r.num == num & r.close == null)
                        .ToList()
                        .Select(m => m.GetInstructionalLettersWagon()).FirstOrDefault();

                    if (ilw != null)
                    {
                        wagons.Add(ilw);
                    }
                }
                return Ok(wagons);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/instructional_letters_wagon/
        [HttpPost]
        [Route("")]
        public int PostInstructionalLettersWagon([FromBody]InstructionalLettersWagon value)
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

        // POST api/ids/rwt/instructional_letters_wagon/list
        [HttpPost]
        [Route("list")]
        public int PostListInstructionalLettersWagon([FromBody]List<InstructionalLettersWagon> list)
        {
            try
            {
                this.ef_ids.Add(list);
                int res = this.ef_ids.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
        
        // PUT api/ids/rwt/instructional_letters_wagon/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutInstructionalLettersWagon(int id, [FromBody]InstructionalLettersWagon value)
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

        // PUT api/ids/rwt/instructional_letters_wagon/list
        [HttpPut]
        [Route("list")]
        public int PutListInstructionalLettersWagon(List<InstructionalLettersWagon> list)
        {
            try
            {
                this.ef_ids.Update(list);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/instructional_letters_wagon/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteInstructionalLettersWagon(int id)
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
