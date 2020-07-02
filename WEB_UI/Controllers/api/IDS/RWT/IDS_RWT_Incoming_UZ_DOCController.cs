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
    [RoutePrefix("api/ids/rwt/uz_doc")]
    public class IDS_RWT_Incoming_UZ_DOCController : ApiController
    {
        protected IStringRepository<UZ_DOC> ef_ids;

        public IDS_RWT_Incoming_UZ_DOCController(IStringRepository<UZ_DOC> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/uz_doc/all
        [Route("all")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetUZ_DOC()
        {
            try
            {
                List<UZ_DOC> list = this.ef_ids.Context.ToList().Select(c => c.GetUZ_DOC()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/num/32000000000518049746
        [Route("num/{num}")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetUZ_DOC(string num)
        {
            try
            {
                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_doc == num)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                return Ok(uz_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/otpr/num/32000000000518049746
        [Route("otpr/num/{num}")]
        [ResponseType(typeof(UZ.OTPR))]
        public IHttpActionResult GetOTPROfUZ_DOC(string num)
        {
            try
            {
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.OTPR otpr = null;

                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_doc == num)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                if (uz_doc != null)
                {
                    otpr = convert.XMLToOTPR(uz_doc.xml_doc);
                }
                return Ok(otpr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/num_uz/415327
        [Route("num_uz/{num_uz:int}")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetUZ_DOCOfNum_UZ(int num_uz)
        {
            try
            {
                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_uz == num_uz)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                return Ok(uz_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/otpr/num_uz/415327
        [Route("otpr/num_uz/{num_uz:int}")]
        [ResponseType(typeof(UZ.OTPR))]
        public IHttpActionResult GetOTPROfNum_UZ(int num_uz)
        {
            try
            {
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.OTPR otpr = null;

                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_uz == num_uz)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                if (uz_doc != null)
                {
                    otpr = convert.XMLToOTPR(uz_doc.xml_doc);
                }
                return Ok(otpr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/uz_doc/
        [HttpPost]
        [Route("")]
        public int PostUZ_DOC([FromBody]UZ_DOC value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/uz_doc/id
        [HttpPut]
        [Route("num/{num}")]
        public int PutUZ_DOC(string num, [FromBody]UZ_DOC value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/uz_doc/num
        [HttpDelete]
        [Route("num/{num}")]
        public int DeleteUZ_DOC(string num)
        {
            try
            {
                this.ef_ids.Delete(num);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
