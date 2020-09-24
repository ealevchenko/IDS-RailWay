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

    public class EFDirectory_WagonLoadingStatus : IRepository<Directory_WagonLoadingStatus>
    {

        private EFDbContext db;

        public EFDirectory_WagonLoadingStatus(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_WagonLoadingStatus> Context
        {
            get { return db.Directory_WagonLoadingStatus; }
        }

        public IEnumerable<Directory_WagonLoadingStatus> Get()
        {
            try
            {
                return db.Select<Directory_WagonLoadingStatus>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_WagonLoadingStatus Get(int id)
        {
            try
            {
                return db.Select<Directory_WagonLoadingStatus>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_WagonLoadingStatus item)
        {
            try
            {
                db.Insert<Directory_WagonLoadingStatus>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_WagonLoadingStatus item)
        {
            try
            {
                db.Update<Directory_WagonLoadingStatus>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_WagonLoadingStatus item)
        {
            try
            {
                Directory_WagonLoadingStatus dbEntry = db.Directory_WagonLoadingStatus.Find(item.id);
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
                Directory_WagonLoadingStatus item = db.Delete<Directory_WagonLoadingStatus>(id);
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

        public Directory_WagonLoadingStatus Refresh(Directory_WagonLoadingStatus item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_WagonLoadingStatus>(item.id);
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



        public void Add(IEnumerable<Directory_WagonLoadingStatus> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_WagonLoadingStatus> items)
        {
            throw new NotImplementedException();
        }
    }
}
