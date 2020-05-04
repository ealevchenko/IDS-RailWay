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

    public class EFCardsWagonsRepairs : IRepository<CardsWagonsRepairs>
    {

        private EFDbContext db;

        public EFCardsWagonsRepairs(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<CardsWagonsRepairs> Context
        {
            get { return db.CardsWagonsRepairs; }
        }

        public IEnumerable<CardsWagonsRepairs> Get()
        {
            try
            {
                return db.Select<CardsWagonsRepairs>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public CardsWagonsRepairs Get(int id)
        {
            try
            {
                return db.Select<CardsWagonsRepairs>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(CardsWagonsRepairs item)
        {
            try
            {
                db.Insert<CardsWagonsRepairs>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(CardsWagonsRepairs item)
        {
            try
            {
                db.Update<CardsWagonsRepairs>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(CardsWagonsRepairs item)
        {
            try
            {
                CardsWagonsRepairs dbEntry = db.CardsWagonsRepairs.Find(item.id);
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
                CardsWagonsRepairs item = db.Delete<CardsWagonsRepairs>(id);
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

        public CardsWagonsRepairs Refresh(CardsWagonsRepairs item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<CardsWagonsRepairs>(item.id);
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



        public void Add(IEnumerable<CardsWagonsRepairs> items)
        {
            try
            {
                db.Inserts<CardsWagonsRepairs>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Delete(IEnumerable<int> items)
        {
            try
            {
                db.Delete<CardsWagons>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
