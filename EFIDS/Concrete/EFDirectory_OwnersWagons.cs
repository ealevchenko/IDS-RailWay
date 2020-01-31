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

    public class EFDirectory_OwnersWagons : IRepository<Directory_OwnersWagons>
    {

        private EFDbContext db;

        public EFDirectory_OwnersWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_OwnersWagons> Context
        {
            get { return db.Directory_OwnersWagons; }
        }

        public IEnumerable<Directory_OwnersWagons> Get()
        {
            try
            {
                return db.Select<Directory_OwnersWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_OwnersWagons Get(int id)
        {
            try
            {
                return db.Select<Directory_OwnersWagons>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_OwnersWagons item)
        {
            try
            {
                db.Insert<Directory_OwnersWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_OwnersWagons item)
        {
            try
            {
                db.Update<Directory_OwnersWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_OwnersWagons item)
        {
            try
            {
                Directory_OwnersWagons dbEntry = db.Directory_OwnersWagons.Find(item.id);
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
                Directory_OwnersWagons item = db.Delete<Directory_OwnersWagons>(id);
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

        public Directory_OwnersWagons Refresh(Directory_OwnersWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_OwnersWagons>(item.id);
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



        public void Add(IEnumerable<Directory_OwnersWagons> items)
        {
            throw new NotImplementedException();
        }
    }
}
