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

    public class EFDirectory_CargoGNG : IRepository<Directory_CargoGNG>
    {

        private EFDbContext db;

        public EFDirectory_CargoGNG(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_CargoGNG> Context
        {
            get { return db.Directory_CargoGNG; }
        }

        public IEnumerable<Directory_CargoGNG> Get()
        {
            try
            {
                return db.Select<Directory_CargoGNG>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_CargoGNG Get(int id)
        {
            try
            {
                return db.Select<Directory_CargoGNG>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_CargoGNG item)
        {
            try
            {
                db.Insert<Directory_CargoGNG>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_CargoGNG item)
        {
            try
            {
                db.Update<Directory_CargoGNG>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_CargoGNG item)
        {
            try
            {
                Directory_CargoGNG dbEntry = db.Directory_CargoGNG.Find(item.id);
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
                Directory_CargoGNG item = db.Delete<Directory_CargoGNG>(id);
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

        public Directory_CargoGNG Refresh(Directory_CargoGNG item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_CargoGNG>(item.code);
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



        public void Add(IEnumerable<Directory_CargoGNG> items)
        {
            throw new NotImplementedException();
        }
    }
}
