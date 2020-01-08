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
    /// Модель вагона
    /// </summary>
    [RoutePrefix("api/ids/directory/models_wagons")]
    public class IDS_Directory_ModelsWagonsController : ApiController
    {
        protected IRepository<Directory_ModelsWagons> ef_mw;

        public IDS_Directory_ModelsWagonsController(IRepository<Directory_ModelsWagons> mw)
        {
            this.ef_mw = mw;
        }

        // GET: api/ids/directory/models_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_ModelsWagons))]
        public IHttpActionResult GetModelsWagons()
        {
            try
            {
                List<Directory_ModelsWagons> list = this.ef_mw.Context.ToList()
                    .Select(m => new Directory_ModelsWagons
                    {
                        code = m.code,
                        model_ru = m.model_ru,
                        model_en = m.model_en
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
