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
    /// Собственники вагонов
    /// </summary>
    [RoutePrefix("api/ids/directory/owners_wagons")]
    public class IDS_Directory_OwnersWagonsController : ApiController
    {
        protected IRepository<Directory_OwnersWagons> ef_ow;

        public IDS_Directory_OwnersWagonsController(IRepository<Directory_OwnersWagons> ow)
        {
            this.ef_ow = ow;
        }

        // GET: api/ids/directory/owners_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_OwnersWagons))]
        public IHttpActionResult GetOwnersWagons()
        {
            try
            {
                List<Directory_OwnersWagons> list = this.ef_ow.Context.ToList()
                    .Select(o => new Directory_OwnersWagons
                    {
                        id = o.id,
                        abbr_ru = o.abbr_ru,
                        owner_ru = o.owner_ru,
                        abbr_en = o.abbr_en,
                        owner_en = o.owner_en,
                        local_use = o.local_use,
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
