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
    public class EFUZ_Data : IRepository<UZ_Data>
    {

        private EFSMSDbContext db;

        public EFUZ_Data(EFSMSDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<UZ_Data> Context
        {
            get { return db.UZ_Data; }
        }

        public IEnumerable<UZ_Data> Get()
        {
            try
            {
                return db.Select<UZ_Data>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public UZ_Data Get(long id)
        {
            try
            {
                return db.Select<UZ_Data>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(UZ_Data item)
        {
            try
            {
                db.Insert<UZ_Data>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(UZ_Data item)
        {
            try
            {
                db.Update<UZ_Data>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(UZ_Data item)
        {
            try
            {
                UZ_Data dbEntry = db.UZ_Data.Find(item.id);
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
                UZ_Data item = db.Delete<UZ_Data>(id);
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

        public UZ_Data Refresh(UZ_Data item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<UZ_Data>(item.id);
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
