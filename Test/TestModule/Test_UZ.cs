using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UZ;

namespace Test.TestModule
{
    public class Test_UZ
    {
        public Test_UZ()
        { 
        
        }

        #region UZ

        public void UZ_WebApiClientUZWagon()
        {
            WebAPIClientUZ client = new WebAPIClientUZ(service.Null);
            Console.WriteLine("Запрос....");
            //List<string> list2 = client.GetInfoWagon(58647785);
            UZWagonInfo info = client.GetInfoWagonOfNum(58647782);
        }
        #endregion
    }
}
