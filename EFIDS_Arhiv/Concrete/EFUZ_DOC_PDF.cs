using EFIDS_Arhiv.Abstract;
using EFIDS_Arhiv.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS_Arhiv.Concrete
{

    public class EFUZ_DOC_PDF : IStringRepository<UZ_DOC_PDF>
    {

        private EFDbContext db;

        public EFUZ_DOC_PDF(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<UZ_DOC_PDF> Context
        {
            get { return db.UZ_DOC_PDF; }
        }

        public IEnumerable<UZ_DOC_PDF> Get()
        {
            try
            {
                return db.Select<UZ_DOC_PDF>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public UZ_DOC_PDF Get(string num_doc)
        {
            try
            {
                return db.Select<UZ_DOC_PDF>(num_doc);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(UZ_DOC_PDF item)
        {
            try
            {
                db.Insert<UZ_DOC_PDF>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<UZ_DOC_PDF> item)
        {
            try
            {
                db.Inserts<UZ_DOC_PDF>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(UZ_DOC_PDF item)
        {
            try
            {
                db.Update<UZ_DOC_PDF>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(UZ_DOC_PDF item)
        {
            try
            {
                UZ_DOC_PDF dbEntry = db.UZ_DOC_PDF.Find(item.num_doc);
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
                UZ_DOC_PDF item = db.Delete<UZ_DOC_PDF>(num_doc);
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

        public UZ_DOC_PDF Refresh(UZ_DOC_PDF item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<UZ_DOC_PDF>(item.num_doc);
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
