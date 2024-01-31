using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EFIDS.Concrete;
using EFIDS.Entities;
using IDS.Helper;

namespace IDS
{
    public class IDS_RWT : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSRWT;

        public IDS_RWT()
            : base()
        {

        }

        public IDS_RWT(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ПОЛОЖЕНИЕ ПАРКА
        /// <summary>
        /// Получить последнюю позицию вагона по указоному id пути положения парка
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_park_state_way"></param>
        /// <returns></returns>
        public int GetLastPositionOfWay(ref EFDbContext context, int id_park_state_way)
        {
            try
            {
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                ParkState_Wagon wagon = ef_pswag.Context.Where(w => w.id_park_state_way == id_park_state_way).OrderByDescending(c => c.position).FirstOrDefault();
                return wagon != null ? wagon.position : 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetLastPositionOfWay(context={0}, id_park_state_way={1})",
                    context, id_park_state_way), servece_owner, this.eventID);
                return -1;
            }
        }
        /// <summary>
        /// Удалить все вагоны по заданному пути
        /// </summary>
        /// <param name="id_park_state_way"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon DeleteWagonsOfWay(int id_park_state_way, string user)
        {
            OperationResultWagon result = new OperationResultWagon();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                // Проверим вагоны на блокировку (предъявлен)
                EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                List<ParkState_Wagon> wagons = ef_pswag.Context.Where(w => w.id_park_state_way == id_park_state_way).ToList();
                List<int> nums_lock = context.GetWagonsLockPresentOperation(wagons.Select(w => w.num).ToList());
                foreach (int num in nums_lock)
                {
                    // отобразим предъявленные вагоны
                    result.SetResultOperation((int)errors_base.error_change_park_station_lock_wagon, num);
                }
                // Если нет ошибок тогда обновим базу
                if (result.error == 0)
                {

                    int res_del = DeleteWagonsOfWay(ref context, id_park_state_way);
                    if (res_del > 0)
                    {
                        ParkState_Way psw = context.ParkState_Way.Where(w => w.id == id_park_state_way).FirstOrDefault();
                        if (psw != null)
                        {
                            psw.change = DateTime.Now;
                            psw.change_user = user;
                            ParkState_Station pss = context.ParkState_Station.Where(p => p.id == psw.id_park_state_station).FirstOrDefault();
                            if (pss != null)
                            {
                                pss.change = DateTime.Now;
                                pss.change_user = user;
                            }
                        }
                        result.SetResult(context.SaveChanges());
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeleteWagonsOfWay(id_station={0}, user={1})",
                    id_park_state_way, user), servece_owner, this.eventID);
                result.SetResult((int)errors_base.global);// Ошибка нет списка id
            }
            return result;
        }
        /// <summary>
        /// Удалить все вагоны по заданному пути
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_park_state_way"></param>
        /// <returns></returns>
        public int DeleteWagonsOfWay(ref EFDbContext context, int id_park_state_way)
        {
            try
            {
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                List<ParkState_Wagon> wagons = ef_pswag.Context.Where(w => w.id_park_state_way == id_park_state_way).ToList();

                //List<int> nums_lock = context.GetWagonsLockPresentOperation(wagons.Select(w => w.num).ToList());
                //if (nums_lock != null && nums_lock.Count() > 0) return (int)errors_base.error_change_park_station_lock_wagon; // Заблокирован вагон, отмена изменения

                if (wagons != null && wagons.Count() > 0)
                {
                    ef_pswag.Delete(wagons.Select(w => w.id).ToList());
                    return wagons.Count();
                }
                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeletWagonsOfWay(context={0}, id_park_state_way={1})",
                    context, id_park_state_way), servece_owner, this.eventID);
                return (int)errors_base.global;
            }
        }
        /// <summary>
        /// Добавить новое положение парка по станции
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="date_status_on"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultID OperationCreateParkState(int id_station, DateTime date_status_on, string user)
        {
            OperationResultID result = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                result.SetResultOperation(OperationCreateParkState(ref context, id_station, date_status_on, user), id_station);
                // Если нет ошибок тогда обновим базу
                if (result.error == 0)
                {
                    result.SetResult(context.SaveChanges());
                }
                else
                {
                    result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateParkState(id_station={0}, date_status_on ={1}, user={2})",
                    id_station, date_status_on, user), servece_owner, this.eventID);
                result.SetResult((int)errors_base.global);// Ошибка нет списка id
            }
            return result;
        }
        /// <summary>
        /// Добавить новое положение парка по станции
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="date_status_on"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationCreateParkState(ref EFDbContext context, int id_station, DateTime date_status_on, string user)
        {
            try
            {
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFParkState_Station ef_pss = new EFParkState_Station(context);
                // Получим последнееположение по станции
                ParkState_Station pss_last = ef_pss.Context.Where(p => p.id_station == id_station).OrderByDescending(s => s.state_on).FirstOrDefault();
                if (pss_last != null)
                {
                    // Проверим на дату (дата новая не должна быть равна или меньше последней
                    if (pss_last.state_on >= date_status_on) return (int)errors_base.error_date; // Ошибка
                }
                // Создаем новую запись
                ParkState_Station pss = new ParkState_Station()
                {
                    id = 0,
                    id_station = id_station,
                    state_on = date_status_on,
                    note = null,
                    create = DateTime.Now,
                    create_user = user,
                    change = null,
                    change_user = null,
                    delete = null,
                    delete_user = null,
                    applied = null,
                    applied_user = null,
                };
                // Получим пути по данной станции
                EFDirectory_Ways ef_ways = new EFDirectory_Ways(context);
                List<Directory_Ways> list_ways_station = ef_ways.Context.Where(w => w.id_station == id_station && w.way_delete == null).ToList();
                int position = 1;
                foreach (Directory_Ways way in list_ways_station)
                {
                    ParkState_Way psw = new ParkState_Way()
                    {
                        id = 0,
                        id_park_state_station = 0,
                        id_way = way.id,
                        position = position,
                        note = null,
                        create = DateTime.Now,
                        create_user = user,
                        change = null,
                        change_user = null,
                        delete = null,
                        delete_user = null,
                    };
                    pss.ParkState_Way.Add(psw);
                    position++;
                }
                ef_pss.Add(pss);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateParkState(context={0}, id_station={1}, date_status_on={2}, user={3})",
                    context, id_station, date_status_on, user), servece_owner, this.eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Удалить положение парка
        /// </summary>
        /// <param name="id_park_status"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultID OperationDeleteParkState(int id_park_status, string user)
        {
            OperationResultID result = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                result.SetResultOperation(OperationDeleteParkState(ref context, id_park_status, user), id_park_status);
                // Если нет ошибок тогда обновим базу
                if (result.error == 0)
                {
                    result.SetResult(context.SaveChanges());
                }
                else
                {
                    result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDeleteParkState(id_park_status={0}, user={1})",
                    id_park_status, user), servece_owner, this.eventID);
                result.SetResult((int)errors_base.global);// Ошибка нет списка id
            }
            return result;
        }
        /// <summary>
        /// Удалить положение парка
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_park_status"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDeleteParkState(ref EFDbContext context, int id_park_status, string user)
        {
            try
            {
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFParkState_Station ef_pss = new EFParkState_Station(context);
                EFParkState_Way ef_psw = new EFParkState_Way(context);
                EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                // Получим строку положения по станции
                ParkState_Station pss = ef_pss.Context.Where(s => s.id == id_park_status).FirstOrDefault();
                if (pss == null) return (int)errors_base.not_park_station_station_of_db;                     // Ошибка, в базе данных нет строки положения парка по станции
                if (pss.applied != null) return (int)errors_base.error_delete_park_station_apply;             // Ошибка, удалить нельзя, состояние парка уже применили
                // Получим пути выбранного состояния парка
                List<ParkState_Way> list_psw = ef_psw.Context.Where(w => w.id_park_state_station == pss.id).ToList();
                // Пройдемся по всем путям и удалим вагоны
                foreach (ParkState_Way way in list_psw)
                {
                    List<int> list_id_wag = ef_pswag.Context.Where(w => w.id_park_state_way == way.id).ToList().Select(w => w.id).ToList();
                    ef_pswag.Delete(list_id_wag); // пометим для удаления все вагоны
                    ef_psw.Delete(way.id);        // пометим для удаления путь
                }
                ef_pss.Delete(pss.id);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDeleteParkState(context={0}, id_park_status={1}, user={2})",
                    context, id_park_status, user), servece_owner, this.eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Добавить или перезаписать вагоны по указаному пути
        /// </summary>
        /// <param name="id_way"></param>
        /// <param name="wagons"></param>
        /// <param name="type"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon OperationUpdateWagonsParkState(int id_park_state_way, List<int> wagons, int type, string user)
        {
            OperationResultWagon result = new OperationResultWagon();
            try
            {
                EFDbContext context = new EFDbContext();
                EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagons != null)
                {
                    // Проверим вагоны добавляемые или замещаемые
                    List<int> nums_lock_update = context.GetWagonsLockPresentOperation(wagons);
                    foreach (int num in nums_lock_update)
                    {
                        // отобразим предъявленные вагоны
                        result.SetResultOperation((int)errors_base.error_change_park_station_lock_wagon, num);
                    }
                    if (result.error == 0)
                    {
                        int position = 1;
                        // Получим последнюю позицию по пути в зависимости от типа операции
                        if (type > 0)
                        {
                            // Определена операция замещения вагонов
                            // Проверим вагоны стоящие на пути 
                            List<ParkState_Wagon> psw = ef_pswag.Context.Where(w => w.id_park_state_way == id_park_state_way).ToList();
                            List<int> nums_lock = context.GetWagonsLockPresentOperation(psw.Select(w => w.num).ToList());
                            foreach (int num in nums_lock)
                            {
                                // отобразим предъявленные вагоны
                                result.SetResultOperation((int)errors_base.error_change_park_station_lock_wagon, num);
                            }
                            int res_del = DeleteWagonsOfWay(ref context, id_park_state_way);
                        }
                        else
                        {
                            // Добавить
                            position = GetLastPositionOfWay(ref context, id_park_state_way) + 1;
                        }

                        // проверка
                        if (result.error == 0)
                        {
                            // Пройдемся по списку вагонов
                            foreach (int num in wagons)
                            {
                                // Выполним операцию
                                result.SetResultOperation(OperationUpdateWagonParkState(ref context, id_park_state_way, num, position, user), num);
                                position++;
                            }

                            // Если нет ошибок тогда обновим базу
                            if (result.error == 0)
                            {
                                // Обновим время обновления 
                                ParkState_Way psw = context.ParkState_Way.Where(w => w.id == id_park_state_way).FirstOrDefault();
                                if (psw != null)
                                {
                                    psw.change = DateTime.Now;
                                    psw.change_user = user;
                                    ParkState_Station pss = context.ParkState_Station.Where(p => p.id == psw.id_park_state_station).FirstOrDefault();
                                    if (pss != null)
                                    {
                                        pss.change = DateTime.Now;
                                        pss.change_user = user;
                                    }
                                }
                                // Сохранить время 
                                result.SetResult(context.SaveChanges());
                            }
                            else
                            {
                                result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                            }
                        }
                        else
                        {
                            result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                        }


                    }
                    else
                    {
                        result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_input_list_wagons); // Ошибка? неуказан список вагонов
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagonsParkState(id_park_state_way={0}, wagons={1}, type={2}, user={3})",
                    id_park_state_way, wagons, type, user), servece_owner, this.eventID);
                result.SetResult((int)errors_base.global);// Ошибка нет списка id
            }
            return result;
        }
        /// <summary>
        /// Добавить вагон
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_park_state_way"></param>
        /// <param name="num"></param>
        /// <param name="position"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateWagonParkState(ref EFDbContext context, int id_park_state_way, int num, int position, string user)
        {
            try
            {
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFParkState_Way ef_psw = new EFParkState_Way(context);
                //EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                ParkState_Way way = ef_psw.Context.Where(w => w.id == id_park_state_way).FirstOrDefault();
                if (way == null) return (int)errors_base.not_way_park_station_station_of_db;                     // Ошибка, в базе данных нет строки положения парка по станции
                ParkState_Wagon wagon = new ParkState_Wagon()
                {
                    id = 0,
                    id_park_state_way = id_park_state_way,
                    num = num,
                    position = position,
                    note = null,
                    create = DateTime.Now,
                    create_user = user,
                };
                way.ParkState_Wagon.Add(wagon);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDeleteParkState(context={0}, id_park_state_way={1}, num={2}, position={3}, user={4})",
                    context, id_park_state_way, num, position, user), servece_owner, this.eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        /// <summary>
        /// Перенести текущее положение парка 
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="date_status_on"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultID OperationTransferWagonsParkState(int id_station, DateTime date_status_on, string user)
        {
            OperationResultID result = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFParkState_Station ef_pss = new EFParkState_Station(context);
                EFParkState_Way ef_psw = new EFParkState_Way(context);
                EFParkState_Wagon ef_pswag = new EFParkState_Wagon(context);
                // Получим строку положения парка по указаной станции по указаной дате
                ParkState_Station pss = ef_pss.Context.Where(p => p.id_station == id_station & p.state_on == date_status_on).FirstOrDefault();
                if (pss != null)
                {
                    List<ParkState_Way> psw_list = ef_psw.Context.Where(w => w.id_park_state_station == pss.id).ToList();
                    if (psw_list != null && psw_list.Count() > 0)
                    {
                        foreach (ParkState_Way psw in psw_list)
                        {
                            //Пройдемся по пути
                            List<int> nums = context.GetNumWagonsOfWay(psw.id_way);
                            List<ParkState_Wagon> pswag_list = ef_pswag.Context.Where(w => w.id_park_state_way == psw.id_way).ToList();
                            // Проверим вагоны на пути положения, если есть удалим
                            if (pswag_list != null && pswag_list.Count() > 0)
                            {
                                ef_pswag.Delete(pswag_list.Select(n => n.id));
                            }
                            // Перенесем вагоны
                            int position = 1;
                            foreach (int num in nums)
                            {

                                // Выполним операцию
                                result.SetResultOperation(OperationUpdateWagonParkState(ref context, psw.id, num, position, user), num);
                                position++;
                            }
                            // Обновим метку изменения пути
                            psw.change = DateTime.Now;
                            psw.change_user = user;
                            ef_psw.Update(psw);
                        }
                        // Обновим метку изменения пути
                        pss.change = DateTime.Now;
                        pss.change_user = user;
                        ef_pss.Update(pss);
                        // Если нет ошибок тогда обновим базу
                        if (result.error == 0)
                        {
                            // Сохранить время 
                            result.SetResult(context.SaveChanges());
                        }
                        else
                        {
                            result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                        }

                        //result.SetResultOperation(OperationCreateParkState(ref context, id_station, date_status_on, user), id_station);
                        // Если нет ошибок тогда обновим базу
                        if (result.error == 0)
                        {
                            result.SetResult(context.SaveChanges());
                        }
                        else
                        {
                            result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                        }
                    }
                    else
                    {
                        result.SetResult((int)errors_base.not_list_way_park_station_station_of_db);  // Ошибка, в базе данных нет списка путей положения парка по станции
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_park_station_station_of_db); // Ошибка изменение было отменено
                }

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationTransferWagonsParkState(id_station={0}, date_status_on ={1}, user={2})",
                    id_station, date_status_on, user), servece_owner, this.eventID);
                result.SetResult((int)errors_base.global);// Ошибка нет списка id
            }
            return result;
        }
        #endregion

        #region ПРАВКА РАЗМЕТКИ ВАГОНОВ
        /// <summary>
        /// Правка разметки по прибытию 
        /// </summary>
        /// <param name="id_arrival_cars"></param>
        /// <param name="id_condition"></param>
        /// <param name="id_type"></param>
        /// <param name="date_rem_vag"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon OperationUpdateWagonMarking(int id_arrival_cars, int id_condition, int? id_type, DateTime? date_rem_vag, string user)
        {
            OperationResultWagon result = new OperationResultWagon();
            try
            {
                EFDbContext context = new EFDbContext();
                // Получим строку вагона в прибытии
                ArrivalCars arr_cars = context.ArrivalCars.Where(c => c.id == id_arrival_cars).FirstOrDefault();
                if (arr_cars != null)
                {
                    result.SetResultOperation(OperationUpdateWagonMarking(ref context, arr_cars, id_condition, id_type, date_rem_vag, user), arr_cars.num);
                    // Если нет ошибок тогда обновим базу
                    if (result.error == 0)
                    {
                        result.SetResult(context.SaveChanges());
                    }
                    else
                    {
                        result.SetResult((int)errors_base.cancel_save_changes); // Ошибка изменение было отменено
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_arrival_cars_db); // Ошибка, нет записи вагона по прибытию               
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagonMarking(id_arrival_cars={0}, id_condition ={1}, id_type={2}, date_rem_vag ={3}, user={4})",
                    id_arrival_cars, id_condition, id_type, date_rem_vag, user), servece_owner, this.eventID);
                result.SetResult((int)errors_base.global);// Ошибка нет списка id
            }
            return result;
        }
        /// <summary>
        /// Правка разметки по прибытию 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="arr_cars"></param>
        /// <param name="id_condition"></param>
        /// <param name="id_type"></param>
        /// <param name="date_rem_vag"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateWagonMarking(ref EFDbContext context, ArrivalCars arr_cars, int id_condition, int? id_type, DateTime? date_rem_vag, string user)
        {
            try
            {
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Определим наличие вагона в прибытии
                if (arr_cars == null) return (int)errors_base.not_arrival_cars_db; // Ошибка, нет записи вагона по прибытию 
                // 
                if (arr_cars.id_arrival_uz_vagon == null) return (int)errors_base.not_arrival_uz_vagon; //Ошибка, нет сылки на документ прибывшего вагона
                // Получим контекст список документов на принятые вагоны
                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                // Получим запись документа принятого вагона
                Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(v => v.id == arr_cars.id_arrival_uz_vagon).FirstOrDefault();
                if (arr_uz_vag == null) return (int)errors_base.not_arrival_uz_vagon; //Ошибка, нет записи документа прибывшего вагона
                // Получим контекст справочник вагонов
                EFDirectory_Wagons ef_dir_wag = new EFDirectory_Wagons(context);
                // Получим запись вагона из справочника
                Directory_Wagons wagon = ef_dir_wag.Context.Where(w => w.num == arr_uz_vag.num).FirstOrDefault();
                if (wagon == null) return (int)errors_base.not_dir_wagon_of_db; // Указаного вагона нет в базе

                // Получим контекст Внутренего перемещения
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                WagonInternalRoutes wir = ef_wir.Context.Where(r => r.id_arrival_car == arr_cars.id).FirstOrDefault();

                if (wir == null) return (int)errors_base.not_wir_db; // Ошибка, нет записи внутренего перемещения вагона
                // Найдем первую запись
                WagonInternalOperation first_wio = wir.WagonInternalOperation.Where(o => o.parent_id == null).OrderBy(o => o.id).FirstOrDefault();
                if (first_wio == null) return (int)errors_base.not_wio_db; // Ошибка, нет записи операций внутренего перемещения вагона
                int id_condition_first = first_wio.id_condition;
                // Определим все записи
                List<WagonInternalOperation> list_wio = wir.WagonInternalOperation.OrderBy(o => o.id).ToList();
                // Обновим годность по внутренему перемещению
                foreach (WagonInternalOperation wio in list_wio)
                {
                    if (wio.id_condition == id_condition_first)
                    {
                        wio.id_condition = id_condition;
                    }
                    else
                    {
                        break; // Дрогая годность выйти изцикла
                    }
                }
                ef_wir.Update(wir);
                // Запись документа есть правим тип и годность по прибытию
                arr_uz_vag.id_condition = id_condition;
                arr_uz_vag.id_type = id_type;
                ef_arr_uz_vag.Update(arr_uz_vag);
                // Запись справочника есть, правим дату ремонта
                wagon.date_rem_vag = date_rem_vag;
                ef_dir_wag.Update(wagon);
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagonMarking(context={0}, arr_cars={1}, id_condition ={2}, id_type={3}, date_rem_vag ={4}, user={5})",
                    context, arr_cars, id_condition, id_type, date_rem_vag, user), servece_owner, this.eventID);
                return (int)errors_base.global;// Ошибка
            }
        }
        #endregion
    }
}
