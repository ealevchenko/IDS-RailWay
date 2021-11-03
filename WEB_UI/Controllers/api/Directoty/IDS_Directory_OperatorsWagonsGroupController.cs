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
    /// Оперативное управление
    /// </summary>
    [RoutePrefix("api/ids/directory/operators_wagons_group")]
    public class IDS_Directory_OperatorsWagonsGroupController : ApiController
    {
        protected IRepository<Directory_OperatorsWagonsGroup> ef_ow;

        public IDS_Directory_OperatorsWagonsGroupController(IRepository<Directory_OperatorsWagonsGroup> ow)
        {
            this.ef_ow = ow;
        }

        // GET: api/ids/directory/operators_wagons_group/all
        [Route("all")]
        [ResponseType(typeof(Directory_OperatorsWagonsGroup))]
        public IHttpActionResult GetOperatorsWagons()
        {
            try
            {
                List<Directory_OperatorsWagonsGroup> list = this.ef_ow
                    .Context
                    .ToList()
                    .Select(o => o.GetOperatorsWagonsGroup())
                    .ToList();
                return Ok(list);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
