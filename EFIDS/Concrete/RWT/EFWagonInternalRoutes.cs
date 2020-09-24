using EFIDS.Abstract;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS.Concrete
{

    public class EFWagonInternalRoutes : ILongRepository<WagonInternalRoutes>
    {

        private EFDbContext db;

        public EFWagonInternalRoutes(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WagonInternalRoutes> Context
        {
            get { return db.WagonInternalRoutes; }
        }

        public IEnumerable<WagonInternalRoutes> Get()
        {
            try
            {
                return db.Select<WagonInternalRoutes>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WagonInternalRoutes Get(long id)
        {
            try
            {
                return db.Select<WagonInternalRoutes>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WagonInternalRoutes item)
        {
            try
            {
                db.Insert<WagonInternalRoutes>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WagonInternalRoutes item)
        {
            try
            {
                db.Update<WagonInternalRoutes>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WagonInternalRoutes item)
        {
            try
            {
                WagonInternalRoutes dbEntry = db.WagonInternalRoutes.Find(item.id);
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
                WagonInternalRoutes item = db.Delete<WagonInternalRoutes>(id);
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

        public WagonInternalRoutes Refresh(WagonInternalRoutes item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WagonInternalRoutes>(item.id);
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

        public void Delete(IEnumerable<long> items)
        {
            try
            {
                db.Delete<WagonInternalRoutes>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<WagonInternalRoutes> items)
        {
            try
            {
                db.Inserts<WagonInternalRoutes>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<WagonInternalRoutes> items)
        {
            try
            {
                db.Updates<WagonInternalRoutes>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
