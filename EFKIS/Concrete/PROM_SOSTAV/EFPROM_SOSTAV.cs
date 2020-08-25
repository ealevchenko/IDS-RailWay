using EFKIS.Abstract;
using EFKIS.Entities.PROM_SOSTAV;
using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Concrete.PROM_SOSTAV
{
    public class EFPROM_SOSTAV : IPROM_SOSTAV
    {
        private eventID eventID = eventID.EFKIS_PROM_SOSTAV;
        
        protected EFDbContext context = new EFDbContext();

        protected string sql_field_dt_pr = "to_date((to_char((CASE WHEN (s.D_PR_DD>=1 and s.D_PR_DD<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_MM>=1 and s.D_PR_MM<=12) THEN s.D_PR_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_YY>0) THEN s.D_PR_YY ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN s.D_PR_DD ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_MM>=1 and s.D_PR_MM<=12) THEN s.D_PR_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_YY>0) THEN s.D_PR_YY ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN (s.T_PR_HH>=0 and s.T_PR_HH<=23) THEN s.T_PR_HH ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN (s.T_PR_MI>=0 and s.T_PR_MI<=59) THEN s.T_PR_MI ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi')";
        protected string sql_field_dt = "to_date((to_char((CASE WHEN (s.D_DD>=1 and s.D_DD<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN (s.D_MM>=1 and s.D_MM<=12) THEN s.D_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_YY>0) THEN s.D_YY ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN s.D_DD ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN (s.D_MM>=1 and s.D_MM<=12) THEN s.D_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_YY>0) THEN s.D_YY ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN (s.T_HH>=0 and s.T_HH<=23) THEN s.T_HH ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN (s.T_MI>=0 and s.T_MI<=59) THEN s.T_MI ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi')";
        protected string sql_field_sostav = "ROWNUM as ID, s.N_NATUR ,s.N_VED_PR ,s.N_SOST_OT, s.N_SOST_PR, s.K_ST, s.K_ST_OTPR ,s.K_ST_PR ,s.N_PUT ,s.NAPR ,s.D_PR_DD ,s.D_PR_MM ,s.D_DD ,s.D_MM ,s.T_PR_HH ,s.T_PR_MI ,s.T_HH ,s.T_MI ,s.P_OT ,s.V_P ,s.ST_OTPR ,s.D_PR_YY ,s.D_YY ,s.DAT_VVOD";
        protected string sql_table_sostav = "FROM PROM.SOSTAV s";


        #region Prom_Sostav
        public IQueryable<Prom_Sostav> GetProm_Sostav()
        {
            try
            {
                return context.Database.SqlQuery<Prom_Sostav>("SELECT " + sql_field_sostav + "," + sql_field_dt_pr + " as DT_PR" + "," + sql_field_dt + " as DT " + sql_table_sostav).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_Sostav()"), eventID);
                return null;
            }
        }

        public IQueryable<Prom_Sostav> GetProm_Sostav(DateTime start, DateTime stop)
        {
            try
            {
                return GetProm_Sostav().Where(p => p.DT >= start & p.DT <= stop);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_Sostav(start={0}, stop={1})", start, stop), eventID);
                return null;
            }
        }

        public IQueryable<Prom_Sostav> GetInputProm_Sostav()
        {
            try
            {
                return GetProm_Sostav().Where(p => p.P_OT == 0 & p.V_P == 1 & p.K_ST != null);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetInputProm_Sostav()"), eventID);
                return null;
            }
        }

        public IQueryable<Prom_Sostav> GetInputProm_Sostav(DateTime start, DateTime stop)
        {
            try
            {
                return GetInputProm_Sostav().Where(p => p.DT_PR >= start & p.DT_PR <= stop);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetInputProm_Sostav(start={0}, stop={1})", start, stop), eventID);
                return null;
            }
        }

        public IQueryable<Prom_Sostav> GetInputProm_Sostav(DateTime start, DateTime stop, bool sort)
        {
            try
            {
                if (sort)
                {
                    return GetInputProm_Sostav(start, stop).OrderByDescending(p => p.DT);
                }
                else
                {
                    return GetInputProm_Sostav(start, stop).OrderBy(p => p.DT);
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetInputProm_Sostav(start={0}, stop={1}, sort={2})", start, stop, sort), eventID);
                return null;
            }

        }

        public IQueryable<Prom_Sostav> GetOutputProm_Sostav()
        {
            try
            {
                return GetProm_Sostav().Where(p => p.P_OT == 1);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetOutputProm_Sostav()"), eventID);
                return null;
            }
        }

        public IQueryable<Prom_Sostav> GetOutputProm_Sostav(DateTime start, DateTime stop)
        {
            try
            {
                return GetOutputProm_Sostav().Where(p => p.DT >= start & p.DT <= stop);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetOutputProm_Sostav(start={0}, stop={1})", start, stop), eventID);
                return null;
            }
        }

        public IQueryable<Prom_Sostav> GetOutputProm_Sostav(DateTime start, DateTime stop, bool sort)
        {
            try
            {
                if (sort)
                {
                    return GetOutputProm_Sostav(start, stop).OrderByDescending(p => p.DT);
                }
                else
                {
                    return GetOutputProm_Sostav(start, stop).OrderBy(p => p.DT);
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetOutputProm_Sostav(start={0}, stop={1}, sort={2})", start, stop, sort), eventID);
                return null;
            }

        }
        /// <summary>
        /// Показать все составы и количество вагонов
        /// </summary>
        /// <returns></returns>
        public IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount()
        {
            try
            {
                return context.Database.SqlQuery<Prom_SostavAndCount>("SELECT " + sql_field_sostav + "," + sql_field_dt_pr + " as DT_PR" + "," + sql_field_dt + " as DT " +
                     ",(select count(v.N_VAG) from PROM.Vagon v where (v.N_NATUR=s.N_NATUR and v.D_PR_YY=s.D_YY and v.D_PR_MM=s.D_MM and v.D_PR_DD=s.D_DD and s.P_OT=0) or (v.N_NATUR=s.N_NATUR and v.D_SD_YY=s.D_YY and v.D_SD_MM=s.D_MM and v.D_SD_DD=s.D_DD and s.P_OT=1)) as countVagon " +
                     ",(select max(v.NPP) from PROM.Vagon v where (v.N_NATUR=s.N_NATUR and v.D_PR_YY=s.D_YY and v.D_PR_MM=s.D_MM and v.D_PR_DD=s.D_DD and s.P_OT=0) or (v.N_NATUR=s.N_NATUR and v.D_SD_YY=s.D_YY and v.D_SD_MM=s.D_MM and v.D_SD_DD=s.D_DD and s.P_OT=1)) as maxVagon " +
                     ",(select count(h.N_VAG) from PROM.Nat_Hist h where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD and s.P_OT=0) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD and s.P_OT=1)) as countNatHist " +
                     ",(select max(h.NPP) from PROM.Nat_Hist h where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD and s.P_OT=0) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD and s.P_OT=1)) as maxNatHist " +
                    sql_table_sostav).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_SostavAndCount()"), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать все составы и количество вагонов за указаный период времени для отчета "Оборот АМКР-УЗ"
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        public IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount(DateTime start, DateTime stop)
        {
            try
            {

                return context.Database.SqlQuery<Prom_SostavAndCount>("SELECT " + sql_field_sostav + "," + sql_field_dt_pr + " as DT_PR" + "," + sql_field_dt + " as DT " +
                     ",(select count(v.N_VAG) from PROM.Vagon v where (v.N_NATUR=s.N_NATUR and v.D_PR_YY=s.D_YY and v.D_PR_MM=s.D_MM and v.D_PR_DD=s.D_DD and s.P_OT=0) or (v.N_NATUR=s.N_NATUR and v.D_SD_YY=s.D_YY and v.D_SD_MM=s.D_MM and v.D_SD_DD=s.D_DD and s.P_OT=1)) as countVagon " +
                     ",(select max(v.NPP) from PROM.Vagon v where (v.N_NATUR=s.N_NATUR and v.D_PR_YY=s.D_YY and v.D_PR_MM=s.D_MM and v.D_PR_DD=s.D_DD and s.P_OT=0) or (v.N_NATUR=s.N_NATUR and v.D_SD_YY=s.D_YY and v.D_SD_MM=s.D_MM and v.D_SD_DD=s.D_DD and s.P_OT=1)) as maxVagon " +
                     ",(select count(h.N_VAG) from PROM.Nat_Hist h where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD and s.P_OT=0) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD and s.P_OT=1)) as countNatHist " +
                     ",(select max(h.NPP) from PROM.Nat_Hist h where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD and s.P_OT=0) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD and s.P_OT=1)) as maxNatHist " +
                     sql_table_sostav + " WHERE " + sql_field_dt + " >= TO_DATE('" + start.ToString("dd.MM.yyyy HH:mm") + "', 'dd.mm.yyyy hh24:mi') and " + sql_field_dt + " <= TO_DATE('" + stop.ToString("dd.MM.yyyy HH:mm") + "', 'dd.mm.yyyy hh24:mi')"
                     ).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_SostavAndCount(start={0}, stop={1})", start, stop), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать состав и количество вагонов для отчета поиск по натурному листу
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <returns></returns>
        public IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount(int? natur, int? day, int? month, int? year, int? hour, int? minute)
        {
            try
            {
                if (natur != null | day != null | month != null | year != null | hour != null | minute != null)
                {
                    string sql_where = " WHERE s.N_NATUR is not null";
                    if (natur != null)
                    {
                        sql_where += " and s.N_NATUR = " + natur.ToString();
                    };
                    if (day != null)
                    {
                        sql_where += " and s.D_DD = " + day.ToString();
                    };
                    if (month != null)
                    {
                        sql_where += " and s.D_MM = " + month.ToString();
                    };
                    if (year != null)
                    {
                        sql_where += " and s.D_YY = " + year.ToString();
                    };
                    if (hour != null)
                    {
                        sql_where += " and s.T_HH = " + hour.ToString();
                    };
                    if (minute != null)
                    {
                        sql_where += " and s.T_MI = " + minute.ToString();
                    };
                    return context.Database.SqlQuery<Prom_SostavAndCount>("SELECT " + sql_field_sostav + "," + sql_field_dt_pr + " as DT_PR" + "," + sql_field_dt + " as DT " +
                         ",(select count(v.N_VAG) from PROM.Vagon v where (v.N_NATUR=s.N_NATUR and v.D_PR_YY=s.D_YY and v.D_PR_MM=s.D_MM and v.D_PR_DD=s.D_DD and s.P_OT=0) or (v.N_NATUR=s.N_NATUR and v.D_SD_YY=s.D_YY and v.D_SD_MM=s.D_MM and v.D_SD_DD=s.D_DD and s.P_OT=1)) as countVagon " +
                         ",(select max(v.NPP) from PROM.Vagon v where (v.N_NATUR=s.N_NATUR and v.D_PR_YY=s.D_YY and v.D_PR_MM=s.D_MM and v.D_PR_DD=s.D_DD and s.P_OT=0) or (v.N_NATUR=s.N_NATUR and v.D_SD_YY=s.D_YY and v.D_SD_MM=s.D_MM and v.D_SD_DD=s.D_DD and s.P_OT=1)) as maxVagon " +
                         ",(select count(h.N_VAG) from PROM.Nat_Hist h where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD and s.P_OT=0) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD and s.P_OT=1)) as countNatHist " +
                         ",(select max(h.NPP) from PROM.Nat_Hist h where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD and s.P_OT=0) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD and s.P_OT=1)) as maxNatHist " +
                         sql_table_sostav + sql_where).AsQueryable();
                }
                else
                    return new List<Prom_SostavAndCount>().AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_SostavAndCount(natur={0}, day={1}, month={2}, year={3}, hour={4}, minute={5})", natur, day, month, year, hour, minute), eventID);
                return null;
            }
        }

        #endregion
    }
}
