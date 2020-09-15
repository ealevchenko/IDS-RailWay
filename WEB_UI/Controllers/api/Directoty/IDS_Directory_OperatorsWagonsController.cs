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
    /// Оперативное управление
    /// </summary>
    [RoutePrefix("api/ids/directory/operators_wagons")]
    public class IDS_Directory_OperatorsWagonsController : ApiController
    {
        protected IRepository<Directory_OperatorsWagons> ef_ow;

        public IDS_Directory_OperatorsWagonsController(IRepository<Directory_OperatorsWagons> ow)
        {
            this.ef_ow = ow;
        }

        // GET: api/ids/directory/operators_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_OperatorsWagons))]
        public IHttpActionResult GetOperatorsWagons()
        {
            try
            {
                List<Directory_OperatorsWagons> list = this.ef_ow.Context.ToList()
                    .Select(o => new Directory_OperatorsWagons
                    {
                        id = o.id,
                        abbr_ru = o.abbr_ru,
                        operators_ru = o.operators_ru,
                        abbr_en = o.abbr_en,
                        operators_en = o.operators_en,
                        paid = o.paid,
                        rop = o.rop,
                        local_use = o.local_use,
                        color = o.color,
                        create = o.create,
                        create_user = o.create_user,
                        change = o.change,
                        change_user = o.change_user
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
