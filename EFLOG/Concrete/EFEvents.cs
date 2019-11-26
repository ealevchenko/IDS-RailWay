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

    public class EFEvents : IRepository<Events>
    {

        private EFDbContext db;

        public EFEvents(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Events> Get()
        {
            try
            {
                return db.Select<Events>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Events Get(long id)
        {
            try
            {
                return db.Select<Events>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Events item)
        {
            try
            {
                db.Insert<Events>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Events item)
        {
            try
            {
                db.Update<Events>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Events item)
        {
            try
            {
                Events dbEntry = db.Events.Find(item.id);
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
                Events item = db.Delete<Events>(id);
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

        public Events Refresh(Events item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Events>(item.id);
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
