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
    /// СПИСОК ПРИЧИН ЗАДЕРЖАНИЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/detention_return")]
    public class IDS_Directory_DetentionReturnController : ApiController
    {
        protected IRepository<Directory_DetentionReturn> ef_dir;

        public IDS_Directory_DetentionReturnController(IRepository<Directory_DetentionReturn> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/detention_return/all
        [Route("all")]
        [ResponseType(typeof(Directory_DetentionReturn))]
        public IHttpActionResult GetDetentionReturn()
        {
            try
            {
                List<Directory_DetentionReturn> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_DetentionReturn()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/detention_return/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_DetentionReturn))]
        public IHttpActionResult GetDetentionReturnOfID(int id)
        {
            try
            {
                Directory_DetentionReturn ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_DetentionReturn()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/detention_return/
        [HttpPost]
        [Route("")]
        public int PostDetentionReturn([FromBody]Directory_DetentionReturn value)
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

        // POST api/ids/directory/detention_return/list
        [HttpPost]
        [Route("list")]
        public int PostListDetentionReturn([FromBody]List<Directory_DetentionReturn> list)
        {
            try
            {
                this.ef_dir.Add(list);
                int res = this.ef_dir.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/detention_return/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutDetentionReturn(int id, [FromBody]Directory_DetentionReturn value)
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


        // PUT api/ids/directory/detention_return/list
        [HttpPut]
        [Route("list")]
        public int PutListDetentionReturn(List<Directory_DetentionReturn> list)
        {
            try
            {
                this.ef_dir.Update(list);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/detention_return/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteDetentionReturn(int id)
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
