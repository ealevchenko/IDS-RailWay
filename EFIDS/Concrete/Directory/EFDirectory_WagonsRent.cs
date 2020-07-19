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

    public class EFDirectory_WagonsRent : IRepository<Directory_WagonsRent>
    {

        private EFDbContext db;

        public EFDirectory_WagonsRent(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_WagonsRent> Context
        {
            get { return db.Directory_WagonsRent; }
        }

        public IEnumerable<Directory_WagonsRent> Get()
        {
            try
            {
                return db.Select<Directory_WagonsRent>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_WagonsRent Get(int id)
        {
            try
            {
                return db.Select<Directory_WagonsRent>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_WagonsRent item)
        {
            try
            {
                db.Insert<Directory_WagonsRent>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_WagonsRent item)
        {
            try
            {
                db.Update<Directory_WagonsRent>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_WagonsRent item)
        {
            try
            {
                Directory_WagonsRent dbEntry = db.Directory_WagonsRent.Find(item.id);
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
                Directory_WagonsRent item = db.Delete<Directory_WagonsRent>(id);
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

        public Directory_WagonsRent Refresh(Directory_WagonsRent item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_WagonsRent>(item.id);
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



        public void Add(IEnumerable<Directory_WagonsRent> items)
        {
            try
            {
                db.Inserts<Directory_WagonsRent>(items);
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
                db.Delete<Directory_WagonsRent>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<Directory_WagonsRent> items)
        {
            try
            {
                db.Updates<Directory_WagonsRent>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
