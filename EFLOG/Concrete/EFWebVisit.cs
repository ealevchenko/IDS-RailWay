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

    public class EFWebVisit : IRepository<WebVisit>
    {

        private EFDbContext db;

        public EFWebVisit(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<WebVisit> Get()
        {
            try
            {
                return db.Select<WebVisit>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public WebVisit Get(long id)
        {
            try
            {
                return db.Select<WebVisit>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(WebVisit item)
        {
            try
            {
                db.Insert<WebVisit>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(WebVisit item)
        {
            try
            {
                db.Update<WebVisit>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(WebVisit item)
        {
            try
            {
                WebVisit dbEntry = db.WebVisit.Find(item.id);
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
                WebVisit item = db.Delete<WebVisit>(id);
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

        public WebVisit Refresh(WebVisit item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WebVisit>(item.id);
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
