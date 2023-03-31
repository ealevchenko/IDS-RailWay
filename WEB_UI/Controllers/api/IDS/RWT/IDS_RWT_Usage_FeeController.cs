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
    [RoutePrefix("api/ids/rwt/usage_fee")]
    public class IDS_RWT_Usage_FeeController : ApiController
    {
        protected IRepository<Usage_Fee_Period> ef_ids;

        public IDS_RWT_Usage_FeeController(IRepository<Usage_Fee_Period> ids)
        {
            this.ef_ids = ids;
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
        [ResponseType(typeof(Usage_Fee_Period))]
        public IHttpActionResult GetLastUsage_Fee_Period(int id_operator, int id_genus)
        {
            try
            {
                Usage_Fee_Period usp = this.ef_ids.Context.Where(u => u.id_operator == id_operator && u.id_genus == id_genus).OrderByDescending(c=>c.id).ToList().Select(c => c.GetUsage_Fee_Period()).FirstOrDefault();
                return Ok(usp);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
