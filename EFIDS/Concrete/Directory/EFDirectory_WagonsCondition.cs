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

    public class EFDirectory_WagonsCondition : IRepository<Directory_WagonsCondition>
    {

        private EFDbContext db;

        public EFDirectory_WagonsCondition(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_WagonsCondition> Context
        {
            get { return db.Directory_WagonsCondition; }
        }

        public IEnumerable<Directory_WagonsCondition> Get()
        {
            try
            {
                return db.Select<Directory_WagonsCondition>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_WagonsCondition Get(int id)
        {
            try
            {
                return db.Select<Directory_WagonsCondition>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_WagonsCondition item)
        {
            try
            {
                db.Insert<Directory_WagonsCondition>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_WagonsCondition item)
        {
            try
            {
                db.Update<Directory_WagonsCondition>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_WagonsCondition item)
        {
            try
            {
                Directory_WagonsCondition dbEntry = db.Directory_WagonsCondition.Find(item.id);
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
                Directory_WagonsCondition item = db.Delete<Directory_WagonsCondition>(id);
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

        public Directory_WagonsCondition Refresh(Directory_WagonsCondition item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_WagonsCondition>(item.id);
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



        public void Add(IEnumerable<Directory_WagonsCondition> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
