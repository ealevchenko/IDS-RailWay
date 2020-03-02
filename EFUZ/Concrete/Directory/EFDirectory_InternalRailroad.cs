using EFUZ.Abstract;
using EFUZ.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFUZ.Concrete
{
    public class EFDirectory_InternalRailroad : IRepository<Directory_InternalRailroad>
    {

        private EFDbContext db;

        public EFDirectory_InternalRailroad(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_InternalRailroad> Context
        {
            get { return db.Directory_InternalRailroad; }
        }

        public IEnumerable<Directory_InternalRailroad> Get()
        {
            try
            {
                return db.Select<Directory_InternalRailroad>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_InternalRailroad Get(long id)
        {
            try
            {
                return db.Select<Directory_InternalRailroad>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_InternalRailroad item)
        {
            try
            {
                db.Insert<Directory_InternalRailroad>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_InternalRailroad item)
        {
            try
            {
                db.Update<Directory_InternalRailroad>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_InternalRailroad item)
        {
            try
            {
                Directory_InternalRailroad dbEntry = db.Directory_InternalRailroad.Find(item.id);
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

        public void Delete(long id)
        {
            try
            {
                Directory_InternalRailroad item = db.Delete<Directory_InternalRailroad>(id);
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

        public Directory_InternalRailroad Refresh(Directory_InternalRailroad item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_InternalRailroad>(item.id);
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

    }

}
