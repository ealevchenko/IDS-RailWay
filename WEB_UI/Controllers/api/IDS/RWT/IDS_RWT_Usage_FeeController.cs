using EFIDS.Abstract;
using EFIDS.Entities;
using EFIDS.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api.IDS.RWT
{

    public class ManualFeeAmount
    {
        public long id_wir { get; set; }
        public decimal? manual_fee_amount { get; set; }
        public int? manual_time { get; set; }
        public string note { get; set; }
        public string user { get; set; }
    }
    public class ViewUsageFeePeriod
    {
        public int id_usage_fee_period { get; set; }
        public int usage_fee_period_id_operator { get; set; }
        public string usage_fee_period_operator_abbr_ru { get; set; }
        public string usage_fee_period_operator_ru { get; set; }
        public string usage_fee_period_operator_abbr_en { get; set; }
        public string usage_fee_period_operator_en { get; set; }
        public bool? usage_fee_period_operators_paid { get; set; }
        public bool? usage_fee_period_operators_rop { get; set; }
        public bool? usage_fee_period_operators_local_use { get; set; }
        public string usage_fee_period_operators_color { get; set; }
        public int usage_fee_period_id_genus { get; set; }
        public string usage_fee_period_genus_ru { get; set; }
        public string usage_fee_period_genus_en { get; set; }
        public string usage_fee_period_genus_abbr_ru { get; set; }
        public string usage_fee_period_genus_abbr_en { get; set; }
        public int? usage_fee_period_rod_uz { get; set; }
        public DateTime usage_fee_period_start { get; set; }
        public DateTime usage_fee_period_stop { get; set; }
        public int? usage_fee_period_id_currency { get; set; }
        public string usage_fee_period_currency_ru { get; set; }
        public string usage_fee_period_currency_en { get; set; }
        public int? usage_fee_period_code { get; set; }
        public string usage_fee_period_code_cc { get; set; }
        public decimal? usage_fee_period_rate { get; set; }
        public int? usage_fee_period_id_currency_derailment { get; set; }
        public string usage_fee_period_derailment_currency_ru { get; set; }
        public string usage_fee_period_derailment_currency_en { get; set; }
        public int? usage_fee_period_derailment_code { get; set; }
        public string usage_fee_period_derailment_code_cc { get; set; }
        public decimal? usage_fee_period_rate_derailment { get; set; }
        public float? usage_fee_period_coefficient_route { get; set; }
        public float? usage_fee_period_coefficient_not_route { get; set; }
        public int? usage_fee_period_grace_time_1 { get; set; }
        public int? usage_fee_period_grace_time_2 { get; set; }
        public string usage_fee_period_note { get; set; }
        public DateTime usage_fee_period_create { get; set; }
        public string usage_fee_period_create_user { get; set; }
        public DateTime? usage_fee_period_change { get; set; }
        public string usage_fee_period_change_user { get; set; }
        public DateTime? usage_fee_period_close { get; set; }
        public string usage_fee_period_close_user { get; set; }
        public int? usage_fee_period_parent_id { get; set; }
        public bool? usage_fee_period_hour_after_30 { get; set; }
    }

    [RoutePrefix("api/ids/rwt/usage_fee")]
    public class IDS_RWT_Usage_FeeController : ApiController
    {
        protected IRepository<Usage_Fee_Period> ef_ids;
        protected IRepository<WagonUsageFee> ef_wuf;

        public IDS_RWT_Usage_FeeController(IRepository<Usage_Fee_Period> ids, IRepository<WagonUsageFee> ef_wuf)
        {
            this.ef_ids = ids;
            this.ef_wuf = ef_wuf;
        }
        // GET: api/ids/rwt/usage_fee/period/all
        [Route("period/all")]
        [ResponseType(typeof(Usage_Fee_Period))]
        public IHttpActionResult GetUsage_Fee_Period()
        {
            try
            {
                List<Usage_Fee_Period> list = this.ef_ids.Context.ToList().Select(c => c.GetUsage_Fee_Period()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/usage_fee/period/id/14
        /// <summary>
        /// Получить период по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("period/id/{id:int}")]
        [ResponseType(typeof(Usage_Fee_Period))]
        public IHttpActionResult GetUsage_Fee_Period(int id)
        {
            try
            {
                Usage_Fee_Period usp = this.ef_ids.Context.Where(u => u.id == id).Select(c => c.GetUsage_Fee_Period()).FirstOrDefault();
                return Ok(usp);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // GET: api/ids/rwt/usage_fee/period/operator/14/genus/3
        /// <summary>
        /// Получить период по оператору и роду
        /// </summary>
        /// <param name="id_operator"></param>
        /// <param name="id_genus"></param>
        /// <returns></returns>
        [Route("period/operator/{id_operator:int}/genus/{id_genus:int}")]
        [ResponseType(typeof(Usage_Fee_Period))]
        public IHttpActionResult GetUsage_Fee_Period(int id_operator, int id_genus)
        {
            try
            {
                List<Usage_Fee_Period> list = this.ef_ids.Context.Where(u => u.id_operator == id_operator && u.id_genus == id_genus).ToList().Select(c => c.GetUsage_Fee_Period()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/usage_fee/period/last/operator/14/genus/3
        /// <summary>
        /// Получить последний период по оператору и роду
        /// </summary>
        /// <param name="id_operator"></param>
        /// <param name="id_genus"></param>
        /// <returns></returns>
        [Route("period/last/operator/{id_operator:int}/genus/{id_genus:int}")]
        [ResponseType(typeof(ViewUsageFeePeriod))]
        public IHttpActionResult GetLastUsage_Fee_Period(int id_operator, int id_genus)
        {
            try
            {
                System.Data.SqlClient.SqlParameter i_id_operator = new System.Data.SqlClient.SqlParameter("@id_operator", id_operator);
                System.Data.SqlClient.SqlParameter i_id_genus = new System.Data.SqlClient.SqlParameter("@id_genus", id_genus);
                string sql = "select * from [IDS].[get_view_usage_fee_period_of_operator_genus](@id_operator, @id_genus) order by usage_fee_period_start";
                List<ViewUsageFeePeriod> list = this.ef_ids.Database.SqlQuery<ViewUsageFeePeriod>(sql, i_id_operator, i_id_genus).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/ids/rwt/usage_fee/period/start/2023-04-01T00:00:00/stop/2023-04-30T23:59:59
        [Route("period/start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ViewUsageFeePeriod))]
        public IHttpActionResult GetUsage_Fee_PeriodOfDateTime(DateTime start, DateTime stop)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_start = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter p_stop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_usage_fee_period_of_period](@start, @stop) order by usage_fee_period_start";
                List<ViewUsageFeePeriod> list = this.ef_ids.Database.SqlQuery<ViewUsageFeePeriod>(sql, p_start, p_stop).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/usage_fee/manual_fee_amount
        [HttpPost]
        [Route("manual_fee_amount")]
        public int PostUpdateManualFeeAmount(ManualFeeAmount value)
        {
            try
            {
                WagonUsageFee wuf = this.ef_wuf.Context.Where(u => u.id_wir == value.id_wir).FirstOrDefault();
                wuf.manual_fee_amount = value.manual_fee_amount;
                wuf.manual_time = value.manual_time;
                wuf.note = value.note;
                wuf.change_user = value.user;
                wuf.change = DateTime.Now;
                this.ef_wuf.Update(wuf);
                int res = this.ef_wuf.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
