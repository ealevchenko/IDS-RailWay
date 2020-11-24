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

    public class EFParkState_Station : IRepository<ParkState_Station>
    {

        private EFDbContext db;

        public EFParkState_Station(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ParkState_Station> Context
        {
            get { return db.ParkState_Station; }
        }

        public IEnumerable<ParkState_Station> Get()
        {
            try
            {
                return db.Select<ParkState_Station>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ParkState_Station Get(int id)
        {
            try
            {
                return db.Select<ParkState_Station>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ParkState_Station item)
        {
            try
            {
                db.Insert<ParkState_Station>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ParkState_Station item)
        {
            try
            {
                db.Update<ParkState_Station>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ParkState_Station item)
        {
            try
            {
                ParkState_Station dbEntry = db.ParkState_Station.Find(item.id);
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
                ParkState_Station item = db.Delete<ParkState_Station>(id);
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

        public ParkState_Station Refresh(ParkState_Station item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ParkState_Station>(item.id);
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

        public void Add(IEnumerable<ParkState_Station> items)
        {
            try
            {
                db.Inserts<ParkState_Station>(items);
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
                db.Delete<ParkState_Station>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<ParkState_Station> items)
        {
            try
            {
                db.Updates<ParkState_Station>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
