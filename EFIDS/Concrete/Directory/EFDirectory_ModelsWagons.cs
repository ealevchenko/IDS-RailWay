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

    public class EFDirectory_ModelsWagons : IStringRepository<Directory_ModelsWagons>
    {

        private EFDbContext db;

        public EFDirectory_ModelsWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_ModelsWagons> Context
        {
            get { return db.Directory_ModelsWagons; }
        }

        public IEnumerable<Directory_ModelsWagons> Get()
        {
            try
            {
                return db.Select<Directory_ModelsWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_ModelsWagons Get(string code)
        {
            try
            {
                return db.Select<Directory_ModelsWagons>(code);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_ModelsWagons item)
        {
            try
            {
                db.Insert<Directory_ModelsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_ModelsWagons item)
        {
            try
            {
                db.Update<Directory_ModelsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_ModelsWagons item)
        {
            try
            {
                Directory_ModelsWagons dbEntry = db.Directory_ModelsWagons.Find(item.code);
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
                Directory_ModelsWagons item = db.Delete<Directory_ModelsWagons>(code);
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

        public Directory_ModelsWagons Refresh(Directory_ModelsWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_ModelsWagons>(item.code);
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


        public void Add(IEnumerable<Directory_ModelsWagons> items)
        {
            throw new NotImplementedException();
        }
    }
}
