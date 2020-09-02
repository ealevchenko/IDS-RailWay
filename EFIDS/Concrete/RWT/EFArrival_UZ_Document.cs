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

    public class EFArrival_UZ_Document : ILongRepository<Arrival_UZ_Document>
    {

        private EFDbContext db;

        public EFArrival_UZ_Document(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Arrival_UZ_Document> Context
        {
            get { return db.Arrival_UZ_Document; }
        }

        public IEnumerable<Arrival_UZ_Document> Get()
        {
            try
            {
                return db.Select<Arrival_UZ_Document>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Arrival_UZ_Document Get(long id)
        {
            try
            {
                return db.Select<Arrival_UZ_Document>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Arrival_UZ_Document item)
        {
            try
            {
                db.Insert<Arrival_UZ_Document>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Arrival_UZ_Document item)
        {
            try
            {
                db.Update<Arrival_UZ_Document>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Arrival_UZ_Document item)
        {
            try
            {
                Arrival_UZ_Document dbEntry = db.Arrival_UZ_Document.Find(item.id);
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
                Arrival_UZ_Document item = db.Delete<Arrival_UZ_Document>(id);
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

        public Arrival_UZ_Document Refresh(Arrival_UZ_Document item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Arrival_UZ_Document>(item.id);
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

        public void Delete(IEnumerable<long> items)
        {
            try
            {
                db.Delete<Arrival_UZ_Document>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<Arrival_UZ_Document> items)
        {
            try
            {
                db.Inserts<Arrival_UZ_Document>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<Arrival_UZ_Document> items)
        {
            try
            {
                db.Updates<Arrival_UZ_Document>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
