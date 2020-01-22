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
    public class EFWebAccess : IWebAccess
    {
        private EFDbContext db;

        public EFWebAccess(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WebAccess> WebAccess
        {
            get { return db.WebAccess; }
        }
        /// <summary>
        /// Вернуть строку доступа к web ресурсу
        /// </summary>
        /// <param name="areas"></param>
        /// <param name="controller"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        public WebAccess GetWebAccess(string areas, string controller, string action)
        {
            try
            {
                return WebAccess.Where(a => a.areas == areas & a.controller == controller & a.action == action).FirstOrDefault();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
