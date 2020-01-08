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

    public class EFDirectory_TypesRepairsWagons : IRepository<Directory_TypesRepairsWagons>
    {

        private EFDbContext db;

        public EFDirectory_TypesRepairsWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_TypesRepairsWagons> Context
        {
            get { return db.Directory_TypesRepairsWagons; }
        }

        public IEnumerable<Directory_TypesRepairsWagons> Get()
        {
            try
            {
                return db.Select<Directory_TypesRepairsWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_TypesRepairsWagons Get(int id)
        {
            try
            {
                return db.Select<Directory_TypesRepairsWagons>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_TypesRepairsWagons item)
        {
            try
            {
                db.Insert<Directory_TypesRepairsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_TypesRepairsWagons item)
        {
            try
            {
                db.Update<Directory_TypesRepairsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_TypesRepairsWagons item)
        {
            try
            {
                Directory_TypesRepairsWagons dbEntry = db.Directory_TypesRepairsWagons.Find(item.id);
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
                Directory_TypesRepairsWagons item = db.Delete<Directory_TypesRepairsWagons>(id);
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

        public Directory_TypesRepairsWagons Refresh(Directory_TypesRepairsWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_TypesRepairsWagons>(item.id);
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
