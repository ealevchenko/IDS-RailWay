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

    public class EFDirectory_OperatorsWagonsGroup : IRepository<Directory_OperatorsWagonsGroup>
    {

        private EFDbContext db;

        public EFDirectory_OperatorsWagonsGroup(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_OperatorsWagonsGroup> Context
        {
            get { return db.Directory_OperatorsWagonsGroup; }
        }

        public IEnumerable<Directory_OperatorsWagonsGroup> Get()
        {
            try
            {
                return db.Select<Directory_OperatorsWagonsGroup>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_OperatorsWagonsGroup Get(int id)
        {
            try
            {
                return db.Select<Directory_OperatorsWagonsGroup>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_OperatorsWagonsGroup item)
        {
            try
            {
                db.Insert<Directory_OperatorsWagonsGroup>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_OperatorsWagonsGroup item)
        {
            try
            {
                db.Update<Directory_OperatorsWagonsGroup>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_OperatorsWagonsGroup item)
        {
            try
            {
                Directory_OperatorsWagonsGroup dbEntry = db.Directory_OperatorsWagonsGroup.Find(item.id);
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
                Directory_OperatorsWagonsGroup item = db.Delete<Directory_OperatorsWagonsGroup>(id);
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

        public Directory_OperatorsWagonsGroup Refresh(Directory_OperatorsWagonsGroup item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_OperatorsWagonsGroup>(item.id);
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



        public void Add(IEnumerable<Directory_OperatorsWagonsGroup> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_OperatorsWagonsGroup> items)
        {
            throw new NotImplementedException();
        }
    }
}
