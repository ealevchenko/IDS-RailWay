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

    public class EFInternalMovementCars : IRepository<InternalMovementCars>
    {

        private EFDbContext db;

        public EFInternalMovementCars(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<InternalMovementCars> Context
        {
            get { return db.InternalMovementCars; }
        }

        public IEnumerable<InternalMovementCars> Get()
        {
            try
            {
                return db.Select<InternalMovementCars>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public InternalMovementCars Get(int id)
        {
            try
            {
                return db.Select<InternalMovementCars>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(InternalMovementCars item)
        {
            try
            {
                db.Insert<InternalMovementCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(InternalMovementCars item)
        {
            try
            {
                db.Update<InternalMovementCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(InternalMovementCars item)
        {
            try
            {
                InternalMovementCars dbEntry = db.InternalMovementCars.Find(item.id);
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
                InternalMovementCars item = db.Delete<InternalMovementCars>(id);
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

        public InternalMovementCars Refresh(InternalMovementCars item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<InternalMovementCars>(item.id);
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

        public void Add(IEnumerable<InternalMovementCars> items)
        {
            try
            {
                db.Inserts<InternalMovementCars>(items);
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
                db.Delete<InternalMovementCars>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<InternalMovementCars> items)
        {
            try
            {
                db.Updates<InternalMovementCars>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
