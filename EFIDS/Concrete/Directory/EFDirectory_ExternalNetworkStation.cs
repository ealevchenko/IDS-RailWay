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

    public class EFDirectory_ExternalNetworkStation : IStringRepository<Directory_ExternalNetworkStation>
    {

        private EFDbContext db;

        public EFDirectory_ExternalNetworkStation(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_ExternalNetworkStation> Context
        {
            get { return db.Directory_ExternalNetworkStation; }
        }

        public IEnumerable<Directory_ExternalNetworkStation> Get()
        {
            try
            {
                return db.Select<Directory_ExternalNetworkStation>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_ExternalNetworkStation Get(string code)
        {
            try
            {
                return db.Select<Directory_ExternalNetworkStation>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_ExternalNetworkStation item)
        {
            try
            {
                db.Insert<Directory_ExternalNetworkStation>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_ExternalNetworkStation item)
        {
            try
            {
                db.Update<Directory_ExternalNetworkStation>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_ExternalNetworkStation item)
        {
            try
            {
                Directory_ExternalNetworkStation dbEntry = db.Directory_ExternalNetworkStation.Find(item.code);
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

        public void Delete(string code)
        {
            try
            {
                Directory_ExternalNetworkStation item = db.Delete<Directory_ExternalNetworkStation>(code);
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

        public Directory_ExternalNetworkStation Refresh(Directory_ExternalNetworkStation item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_ExternalNetworkStation>(item.code);
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


        public void Add(IEnumerable<Directory_ExternalNetworkStation> items)
        {
            throw new NotImplementedException();
        }
    }
}
