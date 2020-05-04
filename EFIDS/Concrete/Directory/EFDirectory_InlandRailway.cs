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

    public class EFDirectory_InlandRailway : IRepository<Directory_InlandRailway>
    {

        private EFDbContext db;

        public EFDirectory_InlandRailway(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_InlandRailway> Context
        {
            get { return db.Directory_InlandRailway; }
        }

        public IEnumerable<Directory_InlandRailway> Get()
        {
            try
            {
                return db.Select<Directory_InlandRailway>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_InlandRailway Get(int code)
        {
            try
            {
                return db.Select<Directory_InlandRailway>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_InlandRailway item)
        {
            try
            {
                db.Insert<Directory_InlandRailway>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_InlandRailway item)
        {
            try
            {
                db.Update<Directory_InlandRailway>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_InlandRailway item)
        {
            try
            {
                Directory_InlandRailway dbEntry = db.Directory_InlandRailway.Find(item.code);
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
                Directory_InlandRailway item = db.Delete<Directory_InlandRailway>(code);
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

        public Directory_InlandRailway Refresh(Directory_InlandRailway item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_InlandRailway>(item.code);
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



        public void Add(IEnumerable<Directory_InlandRailway> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
