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

    public class EFDirectory_TypeOwnerShip : IRepository<Directory_TypeOwnerShip>
    {

        private EFDbContext db;

        public EFDirectory_TypeOwnerShip(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_TypeOwnerShip> Context
        {
            get { return db.Directory_TypeOwnerShip; }
        }

        public IEnumerable<Directory_TypeOwnerShip> Get()
        {
            try
            {
                return db.Select<Directory_TypeOwnerShip>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_TypeOwnerShip Get(int id)
        {
            try
            {
                return db.Select<Directory_TypeOwnerShip>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_TypeOwnerShip item)
        {
            try
            {
                db.Insert<Directory_TypeOwnerShip>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_TypeOwnerShip item)
        {
            try
            {
                db.Update<Directory_TypeOwnerShip>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_TypeOwnerShip item)
        {
            try
            {
                Directory_TypeOwnerShip dbEntry = db.Directory_TypeOwnerShip.Find(item.id);
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
                Directory_TypeOwnerShip item = db.Delete<Directory_TypeOwnerShip>(id);
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

        public Directory_TypeOwnerShip Refresh(Directory_TypeOwnerShip item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_TypeOwnerShip>(item.id);
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



        public void Add(IEnumerable<Directory_TypeOwnerShip> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_TypeOwnerShip> items)
        {
            throw new NotImplementedException();
        }
    }
}
