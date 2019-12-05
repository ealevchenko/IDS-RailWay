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

    public class EFApproachesSostav : IRepository<ApproachesSostav>
    {

        private EFDbContext db;

        public EFApproachesSostav(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<ApproachesSostav> Get()
        {
            try
            {
                return db.Select<ApproachesSostav>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ApproachesSostav Get(long id)
        {
            try
            {
                return db.Select<ApproachesSostav>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ApproachesSostav item)
        {
            try
            {
                db.Insert<ApproachesSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ApproachesSostav item)
        {
            try
            {
                db.Update<ApproachesSostav>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ApproachesSostav item)
        {
            try
            {
                ApproachesSostav dbEntry = db.ApproachesSostav.Find(item.id);
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
                ApproachesSostav item = db.Delete<ApproachesSostav>(id);
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

        public ApproachesSostav Refresh(ApproachesSostav item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ApproachesSostav>(item.id);
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
