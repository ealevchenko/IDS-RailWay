using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api.RWT
{
    [RoutePrefix("api/ids/transfer")]
    public class IDS_TransferController : ApiController
    {
        // GET: api/ids/transfer/epd/intermediate_db/num/56942493
        [Route("epd/intermediate_db/num/{num:int}")]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetNumDocOfEPD_IntermediateDB(int num)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);

                string num_doc = ids_tr.GetNumDoc(num);
                return Ok(num_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
