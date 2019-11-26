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

            #region FLOG
            tlogs.FLOG_FileLogs();
            #endregion

            #endregion

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
