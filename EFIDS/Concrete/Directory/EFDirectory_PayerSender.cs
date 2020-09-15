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

    public class EFDirectory_PayerSender : IStringRepository<Directory_PayerSender>
    {

        private EFDbContext db;

        public EFDirectory_PayerSender(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_PayerSender> Context
        {
            get { return db.Directory_PayerSender; }
        }

        public IEnumerable<Directory_PayerSender> Get()
        {
            try
            {
                return db.Select<Directory_PayerSender>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_PayerSender Get(string code)
        {
            try
            {
                return db.Select<Directory_PayerSender>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_PayerSender item)
        {
            try
            {
                db.Insert<Directory_PayerSender>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_PayerSender item)
        {
            try
            {
                db.Update<Directory_PayerSender>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_PayerSender item)
        {
            try
            {
                Directory_PayerSender dbEntry = db.Directory_PayerSender.Find(item.code);
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

        public void Delete(string code)
        {
            try
            {
                Directory_PayerSender item = db.Delete<Directory_PayerSender>(code);
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

        public Directory_PayerSender Refresh(Directory_PayerSender item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_PayerSender>(item.code);
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



        public void Add(IEnumerable<Directory_PayerSender> items)
        {
            throw new NotImplementedException();
        }

    }
}
