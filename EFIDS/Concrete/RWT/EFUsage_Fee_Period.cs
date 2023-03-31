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

    public class EFUsage_Fee_Period : IRepository<Usage_Fee_Period>
    {

        private EFDbContext db;

        public EFUsage_Fee_Period(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Usage_Fee_Period> Context
        {
            get { return db.Usage_Fee_Period; }
        }

        public IEnumerable<Usage_Fee_Period> Get()
        {
            try
            {
                return db.Select<Usage_Fee_Period>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Usage_Fee_Period Get(int id)
        {
            try
            {
                return db.Select<Usage_Fee_Period>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Usage_Fee_Period item)
        {
            try
            {
                db.Insert<Usage_Fee_Period>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Usage_Fee_Period item)
        {
            try
            {
                db.Update<Usage_Fee_Period>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Usage_Fee_Period item)
        {
            try
            {
                Usage_Fee_Period dbEntry = db.Usage_Fee_Period.Find(item.id);
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
                Usage_Fee_Period item = db.Delete<Usage_Fee_Period>(id);
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

        public Usage_Fee_Period Refresh(Usage_Fee_Period item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Usage_Fee_Period>(item.id);
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

        public void Add(IEnumerable<Usage_Fee_Period> items)
        {
            try
            {
                db.Inserts<Usage_Fee_Period>(items);
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
                db.Delete<Usage_Fee_Period>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<Usage_Fee_Period> items)
        {
            try
            {
                db.Updates<Usage_Fee_Period>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
