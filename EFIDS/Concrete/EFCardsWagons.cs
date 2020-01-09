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

    public class EFCardsWagons : IRepository<CardsWagons>
    {

        private EFDbContext db;

        public EFCardsWagons(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<CardsWagons> Context
        {
            get { return db.CardsWagons; }
        }

        public IEnumerable<CardsWagons> Get()
        {
            try
            {
                return db.Select<CardsWagons>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public CardsWagons Get(int num)
        {
            try
            {
                return db.Select<CardsWagons>(num);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(CardsWagons item)
        {
            try
            {
                db.Insert<CardsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(CardsWagons item)
        {
            try
            {
                db.Update<CardsWagons>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(CardsWagons item)
        {
            try
            {
                CardsWagons dbEntry = db.CardsWagons.Find(item.num);
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
                CardsWagons item = db.Delete<CardsWagons>(num);
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

        public CardsWagons Refresh(CardsWagons item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<CardsWagons>(item.num);
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

    }
}
