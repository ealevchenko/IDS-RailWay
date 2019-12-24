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

    public class EFWagonsTracking : IRepository<WagonsTracking>
    {

        private EFDbContext db;

        public EFWagonsTracking(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WagonsTracking> Context
        {
            get { return db.WagonsTracking; }
        }

        public IEnumerable<WagonsTracking> Get()
        {
            try
            {
                return db.Select<WagonsTracking>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WagonsTracking Get(long id)
        {
            try
            {
                return db.Select<WagonsTracking>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WagonsTracking item)
        {
            try
            {
                db.Insert<WagonsTracking>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WagonsTracking item)
        {
            try
            {
                db.Update<WagonsTracking>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WagonsTracking item)
        {
            try
            {
                WagonsTracking dbEntry = db.WagonsTracking.Find(item.id);
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
                WagonsTracking item = db.Delete<WagonsTracking>(id);
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

        public WagonsTracking Refresh(WagonsTracking item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WagonsTracking>(item.id);
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
