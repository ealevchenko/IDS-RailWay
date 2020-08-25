using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Entities.PROM_SOSTAV
{
    public class Prom_Sostav
    {
        public Int64 ID { get; set; }
        public DateTime DT_PR { get; set; }
        public DateTime DT { get; set; }
        public int N_NATUR { get; set; }
        public int? D_PR_DD { get; set; }
        public int? D_DD { get; set; }
        public int? D_PR_MM { get; set; }
        public int? D_MM { get; set; }
        public int? D_PR_YY { get; set; }
        public int? D_YY { get; set; }
        public int? T_PR_HH { get; set; }
        public int? T_HH { get; set; }
        public int? T_PR_MI { get; set; }
        public int? T_MI { get; set; }
        public int? K_ST { get; set; }
        public int? N_PUT { get; set; }
        public int? NAPR { get; set; }
        public int? P_OT { get; set; }
        public int? V_P { get; set; }
        public int? K_ST_OTPR { get; set; }
        public int? K_ST_PR { get; set; }
        public int? N_VED_PR { get; set; }
        public int? N_SOST_OT { get; set; }
        public int? N_SOST_PR { get; set; }
        public DateTime? DAT_VVOD { get; set; }
    }

    public class Prom_SostavAndCount : Prom_Sostav
    {

        public int countVagon { get; set; }
        public int? maxVagon { get; set; }
        public int countNatHist { get; set; }
        public int? maxNatHist { get; set; }
        public Prom_SostavAndCount()
            : base()
        {

        }
    }
}
