using EFUZ.Abstract;
using EFUZ.Entities;
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
    /// Справочник ж.д. станций
    /// </summary>
    [RoutePrefix("api/uz/directory/stations")]
    public class UZ_Directory_StationsController : ApiController
    {
        protected IRepository<Directory_Stations> ef_st;

        public UZ_Directory_StationsController(IRepository<Directory_Stations> st)
        {
            this.ef_st = st;
        }

        // GET: api/uz/directory/stations/all
        [Route("all")]
        [ResponseType(typeof(Directory_Stations))]
        public IHttpActionResult GetStations()
        {
            try
            {
                List<Directory_Stations> list = this.ef_st.Context.ToList()
                    .Select(s => new Directory_Stations
                    {
                        id = s.id,
                        code = s.code,
                        code_cs = s.code_cs,
                        station = s.station,
                        id_ir = s.id_ir,
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

        // GET: api/uz/directory/stations/code_cs/449909
        [Route("code_cs/{code:int}")]
        [ResponseType(typeof(Directory_Stations))]
        public IHttpActionResult GetStationsOfCodeCS(int code)
        {
            try
            {
                Directory_Stations station = this.ef_st.Context.Where(s => s.code_cs == code)
                    .ToList().
                    Select(s => new Directory_Stations
                        {
                            id = s.id,
                            code = s.code,
                            code_cs = s.code_cs,
                            station = s.station,
                            id_ir = s.id_ir,
                        })
                        .FirstOrDefault();
                return Ok(station);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
