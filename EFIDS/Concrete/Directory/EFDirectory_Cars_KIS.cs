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

    public class EFDirectory_Cars_KIS : IRepository<Directory_Cars_KIS>
    {

        private EFDbContext db;

        public EFDirectory_Cars_KIS(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_Cars_KIS> Context
        {
            get { return db.Directory_Cars_KIS; }
        }

        public IEnumerable<Directory_Cars_KIS> Get()
        {
            try
            {
                return db.Select<Directory_Cars_KIS>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_Cars_KIS Get(int id)
        {
            try
            {
                return db.Select<Directory_Cars_KIS>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_Cars_KIS item)
        {
            try
            {
                db.Insert<Directory_Cars_KIS>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_Cars_KIS item)
        {
            try
            {
                db.Update<Directory_Cars_KIS>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_Cars_KIS item)
        {
            try
            {
                Directory_Cars_KIS dbEntry = db.Directory_Cars_KIS.Find(item.num);
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
                Directory_Cars_KIS item = db.Delete<Directory_Cars_KIS>(id);
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

        public Directory_Cars_KIS Refresh(Directory_Cars_KIS item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_Cars_KIS>(item.num);
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



        public void Add(IEnumerable<Directory_Cars_KIS> items)
        {
            try
            {
                db.Inserts<Directory_Cars_KIS>(items);
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
                db.Delete<Directory_Cars_KIS>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<Directory_Cars_KIS> items)
        {
            try
            {
                db.Updates<Directory_Cars_KIS>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
