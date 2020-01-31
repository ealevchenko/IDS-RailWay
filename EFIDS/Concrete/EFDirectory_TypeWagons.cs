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

    public class EFDirectory_TypeWagons : IRepository<Directory_TypeWagons>
    {

        private EFDbContext db;

        public EFDirectory_TypeWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_TypeWagons> Context
        {
            get { return db.Directory_TypeWagons; }
        }

        public IEnumerable<Directory_TypeWagons> Get()
        {
            try
            {
                return db.Select<Directory_TypeWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_TypeWagons Get(int id)
        {
            try
            {
                return db.Select<Directory_TypeWagons>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_TypeWagons item)
        {
            try
            {
                db.Insert<Directory_TypeWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_TypeWagons item)
        {
            try
            {
                db.Update<Directory_TypeWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_TypeWagons item)
        {
            try
            {
                Directory_TypeWagons dbEntry = db.Directory_TypeWagons.Find(item.id);
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
                Directory_TypeWagons item = db.Delete<Directory_TypeWagons>(id);
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

        public Directory_TypeWagons Refresh(Directory_TypeWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_TypeWagons>(item.id);
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



        public void Add(IEnumerable<Directory_TypeWagons> items)
        {
            throw new NotImplementedException();
        }
    }
}
