using EFIDS.Concrete;
using EFIDS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS.Helper
{
    public static class wir_library
    {
        #region Методы работы с вагонами
        public static WagonInternalRoutes GetLastWagon(this EFDbContext context, int num)
        {
            return context.WagonInternalRoutes.Where(r => r.num == num).OrderByDescending(w => w.id).FirstOrDefault();
        }

        public static WagonInternalRoutes CloseWagon(this WagonInternalRoutes wir, DateTime date_end, string user)
        {
            wir.close = date_end;
            wir.close_user = user;
            wir.GetLastMovement().CloseMovement(date_end, user);
            wir.GetLastOperation().CloseOperation(date_end, user);
            return wir;
        }

        public static WagonInternalRoutes SetStationWagon(this WagonInternalRoutes wir, int id_station, int id_way, DateTime date_start, int position, string user)
        {
            if (wir != null && wir.close == null)
            {
                WagonInternalMovement wim_new = new WagonInternalMovement()
                {
                    id = 0,
                    //id_wagon_internal_routes = wir.id,
                    id_station = id_station,
                    station_start = date_start,
                    id_way = id_way,
                    way_start = date_start,
                    position = position,
                    create = DateTime.Now,
                    create_user = user,
                    parent_id = wir.GetLastMovement().CloseMovement(date_start, user)
                };

                wir.WagonInternalMovement.Add(wim_new);
            }
            return wir;
        }
        #endregion


        #region Методы работы с позициями вагонов

        public static int GetNextPosition(this EFDbContext context, int id_way)
        {
            int position = 1;
            List<WagonInternalMovement> wim = context.WagonInternalMovement.Where(m => m.id_way == id_way && m.way_end == null).ToList();
            if (wim != null && wim.Count() > 0)
            {
                position = wim.Max(m => m.position) + 1;
            }
            return position;
        }

        public static WagonInternalMovement GetLastMovement(this WagonInternalRoutes wir)
        {
            if (wir.WagonInternalMovement == null) return null;
            return wir.WagonInternalMovement.OrderByDescending(m => m.id).FirstOrDefault();
        }

        public static long? CloseMovement(this WagonInternalMovement wim, DateTime date_end, string user)
        {
            if (wim == null) return null;
            if (wim.close == null)
            {
                wim.way_end = wim.way_end == null ? date_end : wim.way_end;
                wim.station_end = wim.station_end == null ? date_end : wim.station_end;
                wim.close = DateTime.Now;
                wim.close_user = user;
            }
            return wim.id;
        }
        #endregion


        #region Методы работы с операциями над вагонами
        public static WagonInternalOperation GetLastOperation(this WagonInternalRoutes wir)
        {
            if (wir.WagonInternalOperation == null) return null;
            return wir.WagonInternalOperation.OrderByDescending(o => o.id).FirstOrDefault();
        }

        public static WagonInternalOperation CloseOperation(this WagonInternalOperation wio, DateTime date_end, string user)
        {
            if (wio != null && wio.close == null)
            {
                wio.operation_end = wio.operation_end == null ? date_end : wio.operation_end;
                wio.close = date_end;
                wio.create_user = user;
            }
            return wio;
        }
        #endregion
    }
}
