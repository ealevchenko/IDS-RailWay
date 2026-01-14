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

    public class EFWagonUsageFee : IRepository<WagonUsageFee>
    {

        private EFDbContext db;

        public EFWagonUsageFee(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WagonUsageFee> Context
        {
            get { return db.WagonUsageFee; }
        }

        public IEnumerable<WagonUsageFee> Get()
        {
            try
            {
                return db.Select<WagonUsageFee>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WagonUsageFee Get(int id)
        {
            try
            {
                return db.Select<WagonUsageFee>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WagonUsageFee item)
        {
            try
            {
                db.Insert<WagonUsageFee>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WagonUsageFee item)
        {
            try
            {
                db.Update<WagonUsageFee>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WagonUsageFee item)
        {
            try
            {
                WagonUsageFee dbEntry = db.WagonUsageFee.Find(item.id);
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

        public void Delete(int id)
        {
            try
            {
                WagonUsageFee item = db.Delete<WagonUsageFee>(id);
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

        public WagonUsageFee Refresh(WagonUsageFee item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WagonUsageFee>(item.id);
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

        public void Add(IEnumerable<WagonUsageFee> items)
        {
            try
            {
                db.Inserts<WagonUsageFee>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Delete(IEnumerable<int> items)
        {
            try
            {
                db.Delete<WagonUsageFee>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<WagonUsageFee> items)
        {
            try
            {
                db.Updates<WagonUsageFee>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
