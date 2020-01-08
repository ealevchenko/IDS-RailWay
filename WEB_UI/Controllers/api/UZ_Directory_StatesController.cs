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
    /// Справочник железных дорог СНГ и стран балтии
    /// </summary>
    [RoutePrefix("api/uz/directory/states")]
    public class UZ_Directory_StatesController : ApiController
    {
        protected IRepository<Directory_States> ef_st;

        public UZ_Directory_StatesController(IRepository<Directory_States> st)
        {
            this.ef_st = st;
        }

        // GET: api/uz/directory/states/all
        [Route("all")]
        [ResponseType(typeof(Directory_States))]
        public IHttpActionResult GetStates()
        {
            try
            {
                List<Directory_States> list = this.ef_st.Context.ToList()
                    .Select(s => new Directory_States
                    {
                        id = s.id,
                        state = s.state,
                        name_network = s.name_network,
                        abb_ru = s.abb_ru,
                        abb_en = s.abb_en,
                        //Directory_Countrys = s.Directory_Countrys.Select(c => new Directory_Countrys {
                        //    id = c.id,
                        //    country = c.country,
                        //    Alpha_2 = c.Alpha_2,
                        //    alpha_3 = c.alpha_3,
                        //    code = c.code,
                        //    iso3166_2 = c.iso3166_2,
                        //    id_state = c.id_state,
                        //    code_europe = c.code_europe,
                        //}).ToList(),
                        //Directory_InternalRailroad = s.Directory_InternalRailroad.Select(r => new Directory_InternalRailroad{
                        //    id = r.id,
                        //    id_state = r.id_state,
                        //    internal_railroad = r.internal_railroad,
                        //    code = r.code,
                        //    abbr = r.abbr,
                        //    list_code_station = r.list_code_station,
                        //}).ToList()
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
