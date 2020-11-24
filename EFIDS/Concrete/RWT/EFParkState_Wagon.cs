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

    public class EFParkState_Wagon : IRepository<ParkState_Wagon>
    {

        private EFDbContext db;

        public EFParkState_Wagon(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ParkState_Wagon> Context
        {
            get { return db.ParkState_Wagon; }
        }

        public IEnumerable<ParkState_Wagon> Get()
        {
            try
            {
                return db.Select<ParkState_Wagon>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ParkState_Wagon Get(int id)
        {
            try
            {
                return db.Select<ParkState_Wagon>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ParkState_Wagon item)
        {
            try
            {
                db.Insert<ParkState_Wagon>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ParkState_Wagon item)
        {
            try
            {
                db.Update<ParkState_Wagon>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ParkState_Wagon item)
        {
            try
            {
                ParkState_Wagon dbEntry = db.ParkState_Wagon.Find(item.id);
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
                ParkState_Wagon item = db.Delete<ParkState_Wagon>(id);
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

        public ParkState_Wagon Refresh(ParkState_Wagon item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ParkState_Wagon>(item.id);
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

        public void Add(IEnumerable<ParkState_Wagon> items)
        {
            try
            {
                db.Inserts<ParkState_Wagon>(items);
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
                db.Delete<ParkState_Wagon>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<ParkState_Wagon> items)
        {
            try
            {
                db.Updates<ParkState_Wagon>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
