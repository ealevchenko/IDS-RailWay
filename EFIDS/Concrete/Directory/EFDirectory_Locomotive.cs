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

    public class EFDirectory_Locomotive : IStringRepository<Directory_Locomotive>
    {

        private EFDbContext db;

        public EFDirectory_Locomotive(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_Locomotive> Context
        {
            get { return db.Directory_Locomotive; }
        }

        public IEnumerable<Directory_Locomotive> Get()
        {
            try
            {
                return db.Select<Directory_Locomotive>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_Locomotive Get(string locomotive)
        {
            try
            {
                return db.Select<Directory_Locomotive>(locomotive);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_Locomotive item)
        {
            try
            {
                db.Insert<Directory_Locomotive>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_Locomotive item)
        {
            try
            {
                db.Update<Directory_Locomotive>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_Locomotive item)
        {
            try
            {
                Directory_Locomotive dbEntry = db.Directory_Locomotive.Find(item.locomotive);
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

        public void Delete(string locomotive)
        {
            try
            {
                Directory_Locomotive item = db.Delete<Directory_Locomotive>(locomotive);
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

        public Directory_Locomotive Refresh(Directory_Locomotive item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_Locomotive>(item.locomotive);
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



        public void Add(IEnumerable<Directory_Locomotive> items)
        {
            throw new NotImplementedException();
        }

    }
}
