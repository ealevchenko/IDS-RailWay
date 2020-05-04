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

    public class EFDirectory_CargoETSNG : IRepository<Directory_CargoETSNG>
    {

        private EFDbContext db;

        public EFDirectory_CargoETSNG(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_CargoETSNG> Context
        {
            get { return db.Directory_CargoETSNG; }
        }

        public IEnumerable<Directory_CargoETSNG> Get()
        {
            try
            {
                return db.Select<Directory_CargoETSNG>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_CargoETSNG Get(int id)
        {
            try
            {
                return db.Select<Directory_CargoETSNG>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_CargoETSNG item)
        {
            try
            {
                db.Insert<Directory_CargoETSNG>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_CargoETSNG item)
        {
            try
            {
                db.Update<Directory_CargoETSNG>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_CargoETSNG item)
        {
            try
            {
                Directory_CargoETSNG dbEntry = db.Directory_CargoETSNG.Find(item.id);
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
                Directory_CargoETSNG item = db.Delete<Directory_CargoETSNG>(id);
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

        public Directory_CargoETSNG Refresh(Directory_CargoETSNG item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_CargoETSNG>(item.id);
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



        public void Add(IEnumerable<Directory_CargoETSNG> items)
        {
            try
            {
                db.Inserts<Directory_CargoETSNG>(items);
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
                db.Delete<Directory_CargoETSNG>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
