using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace WEB_UI.Controllers.api
{
    [RoutePrefix("api/global")]
    public class GlobalController : ApiController
    {

        // GET: api/global/client/count
        [Route("client/count")]
        [ResponseType(typeof(int))]
        public IHttpActionResult GetCountClient()
        {
            try
            {
                int client = 0;
                if (HttpContext.Current.Application["UsersCount"] != null)
                {
                    client = (int)(object)HttpContext.Current.Application["UsersCount"];
                }
                return Ok(client);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/global/client/hosts
        [Route("client/hosts")]
        [ResponseType(typeof(string[]))]
        public IHttpActionResult GetHostClient()
        {
            try
            {
                string[] arr_host = null;
                if (HttpContext.Current.Application["host_session"] != null)
                {
                    string host_session = (string)(object)HttpContext.Current.Application["host_session"];
                    if (!String.IsNullOrWhiteSpace(host_session))
                    {
                        arr_host = host_session.Split(';');
                    }
                }
                return Ok(arr_host);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #region блокировка park_state
        // GET: api/global/park_state/apply
        [Route("park_state/apply")]
        [ResponseType(typeof(string[]))]
        public IHttpActionResult GetParkStateApply()
        {
            try
            {
                string[] arr_guns = null;

                if (HttpContext.Current.Application["park_state_apply"] != null)
                {
                    string park_state_apply = (string)(object)HttpContext.Current.Application["park_state_apply"];
                    if (!String.IsNullOrWhiteSpace(park_state_apply))
                    {
                        arr_guns = park_state_apply.Split(';');
                    }
                }
                return Ok(arr_guns);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/global/park_state
        /// <summary>
        /// Установить признак "Идет применение парка" (Возврат null-ошибка или признак стоит, "код"- признак установили)
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("park_state")]
        [ResponseType(typeof(string))]
        public IHttpActionResult PostParkStateApply([FromBody]int value)
        {
            try
            {
                string park_state_apply = null;
                string result = null;
                // Закрытый доступ        
                HttpContext.Current.Application.Lock();
                if (HttpContext.Current.Application["park_state_apply"] != null)
                {
                    park_state_apply = (string)(object)HttpContext.Current.Application["park_state_apply"];
                    if (String.IsNullOrWhiteSpace(park_state_apply))
                    {
                        result = value.ToString();
                        park_state_apply = value.ToString();
                        HttpContext.Current.Application["park_state_apply"] = park_state_apply;
                    }
                    //else
                    //{
                    //    string[] arr_park_state_apply = park_state_apply.Split(';');
                    //    foreach (string ps in arr_park_state_apply)
                    //    {
                    //        if (ps == value.ToString())
                    //        {
                    //            // Снять закрытый доступ 
                    //            HttpContext.Current.Application.UnLock();
                    //            return Ok(result); 
                    //        }
                    //    }
                    //    result = value.ToString();
                    //    park_state_apply = park_state_apply + ";" + result;
                    //}
                    //HttpContext.Current.Application["park_state_apply"] = park_state_apply;
                }
                // Снять закрытый доступ        
                HttpContext.Current.Application.UnLock();
                return Ok(result);
            }
            catch (Exception e)
            {
                // Снять закрытый доступ        
                HttpContext.Current.Application.UnLock();
                return BadRequest(e.Message);
            }
        }

        // PUT api/global/park_state/5
        [HttpDelete]
        [Route("park_state/{id:int}")]
        [ResponseType(typeof(string))]
        public IHttpActionResult DeleteParkStateApply(int id)
        {
            try
            {
                // Закрытый доступ        
                HttpContext.Current.Application.Lock();
                if (HttpContext.Current.Application["park_state_apply"] != null)
                {
                    string park_state_apply_new = "";
                    string park_state_apply = (string)(object)HttpContext.Current.Application["park_state_apply"];
                    if (!String.IsNullOrWhiteSpace(park_state_apply))
                    {
                        string[] arr_park_state_apply = park_state_apply.Split(';');
                        foreach (string ps in arr_park_state_apply)
                        {
                            if (ps != id.ToString())
                            {
                                park_state_apply_new = park_state_apply_new + ps + ";";
                            };
                        }
                        HttpContext.Current.Application["park_state_apply"] = !String.IsNullOrWhiteSpace(park_state_apply_new) ? park_state_apply_new.Remove(park_state_apply_new.Length - 1) : "";
                    }
                }
                HttpContext.Current.Application.UnLock();
                return Ok(HttpContext.Current.Application["park_state_apply"]);
                // Снять закрытый доступ        

            }
            catch (Exception e)
            {
                // Снять закрытый доступ        
                HttpContext.Current.Application.UnLock();
                return BadRequest(e.Message);
            }
        }

        // PUT api/global/park_state/clear
        [HttpDelete]
        [Route("park_state/clear")]
        [ResponseType(typeof(string))]
        public IHttpActionResult DeleteParkStateApply()
        {
            try
            {
                // Закрытый доступ        
                HttpContext.Current.Application.Lock();
                if (HttpContext.Current.Application["park_state_apply"] != null)
                {
                    HttpContext.Current.Application["park_state_apply"] = "";
                }
                // Снять закрытый доступ        
                HttpContext.Current.Application.UnLock();
                return Ok(HttpContext.Current.Application["park_state_apply"]);
            }
            catch (Exception e)
            {
                // Снять закрытый доступ        
                HttpContext.Current.Application.UnLock();
                return BadRequest(e.Message);
            }
        }
        #endregion
    }
}
