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
    /// Справочник грузов
    /// </summary>
    [RoutePrefix("api/uz/directory/cargo")]
    public class UZ_Directory_CargoController : ApiController
    {
        protected IRepository<Directory_Cargo> ef_st;

        public UZ_Directory_CargoController(IRepository<Directory_Cargo> st)
        {
            this.ef_st = st;
        }

        // GET: api/uz/directory/cargo/all
        [Route("all")]
        [ResponseType(typeof(Directory_Cargo))]
        public IHttpActionResult GetCargo()
        {
            try
            {
                List<Directory_Cargo> list = this.ef_st.Context.ToList()
                    .Select(s => new Directory_Cargo
                    {
                        id = s.id,
                        code_etsng = s.code_etsng,
                        name_etsng = s.name_etsng,
                        code_gng = s.code_gng,
                        name_gng = s.name_gng,
                        id_sap = s.id_sap
 
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
