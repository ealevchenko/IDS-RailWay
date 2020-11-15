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
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using WEB_UI.Infrastructure;

namespace WEB_UI.Controllers.api
{

    public class view_directory_wagon
    {
        public int num { get; set; }
        public int id_countrys { get; set; }
        public int? code_sng { get; set; }
        public string countrys_name_ru { get; set; }
        public string countrys_name_en { get; set; }
        public string country_abbr_ru { get; set; }
        public string country_abbr_en { get; set; }
        public int id_genus { get; set; }
        public int? rod_uz { get; set; }
        public string genus_ru { get; set; }
        public string genus_en { get; set; }
        public string genus_abbr_ru { get; set; }
        public string genus_abbr_en { get; set; }
        public int id_owner { get; set; }
        public string owner_ru { get; set; }
        public string owner_en { get; set; }
        public string owner_abbr_ru { get; set; }
        public string owner_abbr_en { get; set; }
        public int? id_operator_uz { get; set; }
        public string operators_uz_ru { get; set; }
        public string operators_uz_en { get; set; }
        public string operators_uz_abbr_ru { get; set; }
        public string operators_uz_abbr_en { get; set; }
        public DateTime? change_operator_uz { get; set; }
        public double gruzp { get; set; }
        public double? tara { get; set; }
        public int kol_os { get; set; }
        public string usl_tip { get; set; }
        public DateTime? date_rem_uz { get; set; }
        public DateTime? date_rem_vag { get; set; }
        public int? id_type_ownership { get; set; }
        public string type_ownership_ru { get; set; }
        public string type_ownership_en { get; set; }
        public int? sign { get; set; }
        public string factory_number { get; set; }
        public string inventory_number { get; set; }
        public int? year_built { get; set; }
        public bool? exit_ban { get; set; }
        public string note { get; set; }
        public int? sobstv_kis { get; set; }
        public bool? bit_warning { get; set; }
        public DateTime create_wagons { get; set; }
        public string create_user_wagons { get; set; }
        public DateTime? change_wagons { get; set; }
        public string change_user_wagons { get; set; }
        public int? id_wagons_rent { get; set; }
        public int? id_operator_amkr { get; set; }
        public string operators_amkr_ru { get; set; }
        public string operators_amkr_en { get; set; }
        public string operators_uz_amkr_ru { get; set; }
        public string operators_uz_amkr_en { get; set; }
        public DateTime? rent_start { get; set; }
        public DateTime? rent_end { get; set; }
        public int? id_limiting { get; set; }
        public string limiting_name_ru { get; set; }
        public string limiting_name_en { get; set; }
        public string limiting_abbr_ru { get; set; }
        public string limiting_abbr_en { get; set; }
        public DateTime? create_wagons_rent { get; set; }
        public string create_user_wagons_rent { get; set; }
        public DateTime? change_wagons_rent { get; set; }
        public string change_user_wagons_rent { get; set; }
        public int? parent_id_wagons_rent { get; set; }
    }
    /// <summary>
    /// Класс данных для выполнения операции групповой смены оператора на вагоны
    /// </summary>
    public class OperationUpdateWagons
    {
        public List<int> list_nums { get; set; } 
        public bool edit_operator { get; set; }         
        public int? id_operator { get; set; }        
        public DateTime? start_rent { get; set; }
        public bool edit_limiting { get; set; } 
        public int? id_limiting { get; set; }         
        public string user { get; set; }
    }
    
    /// <summary>
    /// СПИСОК ВАГОНОВ
    /// </summary>
    [RoutePrefix("api/ids/directory/wagon")]
    public class IDS_Directory_WagonsController : ApiController
    {
        protected IRepository<Directory_Wagons> ef_dir;
        protected IRepository<Directory_WagonsRent> ef_dir_rent;

        //private string field = " [id],[num],[id_countrys],[id_genus],[id_owner],[id_operator_uz],[ban_changes_operator],[id_operator],[gruzp],[kol_os],[usl_tip],[date_rem_uz],[date_rem_vag],[id_limiting],[id_type_ownership],[rent_start],[rent_end],[sign],[note],[sobstv_kis],[create],[create_user],[change],[change_user] ";
        //private string table = " [IDS].[Directory_Wagons] ";

        public IDS_Directory_WagonsController(IRepository<Directory_Wagons> dir, IRepository<Directory_WagonsRent> dir_rent)
        {
            this.ef_dir = dir;
            this.ef_dir_rent = dir_rent;
        }

        #region ВЫПОЛНЕНИЕ ОПЕРАЦИЙ ПРАВКИ СПРАВОЧНИКА
        // POST api/ids/directory/wagon/operation/update/
        [HttpPost]
        [Route("operation/update/")]
        [ResponseType(typeof(OperationResult))]
        public IHttpActionResult PostOperationUpdateWagons([FromBody] OperationUpdateWagons value)
        {
            try
            {
                IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
                OperationResult result = ids_dir.OperationUpdateWagons(value.list_nums, value.edit_operator, value.id_operator, value.start_rent, value.edit_limiting, value.id_limiting, value.user);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion



        // GET: api/ids/directory/wagon/is_correct/num/24119703
        [Route("is_correct/num/{num:int}")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult GetCorrectNumCar(int num)
        {
            try
            {
                IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
                bool correct = ids_dir.IsCorrectNumCar(num);
                return Ok(correct);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }        
        
        
        // GET: api/ids/directory/wagon/all
        [Route("all")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult GetWagons()
        {
            try
            {
                List<Directory_Wagons> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Wagons_Directory_WagonsRent()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon/num/24119703
        [Route("num/{num:int}")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult GetWagonsOfNum(int num)
        {
            try
            {
                Directory_Wagons wagon = this.ef_dir
                    .Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(m => m.GetDirectory_Wagons_Directory_WagonsRent()).FirstOrDefault();
                return Ok(wagon);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/ids/directory/wagon/list_nums/
        [HttpPost]
        [Route("list_nums/")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult PostWagonsOfNums([FromBody] List<int> nums)
        {
            try
            {
                List<Directory_Wagons> wagons = new List<Directory_Wagons>();

                foreach (int num in nums)
                {
                    Directory_Wagons vagon = this.ef_dir
                        .Context
                        .Where(c => c.num == num)
                        .ToList()
                        .Select(m => m.GetDirectory_Wagons_Directory_WagonsRent()).FirstOrDefault();

                    if (vagon != null)
                    {
                        wagons.Add(vagon);
                    }
                }
                return Ok(wagons);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST: api/ids/directory/wagon/view/list_nums/
        [HttpPost]
        [Route("view/list_nums/")]
        [ResponseType(typeof(view_directory_wagon))]
        public IHttpActionResult PostViewWagonsOfNums([FromBody] List<int> nums)
        {
            try
            {
                String s_nums = String.Join(",", nums.ToArray());
                string sql = "select * from [IDS].[get_view_directory_wagon]() where num in(" + s_nums + ")";
                List<view_directory_wagon> list = this.ef_dir.Database.SqlQuery<view_directory_wagon>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon/warning
        [Route("warning")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult GetWarningWagons()
        {
            try
            {
                List<Directory_Wagons> list = this.ef_dir
                    .Context
                    .Where(w => w.bit_warning == true)
                    .ToList()
                    .Select(m => m.GetDirectory_Wagons_Directory_WagonsRent()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon/view/warning
        [Route("view/warning")]
        [ResponseType(typeof(view_directory_wagon))]
        public IHttpActionResult GetViewWarningWagons()
        {
            try
            {
                string sql = "select * from [IDS].[get_view_directory_wagon]() where bit_warning = 1";
                List<view_directory_wagon> list = this.ef_dir.Database.SqlQuery<view_directory_wagon>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon/operator/id/6
        [Route("operator/id/{id:int}")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult GetWagonsOfOperator(int? id)
        {
            try
            {
                List<Directory_Wagons> wagons = ef_dir_rent
                    .Context
                    .Where(r => r.rent_end == null && r.id_operator == id)
                    .ToList()
                    .Select(r => r.Directory_Wagons.GetDirectory_Wagons_Directory_WagonsRent())
                    .ToList();
                return Ok(wagons);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/wagon/view/operator/id/6
        [Route("view/operator/id/{id:int}")]
        [ResponseType(typeof(view_directory_wagon))]
        public IHttpActionResult GetViewWagonsOfOperator(int? id)
        {
            try
            {
                string sql = "select * from [IDS].[get_view_directory_wagon]() where id_operator_amkr = "+ id.ToString();
                List<view_directory_wagon> list = this.ef_dir.Database.SqlQuery<view_directory_wagon>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public class WagonSpecification
        {
            public int adm { get; set; }
            public string rod { get; set; }
            public int kol_os { get; set; }
            public string usl_tip { get; set; }
        }

        // POST: api/ids/directory/wagon/num/53185617/specification/
        [HttpPost]
        [Route("num/{num:int}/specification/")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult POSTWagonOfNumSpecification(int num, [FromBody]WagonSpecification specification)
        {
            try
            {
                string user = base.User.Identity.Name;
                IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
                ids_dir.Transfer_new_car_of_kis = true; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
                //ids_dir.Transfer_new_car_of_kis = false; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
                //Directory_Wagons car = ids_dir.GetCurrentDirectory_WagonsOfNum(num, 22, 60, 4, null, true, user);
                Directory_Wagons car = ids_dir.GetDirectory_WagonsOfNum(num, specification.adm, (specification.rod == null ? null : (int?)int.Parse(specification.rod)), specification.kol_os, specification.usl_tip, user).GetDirectory_Wagons_Directory_WagonsRent();
                return Ok(car.GetDirectory_Wagons_Directory_WagonsRent());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/wagon/
        [HttpPost]
        [Route("")]
        public int PostWagon([FromBody]Directory_Wagons value)
        {
            try
            {
                this.ef_dir.Add(value);
                int result = ef_dir.Save();
                return result > 0 ? value.num : result;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/wagon/num
        [HttpPut]
        [Route("num/{num:int}")]
        public int PutWagon(int num, [FromBody]Directory_Wagons value)
        {
            try
            {
                this.ef_dir.Update(value);
                int result = this.ef_dir.Save();
                return result > 0 ? value.num : result;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // PUT api/ids/directory/wagon/list
        [HttpPut]
        [Route("list")]
        public int PutListWagon([FromBody]List<Directory_Wagons> list)
        {
            try
            {
                this.ef_dir.Update(list);
                int res = this.ef_dir.Save();
                return res;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        // DELETE api/ids/directory/wagon/num
        [HttpDelete]
        [Route("num/{num:int}")]
        public int DeleteWagon(int num)
        {
            try
            {
                this.ef_dir.Delete(num);
                return this.ef_dir.Save();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

    }
}
