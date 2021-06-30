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

    public class EFApproachesSostav : IRepository<ApproachesSostav>
    {

        private EFDbContext db;
        private string field = " [id],[file_name],[composition_index],[date_time],[create],[close],[approaches],[parent_id] ";
        private string table = " [METRANS].[ApproachesSostav] ";

        public EFApproachesSostav(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ApproachesSostav> Context
        {
            get { return db.ApproachesSostav; }
        }

        public IEnumerable<ApproachesSostav> Get()
        {
            try
            {
                return db.Select<ApproachesSostav>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ApproachesSostav Get(long id)
        {
            try
            {
                return db.Select<ApproachesSostav>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ApproachesSostav item)
        {
            try
            {
                db.Insert<ApproachesSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ApproachesSostav item)
        {
            try
            {
                db.Update<ApproachesSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ApproachesSostav item)
        {
            try
            {
                ApproachesSostav dbEntry = db.ApproachesSostav.Find(item.id);
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
                ApproachesSostav item = db.Delete<ApproachesSostav>(id);
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

        public ApproachesSostav Refresh(ApproachesSostav item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ApproachesSostav>(item.id);
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

        public ApproachesSostav GetSostavOfFileName(string file_name)
        {
            string sql = "SELECT " + field + " FROM " + table + "   where [file_name] = N'" + file_name + "' order by [date_time]";
            return this.db.Database.SqlQuery<ApproachesSostav>(sql).FirstOrDefault();   
        }
        /// <summary>
        /// Получить последний не закрытый состав
        /// </summary>
        /// <param name="composition_index"></param>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public ApproachesSostav GetNoCloseSostav(string composition_index, DateTime datetime) {
            string sql = "SELECT " + field + " FROM " + table + "   where [composition_index] = N'" + composition_index + "' and [close] is null and [approaches] is null and [date_time]<=Convert(datetime,'" + datetime.ToString("yyyy-MM-dd HH:mm:ss") + "',120) order by [date_time] desc";
            return this.db.Database.SqlQuery<ApproachesSostav>(sql).FirstOrDefault();   
        }

        public void Delete(IEnumerable<long> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
