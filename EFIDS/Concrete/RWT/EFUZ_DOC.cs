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

    public class EFUZ_DOC : IStringRepository<UZ_DOC>
    {

        private EFDbContext db;

        public EFUZ_DOC(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<UZ_DOC> Context
        {
            get { return db.UZ_DOC; }
        }

        public IEnumerable<UZ_DOC> Get()
        {
            try
            {
                return db.Select<UZ_DOC>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public UZ_DOC Get(string num_doc)
        {
            try
            {
                return db.Select<UZ_DOC>(num_doc);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(UZ_DOC item)
        {
            try
            {
                db.Insert<UZ_DOC>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<UZ_DOC> item)
        {
            try
            {
                db.Inserts<UZ_DOC>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(UZ_DOC item)
        {
            try
            {
                db.Update<UZ_DOC>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(UZ_DOC item)
        {
            try
            {
                UZ_DOC dbEntry = db.UZ_DOC.Find(item.num_doc);
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

        public void Delete(string num_doc)
        {
            try
            {
                UZ_DOC item = db.Delete<UZ_DOC>(num_doc);
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

        public UZ_DOC Refresh(UZ_DOC item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<UZ_DOC>(item.num_doc);
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
