using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
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
                WebAPIClientSAP web_sap = new WebAPIClientSAP(this.servece_owner);
                IncomingSupply incoming_supply = web_sap.GetIncomingSupply(sap_is.id, sap_is.num_doc_uz.Trim(), sap_is.num.ToString().Trim());
                if (incoming_supply != null)
                {

                    string data = null;
                    string time = null;
                    if (!String.IsNullOrWhiteSpace(incoming_supply.ERDAT)) {
                        data = incoming_supply.ERDAT.Insert(4, "-").Insert(7, "-");
                    }
                    if (!String.IsNullOrWhiteSpace(incoming_supply.ETIME))
                    {
                        time = incoming_supply.ETIME.Insert(2, ":").Insert(5, ":");
                    }                    
                    sap_is.VBELN = incoming_supply.VBELN;
                    sap_is.NUM_VBELN = !String.IsNullOrWhiteSpace(incoming_supply.PSNR) ? incoming_supply.PSNR : null;
                    sap_is.WERKS = incoming_supply.WERKS;
                    sap_is.LGORT = incoming_supply.LGORT;
                    sap_is.LGOBE = incoming_supply.LGOBE;
                    sap_is.ERDAT = !String.IsNullOrWhiteSpace(data) ? (DateTime?)DateTime.Parse(data, CultureInfo.CreateSpecificCulture("ru-RU")).Date : null;
                    sap_is.ETIME = !String.IsNullOrWhiteSpace(time) ? (TimeSpan?)TimeSpan.Parse(time, CultureInfo.CreateSpecificCulture("ru-RU")) : null;
                    sap_is.LGORT_10 = incoming_supply.LGORT_10;
                    sap_is.LGOBE_10 = incoming_supply.LGOBE_10;
                    sap_is.MATNR = incoming_supply.MATNR;
                    sap_is.MAKTX = incoming_supply.MAKTX;
                    sap_is.NAME_SH = incoming_supply.NAME_SH;
                    sap_is.KOD_R_10 = incoming_supply.KOD_R_10;

                }
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
