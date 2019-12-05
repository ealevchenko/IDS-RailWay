using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDSLogs.Enum
{
    public enum eventID : int
    {
        Null = -1,
        RailWay = 0,
        Test = 1,
        #region Служба МеталлургТранс 2000

        EFMT = 2100,                    // Библиотека базы данных Метранс
        MT = 2200,                      // Библиотека сервисов Метранс
        MT_SFTPTransfer = 2200,         // Сервис переноса даных из SFTP Метранс

        #endregion
    }
}
