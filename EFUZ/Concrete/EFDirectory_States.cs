using EFUZ.Abstract;
using EFUZ.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFUZ.Concrete
{
    public class EFDirectory_States : IRepository<Directory_States>
    {

        private EFDbContext db;

        public EFDirectory_States(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_States> Context
        {
            get { return db.Directory_States; }
        }

        public IEnumerable<Directory_States> Get()
        {
            try
            {
                return db.Select<Directory_States>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_States Get(long id)
        {
            try
            {
                return db.Select<Directory_States>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_States item)
        {
            try
            {
                db.Insert<Directory_States>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_States item)
        {
            try
            {
                db.Update<Directory_States>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_States item)
        {
            try
            {
                Directory_States dbEntry = db.Directory_States.Find(item.id);
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

        public void Delete(long id)
        {
            try
            {
                Directory_States item = db.Delete<Directory_States>(id);
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

        public Directory_States Refresh(Directory_States item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_States>(item.id);
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
