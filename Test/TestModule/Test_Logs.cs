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
    }
}
