using EFKIS.Entities.PROM_SOSTAV;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Abstract
{
    public interface IPROM_SOSTAV
    {
        #region  Prom_Sostav

        IQueryable<Prom_Sostav> GetProm_Sostav();
        IQueryable<Prom_Sostav> GetProm_Sostav(DateTime start, DateTime stop);
        IQueryable<Prom_Sostav> GetInputProm_Sostav();
        IQueryable<Prom_Sostav> GetInputProm_Sostav(DateTime start, DateTime stop);
        IQueryable<Prom_Sostav> GetInputProm_Sostav(DateTime start, DateTime stop, bool sort);
        IQueryable<Prom_Sostav> GetOutputProm_Sostav();
        IQueryable<Prom_Sostav> GetOutputProm_Sostav(DateTime start, DateTime stop);
        IQueryable<Prom_Sostav> GetOutputProm_Sostav(DateTime start, DateTime stop, bool sort);

        IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount();
        IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount(DateTime start, DateTime stop);
        IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount(int? natur, int? day, int? month, int? year, int? hour, int? minute);
        #endregion

    }
}
