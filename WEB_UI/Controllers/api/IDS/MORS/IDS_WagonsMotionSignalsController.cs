using EFIDS.Abstract;
using EFIDS.Entities;
using EFUZ.Entities;
using EFIDS.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api
{

    /// <summary>
    /// СИГНАЛЫ СРБСТВЕННЫЙ ПАРК
    /// </summary>
    [RoutePrefix("api/ids/mors/wms")]
    public class IDS_WagonsMotionSignalsController : ApiController
    {
        protected IRepository<WagonsMotionSignals> ef_mors;

        public IDS_WagonsMotionSignalsController(IRepository<WagonsMotionSignals> mors)
        {
            this.ef_mors = mors;
        }

        #region



        #endregion

        // GET: api/ids/mors/wms/all
        [Route("all")]
        [ResponseType(typeof(WagonsMotionSignals))]
        public IHttpActionResult GetWagonsMotionSignals()
        {
            try
            {
                List<WagonsMotionSignals> list = this.ef_mors.Context.ToList().Select(c=> c.GetWagonsMotionSignals()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/wms/id/50030337
        [Route("id/{id:int}")]
        [ResponseType(typeof(WagonsMotionSignals))]
        public IHttpActionResult GetWagonsMotionSignalsOfID(int id)
        {
            try
            {
                List<WagonsMotionSignals> wagons = this.ef_mors
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(c => c.GetWagonsMotionSignals()).ToList();
                return Ok(wagons);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/wms/num/50030337
        [Route("num/{num:int}")]
        [ResponseType(typeof(WagonsMotionSignals))]
        public IHttpActionResult GetWagonsMotionSignalsOfNum(int num)
        {
            try
            {
                List<WagonsMotionSignals> wagons = this.ef_mors
                    .Context
                    .Where(w => w.nvagon == num)
                    .ToList()
                    .Select(c => c.GetWagonsMotionSignals()).ToList();
                return Ok(wagons);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/mors/wms/park/id/26
        [Route("park/id/{id:int}")]
        [ResponseType(typeof(WagonsMotionSignals))]
        public IHttpActionResult GetWagonsMotionSignalsOfPark(int id)
        {
            try
            {
                string sql = "select * from IDS.get_last_wms("+id.ToString()+")";
                List<WagonsMotionSignals> list= this.ef_mors.Database.SqlQuery<WagonsMotionSignals>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
