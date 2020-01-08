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
    [RoutePrefix("api/ids/directory/genus_wagon")]
    public class IDS_Directory_GenusWagonsController : ApiController
    {
        protected IRepository<Directory_GenusWagons> ef_gw;

        public IDS_Directory_GenusWagonsController(IRepository<Directory_GenusWagons> gw)
        {
            this.ef_gw = gw;
        }

        // GET: api/ids/directory/genus_wagon/all
        [Route("all")]
        [ResponseType(typeof(Directory_GenusWagons))]
        public IHttpActionResult GetGenusWagons()
        {
            try
            {
                List<Directory_GenusWagons> list = this.ef_gw.Context.ToList()
                    .Select(g => new Directory_GenusWagons
                    {
                        id = g.id,
                        abbr_ru = g.abbr_ru,
                        genus_ru = g.genus_ru,
                        abbr_en = g.abbr_en,
                        genus_en = g.genus_en,
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
