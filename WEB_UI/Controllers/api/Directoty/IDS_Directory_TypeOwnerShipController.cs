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
    /// Признак собственности
    /// </summary>
    [RoutePrefix("api/ids/directory/type_owner_ship")]
    public class IDS_Directory_TypeOwnerShipController : ApiController
    {
        protected IRepository<Directory_TypeOwnerShip> ef_tos;

        public IDS_Directory_TypeOwnerShipController(IRepository<Directory_TypeOwnerShip> tos)
        {
            this.ef_tos = tos;
        }

        // GET: api/ids/directory/type_owner_ship/all
        [Route("all")]
        [ResponseType(typeof(Directory_TypeOwnerShip))]
        public IHttpActionResult GetTypeOwnerShip()
        {
            try
            {
                List<Directory_TypeOwnerShip> list = this.ef_tos.Context.ToList()
                    .Select(g => new Directory_TypeOwnerShip
                    {
                        id = g.id,
                        type_ownership_ru = g.type_ownership_ru,
                        type_ownership_en = g.type_ownership_en,
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
