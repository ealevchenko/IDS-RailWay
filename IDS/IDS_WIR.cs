using EFIDS.Concrete;
using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using IDS.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    /// <summary>
    /// Класс данных задание на роспуск
    /// </summary>
    public class DissolutionWagon
    {
        public long wir_id { get; set; }
        public int position { get; set; }
        public int id_way_dissolution { get; set; }
    }
    /// <summary>
    /// Класс данных задание на операции дислокация, отправка, прием
    /// </summary>
    public class ListOperationWagon
    {
        public long wir_id { get; set; }
        public int position { get; set; }
    }
    /// <summary>
    /// Класс данных WIR c новой позицией
    /// </summary>
    public class WagonInternalRoutesPosition
    {
        public WagonInternalRoutes wir { get; set; }
        public int new_position { get; set; }
    }

    public enum errors_wir : int
    {
        global = -1,
        cancel_save_changes = -2,       // Отмена сохранений изменений в базе данных (были ошибки по ходу выполнения всей операции)
        not_input_value = -100,
        not_sostav = -101, //...
        not_wagon = -102,
        not_arrival_wir = -103,         // Нет записи [WagonInternalRoutes] зашедшей на АМКР
        not_open_wir = -104,            // Нет открытой записи положения вагона. (Если вагон защел тогда вагон всегда должен гдето стоять!)
        not_set_way_wir = -105,         // Нет вагон стоит не натом пути по которому нужно провести операцию.
        not_way_on = -106,              // Неуказан путь приема

    }

    public class IDS_WIR : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSWIR;

        public IDS_WIR() : base()
        {

        }

        public IDS_WIR(service servece_owner) : base(servece_owner)
        {

        }
        //protected service servece_owner = service.Null;
        ///// <summary>
        ///// 
        ///// </summary>
        //public IDS_WIR()
        //{

        //}
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="servece_owner"></param>
        //public IDS_WIR(service servece_owner)
        //{
        //    this.servece_owner = servece_owner;
        //}
        #region ПРИБЫТИЕ ВАГОНОВ АРМ ДИСПЕТЧЕРА
        /// <summary>
        /// Принять вагон
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="position"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int IncomingWagon(ref EFDbContext context, int id_station, int id_way, DateTime date_start, int position, ArrivalCars wagon, string user)
        {
            try
            {
                long? parent_id = null;
                // Получим последнюю запись по вагону
                WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
                if (last_wir != null)
                {
                    // Запись есть проверим, для этого прибытия была создана запись
                    if (last_wir.id_arrival_car == wagon.id) return 0; // Строка для вагона уже создана
                    // Запись не закрыта (!Заись перед созданием должна быть закрыта, вагон выйти из АМКР)
                    parent_id = last_wir.CloseWagon(date_start, "Закрыта принудительно, вагон зашел с новым составом.", user);
                    context.Update(last_wir); // Обновим контекст
                }
                // Определим входящую поставку
                List<SAPIncomingSupply> sap_is = wagon.SAPIncomingSupply.ToList();
                Arrival_UZ_Vagon vag_doc = wagon.Arrival_UZ_Vagon;

                // Создадим новую строкку
                WagonInternalRoutes new_wir = new WagonInternalRoutes()
                {
                    id = 0,
                    num = wagon.num,
                    id_arrival_car = wagon.id,
                    id_sap_incoming_supply = sap_is != null && sap_is.Count() > 0 ? (long?)sap_is[0].id : null,
                    create = DateTime.Now,
                    create_user = user,
                    parent_id = parent_id

                };
                new_wir.SetStationWagon(id_station, id_way, date_start, position, null, user);
                new_wir.SetOpenOperation(1, date_start, (int)vag_doc.id_condition, vag_doc.vesg > 0 ? 1 : 0, null, null, null, user).SetCloseOperation(date_start, null, user);
                context.Insert(new_wir); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IncomingWagon(context={0}, id_station={1}, id_way={2}, date_start={3}, position={4}, wagon={5}, user={6})",
                    context, id_station, id_way, date_start, position, wagon, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять вагоны
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="wagons"></param>
        /// <param name="numeration"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer IncomingWagons(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<ArrivalCars> wagons, bool numeration, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {


                if (context == null)
                {
                    context = new EFDbContext();
                }
                int position = context.GetNextPosition(id_way);
                foreach (ArrivalCars wagon in numeration ? wagons.OrderByDescending(w => w.position_arrival) : wagons.OrderBy(w => w.position_arrival))
                {
                    int result = IncomingWagon(ref context, id_station, id_way, date_start, position, wagon, user);
                    rt.SetMovedResult(result, wagon.num);
                    position++;
                }
                rt.SetResult(context.SaveChanges());
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IncomingWagons(context={0}, id_station={1}, id_way={2}, date_start={3}, wagons={4}, numeration={5}, user={6})",
                    context, id_station, id_way, date_start, wagons, numeration, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion

        #region АРМ ДИСПЕТЧЕРА
        /// <summary>
        /// Перенумерация вагонов по указаному пути с указаной начальной позиции
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way"></param>
        /// <param name="position_start"></param>
        /// <returns></returns>
        public int RenumberingWagons(ref EFDbContext context, int id_way, int position_start)
        {
            try
            {
                int count = 0;
                if (context == null)
                {
                    context = new EFDbContext();
                }
                List<WagonInternalMovement> list_wim = context.WagonInternalMovement.Where(m => m.id_way == id_way & m.id_outer_way == null & m.way_end == null).OrderBy(p => p.position).ToList();
                if (list_wim != null)
                {
                    count = list_wim.Count();
                    foreach (WagonInternalMovement wim in list_wim)
                    {
                        wim.position = position_start++;
                    }
                }
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way={1}, position_start={2})", context, id_way, position_start), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        #region Операции "Дислокации"
        /// <summary>
        /// Выполнить дислокацию по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DislocationWagon(ref EFDbContext context, int id_way_from, int id_way_on, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {

                if (wagon == null) return (int)errors_wir.not_arrival_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_wir.not_open_wir;
                if (wim.id_way != id_way_from) return (int)errors_wir.not_set_way_wir;
                wagon.SetStationWagon(wim.id_station, id_way_on, lead_time, position_on, null, user);
                // Установим и закроем операцию дислокация -3              
                wagon.SetOpenOperation(3, lead_time.AddMilliseconds(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagon(context={0}, id_way_from={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_way_from, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Дислокация вагонов на станци
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagons"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer DislocationWagons(ref EFDbContext context, int id_way_from, bool reverse, int id_way_on, bool side_on, DateTime lead_time, List<WagonInternalRoutes> wagons, string locomotive1, string locomotive2, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Определим сортировку (реверс)
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.GetLastMovement().position).ToList() : wagons.OrderBy(w => w.GetLastMovement().position).ToList();
                    // Подготовим путь приема (перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = side_on == false ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = DislocationWagon(ref context, id_way_from, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_wir.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way_from={1}, reverse={2}, id_way_on={3}, side={4}, lead_time={5}, wagons={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_way_from, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция дислокации вагонов на станции АМКР
        /// </summary>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="list_dislocation"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DislocationWagonsOfStation(int id_way_from, bool reverse, List<ListOperationWagon> list_dislocation, int id_way_on, bool side_on, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                List<WagonInternalRoutes> wagons = new List<WagonInternalRoutes>();
                foreach (ListOperationWagon dw in list_dislocation)
                {
                    wagons.Add(context.WagonInternalRoutes.Where(r => r.id == dw.wir_id).FirstOrDefault());
                }
                // Перенесем вагоны 
                res = DislocationWagons(ref context, id_way_from, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user);
                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.result > 0)
                {
                    int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                    if (result_rnw > 0)
                    {
                        // Применим перенумерацию
                        context.SaveChanges();
                    }
                }
                string mess = String.Format("Операция дислокации вагонов на станции АМКР. Код выполнения = {0}. Путь отправки = {1}, реверс = {2}, путь приема = {3}, сторона = {4}, время выполнения операции = {5}. Результат переноса [выбрано для переноса = {6}, перенесено = {7}, пропущено = {8}, ошибок переноса = {9}].",
                    res.result, id_way_from, reverse, id_way_on, side_on, lead_time, res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция дислокации вагонов на станции АМКР."), start, stop, res.result);

                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagonsOfStation(id_way_from={0},reverse ={1}, list_dislocation={2}, id_way_on={3}, side_on={4}, lead_time={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    id_way_from, reverse, list_dislocation, id_way_on, side_on, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region Операции "Роспуска"
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DissolutionWagon(ref EFDbContext context, int id_way_from, int id_way_on, int position_on, DateTime date_start, DateTime date_stop, WagonInternalRoutes wagon, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_wir.not_arrival_wir;  // Нет перечня вагонов
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_wir.not_way_on;         // Неуказан путь приема
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_wir.not_open_wir;       //  Нет открытой записи положения вагона. (Если вагон защел тогда вагон всегда должен гдето стоять!)
                if (wim.id_way != id_way_from) return (int)errors_wir.not_set_way_wir; // Нет вагон стоит не натом пути по которому нужно провести операцию.
                wagon.SetStationWagon(id_station_on, id_way_on, date_stop, position_on, null, user);
                // Установим и закроем операцию роспуск -4              
                wagon.SetOpenOperation(4, date_start, null, null, null, null, null, user).SetCloseOperation(date_stop, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DissolutionWagon(context={0}, id_way_from={1}, id_way_on={2}, position_on={3}, date_start={4}, date_stop={5}, wagon={6}, user={6})",
                    context, id_way_from, id_way_on, position_on, date_start, date_stop, wagon, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Роспуск вагонов
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_way_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagons"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer DissolutionWagons(ref EFDbContext context, int id_way_from, int id_way_on, DateTime date_start, DateTime date_stop, List<WagonInternalRoutes> wagons, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Отсортируем вагоны по позиции
                    bool reverse = false;
                    bool side_on = true; // false -голова

                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.GetLastMovement().position).ToList() : wagons.OrderBy(w => w.GetLastMovement().position).ToList();
                    // Подготовим путь приема (перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = side_on == false ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = DissolutionWagon(ref context, id_way_from, id_way_on, position, date_start, date_stop, wagon, user);
                        rt.SetMovedResult(result, wagon.num);
                        if (result > 0 && rt.result >= 0)
                        {
                            rt.result += 1;
                        }
                        if (result < 0)
                        {
                            rt.result = result;
                        }
                        position++;
                    }
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DissolutionWagons(context={0}, id_way_from={1}, id_way_on={2}, date_start={3}, date_stop={4}, wagons={5}, user={6})",
                    context, id_way_from, id_way_on, date_start, date_stop, wagons, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция дислокации вагонов на станции АМКР
        /// </summary>
        /// <param name="list_wir"></param>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DissolutionWagonsOfStation(int id_way_from, List<DissolutionWagon> list_dissolution, DateTime date_start, DateTime date_stop, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                string s_id_way_on = "";
                ListResultTransfer lrt = new ListResultTransfer();

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Сгруппируем по путям роспуска
                List<IGrouping<int, DissolutionWagon>> group_dissolution = list_dissolution
                                .ToList()
                                .GroupBy(w => w.id_way_dissolution)
                                .ToList();

                EFDbContext context = new EFDbContext();
                // Пройдемся по путям роспуска
                foreach (IGrouping<int, DissolutionWagon> gr_dw in group_dissolution.ToList())
                {

                    int id_way_dissolution = gr_dw.Key;
                    s_id_way_on += id_way_dissolution.ToString() + ";";
                    List<DissolutionWagon> list_dw = gr_dw.OrderBy(w => w.position).ToList();
                    List<WagonInternalRoutes> wagons = new List<WagonInternalRoutes>();
                    foreach (DissolutionWagon dw in list_dw)
                    {
                        wagons.Add(context.WagonInternalRoutes.Where(r => r.id == dw.wir_id).FirstOrDefault());
                    }
                    ResultTransfer res = new ResultTransfer(wagons.Count);
                    // Перенесем вагоны 
                    res = DissolutionWagons(ref context, id_way_from, id_way_dissolution, date_start, date_stop, wagons, user);
                    lrt.AddResultTransfer(res);
                    // Проверим на ошибки
                    if (lrt.result < 0)
                    {
                        lrt.SetResult((int)errors_wir.cancel_save_changes);
                        break;
                    }
                    // добавим результат
                    
                }
                // Все вагоны перенесены, сохраним изменения если небыло ошибок
                if (lrt.result > 0)
                {
                    lrt.SetResult(context.SaveChanges());
                    // Если все прошло сделаем перенумерацию на пути отправки
                    if (lrt.result > 0)
                    {
                        int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                        if (result_rnw > 0)
                        {
                            // Применим перенумерацию
                            lrt.SetResult(context.SaveChanges());
                        }
                    }
                }

                string mess = String.Format("Операция роспуска вагонов на станциях АМКР. Код выполнения = {0}. Путь отправки = {1}, пути приема = {2}, время начала операции = {3}, время конца операции = {4}. Результат переноса [выбрано для переноса = {5}, перенесено = {6}, пропущено = {7}, ошибок переноса = {8}].",
                    lrt.result, id_way_from, s_id_way_on, date_start, date_stop,
                    lrt.count, lrt.moved, lrt.skip, lrt.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(lrt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция роспуска вагонов на станции АМКР."), start, stop, lrt.result);
                return lrt.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DissolutionWagonsOfStation(id_way_from={0}, list_dissolution={1}, date_start={2}, date_stop={3}, user={4})",
                    id_way_from, list_dissolution, date_start, date_stop, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region  Операция "Отправка"
        public int SendingWagon(ref EFDbContext context, int id_way_from, int id_outer_ways, int position_on, int num_sostav, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_wir.not_arrival_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_wir.not_open_wir;
                if (wim.id_way != id_way_from) return (int)errors_wir.not_set_way_wir;
                // Проверим вагон уже стоит ?
                if (wim.id_outer_way == id_outer_ways && wim.position == position_on) return 0; // Вагон отправлен пропустить операцию
                // Вагон не стоит, переставим.
                string note_sostav = "Состав №" + num_sostav.ToString();
                wagon.SetSendingWagon(id_outer_ways, lead_time, position_on, note_sostav, user);
                // Установим и закроем операцию отправления -5              
                wagon.SetOpenOperation(5, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendingWagon(context={0}, id_way_from={1}, id_outer_ways={2}, position_on={3}, num_sostav={4}, lead_time={5}, wagon={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_way_from, id_outer_ways, position_on, num_sostav, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Отправка вагонов на станцию АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="num_sostav"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagons"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer SendingWagons(ref EFDbContext context, int id_way_from, int id_outer_ways, int num_sostav, DateTime lead_time, List<WagonInternalRoutesPosition> wagons, string locomotive1, string locomotive2, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Отсортируем вагоны по позиции
                    bool reverse = false;
                    //bool side_on = true; // false -голова

                    // Определим позиции (реверс)
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.new_position).Select(w=>w.wir).ToList() : wagons.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    // Подготовим путь приема (перестроим позиции)
                    //int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов (все отправки начинаются с 1 позиции)
                    int position = 1;

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = SendingWagon(ref context, id_way_from, id_outer_ways, position, num_sostav, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_wir.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way_from={1}, id_outer_ways={2}, num_sostav={3}, lead_time={4}, wagons={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_way_from, id_outer_ways, num_sostav, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_wir.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция отправки вагонов на станцию АМКР
        /// </summary>
        /// <param name="id_way_from"></param>
        /// <param name="list_sending"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="num_sostav"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendingWagonsOfStation(int id_way_from, List<ListOperationWagon> list_sending, int id_outer_ways, int num_sostav, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                List<WagonInternalRoutesPosition> wagons = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in list_sending.OrderBy(w => w.position).ToList())
                {
                    wagons.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }
                // Отправляем все вагоны
                res = SendingWagons(ref context, id_way_from, id_outer_ways, num_sostav, lead_time, wagons, locomotive1, locomotive2, user);
                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.result > 0)
                {
                    int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                    if (result_rnw > 0)
                    {
                        // Применим перенумерацию
                        context.SaveChanges();
                    }
                }
                string mess = String.Format("Операция отправки вагонов на станцию АМКР. Код выполнения = {0}. Путь отправки = {1}, внешний путь приема = {2}, номер состава = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                    res.result, id_way_from, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2, 
                    res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция отправки вагонов на станцию АМКР."), start, stop, res.result);

                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendingWagonsOfStation(id_way_from={0}, list_sending={1}, id_outer_ways={2}, num_sostav={3}, lead_time={4}, locomotive1={5}, locomotive2={6}, user={7})",
                    id_way_from, list_sending, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #region  Операция "Принять вагон"
        /// <summary>
        /// Принять вагон на станцию
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ArrivalWagon(ref EFDbContext context, int id_outer_way, int id_way_on, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_wir.not_arrival_wir;
                // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_wir.not_way_on;         // Неуказан путь приема
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_wir.not_open_wir;
                if (wim.id_outer_way != id_outer_way) return (int)errors_wir.not_set_way_wir;
                // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position_on) return 0; // Вагон принят пропустить операцию
                // Вагон не принят, принять.
                string note_sostav = wim.note + "- принят";
                wagon.SetStationWagon(id_station_on, id_way_on, lead_time, position_on, note_sostav, user);
                // Установим и закроем операцию отправления -5              
                wagon.SetOpenOperation(6, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagon(context={0}, id_outer_ways={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_outer_way, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Приемка вагонов на АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagons"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ArrivalWagons(ref EFDbContext context, int id_outer_way, bool reverse, int id_way_on, bool side_on, DateTime lead_time, List<WagonInternalRoutesPosition> wagons, string locomotive1, string locomotive2, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }


                if (wagons != null && wagons.Count() > 0)
                {
                    // Определим позиции (реверс)
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.new_position).Select(w => w.wir).ToList() : wagons.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    //Подготовим путь приема(перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (side_on == false ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = side_on == false ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = ArrivalWagon(ref context, id_outer_way, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_wir.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagons(context={0},id_outer_ways ={1}, reverse={2}, id_way_on={3}, side_on={4}, lead_time={5}, wagons={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_outer_way, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_wir.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция принять вагон на станцию АМКР
        /// </summary>
        /// <param name="id_outer_ways"></param>
        /// <param name="reverse"></param>
        /// <param name="list_arrival"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ArrivalWagonsOfStation(int id_outer_way, bool reverse, List<ListOperationWagon> list_arrival, int id_way_on, bool side_on, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultTransfer res = new ResultTransfer(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                List<WagonInternalRoutesPosition> wagons = new List<WagonInternalRoutesPosition>();

                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in list_arrival.OrderBy(w => w.position).ToList())
                {
                    wagons.Add(new WagonInternalRoutesPosition() {   wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }
                // Отправляем все вагоны
                res = ArrivalWagons(ref context, id_outer_way, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user);
                //// Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                //if (res.result > 0)
                //{
                //    int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                //    if (result_rnw > 0)
                //    {
                //        // Применим перенумерацию
                //        context.SaveChanges();
                //    }
                //}
                string mess = String.Format("Операция прибытия вагонов на станцию АМКР. Код выполнения = {0}. Внешний путь отправки = {1}, реверс = {2}, путь приема = {3}, сторона = {4}, время  операции = {5}. Результат переноса [выбрано для переноса = {6}, перенесено = {7}, пропущено = {8}, ошибок переноса = {9}].",
                    res.result, id_outer_way, reverse, id_way_on, side_on, lead_time, res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция прибытия вагонов на станцию АМКР."), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagonsOfStation(id_outer_ways={0}, reverse={1}, list_arrival={2}, id_way_on={3}, side_on={4}, lead_time={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    id_outer_way, reverse, list_arrival, id_way_on, side_on, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #endregion

        #region ОТПРАВКА ВАГОНОВ АРМ ДИСПЕТЧЕРА
        /// <summary>
        /// Метод переносит вагон на станцию отправки по данным КИС (!временный метод)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="position"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SetStationOutgoingWagonOfKIS(ref EFDbContext context, int id_station, int id_way, DateTime date_start, int position, OutgoingCars wagon, string user)
        {
            try
            {
                long? parent_id = null;
                //long? id_sap_outbound_supply = null; // Добавить исходящую поставку 
                // Проверим наличие вагона в справочнике
                //Directory_Wagons wag_new = null;
                Directory_Wagons wag = context.Directory_Wagons.Where(w => w.num == wagon.num).FirstOrDefault();
                if (wag == null)
                {
                    // Вагона нет создать
                    IDSDirectory ids_dir = new IDSDirectory(this.servece_owner);

                    //TODO: Замена 
                    //Directory_Wagons wag_new = ids_dir.GetDirectory_WagonsOfNum(wagon.num, 0, null, 0, null, user);
                    Directory_Wagons wag_new = ids_dir.OperationCreateUpdateWagon(ref context, wagon.num, 0, null, 0, null, user);


                    //foreach (Directory_Wagons dir in context.Directory_Wagons) {
                    //    context.Entry(dir).Reload();
                    //}
                    //var s = context.Directory_Wagons;   //.Database Refresh(RefreshMode, Object);
                    //context.Entry(s).Reload();
                    //((IObjectContextAdapter)context).ObjectContext.Refresh(RefreshMode.ClientWins, context.Directory_Wagons);
                }


                // Получим последнюю запись по вагону
                WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
                if (last_wir != null)
                {
                    if (last_wir.id_outgoing_car == wagon.id) return 0;     // Строка для вагона уже закрыта
                    if (last_wir.close == null)
                    {
                        // Запись не закрыта, вагон на территории АМКР
                        last_wir.SetStationWagon(id_station, id_way, date_start, position, "Перенесен на станцию и путь отправки по данным КИС", user);
                        last_wir.SetOpenOperation(2, date_start, 0, 3, null, null, "Начата операция отправки по данным КИС", user);
                        context.Update(last_wir);                                           // Обновим контекст
                        return 1;
                    }
                    else
                    {
                        //Запись закрыта, вагон вышел или не заходил, определим parent_id
                        parent_id = last_wir.id;
                    }
                }
                // Создадим новую строку (Сделаем принудительный заход на територию АМКР, и сразу поставим на станцию отпраки на УЗ)
                last_wir = new WagonInternalRoutes()
                {
                    id = 0,
                    num = wagon.num,
                    id_arrival_car = null,                                  // Информации нет, вагон не принимали
                    id_sap_incoming_supply = null,                          // Информации нет, вагон не принимали
                    //doc_outgoing_car = null,
                    //id_outgoing_car = wagon.id,
                    //id_sap_outbound_supply = id_sap_outbound_supply,      // Добавить исходящую поставку 
                    note = "Создан по данным КИС (Отправка на УЗ)",
                    create = DateTime.Now,
                    create_user = user,
                    parent_id = parent_id,
                    //Directory_Wagons = wag_new != null ? wag_new : wag
                };
                //last_wir.Directory_Wagons = wag_new;
                last_wir.SetStationWagon(id_station, id_way, date_start, position, "Перенесен на станцию и путь отправки по данным КИС", user);
                last_wir.SetOpenOperation(2, date_start, 0, 3, null, null, "Начата операция отправки по данным КИС", user);
                context.Insert(last_wir);                                   // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SetStationOutgoingWagonOfKIS(context={0}, id_station={1}, id_way={2}, date_start={3}, position={4}, wagon={5}, user={6})",
                    context, id_station, id_way, date_start, position, wagon, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Метод переносит вагоны на станцию отправки по данным КИС (!временный метод)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="wagons"></param>
        /// <param name="numeration"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer SetStationOutgoingWagonsOfKIS(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<OutgoingCars> wagons, bool numeration, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {


                if (context == null)
                {
                    context = new EFDbContext();
                }
                int position = context.GetNextPosition(id_way);
                foreach (OutgoingCars wagon in numeration ? wagons.OrderByDescending(w => w.position_outgoing) : wagons.OrderBy(w => w.position_outgoing))
                {
                    int result = SetStationOutgoingWagonOfKIS(ref context, id_station, id_way, date_start, position, wagon, user);
                    rt.SetMovedResult(result, wagon.num);
                    position++;
                }
                rt.SetResult(context.SaveChanges());
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SetStationOutgoingWagonsOfKIS(context={0}, id_station={1}, id_way={2}, date_start={3}, wagons={4}, numeration={5}, user={6})",
                    context, id_station, id_way, date_start, wagons, numeration, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Выполнить отправку вагона
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="position"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OutgoingWagon(ref EFDbContext context, int id_station, int id_way, DateTime date_start, int position, OutgoingCars wagon, string user)
        {
            try
            {
                //long? parent_id = null;
                long? id_sap_outbound_supply = null; // Добавить исходящую поставку 
                // Проверим наличие вагона в справочнике

                Directory_Wagons wag = context.Directory_Wagons.Where(w => w.num == wagon.num).FirstOrDefault();
                // Получим последнюю запись по вагону
                WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
                if (last_wir != null && last_wir.close == null && (last_wir.id_outgoing_car == wagon.id || last_wir.id_outgoing_car == null))
                {
                    // Запись не закрыта и id_outgoing_car совподает или пустой
                    last_wir.id_outgoing_car = wagon.id;
                    last_wir.id_sap_outbound_supply = id_sap_outbound_supply;                                               // Добавить исходящую поставку
                    last_wir.CloseWagon(date_start, "Отправлен на УЗ по данным КИС", user);                                 // Закроет все операции и дислокации
                    context.Update(last_wir);                                                                               // Обновим контекст
                    return 1;
                }
                else
                {
                    // Запись закрыта 
                    if (last_wir.id_outgoing_car == wagon.id)
                    {
                        return 0; // Вагон уже закрыт
                    }
                    return (int)errors_wir.not_arrival_wir; // В ИДС Нет вагона защедшего на АМКР (Ранее небыл принят), нельзя отправить вагон которого нет в системе
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OutgoingWagon(context={0}, id_station={1}, id_way={2}, date_start={3}, position={4}, wagon={5}, user={6})",
                    context, id_station, id_way, date_start, position, wagon, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Выполнить отправку вагонов
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="date_start"></param>
        /// <param name="wagons"></param>
        /// <param name="numeration"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OutgoingWagons(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<OutgoingCars> wagons, bool numeration, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {


                if (context == null)
                {
                    context = new EFDbContext();
                }
                int position = context.GetNextPosition(id_way);
                foreach (OutgoingCars wagon in numeration ? wagons.OrderByDescending(w => w.position_outgoing) : wagons.OrderBy(w => w.position_outgoing))
                {
                    int result = OutgoingWagon(ref context, id_station, id_way, date_start, position, wagon, user);
                    rt.SetMovedResult(result, wagon.num);
                    position++;
                }
                rt.SetResult(context.SaveChanges());
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OutgoingWagons(context={0}, id_station={1}, id_way={2}, date_start={3}, wagons={4}, numeration={5}, user={6})",
                    context, id_station, id_way, date_start, wagons, numeration, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion
    }
}
