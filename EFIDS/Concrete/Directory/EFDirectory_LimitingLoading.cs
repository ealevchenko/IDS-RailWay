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

    public class EFDirectory_LimitingLoading : IRepository<Directory_LimitingLoading>
    {

        private EFDbContext db;

        public EFDirectory_LimitingLoading(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_LimitingLoading> Context
        {
            get { return db.Directory_LimitingLoading; }
        }

        public IEnumerable<Directory_LimitingLoading> Get()
        {
            try
            {
                return db.Select<Directory_LimitingLoading>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_LimitingLoading Get(int id)
        {
            try
            {
                return db.Select<Directory_LimitingLoading>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_LimitingLoading item)
        {
            try
            {
                db.Insert<Directory_LimitingLoading>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_LimitingLoading item)
        {
            try
            {
                db.Update<Directory_LimitingLoading>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_LimitingLoading item)
        {
            try
            {
                Directory_LimitingLoading dbEntry = db.Directory_LimitingLoading.Find(item.id);
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
                Directory_LimitingLoading item = db.Delete<Directory_LimitingLoading>(id);
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

        public Directory_LimitingLoading Refresh(Directory_LimitingLoading item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_LimitingLoading>(item.id);
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



        public void Add(IEnumerable<Directory_LimitingLoading> items)
        {
            throw new NotImplementedException();
        }

    }
}
