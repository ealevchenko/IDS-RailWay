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

    public class EFDirectory_LocomotiveStatus : IRepository<Directory_LocomotiveStatus>
    {

        private EFDbContext db;

        public EFDirectory_LocomotiveStatus(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_LocomotiveStatus> Context
        {
            get { return db.Directory_LocomotiveStatus; }
        }

        public IEnumerable<Directory_LocomotiveStatus> Get()
        {
            try
            {
                return db.Select<Directory_LocomotiveStatus>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_LocomotiveStatus Get(int id)
        {
            try
            {
                return db.Select<Directory_LocomotiveStatus>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_LocomotiveStatus item)
        {
            try
            {
                db.Insert<Directory_LocomotiveStatus>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_LocomotiveStatus item)
        {
            try
            {
                db.Update<Directory_LocomotiveStatus>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_LocomotiveStatus item)
        {
            try
            {
                Directory_LocomotiveStatus dbEntry = db.Directory_LocomotiveStatus.Find(item.id);
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
                Directory_LocomotiveStatus item = db.Delete<Directory_LocomotiveStatus>(id);
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

        public Directory_LocomotiveStatus Refresh(Directory_LocomotiveStatus item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_LocomotiveStatus>(item.id);
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



        public void Add(IEnumerable<Directory_LocomotiveStatus> items)
        {
            try
            {
                db.Inserts<Directory_LocomotiveStatus>(items);
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
                db.Delete<Directory_LocomotiveStatus>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<Directory_LocomotiveStatus> items)
        {
            throw new NotImplementedException();
        }
    }
}
