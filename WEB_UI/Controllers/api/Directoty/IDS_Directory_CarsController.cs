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
using WEB_UI.Infrastructure;

namespace WEB_UI.Controllers.api
{
    /// <summary>
    /// СПИСОК СТРАН
    /// </summary>
    [RoutePrefix("api/ids/directory/cars")]
    public class IDS_Directory_CarsController : ApiController
    {
        protected IRepository<Directory_Cars> ef_dir;

        public IDS_Directory_CarsController(IRepository<Directory_Cars> dir)
        {
            this.ef_dir = dir;
        }

        // GET: api/ids/directory/cars/all
        [Route("all")]
        [ResponseType(typeof(Directory_Cars))]
        public IHttpActionResult GetCars()
        {
            try
            {
                List<Directory_Cars> list = this.ef_dir.Context.ToList()
                    .Select(m => m.GetDirectory_Cars()).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: 
        [Route("id/{id:int}")]
        [ResponseType(typeof(Directory_Cars))]
        public IHttpActionResult GetCarsOfID(int id)
        {
            try
            {
                Directory_Cars ens = this.ef_dir
                    .Context
                    .Where(w => w.id == id)
                    .ToList()
                    .Select(m => m.GetDirectory_Cars()).FirstOrDefault();
                return Ok(ens);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cars/num/53185617
        [Route("num/{num:int}")]
        [ResponseType(typeof(Directory_Cars))]
        public IHttpActionResult GetCarsOfNum(int num)
        {
            try
            {
                List<Directory_Cars> cars = this.ef_dir
                    .Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(m => m.GetDirectory_Cars()).OrderBy(c=>c.rent_start).ToList();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cars/current/num/63958730
        [Route("current/num/{num:int}")]
        [ResponseType(typeof(Directory_Cars))]
        public IHttpActionResult GetCurrentCarsOfNum(int num)
        {
            try
            {
                //Directory_Cars car = this.ef_dir
                //    .Context
                //    .Where(w => w.num == num)
                //    .ToList()
                //    .Select(m => m.GetDirectory_Cars()).OrderByDescending(c=>c.rent_start).FirstOrDefault();
                //return Ok(car);
                string user = base.User.Identity.Name;
                IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
                ids_dir.Transfer_new_car_of_kis = true; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
                //Directory_Cars car = ids_dir.GetCurrentDirectory_CarsOfNum(num, 22, 60, 4, null, true, user);
                Directory_Cars car = ids_dir.GetCurrentDirectory_CarsOfNum(num, user);
                return Ok(car);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/ids/directory/cars/current/num/53185617/adm/22/rod/60/kol_os/4/usl_tip/null
        [Route("current/num/{num:int}/adm/{adm:int}/rod/{rod}/kol_os/{kol_os:int}/usl_tip/{usl_tip}")]
        [ResponseType(typeof(Directory_Cars))]
        public IHttpActionResult GetCurrentCarsOfNum(int num, int adm, string rod, int kol_os, string usl_tip)
        {
            try
            {
                string user = base.User.Identity.Name;
                IDSDirectory ids_dir = new IDSDirectory(service.WebAPI_IDS);
                ids_dir.Transfer_new_car_of_kis = true; // Признак создавать вагоны в справочнике ИДС по данным КИС и ИРЫ если вагон новый
                //Directory_Cars car = ids_dir.GetCurrentDirectory_CarsOfNum(num, 22, 60, 4, null, true, user);
                Directory_Cars car = ids_dir.GetCurrentDirectory_CarsOfNum(num, adm, (rod=="null"? null : (int?)int.Parse(rod)), kol_os, (usl_tip=="null" ? null: usl_tip), true, user);
                return Ok(car);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/ids/directory/cars/
        [HttpPost]
        [Route("")]
        public int PostCars([FromBody]Directory_Cars value)
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

        // PUT api/ids/directory/cars/id
        [HttpPut]
        [Route("id/{id:int}")]
        public int PutCars(int id, [FromBody]Directory_Cars value)
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

        // DELETE api/ids/directory/cars/id
        [HttpDelete]
        [Route("id/{id:int}")]
        public int DeleteCars(int id)
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
