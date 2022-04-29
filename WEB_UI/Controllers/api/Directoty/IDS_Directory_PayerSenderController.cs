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
    public class OperationAddSCodeName
    {
        public string code { get; set; }
        public string name { get; set; }
        public string user { get; set; }
    }

    /// <summary>
    /// СПИСОК Платильщиков при получении
    /// </summary>
    [RoutePrefix("api/ids/directory/payer_sender")]
    public class IDS_Directory_PayerSenderController : ApiController
    {
        protected IStringRepository<Directory_PayerSender> ef_dir;

        public IDS_Directory_PayerSenderController(IStringRepository<Directory_PayerSender> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/payer_sender/all
        [Route("all")]
        [ResponseType(typeof(Directory_PayerSender))]
        public IHttpActionResult GetPayerSender()
        {
            try
            {
                List<Directory_PayerSender> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_PayerSender()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/payer_sender/code/
        [Route("code/{code}")]
        [ResponseType(typeof(Directory_PayerSender))]
        public IHttpActionResult GetPayerSenderOfID(string code)
        {
            try
            {
                Directory_PayerSender ens = this.ef_dir
                    .Context
                    .Where(w => w.code == code)
                    .ToList()
                    .Select(m => m.GetDirectory_PayerSender()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/payer_sender/
        [HttpPost]
        [Route("")]
        public int PostPayerSender([FromBody]Directory_PayerSender value)
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

        // PUT api/ids/directory/payer_sender/code
        [HttpPut]
        [Route("code/{code}")]
        public int PutPayerSender(string code, [FromBody]Directory_PayerSender value)
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

        // DELETE api/ids/directory/payer_sender/code
        [HttpDelete]
        [Route("code/{code}")]
        public int DeletePayerSender(string code)
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
        /// Выполнить операцию добавить платильщика по отправе в справочник ИДС
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/ids/directory/payer_sender/operation/add/
        [HttpPost]
        [Route("operation/add")]
        [ResponseType(typeof(Directory_PayerSender))]
        public IHttpActionResult PostOperationAddBorderCheckpoint([FromBody] OperationAddSCodeName value)
        {
            try
            {
                IDS_Directory ids_dir = new IDS_Directory(service.WebAPI_IDS);
                Directory_PayerSender result = ids_dir.GetDirectory_PayerSender(value.code, value.name, true, value.user);
                return Ok(result.GetDirectory_PayerSender());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
