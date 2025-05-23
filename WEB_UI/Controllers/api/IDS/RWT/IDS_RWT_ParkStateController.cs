﻿using EFIDS.Concrete;
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
using EFIDS.Helper;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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

    //public class view_park_state_dislocation_wagon
    //{
    //    public int id { get; set; }
    //    public int pss_id_station { get; set; }
    //    public string pss_station_name_ru { get; set; }
    //    public string pss_station_name_en { get; set; }
    //    public string pss_station_abbr_ru { get; set; }
    //    public string pss_station_abbr_en { get; set; }
    //    public DateTime state_on { get; set; }
    //    public string pss_note { get; set; }
    //    public DateTime pss_create { get; set; }
    //    public string pss_create_user { get; set; }
    //    public DateTime? pss_change { get; set; }
    //    public string pss_change_user { get; set; }
    //    public DateTime? pss_delete { get; set; }
    //    public string pss_delete_user { get; set; }
    //    public DateTime? pss_applied { get; set; }
    //    public string pss_applied_user { get; set; }
    //    public int ps_way_id { get; set; }
    //    public int ps_way_id_way { get; set; }
    //    public string ps_way_way_num_ru { get; set; }
    //    public string ps_way_way_num_en { get; set; }
    //    public string ps_way_way_name_ru { get; set; }
    //    public string ps_way_way_name_en { get; set; }
    //    public string ps_way_way_abbr_ru { get; set; }
    //    public string ps_way_way_abbr_en { get; set; }
    //    public int ps_way_position { get; set; }
    //    public int ps_wag_id { get; set; }
    //    public int num { get; set; }
    //    public int ps_wag_position { get; set; }
    //    public DateTime ps_wag_create { get; set; }
    //    public string ps_wag_create_user { get; set; }
    //    public DateTime? ps_wag_change { get; set; }
    //    public string ps_wag_change_user { get; set; }
    //    public long? wir_id { get; set; }
    //    public long? id_arrival_car { get; set; }
    //    public long? id_sap_incoming_supply { get; set; }
    //    public bool? doc_outgoing_car { get; set; }
    //    public long? id_outgoing_car { get; set; }
    //    public long? id_sap_outbound_supply { get; set; }
    //    public string wir_note { get; set; }
    //    public DateTime? wir_create { get; set; }
    //    public string wir_create_user { get; set; }
    //    public DateTime? wir_close { get; set; }
    //    public string wir_close_user { get; set; }
    //    public long? wir_parent_id { get; set; }
    //    public long? wim_id { get; set; }
    //    public long? id_wagon_internal_routes { get; set; }
    //    public int? id_station { get; set; }
    //    public string station_name_ru { get; set; }
    //    public string station_name_en { get; set; }
    //    public string station_abbr_ru { get; set; }
    //    public string station_abbr_en { get; set; }
    //    public int? id_way { get; set; }
    //    public string way_num_ru { get; set; }
    //    public string way_num_en { get; set; }
    //    public string way_name_ru { get; set; }
    //    public string way_name_en { get; set; }
    //    public string way_abbr_ru { get; set; }
    //    public string way_abbr_en { get; set; }
    //    public DateTime? way_start { get; set; }
    //    public DateTime? way_end { get; set; }
    //    public int? id_outer_way { get; set; }
    //    public string name_outer_way_ru { get; set; }
    //    public string name_outer_way_en { get; set; }
    //    public DateTime? outer_way_start { get; set; }
    //    public DateTime? outer_way_end { get; set; }
    //    public int? position { get; set; }
    //    public string wim_note { get; set; }
    //    public DateTime? wim_create { get; set; }
    //    public string wim_create_user { get; set; }
    //    public DateTime? wim_close { get; set; }
    //    public string wim_close_user { get; set; }
    //    public long? wim_parent_id { get; set; }
    //}

    public class view_park_state_dislocation_wagon
    {
        [Key]
        public int id { get; set; }
        public int pss_id_station { get; set; }
        public string pss_station_name_ru { get; set; }
        public string pss_station_name_en { get; set; }
        public string pss_station_abbr_ru { get; set; }
        public string pss_station_abbr_en { get; set; }
        public DateTime state_on { get; set; }
        public string pss_note { get; set; }
        public DateTime pss_create { get; set; }
        public string pss_create_user { get; set; }
        public DateTime? pss_change { get; set; }
        public string pss_change_user { get; set; }

        public DateTime? pss_delete { get; set; }

        public string pss_delete_user { get; set; }

        public DateTime? pss_applied { get; set; }

        public string pss_applied_user { get; set; }
        public int ps_way_id { get; set; }
        public int ps_way_id_way { get; set; }
        public string ps_way_way_num_ru { get; set; }
        public string ps_way_way_num_en { get; set; }
        public string ps_way_way_name_ru { get; set; }
        public string ps_way_way_name_en { get; set; }
        public string ps_way_way_abbr_ru { get; set; }
        public string ps_way_way_abbr_en { get; set; }
        public int ps_way_position { get; set; }
        public int ps_wag_id { get; set; }
        public int num { get; set; }
        public int ps_wag_position { get; set; }
        public DateTime ps_wag_create { get; set; }
        public string ps_wag_create_user { get; set; }
        public DateTime? ps_wag_change { get; set; }
        public string ps_wag_change_user { get; set; }
        public long? wir_id { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }

        public bool? doc_outgoing_car { get; set; }

        public long? id_outgoing_car { get; set; }

        public long? id_sap_outbound_supply { get; set; }
        public string wir_note { get; set; }

        public DateTime? wir_create { get; set; }

        public string wir_create_user { get; set; }

        public DateTime? wir_close { get; set; }
        public string wir_close_user { get; set; }

        public long? wir_parent_id { get; set; }

        public long? wim_id { get; set; }

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
        public string wim_note { get; set; }

        public DateTime? wim_create { get; set; }
        public string wim_create_user { get; set; }

        public DateTime? wim_close { get; set; }
        public string wim_close_user { get; set; }

        public long? wim_parent_id { get; set; }

        public int? id_operation { get; set; }

        public DateTime? operation_start { get; set; }

        public DateTime? operation_end { get; set; }

        public int? status { get; set; }
        public int current_wagon_busy { get; set; }
        public int current_move_busy { get; set; }
    }

    public class OperationCreateParkState
    {
        public int id_station  { get; set; }
        public DateTime date_status_on  { get; set; }
        public string user  { get; set; }
    }

    public class OperationTransferWagonsParkStateOfStation
    {
        public int id_station  { get; set; }
        public DateTime date_status_on  { get; set; }
        public string user  { get; set; }
    }

    public class OperationDeleteParkState
    {
        public int id_park_status { get; set; }
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

    public class OperationApplyWagonsParkState
    {
        public int id_station { get; set; }
        public List<ParkStatePosition> wagons { get; set; } 
        public DateTime lead_time { get; set; } 
        public string user  { get; set; }
    }

    [RoutePrefix("api/ids/rwt/park_state")]
    public class IDS_RWT_ParkStateController : ApiController
    {
        private EFDbContext db = new EFDbContext();

        // GET: api/ids/rwt/park_state/park_state_station/id/21
        /// <summary>
        /// Получить состояние парка по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("park_state_station/id/{id:int}")]
        [ResponseType(typeof(ParkState_Station))]
        public IHttpActionResult GetParkState_Station(int id)
        {
            try
            {
                ParkState_Station pss = db.ParkState_Station.Where(p => p.id == id).ToList().Select(c => c.GetParkState_Station()).FirstOrDefault();
                return Ok(pss);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/ids/rwt/park_state/park_state_station/
        [HttpPut]
        [Route("park_state_station")]
        public int PutParkState_Station([FromBody]ParkState_Station value)
        {
            try
            {
                EFParkState_Station ef_pss = new EFParkState_Station(db);
                ef_pss.Update(value);
                int res = ef_pss.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        #region ВЫБОРКА VIEW

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
                string sql = "select * from [IDS].[get_view_status_ways_park_state_of_station](" + id.ToString() + ") order by id_park, position";
                List<ViewStatusParkState> list = this.db.Database.SqlQuery<ViewStatusParkState>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region ВЫПОЛНЕНИЕ ОПЕРАЦИЙ

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

        // POST api/ids/rwt/park_state/station/transfer/wagons/
        /// <summary>
        /// Создать перенести существующее положение парка по указаной станции
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("station/transfer/wagons")]
        [ResponseType(typeof(OperationResultID))]
        public IHttpActionResult PostOperationTransferWagonsParkStateOfStation([FromBody] OperationTransferWagonsParkStateOfStation value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultID result = ids_rwt.OperationTransferWagonsParkState(value.id_station, value.date_status_on, value.user);
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
                OperationResultID result = ids_rwt.OperationDeleteParkState(value.id_park_status, value.user);
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
        [ResponseType(typeof(OperationResultWagon))]
        public IHttpActionResult PostOperationDeleteWagonsParkStateOfWay([FromBody] OperationDeleteWagonsParkState value)
        {
            try
            {
                IDS_RWT ids_rwt = new IDS_RWT(service.WebAPI_IDS);
                OperationResultWagon result = ids_rwt.DeleteWagonsOfWay(value.id_park_state_way, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/park_state/way/wagon/apply/
        /// <summary>
        /// Выполнить расстановку вагонов
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("way/wagon/apply/")]
        [ResponseType(typeof(ResultTransfer))]
        public IHttpActionResult PostOperationApplyWagonsParkState([FromBody] OperationApplyWagonsParkState value)
        {
            try
            {
                IDS_WIR ids_wir = new IDS_WIR(service.WebAPI_IDS);
                ResultTransfer result = ids_wir.OperationApplyWagonsParkState(value.id_station, value.wagons, value.lead_time, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion

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

        // GET: api/ids/rwt/park_state/view/dislocation/amkr/park_state/date/2020-12-03T14:52:00.000
        /// <summary>
        /// Поиск текущего положения вагона на территории АМКР
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        [Route("view/dislocation/amkr/park_state/date/{date:datetime}")]
        [ResponseType(typeof(view_park_state_dislocation_wagon))]
        public IHttpActionResult GetViewDislocationAMKRWagonOfDate(DateTime date)
        {
            try
            {
                string sql = "select * from [IDS].[get_dislocation_wagon_of_date](Convert(datetime,'" + date.ToString("yyyy-MM-dd HH:mm:ss") + "',120))";
                List<view_park_state_dislocation_wagon> position = db.Database.SqlQuery<view_park_state_dislocation_wagon>(sql).ToList();
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
