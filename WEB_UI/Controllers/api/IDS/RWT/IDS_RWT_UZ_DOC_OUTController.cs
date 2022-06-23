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

    [RoutePrefix("api/ids/rwt/uz_doc_out")]
    public class IDS_RWT_UZ_DOC_OUTController : ApiController
    {
        protected IStringRepository<UZ_DOC_OUT> ef_ids;

        public IDS_RWT_UZ_DOC_OUTController(IStringRepository<UZ_DOC_OUT> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/uz_doc_out/otpr/num/32000000000518049746
        [Route("otpr/num/{num}")]
        [ResponseType(typeof(UZ.OTPR))]
        public IHttpActionResult GetOTPROfUZ_DOC_OUT(string num)
        {
            try
            {
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.OTPR otpr = null;

                UZ_DOC_OUT uz_doc_out = this.ef_ids
                    .Context
                    .Where(s => s.num_doc == num)
                    .ToList()
                    .Select(c => c.GetUZ_DOC_OUT()).FirstOrDefault();
                if (uz_doc_out != null)
                {
                    otpr = convert.XMLToOTPR(uz_doc_out.xml_doc);
                }
                return Ok(otpr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
