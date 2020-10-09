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
//using System.Data;
//using System.Data.Entity.Infrastructure;
//using System.Data.Entity.Core.Objects;

namespace IDS
{
    public enum errors_wir : int
    {
        global = -1,
        not_input_value = -100,
        not_sostav = -101, //...
        not_wagon = -102,
        not_arrival_wir = -103,  // Нет записи [WagonInternalRoutes] зашедшей на АМКР
    }

    public class ResultWagon
    {
        public int num { get; set; }
        public int result { get; set; }
    }

    public class ResultTransfer
    {
        public int result { get; set; } // Глобальный ресурс выполнения всего переноса
        public int count { get; set; }
        public int moved { get; set; }
        public int skip { get; set; }
        public int error { get; set; }
        public List<ResultWagon> listResult = new List<ResultWagon>();

        public ResultTransfer(int count)
        {
            this.count = count;
            this.result = 0;
            this.moved = 0;
            this.skip = 0;
            this.error = 0;
            this.listResult.Clear();
        }

        public void SetMovedResult(int result)
        {
            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddMoved(); return;
            }
            AddSkip();
            return;
        }
        public void SetMovedResult(int result, int num)
        {
            listResult.Add(new ResultWagon() { num = num, result = result });

            if (result < 0)
            {
                AddError(result); return;
            }
            if (result > 0)
            {
                AddMoved(); return;
            }
            AddSkip();
            return;
        }
        public void SetResult(int code)
        {
            this.result = code;
        }
        public void AddMoved()
        {
            this.moved++;
        }
        public void AddSkip()
        {
            this.skip++;
        }
        public void AddError(int err_code)
        {
            this.error++;
        }
        public void AddError()
        {
            this.error++;
        }
    }


    public class IDS_WIR
    {
        private eventID eventID = eventID.IDS_IDSWIR;
        protected service servece_owner = service.Null;
        /// <summary>
        /// 
        /// </summary>
        public IDS_WIR()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public IDS_WIR(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
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
                List<WagonInternalMovement> list_wim = context.WagonInternalMovement.Where(m => m.id_way == id_way & m.station_end == null & m.way_end == null).OrderBy(p => p.position).ToList();
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

        /// <summary>
        /// Выполнить дислокацию по вагону
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
        public int DislocationWagon(ref EFDbContext context, int id_way_from, int id_way_on, int position_on, DateTime date_start, DateTime date_stop, WagonInternalRoutes wagon, string user)
        {
            try
            {
                //long? parent_id = null;
                //// Получим последнюю запись по вагону
                //WagonInternalRoutes last_wir = context.GetLastWagon(wagon.num);
                //if (last_wir != null)
                //{
                //    // Запись есть проверим, для этого прибытия была создана запись
                //    if (last_wir.id_arrival_car == wagon.id) return 0; // Строка для вагона уже создана
                //    // Запись не закрыта (!Заись перед созданием должна быть закрыта, вагон выйти из АМКР)
                //    parent_id = last_wir.CloseWagon(date_start, "Закрыта принудительно, вагон зашел с новым составом.", user);
                //    context.Update(last_wir); // Обновим контекст
                //}
                //// Определим входящую поставку
                //List<SAPIncomingSupply> sap_is = wagon.SAPIncomingSupply.ToList();
                //Arrival_UZ_Vagon vag_doc = wagon.Arrival_UZ_Vagon;

                //// Создадим новую строкку
                //WagonInternalRoutes new_wir = new WagonInternalRoutes()
                //{
                //    id = 0,
                //    num = wagon.num,
                //    id_arrival_car = wagon.id,
                //    id_sap_incoming_supply = sap_is != null && sap_is.Count() > 0 ? (long?)sap_is[0].id : null,
                //    create = DateTime.Now,
                //    create_user = user,
                //    parent_id = parent_id

                //};
                //new_wir.SetStationWagon(id_station, id_way, date_start, position, null, user);
                //new_wir.SetOpenOperation(1, date_start, (int)vag_doc.id_condition, vag_doc.vesg > 0 ? 1 : 0, null, null, null, user).SetCloseOperation(date_start, null, user);
                //context.Insert(new_wir); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagon(context={0}, id_way_from={1}, id_way_on={2}, position_on={3}, date_start={4}, date_stop={5}, wagon={6}, user={6})",
                    context, id_way_from, id_way_on, position_on, date_start, date_stop, wagon, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        /// <summary>
        /// Дислокация вагонов на станции
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="reverse"></param>
        /// <param name="id_way_on"></param>
        /// <param name="side_on"></param>
        /// <param name="date_start"></param>
        /// <param name="date_stop"></param>
        /// <param name="wagons"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer DislocationWagons(ref EFDbContext context, int id_way_from, bool reverse, int id_way_on, bool side_on, DateTime date_start, DateTime date_stop, List<WagonInternalRoutes> wagons, string user)
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
                        int result = DislocationWagon(ref context, id_way_from, id_way_on, position, date_start, date_stop, wagon, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;                       
                    }
                }
                rt.SetResult(context.SaveChanges());
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way_from={1}, reverse={2}, id_way_on={3}, side={4}, date_start={5}, date_stop={6}, wagons={7}, user={8})",
                    context, id_way_from, reverse, id_way_on, side_on, date_start, date_stop, wagons, user), servece_owner, eventID);
                rt.SetResult(-1);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }



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
                    Directory_Wagons wag_new = ids_dir.GetDirectory_WagonsOfNum(wagon.num, 0, null, 0, null, user);
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
