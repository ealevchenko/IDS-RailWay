using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Entities.PROM
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

    public class Prom_NatHist
    {
        public Int64 ID { get; set; }
        public DateTime? DT_PR { get; set; }
        public DateTime? DT_SD { get; set; }
        public int? D_PR_DD { get; set; }
        public int? D_PR_MM { get; set; }
        public int? D_PR_YY { get; set; }
        public int? T_PR_HH { get; set; }
        public int? T_PR_MI { get; set; }
        //
        public int? D_SD_DD { get; set; }
        public int? D_SD_MM { get; set; }
        public int? D_SD_YY { get; set; }
        public int? T_SD_HH { get; set; }
        public int? T_SD_MI { get; set; }
        //
        public int N_VAG { get; set; }
        public int? NPP { get; set; }
        public int? GODN { get; set; }
        public int? K_ST { get; set; }
        public int? K_ST_KMK { get; set; }
        public int? K_POL_GR { get; set; }
        public int? N_VED_PR { get; set; }

        public int? N_NAK_MPS { get; set; }
        public string OTPRAV { get; set; }
        public string PRIM_GR { get; set; }
        public int? K_GR { get; set; }
        public decimal? WES_GR { get; set; }
        public int N_NATUR { get; set; }
        public int? N_PUT { get; set; }
        public int? K_OP { get; set; }
        public int? K_FRONT { get; set; }
        public int? N_NATUR_T { get; set; }
        public int? GODN_T { get; set; }
        public int? K_GR_T { get; set; }
        public decimal? WES_GR_T { get; set; }
        public int? K_OTPR_GR { get; set; }
        public int? K_ST_NAZN { get; set; }
        public int? K_ST_OTPR { get; set; }
        public string ST_OTPR { get; set; }
        public string ZADER { get; set; }
        public string NEPR { get; set; }
        public string UDOST { get; set; }
        public string SERTIF { get; set; }
        public int? KOD_STRAN { get; set; }
        public int? KOD_SD { get; set; }
        public decimal? NETO { get; set; }
        public decimal? BRUTO { get; set; }
        public decimal? TARA { get; set; }
        public DateTime? DAT_VVOD { get; set; }
    }

    public class Prom_NatHistAndSostav : Prom_NatHist
    {
        // дата
        public int? D_DD { get; set; }
        public int? D_MM { get; set; }
        public int? D_YY { get; set; }
        public int? T_HH { get; set; }
        public int? T_MI { get; set; }
        public DateTime? DT { get; set; }
        public int? P_OT { get; set; }
        public Prom_NatHistAndSostav() : base() { }
    }
}
