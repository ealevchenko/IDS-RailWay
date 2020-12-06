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

    public class view_park_state_wagon_dislocation
    {
        public int id_park_state_way { get; set; }
        public int id_way_park_state { get; set; }
        public string way_park_state_num_ru { get; set; }
        public string way_park_state_num_en { get; set; }
        public string way_park_statename_ru_ { get; set; }
        public string way_park_state_name_en { get; set; }
        public string way_park_state_abbr_ru { get; set; }
        public string way_park_state_abbr_en { get; set; }
        public int position_way { get; set; }
        public int id_park_state_wagon { get; set; }
        public int num { get; set; }
        public int position_wagon { get; set; }
        public DateTime create_wagon { get; set; }
        public string create_user_wagon { get; set; }
        public DateTime? change_wagon { get; set; }
        public string change_user_wagon { get; set; }
        public long? id_wir { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string note_wir { get; set; }
        public DateTime? create_wir { get; set; }
        public string create_user_wir { get; set; }
        public DateTime? close_wir { get; set; }
        public string close_user_wir { get; set; }
        public long? parent_id_wir { get; set; }
        public long? id_wim { get; set; }
        public long? id_wagon_internal_routes { get; set; }
        public int? id_station { get; set; }
        public string station_name_ru { get; set; }
        public string station_name_en { get; set; }
        public string station_abbr_ru { get; set; }
        public string station_abbr_en { get; set; }
        public int? id_way { get; set; }
        public string way_num_ru { get; set; }
        public string way_num_en { get; set; }
        public string way_name_ru { get; set; }
        public string way_name_en { get; set; }
        public string way_abbr_ru { get; set; }
        public string way_abbr_en { get; set; }
        public DateTime? way_start { get; set; }
        public DateTime? way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public int? position { get; set; }
        public string note_wim { get; set; }
        public DateTime? create_wim { get; set; }
        public string create_user_wim { get; set; }
        public DateTime? close_wim { get; set; }
        public string close_user_wim { get; set; }
        public long? parent_id_wim { get; set; }
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

    public class OperationUpdWagonsParkState
    {
        public int id_park_state_way { get; set; }
        public List<int> wagons { get; set; }
        public int type_operation { get; set; }
        public string user  { get; set; }
    }

    public class OperationDeleteWagonsParkState
    {
        public int id_park_state_way { get; set; }
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

        // GET: api/ids/rwt/park_state/view/wagon_state/way/6
        /// <summary>
        /// Показать все вагоны по указаному пути (оптимизированный)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("view/wagon_state/way/{id:int}")]
        [ResponseType(typeof(ParkState_Wagon))]
        public IHttpActionResult GetViewWagonParkStateOfWay(int id)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_wagon_park_state_of_way](" + id.ToString() + ") order by [position] desc";
                List<ParkState_Wagon> list = this.db.Database.SqlQuery<ParkState_Wagon>(sql).ToList();
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

        // POST api/ids/rwt/park_state/way/wagon/update/
        /// <summary>
        /// Обновить вагоны положения парка по указаному пути
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("way/wagon/update/")]
        [ResponseType(typeof(OperationResultWagon))]
        public IHttpActionResult PostOperationUpdateWagonsParkStateOfWay([FromBody] OperationUpdWagonsParkState value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultWagon result = ids_rwt.OperationUpdateWagonsParkState(value.id_park_state_way, value.wagons, value.type_operation, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/park_state/way/wagon/delete/
        /// <summary>
        /// Удалить положение парка по указаной станции
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("way/wagon/delete/")]
        [ResponseType(typeof(OperationResultID))]
        public IHttpActionResult PostOperationDeleteWagonsParkStateOfWay([FromBody] OperationDeleteWagonsParkState value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultID result = ids_rwt.DeleteWagonsOfWay(value.id_park_state_way, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        #region ПОИСК ВАГОНОВ
        // GET: api/ids/rwt/park_state/view/dislocation/amkr/park_state/id/2
        /// <summary>
        /// Поиск текущего положения вагона на территории АМКР
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        [Route("view/dislocation/amkr/park_state/id/{id:int}")]
        [ResponseType(typeof(view_park_state_wagon_dislocation))]
        public IHttpActionResult GetViewDislocationAMKRWagonOfIDParkState(int id)
        {
            try
            {
                string sql = "select * from [IDS].[get_dislocation_wagon_of_park_station](" + id + ")";
                List<view_park_state_wagon_dislocation> position = db.Database.SqlQuery<view_park_state_wagon_dislocation>(sql).ToList();
                return Ok(position);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion


    }
}
