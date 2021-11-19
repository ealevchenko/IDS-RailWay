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
        UZ_Convert = 1500,              // Сервис модуля согласования (конвертация XML->ЭПД->XML).
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

        #region Служба Информационно диспечерской системы 3000

        IDS = 3000,
        EFIDS = 3100,               // Библиотека базы данных IDS
        IDS_Directory = 3300,       // Сервис справочников ИДС
        IDS_IDSTransfer = 3400,     // Сервис переноса даных из файлов в БД IDS
        IDS_IDSMORS = 3500,         // Сервис ИДС "УСПС"
        IDS_IDSThread = 3600,       // Библиотека потоков выполнения сервисов IDS
        IDS_IDSSAP = 3700,          // Сервис работы с данными SAP MII
        IDS_IDSWIR = 3800,          // Сервис работы с вагонами внутренего перемещения
        IDS_IDSRWT = 3900,          // Сервис работы с вагонами внутренего перемещения
        IDS_IDSEPD = 3950,          // Сервис работы с ЭПД УЗ

        #endregion

        #region Служба КИС 4000

        KIS = 4000,
        EFKIS = 4100,               // Библиотека базы данных EFKIS
        EFKIS_VAGON_SOB = 4101,     // Таблица аренда вагонов
        EFKIS_PROM_SOSTAV = 4102,   // Таблица прибывших и отправленных вагонов

        KIS_Directory = 4200,       // Сервис справочников КИС
        KIS_IDSTransfer = 4300,     // Сервис переноса даных из файлов в ИДС (пока не использую)
        KIS_IDSWagon = 4400,        // Сервис системы КИС номерного учета Wagon

        #endregion

        #region Служба SAP 5000

        SAP = 5000,

        SAP_Client = 5100,          // Библиотека запросов в САП

        #endregion
    }
}
