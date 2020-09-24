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

    public class EFWagonInternalMovement : ILongRepository<WagonInternalMovement>
    {

        private EFDbContext db;

        public EFWagonInternalMovement(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WagonInternalMovement> Context
        {
            get { return db.WagonInternalMovement; }
        }

        public IEnumerable<WagonInternalMovement> Get()
        {
            try
            {
                return db.Select<WagonInternalMovement>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WagonInternalMovement Get(long id)
        {
            try
            {
                return db.Select<WagonInternalMovement>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WagonInternalMovement item)
        {
            try
            {
                db.Insert<WagonInternalMovement>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WagonInternalMovement item)
        {
            try
            {
                db.Update<WagonInternalMovement>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WagonInternalMovement item)
        {
            try
            {
                WagonInternalMovement dbEntry = db.WagonInternalMovement.Find(item.id);
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
                WagonInternalMovement item = db.Delete<WagonInternalMovement>(id);
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

        public WagonInternalMovement Refresh(WagonInternalMovement item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WagonInternalMovement>(item.id);
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
                db.Delete<WagonInternalMovement>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<WagonInternalMovement> items)
        {
            try
            {
                db.Inserts<WagonInternalMovement>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<WagonInternalMovement> items)
        {
            try
            {
                db.Updates<WagonInternalMovement>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
