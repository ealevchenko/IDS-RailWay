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

    public class EFOutgoing_UZ_Document : ILongRepository<Outgoing_UZ_Document>
    {

        private EFDbContext db;

        public EFOutgoing_UZ_Document(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Outgoing_UZ_Document> Context
        {
            get { return db.Outgoing_UZ_Document; }
        }

        public IEnumerable<Outgoing_UZ_Document> Get()
        {
            try
            {
                return db.Select<Outgoing_UZ_Document>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Outgoing_UZ_Document Get(long id)
        {
            try
            {
                return db.Select<Outgoing_UZ_Document>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Outgoing_UZ_Document item)
        {
            try
            {
                db.Insert<Outgoing_UZ_Document>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Outgoing_UZ_Document item)
        {
            try
            {
                db.Update<Outgoing_UZ_Document>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Outgoing_UZ_Document item)
        {
            try
            {
                Outgoing_UZ_Document dbEntry = db.Outgoing_UZ_Document.Find(item.id);
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
                Outgoing_UZ_Document item = db.Delete<Outgoing_UZ_Document>(id);
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

        public Outgoing_UZ_Document Refresh(Outgoing_UZ_Document item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Outgoing_UZ_Document>(item.id);
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
                db.Delete<Outgoing_UZ_Document>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<Outgoing_UZ_Document> items)
        {
            try
            {
                db.Inserts<Outgoing_UZ_Document>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<Outgoing_UZ_Document> items)
        {
            try
            {
                db.Updates<Outgoing_UZ_Document>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
