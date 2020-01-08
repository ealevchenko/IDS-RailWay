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
    /// Заводы изготовители вагонов
    /// </summary>
    [RoutePrefix("api/ids/directory/wagon_manufacturers")]
    public class IDS_Directory_WagonManufacturersController : ApiController
    {
        protected IRepository<Directory_WagonManufacturers> ef_wm;

        public IDS_Directory_WagonManufacturersController(IRepository<Directory_WagonManufacturers> wm)
        {
            this.ef_wm = wm;
        }

        // GET: api/ids/directory/wagon_manufacturers/all
        [Route("all")]
        [ResponseType(typeof(Directory_WagonManufacturers))]
        public IHttpActionResult GetWagonManufacturers()
        {
            try
            {
                List<Directory_WagonManufacturers> list = this.ef_wm.Context.ToList()
                    .Select(g => new Directory_WagonManufacturers
                    {
                        id = g.id,
                        name_ru = g.name_ru,
                        abbr_ru = g.abbr_ru,
                        name_en = g.name_en,
                        abbr_en = g.abbr_en,
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
