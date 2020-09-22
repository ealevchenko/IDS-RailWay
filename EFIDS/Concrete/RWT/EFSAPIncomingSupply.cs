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

    public class EFSAPIncomingSupply : ILongRepository<SAPIncomingSupply>
    {

        private EFDbContext db;

        public EFSAPIncomingSupply(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<SAPIncomingSupply> Context
        {
            get { return db.SAPIncomingSupply; }
        }

        public IEnumerable<SAPIncomingSupply> Get()
        {
            try
            {
                return db.Select<SAPIncomingSupply>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public SAPIncomingSupply Get(long id)
        {
            try
            {
                return db.Select<SAPIncomingSupply>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(SAPIncomingSupply item)
        {
            try
            {
                db.Insert<SAPIncomingSupply>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(SAPIncomingSupply item)
        {
            try
            {
                db.Update<SAPIncomingSupply>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(SAPIncomingSupply item)
        {
            try
            {
                SAPIncomingSupply dbEntry = db.SAPIncomingSupply.Find(item.id);
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
                SAPIncomingSupply item = db.Delete<SAPIncomingSupply>(id);
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

        public SAPIncomingSupply Refresh(SAPIncomingSupply item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<SAPIncomingSupply>(item.id);
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

        public void Add(IEnumerable<SAPIncomingSupply> items)
        {
            try
            {
                db.Inserts<SAPIncomingSupply>(items);
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
                db.Delete<SAPIncomingSupply>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<SAPIncomingSupply> items)
        {
            try
            {
                db.Updates<SAPIncomingSupply>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
