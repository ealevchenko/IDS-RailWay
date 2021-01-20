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

    public class EFDirectory_DetentionReturn : IRepository<Directory_DetentionReturn>
    {

        private EFDbContext db;

        public EFDirectory_DetentionReturn(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_DetentionReturn> Context
        {
            get { return db.Directory_DetentionReturn; }
        }

        public IEnumerable<Directory_DetentionReturn> Get()
        {
            try
            {
                return db.Select<Directory_DetentionReturn>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_DetentionReturn Get(int id)
        {
            try
            {
                return db.Select<Directory_DetentionReturn>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_DetentionReturn item)
        {
            try
            {
                db.Insert<Directory_DetentionReturn>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_DetentionReturn item)
        {
            try
            {
                db.Update<Directory_DetentionReturn>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_DetentionReturn item)
        {
            try
            {
                Directory_DetentionReturn dbEntry = db.Directory_DetentionReturn.Find(item.id);
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
                Directory_DetentionReturn item = db.Delete<Directory_DetentionReturn>(id);
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

        public Directory_DetentionReturn Refresh(Directory_DetentionReturn item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_DetentionReturn>(item.id);
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



        public void Add(IEnumerable<Directory_DetentionReturn> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_DetentionReturn> items)
        {
            throw new NotImplementedException();
        }
    }
}
