using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDSLogs.Enum
{
    public enum service : int
    {
        Null = -1,
        WebSite = 0,
        Test = 1,

        Web = 100,
        Web_IDS = 101,
        WebAPI_IDS = 102,

        WebAPI_UZ = 112,

        // сервисы Метранса
        Metrans = 200,
        Metrans_Transfer_MT_to_AMKR = 201,
        Metrans_TransferApproaches = 202,
        Metrans_TransferArrival = 203,
        Metrans_TransferWT = 204,
        Metrans_APITransferArrival = 205,

        // сервисы ИДС
        IDS = 300,
        IDS_UpdateIncomingSupply = 301,     // Сервис обновления входящей поставки
        //IDS_TransferOutgoingOfKIS = 309,
        IDS_UpdateArrivalEPD = 302,         // Сервис обновления ЭПД входящих вагонов


    }
}
