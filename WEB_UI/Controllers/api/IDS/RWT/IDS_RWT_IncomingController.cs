using EFIDS.Concrete;
using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api.IDS.RWT
{

    public class OperationUpdateWagonMarking
    {
        public int id_arrival_cars { get; set; }
        public int id_condition { get; set; }
        public int? id_type { get; set; }
        public DateTime? date_rem_vag { get; set; }
        public string user { get; set; }
    }


    [RoutePrefix("api/ids/rwt/incoming")]
    public class IDS_RWT_IncomingController : ApiController
    {
        private EFDbContext db = new EFDbContext();

        #region ПРАВКА РАЗМЕТКИ ВАГОНОВ

        // POST api/ids/rwt/incoming/operation/update/wagon_marking
        [HttpPost]
        [Route("operation/update/wagon_marking")]
        [ResponseType(typeof(OperationResultWagon))]
        public IHttpActionResult PostArrivalWagonsOfStation([FromBody] OperationUpdateWagonMarking value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultWagon result = ids_rwt.OperationUpdateWagonMarking(value.id_arrival_cars, value.id_condition, value.id_type, value.date_rem_vag, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion
    }
}
