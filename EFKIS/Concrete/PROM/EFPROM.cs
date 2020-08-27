using EFKIS.Abstract;
using EFKIS.Entities.PROM;
using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Concrete.PROM
{
    public class EFPROM : IPROM
    {
        private eventID eventID = eventID.EFKIS_PROM_SOSTAV;
        
        protected EFDbContext context = new EFDbContext();

        protected string sql_field_dt_pr = "to_date((to_char((CASE WHEN (s.D_PR_DD>=1 and s.D_PR_DD<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_MM>=1 and s.D_PR_MM<=12) THEN s.D_PR_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_YY>0) THEN s.D_PR_YY ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN s.D_PR_DD ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_MM>=1 and s.D_PR_MM<=12) THEN s.D_PR_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_PR_YY>0) THEN s.D_PR_YY ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN (s.T_PR_HH>=0 and s.T_PR_HH<=23) THEN s.T_PR_HH ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN (s.T_PR_MI>=0 and s.T_PR_MI<=59) THEN s.T_PR_MI ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi')";
        protected string sql_field_dt = "to_date((to_char((CASE WHEN (s.D_DD>=1 and s.D_DD<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN (s.D_MM>=1 and s.D_MM<=12) THEN s.D_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_YY>0) THEN s.D_YY ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN s.D_DD ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN (s.D_MM>=1 and s.D_MM<=12) THEN s.D_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (s.D_YY>0) THEN s.D_YY ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN (s.T_HH>=0 and s.T_HH<=23) THEN s.T_HH ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN (s.T_MI>=0 and s.T_MI<=59) THEN s.T_MI ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi')";
        protected string sql_field_sostav = "ROWNUM as ID, s.N_NATUR ,s.N_VED_PR ,s.N_SOST_OT, s.N_SOST_PR, s.K_ST, s.K_ST_OTPR ,s.K_ST_PR ,s.N_PUT ,s.NAPR ,s.D_PR_DD ,s.D_PR_MM ,s.D_DD ,s.D_MM ,s.T_PR_HH ,s.T_PR_MI ,s.T_HH ,s.T_MI ,s.P_OT ,s.V_P ,s.ST_OTPR ,s.D_PR_YY ,s.D_YY ,s.DAT_VVOD";
        protected string sql_table_sostav = "FROM PROM.SOSTAV s";

        protected static string field_key = "ROWNUM as ID, ";   
        // строки для формирования запроса к NAT_HIST
        protected static string field_nathist = " h.N_VAG, h.NPP, h.D_PR_DD, h.D_PR_MM, h.D_PR_YY, h.T_PR_HH, h.T_PR_MI, h.D_SD_DD, h.D_SD_MM, h.D_SD_YY, h.T_SD_HH, h.T_SD_MI, h.GODN, h.K_ST_KMK, h.K_POL_GR, h.K_GR, h.N_VED_PR, h.N_NAK_MPS, h.OTPRAV, h.PRIM_GR, h.WES_GR, h.N_NATUR, h.N_PUT, h.K_ST, h.K_OP, h.K_FRONT, h.N_NATUR_T, h.GODN_T, h.K_GR_T, h.WES_GR_T, h.K_OTPR_GR, h.K_ST_OTPR, h.K_ST_NAZN, h.ST_OTPR, h.ZADER, h.NEPR, h.UDOST, h.SERTIF, h.KOD_STRAN, h.KOD_SD, h.NETO, h.BRUTO, h.TARA, h.DAT_VVOD ";
        protected static string field_nathist_dt_pr = " to_date((to_char((CASE WHEN (h.D_PR_DD>=1 and h.D_PR_DD<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN (h.D_PR_MM>=1 and h.D_PR_MM<=12) THEN h.D_PR_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (h.D_PR_YY>0) THEN h.D_PR_YY ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN h.D_PR_DD ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN (h.D_PR_MM>=1 and h.D_PR_MM<=12) THEN h.D_PR_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (h.D_PR_YY>0) THEN h.D_PR_YY ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN (h.T_PR_HH>=0 and h.T_PR_HH<=23) THEN h.T_PR_HH ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN (h.T_PR_MI>=0 and h.T_PR_MI<=59) THEN h.T_PR_MI ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi') ";
        protected static string field_nathist_dt_sd = " to_date((to_char((CASE WHEN (h.D_SD_DD>=1 and h.D_SD_DD<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN (h.D_SD_MM>=1 and h.D_SD_MM<=12) THEN h.D_SD_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (h.D_SD_YY>0) THEN h.D_SD_YY ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN h.D_SD_DD ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN (h.D_SD_MM>=1 and h.D_SD_MM<=12) THEN h.D_SD_MM ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN (h.D_SD_YY>0) THEN h.D_SD_YY ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN (h.T_SD_HH>=0 and h.T_SD_HH<=23) THEN h.T_SD_HH ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN (h.T_SD_MI>=0 and h.T_SD_MI<=59) THEN h.T_SD_MI ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi') ";
        protected static string field_nathist_dt_pr_null = " (CASE WHEN (h.D_PR_DD is null and h.D_PR_MM is null and h.D_PR_YY is null and h.T_PR_HH is null and h.T_PR_MI is null) THEN null ELSE " + field_nathist_dt_pr + " END ) ";
        protected static string field_nathist_dt_sd_null = " (CASE WHEN (h.D_SD_DD is null and h.D_SD_MM is null and h.D_SD_YY is null and h.T_SD_HH is null and h.T_SD_MI is null) THEN null ELSE " + field_nathist_dt_sd + " END ) ";
        protected static string nathist_table = " FROM PROM.NAT_HIST h ";
        protected static string order_nathist_field_dt_pr = " ORDER BY h.D_PR_YY, h.D_PR_MM, h.D_PR_DD, h.T_PR_HH, h.T_PR_MI ";
        protected static string order_nathist_field_dt_pr_desc = " ORDER BY h.D_PR_YY DESC, h.D_PR_MM DESC, h.D_PR_DD DESC, h.T_PR_HH DESC, h.T_PR_MI DESC ";
        protected static string order_nathist_field_dt_sd = " ORDER BY h.D_SD_YY, h.D_SD_MM, h.D_SD_DD, h.T_SD_HH, h.T_SD_MI ";
        protected static string order_nathist_field_dt_sd_desc = " ORDER BY h.D_SD_YY DESC, h.D_SD_MM DESC, h.D_SD_DD DESC, h.T_SD_HH DESC, h.T_SD_MI DESC ";
        //select
        protected string sql_nathist_select = "SELECT " + field_key + field_nathist + "," + field_nathist_dt_pr_null + "AS DT_PR, " + field_nathist_dt_sd_null + "AS DT_SD " + nathist_table;
        protected string sql_nathist_sostav_select = "SELECT " + field_key +
                    "(CASE WHEN (h.D_PR_DD is null) THEN h.D_SD_DD ELSE h.D_PR_DD END) as D_DD, " +
                    "(CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END) as D_MM, " +
                    "(CASE WHEN (h.D_PR_YY is null) THEN h.D_SD_YY ELSE h.D_PR_YY END) as D_YY, " +
                    "(CASE WHEN (h.T_PR_HH is null) THEN h.T_SD_HH ELSE h.T_PR_HH END) as T_HH, " +
                    "(CASE WHEN (h.T_PR_MI is null) THEN h.T_SD_MI ELSE h.T_PR_MI END) as T_MI, " +
                    "(select max(s.P_OT) from PROM.SOSTAV s where (h.N_NATUR=s.N_NATUR and h.D_PR_YY=s.D_YY and h.D_PR_MM=s.D_MM and h.D_PR_DD=s.D_DD) or (h.N_NATUR=s.N_NATUR and h.D_SD_YY=s.D_YY and h.D_SD_MM=s.D_MM and h.D_SD_DD=s.D_DD) ) as P_OT, " +
                    "to_date((to_char((CASE WHEN ((CASE WHEN (h.D_PR_DD is null) THEN h.D_SD_DD ELSE h.D_PR_DD END)>=1 and (CASE WHEN (h.D_PR_DD is null) THEN h.D_SD_DD ELSE h.D_PR_DD END)<=TO_CHAR(LAST_DAY(to_date((to_char(1,'09')||'.'||to_char(nvl((CASE WHEN ((CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END)>=1 and (CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END)<=12) THEN (CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END) ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN ((CASE WHEN (h.D_PR_YY is null) THEN h.D_SD_YY ELSE h.D_PR_YY END)>0) THEN (CASE WHEN (h.D_PR_YY is null) THEN h.D_SD_YY ELSE h.D_PR_YY END) ELSE 1 END),1),'0009')),'dd.mm.yyyy')), 'DD')) THEN (CASE WHEN (h.D_PR_DD is null) THEN h.D_SD_DD ELSE h.D_PR_DD END) ELSE 1 END),'09')||'.'||to_char(nvl((CASE WHEN ((CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END)>=1 and (CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END)<=12) THEN (CASE WHEN (h.D_PR_MM is null) THEN h.D_SD_MM ELSE h.D_PR_MM END) ELSE 1 END),1),'09')||'.'||to_char(nvl((CASE WHEN ((CASE WHEN (h.D_PR_YY is null) THEN h.D_SD_YY ELSE h.D_PR_YY END)>0) THEN (CASE WHEN (h.D_PR_YY is null) THEN h.D_SD_YY ELSE h.D_PR_YY END) ELSE 1 END),1),'0009')||' '||to_char(nvl((CASE WHEN ((CASE WHEN (h.T_PR_HH is null) THEN h.T_SD_HH ELSE h.T_PR_HH END)>=0 and (CASE WHEN (h.T_PR_HH is null) THEN h.T_SD_HH ELSE h.T_PR_HH END)<=23) THEN (CASE WHEN (h.T_PR_HH is null) THEN h.T_SD_HH ELSE h.T_PR_HH END) ELSE 0 END),1),'09')||':'||to_char(nvl((CASE WHEN ((CASE WHEN (h.T_PR_MI is null) THEN h.T_SD_MI ELSE h.T_PR_MI END)>=0 and (CASE WHEN (h.T_PR_MI is null) THEN h.T_SD_MI ELSE h.T_PR_MI END)<=59) THEN (CASE WHEN (h.T_PR_MI is null) THEN h.T_SD_MI ELSE h.T_PR_MI END) ELSE 0 END),1),'09')),'dd.mm.yyyy hh24:mi') as DT, " +
                    field_nathist_dt_pr_null + "AS DT_PR, " + field_nathist_dt_sd_null + "AS DT_SD, " + field_nathist + nathist_table;

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

        #region Prom_NatHist
        //public IQueryable<Prom_NatHist> GetProm_NatHist()
        //{
        //    try
        //    {
        //        //return context.Database.SqlQuery<Prom_NatHist>("SELECT ROWNUM as ID,N_VAG,NPP,D_PR_DD,D_PR_MM,D_PR_YY,T_PR_HH,T_PR_MI,D_SD_DD,D_SD_MM,D_SD_YY,T_SD_HH,T_SD_MI,GODN,K_ST_KMK,K_POL_GR,K_GR,N_VED_PR,N_NAK_MPS,OTPRAV,PRIM_GR,WES_GR,N_NATUR,N_PUT,K_ST,K_OP,K_FRONT,N_NATUR_T,GODN_T,K_GR_T,WES_GR_T,K_OTPR_GR,K_ST_OTPR,K_ST_NAZN,ST_OTPR,ZADER,NEPR,UDOST,SERTIF,KOD_STRAN,KOD_SD,NETO,BRUTO,TARA,DAT_VVOD FROM PROM.NAT_HIST").AsQueryable();
        //        return context.Database.SqlQuery<Prom_NatHist>(sql_NatHist).AsQueryable();
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetProm_NatHist()"), eventID);
        //        return null;
        //    }
        //}
        /// <summary>
        /// Показать вагоны по прибытию по указаной натурке, дате и времени
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute)
        {
            try
            {
                return GetArrivalProm_NatHistOfNaturDateTime(natur, day, month, year, hour, minute, null);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetArrivalProm_NatHist(natur={0}, day={1}, month={2}, year={3}, hour={4}, minute={5})", natur, day, month, year, hour, minute), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать вагоны по прибытию по указаной натурке, дате и времени с сортировкой
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute, bool? sort)
        {
            try
            {
                string sql = sql_nathist_select +
                    " WHERE h.N_NATUR = " + natur.ToString() +
                    " AND h.D_PR_DD = " + day.ToString() +
                    " AND h.D_PR_MM = " + month.ToString() +
                    " AND h.D_PR_YY = " + year.ToString() +
                    " AND h.T_PR_HH = " + hour.ToString() +
                    " AND h.T_PR_MI = " + minute.ToString();
                if (sort != null)
                {
                    sql += ((bool)sort ? " ORDER BY h.NPP DESC " : " ORDER BY h.NPP ");
                }
                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetArrivalProm_NatHistOfNaturDateTime(natur={0}, day={1}, month={2}, year={3}, hour={4}, minute={5})", natur, day, month, year, hour, minute), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать вагоны по прибытию по указаной натурке, станции, дате с сортировкой
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="station"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfNaturStationDate(int natur, int station, int day, int month, int year, bool? sort)
        {
            try
            {
                string sql = sql_nathist_select +
                        " WHERE h.N_NATUR = " + natur.ToString() +
                        " AND h.K_ST = " + station.ToString() +
                        " AND h.D_PR_DD = " + day.ToString() +
                        " AND h.D_PR_MM = " + month.ToString() +
                        " AND h.D_PR_YY = " + year.ToString();
                if (sort != null)
                {
                    sql += ((bool)sort ? " ORDER BY h.NPP DESC " : " ORDER BY h.NPP ");
                }
                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetArrivalProm_NatHistOfNaturStationDate(natur={0}, station={1}, day={2}, month={3}, year={4}, sort={5})", natur, station, day, month, year, sort), eventID);
                return null;
            }

        }
        /// <summary>
        /// Показать вагоны по прибытию по указаной натурке, станции, дате, номеру вагона
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="station"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public Prom_NatHist GetArrivalProm_NatHistOfNaturNumStationDate(int natur, int num_vag, int station, int day, int month, int year)
        {
            try
            {
                string sql = sql_nathist_select +
                        " WHERE h.N_NATUR = " + natur.ToString() +
                        " AND h.N_VAG = " + num_vag.ToString() +
                        " AND h.K_ST = " + station.ToString() +
                        " AND h.D_PR_DD = " + day.ToString() +
                        " AND h.D_PR_MM = " + month.ToString() +
                        " AND h.D_PR_YY = " + year.ToString();
                return context.Database.SqlQuery<Prom_NatHist>(sql).FirstOrDefault();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetArrivalProm_NatHistOfNaturStationDateNum(natur={0}, num_vag={1}, station={2}, day={3}, month={4}, year={5})", natur, num_vag, station, day, month, year), eventID);
                return null;
            }

        }
        /// <summary>
        /// Показать список NatHist по указаному вагону меньше указанного времени с сортировкой
        /// </summary>
        /// <param name="num_vag"></param>
        /// <param name="start"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfVagonLess(int num_vag, DateTime start, bool sort)
        {
            try
            {
                int day = start.Day;
                int month = start.Month;
                int year = start.Year;
                int hour = start.Hour;
                int minute = start.Minute;
                string sql = sql_nathist_select +
                    "WHERE h.N_VAG = " + num_vag.ToString() + " AND (h.D_PR_YY < " + year.ToString() + " OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM<" + month.ToString() + ") OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM=" + month.ToString() + " AND h.D_PR_DD < " + day.ToString() + ") OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM=" + month.ToString() + " AND h.D_PR_DD = " + day.ToString() + " AND h.T_PR_HH<" + hour.ToString() + ") OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM=" + month.ToString() + " AND h.D_PR_DD = " + day.ToString() + " AND h.T_PR_HH=" + hour.ToString() + " AND h.T_PR_MI<" + minute.ToString() + ")) " +
                    (sort ? "order by h.D_PR_YY desc, h.D_PR_MM desc, h.D_PR_DD desc, h.T_PR_HH desc, h.T_PR_MI desc" : "order by h.D_PR_YY, h.D_PR_MM, h.D_PR_DD, h.T_PR_HH, h.T_PR_MI");

                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_NatHistOfVagonLessPR(num_vag={0}, start={1}, sort={2})", num_vag, start, sort), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать список NatHist по указаному вагону меньше или равно указанного времени с сортировкой
        /// </summary>
        /// <param name="num_vag"></param>
        /// <param name="start"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfVagonLessEqual(int num_vag, DateTime start, bool sort)
        {
            try
            {
                int day = start.Day;
                int month = start.Month;
                int year = start.Year;
                int hour = start.Hour;
                int minute = start.Minute;
                string sql = sql_nathist_select +
                    "WHERE h.N_VAG = " + num_vag.ToString() + " AND (h.D_PR_YY < " + year.ToString() + " OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM<=" + month.ToString() + ") OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM=" + month.ToString() + " AND h.D_PR_DD <= " + day.ToString() + ") OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM=" + month.ToString() + " AND h.D_PR_DD = " + day.ToString() + " AND h.T_PR_HH<=" + hour.ToString() + ") OR (h.D_PR_YY=" + year.ToString() + " AND h.D_PR_MM=" + month.ToString() + " AND h.D_PR_DD = " + day.ToString() + " AND h.T_PR_HH=" + hour.ToString() + " AND h.T_PR_MI<=" + minute.ToString() + ")) " +
                    (sort ? "order by h.D_PR_YY desc, h.D_PR_MM desc, h.D_PR_DD desc, h.T_PR_HH desc, h.T_PR_MI desc" : "order by h.D_PR_YY, h.D_PR_MM, h.D_PR_DD, h.T_PR_HH, h.T_PR_MI");

                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_NatHistOfVagonLessEqualPR(num_vag={0}, start={1}, sort={2})", num_vag, start, sort), eventID);
                return null;
            }
        }

        /// <summary>
        /// Показать вагоны по отправке по указанной натурке, за указаное время
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetSendingProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute)
        {
            try
            {
                return GetSendingProm_NatHistOfNaturDateTime(natur, day, month, year, hour, minute, null);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingProm_NatHist(natur={0}, day={1}, month={2}, year={3}, hour={4}, minute={5})", natur, day, month, year, hour, minute), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать вагоны по отправке по указанной натурке, за указаное время с сортировкой
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetSendingProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute, bool? sort)
        {
            try
            {
                string sql = sql_nathist_select +
                    " WHERE h.N_NATUR = " + natur.ToString() +
                    " AND h.D_SD_DD = " + day.ToString() +
                    " AND h.D_SD_MM = " + month.ToString() +
                    " AND h.D_SD_YY = " + year.ToString() +
                    " AND h.T_SD_HH = " + hour.ToString() +
                    " AND h.T_SD_MI = " + minute.ToString();
                if (sort != null)
                {
                    sql += ((bool)sort ? " ORDER BY h.NPP DESC " : " ORDER BY h.NPP ");
                }
                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingProm_NatHist(natur={0}, day={1}, month={2}, year={3}, hour={4}, minute={5})", natur, day, month, year, hour, minute), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать отправленные вагоны по указаной натурке, дате с сортировкой
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetSendingProm_NatHistOfNaturDate(int natur, int day, int month, int year, bool? sort)
        {
            try
            {
                string sql = sql_nathist_select +
                        " WHERE h.N_NATUR = " + natur.ToString() +
                        " AND h.D_SD_DD = " + day.ToString() +
                        " AND h.D_SD_MM = " + month.ToString() +
                        " AND h.D_SD_YY = " + year.ToString();
                if (sort != null)
                {
                    sql += ((bool)sort ? " ORDER BY h.NPP DESC " : " ORDER BY h.NPP ");
                }
                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingProm_NatHistOfNaturStationDate(natur={0}, day={1}, month={2}, year={3}, sort={4})", natur, day, month, year, sort), eventID);
                return null;
            }

        }
        /// <summary>
        /// Найти вагон по натурке, номеру, дате и времени
        /// </summary>
        /// <param name="natur"></param>
        /// <param name="num"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <returns></returns>
        public Prom_NatHist GetSendingProm_NatHistOfNaturNumDateTime(int natur, int num, int day, int month, int year, int hour, int minute)
        {
            try
            {
                string sql = sql_nathist_select +
                        " WHERE h.N_NATUR = " + natur.ToString() +
                        " AND h.N_VAG = " + num.ToString() +
                        " AND h.D_SD_DD = " + day.ToString() +
                        " AND h.D_SD_MM = " + month.ToString() +
                        " AND h.D_SD_YY = " + year.ToString() +
                        " AND h.T_SD_HH = " + hour.ToString() +
                        " AND h.T_SD_MI = " + minute.ToString();
                return context.Database.SqlQuery<Prom_NatHist>(sql).FirstOrDefault();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingProm_NatHistOfNaturNumDateTime(natur={0}, num={1}, day={2}, month={3}, year={4}, hour={5}, minute={6})",
                    natur, num, day, month, year, year, minute), eventID);
                return null;
            }

        }
        /// <summary>
        /// Найти вагон по номеру, дате и времени
        /// </summary>
        /// <param name="num"></param>
        /// <param name="day"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="hour"></param>
        /// <param name="minute"></param>
        /// <returns></returns>
        public Prom_NatHist GetSendingProm_NatHistOfNumDateTime(int num, int day, int month, int year, int hour, int minute)
        {
            try
            {
                string sql = sql_nathist_select +
                        " WHERE h.N_VAG = " + num.ToString() +
                        " AND h.D_SD_DD = " + day.ToString() +
                        " AND h.D_SD_MM = " + month.ToString() +
                        " AND h.D_SD_YY = " + year.ToString() +
                        " AND h.T_SD_HH = " + hour.ToString() +
                        " AND h.T_SD_MI = " + minute.ToString();
                return context.Database.SqlQuery<Prom_NatHist>(sql).FirstOrDefault();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingProm_NatHistOfNaturNumDateTime(num={0}, day={1}, month={2}, year={3}, hour={4}, minute={5})",
                    num, day, month, year, year, minute), eventID);
                return null;
            }

        }
        /// <summary>
        /// Показать список NatHist по указаному вагону больше указанного времени с сортировкой
        /// </summary>
        /// <param name="num_vag"></param>
        /// <param name="start"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetSendingProm_NatHistOfVagonMore(int num_vag, DateTime start, bool sort)
        {
            try
            {
                int day = start.Day;
                int month = start.Month;
                int year = start.Year;
                int hour = start.Hour;
                int minute = start.Minute;
                string sql = sql_nathist_select +
                    "WHERE h.N_VAG = " + num_vag.ToString() + " AND (h.D_SD_YY > " + year.ToString() + " OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM>" + month.ToString() + ") OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM=" + month.ToString() + " AND h.D_SD_DD > " + day.ToString() + ") OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM=" + month.ToString() + " AND h.D_SD_DD = " + day.ToString() + " AND h.T_SD_HH>" + hour.ToString() + ") OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM=" + month.ToString() + " AND h.D_SD_DD = " + day.ToString() + " AND h.T_SD_HH=" + hour.ToString() + " AND h.T_SD_MI>" + minute.ToString() + ")) " +
                    (sort ? "order by h.D_SD_YY desc, h.D_SD_MM desc, h.D_SD_DD desc, h.T_SD_HH desc, h.T_SD_MI desc" : "order by h.D_SD_YY, h.D_SD_MM, h.D_SD_DD, h.T_SD_HH, h.T_SD_MI");

                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_NatHistOfVagonMoreSD(num_vag={0}, start={1}, sort={2})", num_vag, start, sort), eventID);
                return null;
            }
        }
        /// <summary>
        /// Показать список NatHist по указаному вагону больше или равно указанного времени с сортировкой
        /// </summary>
        /// <param name="num_vag"></param>
        /// <param name="start"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IQueryable<Prom_NatHist> GetSendingProm_NatHistOfVagonMoreEqual(int num_vag, DateTime start, bool sort)
        {
            try
            {
                int day = start.Day;
                int month = start.Month;
                int year = start.Year;
                int hour = start.Hour;
                int minute = start.Minute;
                string sql = sql_nathist_select +
                    "WHERE h.N_VAG = " + num_vag.ToString() + " AND (h.D_SD_YY > " + year.ToString() + " OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM>=" + month.ToString() + ") OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM=" + month.ToString() + " AND h.D_SD_DD >= " + day.ToString() + ") OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM=" + month.ToString() + " AND h.D_SD_DD = " + day.ToString() + " AND h.T_SD_HH>=" + hour.ToString() + ") OR (h.D_SD_YY=" + year.ToString() + " AND h.D_SD_MM=" + month.ToString() + " AND h.D_SD_DD = " + day.ToString() + " AND h.T_SD_HH=" + hour.ToString() + " AND h.T_SD_MI>=" + minute.ToString() + ")) " +
                    (sort ? "order by h.D_SD_YY desc, h.D_SD_MM desc, h.D_SD_DD desc, h.T_SD_HH desc, h.T_SD_MI desc" : "order by h.D_SD_YY, h.D_SD_MM, h.D_SD_DD, h.T_SD_HH, h.T_SD_MI");

                return context.Database.SqlQuery<Prom_NatHist>(sql).AsQueryable();

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_NatHistOfVagonMoreEqualSD(num_vag={0}, start={1}, sort={2})", num_vag, start, sort), eventID);
                return null;
            }
        }


        #endregion

        #region Prom_NatHistAndSostav

        public IQueryable<Prom_NatHistAndSostav> GetProm_NatHistAndSostav()
        {
            try
            {
                return context.Database.SqlQuery<Prom_NatHistAndSostav>(sql_nathist_sostav_select).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_NatHistAndSostav()"), eventID);
                return null;
            }
        }

        public IQueryable<Prom_NatHistAndSostav> GetProm_NatHistAndSostav(int num)
        {
            try
            {
                //string sql = sql_nathist_sostav_select + " where h.N_VAG = " + num.ToString() + " order by D_YY desc, D_MM desc, D_DD desc, T_HH desc, T_MI desc";
                return context.Database.SqlQuery<Prom_NatHistAndSostav>(sql_nathist_sostav_select + " where h.N_VAG = " + num.ToString() + " order by D_YY desc, D_MM desc, D_DD desc, T_HH desc, T_MI desc").AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetProm_NatHistAndSostav(num={0})", num), eventID);
                return null;
            }
        }
        #endregion
    }
}
