using EFIDS.Entities;
using EFKIS.Concrete.KOMETA;
using EFKIS.Concrete.PROM_SOSTAV;
using EFKIS.Entities.KOMETA;
using EFKIS.Entities.PROM_SOSTAV;
using IDS;
using IDSLogs.Enum;
using KIS;
using KIS.Directory;
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

        public void EFKIS_PROM_SOSTAV_GetProm_SostavAndCount()
        {
            try
            {
                EFPROM_SOSTAV ef_wag = new EFPROM_SOSTAV();
                List<Prom_SostavAndCount> list_psc1 = ef_wag.GetProm_SostavAndCount(new DateTime(2020, 08, 24, 0, 0, 0), new DateTime(2020, 08, 24, 23, 59, 59)).ToList();
                List<Prom_SostavAndCount> list_out = list_psc1.Where(p => p.P_OT == 1).OrderBy(p => p.DT_PR).ToList();
            }
            catch (Exception e)
            {

                return;
            }
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

        #region KISTransfer
        /// <summary>
        /// тест переноса составов по отправке из КИС в ИДС
        /// </summary>
        public void KISTransfer_TransferOutgoingIDSOfKis()
        {
            try
            {
                KISTransfer kis_tr = new KISTransfer();
                kis_tr.TransferOutgoingIDSOfKis();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        #endregion
    }
}
