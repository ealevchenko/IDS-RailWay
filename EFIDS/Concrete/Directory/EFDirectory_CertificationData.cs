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

    public class EFDirectory_CertificationData : IRepository<Directory_CertificationData>
    {

        private EFDbContext db;

        public EFDirectory_CertificationData(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_CertificationData> Context
        {
            get { return db.Directory_CertificationData; }
        }

        public IEnumerable<Directory_CertificationData> Get()
        {
            try
            {
                return db.Select<Directory_CertificationData>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_CertificationData Get(int id)
        {
            try
            {
                return db.Select<Directory_CertificationData>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_CertificationData item)
        {
            try
            {
                db.Insert<Directory_CertificationData>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_CertificationData item)
        {
            try
            {
                db.Update<Directory_CertificationData>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_CertificationData item)
        {
            try
            {
                Directory_CertificationData dbEntry = db.Directory_CertificationData.Find(item.id);
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
                Directory_CertificationData item = db.Delete<Directory_CertificationData>(id);
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

        public Directory_CertificationData Refresh(Directory_CertificationData item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_CertificationData>(item.id);
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

        public void Add(IEnumerable<Directory_CertificationData> items)
        {
            try
            {
                db.Inserts<Directory_CertificationData>(items);
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
                db.Delete<Directory_CertificationData>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
