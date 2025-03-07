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
    public class OperationUZ_DOC_Doc_Num
    {
        public string num_doc { get; set; }
        public int num { get; set; }
        public bool add { get; set; }
        public bool search_sms { get; set; }
    }

    public class OperationUZ_DOC_Num_DT
    {
        public int num { get; set; }
        public DateTime? dt_arrival { get; set; }
        public bool add { get; set; }
        public bool search_sms { get; set; }
    }

    [RoutePrefix("api/ids/rwt/uz_doc")]
    public class IDS_RWT_Incoming_UZ_DOCController : ApiController
    {
        protected IStringRepository<UZ_DOC> ef_ids;

        public IDS_RWT_Incoming_UZ_DOCController(IStringRepository<UZ_DOC> ids)
        {
            this.ef_ids = ids;
        }


        // GET: api/ids/rwt/uz_doc/all
        [Route("all")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetUZ_DOC()
        {
            try
            {
                List<UZ_DOC> list = this.ef_ids.Context.ToList().Select(c => c.GetUZ_DOC()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/manual/date/num_uz/1
        [Route("manual/date/num_uz/{num_uz}")]
        [ResponseType(typeof(DateTime?))]
        public DateTime? GetDateTimeUZ_DOC_Of_manual_num_uz(string num_uz)
        {
            try
            {
                DateTime? date = this.ef_ids.Database.SqlQuery<DateTime?>("select [IDS].[get_date_manual_epd]("+ num_uz.Trim()+");").FirstOrDefault();
                return date;
            }
            catch (Exception e)
            {
                return null;// BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/num/32000000000518049746
        [Route("num/{num}")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetUZ_DOC(string num)
        {
            try
            {
                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_doc == num)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                return Ok(uz_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/otpr/num/32000000000518049746
        [Route("otpr/num/{num}")]
        [ResponseType(typeof(UZ.OTPR))]
        public IHttpActionResult GetOTPROfUZ_DOC(string num)
        {
            try
            {
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.OTPR otpr = null;

                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_doc == num)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                if (uz_doc != null)
                {
                    otpr = convert.XMLToOTPR(uz_doc.xml_doc);
                }
                return Ok(otpr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/num_uz/415327
        [Route("num_uz/{num_uz:int}")]
        [ResponseType(typeof(UZ_DOC))]
        public IHttpActionResult GetUZ_DOCOfNum_UZ(int num_uz)
        {
            try
            {
                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_uz == num_uz)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                return Ok(uz_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/rwt/uz_doc/otpr/num_uz/415327
        [Route("otpr/num_uz/{num_uz:int}")]
        [ResponseType(typeof(UZ.OTPR))]
        public IHttpActionResult GetOTPROfNum_UZ(int num_uz)
        {
            try
            {
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.OTPR otpr = null;

                UZ_DOC uz_doc = this.ef_ids
                    .Context
                    .Where(s => s.num_uz == num_uz)
                    .ToList()
                    .Select(c => c.GetUZ_DOC()).FirstOrDefault();
                if (uz_doc != null)
                {
                    otpr = convert.XMLToOTPR(uz_doc.xml_doc);
                }
                return Ok(otpr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/uz_doc/
        [HttpPost]
        [Route("")]
        public int PostUZ_DOC([FromBody]UZ_DOC value)
        {
            try
            {
                this.ef_ids.Add(value);
                int res = this.ef_ids.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/rwt/uz_doc/id
        [HttpPut]
        [Route("num/{num}")]
        public int PutUZ_DOC(string num, [FromBody]UZ_DOC value)
        {
            try
            {
                this.ef_ids.Update(value);
                int res = this.ef_ids.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/rwt/uz_doc/num
        [HttpDelete]
        [Route("num/{num}")]
        public int DeleteUZ_DOC(string num)
        {
            try
            {
                this.ef_ids.Delete(num);
                return this.ef_ids.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        /// <summary>
        /// Выполнить операцию поиска ЭПД по всем БД ИДС, Промежуточной, СМС
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/ids/rwt/uz_doc/operation/update/document/num/
        [HttpPost]
        [Route("operation/update/document/num")]
        [ResponseType(typeof(ResultObject))]
        public IHttpActionResult PostOperationUpdateUZ_DOC_Doc_Num([FromBody] OperationUZ_DOC_Doc_Num value)
        {
            try
            {
                IDS_WIR ids_dir = new IDS_WIR(service.WebAPI_IDS);
                ResultObject result = ids_dir.OperationUpdateUZ_DOC(value.num_doc, value.num, value.add, value.search_sms);
                if (result.obj != null) {
                    result.obj = ((UZ_DOC)result.obj).GetUZ_DOC();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/rwt/uz_doc/operation/update/num/dt_arrival/
        [HttpPost]
        [Route("operation/update/num/dt_arrival")]
        [ResponseType(typeof(ResultObject))]
        public IHttpActionResult PostOperationUpdateUZ_DOC_Num_DT([FromBody] OperationUZ_DOC_Num_DT value)
        {
            try
            {
                IDS_WIR ids_dir = new IDS_WIR(service.WebAPI_IDS);
                ResultObject result = ids_dir.OperationUpdateUZ_DOC(value.num, value.dt_arrival, value.add, value.search_sms);
                if (result.obj != null) {
                    result.obj = ((UZ_DOC)result.obj).GetUZ_DOC();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Выполнить распарсить документ из XML
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        // POST: api/ids/rwt/uz_doc/otpr/xml/
        [HttpPost]
        [Route("otpr/xml")]
        [ResponseType(typeof(UZ.OTPR))]
        public IHttpActionResult PostOTPROfXML([FromBody] string xml)
        {
            try
            {
                UZ.UZ_Convert convert = new UZ.UZ_Convert();
                UZ.OTPR otpr = null;
                if (!String.IsNullOrWhiteSpace(xml))
                {
                    otpr = convert.XMLToOTPR(xml);
                }
                return Ok(otpr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
