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

    public class EFOutgoingDetentionReturn : IRepository<OutgoingDetentionReturn>
    {

        private EFDbContext db;

        public EFOutgoingDetentionReturn(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<OutgoingDetentionReturn> Context
        {
            get { return db.OutgoingDetentionReturn; }
        }

        public IEnumerable<OutgoingDetentionReturn> Get()
        {
            try
            {
                return db.Select<OutgoingDetentionReturn>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public OutgoingDetentionReturn Get(int id)
        {
            try
            {
                return db.Select<OutgoingDetentionReturn>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(OutgoingDetentionReturn item)
        {
            try
            {
                db.Insert<OutgoingDetentionReturn>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(OutgoingDetentionReturn item)
        {
            try
            {
                db.Update<OutgoingDetentionReturn>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(OutgoingDetentionReturn item)
        {
            try
            {
                OutgoingDetentionReturn dbEntry = db.OutgoingDetentionReturn.Find(item.id);
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
                OutgoingDetentionReturn item = db.Delete<OutgoingDetentionReturn>(id);
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

        public OutgoingDetentionReturn Refresh(OutgoingDetentionReturn item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<OutgoingDetentionReturn>(item.id);
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

        public void Add(IEnumerable<OutgoingDetentionReturn> items)
        {
            try
            {
                db.Inserts<OutgoingDetentionReturn>(items);
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
                db.Delete<OutgoingDetentionReturn>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<OutgoingDetentionReturn> items)
        {
            try
            {
                db.Updates<OutgoingDetentionReturn>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
