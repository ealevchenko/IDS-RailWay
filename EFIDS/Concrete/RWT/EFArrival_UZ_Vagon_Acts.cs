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

    public class EFArrival_UZ_Vagon_Acts : IRepository<Arrival_UZ_Vagon_Acts>
    {

        private EFDbContext db;

        public EFArrival_UZ_Vagon_Acts(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Arrival_UZ_Vagon_Acts> Context
        {
            get { return db.Arrival_UZ_Vagon_Acts; }
        }

        public IEnumerable<Arrival_UZ_Vagon_Acts> Get()
        {
            try
            {
                return db.Select<Arrival_UZ_Vagon_Acts>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Arrival_UZ_Vagon_Acts Get(int id)
        {
            try
            {
                return db.Select<Arrival_UZ_Vagon_Acts>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Arrival_UZ_Vagon_Acts item)
        {
            try
            {
                db.Insert<Arrival_UZ_Vagon_Acts>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Arrival_UZ_Vagon_Acts item)
        {
            try
            {
                db.Update<Arrival_UZ_Vagon_Acts>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Arrival_UZ_Vagon_Acts item)
        {
            try
            {
                Arrival_UZ_Vagon_Acts dbEntry = db.Arrival_UZ_Vagon_Acts.Find(item.id);
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
                Arrival_UZ_Vagon_Acts item = db.Delete<Arrival_UZ_Vagon_Acts>(id);
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

        public Arrival_UZ_Vagon_Acts Refresh(Arrival_UZ_Vagon_Acts item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Arrival_UZ_Vagon_Acts>(item.id);
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

        public void Add(IEnumerable<Arrival_UZ_Vagon_Acts> items)
        {
            try
            {
                db.Inserts<Arrival_UZ_Vagon_Acts>(items);
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
                db.Delete<Arrival_UZ_Vagon_Acts>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }



        public void Update(IEnumerable<Arrival_UZ_Vagon_Acts> items)
        {
            throw new NotImplementedException();
        }
    }
}
