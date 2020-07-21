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
    /// <summary>
    /// СПИСОК СТРАН
    /// </summary>
    [RoutePrefix("api/ids/directory/wagon")]
    public class IDS_Directory_WagonsController : ApiController
    {
        protected IRepository<Directory_Wagons> ef_dir;
        //private string field = " [id],[num],[id_countrys],[id_genus],[id_owner],[id_operator_uz],[ban_changes_operator],[id_operator],[gruzp],[kol_os],[usl_tip],[date_rem_uz],[date_rem_vag],[id_limiting],[id_type_ownership],[rent_start],[rent_end],[sign],[note],[sobstv_kis],[create],[create_user],[change],[change_user] ";
        //private string table = " [IDS].[Directory_Wagons] ";

        public IDS_Directory_WagonsController(IRepository<Directory_Wagons> dir)
        {
            this.ef_dir = dir;
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

        //// GET: api/ids/directory/cars/num/60173705/rent/start/2018-12-12T00:00:00
        //[Route("num/{num:int}/rent/start/{start:datetime}")]
        //[ResponseType(typeof(Directory_Wagons))]
        //public IHttpActionResult GetOpenRent_CarsOfNumRentStart(int num, DateTime start)
        //{
        //    try
        //    {
        //        List<Directory_Wagons> cars = this.ef_dir
        //            .Context
        //            .Where(w => w.num == num & w.rent_start == start & w.rent_end == null)
        //            .ToList()
        //            .Select(m => m.GetDirectory_Wagons()).OrderBy(c => c.rent_start).ToList();
        //        return Ok(cars);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        //// GET: api/ids/directory/cars/current/num/63958730
        //[Route("current/num/{num:int}")]
        //[ResponseType(typeof(Directory_Wagons))]
        //public IHttpActionResult GetCurrentCarsOfNum(int num)
        //{
        //    try
        //    {
        //        string user = base.User.Identity.Name;
        //        IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
        //        ids_dir.Transfer_new_car_of_kis = true; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
        //        Directory_Wagons car = ids_dir.GetCurrentDirectory_WagonsOfNum(num, user);
        //        return Ok(car);

        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        //// POST: api/ids/directory/cars/current/nums/
        //[HttpPost]
        //[Route("current/nums/")]
        //[ResponseType(typeof(Directory_Wagons))]
        //public IHttpActionResult GetCurrentCarsOfNums([FromBody] List<int> nums)
        //{
        //    try
        //    {
        //        List<Directory_Wagons> cars = new List<Directory_Wagons>();

        //        foreach (int num in nums)
        //        {
        //            Directory_Wagons car = this.ef_dir
        //                .Context
        //                .Where(c => c.num == num)
        //                .ToList()
        //                .Select(m => m.GetDirectory_Wagons())
        //                .OrderByDescending(i => i.id)
        //                .FirstOrDefault();
        //            if (car != null)
        //            {
        //                cars.Add(car);
        //            }
        //        }

        //        return Ok(cars);

        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        //// GET: api/ids/directory/cars/current/change_operator/
        //[Route("current/change_operator")]
        //[ResponseType(typeof(Directory_Wagons))]
        //public IHttpActionResult GetCurrentCarsOfChangeOperator()
        //{
        //    try
        //    {
        //        var cars = this.ef_dir
        //            .Context
        //            .Where(w => w.ban_changes_operator == true)
        //            .ToList()
        //            .Select(m => m.GetDirectory_Wagons())
        //            .GroupBy(p => p.num)
        //            .ToList()
        //            .Select(p => p.Select(m => m).OrderByDescending(x => x.id).FirstOrDefault()).ToList();
        //        //.Select(g => new
        //        //   {
        //        //       num = g.Key,
        //        //       cars = g.Select(p => p).OrderByDescending(p => p.id).FirstOrDefault()
        //        //   }).ToList();

        //        //.ToDictionary(p=>p.Key, i=>i.Select(m=>m.GetDirectory_Wagons())).ToList();
        //        return Ok(cars);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        //// GET: api/ids/directory/cars/current/operator/id
        //[Route("current/operator/id/{id:int}")]
        //[ResponseType(typeof(Directory_Wagons))]
        //public IHttpActionResult GetCurrentCarsOfOperator(int? id)
        //{
        //    try
        //    {
        //        var cars = this.ef_dir
        //            .Context
        //            .Where(w => w.id_operator == id)
        //            .ToList()
        //            .Select(m => m.GetDirectory_Wagons())
        //            .GroupBy(p => p.num)
        //            .ToList()
        //            .Select(p => p.Select(m => m).OrderByDescending(x => x.id).FirstOrDefault()).ToList();
        //        return Ok(cars);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        // GET: api/ids/directory/wagon/num/53185617/adm/22/rod/60/kol_os/4/usl_tip/null
        [Route("num/{num:int}/adm/{adm:int}/rod/{rod}/kol_os/{kol_os:int}/usl_tip/{usl_tip}")]
        [ResponseType(typeof(Directory_Wagons))]
        public IHttpActionResult GetWagonOfNum(int num, int adm, string rod, int kol_os, string usl_tip)
        {
            try
            {
                string user = base.User.Identity.Name;
                IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
                ids_dir.Transfer_new_car_of_kis = true; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
                //ids_dir.Transfer_new_car_of_kis = false; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
                //Directory_Wagons car = ids_dir.GetCurrentDirectory_WagonsOfNum(num, 22, 60, 4, null, true, user);
                Directory_Wagons car = ids_dir.GetDirectory_WagonsOfNum(num, adm, (rod == "null" ? null : (int?)int.Parse(rod)), kol_os, (usl_tip == "null" ? null : usl_tip), user).GetDirectory_Wagons_Directory_WagonsRent();
                return Ok(car.GetDirectory_Wagons_Directory_WagonsRent());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public class WagonSpecification {
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
