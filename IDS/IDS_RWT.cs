using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EFIDS.Concrete;
using EFIDS.Entities;

namespace IDS
{
    public enum errors_ids_rwt : int
    {
        global = -1,
        cancel_save_changes = -2,                   // Отмена сохранений изменений в базе данных (были ошибки по ходу выполнения всей операции)
        error_input_value = -100,
        not_arrival_cars = -201,                    // Ошибка, нет строки с входящим вагоном
        not_arrival_uz_vagon = -202,                // Ошибка, нет записи или сылки на документ прибывшего вагона
        not_wagon_of_db = -203,                     // Указаного вагона нет в базе
    }


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
        public OperationResult OperationUpdateWagonMarking(int id_arrival_cars, int id_condition, int? id_type, DateTime? date_rem_vag, string user)
        {
            OperationResult result = new OperationResult();
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
                        result.SetResult((int)errors_ids_rwt.cancel_save_changes); // Ошибка изменение было отменено
                    }
                }
                else
                {
                    result.SetResult((int)errors_ids_rwt.not_arrival_cars); // Ошибка, нет записи вагона по прибытию               
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagonMarking(id_arrival_cars={0}, id_condition ={1}, id_type={2}, date_rem_vag ={3}, user={4})",
                    id_arrival_cars, id_condition, id_type, date_rem_vag, user), servece_owner, this.eventID);
                result.SetResult((int)errors_ids_rwt.global);// Ошибка нет списка id
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
                if (arr_cars == null) return (int)errors_ids_rwt.not_arrival_cars; // Ошибка, нет записи вагона по прибытию 
                // 
                if (arr_cars.id_arrival_uz_vagon == null) return (int)errors_ids_rwt.not_arrival_uz_vagon; //Ошибка, нет сылки на документ прибывшего вагона
                // Получим контекст список документов на принятые вагоны
                EFArrival_UZ_Vagon ef_arr_uz_vag = new EFArrival_UZ_Vagon(context);
                // Получим запись документа принятого вагона
                Arrival_UZ_Vagon arr_uz_vag = ef_arr_uz_vag.Context.Where(v => v.id == arr_cars.id_arrival_uz_vagon).FirstOrDefault();
                if (arr_uz_vag == null) return (int)errors_ids_rwt.not_arrival_uz_vagon; //Ошибка, нет записи документа прибывшего вагона
                // Получим контекст справочник вагонов
                EFDirectory_Wagons ef_dir_wag = new EFDirectory_Wagons(context);
                // Получим запись вагона из справочника
                Directory_Wagons wagon = ef_dir_wag.Context.Where(w => w.num == arr_uz_vag.num).FirstOrDefault();
                if (wagon == null) return (int)errors_ids_rwt.not_wagon_of_db; // Указаного вагона нет в базе

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
                return (int)errors_ids_rwt.global;// Ошибка
            }
        }
        #endregion
    }
}
