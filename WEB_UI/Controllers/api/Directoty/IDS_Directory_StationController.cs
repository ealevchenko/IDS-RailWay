using EFIDS.Abstract;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFIDS.Helper;

namespace WEB_UI.Controllers.api
{
    
    /// <summary>
    /// РОД ВАГОНА
    /// </summary>
    [RoutePrefix("api/ids/directory/station")]
    public class IDS_Directory_StationController : ApiController
    {
        protected IRepository<Directory_Station> ef_ds;

        public IDS_Directory_StationController(IRepository<Directory_Station> ds)
        {
            this.ef_ds = ds;
        }

        // GET: api/ids/directory/station/all
        [Route("all")]
        [ResponseType(typeof(Directory_Station))]
        public IHttpActionResult GetDirectory_Station()
        {
            try
            {
                List<Directory_Station> list = this.ef_ds.Context.ToList().Select(d => d.GetDirectory_Station()).ToList();
                //List<Directory_Station> list = this.ef_ds.Context.ToList().Select(d => d.GetDirectory_Station_Directory_Ways()).ToList();
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

        // GET: api/ids/directory/station/all_old
        [Route("all_old")]
        [ResponseType(typeof(Directory_Station))]
        public IHttpActionResult GetDirectory_StationOld()
        {
            try
            {
                //List<Directory_Station> list = this.ef_ds.Context.ToList().Select(d => d.GetDirectory_Station()).ToList();
                List<Directory_Station> list = this.ef_ds.Context.ToList().Select(d => d.GetDirectory_Station_Directory_Ways()).ToList();
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
