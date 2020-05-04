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

    public class EFDirectory_CargoGroup : IRepository<Directory_CargoGroup>
    {

        private EFDbContext db;

        public EFDirectory_CargoGroup(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_CargoGroup> Context
        {
            get { return db.Directory_CargoGroup; }
        }

        public IEnumerable<Directory_CargoGroup> Get()
        {
            try
            {
                return db.Select<Directory_CargoGroup>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_CargoGroup Get(int id)
        {
            try
            {
                return db.Select<Directory_CargoGroup>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_CargoGroup item)
        {
            try
            {
                db.Insert<Directory_CargoGroup>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_CargoGroup item)
        {
            try
            {
                db.Update<Directory_CargoGroup>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_CargoGroup item)
        {
            try
            {
                Directory_CargoGroup dbEntry = db.Directory_CargoGroup.Find(item.id);
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
                Directory_CargoGroup item = db.Delete<Directory_CargoGroup>(id);
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

        public Directory_CargoGroup Refresh(Directory_CargoGroup item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_CargoGroup>(item.id);
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

        public void Add(IEnumerable<Directory_CargoGroup> items)
        {
            try
            {
                db.Inserts<Directory_CargoGroup>(items);
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
                db.Delete<Directory_CargoGroup>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
