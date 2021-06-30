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

    public class EFArrivalCars : IRepository<ArrivalCars>
    {

        private EFDbContext db;

        public EFArrivalCars(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ArrivalCars> Context
        {
            get { return db.ArrivalCars; }
        }

        public IEnumerable<ArrivalCars> Get()
        {
            try
            {
                return db.Select<ArrivalCars>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ArrivalCars Get(long id)
        {
            try
            {
                return db.Select<ArrivalCars>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ArrivalCars item)
        {
            try
            {
                db.Insert<ArrivalCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ArrivalCars item)
        {
            try
            {
                db.Update<ArrivalCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ArrivalCars item)
        {
            try
            {
                ArrivalCars dbEntry = db.ArrivalCars.Find(item.id);
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
                ArrivalCars item = db.Delete<ArrivalCars>(id);
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

        public ArrivalCars Refresh(ArrivalCars item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ArrivalCars>(item.id);
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

        public void Delete(IEnumerable<long> list_id)
        {
            try
            {
                db.Delete<ArrivalCars>(list_id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
