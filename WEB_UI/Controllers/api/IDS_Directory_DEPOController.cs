using EFIDS.Abstract;
using EFIDS.Entities;
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
    /// РОД ВАГОНА
    /// </summary>
    [RoutePrefix("api/ids/directory/depo")]
    public class IDS_Directory_DEPOController : ApiController
    {
        protected IRepository<Directory_DEPO> ef_dp;

        public IDS_Directory_DEPOController(IRepository<Directory_DEPO> dp)
        {
            this.ef_dp = dp;
        }

        // GET: api/ids/directory/depo/all
        [Route("all")]
        [ResponseType(typeof(Directory_DEPO))]
        public IHttpActionResult GetDEPO()
        {
            try
            {
                List<Directory_DEPO> list = this.ef_dp.Context.ToList()
                    .Select(d => new Directory_DEPO
                    {
                        code = d.code,
                        code_station = d.code_station,
                        depo_ru = d.depo_ru,
                        depo_en = d.depo_en,
                    }).ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
