using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.TestModule
{
    public class Test_Logs
    {
        public Test_Logs() { }

        #region FLOG

        public void FLOG_FileLogs()
        {
            Exception ex = new Exception("error1", new Exception("error0"));

            "Тест сохрнения Information".InformationToFile();
            "Тест сохрнения Information(error)".InformationToFile(ex);
            "Тест сохрнения WarningToFile".WarningToFile();
            "Тест сохрнения WarningToFile(error)".WarningToFile(ex);
            "Тест сохрнения DebugToFile".DebugToFile();
            "Тест сохрнения DebugToFile(error)".DebugToFile(ex);
            "Тест сохрнения ErrorToFile".ErrorToFile();
            "Тест сохрнения ErrorToFile(error)".ErrorToFile(ex);
            "Тест сохрнения FatalToFile".FatalToFile();
            "Тест сохрнения FatalToFile(error)".FatalToFile(ex);
        }

        #endregion

        #region EventLogs

        public void ELOG_EventLogs()
        {
            Exception ex = new Exception("error1", new Exception("error0"));

            "Тест сохрнения Information".InformationToEvent();
            "Тест сохрнения Information id_services=1, id_eventID=2".InformationToEvent(1, 2);
            "Тест сохрнения Warning".WarningToEvent();
            "Тест сохрнения Warning id_services=1, id_eventID=2".WarningToEvent(1, 2);
            "Тест сохрнения Error".ErrorToEvent();
            "Тест сохрнения Error id_services=1, id_eventID=2".ErrorToEvent(1, 2);
            ex.ExceptionToEvent();
            ex.ExceptionToEvent(1,2);
            ex.ExceptionToEvent("Тест сохрнения Exception");
            ex.ExceptionToEvent("Тест сохрнения Exception id_services=1, id_eventID=2",1,2);
        }

        #endregion

        #region DataBaseLogs

        public void DBLOG_DataBaseLogs()
        {
            Exception ex = new Exception("error1", new Exception("error0"));

            long result1 = "Тест сохрнения Information".InformationToDB();           
            long result2 = "Тест сохрнения Information id_services=1, id_eventID=2".InformationToDB(1, 2);

            long resultWarning1 = "Тест сохрнения Warning".WarningToDB();
            long resultWarning2 = "Тест сохрнения Warning id_services=1, id_eventID=2".WarningToDB(1, 2);

            long resultError1 = "Тест сохрнения Error".ErrorToDB();
            long resultError2 = "Тест сохрнения Error id_services=1, id_eventID=2".ErrorToDB(1, 2);

            long resultCritical1 = "Тест сохрнения Critical".CriticalToDB();
            long resultCritical2 = "Тест сохрнения Critical id_services=1, id_eventID=2".CriticalToDB(1, 2);

        }

        #endregion

    }
}
