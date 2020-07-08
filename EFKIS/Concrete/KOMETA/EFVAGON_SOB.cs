using EFKIS.Abstract;
using EFKIS.Entities.KOMETA;
using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Concrete.KOMETA
{
    public class EFVAGON_SOB:IKOMETA
    {

        private eventID eventID = eventID.EFKIS_VAGON_SOB;

        protected EFDbContext context = new EFDbContext();
        
        
        public IQueryable<VAGON_SOB> VAGON_SOB
        {
            get { return context.VAGON_SOB; }
        }

        public IQueryable<VAGON_SOB> GetVAGON_SOB()
        {
            try
            {
                return VAGON_SOB;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetVAGON_SOB()"), eventID);
                return null;
            }
        }

        public IQueryable<VAGON_SOB> GetVAGON_SOB(int num)
        {
            try
            {
                return VAGON_SOB.Where(c => c.N_VAGON == num).OrderByDescending(c => c.DATE_AR);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetVagonsSob(etsng={0})", num), eventID);
                return null;
            }
        }

        public VAGON_SOB GetVAGON_SOB(int num, DateTime dt)
        {
            try
            {
                return VAGON_SOB.Where(v => v.N_VAGON == num && v.DATE_AR <= dt & v.DATE_END == null).FirstOrDefault();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetVagonsSob(num={0}, dt={1})", num, dt), eventID);
                return null;
            }
        }


        public IQueryable<VAGON_SOB> GetCurrentVAGON_SOB()
        {
            try
            {
                return VAGON_SOB.Where(v => v.DATE_AR != null & v.DATE_END == null).AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentVAGON_SOB()"), eventID);
                return null;
            }
        }

        public VAGON_SOB GetCurrentVAGON_SOB(int num)
        {
            try
            {
                return VAGON_SOB.Where(v => v.N_VAGON== num && v.DATE_AR != null && v.DATE_END == null).FirstOrDefault();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentVAGON_SOB(num={0})", num), eventID);
                return null;
            }
        }
    }
}
