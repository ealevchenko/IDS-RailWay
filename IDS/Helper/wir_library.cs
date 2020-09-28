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

        public static long? CloseWagon(this WagonInternalRoutes wir, DateTime date_end, string user)
        {
            if (wir == null) return null;
            if (wir.close == null)
            {
                wir.close = DateTime.Now;
                wir.close_user = user;
                wir.GetLastMovement().CloseMovement(date_end, user);
                wir.GetLastOperation().CloseOperation(date_end, user);
                // Далее добавить закрытие перемещений по требованию
            }
            return wir.id;
        }

        public static WagonInternalRoutes SetStationWagon(this WagonInternalRoutes wir, int id_station, int id_way, DateTime date_start, int position, string user)
        {
            if (wir != null && wir.close == null)
            {
                WagonInternalMovement wim = wir.GetLastMovement();
                // Исключим попытку поставить дублирования записи постановки на путь
                if (wim != null && (wim.id_station != id_station || wim.id_way != id_way || wim.position != position))
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
                        parent_id = wim.CloseMovement(date_start, user)
                    };
                    wir.WagonInternalMovement.Add(wim_new);
                }

            }
            return wir;
        }

        public static WagonInternalRoutes SetOpenOperation(this WagonInternalRoutes wir, int id_operation, DateTime date_start, int? id_condition, int? id_loading_status, string locomotive1, string locomotive2, string user)
        {
            if (wir != null && wir.close == null)
            {
                WagonInternalOperation wio_last = wir.GetLastOperation();
                // Исключим попытку дублирования операции
                //if (wio_last != null && (wio_last.id_operation != id_operation || wim.id_way != id_way || wim.position != position))
                //{ 
                
                //}
                WagonInternalOperation wio_new = new WagonInternalOperation()
                {
                    id = 0,
                    id_operation = id_operation,
                    operation_start = date_start,
                    id_condition = (id_condition != null ? (int)id_condition : (wio_last != null ? wio_last.id_condition : 0)),
                    id_loading_status = (id_loading_status != null ? (int)id_loading_status : (wio_last != null ? wio_last.id_loading_status : 0)),
                    locomotive1 = locomotive1,
                    locomotive2 = locomotive2,
                    create = DateTime.Now,
                    create_user = user,
                    parent_id = wio_last.CloseOperation(date_start, user)
                };

                wir.WagonInternalOperation.Add(wio_new);
            }
            return wir;
        }

        public static WagonInternalRoutes SetCloseOperation(this WagonInternalRoutes wir, DateTime date_end, string user)
        {
            if (wir != null && wir.close == null)
            {
                wir.GetLastOperation().CloseOperation(date_end, user);
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

        public static long? CloseOperation(this WagonInternalOperation wio, DateTime date_end, string user)
        {
            if (wio == null) return null;
            if (wio.close == null)
            {
                wio.operation_end = wio.operation_end == null ? date_end : wio.operation_end;
                wio.close = date_end;
                wio.create_user = user;
            }
            return wio.id;
        }

        //public static WagonInternalOperation OpenOperation(this WagonInternalOperation wio, DateTime date_end, string user)
        #endregion
    }
}
