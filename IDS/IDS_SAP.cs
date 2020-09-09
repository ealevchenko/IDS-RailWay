using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    public class IDS_SAP
    {
        private eventID eventID = eventID.IDS_IDSSAP;
        protected service servece_owner = service.Null;

        public IDS_SAP()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public IDS_SAP(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
        /// <summary>
        /// Метод выполняет запрсос в САП получает ответ, и возвращает скорректированую строку SAPIncomingSupply
        /// </summary>
        /// <param name="sap_is"></param>
        /// <returns></returns>
        public SAPIncomingSupply GetCurrentIncomingSupplyOfWebSAP(SAPIncomingSupply sap_is) {
            try
            {
                //TODO: Заглушка пока не будет реализован интерфейс с САП
                sap_is.attempt = sap_is.attempt+1;
                return sap_is;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentIncomingSupplyOfWebSAP(sap_is={0})", sap_is), servece_owner, eventID);
                return null;// Ошибка
            }
        }
    }
}
