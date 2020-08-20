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

    public class EFInstructionalLettersWagon : IRepository<InstructionalLettersWagon>
    {

        private EFDbContext db;

        public EFInstructionalLettersWagon(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<InstructionalLettersWagon> Context
        {
            get { return db.InstructionalLettersWagon; }
        }

        public IEnumerable<InstructionalLettersWagon> Get()
        {
            try
            {
                return db.Select<InstructionalLettersWagon>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public InstructionalLettersWagon Get(int id)
        {
            try
            {
                return db.Select<InstructionalLettersWagon>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(InstructionalLettersWagon item)
        {
            try
            {
                db.Insert<InstructionalLettersWagon>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(InstructionalLettersWagon item)
        {
            try
            {
                db.Update<InstructionalLettersWagon>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(InstructionalLettersWagon item)
        {
            try
            {
                InstructionalLettersWagon dbEntry = db.InstructionalLettersWagon.Find(item.id);
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
                InstructionalLettersWagon item = db.Delete<InstructionalLettersWagon>(id);
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

        public InstructionalLettersWagon Refresh(InstructionalLettersWagon item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<InstructionalLettersWagon>(item.id);
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

        public void Add(IEnumerable<InstructionalLettersWagon> items)
        {
            try
            {
                db.Inserts<InstructionalLettersWagon>(items);
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
                db.Delete<InstructionalLettersWagon>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<InstructionalLettersWagon> items)
        {
            try
            {
                db.Updates<InstructionalLettersWagon>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
