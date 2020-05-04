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

    public class EFParksListWagons : IRepository<ParksListWagons>
    {

        private EFDbContext db;

        public EFParksListWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<ParksListWagons> Context
        {
            get { return db.ParksListWagons; }
        }

        public IEnumerable<ParksListWagons> Get()
        {
            try
            {
                return db.Select<ParksListWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public ParksListWagons Get(int num)
        {
            try
            {
                return db.Select<ParksListWagons>(num);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(ParksListWagons item)
        {
            try
            {
                db.Insert<ParksListWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Add(IEnumerable<ParksListWagons> items)
        {
            try
            {
                db.Inserts<ParksListWagons>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(ParksListWagons item)
        {
            try
            {
                db.Update<ParksListWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(ParksListWagons item)
        {
            try
            {
                ParksListWagons dbEntry = db.ParksListWagons.Find(item.num);
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

        public void Delete(int num)
        {
            try
            {
                ParksListWagons item = db.Delete<ParksListWagons>(num);
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

        public ParksListWagons Refresh(ParksListWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ParksListWagons>(item.num);
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

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }
    }
}
