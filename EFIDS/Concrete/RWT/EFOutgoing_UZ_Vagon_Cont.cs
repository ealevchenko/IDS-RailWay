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

    public class EFOutgoing_UZ_Vagon_Cont : ILongRepository<Outgoing_UZ_Vagon_Cont>
    {

        private EFDbContext db;

        public EFOutgoing_UZ_Vagon_Cont(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Outgoing_UZ_Vagon_Cont> Context
        {
            get { return db.Outgoing_UZ_Vagon_Cont; }
        }

        public IEnumerable<Outgoing_UZ_Vagon_Cont> Get()
        {
            try
            {
                return db.Select<Outgoing_UZ_Vagon_Cont>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Outgoing_UZ_Vagon_Cont Get(long id)
        {
            try
            {
                return db.Select<Outgoing_UZ_Vagon_Cont>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Outgoing_UZ_Vagon_Cont item)
        {
            try
            {
                db.Insert<Outgoing_UZ_Vagon_Cont>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Outgoing_UZ_Vagon_Cont item)
        {
            try
            {
                db.Update<Outgoing_UZ_Vagon_Cont>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Outgoing_UZ_Vagon_Cont item)
        {
            try
            {
                Outgoing_UZ_Vagon_Cont dbEntry = db.Outgoing_UZ_Vagon_Cont.Find(item.id);
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

        public void Delete(long id)
        {
            try
            {
                Outgoing_UZ_Vagon_Cont item = db.Delete<Outgoing_UZ_Vagon_Cont>(id);
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

        public Outgoing_UZ_Vagon_Cont Refresh(Outgoing_UZ_Vagon_Cont item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Outgoing_UZ_Vagon_Cont>(item.id);
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

        public void Add(IEnumerable<Outgoing_UZ_Vagon_Cont> items)
        {
            try
            {
                db.Inserts<Outgoing_UZ_Vagon_Cont>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Delete(IEnumerable<long> items)
        {
            try
            {
                db.Delete<Outgoing_UZ_Vagon_Cont>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(IEnumerable<Outgoing_UZ_Vagon_Cont> items)
        {
            try
            {
                db.Updates<Outgoing_UZ_Vagon_Cont>(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

    }
}
