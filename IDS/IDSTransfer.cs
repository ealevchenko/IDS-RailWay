using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IDSLogs;
using IDSLogs.Enum;

namespace IDS
{
    public class IDSTransfer
    {
        private eventID eventID = eventID.IDS_IDSTransfer;
        protected service servece_owner = service.Null;
        
        public IDSTransfer()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public IDSTransfer(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
        /// <summary>
        /// Перенос состава на подходы АМКР
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int AddApproaches(int id) {
            try
            {

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddApproaches(id={0})", id), this.servece_owner, eventID);
            }
            return 0;
        }
    }
}
