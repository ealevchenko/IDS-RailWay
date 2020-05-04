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

    public class EFDirectory_PayerArrival : IRepository<Directory_PayerArrival>
    {

        private EFDbContext db;

        public EFDirectory_PayerArrival(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_PayerArrival> Context
        {
            get { return db.Directory_PayerArrival; }
        }

        public IEnumerable<Directory_PayerArrival> Get()
        {
            try
            {
                return db.Select<Directory_PayerArrival>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_PayerArrival Get(int code)
        {
            try
            {
                return db.Select<Directory_PayerArrival>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_PayerArrival item)
        {
            try
            {
                db.Insert<Directory_PayerArrival>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_PayerArrival item)
        {
            try
            {
                db.Update<Directory_PayerArrival>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_PayerArrival item)
        {
            try
            {
                Directory_PayerArrival dbEntry = db.Directory_PayerArrival.Find(item.code);
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

        public void Delete(int code)
        {
            try
            {
                Directory_PayerArrival item = db.Delete<Directory_PayerArrival>(code);
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

        public Directory_PayerArrival Refresh(Directory_PayerArrival item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_PayerArrival>(item.code);
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



        public void Add(IEnumerable<Directory_PayerArrival> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
