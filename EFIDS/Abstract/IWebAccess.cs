using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFIDS.Abstract
{
    public interface IWebAccess
    {
        IQueryable<WebAccess> WebAccess { get; }
        Database Database { get; }
        WebAccess GetWebAccess(string areas, string controller, string action);
    }
}
