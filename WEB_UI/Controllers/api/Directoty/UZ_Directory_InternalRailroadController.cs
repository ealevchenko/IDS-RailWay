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
    /// Справочник районов железных дорог СНГ и стран балтии
    /// </summary>
    [RoutePrefix("api/uz/directory/internal_railroad")]
    public class UZ_Directory_InternalRailroadController : ApiController
    {
        protected IRepository<Directory_InternalRailroad> ef_ir;

        public UZ_Directory_InternalRailroadController(IRepository<Directory_InternalRailroad> ir)
        {
            this.ef_ir = ir;
        }

        // GET: api/uz/directory/internal_railroad/all
        [Route("all")]
        [ResponseType(typeof(Directory_InternalRailroad))]
        public IHttpActionResult GetInternalRailroad()
        {
            try
            {
                List<Directory_InternalRailroad> list = this.ef_ir.Context.ToList()
                    .Select(r => new Directory_InternalRailroad
                    {
                        id = r.id,
                        id_state = r.id_state,
                        internal_railroad = r.internal_railroad,
                        code = r.code,
                        abbr = r.abbr,
                        list_code_station = r.list_code_station,
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
