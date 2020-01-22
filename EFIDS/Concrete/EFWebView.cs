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
    public class EFWebView : IWebView
    {
        private EFDbContext db;

        public EFWebView(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<WebView> WebView
        {
            get { return db.WebView; }
        }
        /// <summary>
        /// Вернуть строку доступа просмотра web ресурса
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public WebView GetWebView(string name)
        {
            try
            {
                return WebView.Where(w=>w.name == name).FirstOrDefault();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
