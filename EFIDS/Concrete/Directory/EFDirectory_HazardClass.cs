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

    public class EFDirectory_HazardClass : IStringRepository<Directory_HazardClass>
    {

        private EFDbContext db;

        public EFDirectory_HazardClass(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_HazardClass> Context
        {
            get { return db.Directory_HazardClass; }
        }

        public IEnumerable<Directory_HazardClass> Get()
        {
            try
            {
                return db.Select<Directory_HazardClass>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_HazardClass Get(string code)
        {
            try
            {
                return db.Select<Directory_HazardClass>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_HazardClass item)
        {
            try
            {
                db.Insert<Directory_HazardClass>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_HazardClass item)
        {
            try
            {
                db.Update<Directory_HazardClass>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_HazardClass item)
        {
            try
            {
                Directory_HazardClass dbEntry = db.Directory_HazardClass.Find(item.code);
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

        public void Delete(string code)
        {
            try
            {
                Directory_HazardClass item = db.Delete<Directory_HazardClass>(code);
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

        public Directory_HazardClass Refresh(Directory_HazardClass item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_HazardClass>(item.code);
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



        public void Add(IEnumerable<Directory_HazardClass> items)
        {
            throw new NotImplementedException();
        }

    }
}
