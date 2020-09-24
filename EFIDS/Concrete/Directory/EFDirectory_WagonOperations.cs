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

    public class EFDirectory_WagonOperations : IRepository<Directory_WagonOperations>
    {

        private EFDbContext db;

        public EFDirectory_WagonOperations(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_WagonOperations> Context
        {
            get { return db.Directory_WagonOperations; }
        }

        public IEnumerable<Directory_WagonOperations> Get()
        {
            try
            {
                return db.Select<Directory_WagonOperations>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_WagonOperations Get(int id)
        {
            try
            {
                return db.Select<Directory_WagonOperations>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_WagonOperations item)
        {
            try
            {
                db.Insert<Directory_WagonOperations>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_WagonOperations item)
        {
            try
            {
                db.Update<Directory_WagonOperations>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_WagonOperations item)
        {
            try
            {
                Directory_WagonOperations dbEntry = db.Directory_WagonOperations.Find(item.id);
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
                Directory_WagonOperations item = db.Delete<Directory_WagonOperations>(id);
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

        public Directory_WagonOperations Refresh(Directory_WagonOperations item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_WagonOperations>(item.id);
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



        public void Add(IEnumerable<Directory_WagonOperations> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_WagonOperations> items)
        {
            throw new NotImplementedException();
        }
    }
}
