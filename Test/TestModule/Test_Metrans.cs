using MT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.TestModule
{
    public class Test_Metrans
    {
        public Test_Metrans() { 
        
        }

        #region

        public void MTTransfer_TransferApproaches()
        {
            MTTransfer mtt = new MTTransfer();
            mtt.FromPath = @"D:\txt_new";
            mtt.DeleteFile = true;
            int res_transfer = mtt.TransferApproaches();
        }

        #endregion
    }
}
