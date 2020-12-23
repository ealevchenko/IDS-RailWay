using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api.RWT
{
    public class TransferObject
    {
        public int id { get; set; }
        public string user { get; set; }
    }

    [RoutePrefix("api/ids/transfer")]
    public class IDS_TransferController : ApiController
    {
        // GET: api/ids/transfer/epd/db_uz/add_update_db_ids/num/71113418/datetime/2020-03-20T23:59:59
        [Route("epd/db_uz/add_update_db_ids/num/{num:int}/datetime/{datetime:datetime}")]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetAddUpdateUZ_DOC_To_DB_IDS(int num, DateTime datetime)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);
                string num_doc = ids_tr.AddUpdateUZ_DOC_To_DB_IDS(num, UZ.uz_status.uncredited, datetime); // добавить с ограничением до статуса "разкредитован"
                return Ok(num_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/transfer/epd/db_uz/num/71113418/datetime/2020-03-20T23:59:59
        [Route("epd/db_uz/num/{num:int}/datetime/{datetime:datetime}")]
        [ResponseType(typeof(UZ.UZ_DOC))]
        public IHttpActionResult GetUZ_DOC_DB_UZ_OfNum(int num, DateTime datetime)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);
                UZ.UZ_DOC uz_doc = ids_tr.GetUZ_DOC_DB_UZ_OfNum(num, datetime);
                return Ok(uz_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //// GET: api/ids/transfer/epd/db_uz/num/71113418/datetime/2020-03-20T23:59:59
        //[Route("epd/db_uz/num/{num:int}/datetime/{datetime:datetime}")]
        //[ResponseType(typeof(UZ.UZ_DOC))]
        //public IHttpActionResult GetUZ_DOC_DB_UZ_OfNum(int num, DateTime datetime)
        //{
        //    try
        //    {
        //        IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);
        //        UZ.UZ_DOC uz_doc = ids_tr.GetUZ_DOC_DB_UZ_OfNum(num, datetime);
        //        return Ok(uz_doc);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        // GET: api/ids/transfer/epd/db_uz/num/67860718/day/15
        [Route("epd/db_uz/num/{num:int}/day/{day:int}")]
        [ResponseType(typeof(UZ.UZ_DOC))]
        public IHttpActionResult GetUZ_DOC_DB_UZ_OfNum(int num, int day)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);
                List<UZ.UZ_DOC> list = ids_tr.GetUZ_DOC_DB_UZ_OfNum(num, day);
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/transfer/db_ids
        [HttpPost]
        [Route("db_ids")]
        [ResponseType(typeof(string))]
        public IHttpActionResult PostUZ_DOC_To_DB_IDS([FromBody]UZ.UZ_DOC value)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);

                string num_doc = ids_tr.AddUpdateUZ_DOC_To_DB_IDS(value);
                return Ok(num_doc);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        // POST api/ids/transfer/incoming/arrival_sostav/
        /// <summary>
        /// Перенести принятый состав на станцию парибытия состав на станцию прибытия АМКР
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("incoming/arrival_sostav")]
        [ResponseType(typeof(int))]
        public IHttpActionResult PostIncomingArrivalSostav([FromBody]TransferObject value)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(service.WebAPI_IDS);
                int result = ids_tr.IncomingArrivalSostav(value.id, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
