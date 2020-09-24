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

    public class EFWagonInternalOperation : ILongRepository<WagonInternalOperation>
    {

        private EFDbContext db;

        public EFWagonInternalOperation(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WagonInternalOperation> Context
        {
            get { return db.WagonInternalOperation; }
        }

        public IEnumerable<WagonInternalOperation> Get()
        {
            try
            {
                return db.Select<WagonInternalOperation>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WagonInternalOperation Get(long id)
        {
            try
            {
                return db.Select<WagonInternalOperation>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WagonInternalOperation item)
        {
            try
            {
                db.Insert<WagonInternalOperation>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WagonInternalOperation item)
        {
            try
            {
                db.Update<WagonInternalOperation>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WagonInternalOperation item)
        {
            try
            {
                WagonInternalOperation dbEntry = db.WagonInternalOperation.Find(item.id);
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
                WagonInternalOperation item = db.Delete<WagonInternalOperation>(id);
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

        public WagonInternalOperation Refresh(WagonInternalOperation item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WagonInternalOperation>(item.id);
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
                db.Delete<WagonInternalOperation>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<WagonInternalOperation> items)
        {
            try
            {
                db.Inserts<WagonInternalOperation>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<WagonInternalOperation> items)
        {
            try
            {
                db.Updates<WagonInternalOperation>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
