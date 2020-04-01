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
    /// СПИСОК ГРУЗОПОЛУЧАТЕЛЕЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/consignee")]
    public class IDS_Directory_ConsigneeController : ApiController
    {
        protected IRepository<Directory_Consignee> ef_dir;

        public IDS_Directory_ConsigneeController(IRepository<Directory_Consignee> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/consignee/all
        [Route("all")]
        [ResponseType(typeof(Directory_Consignee))]
        public IHttpActionResult GetConsignee()
        {
            try
            {
                List<Directory_Consignee> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Consignee()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/consignee/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_Consignee))]
        public IHttpActionResult GetConsigneeOfCode(int code)
        {
            try
            {
                Directory_Consignee ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_Consignee()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/consignee/
        [HttpPost]
        [Route("")]
        public int PostConsignee([FromBody]Directory_Consignee value)
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

        // PUT api/ids/directory/consignee/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutConsignee(int code, [FromBody]Directory_Consignee value)
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

        // DELETE api/ids/directory/consignee/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteConsignee(int code)
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
