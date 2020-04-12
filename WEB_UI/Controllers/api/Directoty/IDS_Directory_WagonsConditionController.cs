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
    /// Список неисправностей(сотояния)
    /// </summary>
    [RoutePrefix("api/ids/directory/wagons_condition")]
    public class IDS_Directory_WagonsConditionController : ApiController
    {
        protected IRepository<Directory_WagonsCondition> ef_cw;

        public IDS_Directory_WagonsConditionController(IRepository<Directory_WagonsCondition> cw)
        {
            this.ef_cw = cw;
        }

        // GET: api/ids/directory/wagons_condition/all
        [Route("all")]
        [ResponseType(typeof(Directory_WagonsCondition))]
        public IHttpActionResult GetWagonsCondition()
        {
            try
            {
                List<Directory_WagonsCondition> list = this.ef_cw.Context.ToList()
                    .Select(c => new Directory_WagonsCondition
                    {
                        id = c.id,
                        abbr_ru = c.abbr_ru,
                        condition_ru = c.condition_ru,
                        abbr_en = c.abbr_en,
                        condition_en = c.condition_en,
                        red = c.red
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
