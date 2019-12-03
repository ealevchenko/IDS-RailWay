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

    public class EFLogs : IRepository<Logs>
    {

        private EFDbContext db;

        public EFLogs(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Logs> Get()
        {
            try
            {
                return db.Select<Logs>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e); 
                return null;
            }
        }

        public Logs Get(long id)
        {
            try
            {
                return db.Select<Logs>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Logs item)
        {
            try
            {
                db.Insert<Logs>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Logs item)
        {
            try
            {
                db.Update<Logs>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Logs item)
        {
            try
            {
                Logs dbEntry = db.Logs.Find(item.id);
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
                Logs item = db.Delete<Logs>(id);
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

        public Logs Refresh(Logs item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Logs>(item.id);
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
