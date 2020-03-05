using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.TestModule
{
    public class Test_IDS
    {
        public Test_IDS() { 
        
        }

        #region IDSTransfer


        public void IDSTransfer_AddArrival() {

            IDSTransfer ids = new IDSTransfer(service.Test);
            long res = ids.AddArrival(1608, 5621, 3609, "4577-038-4670", new DateTime(2020, 3, 5, 10, 45, 0),null);

        }

        #endregion

        #region IDSDirectory

        public void IDSDirectory_GetID_Directory_StationOfCodeCS()
        {

            IDSDirectory ids = new IDSDirectory(service.Test);
            int res = ids.GetID_Directory_StationOfCodeCS(873009, true);

        }

        #endregion

    }
}
