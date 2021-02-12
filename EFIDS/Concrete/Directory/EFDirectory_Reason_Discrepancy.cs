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

    public class EFDirectory_Reason_Discrepancy : IRepository<Directory_Reason_Discrepancy>
    {

        private EFDbContext db;

        public EFDirectory_Reason_Discrepancy(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_Reason_Discrepancy> Context
        {
            get { return db.Directory_Reason_Discrepancy; }
        }

        public IEnumerable<Directory_Reason_Discrepancy> Get()
        {
            try
            {
                return db.Select<Directory_Reason_Discrepancy>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_Reason_Discrepancy Get(int id)
        {
            try
            {
                return db.Select<Directory_Reason_Discrepancy>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_Reason_Discrepancy item)
        {
            try
            {
                db.Insert<Directory_Reason_Discrepancy>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_Reason_Discrepancy item)
        {
            try
            {
                db.Update<Directory_Reason_Discrepancy>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_Reason_Discrepancy item)
        {
            try
            {
                Directory_Reason_Discrepancy dbEntry = db.Directory_Reason_Discrepancy.Find(item.id);
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
                Directory_Reason_Discrepancy item = db.Delete<Directory_Reason_Discrepancy>(id);
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

        public Directory_Reason_Discrepancy Refresh(Directory_Reason_Discrepancy item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_Reason_Discrepancy>(item.id);
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



        public void Add(IEnumerable<Directory_Reason_Discrepancy> items)
        {
            try
            {
                db.Inserts<Directory_Reason_Discrepancy>(items);
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
                db.Delete<Directory_Reason_Discrepancy>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }


        public void Update(IEnumerable<Directory_Reason_Discrepancy> items)
        {
            try
            {
                db.Updates<Directory_Reason_Discrepancy>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
