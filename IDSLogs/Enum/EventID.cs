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

        #region SHARED Общие библиотеки
        WebApiToken = 101,
        WebApiURL = 102,

        #endregion


        #region Служба УЗ 1000

        EFUZ = 1100,                    // Библиотека базы данных Укр. Ж.Д.
        UZ = 1200,                      // Библиотека сервисов Укр. Ж.Д.
        UZ_Directory = 1300,            // Сервис справочников Укр. Ж.Д.
        UZ_SMS = 1400,                  // Сервис модуля согласования (Электронный перевозочный документ).
        #endregion

        #region Служба МеталлургТранс 2000

        Metrans = 2000,
        EFMT = 2100,                    // Библиотека базы данных Метранс
        MT = 2200,                      // Библиотека сервисов Метранс
        MT_SFTPTransfer = 2300,         // Сервис переноса даных из SFTP Метранс
        MT_MTTransfer = 2400,           // Сервис переноса даных из файлов в БД Метранс
        MT_MTThread = 2500,             // Библиотека потоков выполнения сервисов Метранс
        MT_WebApiClient = 2600,         // Библиотека доступа к WEB API
        #endregion

        #region Служба Информационно диспечерской системы 2000

        IDS = 3000,
        EFIDS = 3100,               // Библиотека базы данных IDS
        IDS_Directory = 3300,       // Сервис справочников ИДС
        IDS_IDSTransfer = 3400,     // Сервис переноса даных из файлов в БД IDS
        IDS_IDSMORS = 3500,         // Сервис ИДС "УСПС"

        #endregion
    }
}
