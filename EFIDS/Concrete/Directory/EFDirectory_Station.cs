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

    public class EFDirectory_Station : IRepository<Directory_Station>
    {

        private EFDbContext db;

        public EFDirectory_Station(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_Station> Context
        {
            get { return db.Directory_Station; }
        }

        public IEnumerable<Directory_Station> Get()
        {
            try
            {
                return db.Select<Directory_Station>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_Station Get(int id)
        {
            try
            {
                return db.Select<Directory_Station>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_Station item)
        {
            try
            {
                db.Insert<Directory_Station>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_Station item)
        {
            try
            {
                db.Update<Directory_Station>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_Station item)
        {
            try
            {
                Directory_Station dbEntry = db.Directory_Station.Find(item.id);
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
                Directory_Station item = db.Delete<Directory_Station>(id);
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

        public Directory_Station Refresh(Directory_Station item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_Station>(item.id);
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



        public void Add(IEnumerable<Directory_Station> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
