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
    /// СПИСОК ГРУЗОВ ЕТСНГ
    /// </summary>
    [RoutePrefix("api/ids/directory/cargo_etsng")]
    public class IDS_Directory_CargoETSNGController : ApiController
    {
        protected IRepository<Directory_CargoETSNG> ef_dir;

        public IDS_Directory_CargoETSNGController(IRepository<Directory_CargoETSNG> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/cargo_etsng/all
        [Route("all")]
        [ResponseType(typeof(Directory_CargoETSNG))]
        public IHttpActionResult GetCargoETSNG()
        {
            try
            {
                List<Directory_CargoETSNG> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_CargoETSNG()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cargo_etsng/id/
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_CargoETSNG))]
        public IHttpActionResult GetCargoETSNGOfID(int id)
        {
            try
            {
                Directory_CargoETSNG ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_CargoETSNG()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cargo_etsng/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_CargoETSNG))]
        public IHttpActionResult GetCargoETSNGOfCode(int code)
        {
            try
            {
                List<Directory_CargoETSNG> ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_CargoETSNG()).ToList();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/cargo_etsng/
        [HttpPost]
        [Route("")]
        public int PostCargoETSNG([FromBody]Directory_CargoETSNG value)
        {
            try
            {
                this.ef_dir.Add(value);
                int res = ef_dir.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/cargo_etsng/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutCargoETSNG(int code, [FromBody]Directory_CargoETSNG value)
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

        // DELETE api/ids/directory/cargo_etsng/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteCargoETSNG(int code)
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
        /// Выполнить операцию добавить груз в справочник ИДС
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/ids/directory/cargo_etsng/operation/add/
        [HttpPost]
        [Route("operation/add")]
        [ResponseType(typeof(Directory_CargoETSNG))]
        public IHttpActionResult PostOperationAddCargoETSNG([FromBody] OperationAddCodeName value)
        {
            try
            {
                IDS_Directory ids_dir = new IDS_Directory(service.WebAPI_IDS);
                Directory_CargoETSNG result = ids_dir.GetDirectory_CargoETSNG(value.code, value.name, true, value.user);
                return Ok(result.GetDirectory_CargoETSNG());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
