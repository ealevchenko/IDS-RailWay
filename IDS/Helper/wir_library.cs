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

        public static long? CloseWagon(this WagonInternalRoutes wir, DateTime date_end, string note, string user)
        {
            if (wir == null) return null;
            if (wir.close == null)
            {
                wir.note = note != null ? note : wir.note;
                wir.close = DateTime.Now;
                wir.close_user = user;
                wir.GetLastMovement().CloseMovement(date_end, note, user);
                wir.GetLastOperation().CloseOperation(date_end, note, user);
                // Далее добавить закрытие перемещений по требованию
            }
            return wir.id;
        }
        /// <summary>
        /// Установить вагон на станцию на путь
        /// </summary>
        /// <param name="wir"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="position"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static WagonInternalRoutes SetStationWagon(this WagonInternalRoutes wir, int id_station, int id_way, DateTime date_start, int position, string note, string user)
        {
            if (wir != null && wir.close == null)
            {
                WagonInternalMovement wim = wir.GetLastMovement();
                // Исключим попытку поставить дублирования записи постановки на путь
                if (wim == null || (wim != null && (wim.id_station != id_station || wim.id_way != id_way || wim.position != position)))
                {
                    WagonInternalMovement wim_new = new WagonInternalMovement()
                    {
                        id = 0,
                        //id_wagon_internal_routes = wir.id,
                        id_station = id_station,
                        //station_start = date_start,
                        id_way = id_way,
                        way_start = date_start,
                        id_outer_way = null,
                        outer_way_start = null,
                        outer_way_end = null,
                        position = position,
                        create = DateTime.Now,
                        create_user = user,
                        note = note,
                        parent_id = wim.CloseMovement(date_start, null, user)
                    };
                    wir.WagonInternalMovement.Add(wim_new);
                }

            }
            return wir;
        }

        //public static WagonInternalRoutes SetSendingWagon(this WagonInternalRoutes wir, int id_outer_ways, DateTime date_start, int position, string note, string user)
        //{
        //    if (wir != null && wir.close == null)
        //    {
        //        // Получим последнее положение
        //        WagonInternalMovement wim = wir.GetLastMovement();
        //        // Исключим попытку поставить дублирования записи постановки на путь
        //        if (wim != null && wim.id_outer_way != id_outer_ways)
        //        {
        //            WagonInternalMovement wim_new = new WagonInternalMovement()
        //            {
        //                id = 0,
        //                id_station = wim.id_station,
        //                id_way = wim.id_way,
        //                way_start = wim.way_start,
        //                way_end = wim.way_end == null ? date_start : wim.way_end,
        //                id_outer_way = (int?)id_outer_ways,
        //                outer_way_start = date_start,
        //                outer_way_end = null,
        //                position = position,
        //                create = DateTime.Now,
        //                create_user = user,
        //                note = note,
        //                parent_id = wim.CloseMovement(date_start, null, user),
        //            };
        //            wir.WagonInternalMovement.Add(wim_new);
        //        }

        //    }
        //    return wir;
        //}

        /// <summary>
        /// Установить вагон на путь отправки
        /// </summary>
        /// <param name="wir"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="date_start"></param>
        /// <param name="position"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static WagonInternalRoutes SetSendingWagon_old(this WagonInternalRoutes wir, int id_outer_ways, DateTime date_start, int position, string note, string user)
        {
            if (wir != null && wir.close == null)
            {
                // Получим последнее положение
                WagonInternalMovement wim = wir.GetLastMovement();
                // Исключим попытку поставить дублирования записи постановки на путь
                if (wim != null && wim.id_outer_way != id_outer_ways)
                {
                    WagonInternalMovement wim_new = new WagonInternalMovement()
                    {
                        id = 0,
                        id_station = wim.id_station,
                        id_way = wim.id_way,
                        way_start = wim.way_start,
                        way_end = wim.way_end == null ? date_start : wim.way_end,
                        id_outer_way = (int?)id_outer_ways,
                        outer_way_start = date_start,
                        outer_way_end = null,
                        position = position,
                        create = DateTime.Now,
                        create_user = user,
                        note = note,
                        parent_id = wim.CloseMovement(date_start, null, user), 
                    };
                    wir.WagonInternalMovement.Add(wim_new);
                }

            }
            return wir;
        }

        public static WagonInternalOperation SetOpenOperation(this WagonInternalRoutes wir, int id_operation, DateTime date_start, int? id_condition, int? id_loading_status, string locomotive1, string locomotive2, string note, string user)
        {
            WagonInternalOperation wio_new = null;

            if (wir != null && wir.close == null)
            {
                WagonInternalOperation wio_last = wir.GetLastOperation();
                wio_new = new WagonInternalOperation()
                {
                    id = 0,
                    id_operation = id_operation,
                    operation_start = date_start,
                    id_condition = (id_condition != null ? (int)id_condition : (wio_last != null ? wio_last.id_condition : 0)),
                    id_loading_status = (id_loading_status != null ? (int)id_loading_status : (wio_last != null ? wio_last.id_loading_status : 0)),
                    locomotive1 = locomotive1,
                    locomotive2 = locomotive2,
                    note = note,
                    create = DateTime.Now,
                    create_user = user,
                    parent_id = wio_last.CloseOperation(date_start, null, user)
                };

                wir.WagonInternalOperation.Add(wio_new);
            }
            return wio_new;
        }

        public static WagonInternalOperation SetCloseOperation(this WagonInternalOperation wio, DateTime date_end, string note, string user)
        {
            if (wio != null && wio.close == null)
            {
                wio.CloseOperation(date_end, note, user);
            }
            return wio;
        }
        /// <summary>
        /// Вагон на территории АМКР с операцией предявлен?
        /// </summary>
        /// <param name="context"></param>
        /// <param name="num"></param>
        /// <returns></returns>
        public static bool? isLockPresentOperation(this EFDbContext context, int num)
        {
            WagonInternalRoutes wir = context.GetLastWagon(num);
            if (wir == null) return null;
            if (wir.close == null)
            {
                WagonInternalOperation wio = wir.GetLastOperation();
                if (wio == null) return null;

                return wio.id_operation == 9 ? true : false;
            }
            else {
                return false;
            }
        }
        /// <summary>
        /// Вернуть список вагонов по которым стоит опреация предъявить.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="nums"></param>
        /// <returns></returns>
        public static List<int> GetWagonsLockPresentOperation(this EFDbContext context, List<int> nums)
        {
            List<int> list_result = new List<int>();
            foreach (int num in nums) {
                if (context.isLockPresentOperation(num) == true) {
                    list_result.Add(num);
                }
            }
            return list_result;
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
        /// <summary>
        /// Вернуть последнюю запись позиции вагона
        /// </summary>
        /// <param name="wir"></param>
        /// <returns></returns>
        public static WagonInternalMovement GetLastMovement(this WagonInternalRoutes wir)
        {
            if (wir.WagonInternalMovement == null) return null;
            return wir.WagonInternalMovement.OrderByDescending(m => m.id).FirstOrDefault();
        }
        /// <summary>
        /// Закрыть запись позиции вагона
        /// </summary>
        /// <param name="wim"></param>
        /// <param name="date_end"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static long? CloseMovement(this WagonInternalMovement wim, DateTime date_end, string note, string user)
        {
            if (wim == null) return null;
            if (wim.close == null)
            {
                // Определим какой путь закрывать Внутрений или внешний
                if (wim.id_outer_way == null)
                {
                    // Закроем внутрений
                    wim.way_end = wim.way_end == null ? date_end : wim.way_end;
                    //wim.station_end = wim.station_end == null ? date_end : wim.station_end;

                }
                else
                {
                    // Закроем внешний путь
                    wim.outer_way_end = wim.outer_way_end == null ? date_end : wim.outer_way_end;
                }

                wim.note = note != null ? note : wim.note;
                wim.close = DateTime.Now;
                wim.close_user = user;
            }
            return wim.id;
        }
        /// <summary>
        /// Вернуть станцию на которой стоит вагон
        /// </summary>
        /// <param name="wir"></param>
        /// <returns></returns>
        public static int? GetCurrentStation(this WagonInternalRoutes wir)
        {
            if (wir == null || wir.WagonInternalMovement == null) return null;
            WagonInternalMovement wim = wir.GetLastMovement();
            return wim != null ? (int?)wim.id_station : null;
        }
        /// <summary>
        /// Получить список вагонов на пути 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way"></param>
        /// <returns></returns>
        public static List<WagonInternalMovement> GetMovementWagonsOfWay(this EFDbContext context, int id_way)
        {
            return context.WagonInternalMovement.Where(m => m.id_way == id_way & m.id_outer_way == null & m.way_end == null).OrderBy(p => p.position).ToList();
        }
        /// <summary>
        /// Получить список вагонов на пути 
        /// </summary>
        /// <param name="wim"></param>
        /// <param name="id_way"></param>
        /// <returns></returns>
        public static List<WagonInternalMovement> GetMovementWagonsOfWay(this List<WagonInternalMovement> wims, int id_way)
        {
            return wims.Where(m => m.id_way == id_way & m.id_outer_way == null & m.way_end == null).OrderBy(p => p.position).ToList();
        }

        public static List<int> GetNumWagonsOfWay(this EFDbContext context, int id_way)
        {
            return context.GetMovementWagonsOfWay(id_way).Select(w => w.WagonInternalRoutes.num).ToList();
        }
        public static List<int> GetNumWagonsOfWay(this List<WagonInternalMovement> wims, int id_way)
        {
            return wims.GetMovementWagonsOfWay(id_way).Select(w => w.WagonInternalRoutes.num).ToList();
        }

        #endregion


        #region Методы работы с операциями над вагонами
        public static WagonInternalOperation GetLastOperation(this WagonInternalRoutes wir)
        {
            if (wir.WagonInternalOperation == null) return null;
            return wir.WagonInternalOperation.OrderByDescending(o => o.id).FirstOrDefault();
        }

        public static long? CloseOperation(this WagonInternalOperation wio, DateTime date_end, string note, string user)
        {
            if (wio == null) return null;
            if (wio.close == null)
            {
                wio.operation_end = wio.operation_end == null ? date_end : wio.operation_end;
                wio.note = note != null ? note : wio.note;
                wio.close = date_end;
                wio.close_user = user;
            }
            return wio.id;
        }

        //public static WagonInternalOperation OpenOperation(this WagonInternalOperation wio, DateTime date_end, string user)
        #endregion
    }
}
