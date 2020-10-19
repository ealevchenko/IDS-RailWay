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
    public class Way_View
    {
        public int id { get; set; }
        public int id_station { get; set; }
        public int id_park { get; set; }
        public int position_park { get; set; }
        public int position_way { get; set; }
        public string way_num_ru { get; set; }
        public string way_num_en { get; set; }
        public string way_name_ru { get; set; }
        public string way_name_en { get; set; }
        public string way_abbr_ru { get; set; }
        public string way_abbr_en { get; set; }
        public int? capacity { get; set; }
        public int count_wagon { get; set; }
        public bool? deadlock { get; set; }
        public bool? crossing_uz { get; set; }
        public bool? crossing_amkr { get; set; }
        public int? id_devision { get; set; }
        public bool? dissolution { get; set; }
        public bool? output_dissolution { get; set; }
        public string note { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
    }
    
    
    /// <summary>
    /// СПИСОК ПУТЕЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/ways")]
    public class IDS_Directory_WaysController : ApiController
    {
        protected IRepository<Directory_Ways> ef_dir;

        public IDS_Directory_WaysController(IRepository<Directory_Ways> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/ways/all
        [Route("all")]
        [ResponseType(typeof(Directory_Ways))]
        public IHttpActionResult GetWays()
        {
            try
            {
                List<Directory_Ways> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Ways()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/ways/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Ways))]
        public IHttpActionResult GetWaysOfID(int id)
        {
            try
            {
                Directory_Ways ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Ways()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/ways/view/station/id/1/park/id/69
        [Route("view/station/id/{id_station:int}/park/id/{id_park:int}")]
        [ResponseType(typeof(Way_View))]
        public IHttpActionResult GetWayOfStationPark(int id_station, int id_park)
        {
            try
            {
                string sql = "SELECT w.[id],w.[id_station],w.[id_park],w.[position_park],w.[position_way],w.[way_num_ru],w.[way_num_en],w.[way_name_ru],w.[way_name_en],w.[way_abbr_ru],w.[way_abbr_en],w.[capacity],[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [way_end] is null),w.[deadlock],w.[crossing_uz],w.[crossing_amkr],w.[id_devision], w.[dissolution], w.[output_dissolution], w.[note],w.[create],w.[create_user],w.[change],w.[change_user] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w where [id_station]=" + id_station.ToString() + " AND [id_park]=" + id_park.ToString() + " ORDER BY [position_way]";
                List<Way_View> list = this.ef_dir.Database.SqlQuery<Way_View>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/ways/view/way/id/111
        [Route("view/way/id/{id_way:int}")]
        [ResponseType(typeof(Way_View))]
        public IHttpActionResult GetWayOfWay(int id_way)
        {
            try
            {
                string sql = "SELECT w.[id],w.[id_station],w.[id_park],w.[position_park],w.[position_way],w.[way_num_ru],w.[way_num_en],w.[way_name_ru],w.[way_name_en],w.[way_abbr_ru],w.[way_abbr_en],w.[capacity],[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [way_end] is null),w.[deadlock],w.[crossing_uz],w.[crossing_amkr],w.[id_devision], w.[dissolution], w.[output_dissolution], w.[note],w.[create],w.[create_user],w.[change],w.[change_user] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w where w.[id]=" + id_way.ToString();
                Way_View way = this.ef_dir.Database.SqlQuery<Way_View>(sql).FirstOrDefault();
                return Ok(way);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/ways/view/way/dissolution/
        [Route("view/way/dissolution")]
        [ResponseType(typeof(Way_View))]
        public IHttpActionResult GetWayOfDissolution()
        {
            try
            {
                string sql = "SELECT w.[id],w.[id_station],w.[id_park],w.[position_park],w.[position_way],w.[way_num_ru],w.[way_num_en],w.[way_name_ru],w.[way_name_en],w.[way_abbr_ru],w.[way_abbr_en],w.[capacity],[count_wagon] = (SELECT count(id) FROM [KRR-PA-CNT-Railway].[IDS].[WagonInternalMovement] where [id_way] =w.[id] and [way_end] is null),w.[deadlock],w.[crossing_uz],w.[crossing_amkr],w.[id_devision], w.[dissolution], w.[output_dissolution], w.[note],w.[create],w.[create_user],w.[change],w.[change_user] FROM [KRR-PA-CNT-Railway].[IDS].[Directory_Ways] as w where w.[dissolution]=1 ORDER BY [position_park], [position_way]";
                List<Way_View> list = this.ef_dir.Database.SqlQuery<Way_View>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/ways/
        [HttpPost]
        [Route("")]
        public int PostWays([FromBody]Directory_Ways value)
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

        // PUT api/ids/directory/ways/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutWays(int id, [FromBody]Directory_Ways value)
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

        // DELETE api/ids/directory/ways/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteWays(int id)
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
