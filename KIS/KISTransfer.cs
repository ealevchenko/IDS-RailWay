using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KIS
{
    public class KISTransfer
    {
        private eventID eventID = eventID.KIS_IDSTransfer;
        protected service servece_owner = service.Null;

        public KISTransfer()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public KISTransfer(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }

        #region TransferOutgoing Перенос составов отправляемых со станций АМКР на УЗ (по данным системы КИС)

        public int TransferOutgoingIDSOfKis()
        {
            try
            {
                //IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                //DateTime? last_date = ids_tr.GetReadinessAMKRLastOutgoingSostavOfReadinessAMKR();

                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("TransferOutgoingIDSOfKis()"), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion
    }

}
