using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.TestModule;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Test_Logs тест логирования
            Test_Logs tlogs = new Test_Logs();

            //tlogs.FLOG_FileLogs();
            //tlogs.ELOG_EventLogs();
            //tlogs.DBLOG_DataBaseLogs();

            #endregion

            #region Test_Metrans тест Метранса
            Test_Metrans tmt= new Test_Metrans();
            tmt.MTTransfer_TransferApproaches();

            #endregion

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
