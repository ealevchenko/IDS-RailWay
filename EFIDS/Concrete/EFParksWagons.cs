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

    public class EFParksWagons : IRepository<ParksWagons>
    {

        private EFDbContext db;

        public EFParksWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ParksWagons> Context
        {
            get { return db.ParksWagons; }
        }

        public IEnumerable<ParksWagons> Get()
        {
            try
            {
                return db.Select<ParksWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ParksWagons Get(int num)
        {
            try
            {
                return db.Select<ParksWagons>(num);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ParksWagons item)
        {
            try
            {
                db.Insert<ParksWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ParksWagons item)
        {
            try
            {
                db.Update<ParksWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ParksWagons item)
        {
            try
            {
                ParksWagons dbEntry = db.ParksWagons.Find(item.id);
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

        public void Delete(int num)
        {
            try
            {
                ParksWagons item = db.Delete<ParksWagons>(num);
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

        public ParksWagons Refresh(ParksWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ParksWagons>(item.id);
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

    }
}
