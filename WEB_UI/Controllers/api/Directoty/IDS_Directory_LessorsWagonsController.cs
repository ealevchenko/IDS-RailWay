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
    /// справочник арендодателей
    /// </summary>
    [RoutePrefix("api/ids/directory/lessors_wagons")]
    public class IDS_Directory_LessorsWagonsController : ApiController
    {
        protected IRepository<Directory_LessorsWagons> ef_lw;

        public IDS_Directory_LessorsWagonsController(IRepository<Directory_LessorsWagons> lw)
        {
            this.ef_lw = lw;
        }

        // GET: api/ids/directory/lessors_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_LessorsWagons))]
        public IHttpActionResult GetLessorsWagons()
        {
            try
            {
                List<Directory_LessorsWagons> list = this.ef_lw.Context.ToList()
                    .Select(l => new Directory_LessorsWagons
                    {
                        id = l.id,
                        abbr_ru = l.abbr_ru,
                        lessors_ru = l.lessors_ru,
                        abbr_en = l.abbr_en,
                        lessors_en = l.lessors_en,
                        paid = l.paid,
                        rop = l.rop,
                        local_use = l.local_use
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
