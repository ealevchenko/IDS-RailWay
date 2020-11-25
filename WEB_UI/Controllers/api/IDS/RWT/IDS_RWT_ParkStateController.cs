using EFIDS.Concrete;
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

namespace WEB_UI.Controllers.api.IDS.RWT
{

    public class OperationCreateParkState
    {
        public int id_station  { get; set; }
        public DateTime date_status_on  { get; set; }
        public string user  { get; set; }
    }

    [RoutePrefix("api/ids/rwt/park_state")]
    public class IDS_RWT_ParkStateController : ApiController
    {
        private EFDbContext db = new EFDbContext();


        // GET: api/ids/rwt/park_state/view/station_state/station/6
        [Route("view/station_state/station/{id:int}")]
        [ResponseType(typeof(ParkState_Station))]
        public IHttpActionResult GetViewParkStateOfStation(int id)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_park_state_of_station](" + id.ToString() + ") order by [state_on] desc";
                List<ParkState_Station> list = this.db.Database.SqlQuery<ParkState_Station>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/park_state/station/create/
        [HttpPost]
        [Route("station/create")]
        [ResponseType(typeof(OperationResultID))]
        public IHttpActionResult PostOperationCreateParkStateOfStation([FromBody] OperationCreateParkState value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultID result = ids_rwt.OperationCreateParkState(value.id_station, value.date_status_on, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
