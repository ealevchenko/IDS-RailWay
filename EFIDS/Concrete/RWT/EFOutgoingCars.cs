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

    public class EFOutgoingCars : ILongRepository<OutgoingCars>
    {

        private EFDbContext db;

        public EFOutgoingCars(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<OutgoingCars> Context
        {
            get { return db.OutgoingCars; }
        }

        public IEnumerable<OutgoingCars> Get()
        {
            try
            {
                return db.Select<OutgoingCars>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public OutgoingCars Get(long id)
        {
            try
            {
                return db.Select<OutgoingCars>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(OutgoingCars item)
        {
            try
            {
                db.Insert<OutgoingCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(OutgoingCars item)
        {
            try
            {
                db.Update<OutgoingCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(OutgoingCars item)
        {
            try
            {
                OutgoingCars dbEntry = db.OutgoingCars.Find(item.id);
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
                OutgoingCars item = db.Delete<OutgoingCars>(id);
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

        public OutgoingCars Refresh(OutgoingCars item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<OutgoingCars>(item.id);
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
                db.Delete<OutgoingCars>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<OutgoingCars> items)
        {
            try
            {
                db.Inserts<OutgoingCars>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
