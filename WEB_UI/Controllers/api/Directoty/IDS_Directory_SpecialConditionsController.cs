using EFIDS.Abstract;
using EFIDS.Entities;
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
    /// Особые условия при эксплуатации
    /// </summary>
    [RoutePrefix("api/ids/directory/special_conditions")]
    public class IDS_Directory_SpecialConditionsController : ApiController
    {
        protected IRepository<Directory_SpecialConditions> ef_gw;

        public IDS_Directory_SpecialConditionsController(IRepository<Directory_SpecialConditions> gw)
        {
            this.ef_gw = gw;
        }

        // GET: api/ids/directory/special_conditions/all
        [Route("all")]
        [ResponseType(typeof(Directory_SpecialConditions))]
        public IHttpActionResult GetSpecialConditions()
        {
            try
            {
                List<Directory_SpecialConditions> list = this.ef_gw.Context.ToList()
                    .Select(s => new Directory_SpecialConditions
                    {
                        id = s.id,
                        special_conditions_ru = s.special_conditions_ru,
                        special_conditions_en = s.special_conditions_en,
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
