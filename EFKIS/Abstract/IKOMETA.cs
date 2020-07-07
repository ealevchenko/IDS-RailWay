using EFKIS.Entities.KOMETA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Abstract
{
    public interface  IKOMETA
    {
        #region VagonSob
        IQueryable<VAGON_SOB> VAGON_SOB { get; }
        IQueryable<VAGON_SOB> GetVAGON_SOB();
        IQueryable<VAGON_SOB> GetVAGON_SOB(int num);
        VAGON_SOB GetVAGON_SOB(int num, DateTime dt);
        IQueryable<VAGON_SOB> GetCurrentVAGON_SOB();

        #endregion
    }
}
