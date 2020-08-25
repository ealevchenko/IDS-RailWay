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

    public class EFOutgoingSostav : ILongRepository<OutgoingSostav>
    {

        private EFDbContext db;

        public EFOutgoingSostav(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<OutgoingSostav> Context
        {
            get { return db.OutgoingSostav; }
        }

        public IEnumerable<OutgoingSostav> Get()
        {
            try
            {
                return db.Select<OutgoingSostav>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public OutgoingSostav Get(long num)
        {
            try
            {
                return db.Select<OutgoingSostav>(num);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(OutgoingSostav item)
        {
            try
            {
                db.Insert<OutgoingSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(OutgoingSostav item)
        {
            try
            {
                db.Update<OutgoingSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(OutgoingSostav item)
        {
            try
            {
                OutgoingSostav dbEntry = db.OutgoingSostav.Find(item.id);
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
                OutgoingSostav item = db.Delete<OutgoingSostav>(id);
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

        public OutgoingSostav Refresh(OutgoingSostav item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<OutgoingSostav>(item.id);
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

        public void Add(IEnumerable<OutgoingSostav> items)
        {
            try
            {
                db.Inserts<OutgoingSostav>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Delete(IEnumerable<long> items)
        {
            try
            {
                db.Delete<OutgoingSostav>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
