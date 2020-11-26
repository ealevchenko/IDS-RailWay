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

    public class ViewStatusParkState
    {
        public int id { get; set; }
        public int id_park_state_station { get; set; }
        public int? id_park { get; set; }
        public int id_way { get; set; }
        public int position { get; set; }
        public string park_name_ru { get; set; }
        public string park_name_en { get; set; }
        public string park_abbr_ru { get; set; }
        public string park_abbr_en { get; set; }
        public string way_num_ru { get; set; }
        public string way_num_en { get; set; }
        public string way_name_ru { get; set; }
        public string way_name_en { get; set; }
        public string way_abbr_ru { get; set; }
        public string way_abbr_en { get; set; }
        public int? capacity { get; set; }
        public int? count_wagon { get; set; }
        public string note { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
        public DateTime? delete { get; set; }
        public string delete_user { get; set; }
    }

    public class OperationCreateParkState
    {
        public int id_station  { get; set; }
        public DateTime date_status_on  { get; set; }
        public string user  { get; set; }
    }

    public class OperationDeleteParkState
    {
        public int id_station  { get; set; }
        public string user  { get; set; }
    }


    [RoutePrefix("api/ids/rwt/park_state")]
    public class IDS_RWT_ParkStateController : ApiController
    {
        private EFDbContext db = new EFDbContext();

        
        // GET: api/ids/rwt/park_state/view/station_state/station/6
        /// <summary>
        /// Показать все состояния парков по указаной станции (оптимизированный)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        // GET: api/ids/rwt/park_state/view/status/park_state_way/park_state_station/12
        /// <summary>
        /// Показать все состояния путей по указаному парку (оптимизированный)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("view/status/park_state_way/park_state_station/{id:int}")]
        [ResponseType(typeof(ViewStatusParkState))]
        public IHttpActionResult GetViewStatusParkStateOfParkStateStation(int id)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_status_ways_park_state_of_station](" + id.ToString() + ") order by [position] desc";
                List<ViewStatusParkState> list = this.db.Database.SqlQuery<ViewStatusParkState>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/park_state/station/create/
        /// <summary>
        /// Создать положение парка по указаной станции
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
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

        // POST api/ids/rwt/park_state/station/delete/
        /// <summary>
        /// Удалить положение парка по указаной станции
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("station/delete")]
        [ResponseType(typeof(OperationResultID))]
        public IHttpActionResult PostOperationDeleteParkStateOfStation([FromBody] OperationDeleteParkState value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultID result = ids_rwt.OperationDeleteParkState(value.id_station, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
