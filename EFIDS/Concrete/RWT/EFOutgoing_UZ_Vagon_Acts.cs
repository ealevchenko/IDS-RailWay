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

    public class EFOutgoing_UZ_Vagon_Acts : IRepository<Outgoing_UZ_Vagon_Acts>
    {

        private EFDbContext db;

        public EFOutgoing_UZ_Vagon_Acts(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Outgoing_UZ_Vagon_Acts> Context
        {
            get { return db.Outgoing_UZ_Vagon_Acts; }
        }

        public IEnumerable<Outgoing_UZ_Vagon_Acts> Get()
        {
            try
            {
                return db.Select<Outgoing_UZ_Vagon_Acts>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Outgoing_UZ_Vagon_Acts Get(int id)
        {
            try
            {
                return db.Select<Outgoing_UZ_Vagon_Acts>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Outgoing_UZ_Vagon_Acts item)
        {
            try
            {
                db.Insert<Outgoing_UZ_Vagon_Acts>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Outgoing_UZ_Vagon_Acts item)
        {
            try
            {
                db.Update<Outgoing_UZ_Vagon_Acts>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Outgoing_UZ_Vagon_Acts item)
        {
            try
            {
                Outgoing_UZ_Vagon_Acts dbEntry = db.Outgoing_UZ_Vagon_Acts.Find(item.id);
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
                Outgoing_UZ_Vagon_Acts item = db.Delete<Outgoing_UZ_Vagon_Acts>(id);
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

        public Outgoing_UZ_Vagon_Acts Refresh(Outgoing_UZ_Vagon_Acts item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Outgoing_UZ_Vagon_Acts>(item.id);
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

        public void Add(IEnumerable<Outgoing_UZ_Vagon_Acts> items)
        {
            try
            {
                db.Inserts<Outgoing_UZ_Vagon_Acts>(items);
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
                db.Delete<Outgoing_UZ_Vagon_Acts>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }



        public void Update(IEnumerable<Outgoing_UZ_Vagon_Acts> items)
        {
            throw new NotImplementedException();
        }
    }
}
