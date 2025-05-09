﻿using EFIDS.Abstract;
using EFIDS.Entities;
using EFIDS.Helper;
using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using WEB_UI.Infrastructure;

namespace WEB_UI.Controllers.api
{
    public class view_wagons_rent
    {
        public int id { get; set; }
        public int num { get; set; }
        public int? curr_wagons_rent_id_operator { get; set; }
        public string curr_wagons_rent_operators_ru { get; set; }
        public string curr_wagons_rent_operators_en { get; set; }
        public string curr_wagons_rent_operator_abbr_ru { get; set; }
        public string curr_wagons_rent_operator_abbr_en { get; set; }
        public DateTime? curr_wagons_rent_start { get; set; }
        public DateTime? curr_wagons_rent_end { get; set; }
        public bool? curr_wagons_rent_operator_paid { get; set; }
        public string curr_wagons_rent_operator_color { get; set; }
        public int? curr_wagons_rent_id_limiting { get; set; }
        public string curr_wagons_rent_limiting_name_ru { get; set; }
        public string curr_wagons_rent_limiting_name_en { get; set; }
        public string curr_wagons_rent_limiting_abbr_ru { get; set; }
        public string curr_wagons_rent_limiting_abbr_en { get; set; }
        public int? id_operator { get; set; }
        public int? id_limiting { get; set; }
        public DateTime? rent_start { get; set; }
        public DateTime? rent_end { get; set; }
        public DateTime create { get; set; }
        public string create_user { get; set; }
        public DateTime? change { get; set; }
        public string change_user { get; set; }
        public int? parent_id { get; set; }
    }

    /// <summary>
    /// СПИСОК СТРАН
    /// </summary>
    [RoutePrefix("api/ids/directory/wagon_rent")]
    public class IDS_Directory_WagonsRentController : ApiController
    {
        protected IRepository<Directory_WagonsRent> ef_dir;

        public IDS_Directory_WagonsRentController(IRepository<Directory_WagonsRent> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/wagon_rent/all
        [Route("all")]
        [ResponseType(typeof(Directory_WagonsRent))]
        public IHttpActionResult GetWagonsRent()
        {
            try
            {
                List<Directory_WagonsRent> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_WagonsRent()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon_rent/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_WagonsRent))]
        public IHttpActionResult GetWagonsRentOfID(int id)
        {
            try
            {
                Directory_WagonsRent wagon = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_WagonsRent()).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon_rent/num/65201857
        [Route("num/{num:int}")]
        [ResponseType(typeof(Directory_WagonsRent))]
        public IHttpActionResult GetWagonsRentOfNum(int num)
        {
            try
            {
                List<Directory_WagonsRent> list = this.ef_dir
                    .Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(m => m.GetDirectory_WagonsRent()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon_rent/view/num/65201857
        [Route("view/num/{num:int}")]
        [ResponseType(typeof(view_wagons_rent))]
        public IHttpActionResult GetViewWagonsRentOfNum(int num)
        {
            try
            {
                System.Data.SqlClient.SqlParameter p_num = new System.Data.SqlClient.SqlParameter("@num", num);
                string sql = "select * from [IDS].[get_view_wagons_rent_of_num](@num) order by id";
                List<view_wagons_rent> list = this.ef_dir.Database.SqlQuery<view_wagons_rent>(sql, p_num).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // POST: api/ids/directory/wagon_rent/current/list_nums/
        [HttpPost]
        [Route("current/list_nums/")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult PostCurrentWagonsRentOfNums([FromBody] List<int> nums)
        {
            try
            {
                List<Directory_WagonsRent> wagons = new List<Directory_WagonsRent>();

                foreach (int num in nums)
                {
                    Directory_WagonsRent rent = this.ef_dir
                        .Context
                        .Where(r => r.num == num & r.rent_end == null)
                        .ToList()
                        .Select(m => m.GetDirectory_WagonsRent()).FirstOrDefault();

                    if (rent != null)
                    {
                        wagons.Add(rent);
                    }
                }
                return Ok(wagons);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/wagon_rent/
        [HttpPost]
        [Route("")]
        public int PostWagonsRent([FromBody]Directory_WagonsRent value)
        {
            try
            {
                this.ef_dir.Add(value);
                int result = ef_dir.Save();
                return result > 0 ? value.id : result;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // POST api/ids/directory/wagon_rent/list
        [HttpPost]
        [Route("list")]
        public int PostListWagonsRent([FromBody]List<Directory_WagonsRent> list)
        {
            try
            {
                this.ef_dir.Add(list);
                int res = this.ef_dir.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/wagon_rent/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutWagonsRent(int id, [FromBody]Directory_WagonsRent value)
        {
            try
            {
                this.ef_dir.Update(value);
                int result = this.ef_dir.Save();
                return result > 0 ? value.id : result;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/wagon_rent/list
        [HttpPut]
        [Route("list")]
        public int PutListWagonsRent(List<Directory_WagonsRent> list)
        {
            try
            {
                this.ef_dir.Update(list);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/wagon_rent/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteWagonsRent(int id)
        {
            try
            {
                this.ef_dir.Delete(id);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
