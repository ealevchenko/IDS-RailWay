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

    public class EFWagonsMotionSignals : IRepository<WagonsMotionSignals>
    {

        private EFDbContext db;

        public EFWagonsMotionSignals(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WagonsMotionSignals> Context
        {
            get { return db.WagonsMotionSignals; }
        }

        public IEnumerable<WagonsMotionSignals> Get()
        {
            try
            {
                return db.Select<WagonsMotionSignals>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public WagonsMotionSignals Get(int id)
        {
            try
            {
                return db.Select<WagonsMotionSignals>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(WagonsMotionSignals item)
        {
            try
            {
                db.Insert<WagonsMotionSignals>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(WagonsMotionSignals item)
        {
            try
            {
                db.Update<WagonsMotionSignals>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(WagonsMotionSignals item)
        {
            try
            {
                WagonsMotionSignals dbEntry = db.WagonsMotionSignals.Find(item.id);
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
                WagonsMotionSignals item = db.Delete<WagonsMotionSignals>(id);
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

        public WagonsMotionSignals Refresh(WagonsMotionSignals item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<WagonsMotionSignals>(item.id);
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



        public void Add(IEnumerable<WagonsMotionSignals> items)
        {
            throw new NotImplementedException();
        }
    }
}
