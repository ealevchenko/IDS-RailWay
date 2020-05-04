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

    public class EFArrival_UZ_Document_Pay : IRepository<Arrival_UZ_Document_Pay>
    {

        private EFDbContext db;

        public EFArrival_UZ_Document_Pay(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Arrival_UZ_Document_Pay> Context
        {
            get { return db.Arrival_UZ_Document_Pay; }
        }

        public IEnumerable<Arrival_UZ_Document_Pay> Get()
        {
            try
            {
                return db.Select<Arrival_UZ_Document_Pay>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Arrival_UZ_Document_Pay Get(int id)
        {
            try
            {
                return db.Select<Arrival_UZ_Document_Pay>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Arrival_UZ_Document_Pay item)
        {
            try
            {
                db.Insert<Arrival_UZ_Document_Pay>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Arrival_UZ_Document_Pay item)
        {
            try
            {
                db.Update<Arrival_UZ_Document_Pay>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Arrival_UZ_Document_Pay item)
        {
            try
            {
                Arrival_UZ_Document_Pay dbEntry = db.Arrival_UZ_Document_Pay.Find(item.id);
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
                Arrival_UZ_Document_Pay item = db.Delete<Arrival_UZ_Document_Pay>(id);
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

        public Arrival_UZ_Document_Pay Refresh(Arrival_UZ_Document_Pay item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Arrival_UZ_Document_Pay>(item.id);
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

        public void Add(IEnumerable<Arrival_UZ_Document_Pay> items)
        {
            try
            {
                db.Inserts<Arrival_UZ_Document_Pay>(items);
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
                db.Delete<Arrival_UZ_Document_Pay>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

    }
}
