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

    public class EFDirectory_BorderCheckpoint : IRepository<Directory_BorderCheckpoint>
    {

        private EFDbContext db;

        public EFDirectory_BorderCheckpoint(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_BorderCheckpoint> Context
        {
            get { return db.Directory_BorderCheckpoint; }
        }

        public IEnumerable<Directory_BorderCheckpoint> Get()
        {
            try
            {
                return db.Select<Directory_BorderCheckpoint>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_BorderCheckpoint Get(int code)
        {
            try
            {
                return db.Select<Directory_BorderCheckpoint>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_BorderCheckpoint item)
        {
            try
            {
                db.Insert<Directory_BorderCheckpoint>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_BorderCheckpoint item)
        {
            try
            {
                db.Update<Directory_BorderCheckpoint>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_BorderCheckpoint item)
        {
            try
            {
                Directory_BorderCheckpoint dbEntry = db.Directory_BorderCheckpoint.Find(item.code);
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
                Directory_BorderCheckpoint item = db.Delete<Directory_BorderCheckpoint>(code);
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

        public Directory_BorderCheckpoint Refresh(Directory_BorderCheckpoint item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_BorderCheckpoint>(item.code);
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


        public void Add(IEnumerable<Directory_BorderCheckpoint> items)
        {
            try
            {
                db.Inserts<Directory_BorderCheckpoint>(items);
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
                db.Delete<Directory_BorderCheckpoint>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
