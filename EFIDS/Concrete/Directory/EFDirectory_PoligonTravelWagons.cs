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

    public class EFDirectory_PoligonTravelWagons : IRepository<Directory_PoligonTravelWagons>
    {

        private EFDbContext db;

        public EFDirectory_PoligonTravelWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_PoligonTravelWagons> Context
        {
            get { return db.Directory_PoligonTravelWagons; }
        }

        public IEnumerable<Directory_PoligonTravelWagons> Get()
        {
            try
            {
                return db.Select<Directory_PoligonTravelWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_PoligonTravelWagons Get(int id)
        {
            try
            {
                return db.Select<Directory_PoligonTravelWagons>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_PoligonTravelWagons item)
        {
            try
            {
                db.Insert<Directory_PoligonTravelWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_PoligonTravelWagons item)
        {
            try
            {
                db.Update<Directory_PoligonTravelWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_PoligonTravelWagons item)
        {
            try
            {
                Directory_PoligonTravelWagons dbEntry = db.Directory_PoligonTravelWagons.Find(item.id);
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
                Directory_PoligonTravelWagons item = db.Delete<Directory_PoligonTravelWagons>(id);
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

        public Directory_PoligonTravelWagons Refresh(Directory_PoligonTravelWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_PoligonTravelWagons>(item.id);
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



        public void Add(IEnumerable<Directory_PoligonTravelWagons> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_PoligonTravelWagons> items)
        {
            throw new NotImplementedException();
        }
    }
}
