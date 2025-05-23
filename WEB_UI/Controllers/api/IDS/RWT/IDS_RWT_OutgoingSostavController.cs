﻿using System;
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
    public class ViewOutgoingSostav
    {
        public long id { get; set; }
        public int num_doc { get; set; }
        public int id_station_from { get; set; }
        public string station_from_name_ru { get; set; }
        public string station_from_name_en { get; set; }
        public string station_from_abbr_ru { get; set; }
        public string station_from_abbr_en { get; set; }
        public int id_way_from { get; set; }
        public string way_from_num_ru { get; set; }
        public string way_from_num_en { get; set; }
        public string way_from_name_ru { get; set; }
        public string way_from_name_en { get; set; }
        public int? id_station_on { get; set; }
        public string station_on_name_ru { get; set; }
        public string station_on_name_en { get; set; }
        public string station_on_abbr_ru { get; set; }
        public string station_on_abbr_en { get; set; }
        public DateTime date_readiness_amkr { get; set; }
        public DateTime? date_end_inspection_acceptance_delivery { get; set; }
        public DateTime? date_end_inspection_loader { get; set; }
        public DateTime? date_end_inspection_vagonnik { get; set; }
        public string vagonnik_user { get; set; }
        public DateTime? date_show_wagons { get; set; }
        public DateTime? date_readiness_uz { get; set; }
        public DateTime? date_outgoing { get; set; }
        public DateTime? date_outgoing_act { get; set; }
        public DateTime? date_departure_amkr { get; set; }
        public string composition_index { get; set; }
        public int status { get; set; }
        public string note { get; set; }
        public bool? route_sign { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
        public int? count_all { get; set; }
        public int? count_outgoing { get; set; }
        public int? count_not_outgoing { get; set; }
        public int? count_return { get; set; }
        public int? count_detention { get; set; }
        public int? count_vagonnik { get; set; }
    }

    /// <summary>
    /// Класс описания данных информация по принятым составам (Отчет ТД - Статистика)
    /// </summary>
    public class ViewReportOutgoingSostav
    {
        public long id { get; set; }
        public int num_doc { get; set; }
        public int id_station_from { get; set; }
        public int id_way_from { get; set; }
        public int? id_station_on { get; set; }
        public DateTime date_readiness_amkr { get; set; }
        public DateTime? date_end_inspection_acceptance_delivery { get; set; }
        public DateTime? date_end_inspection_loader { get; set; }
        public DateTime? date_end_inspection_vagonnik { get; set; }
        public DateTime? date_show_wagons { get; set; }
        public DateTime? date_readiness_uz { get; set; }
        public DateTime? date_outgoing { get; set; }
        public DateTime? date_outgoing_act { get; set; }
        public DateTime? date_departure_amkr { get; set; }
        public string composition_index { get; set; }
        public int status { get; set; }
        public string note { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
        public bool? route_sign { get; set; }
        public string vagonnik_user { get; set; }
        public int? count_wagon { get; set; }
        public int? count_return_wagon { get; set; }
        public int? count_account_balance { get; set; }
    }


    [RoutePrefix("api/ids/rwt/outgoing_sostav")]
    public class IDS_RWT_OutgoingSostavController : ApiController
    {
        protected ILongRepository<OutgoingSostav> ef_ids;

        public IDS_RWT_OutgoingSostavController(ILongRepository<OutgoingSostav> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/outgoing_sostav/all
        [Route("all")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostav()
        {
            try
            {
                List<OutgoingSostav> list = this.ef_ids.Context.ToList().Select(c => c.GetOutgoingSostav_OutgoingCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_sostav/id/4647
        [Route("id/{id:long}")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostav(long id)
        {
            try
            {
               OutgoingSostav sostav = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetOutgoingSostav_OutgoingCars()).FirstOrDefault();
               return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // GET: api/ids/rwt/outgoing_sostav/sostav/id/4647
        [Route("sostav/id/{id:long}")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostavOfID(long id)
        {
            try
            {
               OutgoingSostav sostav = this.ef_ids
                    .Context
                    .Where(s=>s.id == id)
                    .ToList()
                    .Select(c => c.GetOutgoingSostav()).FirstOrDefault();
               return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //// GET: api/ids/rwt/outgoing_sostav/current_num/station/id/6
        //[Route("current_num/station/id/{id:int}")]
        //[ResponseType(typeof(int))]
        //public IHttpActionResult GetCurrentNumOutgoingSostavOfStation(int id)
        //{
        //    try
        //    {
        //       OutgoingSostav sostav = this.ef_ids
        //            .Context
        //            .Where(s=>s.id_station_on == id & s.date_arrival.Year == DateTime.Now.Year)
        //            .ToList()
        //            .OrderByDescending(n=>n.num_doc).FirstOrDefault();
        //        return Ok(sostav!=null ? sostav.num_doc : 0);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        // GET: api/ids/rwt/outgoing_sostav/start/2020-08-27T00:00:00/stop/2020-08-27T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(OutgoingSostav))]
        public IHttpActionResult GetOutgoingSostav(DateTime start, DateTime stop)
        {
            try
            {
                List<OutgoingSostav> list = this.ef_ids
                    .Context
                    .Where(s => s.date_readiness_amkr >= start && s.date_readiness_amkr <= stop)
                    .ToList()
                    .Select(c => c.GetOutgoingSostav_OutgoingCars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_sostav/view/start/2021-01-01T00:00:00/stop/2021-01-20T23:59:59
        [Route("view/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ViewOutgoingSostav))]
        public IHttpActionResult GetViewOutgoingSostavOfPeriod(DateTime start, DateTime stop)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_outgoing_sostav_of_period](@start, @stop) order by date_readiness_amkr";
                List<ViewOutgoingSostav> list = this.ef_ids.Database.SqlQuery<ViewOutgoingSostav>(sql,p_start,p_stop).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_sostav/view/start/2021-03-01T00:00:00/stop/2021-03-20T23:59:59/station/amkr/id/6
        [Route("view/start/{start:datetime}/stop/{stop:datetime}/station/amkr/id/{id:int}")]
        [ResponseType(typeof(ViewOutgoingSostav))]
        public IHttpActionResult GetViewOutgoingSostavOfPeriodStation(DateTime start, DateTime stop, int id)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                System.Data.SqlClient.SqlParameter p_id = new System.Data.SqlClient.SqlParameter("@id_station", id);
                string sql = "select * from [IDS].[get_outgoing_sostav]() where date_readiness_amkr>=@start and date_readiness_amkr<=@stop and id_station_from = @id_station order by date_readiness_amkr";
                List<ViewOutgoingSostav> list = this.ef_ids.Database.SqlQuery<ViewOutgoingSostav>(sql,p_start,p_stop, p_id).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Получить информацию по отправленым(сданным на УЗ) составам (Отчет ТД - Статистика)
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/outgoing_sostav/report/outgoing_sostav/start/2020-03-12T00:00:00/stop/2020-03-20T23:59:59
        [Route("report/outgoing_sostav/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ViewReportOutgoingSostav))]
        public IHttpActionResult GetReportOutgoingSostavOfPeriod(DateTime start, DateTime stop)
        {
            try
            {
                System.Data.SqlClient.SqlParameter d_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter d_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_outgoing_sostav_of_period](@start,@stop)";
                List<ViewReportOutgoingSostav> sostav = this.ef_ids.Database.SqlQuery<ViewReportOutgoingSostav>(sql, d_start, d_stop).ToList();
                return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Получить информацию по принятым составам  (Отчет ТД - Статистика)
        /// </summary>
        /// <param name="docs"></param>
        /// <returns></returns>
        // GET: api/ids/rwt/outgoing_sostav/report/outgoing_sostav/docs/
        [Route("report/outgoing_sostav/docs/{docs}")]
        [ResponseType(typeof(ViewReportOutgoingSostav))]
        public IHttpActionResult GetReportOutgoingSostavOfDocs(String docs)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_outgoing_sostav_of_docs]() where num_doc IN(" + docs + ")";
                List<ViewReportOutgoingSostav> sostav = this.ef_ids.Database.SqlQuery<ViewReportOutgoingSostav>(sql).ToList();
                return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/outgoing_sostav/view/sostav/status/2
        /// <summary>
        /// Выбрать составы сданные на уз
        /// </summary>
        /// <returns></returns>
        [Route("view/sostav/status/{status:int}")]
        [ResponseType(typeof(ViewOutgoingSostav))]
        public IHttpActionResult GetViewOutgoingSostavOfStatus(int status)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_status = new System.Data.SqlClient.SqlParameter("@status", status);
                string sql = "select top(30) * from [IDS].[get_outgoing_sostav_of_status](@status) order by date_outgoing desc";
                List<ViewOutgoingSostav> list = this.ef_ids.Database.SqlQuery<ViewOutgoingSostav>(sql, p_status).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/outgoing_sostav/
        [HttpPost]
        [Route("")]
        public long PostOutgoingSostav([FromBody]OutgoingSostav value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/outgoing_sostav/id
        [HttpPut]
        [Route("id/{id:long}")]
        public long PutOutgoingSostav(long id, [FromBody]OutgoingSostav value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/outgoing_sostav/id
        [HttpDelete]
        [Route("id/{id:long}")]
        public int DeleteOutgoingSostav(long id)
        {
            try
            {
                this.ef_ids.Delete(id);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
