﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EFIDS.Helper;
using EFIDS.Abstract;
using EFIDS.Entities;
using IDS;
using IDSLogs.Enum;

namespace WEB_UI.Controllers.api
{
    public class OperationAddSAP {
        public long id_arrival_car { get; set; }
        public int num { get; set; }
        public string doc_uz { get; set; }
        public DateTime? date_doc_uz { get; set; }
        public string code_border_checkpoint { get; set; }
        public string name_border_checkpoint { get; set; }
        public DateTime? cross_time { get; set; }
        public bool add { get; set; }
        public string user { get; set; }
    }

    /// <summary>
    /// ЭПД - по прибытию
    /// </summary>
    [RoutePrefix("api/ids/rwt/sap/incoming_supply")]
    public class IDS_RWT_Incoming_SAPIncomingSupplyController : ApiController
    {
        protected ILongRepository<SAPIncomingSupply> ef_ids;

        public IDS_RWT_Incoming_SAPIncomingSupplyController(ILongRepository<SAPIncomingSupply> ids)
        {
            this.ef_ids = ids;
        }

        // GET: api/ids/rwt/sap/incoming_supply/all
        [Route("all")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult GetSAPIncomingSupply()
        {
            try
            {
                List<SAPIncomingSupply> list = this.ef_ids.Context.ToList().Select(c => c.GetSAPIncomingSupply()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/sap/incoming_supply/num/1
        [Route("num/{num:int}")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult GetSAPIncomingSupplyOfNum(int num)
        {
            try
            {
                List<SAPIncomingSupply> list = this.ef_ids
                    .Context
                    .Where(s => s.num == num)
                    .ToList()
                    .OrderByDescending(s => s.id)
                    .Select(c => c.GetSAPIncomingSupply()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/sap/incoming_supply/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult GetSAPIncomingSupply(int id)
        {
            try
            {
                SAPIncomingSupply list = this.ef_ids
                    .Context
                    .Where(s => s.id == id)
                    .ToList()
                    .Select(c => c.GetSAPIncomingSupply()).FirstOrDefault();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/sap/incoming_supply/arrival_car/id/1
        [Route("arrival_car/id/{id:int}")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult GetSAPIncomingSupplyOfIDArrivalCar(int id)
        {
            try
            {
                SAPIncomingSupply list = this.ef_ids
                    .Context
                    .Where(s => s.id_arrival_car == id)
                    .ToList()
                    .Select(c => c.GetSAPIncomingSupply()).FirstOrDefault();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/sap/incoming_supply/
        [HttpPost]
        [Route("")]
        public long PostSAPIncomingSupply([FromBody]SAPIncomingSupply value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/sap/incoming_supply/id
        [HttpPut]
        [Route("id/{id:int}")]
        public long PutSAPIncomingSupply(int id, [FromBody]SAPIncomingSupply value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res > 0 ? value.id : res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/sap/incoming_supply/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteSAPIncomingSupply(int id)
        {
            try
            {
                this.ef_ids.Delete(id);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        /// <summary>
        /// Выполнить операцию добавить или обновить входящую поставку ()
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/ids/rwt/sap/incoming_supply/operation/update
        [HttpPost]
        [Route("operation/update")]
        [ResponseType(typeof(SAPIncomingSupply))]
        public IHttpActionResult PostOperationUpdateSAPIncomingSupply([FromBody] OperationAddSAP value)
        {
            try
            {
                IDS_SAP ids_dir = new IDS_SAP(service.WebAPI_IDS);
                SAPIncomingSupply result = ids_dir.GetSAPIncomingSupply(value.id_arrival_car, value.num, value.doc_uz, value.date_doc_uz, value.code_border_checkpoint, value.name_border_checkpoint, value.cross_time, true, value.user);
                return Ok(result.GetSAPIncomingSupply());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
