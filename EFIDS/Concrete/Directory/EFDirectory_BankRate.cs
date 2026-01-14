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

    public class EFDirectory_BankRate : IRepository<Directory_BankRate>
    {

        private EFDbContext db;

        public EFDirectory_BankRate(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_BankRate> Context
        {
            get { return db.Directory_BankRate; }
        }

        public IEnumerable<Directory_BankRate> Get()
        {
            try
            {
                return db.Select<Directory_BankRate>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_BankRate Get(int id)
        {
            try
            {
                return db.Select<Directory_BankRate>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_BankRate item)
        {
            try
            {
                db.Insert<Directory_BankRate>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_BankRate item)
        {
            try
            {
                db.Update<Directory_BankRate>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_BankRate item)
        {
            try
            {
                Directory_BankRate dbEntry = db.Directory_BankRate.Find(item.id);
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
                Directory_BankRate item = db.Delete<Directory_BankRate>(id);
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

        public Directory_BankRate Refresh(Directory_BankRate item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_BankRate>(item.id);
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



        public void Add(IEnumerable<Directory_BankRate> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_BankRate> items)
        {
            throw new NotImplementedException();
        }
    }
}
