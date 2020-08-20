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

    public class EFInstructionalLetters : IRepository<InstructionalLetters>
    {

        private EFDbContext db;

        public EFInstructionalLetters(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<InstructionalLetters> Context
        {
            get { return db.InstructionalLetters; }
        }

        public IEnumerable<InstructionalLetters> Get()
        {
            try
            {
                return db.Select<InstructionalLetters>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public InstructionalLetters Get(int id)
        {
            try
            {
                return db.Select<InstructionalLetters>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(InstructionalLetters item)
        {
            try
            {
                db.Insert<InstructionalLetters>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(InstructionalLetters item)
        {
            try
            {
                db.Update<InstructionalLetters>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(InstructionalLetters item)
        {
            try
            {
                InstructionalLetters dbEntry = db.InstructionalLetters.Find(item.id);
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
                InstructionalLetters item = db.Delete<InstructionalLetters>(id);
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

        public InstructionalLetters Refresh(InstructionalLetters item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<InstructionalLetters>(item.id);
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

        public void Add(IEnumerable<InstructionalLetters> items)
        {
            try
            {
                db.Inserts<InstructionalLetters>(items);
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
                db.Delete<InstructionalLetters>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<InstructionalLetters> items)
        {
            try
            {
                db.Updates<InstructionalLetters>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
