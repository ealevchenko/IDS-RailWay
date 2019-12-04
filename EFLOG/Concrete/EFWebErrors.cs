using EFLOG.Abstract;
using EFLOG.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFLOG.Concrete
{

    public class EFWebErrors : IRepository<WebErrors>
    {

        private EFDbContext db;

        public EFWebErrors(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<WebErrors> Get()
        {
            try
            {
                return db.Select<WebErrors>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WebErrors Get(long id)
        {
            try
            {
                return db.Select<WebErrors>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WebErrors item)
        {
            try
            {
                db.Insert<WebErrors>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WebErrors item)
        {
            try
            {
                db.Update<WebErrors>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WebErrors item)
        {
            try
            {
                WebErrors dbEntry = db.WebErrors.Find(item.id);
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
                WebErrors item = db.Delete<WebErrors>(id);
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

        public WebErrors Refresh(WebErrors item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WebErrors>(item.id);
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

    }
}
