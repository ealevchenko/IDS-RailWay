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
    /// ПОГРАН ПЕРЕХОДЫ
    /// </summary>
    [RoutePrefix("api/ids/directory/border_checkpoint")]
    public class IDS_Directory_BorderCheckpointController : ApiController
    {
        protected IRepository<Directory_BorderCheckpoint> ef_dir;

        public IDS_Directory_BorderCheckpointController(IRepository<Directory_BorderCheckpoint> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/border_checkpoint/all
        [Route("all")]
        [ResponseType(typeof(Directory_BorderCheckpoint))]
        public IHttpActionResult GetBorderCheckpoint()
        {
            try
            {
                List<Directory_BorderCheckpoint> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_BorderCheckpoint()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/border_checkpoint/code/
        [Route("code/{code:int}")]
        [ResponseType(typeof(Directory_BorderCheckpoint))]
        public IHttpActionResult GetBorderCheckpointOfCode(int code)
        {
            try
            {
                Directory_BorderCheckpoint ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_BorderCheckpoint()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/border_checkpoint/
        [HttpPost]
        [Route("")]
        public int PostBorderCheckpoint([FromBody]Directory_BorderCheckpoint value)
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

        // PUT api/ids/directory/border_checkpoint/code
        [HttpPut]
        [Route("code/{code:int}")]
        public int PutBorderCheckpoint(int code, [FromBody]Directory_BorderCheckpoint value)
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

        // DELETE api/ids/directory/border_checkpoint/code
        [HttpDelete]
        [Route("code/{code:int}")]
        public int DeleteBorderCheckpoint(int code)
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
        // POST api/ids/directory/border_checkpoint/operation/add
        [HttpPost]
        [Route("operation/add")]
        [ResponseType(typeof(Directory_BorderCheckpoint))]
        public IHttpActionResult PostOperationAddBorderCheckpoint([FromBody] OperationAddCodeName value)
        {
            try
            {
                IDS_Directory ids_dir = new IDS_Directory(service.WebAPI_IDS);
                Directory_BorderCheckpoint result = ids_dir.GetDirectory_BorderCheckpoint(value.code, value.name, true, value.user);
                return Ok(result.GetDirectory_BorderCheckpoint());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
