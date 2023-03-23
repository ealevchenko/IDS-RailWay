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
    public class OperatorsAndGenus
    {
        public int? id_operator { get; set; }
        public int? id_genus { get; set; }
        public string operators_ru { get; set; }
        public string operators_en{ get; set; }
        public string operators_abbr_ru { get; set; }
        public string operators_abbr_en { get; set; }
        public int? rod_uz { get; set; }
        public string genus_ru { get; set; }
        public string genus_en { get; set; }
        public string genus_abbr_ru { get; set; }
        public string genus_abbr_en { get; set; }
    }

    /// <summary>
    /// Оперативное управление
    /// </summary>
    [RoutePrefix("api/ids/directory/operators_wagons")]
    public class IDS_Directory_OperatorsWagonsController : ApiController
    {
        protected IRepository<Directory_OperatorsWagons> ef_ow;

        public IDS_Directory_OperatorsWagonsController(IRepository<Directory_OperatorsWagons> ow)
        {
            this.ef_ow = ow;
        }

        // GET: api/ids/directory/operators_wagons/all
        [Route("all")]
        [ResponseType(typeof(Directory_OperatorsWagons))]
        public IHttpActionResult GetOperatorsWagons()
        {
            try
            {
                List<Directory_OperatorsWagons> list = this.ef_ow
                    .Context
                    .ToList()
                    .Select(o => o.GetOperatorsWagons())
                    .ToList();
                return Ok(list);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/ids/directory/operators_wagons/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_OperatorsWagons))]
        public IHttpActionResult GetOperatorsWagonsOfID(int id)
        {
            try
            {
                Directory_OperatorsWagons oper = this.ef_ow
                    .Context
                    .Where(o => o.id == id)
                    .ToList()
                    .Select(s => s.GetOperatorsWagons()).FirstOrDefault();
                return Ok(oper);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/operators_wagons/genus/all
        [Route("genus/all")]
        [ResponseType(typeof(OperatorsAndGenus))]
        public IHttpActionResult GetOperatorsWagonsOfGenus()
        {
            try
            {
                string sql = "select * from [IDS].[get_operators_and_genus]()";
                List<OperatorsAndGenus> sostav = this.ef_ow.Database.SqlQuery<OperatorsAndGenus>(sql).ToList();
                return Ok(sostav);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // POST api/ids/directory/operators_wagons/
        [HttpPost]
        [Route("")]
        public int PostOperatorsWagons([FromBody] Directory_OperatorsWagons value)
        {
            try
            {
                this.ef_ow.Add(value);
                return ef_ow.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/operators_wagons/id/
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutExternalStation(int id, [FromBody] Directory_OperatorsWagons value)
        {
            try
            {
                this.ef_ow.Update(value);
                return this.ef_ow.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/operators_wagons/id/
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteOperatorsWagons(int id)
        {
            try
            {
                this.ef_ow.Delete(id);
                return this.ef_ow.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
