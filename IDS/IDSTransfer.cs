using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IDSLogs;
using IDSLogs.Enum;
using EFIDS.Concrete;
using EFIDS.Entities;

namespace IDS
{
    public enum ids_status : int { Not = 0, InWork = 1, Accepted = 2, Rejected = 3 }

    /// <summary>
    /// Класс описания вагона прибывшего на АМКР
    /// </summary>
    public class ArrCar
    {
        public int num { get; set; }
        public int position { get; set; }
        public int consignee { get; set; }
    }

    public class IDSTransfer
    {
        private eventID eventID = eventID.IDS_IDSTransfer;
        protected service servece_owner = service.Null;

        public IDSTransfer()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public IDSTransfer(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
        /// <summary>
        /// Добавить новый состав находящийся на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrived"></param>
        /// <param name="id_sostav"></param>
        /// <param name="train"></param>
        /// <param name="composition_index"></param>
        /// <param name="date_arrival"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public long InsertArrivalSostav(long? id_arrived, long? id_sostav, int train, string composition_index, DateTime date_arrival, string user)
        {
            try
            {
                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());
                IDSDirectory ids_directory = new IDSDirectory(this.servece_owner);// Подключим библиотеку УЗ
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Проверим это новое прибытие
                ArrivalSostav sostav = ef_sostav.Context.Where(s => s.id_arrived == id_arrived).FirstOrDefault();
                if (sostav == null)
                {
                    // Состава с таким прибытием нет, проверим сотав вносили в ручную?
                    sostav = ef_sostav.Context.Where(s => s.id_arrived == null & s.id_sostav == null & s.train == train & s.composition_index == composition_index).FirstOrDefault();
                    if (sostav == null)
                    {
                        int code_from = int.Parse(composition_index.Substring(9, 4));
                        int id_station_from = ids_directory.GetID_Directory_StationOfCodeCorrect(code_from, true);

                        // Состава с таким прибытием нет и его не вносили в ручную?
                        sostav = new ArrivalSostav()
                        {
                            id = 0,
                            id_arrived = id_arrived,
                            id_sostav = id_sostav,
                            train = train,
                            composition_index = composition_index,
                            date_arrival = date_arrival,
                            status = (int)ids_status.Not,
                            id_station_from = id_station_from > 0 ? (int?)id_station_from : null,
                            create = DateTime.Now,
                            create_user = user,
                        };
                        ef_sostav.Add(sostav);
                        int result = ef_sostav.Save();
                        return result > 0 ? sostav.id : result; // Вернем новое id или код ошибки
                    }
                }
                else
                {
                    // Состава с таким прибытием есть, проверим сотав на id_sostav
                    if (sostav.id_sostav >= id_sostav)
                    {
                        // Обновление не требуетмя 
                        return 0; // Возвращаем id =0, обновление не надо
                    }
                    else
                    {
                        // Обновим время
                        sostav.date_arrival = date_arrival;
                        sostav.change = DateTime.Now;
                        sostav.change_user = user;
                        ef_sostav.Update(sostav);
                        int result = ef_sostav.Save();
                    }
                }
                // Требуется обновить информацию о сотаве
                if (sostav.status > 0)
                {
                    // Состав взят в работу, обновление не требуетмя.
                    return 0; // Возвращаем id=0
                }
                return sostav.id; // Возвращаем id состава для обновления
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertArrivalSostav(id_arrived={0}, id_sostav={1}, train={2}, composition_index={3}, date_arrival={4}, user={5})", id_arrived, id_sostav, train, composition_index, date_arrival, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Добавить новый состав находящийся на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrived"></param>
        /// <param name="id_sostav"></param>
        /// <param name="train"></param>
        /// <param name="composition_index"></param>
        /// <param name="date_arrival"></param>
        /// <returns></returns>
        public long InsertArrivalSostav(long? id_arrived, long? id_sostav, int train, string composition_index, DateTime date_arrival)
        {
            return InsertArrivalSostav(id_arrived, id_sostav, train, composition_index, date_arrival, null);
        }
        /// <summary>
        /// Добавить новые вагоны находящийся в сотаве прибывших на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrival"></param>
        /// <param name="cars"></param>
        /// <returns></returns>
        public int InsertArrivalCars(long id_arrival, List<ArrCar> cars, string user)
        {
            try
            {
                EFArrivalSostav ef_sostav = new EFArrivalSostav(new EFDbContext());
                EFArrivalCars ef_car = new EFArrivalCars(new EFDbContext());
                IDSDirectory ids_directory = new IDSDirectory(this.servece_owner);// Подключим библиотеку УЗ
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                ArrivalSostav sostav = ef_sostav.Context.Where(s => s.id == id_arrival).FirstOrDefault();
                if (sostav != null && sostav.status == 0)
                {
                    List<ArrivalCars> list = ef_car.Context.Where(c => c.id_arrival == id_arrival).ToList();
                    if (list != null && list.Count() > 0)
                    {
                        // Вагоны в составе есть требуется обновление, удалим старые вагоны

                    }
                    // добавим новые вагоны
                    foreach (ArrCar car in cars)
                    {
                        // Проверим код получателя
                        if (ids_directory.IsConsignee(false, car.consignee))
                        {
                            // Получатель АМКР
                            string doc_num = GetNumDoc(car.num);

                        }
                    }
                }


                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertArrivalCars(id_arrived={0}, cars={1}, user={2})", id_arrival, cars, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Добавить новые вагоны находящийся в сотаве прибывших на станциях УЗ Кривого Рога в систему ИДС
        /// </summary>
        /// <param name="id_arrival"></param>
        /// <param name="cars"></param>
        /// <returns></returns>
        public int InsertArrivalCars(long id_arrival, List<ArrCar> cars)
        {
            return InsertArrivalCars(id_arrival, cars, null);
        }
        /// <summary>
        /// Получить номер документа на вагон из УЗ
        /// </summary>
        /// <param name="num_car"></param>
        /// <returns></returns>
        public string GetNumDoc(int num_car)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_Num(num_car);
                if (uz_doc != null) { 
                
                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetNumDoc(num_car={0})", num_car), servece_owner, eventID);
                return null;// Ошибка
            }
        }

        public string InsertUZ_DOC(UZ.UZ_DOC uz_doc)
        {
            try
            {
                EFUZ_DOC ef_uzdoc = new EFUZ_DOC(new EFDbContext());
                
                if (uz_doc != null) {
                    UZ_DOC doc = ef_uzdoc.Get(uz_doc.id_doc);
                    if (doc == null) {
                        doc = new UZ_DOC()
                        {

                        };
                        doc.num_doc = uz_doc.id_doc;
                        doc.revision = uz_doc.
                    }

                }
                return null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("InsertUZ_DOC(uz_doc={0})", uz_doc), servece_owner, eventID);
                return null;// Ошибка
            }
        }

    }
}
