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

    public class EFDirectory_SpecialConditions : IRepository<Directory_SpecialConditions>
    {

        private EFDbContext db;

        public EFDirectory_SpecialConditions(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_SpecialConditions> Context
        {
            get { return db.Directory_SpecialConditions; }
        }

        public IEnumerable<Directory_SpecialConditions> Get()
        {
            try
            {
                return db.Select<Directory_SpecialConditions>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_SpecialConditions Get(int id)
        {
            try
            {
                return db.Select<Directory_SpecialConditions>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_SpecialConditions item)
        {
            try
            {
                db.Insert<Directory_SpecialConditions>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_SpecialConditions item)
        {
            try
            {
                db.Update<Directory_SpecialConditions>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_SpecialConditions item)
        {
            try
            {
                Directory_SpecialConditions dbEntry = db.Directory_SpecialConditions.Find(item.id);
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
                Directory_SpecialConditions item = db.Delete<Directory_SpecialConditions>(id);
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

        public Directory_SpecialConditions Refresh(Directory_SpecialConditions item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_SpecialConditions>(item.id);
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



        public void Add(IEnumerable<Directory_SpecialConditions> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
