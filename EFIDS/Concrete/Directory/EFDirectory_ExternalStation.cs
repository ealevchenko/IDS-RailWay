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

    public class EFDirectory_ExternalStation : IRepository<Directory_ExternalStation>
    {

        private EFDbContext db;

        public EFDirectory_ExternalStation(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_ExternalStation> Context
        {
            get { return db.Directory_ExternalStation; }
        }

        public IEnumerable<Directory_ExternalStation> Get()
        {
            try
            {
                return db.Select<Directory_ExternalStation>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_ExternalStation Get(int code)
        {
            try
            {
                return db.Select<Directory_ExternalStation>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_ExternalStation item)
        {
            try
            {
                db.Insert<Directory_ExternalStation>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_ExternalStation item)
        {
            try
            {
                db.Update<Directory_ExternalStation>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_ExternalStation item)
        {
            try
            {
                Directory_ExternalStation dbEntry = db.Directory_ExternalStation.Find(item.code);
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
                Directory_ExternalStation item = db.Delete<Directory_ExternalStation>(code);
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

        public Directory_ExternalStation Refresh(Directory_ExternalStation item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_ExternalStation>(item.code);
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



        public void Add(IEnumerable<Directory_ExternalStation> items)
        {
            throw new NotImplementedException();
        }
    }
}
