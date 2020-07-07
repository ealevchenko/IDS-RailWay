using EFIDS.Entities;
using EFKIS.Concrete.KOMETA;
using EFKIS.Entities.KOMETA;
using IDS;
using IDSLogs.Enum;
using KIS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.TestModule
{
    public class Test_KIS
    {
        public Test_KIS()
        { 
        
        }

        #region EFKIS


        public void EFKIS_Vagon_Sob()
        {
            try
            {
                EFVAGON_SOB kom_con = new EFVAGON_SOB();
                foreach (VAGON_SOB t in kom_con.VAGON_SOB.ToList())
                {
                    WL(t);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        // Все текущее вагоны с открытой арендой
        public void EFKIS_GetCurrentVAGON_SOB()
        {
            try
            {
                EFVAGON_SOB kom_con = new EFVAGON_SOB();
                foreach (VAGON_SOB t in kom_con.GetCurrentVAGON_SOB().ToList())
                {
                    WL(t);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public void WL(VAGON_SOB t)
        {
            if (t == null)
            {
                Console.WriteLine("NULL"); return;
            }
            Console.WriteLine("N_VAGON: {0},\t SOB: {1},\t DATE_AR: {2},\t DATE_END: {3},\t ROD: {4},\t DATE_REM: {5},\t PRIM: {6},\t CODE: {7}",
                    t.N_VAGON, t.SOB, t.DATE_AR, t.DATE_END, t.ROD, t.DATE_REM, t.PRIM, t.CODE);
        }

        #endregion

        #region KISDirectory

        public void KISDirectory_GetCurrent_KOMETA_VAGON_SOB()
        {
            try
            {
                KISDirectory kis_dir = new KISDirectory();
                List<KOMETA_VAGON_SOB> list = kis_dir.GetCurrent_KOMETA_VAGON_SOB();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        #endregion


    }
}
