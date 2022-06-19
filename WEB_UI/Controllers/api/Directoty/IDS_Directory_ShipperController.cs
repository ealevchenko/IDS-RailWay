using EFIDS.Abstract;
using EFIDS.Entities;
using EFIDS.Helper;
using IDS;
using IDSLogs.Enum;
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
    /// СПИСОК ГРУЗООТПРАВИТЕЛЕЙ
    /// </summary>
    [RoutePrefix("api/ids/directory/shipper")]
    public class IDS_Directory_ShipperController : ApiController
    {
        protected IRepository<Directory_Shipper> ef_dir;

        public IDS_Directory_ShipperController(IRepository<Directory_Shipper> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/shipper/all
        [Route("all")]
        [ResponseType(typeof(Directory_Shipper))]
        public IHttpActionResult GetShipper()
        {
            try
            {
                List<Directory_Shipper> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Shipper()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/shipper/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_Shipper))]
        public IHttpActionResult GetShipperOfCode(int code)
        {
            try
            {
                Directory_Shipper ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_Shipper()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/shipper/
        [HttpPost]
        [Route("")]
        public int PostShipper([FromBody]Directory_Shipper value)
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

        // PUT api/ids/directory/shipper/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutShipper(int code, [FromBody]Directory_Shipper value)
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

        // DELETE api/ids/directory/shipper/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteShipper(int code)
        {
            try
            {
                this.ef_dir.Delete(code);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        /// <summary>
        /// Выполнить операцию добавить станцию погран перехода в справочник ИДС (за исходник станций берем справочник УЗ)
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/ids/directory/shipper/operation/add
        [HttpPost]
        [Route("operation/add")]
        [ResponseType(typeof(Directory_Shipper))]
        public IHttpActionResult PostOperationAddBorderCheckpoint([FromBody] OperationAddCodeName value)
        {
            try
            {
                IDS_Directory ids_dir = new IDS_Directory(service.WebAPI_IDS);
                Directory_Shipper result = ids_dir.GetDirectory_Shipper(value.code, value.name, true, value.user);
                return Ok(result.GetDirectory_Shipper());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
