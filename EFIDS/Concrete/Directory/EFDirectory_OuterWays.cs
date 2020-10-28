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

    public class EFDirectory_OuterWays : IRepository<Directory_OuterWays>
    {

        private EFDbContext db;

        public EFDirectory_OuterWays(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_OuterWays> Context
        {
            get { return db.Directory_OuterWays; }
        }

        public IEnumerable<Directory_OuterWays> Get()
        {
            try
            {
                return db.Select<Directory_OuterWays>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_OuterWays Get(int id)
        {
            try
            {
                return db.Select<Directory_OuterWays>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_OuterWays item)
        {
            try
            {
                db.Insert<Directory_OuterWays>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_OuterWays item)
        {
            try
            {
                db.Update<Directory_OuterWays>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_OuterWays item)
        {
            try
            {
                Directory_OuterWays dbEntry = db.Directory_OuterWays.Find(item.id);
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
                Directory_OuterWays item = db.Delete<Directory_OuterWays>(id);
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

        public Directory_OuterWays Refresh(Directory_OuterWays item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_OuterWays>(item.id);
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



        public void Add(IEnumerable<Directory_OuterWays> items)
        {
            try
            {
                db.Inserts<Directory_OuterWays>(items);
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
                db.Delete<Directory_OuterWays>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<Directory_OuterWays> items)
        {
            throw new NotImplementedException();
        }
    }
}
