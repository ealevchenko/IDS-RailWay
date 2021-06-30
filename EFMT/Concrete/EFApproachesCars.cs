using EFMT.Abstract;
using EFMT.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFMT.Concrete
{

    public class EFApproachesCars : IRepository<ApproachesCars>
    {

        private EFDbContext db;
        private string field = " [id],[id_sostav],[composition_index],[num],[country_code],[weight],[cargo_code],[train_number],[operation],[date_operation],[code_station_from],[code_station_on],[code_station_current],[count_wagons],[sum_weight],[flag_cargo],[route],[owner],[num_doc_arrived],[arrived],[parent_id],[user_name] ";
        private string table = " [METRANS].[ApproachesCars] ";

        public EFApproachesCars(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }


        public IQueryable<ApproachesCars> Context
        {
            get { return db.ApproachesCars; }
        }
      
        public IEnumerable<ApproachesCars> Get()
        {
            try
            {
                return db.Select<ApproachesCars>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ApproachesCars Get(long id)
        {
            try
            {
                return db.Select<ApproachesCars>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ApproachesCars item)
        {
            try
            {
                db.Insert<ApproachesCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ApproachesCars item)
        {
            try
            {
                db.Update<ApproachesCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ApproachesCars item)
        {
            try
            {
                ApproachesCars dbEntry = db.ApproachesCars.Find(item.id);
                if (dbEntry == null)
                {
                    Add(item);
                }
                else
                {
                    Update(item);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }

        public void Delete(long id)
        {
            try
            {
                ApproachesCars item = db.Delete<ApproachesCars>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public int Save()
        {
            try
            {
                return db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
        }

        public ApproachesCars Refresh(ApproachesCars item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ApproachesCars>(item.id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// Получить последнюю запись вагона
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public ApproachesCars GetLastCars(int num) {

            //db.ApproachesCars.
            string sql = "SELECT " + field + " FROM " + table + " where [Num]= " + num.ToString() + " order by [id] desc";
            return this.db.Database.SqlQuery<ApproachesCars>(sql).FirstOrDefault();
        }
        /// <summary>
        /// Получить все вагоны пренадлежащие указаному составу
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <returns></returns>
        public List<ApproachesCars> GetCarsOfSostav(long id_sostav) {
            string sql = "SELECT " + field + " FROM " + table + " where [id_sostav]= " + id_sostav.ToString() + " order by [id]";
            return this.db.Database.SqlQuery<ApproachesCars>(sql).ToList();   
        }

        public void Delete(IEnumerable<long> list_id)
        {
            try
            {
                db.Delete<ApproachesCars>(list_id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
