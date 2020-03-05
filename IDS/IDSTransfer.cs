using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IDSLogs;
using IDSLogs.Enum;
using EFIDS.Concrete;
using EFIDS.Entities;
//using UZ;

namespace IDS
{
    public enum ids_status : int { Not = 0, InWork = 1, Accepted = 2, Rejected = 3 }

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

        public long AddArrival(long? id_arrived, long? id_sostav, int train, string composition_index, DateTime date_arrival, string user)
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
                else {
                    // Состава с таким прибытием есть, проверим сотав на id
                    if (sostav.id_sostav >= id_sostav) {
                        // Обновление не требуетмя 
                        return sostav.id; // Возвращаем id состава, обновление не надо
                    }
                }
                // Требуется обновить информацию о сотаве
                if (sostav.status > 0)
                {
                    // Состав взят в работу, обновление не требуетмя.
                    return sostav.id; // Возвращаем id состава
                }
                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddSostav(id_arrived={0},id_sostav={1},train={2},composition_index={3})", id_arrived, id_sostav, train, composition_index), servece_owner, eventID);
                return -1;
            }
        }
    }
}
