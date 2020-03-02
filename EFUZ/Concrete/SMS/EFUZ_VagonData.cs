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
    public class EFUZ_VagonData : IRepository<UZ_VagonData>
    {

        private EFSMSDbContext db;

        public EFUZ_VagonData(EFSMSDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<UZ_VagonData> Context
        {
            get { return db.UZ_VagonData; }
        }

        public IEnumerable<UZ_VagonData> Get()
        {
            try
            {
                return db.Select<UZ_VagonData>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public UZ_VagonData Get(long id)
        {
            try
            {
                return db.Select<UZ_VagonData>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(UZ_VagonData item)
        {
            try
            {
                db.Insert<UZ_VagonData>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(UZ_VagonData item)
        {
            try
            {
                db.Update<UZ_VagonData>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(UZ_VagonData item)
        {
            try
            {
                UZ_VagonData dbEntry = db.UZ_VagonData.Find(item.id);
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
                UZ_VagonData item = db.Delete<UZ_VagonData>(id);
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

        public UZ_VagonData Refresh(UZ_VagonData item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<UZ_VagonData>(item.id);
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
