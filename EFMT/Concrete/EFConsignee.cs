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
    public enum mtConsignee : int { AMKR = 1 }

    public class EFConsignee : IRepository<Consignee>
    {

        private EFDbContext db;

        public EFConsignee(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Consignee> Context
        {
            get { return db.Consignee; }
        }

        public IEnumerable<Consignee> Get()
        {
            try
            {
                return db.Select<Consignee>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Consignee Get(long id)
        {
            try
            {
                return db.Select<Consignee>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Consignee item)
        {
            try
            {
                db.Insert<Consignee>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Consignee item)
        {
            try
            {
                db.Update<Consignee>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Consignee item)
        {
            try
            {
                Consignee dbEntry = db.Consignee.Find(item.code);
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
                Consignee item = db.Delete<Consignee>(id);
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

        public Consignee Refresh(Consignee item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Consignee>(item.code);
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

        public bool IsConsigneeSend(bool auxiliary, int code, mtConsignee Consignee)
        {
            Consignee consignee = db.Consignee.Where(c => c.auxiliary == auxiliary & c.code == code & c.id_consignee == (int)Consignee).FirstOrDefault();
            return consignee != null ? true : false;
        }
    }
}
