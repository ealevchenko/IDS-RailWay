using EFIDS.Abstract;
using EFIDS.Entities;
using EFIDS.Helper;
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
        protected IRepository<Directory_GenusWagons> ef_dir;

        public IDS_Directory_GenusWagonsController(IRepository<Directory_GenusWagons> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/genus_wagon/all
        [Route("all")]
        [ResponseType(typeof(Directory_GenusWagons))]
        public IHttpActionResult GetGenusWagons()
        {
            try
            {
                List<Directory_GenusWagons> list = this.ef_dir.Context.ToList()
                    .Select(g => g.GetGenusWagons()).ToList();
                //if (list == null || list.Count() == 0)
                //{
                //    return NotFound();
                //}
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
