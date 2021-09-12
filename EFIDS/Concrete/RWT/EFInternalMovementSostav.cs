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

    public class EFInternalMovementSostav : IRepository<InternalMovementSostav>
    {

        private EFDbContext db;

        public EFInternalMovementSostav(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<InternalMovementSostav> Context
        {
            get { return db.InternalMovementSostav; }
        }

        public IEnumerable<InternalMovementSostav> Get()
        {
            try
            {
                return db.Select<InternalMovementSostav>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public InternalMovementSostav Get(int id)
        {
            try
            {
                return db.Select<InternalMovementSostav>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(InternalMovementSostav item)
        {
            try
            {
                db.Insert<InternalMovementSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(InternalMovementSostav item)
        {
            try
            {
                db.Update<InternalMovementSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(InternalMovementSostav item)
        {
            try
            {
                InternalMovementSostav dbEntry = db.InternalMovementSostav.Find(item.id);
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
                InternalMovementSostav item = db.Delete<InternalMovementSostav>(id);
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

        public InternalMovementSostav Refresh(InternalMovementSostav item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<InternalMovementSostav>(item.id);
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

        public void Add(IEnumerable<InternalMovementSostav> items)
        {
            try
            {
                db.Inserts<InternalMovementSostav>(items);
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
                db.Delete<InternalMovementSostav>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<InternalMovementSostav> items)
        {
            try
            {
                db.Updates<InternalMovementSostav>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
