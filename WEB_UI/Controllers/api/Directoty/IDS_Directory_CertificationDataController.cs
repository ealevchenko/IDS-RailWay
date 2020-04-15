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
    /// СПИСОК СЕРТИФИКАЦИОННЫХ ДАННЫХ
    /// </summary>
    [RoutePrefix("api/ids/directory/certification_data")]
    public class IDS_Directory_CertificationDataController : ApiController
    {
        protected IRepository<Directory_CertificationData> ef_dir;

        public IDS_Directory_CertificationDataController(IRepository<Directory_CertificationData> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/certification_data/all
        [Route("all")]
        [ResponseType(typeof(Directory_CertificationData))]
        public IHttpActionResult GetCertificationData()
        {
            try
            {
                List<Directory_CertificationData> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_CertificationData()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/certification_data/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_CertificationData))]
        public IHttpActionResult GetCertificationDataOfID(int id)
        {
            try
            {
                Directory_CertificationData ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_CertificationData()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/certification_data/
        [HttpPost]
        [Route("")]
        public int PostCertificationData([FromBody]Directory_CertificationData value)
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

        // PUT api/ids/directory/certification_data/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCertificationData(int id, [FromBody]Directory_CertificationData value)
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

        // DELETE api/ids/directory/certification_data/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCertificationData(int id)
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
