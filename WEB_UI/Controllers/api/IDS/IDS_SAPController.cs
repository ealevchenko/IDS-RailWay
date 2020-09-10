using EFIDS.Entities;
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
    [RoutePrefix("api/ids/sap")]
    public class IDS_SAPController : ApiController
    {
        
        // POST api/ids/sap/web/incoming_supply
        /// <summary>
        /// Обновить строку САП входящая поставка
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("web/incoming_supply")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult PostCurrentIncomingSupplyOfWebSAP([FromBody]SAPIncomingSupply value)
        {
            try
            {
                IDS_SAP ids_sap = new IDS_SAP(service.WebAPI_IDS);
                SAPIncomingSupply new_sap_is = ids_sap.GetCurrentIncomingSupplyOfWebSAP(value);
                return Ok(new_sap_is);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST api/ids/sap/web/incoming_supply/list
        /// <summary>
        /// Обновить строки САП входящая поставка
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("web/incoming_supply/list")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult PostCurrentIncomingSupplyOfWebSAP([FromBody]List<SAPIncomingSupply> value)
        {
            try
            {
                IDS_SAP ids_sap = new IDS_SAP(service.WebAPI_IDS);
                List<SAPIncomingSupply> new_list_sap_is = ids_sap.GetCurrentIncomingSupplyOfWebSAP(value);
                return Ok(new_list_sap_is);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }


}
