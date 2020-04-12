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
    /// Типы ремонтов вагонов
    /// </summary>
    [RoutePrefix("api/ids/directory/types_repairs_wagons")]
    public class IDS_Directory_TypesRepairsWagonsController : ApiController
    {
        protected IRepository<Directory_TypesRepairsWagons> ef_trw;

        public IDS_Directory_TypesRepairsWagonsController(IRepository<Directory_TypesRepairsWagons> trw)
        {
            this.ef_trw = trw;
        }

        // GET: api/ids/directory/types_repairs_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_TypesRepairsWagons))]
        public IHttpActionResult GetTypesRepairsWagons()
        {
            try
            {
                List<Directory_TypesRepairsWagons> list = this.ef_trw.Context.ToList()
                    .Select(g => new Directory_TypesRepairsWagons
                    {
                        id = g.id,
                        abbr_ru = g.abbr_ru,
                        type_repairs_ru = g.type_repairs_ru,
                        abbr_en = g.abbr_en,
                        type_repairs_en = g.type_repairs_en,

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
