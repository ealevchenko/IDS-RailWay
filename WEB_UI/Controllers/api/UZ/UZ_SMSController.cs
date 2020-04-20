using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using UZ;

namespace WEB_UI.Controllers.api
{
    //[Serialized]
    [RoutePrefix("api/uz/sms")]
    public class UZ_SMSController : ApiController
    {
        public int r = 0;
        

        // GET: api/uz/sms/uz_doc/num_doc/41425570
        [Route("uz_doc/num_doc/{num_doc}")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetInfoWagonOfNum(string num_doc)
        {
            try
            {
                UZ_SMS sms = new UZ_SMS(service.WebAPI_UZ);
                sms.Connection();
                List<UZ_DOC> list = sms.GetUZ_DOC_Of_NumDoc(num_doc);
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
