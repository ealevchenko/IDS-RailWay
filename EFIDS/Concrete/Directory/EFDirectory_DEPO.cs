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

    public class EFDirectory_DEPO : IRepository<Directory_DEPO>
    {

        private EFDbContext db;

        public EFDirectory_DEPO(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_DEPO> Context
        {
            get { return db.Directory_DEPO; }
        }

        public IEnumerable<Directory_DEPO> Get()
        {
            try
            {
                return db.Select<Directory_DEPO>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_DEPO Get(int code)
        {
            try
            {
                return db.Select<Directory_DEPO>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_DEPO item)
        {
            try
            {
                db.Insert<Directory_DEPO>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_DEPO item)
        {
            try
            {
                db.Update<Directory_DEPO>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_DEPO item)
        {
            try
            {
                Directory_DEPO dbEntry = db.Directory_DEPO.Find(item.code);
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

        public void Delete(int code)
        {
            try
            {
                Directory_DEPO item = db.Delete<Directory_DEPO>(code);
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

        public Directory_DEPO Refresh(Directory_DEPO item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_DEPO>(item.code);
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



        public void Add(IEnumerable<Directory_DEPO> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_DEPO> items)
        {
            throw new NotImplementedException();
        }
    }
}
