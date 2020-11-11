using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using UZ;

namespace WEB_UI.Controllers.api
{
    [RoutePrefix("api/uz/web/client")]
    public class UZ_WebClientController : ApiController
    {
        

        // GET: api/uz/web/client/car_info/num/62079280
        [Route("car_info/num/{num:int}")]
        [ResponseType(typeof(UZWagonInfo))]
        public IHttpActionResult GetInfoWagonOfNum(int num)
        {
            try
            {
                WebAPIClientUZ client = new WebAPIClientUZ(service.Null);
                UZWagonInfo wagon_info = client.GetInfoWagonOfNum(num);
                return Ok(wagon_info);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //// POST api/uz/web/client/car_info/num/62079280
        //[HttpPost]
        //[Route("")]
        //public int PostCargo([FromBody]Directory_Cargo value)
        //{
        //    try
        //    {
        //        this.ef_dir.Add(value);
        //        return ef_dir.Save();
        //    }
        //    catch (Exception e)
        //    {
        //        return -1;
        //    }
        //}
    }
}
