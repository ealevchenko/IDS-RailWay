using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Configuration;
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

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sap_is"></param>
        /// <returns></returns>
        public SAPIncomingSupply GetCurrentIncomingSupplyOfWebSAP(SAPIncomingSupply sap_is)
        {
            try
            {
                //WebAPIClientSAP web_sap = new WebAPIClientSAP(this.servece_owner);
                //List<IncomingSupply> incoming_supply = web_sap.GetIncomingSupply(sap_is.id, sap_is.num_doc_uz.Trim(), sap_is.num.ToString().Trim());
                sap_is.attempt = sap_is.attempt + 1;
                return sap_is;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentIncomingSupplyOfWebSAP(sap_is={0})", sap_is), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Метод выполняет списочный запрсос в САП получает ответ, и возвращает скорректированую строку SAPIncomingSupply
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public List<SAPIncomingSupply> GetCurrentIncomingSupplyOfWebSAP(List<SAPIncomingSupply> list)
        {
            try
            {
                List<SAPIncomingSupply> new_list = new List<SAPIncomingSupply>();
                foreach (SAPIncomingSupply sap_is in list)
                {
                    SAPIncomingSupply new_sap_is = GetCurrentIncomingSupplyOfWebSAP(sap_is);
                    new_list.Add(new_sap_is);
                }
                return new_list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentIncomingSupplyOfWebSAP(list={0})", list), servece_owner, eventID);
                return null;// Ошибка
            }
        }
    }
}
