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
    /// Полигон курсирования
    /// </summary>
    [RoutePrefix("api/ids/directory/poligon_travel_wagons")]
    public class IDS_Directory_PoligonTravelWagonsController : ApiController
    {
        protected IRepository<Directory_PoligonTravelWagons> ef_ptw;

        public IDS_Directory_PoligonTravelWagonsController(IRepository<Directory_PoligonTravelWagons> ptw)
        {
            this.ef_ptw = ptw;
        }

        // GET: api/ids/directory/poligon_travel_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_PoligonTravelWagons))]
        public IHttpActionResult GetPoligonTravelWagons()
        {
            try
            {
                List<Directory_PoligonTravelWagons> list = this.ef_ptw.Context.ToList()
                    .Select(p => new Directory_PoligonTravelWagons
                    {
                        id = p.id,
                        abbr_ru = p.abbr_ru,
                        poligon_travel_ru = p.poligon_travel_ru,
                        abbr_en = p.abbr_en,
                        poligon_travel_en = p.poligon_travel_en,
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
