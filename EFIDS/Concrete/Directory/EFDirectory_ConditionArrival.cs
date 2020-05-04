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

    public class EFDirectory_ConditionArrival : IRepository<Directory_ConditionArrival>
    {

        private EFDbContext db;

        public EFDirectory_ConditionArrival(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_ConditionArrival> Context
        {
            get { return db.Directory_ConditionArrival; }
        }

        public IEnumerable<Directory_ConditionArrival> Get()
        {
            try
            {
                return db.Select<Directory_ConditionArrival>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_ConditionArrival Get(int id)
        {
            try
            {
                return db.Select<Directory_ConditionArrival>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_ConditionArrival item)
        {
            try
            {
                db.Insert<Directory_ConditionArrival>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_ConditionArrival item)
        {
            try
            {
                db.Update<Directory_ConditionArrival>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_ConditionArrival item)
        {
            try
            {
                Directory_ConditionArrival dbEntry = db.Directory_ConditionArrival.Find(item.id);
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
                Directory_ConditionArrival item = db.Delete<Directory_ConditionArrival>(id);
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

        public Directory_ConditionArrival Refresh(Directory_ConditionArrival item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_ConditionArrival>(item.id);
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



        public void Add(IEnumerable<Directory_ConditionArrival> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
