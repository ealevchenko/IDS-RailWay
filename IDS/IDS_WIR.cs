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
    /// <summary>
    /// Класс данных сотояние парка новая позиция
    /// </summary>
    public class ParkStatePosition
    {
        public int id_way { get; set; }
        public int num { get; set; }
        public int position { get; set; }
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

        public IDS_WIR()
            : base()
        {

        }

        public IDS_WIR(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ПРИБЫТИЕ ВАГОНОВ (АРМ ДИСПЕТЧЕРА)
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
                    // Запись не закрыта (!Запись перед созданием должна быть закрыта, вагон выйти из АМКР)
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

        #region ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ - АРМ ДИСПЕТЧЕРА
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
                wagon.SetOpenOperation(3, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
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
                    List<WagonInternalRoutes> wagon_position = reverse == true ? wagons.OrderByDescending(w => w.new_position).Select(w => w.wir).ToList() : wagons.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

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
                    wagons.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
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

        #region Операция "Применить состояние парка"
        /// <summary>
        /// Принять вагон по состоянию парка
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way"></param>
        /// <param name="position"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ApplyWagonParkState(ref EFDbContext context, int id_station, int id_way, int position, DateTime lead_time, WagonInternalRoutes wagon, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagon == null) return (int)errors_wir.not_arrival_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_wir.not_open_wir;
                // Проверим вагон уже стоит ?
                if (wim.id_station == id_station && wim.id_way == id_way && wim.position == position) return 0; // Вагон стоит на станции на пути и в позиции, пропустить операцию
                string note = "Перенесён по состоянию парка";
                wagon.SetStationWagon(id_station, id_way, lead_time, position, note, user);
                // Установим и закроем операцию ручная расстановка -3              
                wagon.SetOpenOperation(8, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonParkState(context={0}, id_station={1}, id_way={2}, position={3}, lead_time={4}, wagon={5}, user={6})",
                    context, id_station, id_way, position, lead_time, wagon, user), servece_owner, eventID);
                return (int)errors_wir.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять вагоны по состоянию парка
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="wagons_ps"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ApplyWagonsParkState(ref EFDbContext context, int id_station, List<ParkStatePosition> wagons_ps, DateTime lead_time, string user)
        {
            ResultTransfer rt = new ResultTransfer(wagons_ps.Count());
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                if (wagons_ps != null && wagons_ps.Count() > 0)
                {
                    // Получить все вагоны которые стоят на указаной станции по всем путям
                    List<WagonInternalMovement> old_dislocation = context.WagonInternalMovement.Where(m => m.id_station == id_station && m.way_end == null).OrderBy(c => c.id_way).OrderBy(c => c.position).ToList();
                    // Пройдемся по каждому вагону
                    foreach (ParkStatePosition wagon in wagons_ps.OrderBy(c => c.id_way).OrderBy(c => c.position).ToList())
                    {
                        WagonInternalRoutes wir_wagon = context.GetLastWagon(wagon.num);
                        if (wir_wagon != null)
                        {
                            WagonInternalMovement el = old_dislocation.Find(w => w.id_wagon_internal_routes == wir_wagon.id);
                            bool res_remove = old_dislocation.Remove(el);
                            int result = ApplyWagonParkState(ref context, id_station, wagon.id_way, wagon.position, lead_time, wir_wagon, user);
                            rt.SetMovedResult(result, wagon.num);
                        }
                        else
                        {
                            rt.SetMovedResult((int)errors_wir.not_arrival_wir, wagon.num); // вагон не заходил на АМКР
                        }
                    }
                    // Расставить вагоны на путь до выяснения
                    int position = context.GetNextPosition(0);
                    foreach (WagonInternalMovement wim in old_dislocation)
                    {
                        WagonInternalRoutes wir = wim.WagonInternalRoutes;
                        int result = ApplyWagonParkState(ref context, 99, 0, position, lead_time, wir, user);
                        rt.SetMovedResult(result, wir.num);
                        position++;
                    }
                }
                else
                {
                    // 
                    rt.SetResult((int)errors_wir.not_input_value);
                }
                // Проверка на ошибки и сохранение результата
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
                e.ExceptionMethodLog(String.Format("ApplyWagonsParkState(context={0}, id_station={1}, wagons_ps={2}, lead_time={3}, user={4})",
                    context, id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                rt.SetResult((int)errors_wir.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять вагоны по состоянию парка
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="wagons_ps"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ApplyWagonsParkState(int id_station, List<ParkStatePosition> wagons_ps, DateTime lead_time, string user)
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
                // Отправляем все вагоны
                res = ApplyWagonsParkState(ref context, id_station, wagons_ps, lead_time, user);

                string mess = String.Format("Операция расстановки вагонов по состоянию парка на станции {0} по состоянию на {1}. Код выполнения = {2}. Результат расстановки [определено = {3}, расставлено = {4}, ошибок = {5}].",
                    id_station, lead_time, res.count, res.moved, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция расстановки вагонов на станции АМКР."), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonsParkState(id_station={0}, wagons_ps={1}, lead_time={2}, user={3})",
                    id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию "Принять вагоны по состоянию парка"
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="wagons_ps"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OperationApplyWagonsParkState(int id_station, List<ParkStatePosition> wagons_ps, DateTime lead_time, string user)
        {
            ResultTransfer res = new ResultTransfer(0);
            try
            {

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                // Отправляем все вагоны
                res = ApplyWagonsParkState(ref context, id_station, wagons_ps, lead_time, user);
                return res;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationApplyWagonsParkState(id_station={0}, wagons_ps={1}, lead_time={2}, user={3})",
                    id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                res.SetResult((int)errors_wir.global);
                return res;
            }
        }
        #endregion

        #region Операция "Предъявить на УЗ"
        /// <summary>
        /// Перенести вагон на путь для предъявления.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_way_on"></param>
        /// <param name="position"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationTransferProvideWagon(ref EFDbContext context, int id_station, int id_way_on, int position, DateTime lead_time, WagonInternalRoutes wagon, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagon == null) return (int)errors_base.not_wir_db;  // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;    // В базе данных нет записи по WagonInternalMovement (Внутреняя дислокация вагонов)
                // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position) return 0; // Вагон стоит на станции на пути и в позиции, пропустить операцию
                string note = "Перенесен для предъявления";
                wagon.SetStationWagon(id_station, id_way_on, lead_time, position, note, user);
                // Установим и закроем операцию ручная расстановка -3              
                wagon.SetOpenOperation(8, lead_time.AddMinutes(-1), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationTransferProvideWagon(context={0}, id_station={1}, id_way_on={2}, position={3}, lead_time={4}, wagon={5}, user={6})",
                    context, id_station, id_way_on, position, lead_time, wagon, user), servece_owner, eventID);
                return (int)errors_wir.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция собрать вагоны на пути для предъявления
        /// </summary>
        /// <param name="id_way_on"></param>
        /// <param name="nums"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OperationTransferProvideWagons(int id_way_on, List<int> nums, DateTime lead_time, string user)
        {
            ResultTransfer res = new ResultTransfer(0);
            DateTime start = DateTime.Now;
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                // Проверим путь
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way != null)
                {
                    // Этот путь имеет выход на УЗ
                    if (way.crossing_uz == true)
                    {
                        if (nums != null && nums.Count() > 0)
                        {
                            res.count = nums.Count();
                            int position = context.GetNextPosition(id_way_on);
                            // Пройдемся по каждому вагону
                            foreach (int num in nums)
                            {
                                WagonInternalRoutes wir_wagon = context.GetLastWagon(num);
                                if (wir_wagon != null)
                                {
                                    int result = OperationTransferProvideWagon(ref context, way.id_station, id_way_on, position, lead_time, wir_wagon, user);
                                    res.SetMovedResult(result, num);
                                }
                                else
                                {
                                    res.SetMovedResult((int)errors_base.not_wir_db, num); // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                                }
                                position++;
                            }
                            // Проверка на ошибки и сохранение результата
                            if (res.error == 0)
                            {
                                res.SetResult(context.SaveChanges());
                                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                                if (res.result > 0)
                                {
                                    int result_rnw = RenumberingWagons(ref context, id_way_on, 1);
                                    if (result_rnw > 0)
                                    {
                                        // Применим перенумерацию
                                        context.SaveChanges();
                                    }
                                }
                            }
                            else
                            {
                                res.SetResult((int)errors_wir.cancel_save_changes);
                            }

                        }
                        else
                        {
                            // 
                            res.SetResult((int)errors_base.not_input_value);
                        }

                    }
                    else
                    {
                        res.SetResult((int)errors_base.way_not_crossing_uz); // Путь не имеет выход на УЗ
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_dir_way_db); // Указаного пути нет!
                }
                // Выведем результат
                string mess = String.Format("Операция переноса вагонов на путь {0} для предъявления на УЗ. Код выполнения = {1}. Результат переноса [определено = {2}, перенесено = {3}, пропущено = {4}, ошибок = {5}].",
                    id_way_on, res.result, res.count, res.moved, res.skip, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция переноса вагонов на путь для предъявления на УЗ."), start, stop, res.result);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationTransferProvideWagons(id_way_on={0}, nums={1}, lead_time={2}, user={3})",
                    id_way_on, nums, lead_time, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global);

            }
            return res;
        }
        /// <summary>
        /// Выполнить операцию пръедъявлния на УЗ
        /// </summary>
        /// <param name="id_way"></param>
        /// <param name="list_provide"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer OperationProvideWagons(int id_way, List<ListOperationWagon> list_provide, int position, DateTime lead_time, string user)
        {
            ResultTransfer res = new ResultTransfer(0);
            DateTime start = DateTime.Now;
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                //EFOutgoingSostav ef_out_sos = new EFOutgoingSostav(context);

                //List<WagonInternalRoutesPosition> wagons = new List<WagonInternalRoutesPosition>();
                // Проверим станцию
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way).FirstOrDefault();
                if (way != null)
                {
                    // Этот путь имеет выход на УЗ
                    if (way.crossing_uz == true)
                    {
                        List<long> list_id = list_provide.ToList().OrderBy(p => p.position).Select(p => p.wir_id).ToList();
                        res = ids_tr.InsertOutgoingSostav(ref context, way.id_station, id_way, position, lead_time, list_id, user);
                    }
                    else
                    {
                        res.SetResult((int)errors_base.way_not_crossing_uz); // Путь не имеет выход на УЗ
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_dir_way_db); // Указаного пути нет!
                }
                string mess = String.Format("Операция формирования состава для предъявления на УЗ. Код выполнения = {0}. Станция отправки = {1}, путь отправки = {2}, время операции = {3}. Результат [определено вагонов = {4}, сформировано = {5}, ошибок формирования = {6}].",
                    res.result, (way != null ? (int?)way.id_station : null), id_way, lead_time, res.count, res.moved, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция формирования состава для предъявления на УЗ."), start, stop, res.result);

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationProvideWagons(id_way={0}, list_provide={1}, lead_time={2}, user={3})",
                    id_way, list_provide, lead_time, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Глобальная ошибка
            }
            return res;
        }
        /// <summary>
        /// Выполнить операцию "Вернуть вагон, сформированный для предъявления"
        /// </summary>
        /// <param name="context"></param>
        /// <param name="car"></param>
        /// <param name="id_way"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnProvideWagon(ref EFDbContext context, OutgoingCars car, int id_way, string user)
        {
            try
            {
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);

                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                //if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                // Проверим наличие задержания и удалим его
                if (car.id_outgoing_detention != null)
                {
                    ef_out_dr.Delete((int)car.id_outgoing_detention); // удалим
                }
                // Проверим наличие закрытого возврата и откроем его
                if (car.id_outgoing_return_stop != null)
                {
                    OutgoingDetentionReturn outgoing_return_stop = ef_out_dr.Context.Where(r => r.id == car.id_outgoing_return_stop).FirstOrDefault();
                    if (outgoing_return_stop != null)
                    {
                        outgoing_return_stop.date_stop = null;
                        outgoing_return_stop.change = DateTime.Now;
                        outgoing_return_stop.create_user = user;
                        ef_out_dr.Update(outgoing_return_stop); // обновим
                    }
                }
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wir.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;
                if (wim.way_end != null || wim.id_way != id_way) return (int)errors_base.wagon_not_way; // Вагон не стоит на пути
                WagonInternalOperation wio = wir.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;
                if (wio.id_operation != 9) return (int)errors_base.wagon_not_operation; // Операция не предъявить
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                // Проверки прошло убераем отметки операция предявдения и ссылку на отправленый вагон
                ef_wio.Delete(wio.id);
                wir.id_outgoing_car = null;
                ef_wir.Update(wir);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnProvideWagon(context={0}, car={1}, id_way={2}, user={3})",
                    context, car, id_way, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию "Вернуть состав, сформированный для предъявления"
        /// </summary>
        /// <param name="id_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon OperationReturnProvideWagons(long id_sostav, string user)
        {
            ResultUpdateWagon res = new ResultUpdateWagon(0);
            DateTime start = DateTime.Now;
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sost = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sost.Context.Where(s => s.id == id_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    if (sostav.status == 0)
                    {
                        bool not_delete_sostav = false;
                        List<OutgoingCars> list_cars = ef_out_car.Context.Where(w => w.id_outgoing == id_sostav).ToList();
                        if (list_cars != null && list_cars.Count() > 0)
                        {
                            
                            // Обновим количество вагонов
                            res.count = list_cars.Count();
                            foreach (OutgoingCars car in list_cars)
                            {
                                if (car.parent_wir_id == null)
                                {
                                    // Это реальный вагон а не неактивная ссылка на изменения по задержанию
                                    int result = OperationReturnProvideWagon(ref context, car, sostav.id_way_from, user);
                                    if (result > 0)
                                    {
                                        ef_out_car.Delete(car.id);
                                    }
                                    res.SetUpdateResult(result, car.num);
                                }
                                else
                                {
                                    res.SetUpdateResult(0, car.num);
                                    not_delete_sostav = true;
                                }

                            }
                        }
                        // проверим на ошибки
                        if (res.error == 0)
                        {
                            if (!not_delete_sostav)
                            {
                                ef_out_sost.Delete(id_sostav);
                            }
                            else
                            {
                                sostav.status = 4; // Статус состав отменен но остались ссылки на возвраты
                                sostav.change = DateTime.Now;
                                sostav.change_user = user;
                                ef_out_sost.Update(sostav);
                            }
                            // Сохраним изменения
                            res.SetResult(context.SaveChanges());
                        }
                        else
                        {
                            res.SetResult((int)errors_base.cancel_save_changes);     // есть ошибки, отмена примененя изменеий
                        }

                        //else
                        //{
                        //    res.SetResult((int)errors_base.not_outgoing_cars_db);     // В базе данных нет записи по вагонам для отпправки
                        //}
                    }
                    else
                    {
                        res.SetResult((int)errors_base.error_status_outgoing_sostav);     // Ошибка статуса состава (Статус не позволяет сделать эту операцию))
                    }
                }
                else
                {
                    res.SetResult((int)errors_base.not_outgoing_sostav_db); // В базе данных нет записи состава для оправки

                }
                string mess = String.Format("Операция «Вернуть состав, сформированный для предъявления». Код выполнения={0}. Результат [состав id = {1}, вагонов в составе = {2}, возвращено = {3}, ошибок = {4}].",
                    res.result, id_sostav, res.count, res.update, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция «Вернуть состав, сформированный для предъявления»"), start, stop, res.result);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnProvideWagons(id_sostav={0}, user={1})",
                    id_sostav, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Глобальная ошибка
            }
            return res;
        }
        /// <summary>
        /// Вернуть вагон с пръедявления
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnProvideCar(long id_outgoing_car, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                //EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                //TODO: Отменили, вернуть всегда if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                int result = OperationReturnProvideWagon(ref context, car, car.OutgoingSostav.id_way_from, user);
                if (result > 0)
                {
                    ef_out_car.Delete(car.id);
                    return context.SaveChanges(); // Применить операции
                }
                else
                {
                    return result;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnProvideCar(id_outgoing_car={0},  user={1})",
                    id_outgoing_car, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }

        #endregion

        #endregion

        #region ОТПРАВКА ВАГОНОВ (АРМ ДИСПЕТЧЕРА)
        ///// <summary>
        ///// Метод переносит вагон на станцию отправки по данным КИС (!временный метод)
        ///// </summary>
        ///// <param name="context"></param>
        ///// <param name="id_station"></param>
        ///// <param name="id_way"></param>
        ///// <param name="date_start"></param>
        ///// <param name="position"></param>
        ///// <param name="wagon"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int SetStationOutgoingWagonOfKIS(ref EFDbContext context, int id_station, int id_way, DateTime date_start, int position, OutgoingCars wagon, string user)
        //{
        //    try
        //    {
        //        long? parent_id = null;
        //        //long? id_sap_outbound_supply = null; // Добавить исходящую поставку 
        //        // Проверим наличие вагона в справочнике
        //        //Directory_Wagons wag_new = null;
        //        Directory_Wagons wag = context.Directory_Wagons.Where(w => w.num == wagon.num).FirstOrDefault();
        //        if (wag == null)
        //        {
        //            // Вагона нет создать
        //            IDSDirectory ids_dir = new IDSDirectory(this.servece_owner);

        //            //TODO: Замена 
        //            //Directory_Wagons wag_new = ids_dir.GetDirectory_WagonsOfNum(wagon.num, 0, null, 0, null, user);
        //            Directory_Wagons wag_new = ids_dir.OperationCreateUpdateWagon(ref context, wagon.num, 0, null, 0, null, user);


        //            //foreach (Directory_Wagons dir in context.Directory_Wagons) {
        //            //    context.Entry(dir).Reload();
        //            //}
        //            //var s = context.Directory_Wagons;   //.Database Refresh(RefreshMode, Object);
        //            //context.Entry(s).Reload();
        //            //((IObjectContextAdapter)context).ObjectContext.Refresh(RefreshMode.ClientWins, context.Directory_Wagons);
        //        }


        //        // Получим последнюю запись по вагону
        //        WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
        //        if (last_wir != null)
        //        {
        //            if (last_wir.id_outgoing_car == wagon.id) return 0;     // Строка для вагона уже закрыта
        //            if (last_wir.close == null)
        //            {
        //                // Запись не закрыта, вагон на территории АМКР
        //                last_wir.SetStationWagon(id_station, id_way, date_start, position, "Перенесен на станцию и путь отправки по данным КИС", user);
        //                last_wir.SetOpenOperation(2, date_start, 0, 3, null, null, "Начата операция отправки по данным КИС", user);
        //                context.Update(last_wir);                                           // Обновим контекст
        //                return 1;
        //            }
        //            else
        //            {
        //                //Запись закрыта, вагон вышел или не заходил, определим parent_id
        //                parent_id = last_wir.id;
        //            }
        //        }
        //        // Создадим новую строку (Сделаем принудительный заход на територию АМКР, и сразу поставим на станцию отпраки на УЗ)
        //        last_wir = new WagonInternalRoutes()
        //        {
        //            id = 0,
        //            num = wagon.num,
        //            id_arrival_car = null,                                  // Информации нет, вагон не принимали
        //            id_sap_incoming_supply = null,                          // Информации нет, вагон не принимали
        //            //doc_outgoing_car = null,
        //            //id_outgoing_car = wagon.id,
        //            //id_sap_outbound_supply = id_sap_outbound_supply,      // Добавить исходящую поставку 
        //            note = "Создан по данным КИС (Отправка на УЗ)",
        //            create = DateTime.Now,
        //            create_user = user,
        //            parent_id = parent_id,
        //            //Directory_Wagons = wag_new != null ? wag_new : wag
        //        };
        //        //last_wir.Directory_Wagons = wag_new;
        //        last_wir.SetStationWagon(id_station, id_way, date_start, position, "Перенесен на станцию и путь отправки по данным КИС", user);
        //        last_wir.SetOpenOperation(2, date_start, 0, 3, null, null, "Начата операция отправки по данным КИС", user);
        //        context.Insert(last_wir);                                   // Обновим контекст
        //        return 1;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("SetStationOutgoingWagonOfKIS(context={0}, id_station={1}, id_way={2}, date_start={3}, position={4}, wagon={5}, user={6})",
        //            context, id_station, id_way, date_start, position, wagon, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        ///// <summary>
        ///// Метод переносит вагоны на станцию отправки по данным КИС (!временный метод)
        ///// </summary>
        ///// <param name="context"></param>
        ///// <param name="id_station"></param>
        ///// <param name="id_way"></param>
        ///// <param name="date_start"></param>
        ///// <param name="wagons"></param>
        ///// <param name="numeration"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public ResultTransfer SetStationOutgoingWagonsOfKIS(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<OutgoingCars> wagons, bool numeration, string user)
        //{
        //    ResultTransfer rt = new ResultTransfer(wagons.Count());
        //    try
        //    {


        //        if (context == null)
        //        {
        //            context = new EFDbContext();
        //        }
        //        int position = context.GetNextPosition(id_way);
        //        foreach (OutgoingCars wagon in numeration ? wagons.OrderByDescending(w => w.position_outgoing) : wagons.OrderBy(w => w.position_outgoing))
        //        {
        //            int result = SetStationOutgoingWagonOfKIS(ref context, id_station, id_way, date_start, position, wagon, user);
        //            rt.SetMovedResult(result, wagon.num);
        //            position++;
        //        }
        //        rt.SetResult(context.SaveChanges());
        //        return rt;

        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("SetStationOutgoingWagonsOfKIS(context={0}, id_station={1}, id_way={2}, date_start={3}, wagons={4}, numeration={5}, user={6})",
        //            context, id_station, id_way, date_start, wagons, numeration, user), servece_owner, eventID);
        //        rt.SetResult(-1);
        //        return rt;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        ///// <summary>
        ///// Выполнить отправку вагона
        ///// </summary>
        ///// <param name="context"></param>
        ///// <param name="id_station"></param>
        ///// <param name="id_way"></param>
        ///// <param name="date_start"></param>
        ///// <param name="position"></param>
        ///// <param name="wagon"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int OutgoingWagon(ref EFDbContext context, int id_station, int id_way, DateTime date_start, int position, OutgoingCars wagon, string user)
        //{
        //    try
        //    {
        //        //long? parent_id = null;
        //        long? id_sap_outbound_supply = null; // Добавить исходящую поставку 
        //        // Проверим наличие вагона в справочнике

        //        Directory_Wagons wag = context.Directory_Wagons.Where(w => w.num == wagon.num).FirstOrDefault();
        //        // Получим последнюю запись по вагону
        //        WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
        //        if (last_wir != null && last_wir.close == null && (last_wir.id_outgoing_car == wagon.id || last_wir.id_outgoing_car == null))
        //        {
        //            // Запись не закрыта и id_outgoing_car совподает или пустой
        //            last_wir.id_outgoing_car = wagon.id;
        //            last_wir.id_sap_outbound_supply = id_sap_outbound_supply;                                               // Добавить исходящую поставку
        //            last_wir.CloseWagon(date_start, "Отправлен на УЗ по данным КИС", user);                                 // Закроет все операции и дислокации
        //            context.Update(last_wir);                                                                               // Обновим контекст
        //            return 1;
        //        }
        //        else
        //        {
        //            // Запись закрыта 
        //            if (last_wir.id_outgoing_car == wagon.id)
        //            {
        //                return 0; // Вагон уже закрыт
        //            }
        //            return (int)errors_wir.not_arrival_wir; // В ИДС Нет вагона защедшего на АМКР (Ранее небыл принят), нельзя отправить вагон которого нет в системе
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OutgoingWagon(context={0}, id_station={1}, id_way={2}, date_start={3}, position={4}, wagon={5}, user={6})",
        //            context, id_station, id_way, date_start, position, wagon, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        ///// <summary>
        ///// Выполнить отправку вагонов
        ///// </summary>
        ///// <param name="context"></param>
        ///// <param name="id_station"></param>
        ///// <param name="id_way"></param>
        ///// <param name="date_start"></param>
        ///// <param name="wagons"></param>
        ///// <param name="numeration"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public ResultTransfer OutgoingWagons(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<OutgoingCars> wagons, bool numeration, string user)
        //{
        //    ResultTransfer rt = new ResultTransfer(wagons.Count());
        //    try
        //    {


        //        if (context == null)
        //        {
        //            context = new EFDbContext();
        //        }
        //        int position = context.GetNextPosition(id_way);
        //        foreach (OutgoingCars wagon in numeration ? wagons.OrderByDescending(w => w.position_outgoing) : wagons.OrderBy(w => w.position_outgoing))
        //        {
        //            int result = OutgoingWagon(ref context, id_station, id_way, date_start, position, wagon, user);
        //            rt.SetMovedResult(result, wagon.num);
        //            position++;
        //        }
        //        rt.SetResult(context.SaveChanges());
        //        return rt;

        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("OutgoingWagons(context={0}, id_station={1}, id_way={2}, date_start={3}, wagons={4}, numeration={5}, user={6})",
        //            context, id_station, id_way, date_start, wagons, numeration, user), servece_owner, eventID);
        //        rt.SetResult(-1);
        //        return rt;// Возвращаем id=-1 , Ошибка
        //    }
        //}

        #region Операция "Задержание вагона"
        /// <summary>
        /// Выполнить операцию обновить или добавить задержание вагона предяъявленого на УЗ
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="odr"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateOutgoingDetention(long id_outgoing_car, int id_detention_return, DateTime date_start, DateTime date_stop, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения

                if (car.id_outgoing_detention == null)
                {
                    // Добавить
                    OutgoingDetentionReturn dr = new OutgoingDetentionReturn()
                    {
                        id = 0,
                        num = car.num,
                        type_detention_return = 0,
                        id_detention_return = id_detention_return,
                        date_start = date_start,
                        date_stop = date_stop,
                        create = DateTime.Now,
                        create_user = user
                    };
                    car.OutgoingDetentionReturn = dr;
                    car.change = DateTime.Now;
                    car.change_user = user;
                    ef_out_car.Update(car);
                }
                else
                {
                    // обновить
                    OutgoingDetentionReturn dr = ef_out_dr.Context.Where(d => d.id == car.id_outgoing_detention).FirstOrDefault();
                    dr.id_detention_return = id_detention_return;
                    dr.date_start = date_start;
                    dr.date_stop = date_stop;
                    dr.change = DateTime.Now;
                    dr.change_user = user;
                    ef_out_dr.Update(dr);
                }
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateOutgoingDetention(id_outgoing_car={0}, id_detention_return={1}, date_start={2}, date_stop={3}, user={4})",
                    id_outgoing_car, id_detention_return, date_start, date_stop, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region Операция "Возврат вагона вагона"
        /// <summary>
        /// Выполнить операцию открыть возврат
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="id_detention_return"></param>
        /// <param name="date_start"></param>
        /// <param name="num_act"></param>
        /// <param name="date_act"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationOpenOutgoingReturn(long id_outgoing_car, int id_detention_return, DateTime date_start, string num_act, DateTime? date_act, string note, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                // Создать возврат
                OutgoingDetentionReturn outgoingreturn = new OutgoingDetentionReturn()
                {
                    id = 0,
                    num = car.num,
                    type_detention_return = 1,
                    id_detention_return = id_detention_return,
                    date_start = date_start,
                    date_stop = null,
                    num_act = num_act,
                    date_act = date_act,
                    note = note,
                    create = DateTime.Now,
                    create_user = user
                };
                ef_out_dr.Add(outgoingreturn); // Добавим строку
                // Получим строку внутреннего перемещения
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутренее перемещение вагонов)
                if (wir.close != null) return (int)errors_base.close_wir; // Запись закрыта (операции не возможны)
                // Применить операцию ВОЗВРАТ
                wir.SetOpenOperation(10, date_start.AddMinutes(-1), null, null, null, null, note, user).SetCloseOperation(date_start, note, user);
                // Убрать вагон из предъявления
                wir.id_outgoing_car = null;
                ef_wir.Update(wir); // обновим
                //ef_out_car.Delete(car.id); // Удалим запись вогона в предъявлении
                // Сбросим информацию о вагоне
                car.position_outgoing = null;
                car.date_outgoing_act = null;
                car.id_reason_discrepancy_amkr = null;
                car.id_reason_discrepancy_uz = null;
                car.outgoing = null;
                car.outgoing_user = null;
                car.note = "Открыт возврат";
                car.OutgoingDetentionReturn1 = outgoingreturn;
                car.parent_wir_id = wir.id; // Покажем ссылку на старую попытку сдать
                car.change = DateTime.Now;
                car.change_user = user;

                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;

                ef_out_car.Update(car);
                //TODO: Проверка на последний вагон 
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationOpenOutgoingReturn(id_outgoing_car={0}, id_detention_return={1}, date_start={2}, num_act={3}, date_act={4}, note={5},user={6})",
                    id_outgoing_car, id_detention_return, date_start, num_act, date_act, note, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить закрыть возврат
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="id_outgoin_return"></param>
        /// <param name="date_stop"></param>
        /// <param name="num_act"></param>
        /// <param name="date_act"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationCloseOutgoingReturn(long id_outgoing_car, int id_outgoin_return, DateTime date_stop, string num_act, DateTime? date_act, string note, string user)
        {
            try
            {
                IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                // Найдем возврат
                OutgoingDetentionReturn outgoin_greturn = ef_out_dr.Context.Where(r => r.id == id_outgoin_return).FirstOrDefault();
                if (outgoin_greturn == null) { return (int)errors_base.not_outgoing_detention_return_db; } // Ошибка в базе нет задержания
                if (outgoin_greturn.date_stop != null) { return (int)errors_base.close_outgoing_detention_return; } // Ошибка в запись задержания закрыта
                // Закроем задержание
                outgoin_greturn.date_stop = date_stop;
                outgoin_greturn.num_act = num_act;
                outgoin_greturn.date_act = date_act;
                outgoin_greturn.note = note;
                outgoin_greturn.change = DateTime.Now;
                outgoin_greturn.change_user = user;
                ef_out_dr.Update(outgoin_greturn);
                // Обновим информацию о вагоне
                car.note = "Закрыт возврат";
                car.id_outgoing_return_stop = outgoin_greturn.id;
                car.change = DateTime.Now;
                car.change_user = user;
                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;
                ef_out_car.Update(car);
                //TODO: Проверка на последний вагон 
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCloseOutgoingReturn(id_outgoing_car={0}, id_outgoin_greturn={1}, date_stop={2}, num_act={3}, date_act={4}, note={5},user={6})",
                    id_outgoing_car, id_outgoin_return, date_stop, num_act, date_act, note, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        #endregion

        #region ОПЕРАЦИИ "СДАЧИ ВАГОНОВ И СОСТАВА НА УЗ"
        /// <summary>
        /// Выполнить операцию пръедявит вагон
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="position"></param>
        /// <param name="date_outgoing_act"></param>
        /// <param name="id_reason_discrepancy_amkr"></param>
        /// <param name="id_reason_discrepancy_uz"></param>
        /// <param name="id_condition"></param>
        /// <param name="id_wagons_rent_arrival"></param>
        /// <param name="id_wagons_rent_outgoing"></param>
        /// <param name="id_countrys"></param>
        /// <param name="id_genus"></param>
        /// <param name="id_owner"></param>
        /// <param name="gruzp_uz"></param>
        /// <param name="tara_uz"></param>
        /// <param name="note_uz"></param>
        /// <param name="id_warehouse"></param>
        /// <param name="id_division"></param>
        /// <param name="laden"></param>
        /// <param name="id_cargo"></param>
        /// <param name="nom_cont1"></param>
        /// <param name="nom_cont2"></param>
        /// <param name="code_stn_to"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationPresentWagon(long id_outgoing_car, int position, DateTime? date_outgoing_act, int? id_reason_discrepancy_amkr, int? id_reason_discrepancy_uz,
            //int? id_outgoing_detention_return, 
            int? id_condition, int? id_wagons_rent_arrival, int? id_wagons_rent_outgoing, int id_countrys, int id_genus, int id_owner,
            double? gruzp_uz, double? tara_uz, string note_uz, int? id_warehouse, int? id_division, bool laden, int id_cargo, string nom_cont1, string nom_cont2, int? code_stn_to, string user)
        {
            try
            {
                //IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                //EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);
                EFOutgoing_UZ_Vagon_Cont ef_out_uz_vag_cont = new EFOutgoing_UZ_Vagon_Cont(context);

                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                //EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.outgoing != null) return (int)errors_base.outgoing_cars_outgoing; // Запрет операции вагон отправлен
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                // Проверим запись на вагон
                Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(v => v.id_car == id_outgoing_car).FirstOrDefault();
                if (out_uz_vag != null) return (int)errors_base.exist_out_uz_vag; // Запрет операции, строка по вагону уже создана. 

                // Создадимк строки документа по контейнерам
                Outgoing_UZ_Vagon_Cont vag_cont1 = null;
                Outgoing_UZ_Vagon_Cont vag_cont2 = null;
                if (!String.IsNullOrWhiteSpace(nom_cont1))
                {
                    vag_cont1 = new Outgoing_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = nom_cont1,
                        kod_tiporazmer = null,
                        gruzp = null,
                        ves_tary_arc = null,
                        id_cargo = null,
                        id_cargo_gng = null,
                        kol_pac = null,
                        pac = null,
                        vesg = null,
                        nom_zpu = null,
                    };
                    ef_out_uz_vag_cont.Add(vag_cont1);
                }
                if (!String.IsNullOrWhiteSpace(nom_cont2))
                {
                    vag_cont2 = new Outgoing_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = nom_cont2,
                        kod_tiporazmer = null,
                        gruzp = null,
                        ves_tary_arc = null,
                        id_cargo = null,
                        id_cargo_gng = null,
                        kol_pac = null,
                        pac = null,
                        vesg = null,
                        nom_zpu = null,
                    };
                    ef_out_uz_vag_cont.Add(vag_cont2);
                }
                // добавим документ по отправке вагоне
                out_uz_vag = new Outgoing_UZ_Vagon()
                {
                    id = 0,
                    id_document = null,
                    num = car.num,
                    id_outgoing = (long)car.id_outgoing,
                    id_car = car.id,
                    id_condition = id_condition,
                    id_wagons_rent_arrival = id_wagons_rent_arrival,
                    id_wagons_rent_outgoing = id_wagons_rent_outgoing,
                    id_countrys = id_countrys,
                    id_genus = id_genus,
                    id_owner = id_owner,
                    gruzp_uz = gruzp_uz,
                    tara_uz = tara_uz,
                    note_uz = note_uz,
                    gruzp = null,
                    u_tara = null,
                    ves_tary_arc = null,
                    id_warehouse = id_warehouse,
                    id_division = id_division,
                    laden = laden,
                    id_cargo = id_cargo,
                    id_cargo_gng = null,
                    vesg = null,
                    //id_outgoing_detention_return = id_outgoing_detention_return,
                    code_stn_to = code_stn_to,
                    create = DateTime.Now,
                    create_user = user,
                    change = null,
                    change_user = null,
                };
                // Обновим ссылки на строки OutgoingCars и Outgoing_UZ_Vagon_Cont
                //out_uz_vag.OutgoingCars.Add(car);// ссылка на OutgoingCars
                // Добавим контейнер1
                if (vag_cont1 != null)
                {
                    out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont1);
                }
                // Добавим контейнер2
                if (vag_cont1 != null)
                {
                    out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont1);
                }

                ef_out_uz_vag.Add(out_uz_vag); // добавим строку

                // Обновим информацию о вагоне
                car.position_outgoing = position;
                car.date_outgoing_act = date_outgoing_act;
                car.id_reason_discrepancy_amkr = id_reason_discrepancy_amkr;
                car.id_reason_discrepancy_uz = id_reason_discrepancy_uz;
                //car.id_outgoing_detention_return = id_outgoing_detention_return;
                car.outgoing = DateTime.Now;
                car.outgoing_user = user;
                car.change = DateTime.Now;
                car.change_user = user;
                // Состав
                car.OutgoingSostav.status = 1;
                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;
                // Привяжем документ
                car.Outgoing_UZ_Vagon = out_uz_vag;

                ef_out_car.Update(car);// Обновим  вагон
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationPresentWagon(id_outgoing_car={0}, position ={1}, date_outgoing_act ={2}, id_reason_discrepancy_amkr ={3}, id_reason_discrepancy_uz ={4}, " +
                    "id_condition ={5}, id_wagons_rent_arrival ={6}, id_wagons_rent_outgoing ={7}, id_countrys ={8}, id_genus ={9}, id_owner ={10}, " +
                    "gruzp_uz ={11}, tara_uz ={12}, note_uz ={13}, id_warehouse ={14}, id_division ={15},laden ={16}, id_cargo ={17}, nom_cont1 ={18}, nom_cont2 ={19}, code_stn_to ={20}, user ={21})",
                 id_outgoing_car, position, date_outgoing_act, id_reason_discrepancy_amkr, id_reason_discrepancy_uz,
                 id_condition, id_wagons_rent_arrival, id_wagons_rent_outgoing, id_countrys, id_genus, id_owner,
                 gruzp_uz, tara_uz, note_uz, id_warehouse, id_division, laden, id_cargo, nom_cont1, nom_cont2, code_stn_to, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Вернуть вагон, отменить операцию предъявить вагон 
        /// </summary>
        /// <param name="id_outgoing_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnPresentWagon(long id_outgoing_car, string user)
        {
            try
            {
                //IDSTransfer ids_tr = new IDSTransfer(servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);
                EFOutgoing_UZ_Cont_Pay ef_out_uz_vag_cont_pay = new EFOutgoing_UZ_Cont_Pay(context);
                EFOutgoing_UZ_Vagon_Cont ef_out_uz_vag_cont = new EFOutgoing_UZ_Vagon_Cont(context);
                EFOutgoing_UZ_Vagon_Acts ef_out_uz_vag_act = new EFOutgoing_UZ_Vagon_Acts(context);
                EFOutgoing_UZ_Vagon_Pay ef_out_uz_vag_pay = new EFOutgoing_UZ_Vagon_Pay(context);

                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFOutgoingDetentionReturn ef_out_dr = new EFOutgoingDetentionReturn(context);
                OutgoingCars car = ef_out_car.Context.Where(c => c.id == id_outgoing_car).FirstOrDefault();
                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.OutgoingSostav.status == 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)

                // Проверим наличие задержания и удалим его
                if (car.id_outgoing_detention != null)
                {
                    ef_out_dr.Delete((int)car.id_outgoing_detention); // удалим
                    car.id_outgoing_detention = null;
                }
                // Проверим наличие закрытого возврата и откроем его
                if (car.id_outgoing_return_stop != null)
                {
                    OutgoingDetentionReturn outgoing_return_stop = ef_out_dr.Context.Where(r => r.id == car.id_outgoing_return_stop).FirstOrDefault();
                    if (outgoing_return_stop != null)
                    {
                        outgoing_return_stop.date_stop = null;
                        outgoing_return_stop.change = DateTime.Now;
                        outgoing_return_stop.create_user = user;
                        ef_out_dr.Update(outgoing_return_stop); // обновим
                    }
                    car.id_outgoing_return_stop = null;
                }
                // Удалим информацию по документам
                // Проверим запись на вагон
                Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(v => v.id_car == id_outgoing_car).FirstOrDefault();
                if (out_uz_vag != null)
                {
                    // Удалим информацию по контейнерам
                    List<Outgoing_UZ_Vagon_Cont> list = ef_out_uz_vag_cont.Context.Where(c => c.id_vagon == out_uz_vag.id).ToList();
                    foreach (Outgoing_UZ_Vagon_Cont cont in list)
                    {
                        List<Outgoing_UZ_Cont_Pay> list_cont_pay = ef_out_uz_vag_cont_pay.Context.Where(c => c.id_cont == cont.id).ToList();
                        ef_out_uz_vag_cont_pay.Delete(list_cont_pay.Select(n => n.id).ToList()); // Удалим pay по контейнерам
                    }
                    ef_out_uz_vag_cont.Delete(list.Select(n => n.id).ToList()); // удалим контейнера
                    // Удалим Акты
                    List<Outgoing_UZ_Vagon_Acts> list_act = ef_out_uz_vag_act.Context.Where(a => a.id_vagon == out_uz_vag.id).ToList();
                    ef_out_uz_vag_act.Delete(list_act.Select(n => n.id).ToList()); // удалим акты
                    // Удалим pay
                    List<Outgoing_UZ_Vagon_Pay> list_pay = ef_out_uz_vag_pay.Context.Where(p => p.id_vagon == out_uz_vag.id).ToList();
                    ef_out_uz_vag_pay.Delete(list_pay.Select(n => n.id).ToList()); // удалим акты
                    //TODO: ! добавить проверку количества вагонов в документе если = 1 или меньше удалить документ и Pay документа

                    // Удалим сам документ
                    ef_out_uz_vag.Delete(out_uz_vag.id);
                }
                // Обновим информацию о вагоне
                car.id_outgoing_uz_vagon = null;
                car.position_outgoing = null;
                car.date_outgoing_act = null;
                car.id_reason_discrepancy_amkr = null;
                car.id_reason_discrepancy_uz = null;
                car.note = null;
                car.outgoing = null;
                car.outgoing_user = null;
                car.change = DateTime.Now;
                car.change_user = user;
                // Состав
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == car.id_outgoing).FirstOrDefault();
                //int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                if (sostav != null && sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count == 0)
                {
                    car.OutgoingSostav.status = 0;
                }
                car.OutgoingSostav.change = DateTime.Now;
                car.OutgoingSostav.change_user = user;
                ef_out_car.Update(car);// Обновим  вагон
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnPresentWagon(id_outgoing_car={0}, user={1})",
                    id_outgoing_car, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию предъявить состав на УЗ
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="date_end_inspection_acceptance_delivery"></param>
        /// <param name="date_end_inspection_loader"></param>
        /// <param name="date_end_inspection_vagonnik"></param>
        /// <param name="date_readiness_uz"></param>
        /// <param name="date_outgoing"></param>
        /// <param name="date_outgoing_act"></param>
        /// <param name="station_on"></param>
        /// <param name="route_sign"></param>
        /// <param name="composition_index"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationPresentSostav(long id_outgoing_sostav, DateTime date_end_inspection_acceptance_delivery,
            DateTime date_end_inspection_loader, DateTime date_end_inspection_vagonnik, DateTime date_readiness_uz,
            DateTime date_outgoing, DateTime? date_outgoing_act, int station_on, bool route_sign, string composition_index, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_outgoing_sostav_db; //В базе данных нет записи состава для оправки
                if (sostav.status >= 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                List<OutgoingCars> list_not_out_car = sostav.OutgoingCars.Where(c => c.outgoing == null).ToList();
                if (count_car == 0) return (int)errors_base.not_outgoing_cars_db; // В базе данных нет записи по вагонам для отпправки
                // Проверить есть вагоны которые не перенесли в левую часть, если да убрать вагоны и убрать блокировку
                if (list_not_out_car != null && list_not_out_car.Count() > 0)
                {
                    foreach (OutgoingCars car in list_not_out_car)
                    {
                        if (car.parent_wir_id == null)
                        {
                            // Это реальный вагон а не неактивная ссылка на изменения по задержанию
                            int result = OperationReturnProvideWagon(ref context, car, sostav.id_way_from, user);
                            if (result > 0)
                            {
                                ef_out_car.Delete(car.id);
                            }
                        }

                    }
                }

                // Обновим состав
                sostav.status = 2;
                sostav.date_end_inspection_acceptance_delivery = date_end_inspection_acceptance_delivery;
                sostav.date_end_inspection_loader = date_end_inspection_loader;
                sostav.date_end_inspection_vagonnik = date_end_inspection_vagonnik;
                sostav.date_readiness_uz = date_readiness_uz;
                sostav.date_outgoing = date_outgoing;
                sostav.date_outgoing_act = date_outgoing_act;
                sostav.id_station_on = station_on;
                sostav.route_sign = route_sign;
                sostav.composition_index = composition_index;
                sostav.change = DateTime.Now;
                sostav.change_user = user;
                ef_out_sostav.Update(sostav);
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationPresentSostav(id_outgoing_sostav={0}, date_end_inspection_acceptance_delivery ={1},date_end_inspection_loader ={2}, date_end_inspection_vagonnik={3}, date_readiness_uz ={4}, date_outgoing ={5}, date_outgoing_act={6}, station_on={7}, route_sign={8}, composition_index={9}, user={10})",
                    id_outgoing_sostav, date_end_inspection_acceptance_delivery, date_end_inspection_loader, date_end_inspection_vagonnik, date_readiness_uz,
                    date_outgoing, date_outgoing_act, station_on, route_sign, composition_index, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию вернуть сдачу состава 
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationReturnPresentSostav(long id_outgoing_sostav, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav == null) return (int)errors_base.not_outgoing_sostav_db; //В базе данных нет записи состава для оправки
                if (sostav.status != 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                int count_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList().Count();
                // Обновим состав
                sostav.status = count_car > 0 ? 1 : 0;
                sostav.date_end_inspection_acceptance_delivery = null;
                sostav.date_end_inspection_loader = null;
                sostav.date_end_inspection_vagonnik = null;
                sostav.date_readiness_uz = null;
                sostav.date_outgoing = null;
                sostav.date_outgoing_act = null;
                sostav.id_station_on = null;
                sostav.route_sign = null;
                sostav.composition_index = null;
                sostav.change = DateTime.Now;
                sostav.change_user = user;
                ef_out_sostav.Update(sostav);
                return context.SaveChanges(); // Применить операции
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationReturnPresentSostav(id_outgoing_sostav={0}, user={1})",
                    id_outgoing_sostav, user), servece_owner, eventID);
                return (int)errors_base.global; // Глобальная ошибка
            }
        }

        #endregion

        #region ОПЕРАЦИЯ "ОТПРАВКИ СОСТАВА НА УЗ"
        /// <summary>
        /// Отправить вагон на УЗ
        /// </summary>
        /// <param name="context"></param>
        /// <param name="car"></param>
        /// <param name="id_way_from"></param>
        /// <param name="lead_time"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendingWagonOnUZ(ref EFDbContext context, OutgoingCars car, int id_way_from, DateTime lead_time, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);

                if (car == null) return (int)errors_base.not_outgoing_cars_db; // В базе нет вагона для предявдения
                if (car.OutgoingSostav.status != 2) return (int)errors_base.error_status_outgoing_sostav; // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                // найдем запись внутреннего перемещения
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id_outgoing_car == car.id).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wir.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db; // В базе данных нет текущего положения
                if (wim.way_end != null || wim.id_way != id_way_from) return (int)errors_base.wagon_not_way; // Вагон не стоит на пути
                WagonInternalOperation wio = wir.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db; // В базе данных нет текущей операции
                if (wio.id_operation < 8 || wio.id_operation > 9) return (int)errors_base.wagon_not_operation; // текущая операция не предъявить вагон на УЗ
                // Все проверки прошел
                // Установим и закроем операцию отпрака на УЗ             
                wir.SetOpenOperation(2, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                wir.CloseWagon(lead_time, null, user);
                ef_wir.Update(wir);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendingWagonOnUZ(context={0}, car={1}, id_way_from={2}, lead_time={3}, user={4})",
                    context, car, id_way_from, lead_time, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Отправить состав на УЗ
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="lead_time"></param>
        /// <param name="composition_index"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon OperationSendingSostavOnUZ(long id_outgoing_sostav, DateTime lead_time, string composition_index, string user)
        {
            OperationResultWagon rt = new OperationResultWagon();
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    // Состав определен
                    if (sostav.status == 2)
                    {
                        List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList();
                        if (list_out_car != null && list_out_car.Count() > 0)
                        {
                            // Вагоны для отправки определены
                            //rt.count = list_out_car.Count();
                            // Пройдемся по вагонам
                            foreach (OutgoingCars car in list_out_car)
                            {
                                int result = SendingWagonOnUZ(ref context, car, sostav.id_way_from, lead_time, user);
                                rt.SetResultOperation(result, car.num);
                            }
                            // Проверка на ошибку
                            if (rt.error == 0)
                            {
                                sostav.status = 3;
                                sostav.date_departure_amkr = lead_time;
                                sostav.composition_index = composition_index != null ? composition_index : sostav.composition_index;
                                sostav.change = DateTime.Now;
                                sostav.change_user = user;
                                ef_out_sostav.Update(sostav);
                                rt.SetResult(context.SaveChanges());
                                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                                if (rt.result > 0)
                                {
                                    int result_rnw = RenumberingWagons(ref context, sostav.id_way_from, 1);
                                    if (result_rnw > 0)
                                    {
                                        // Применим перенумерацию
                                        context.SaveChanges();
                                    }
                                }
                            }
                            else
                            {
                                rt.SetResult((int)errors_base.error_save_changes); // Были ошибки по ходу выполнения всей операций
                            }
                        }
                        else
                        {
                            rt.SetResult((int)errors_base.not_outgoing_cars_db); // В базе данных нет записи по вагонам для отпправки
                        }
                    }
                    else
                    {
                        rt.SetResult((int)errors_base.error_status_outgoing_sostav); // Ошибка статуса состава (Статус не позволяет сделать эту операцию)
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.not_outgoing_sostav_db); //В базе данных нет записи состава для оправки
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationSendingSostavOnUZ(id_outgoing_sostav={0}, lead_time={1}, composition_index={2}, user={3})",
                    id_outgoing_sostav, lead_time, composition_index, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion

        #endregion

        #region АДМИНИСТРИРОВАНИЕ
        /// <summary>
        /// Закрыть вагоны принудительно
        /// </summary>
        /// <param name="list_id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int CloseWir(List<int> list_id, DateTime close_date, string note, string user)
        {
            ResultUpdateID res = new ResultUpdateID(list_id.Count());
            try
            {

                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                // Пройдемся по списку внутрених перемещений
                int count = list_id.Count();
                foreach (int id in list_id.ToList())
                {
                    WagonInternalRoutes wir = ef_wir.Context.Where(r => r.id == id).FirstOrDefault();
                    int result = 0;
                    ;
                    if (wir != null)
                    {
                        // Запись не закрыта
                        if (wir.close == null)
                        {
                            wir.CloseWagon(close_date, note, user); // Закроет все операции и дислокации
                            ef_wir.Update(wir);
                            result = ef_wir.Save();
                            //res.SetUpdateResult(result, id);
                        }
                        else
                        {
                            // Запись закрыта пропустить
                            result = 0;
                            //res.SetUpdateResult(result, id);
                        }
                    }
                    else
                    {
                        // Запись wir не найдена
                        result = (int)errors_base.not_wir_db;

                    }
                    res.SetUpdateResult(result, id);
                    Console.WriteLine("Обработал id = {0}, результат = {1}, осталось {2}", id, result, count--);
                }
                if (res.error == 0)
                {
                    res.SetResult(res.listResult.Count());                      // ОК   
                }
                else
                {
                    res.SetResult((int)errors_base.error_save_changes);      // Были ошибки по ходу выполнения операций       
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CloseWir(list_id={0}, close_date={1}, note={2}, user={3})", list_id, close_date, note, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Ошибка
            }
            return res.result;
        }
        /// <summary>
        /// Закрыть вагоны принудительно
        /// </summary>
        /// <param name="list_id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int DeleteDoubleWir(List<int> list_id)
        {
            ResultUpdateID res = new ResultUpdateID(list_id.Count());
            try
            {

                EFDbContext context = new EFDbContext();

                EFWagonInternalMovement ef_wim = new EFWagonInternalMovement(context);
                EFWagonInternalOperation ef_wio = new EFWagonInternalOperation(context);
                int count = list_id.Count();
                // Пройдемся по списку внутрених перемещений
                foreach (int id in list_id.ToList())
                {
                    List<WagonInternalMovement> list_wim = ef_wim.Context.Where(m => m.id_wagon_internal_routes == id).OrderBy(c => c.id).ToList();
                    List<WagonInternalOperation> list_wio = ef_wio.Context.Where(m => m.id_wagon_internal_routes == id).OrderBy(c => c.id).ToList();

                    // Сгруппируем по путям роспуска
                    List<IGrouping<long?, WagonInternalMovement>> group_list_wim = list_wim
                                    .ToList()
                                    .GroupBy(w => w.parent_id)
                                    .ToList();
                    List<IGrouping<long?, WagonInternalOperation>> group_list_wio = list_wio
                                    .ToList()
                                    .GroupBy(w => w.parent_id)
                                    .ToList();
                    // Пройдемся по путям роспуска
                    foreach (IGrouping<long?, WagonInternalMovement> gr_wim in group_list_wim.ToList())
                    {
                        // Найдем задвоение
                        if (gr_wim.Count() > 1)
                        {
                            WagonInternalMovement wim_close = gr_wim.Where(m => m.way_end != null).FirstOrDefault();
                            if (wim_close != null)
                            {
                                // есть закрытая запись, удалить все не закрытые
                                List<WagonInternalMovement> list_wim_close = gr_wim.Where(m => m.way_end == null).ToList();
                                foreach (WagonInternalMovement del_wim in list_wim_close)
                                {
                                    ef_wim.Delete(del_wim.id);
                                }

                            }
                            else
                            {
                                // Нет закрытой записи, оставить одну с макс id
                                WagonInternalMovement wim_max = gr_wim.OrderByDescending(m => m.id).FirstOrDefault();
                                if (wim_max != null)
                                {
                                    long id_max = wim_max.id;
                                    foreach (WagonInternalMovement del_wim in gr_wim)
                                    {
                                        if (del_wim.id != id_max)
                                        {
                                            ef_wim.Delete(del_wim.id);
                                        }

                                    }
                                }

                            }
                        }
                    }
                    int result_wim = ef_wim.Save();

                    count--;
                    Console.WriteLine("Обработал wim id = {0}, результат = {1}, осталось {2}", id, result_wim, count);
                    // Пройдемся по операциям
                    foreach (IGrouping<long?, WagonInternalOperation> gr_wio in group_list_wio.ToList())
                    {
                        // Найдем задвоение
                        if (gr_wio.Count() > 1)
                        {
                            // Нет закрытой записи, оставить одну с макс id
                            WagonInternalOperation wio_max = gr_wio.OrderByDescending(m => m.id).FirstOrDefault();
                            if (wio_max != null)
                            {
                                long id_max = wio_max.id;
                                foreach (WagonInternalOperation del_wio in gr_wio)
                                {
                                    if (del_wio.id != id_max)
                                    {
                                        ef_wio.Delete(del_wio.id);
                                    }

                                }
                            }
                        }
                    }
                    int result_wio = ef_wio.Save();

                    Console.WriteLine("Обработал wio id = {0}, результат = {1}, осталось {2}", id, result_wio, count);
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeleteDoubleWir(list_id={0})", list_id), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Ошибка
            }
            return res.result;
        }
        /// <summary>
        /// Административная функция вернуть вагон из отправки
        /// </summary>
        /// <param name="nums"></param>
        /// <param name="note"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int ReturnWagons(List<int> nums, string note, string user)
        {
            ResultUpdateWagon res = new ResultUpdateWagon(nums.Count());
            try
            {

                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                //EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                // Пройдемся по списку внутрених перемещений
                int count = nums.Count();
                foreach (int num in nums.ToList())
                {
                    WagonInternalRoutes wir = context.GetLastWagon(num);
                    int result = 0;
                    if (wir != null)
                    {
                        // Запись закрыта
                        if (wir.close != null)
                        {
                            // Получим текущее положение вагона
                            WagonInternalMovement wim = wir.GetLastMovement();
                            WagonInternalOperation wio = wir.GetLastOperation();
                            if (wim != null)
                            {
                                if (wio != null)
                                {
                                    // Проверки закончились, выполним операции
                                    wir.id_outgoing_car = null;
                                    wir.note = note;
                                    wir.close = null;
                                    wir.close_user = null;
                                    // вернем на путь
                                    wim.way_end = null;
                                    wim.note = note;
                                    wim.close = null;
                                    wim.close_user = null;
                                    // Отментим отмену в операции
                                    wio.note = note;
                                    result = 3;
                                }
                                else
                                {
                                    result = (int)errors_base.not_wio_db;
                                }
                            }
                            else
                            {
                                result = (int)errors_base.not_wim_db;
                            }


                            //wir.CloseWagon(close_date, note, user); // Закроет все операции и дислокации
                            //ef_wir.Update(wir);
                            //result = ef_wir.Save();
                            //res.SetUpdateResult(result, num);
                        }
                        else
                        {
                            // Запись открыта пропустить
                            result = 0;

                        }
                    }
                    else
                    {
                        // Запись wir не найдена
                        result = (int)errors_base.not_wir_db;

                    }
                    if (result > 0)
                    {
                        result = context.SaveChanges();
                    }
                    res.SetUpdateResult(result, num);
                    Console.WriteLine("Обработал №  = {0}, результат = {1}, осталось {2}", num, result, count--);
                }
                if (res.error == 0)
                {
                    res.SetResult(res.listResult.Count());                      // ОК   
                }
                else
                {
                    res.SetResult((int)errors_base.error_save_changes);      // Были ошибки по ходу выполнения операций       
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ReturnWagons(nums={0}, note={1}, user={2})", nums, note, user), servece_owner, eventID);
                res.SetResult((int)errors_base.global); // Ошибка
            }
            return res.result;
        }

        #endregion
    }
}

