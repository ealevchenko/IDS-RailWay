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

    public class EFSAPOutgoingSupply : ILongRepository<SAPOutgoingSupply>
    {

        private EFDbContext db;

        public EFSAPOutgoingSupply(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<SAPOutgoingSupply> Context
        {
            get { return db.SAPOutgoingSupply; }
        }

        public IEnumerable<SAPOutgoingSupply> Get()
        {
            try
            {
                return db.Select<SAPOutgoingSupply>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public SAPOutgoingSupply Get(long id)
        {
            try
            {
                return db.Select<SAPOutgoingSupply>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(SAPOutgoingSupply item)
        {
            try
            {
                db.Insert<SAPOutgoingSupply>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(SAPOutgoingSupply item)
        {
            try
            {
                db.Update<SAPOutgoingSupply>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(SAPOutgoingSupply item)
        {
            try
            {
                SAPOutgoingSupply dbEntry = db.SAPOutgoingSupply.Find(item.id);
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
                SAPOutgoingSupply item = db.Delete<SAPOutgoingSupply>(id);
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

        public SAPOutgoingSupply Refresh(SAPOutgoingSupply item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<SAPOutgoingSupply>(item.id);
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

        public void Add(IEnumerable<SAPOutgoingSupply> items)
        {
            try
            {
                db.Inserts<SAPOutgoingSupply>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Delete(IEnumerable<long> items)
        {
            try
            {
                db.Delete<SAPOutgoingSupply>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<SAPOutgoingSupply> items)
        {
            try
            {
                db.Updates<SAPOutgoingSupply>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
