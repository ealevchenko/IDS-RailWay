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

        #region
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
                    parent_id = last_wir.CloseWagon(date_start, user);
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
                new_wir.SetStationWagon(id_station, id_way, date_start, position, user);
                new_wir.SetOpenOperation(1, date_start, (int)vag_doc.id_condition, vag_doc.vesg>0 ? 1 : 0, null, null, user).SetCloseOperation(date_start,user);
                context.Insert(new_wir); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IncomingWagon(id_station={0})", id_station), servece_owner, eventID);
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
        public int IncomingWagons(ref EFDbContext context, int id_station, int id_way, DateTime date_start, List<ArrivalCars> wagons, bool numeration, string user)
        {
            try
            {
                if (context == null) {
                    context = new EFDbContext();
                }
                int position = context.GetNextPosition(id_way);
                foreach (ArrivalCars wagon in numeration ? wagons.OrderByDescending(w => w.position_arrival) : wagons.OrderBy(w => w.position_arrival))
                {
                    int result = IncomingWagon(ref context, id_station, id_way, date_start, position, wagon, user);
                    position++;
                }

                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IncomingWagon(id_station={0})", id_station), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion
    }
}
