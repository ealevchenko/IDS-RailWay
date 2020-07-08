using EFKIS.Concrete.KOMETA;
using EFKIS.Entities.KOMETA;
using IDSLogs.Enum;
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
    }

    public class KISDirectory
    {
        private eventID eventID = eventID.KIS_Directory;
        protected service servece_owner = service.Null;

        EFVAGON_SOB ef_vagon_sob = new EFVAGON_SOB();



        public KISDirectory()
        {

        }

        public KISDirectory(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }

        #region KOMETA_VAGON_SOB

        public List<KOMETA_VAGON_SOB> GetCurrent_KOMETA_VAGON_SOB()
        {
            return ef_vagon_sob.GetCurrentVAGON_SOB().Select(v => new KOMETA_VAGON_SOB()
            {
                N_VAGON = v.N_VAGON,
                SOB = v.SOB,
                DATE_AR = v.DATE_AR,
                DATE_END = v.DATE_END,
                ROD = v.ROD,
                DATE_REM = v.DATE_REM,
                PRIM = v.PRIM,
                CODE = v.CODE,
            }).ToList();
            //return ef_vagon_sob.GetCurrentVAGON_SOB().Select(v => v.GetGenusWagons()).ToList();

        }

        public KOMETA_VAGON_SOB GetCurrent_KOMETA_VAGON_SOB(int num)
        {
            return ef_vagon_sob.GetCurrentVAGON_SOB(num).GetGenusWagons();
        }

        #endregion
    }
}
