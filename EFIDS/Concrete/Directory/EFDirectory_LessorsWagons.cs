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

    public class EFDirectory_LessorsWagons : IRepository<Directory_LessorsWagons>
    {

        private EFDbContext db;

        public EFDirectory_LessorsWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_LessorsWagons> Context
        {
            get { return db.Directory_LessorsWagons; }
        }

        public IEnumerable<Directory_LessorsWagons> Get()
        {
            try
            {
                return db.Select<Directory_LessorsWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_LessorsWagons Get(int id)
        {
            try
            {
                return db.Select<Directory_LessorsWagons>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_LessorsWagons item)
        {
            try
            {
                db.Insert<Directory_LessorsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_LessorsWagons item)
        {
            try
            {
                db.Update<Directory_LessorsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_LessorsWagons item)
        {
            try
            {
                Directory_LessorsWagons dbEntry = db.Directory_LessorsWagons.Find(item.id);
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
                Directory_LessorsWagons item = db.Delete<Directory_LessorsWagons>(id);
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

        public Directory_LessorsWagons Refresh(Directory_LessorsWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_LessorsWagons>(item.id);
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



        public void Add(IEnumerable<Directory_LessorsWagons> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
