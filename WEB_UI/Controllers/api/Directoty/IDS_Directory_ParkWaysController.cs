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
    [RoutePrefix("api/ids/directory/park_ways")]
    public class IDS_Directory_ParkWaysController : ApiController
    {
        protected IRepository<Directory_ParkWays> ef_dir;

        public IDS_Directory_ParkWaysController(IRepository<Directory_ParkWays> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/park_ways/all
        [Route("all")]
        [ResponseType(typeof(Directory_ParkWays))]
        public IHttpActionResult GetParkWays()
        {
            try
            {
                List<Directory_ParkWays> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_ParkWays_Directory_Ways()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/park_ways/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_ParkWays))]
        public IHttpActionResult GetParkWaysOfID(int id)
        {
            try
            {
                Directory_ParkWays ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_ParkWays_Directory_Ways()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/park_ways/view/station/id/1
        [Route("view/station/id/{id:int}")]
        [ResponseType(typeof(Directory_ParkWays))]
        public IHttpActionResult GetParkWaysOfStation(int id)
        {
            try
            {
                string sql = "SELECT [id] ,[park_name_ru] ,[park_name_en] ,[park_abbr_ru]  ,[park_abbr_en] ,[create] ,[create_user],[change] ,[change_user] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_ParkWays] where [id] in (SELECT distinct [id_park] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] where id_station = " + id.ToString()+")";
                List<Directory_ParkWays> list = this.ef_dir.Database.SqlQuery<Directory_ParkWays>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/park_ways/
        [HttpPost]
        [Route("")]
        public int PostParkWays([FromBody]Directory_ParkWays value)
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

        // PUT api/ids/directory/park_ways/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutParkWays(int id, [FromBody]Directory_ParkWays value)
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

        // DELETE api/ids/directory/park_ways/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteParkWays(int id)
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
