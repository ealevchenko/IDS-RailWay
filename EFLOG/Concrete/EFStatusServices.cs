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

    public class EFStatusServices : IRepository<StatusServices>
    {

        private EFDbContext db;

        public EFStatusServices(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<StatusServices> Get()
        {
            try
            {
                return db.Select<StatusServices>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public StatusServices Get(long id)
        {
            try
            {
                return db.Select<StatusServices>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(StatusServices item)
        {
            try
            {
                db.Insert<StatusServices>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(StatusServices item)
        {
            try
            {
                db.Update<StatusServices>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(StatusServices item)
        {
            try
            {
                StatusServices dbEntry = db.StatusServices.Find(item.id);
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
                StatusServices item = db.Delete<StatusServices>(id);
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

        public StatusServices Refresh(StatusServices item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<StatusServices>(item.id);
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
