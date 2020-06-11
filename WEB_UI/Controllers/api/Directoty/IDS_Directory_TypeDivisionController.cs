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
    /// СПИСОК ТИПОВ ПОДРАЗДЕЛЕНИЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/type_division")]
    public class IDS_Directory_TypeDivisionController : ApiController
    {
        protected IRepository<Directory_TypeDivision> ef_dir;

        public IDS_Directory_TypeDivisionController(IRepository<Directory_TypeDivision> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/type_division/all
        [Route("all")]
        [ResponseType(typeof(Directory_TypeDivision))]
        public IHttpActionResult GetTypeDivision()
        {
            try
            {
                List<Directory_TypeDivision> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_TypeDivision_Directory_Divisions()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/type_division/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_TypeDivision))]
        public IHttpActionResult GetTypeDivisionOfID(int id)
        {
            try
            {
                Directory_TypeDivision ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_TypeDivision_Directory_Divisions()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/type_division/
        [HttpPost]
        [Route("")]
        public int PostTypeDivision([FromBody]Directory_TypeDivision value)
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

        // PUT api/ids/directory/type_division/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutTypeDivision(int id, [FromBody]Directory_TypeDivision value)
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

        // DELETE api/ids/directory/type_division/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteTypeDivision(int id)
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
