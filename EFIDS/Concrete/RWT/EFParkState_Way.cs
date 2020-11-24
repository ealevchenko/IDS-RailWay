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

    public class EFParkState_Way : IRepository<ParkState_Way>
    {

        private EFDbContext db;

        public EFParkState_Way(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ParkState_Way> Context
        {
            get { return db.ParkState_Way; }
        }

        public IEnumerable<ParkState_Way> Get()
        {
            try
            {
                return db.Select<ParkState_Way>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ParkState_Way Get(int id)
        {
            try
            {
                return db.Select<ParkState_Way>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ParkState_Way item)
        {
            try
            {
                db.Insert<ParkState_Way>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ParkState_Way item)
        {
            try
            {
                db.Update<ParkState_Way>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ParkState_Way item)
        {
            try
            {
                ParkState_Way dbEntry = db.ParkState_Way.Find(item.id);
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
                ParkState_Way item = db.Delete<ParkState_Way>(id);
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

        public ParkState_Way Refresh(ParkState_Way item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ParkState_Way>(item.id);
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

        public void Add(IEnumerable<ParkState_Way> items)
        {
            try
            {
                db.Inserts<ParkState_Way>(items);
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
                db.Delete<ParkState_Way>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<ParkState_Way> items)
        {
            try
            {
                db.Updates<ParkState_Way>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
