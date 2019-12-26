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
        Test = 1,
        // сервисы Метранса
        Metrans = 100,
        Metrans_Transfer_MT_to_AMKR = 101,
        Metrans_TransferApproaches = 102,
        Metrans_TransferArrival = 103,
        Metrans_TransferWT = 104,
    }
}
