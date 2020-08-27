using EFKIS.Concrete.PROM;
using EFKIS.Entities.PROM;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KIS
{
    public class KISWagon
    {
        private eventID eventID = eventID.KIS_IDSWagon;
        protected service servece_owner = service.Null;

        public KISWagon()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public KISWagon(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }

        #region PROM_SOSTAV составы на промышленной
        /// <summary>
        /// Вернуть составы которые отправлены на УЗ по данным КИС
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        public List<PROM_SOSTAV> GetOutSostavOfKis(DateTime start, DateTime stop)
        {
            try
            {
                EFPROM ef_wag = new EFPROM();
                List<Prom_SostavAndCount> list_psc = ef_wag.GetProm_SostavAndCount(start, stop).ToList();
                List<PROM_SOSTAV> list_out = list_psc.Where(p => p.P_OT == 1).OrderBy(p => p.DT_PR).ToList().Select(p => p.GetProm_SostavAndCount()).ToList();
                return list_out;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetOutSostavOfKis(start={0}, stop={1})", start, stop), servece_owner, eventID);
                return null;// Возвращаем id=-1 , Ошибка
            }
        }

        public List<PROM_NATHIST> GetOutProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute, bool? sort) {
            try
            {
                EFPROM ef_wag = new EFPROM();
                //List<Prom_NatHist> list_nnh1 = ef_wag.GetSendingProm_NatHistOfNaturDateTime(natur, day, month, year, hour, minute, sort).ToList();
                List<PROM_NATHIST> list_nnh = ef_wag.GetSendingProm_NatHistOfNaturDateTime(natur, day, month, year, hour, minute, sort).ToList().Select(p => p.GetProm_NatHist()).ToList();
                return list_nnh;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetOutProm_NatHistOfNaturDateTime(natur={0}, day={1}, month={2}, year={3}, hour={4}, minute={5}, sort={6})", 
                    natur, day,month, year, hour, minute, sort), servece_owner, eventID);
                return null;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion
    }
}
