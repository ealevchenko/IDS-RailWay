using EFMT.Abstract;
using EFMT.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFMT.Helper;

namespace WEB_UI.Controllers.api
{
    [RoutePrefix("api/metrans/consignee")]
    public class Metrans_ConsigneeController : ApiController
    {
        protected IRepository<Consignee> ef_metrans;

        public Metrans_ConsigneeController(IRepository<Consignee> metrans)
        {
            this.ef_metrans = metrans;
        }


        // GET: api/metrans/consignee/all
        [Route("all")]
        [ResponseType(typeof(Consignee))]
        public IHttpActionResult GetConsignee()
        {
            try
            {
                List<Consignee> list = this.ef_metrans.Context.ToList().Select(c => c.GetConsignee()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/metrans/consignee/code/7932
        [Route("code/{code:int}")]
        [ResponseType(typeof(Consignee))]
        public IHttpActionResult GetConsignee(int code)
        {
            try
            {
                List<Consignee> list = this.ef_metrans
                    .Context
                    .Where(c=>c.code == code)
                    .ToList()
                    .Select(c => c.GetConsignee()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
