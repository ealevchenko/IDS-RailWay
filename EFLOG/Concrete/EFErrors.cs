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

    public class EFErrors : IRepository<Errors>
    {

        private EFDbContext db;

        public EFErrors(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Errors> Get()
        {
            try
            {
                return db.Select<Errors>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Errors Get(long id)
        {
            try
            {
                return db.Select<Errors>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Errors item)
        {
            try
            {
                db.Insert<Errors>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Errors item)
        {
            try
            {
                db.Update<Errors>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Errors item)
        {
            try
            {
                Errors dbEntry = db.Errors.Find(item.id);
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

            }

        }

        public void Delete(long id)
        {
            try
            {
                Errors item = db.Delete<Errors>(id);
            }
            catch (Exception e)
            {

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
                return -1;
            }
        }

        public Errors Refresh(Errors item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Errors>(item.id);
            }
            catch (Exception e)
            {
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
