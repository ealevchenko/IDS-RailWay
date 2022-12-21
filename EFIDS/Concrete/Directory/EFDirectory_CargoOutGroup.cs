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

    public class EFDirectory_CargoOutGroup : IRepository<Directory_CargoOutGroup>
    {

        private EFDbContext db;

        public EFDirectory_CargoOutGroup(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_CargoOutGroup> Context
        {
            get { return db.Directory_CargoOutGroup; }
        }

        public IEnumerable<Directory_CargoOutGroup> Get()
        {
            try
            {
                return db.Select<Directory_CargoOutGroup>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_CargoOutGroup Get(int id)
        {
            try
            {
                return db.Select<Directory_CargoOutGroup>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_CargoOutGroup item)
        {
            try
            {
                db.Insert<Directory_CargoOutGroup>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_CargoOutGroup item)
        {
            try
            {
                db.Update<Directory_CargoOutGroup>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_CargoOutGroup item)
        {
            try
            {
                Directory_CargoOutGroup dbEntry = db.Directory_CargoOutGroup.Find(item.id);
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
                Directory_CargoOutGroup item = db.Delete<Directory_CargoOutGroup>(id);
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

        public Directory_CargoOutGroup Refresh(Directory_CargoOutGroup item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_CargoOutGroup>(item.id);
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

        public void Add(IEnumerable<Directory_CargoOutGroup> items)
        {
            try
            {
                db.Inserts<Directory_CargoOutGroup>(items);
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
                db.Delete<Directory_CargoOutGroup>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<Directory_CargoOutGroup> items)
        {
            throw new NotImplementedException();
        }
    }
}
