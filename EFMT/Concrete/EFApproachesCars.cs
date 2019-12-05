using EFMT.Abstract;
using EFMT.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFMT.Concrete
{

    public class EFApproachesCars : IRepository<ApproachesCars>
    {

        private EFDbContext db;

        public EFApproachesCars(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<ApproachesCars> Get()
        {
            try
            {
                return db.Select<ApproachesCars>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ApproachesCars Get(long id)
        {
            try
            {
                return db.Select<ApproachesCars>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ApproachesCars item)
        {
            try
            {
                db.Insert<ApproachesCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ApproachesCars item)
        {
            try
            {
                db.Update<ApproachesCars>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ApproachesCars item)
        {
            try
            {
                ApproachesCars dbEntry = db.ApproachesCars.Find(item.id);
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
                ApproachesCars item = db.Delete<ApproachesCars>(id);
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

        public ApproachesCars Refresh(ApproachesCars item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ApproachesCars>(item.id);
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
