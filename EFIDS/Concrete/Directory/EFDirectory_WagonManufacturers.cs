﻿using EFIDS.Abstract;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS.Concrete
{

    public class EFDirectory_WagonManufacturers : IRepository<Directory_WagonManufacturers>
    {

        private EFDbContext db;

        public EFDirectory_WagonManufacturers(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Directory_WagonManufacturers> Context
        {
            get { return db.Directory_WagonManufacturers; }
        }

        public IEnumerable<Directory_WagonManufacturers> Get()
        {
            try
            {
                return db.Select<Directory_WagonManufacturers>();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public Directory_WagonManufacturers Get(int id)
        {
            try
            {
                return db.Select<Directory_WagonManufacturers>(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public void Add(Directory_WagonManufacturers item)
        {
            try
            {
                db.Insert<Directory_WagonManufacturers>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void Update(Directory_WagonManufacturers item)
        {
            try
            {
                db.Update<Directory_WagonManufacturers>(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void AddOrUpdate(Directory_WagonManufacturers item)
        {
            try
            {
                Directory_WagonManufacturers dbEntry = db.Directory_WagonManufacturers.Find(item.id);
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
                Directory_WagonManufacturers item = db.Delete<Directory_WagonManufacturers>(id);
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

        public Directory_WagonManufacturers Refresh(Directory_WagonManufacturers item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Directory_WagonManufacturers>(item.id);
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



        public void Add(IEnumerable<Directory_WagonManufacturers> items)
        {
            throw new NotImplementedException();
        }

        public void Delete(IEnumerable<int> list_id)
        {
            throw new NotImplementedException();
        }


        public void Update(IEnumerable<Directory_WagonManufacturers> items)
        {
            throw new NotImplementedException();
        }
    }
}
