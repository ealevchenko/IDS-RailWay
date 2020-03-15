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

    public class EFArrivalSostav : ILongRepository<ArrivalSostav>
    {

        private EFDbContext db;

        public EFArrivalSostav(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ArrivalSostav> Context
        {
            get { return db.ArrivalSostav; }
        }

        public IEnumerable<ArrivalSostav> Get()
        {
            try
            {
                return db.Select<ArrivalSostav>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ArrivalSostav Get(long num)
        {
            try
            {
                return db.Select<ArrivalSostav>(num);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ArrivalSostav item)
        {
            try
            {
                db.Insert<ArrivalSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ArrivalSostav item)
        {
            try
            {
                db.Update<ArrivalSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ArrivalSostav item)
        {
            try
            {
                ArrivalSostav dbEntry = db.ArrivalSostav.Find(item.id);
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
                ArrivalSostav item = db.Delete<ArrivalSostav>(id);
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

        public ArrivalSostav Refresh(ArrivalSostav item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ArrivalSostav>(item.id);
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

        public void Add(IEnumerable<ArrivalSostav> items)
        {
            throw new NotImplementedException();
        }

    }
}
