using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS.Abstract
{
    public interface IWebView
    {
        IQueryable<WebView> WebView { get; }
        Database Database { get; }
        WebView GetWebView(string name);
    }
}
