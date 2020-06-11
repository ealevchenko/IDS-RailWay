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
    /// СПИСОК ПАРКОВ
    /// </summary>
    [RoutePrefix("api/ids/directory/park_way")]
    public class IDS_Directory_ParkWayController : ApiController
    {
        protected IRepository<Directory_ParkWay> ef_dir;

        public IDS_Directory_ParkWayController(IRepository<Directory_ParkWay> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/park_way/all
        [Route("all")]
        [ResponseType(typeof(Directory_ParkWay))]
        public IHttpActionResult GetParkWay()
        {
            try
            {
                List<Directory_ParkWay> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_ParkWay_Directory_Ways()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/park_way/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_ParkWay))]
        public IHttpActionResult GetParkWayOfID(int id)
        {
            try
            {
                Directory_ParkWay ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_ParkWay_Directory_Ways()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/park_way/
        [HttpPost]
        [Route("")]
        public int PostParkWay([FromBody]Directory_ParkWay value)
        {
            try
            {
                this.ef_dir.Add(value);
                return ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/park_way/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutParkWay(int id, [FromBody]Directory_ParkWay value)
        {
            try
            {
                this.ef_dir.Update(value);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/park_way/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteParkWay(int id)
        {
            try
            {
                this.ef_dir.Delete(id);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
