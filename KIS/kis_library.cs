using EFKIS.Entities.KOMETA;
using EFKIS.Entities.PROM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KIS
{
    public class KOMETA_VAGON_SOB
    {
        public int N_VAGON { get; set; }
        public int SOB { get; set; }
        public DateTime DATE_AR { get; set; }
        public DateTime? DATE_END { get; set; }
        public string ROD { get; set; }
        public DateTime? DATE_REM { get; set; }
        public string PRIM { get; set; }
        public int? CODE { get; set; }
    }

    public class PROM_SOSTAV
    {
        public int? D_DD { get; set; }
        public int? D_MM { get; set; }
        public int? D_PR_DD { get; set; }
        public int? D_PR_MM { get; set; }
        public int? D_PR_YY { get; set; }
        public int? D_YY { get; set; }
        public DateTime? DAT_VVOD { get; set; }
        public DateTime DT { get; set; }
        public DateTime DT_PR { get; set; }
        public long ID { get; set; }
        public int? K_ST { get; set; }
        public int? K_ST_OTPR { get; set; }
        public int? K_ST_PR { get; set; }
        public int N_NATUR { get; set; }
        public int? N_PUT { get; set; }
        public int? N_SOST_OT { get; set; }
        public int? N_SOST_PR { get; set; }
        public int? N_VED_PR { get; set; }
        public int? NAPR { get; set; }
        public int? P_OT { get; set; }
        public int? T_HH { get; set; }
        public int? T_MI { get; set; }
        public int? T_PR_HH { get; set; }
        public int? T_PR_MI { get; set; }
        public int? V_P { get; set; }
        public int countVagon { get; set; }
        public int? maxVagon { get; set; }
        public int countNatHist { get; set; }
        public int? maxNatHist { get; set; }
    }

    public class PROM_NATHIST
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

    public static class kis_library
    {

        public static KOMETA_VAGON_SOB GetGenusWagons(this VAGON_SOB v)
        {
            if (v == null) return null;
            return new KOMETA_VAGON_SOB()
            {
                N_VAGON = v.N_VAGON,
                SOB = v.SOB,
                DATE_AR = v.DATE_AR,
                DATE_END = v.DATE_END,
                ROD = v.ROD,
                DATE_REM = v.DATE_REM,
                PRIM = v.PRIM,
                CODE = v.CODE,
            };
        }

        public static PROM_SOSTAV GetProm_SostavAndCount(this Prom_SostavAndCount s)
        {
            if (s == null) return null;
            return new PROM_SOSTAV()
            {
                D_DD = s.D_DD,
                D_MM = s.D_MM,
                D_PR_DD = s.D_PR_DD,
                D_PR_MM = s.D_PR_MM,
                D_PR_YY = s.D_PR_YY,
                D_YY = s.D_YY,
                DAT_VVOD = s.DAT_VVOD,
                DT = s.DT,
                DT_PR = s.DT_PR,
                ID = s.ID,
                K_ST = s.K_ST,
                K_ST_OTPR = s.K_ST_OTPR,
                K_ST_PR = s.K_ST_PR,
                N_NATUR = s.N_NATUR,
                N_PUT = s.N_PUT,
                N_SOST_OT = s.N_SOST_OT,
                N_SOST_PR = s.N_SOST_PR,
                N_VED_PR = s.N_VED_PR,
                NAPR = s.NAPR,
                P_OT = s.P_OT,
                T_HH = s.T_HH,
                T_MI = s.T_MI,
                T_PR_HH = s.T_PR_HH,
                T_PR_MI = s.T_PR_MI,
                V_P = s.V_P,
                countVagon = s.countVagon,
                maxVagon = s.maxVagon,
                countNatHist = s.countNatHist,
                maxNatHist = s.maxNatHist
            };
        }

        public static PROM_NATHIST GetProm_NatHist(this Prom_NatHist h)
        {
            if (h == null) return null;
            return new PROM_NATHIST()
            {
                ID = h.ID,
                DT_PR = h.DT_PR,
                DT_SD = h.DT_SD,
                D_PR_DD = h.D_PR_DD,
                D_PR_MM = h.D_PR_MM,
                D_PR_YY = h.D_PR_YY,
                T_PR_HH = h.T_PR_HH,
                T_PR_MI = h.T_PR_MI,
                //
                D_SD_DD = h.D_SD_DD,
                D_SD_MM = h.D_SD_MM,
                D_SD_YY = h.D_SD_YY,
                T_SD_HH = h.T_SD_HH,
                T_SD_MI = h.T_SD_MI,
                //
                N_VAG = h.N_VAG,
                NPP = h.NPP,
                GODN = h.GODN,
                K_ST = h.K_ST,
                K_ST_KMK = h.K_ST_KMK,
                K_POL_GR = h.K_POL_GR,
                N_VED_PR = h.N_VED_PR,

                N_NAK_MPS = h.N_NAK_MPS,
                OTPRAV = h.OTPRAV,
                PRIM_GR = h.PRIM_GR,
                K_GR = h.K_GR,
                WES_GR = h.WES_GR,
                N_NATUR = h.N_NATUR,
                N_PUT = h.N_PUT,
                K_OP = h.K_OP,
                K_FRONT = h.K_FRONT,
                N_NATUR_T = h.N_NATUR_T,
                GODN_T = h.GODN_T,
                K_GR_T = h.K_GR_T,
                WES_GR_T = h.WES_GR_T,
                K_OTPR_GR = h.K_OTPR_GR,
                K_ST_NAZN = h.K_ST_NAZN,
                K_ST_OTPR = h.K_ST_OTPR,
                ST_OTPR = h.ST_OTPR,
                ZADER = h.ZADER,
                NEPR = h.NEPR,
                UDOST = h.UDOST,
                SERTIF = h.SERTIF,
                KOD_STRAN = h.KOD_STRAN,
                KOD_SD = h.KOD_SD,
                NETO = h.NETO,
                BRUTO = h.BRUTO,
                TARA = h.TARA,
                DAT_VVOD = h.DAT_VVOD,
            };
        }
    }
}
