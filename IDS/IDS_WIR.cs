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
using UZ;
using System.Runtime.InteropServices;
using System.Globalization;

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
    /// <summary>
    /// Класс данных для хранения ЭПД отправляемых вагонов
    /// </summary>
    public class EPDOutgoingCar
    {
        public long id_outgoing_car { get; set; }
        public UZ.UZ_DOC epd { get; set; }
    }

    public class wagon_operation_send
    {
        public long id_wir { get; set; }
        public long? id_wim { get; set; }
        public long id_wio { get; set; }
        public int? num { get; set; }
        public int? wagon_adm { get; set; }
        public string wagon_adm_name_ru { get; set; }
        public string wagon_adm_name_en { get; set; }
        public string wagon_adm_abbr_ru { get; set; }
        public string wagon_adm_abbr_en { get; set; }
        public int? wagon_rod { get; set; }
        public string wagon_rod_name_ru { get; set; }
        public string wagon_rod_name_en { get; set; }
        public string wagon_rod_abbr_ru { get; set; }
        public string wagon_rod_abbr_en { get; set; }
        public string wagon_operators_name_ru { get; set; }
        public string wagon_operators_name_en { get; set; }
        public string wagon_operators_abbr_ru { get; set; }
        public string wagon_operators_abbr_en { get; set; }
        public bool? wagon_operators_paid { get; set; }
        public string wagon_operators_color { get; set; }
        public DateTime? wagon_operators_rent_start { get; set; }
        public string wagon_limiting_name_ru { get; set; }
        public string wagon_limiting_name_en { get; set; }
        public string wagon_limiting_abbr_ru { get; set; }
        public string wagon_limiting_abbr_en { get; set; }
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string wir_note { get; set; }
        public DateTime? wir_create { get; set; }
        public string wir_create_user { get; set; }
        public DateTime? wir_close { get; set; }
        public string wir_close_user { get; set; }
        public long? wir_parent_id { get; set; }
        public int id_operation { get; set; }
        public string operation_name_ru { get; set; }
        public string operation_name_en { get; set; }
        public bool busy { get; set; }
        public DateTime operation_start { get; set; }
        public DateTime? operation_end { get; set; }
        public int operation_id_condition { get; set; }
        public string operation_condition_name_ru { get; set; }
        public string operation_condition_name_en { get; set; }
        public string operation_condition_abbr_ru { get; set; }
        public string operation_condition_abbr_en { get; set; }
        public bool? operation_red { get; set; }
        public int operation_id_loading_status { get; set; }
        public string operation_loading_status_ru { get; set; }
        public string operation_loading_status_en { get; set; }
        public string operation_locomotive1 { get; set; }
        public string operation_locomotive2 { get; set; }
        public string operation_note { get; set; }
        public DateTime operation_create { get; set; }
        public string operation_create_user { get; set; }
        public DateTime? operation_close { get; set; }
        public string operation_close_user { get; set; }
        public long? operation_parent_id { get; set; }
        public int? from_id_station { get; set; }
        public string from_station_name_ru { get; set; }
        public string from_station_name_en { get; set; }
        public string from_station_abbr_ru { get; set; }
        public string from_station_abbr_en { get; set; }
        public int? from_id_way { get; set; }
        public int? from_id_park { get; set; }
        public string from_way_num_ru { get; set; }
        public string from_way_num_en { get; set; }
        public string from_way_name_ru { get; set; }
        public string from_way_name_en { get; set; }
        public string from_way_abbr_ru { get; set; }
        public string from_way_abbr_en { get; set; }
        public int? from_capacity { get; set; }
        public DateTime? from_way_close { get; set; }
        public DateTime? from_way_delete { get; set; }
        public string from_way_note { get; set; }
        public DateTime? from_way_start { get; set; }
        public DateTime? from_way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public int? wim_position { get; set; }
        public string wim_note { get; set; }
        public DateTime? wim_create { get; set; }
        public string wim_create_user { get; set; }
        public DateTime? wim_close { get; set; }
        public string wim_close_user { get; set; }
        public long? wim_parent_id { get; set; }
        public int? id_station_on { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
    }

    public class sostav_operation_send
    {
        public int id { get; set; }
        public int id_operation { get; set; }
        public string operation_name_ru { get; set; }
        public string operation_name_en { get; set; }
        public DateTime operation_start { get; set; }
        public DateTime? operation_end { get; set; }
        public DateTime operation_create { get; set; }
        public string operation_create_user { get; set; }
        public string operation_locomotive1 { get; set; }
        public string operation_locomotive2 { get; set; }
        public int? from_id_station { get; set; }
        public string from_station_name_ru { get; set; }
        public string from_station_name_en { get; set; }
        public string from_station_abbr_ru { get; set; }
        public string from_station_abbr_en { get; set; }
        public int? from_id_way { get; set; }
        public int? from_id_park { get; set; }
        public string from_way_num_ru { get; set; }
        public string from_way_num_en { get; set; }
        public string from_way_name_ru { get; set; }
        public string from_way_name_en { get; set; }
        public string from_way_abbr_ru { get; set; }
        public string from_way_abbr_en { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public int? id_station_on { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
        public int count_wagon_send { get; set; }
        public int count_wagon_arrival { get; set; }
        public List<wagon_operation_send> wagons { get; set; }
    }

    public class wagon_send_arrival
    {
        public int id { get; set; }
        public long id_wir { get; set; }
        public long? from_id_wim { get; set; }
        public long from_id_wio { get; set; }
        public long? on_id_wim { get; set; }
        public long? on_id_wio { get; set; }
        public int? num { get; set; }
        public int? wagon_adm { get; set; }
        public string wagon_adm_name_ru { get; set; }
        public string wagon_adm_name_en { get; set; }
        public string wagon_adm_abbr_ru { get; set; }
        public string wagon_adm_abbr_en { get; set; }
        public int? wagon_rod { get; set; }
        public string wagon_rod_name_ru { get; set; }
        public string wagon_rod_name_en { get; set; }
        public string wagon_rod_abbr_ru { get; set; }
        public string wagon_rod_abbr_en { get; set; }
        public string wagon_operators_name_ru { get; set; }
        public string wagon_operators_name_en { get; set; }
        public string wagon_operators_abbr_ru { get; set; }
        public string wagon_operators_abbr_en { get; set; }
        public bool? wagon_operators_paid { get; set; }
        public string wagon_operators_color { get; set; }
        public DateTime? wagon_operators_rent_start { get; set; }
        public string wagon_limiting_name_ru { get; set; }
        public string wagon_limiting_name_en { get; set; }
        public string wagon_limiting_abbr_ru { get; set; }
        public string wagon_limiting_abbr_en { get; set; }
        public string arrival_condition_name_ru { get; set; }
        public string arrival_condition_name_en { get; set; }
        public string arrival_condition_abbr_ru { get; set; }
        public string arrival_condition_abbr_en { get; set; }
        public bool? arrival_condition_red { get; set; }
        public string arrival_cargo_group_name_ru { get; set; }
        public string arrival_cargo_group_name_en { get; set; }
        public string arrival_cargo_name_ru { get; set; }
        public string arrival_cargo_name_en { get; set; }
        public long? id_arrival_car { get; set; }
        public long? id_sap_incoming_supply { get; set; }
        public bool? doc_outgoing_car { get; set; }
        public long? id_outgoing_car { get; set; }
        public long? id_sap_outbound_supply { get; set; }
        public string wir_note { get; set; }
        public DateTime? wir_create { get; set; }
        public string wir_create_user { get; set; }
        public DateTime? wir_close { get; set; }
        public string wir_close_user { get; set; }
        public long? wir_parent_id { get; set; }
        public int from_id_operation { get; set; }
        public string from_operation_name_ru { get; set; }
        public string from_operation_name_en { get; set; }
        public bool from_busy { get; set; }
        public DateTime from_operation_start { get; set; }
        public DateTime? from_operation_end { get; set; }
        public int from_operation_id_condition { get; set; }
        public string from_operation_condition_name_ru { get; set; }
        public string from_operation_condition_name_en { get; set; }
        public string from_operation_condition_abbr_ru { get; set; }
        public string from_operation_condition_abbr_en { get; set; }
        public bool? from_operation_red { get; set; }
        public int from_operation_id_loading_status { get; set; }
        public string from_operation_loading_status_ru { get; set; }
        public string from_operation_loading_status_en { get; set; }
        public string from_operation_locomotive1 { get; set; }
        public string from_operation_locomotive2 { get; set; }
        public string from_operation_note { get; set; }
        public DateTime from_operation_create { get; set; }
        public string from_operation_create_user { get; set; }
        public DateTime? from_operation_close { get; set; }
        public string from_operation_close_user { get; set; }
        public long? from_operation_parent_id { get; set; }
        public int? from_id_station { get; set; }
        public string from_station_name_ru { get; set; }
        public string from_station_name_en { get; set; }
        public string from_station_abbr_ru { get; set; }
        public string from_station_abbr_en { get; set; }
        public int? from_id_way { get; set; }
        public int? from_id_park { get; set; }
        public string from_way_num_ru { get; set; }
        public string from_way_num_en { get; set; }
        public string from_way_name_ru { get; set; }
        public string from_way_name_en { get; set; }
        public string from_way_abbr_ru { get; set; }
        public string from_way_abbr_en { get; set; }
        public int? from_way_capacity { get; set; }
        public DateTime? from_way_close { get; set; }
        public DateTime? from_way_delete { get; set; }
        public string from_way_note { get; set; }
        public DateTime? from_way_start { get; set; }
        public DateTime? from_way_end { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public DateTime? outer_way_start { get; set; }
        public DateTime? outer_way_end { get; set; }
        public int? from_way_position { get; set; }
        public string from_wim_note { get; set; }
        public DateTime? from_wim_create { get; set; }
        public string from_wim_create_user { get; set; }
        public DateTime? from_wim_close { get; set; }
        public string from_wim_close_user { get; set; }
        public long? from_wim_parent_id { get; set; }
        public int? on_id_station { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
        public int? on_id_way { get; set; }
        public int? on_id_park { get; set; }
        public string on_way_num_ru { get; set; }
        public string on_way_num_en { get; set; }
        public string on_way_name_ru { get; set; }
        public string on_way_name_en { get; set; }
        public string on_way_abbr_ru { get; set; }
        public string on_way_abbr_en { get; set; }
        public int? on_way_capacity { get; set; }
        public DateTime? on_way_close { get; set; }
        public DateTime? on_way_delete { get; set; }
        public string on_way_note { get; set; }
        public DateTime? on_way_start { get; set; }
        public DateTime? on_way_end { get; set; }
        public int? on_way_position { get; set; }
        public string on_wim_note { get; set; }
        public DateTime? on_wim_create { get; set; }
        public string on_wim_create_user { get; set; }
        public DateTime? on_wim_close { get; set; }
        public string on_wim_close_user { get; set; }
        public long? on_wim_parent_id { get; set; }
        public int? on_id_operation { get; set; }
        public string on_operation_name_ru { get; set; }
        public string on_operation_name_en { get; set; }
        public bool? on_busy { get; set; }
        public DateTime? on_operation_start { get; set; }
        public DateTime? on_operation_end { get; set; }
        public int? on_operation_id_condition { get; set; }
        public string on_operation_condition_name_ru { get; set; }
        public string on_operation_condition_name_en { get; set; }
        public string on_operation_condition_abbr_ru { get; set; }
        public string on_operation_condition_abbr_en { get; set; }
        public bool? on_operation_red { get; set; }
        public int? on_operation_id_loading_status { get; set; }
        public string on_operation_locomotive1 { get; set; }
        public string on_operation_locomotive2 { get; set; }
        public string on_operation_note { get; set; }
        public DateTime? on_operation_create { get; set; }
        public string on_operation_create_user { get; set; }
        public DateTime? on_operation_close { get; set; }
        public string on_operation_close_user { get; set; }
        public long? on_operation_parent_id { get; set; }
    }

    public class sostav_send_arrival
    {
        public int id { get; set; }
        public int from_id_operation { get; set; }
        public string from_operation_name_ru { get; set; }
        public string from_operation_name_en { get; set; }
        public DateTime from_operation_start { get; set; }
        public DateTime? from_operation_end { get; set; }
        public DateTime from_operation_create { get; set; }
        public string from_operation_create_user { get; set; }
        public string from_operation_locomotive1 { get; set; }
        public string from_operation_locomotive2 { get; set; }
        public int? from_id_station { get; set; }
        public string from_station_name_ru { get; set; }
        public string from_station_name_en { get; set; }
        public string from_station_abbr_ru { get; set; }
        public string from_station_abbr_en { get; set; }
        public int? from_id_way { get; set; }
        public int? from_id_park { get; set; }
        public string from_way_num_ru { get; set; }
        public string from_way_num_en { get; set; }
        public string from_way_name_ru { get; set; }
        public string from_way_name_en { get; set; }
        public string from_way_abbr_ru { get; set; }
        public string from_way_abbr_en { get; set; }
        public int? id_outer_way { get; set; }
        public string name_outer_way_ru { get; set; }
        public string name_outer_way_en { get; set; }
        public DateTime? outer_way_close { get; set; }
        public DateTime? outer_way_delete { get; set; }
        public string outer_way_note { get; set; }
        public int? on_id_station { get; set; }
        public string on_station_name_ru { get; set; }
        public string on_station_name_en { get; set; }
        public string on_station_abbr_ru { get; set; }
        public string on_station_abbr_en { get; set; }
        public int? on_id_way { get; set; }
        public int? on_id_park { get; set; }
        public string on_way_num_ru { get; set; }
        public string on_way_num_en { get; set; }
        public string on_way_name_ru { get; set; }
        public string on_way_name_en { get; set; }
        public string on_way_abbr_ru { get; set; }
        public string on_way_abbr_en { get; set; }
        public DateTime? on_way_close { get; set; }
        public DateTime? on_way_delete { get; set; }
        public int? on_id_operation { get; set; }
        public string on_operation_name_ru { get; set; }
        public string on_operation_name_en { get; set; }
        public DateTime? on_operation_start { get; set; }
        public DateTime? on_operation_end { get; set; }
        public DateTime? on_operation_create { get; set; }
        public string on_operation_create_user { get; set; }
        public string on_operation_locomotive1 { get; set; }
        public string on_operation_locomotive2 { get; set; }
        public int count_wagon_send { get; set; }
        public int count_wagon_arrival { get; set; }
        public List<wagon_send_arrival> wagons { get; set; }
    }
    /// <summary>
    /// TODO: Убрать перенести в базовые ошибки
    /// </summary>
    //public enum errors_wir : int
    //{
    //    //global = -1,
    //    //cancel_save_changes = -2,       // Отмена сохранений изменений в базе данных (были ошибки по ходу выполнения всей операции)
    //    //not_input_value = -100,
    //    //not_sostav = -101, //...
    //    //not_wagon = -102,
    //    //not_arrival_wir = -103,         // Нет записи [WagonInternalRoutes] зашедшей на АМКР
    //    //not_open_wir = -104,            // Нет открытой записи положения вагона. (Если вагон защел тогда вагон всегда должен гдето стоять!)
    //    //not_set_way_wir = -105,         // Нет вагон стоит не натом пути по которому нужно провести операцию.
    //    //not_way_on = -106,              // Неуказан путь приема
    //}

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
                new_wir.SetStationWagon_old(id_station, id_way, date_start, position, null, user);
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
                //List<WagonInternalMovement> list_wim = context.WagonInternalMovement.Where(m => m.id_way == id_way & m.id_outer_way == null & m.way_end == null).OrderBy(p => p.position).ToList();
                List<WagonInternalMovement> list_wim = context.GetMovementWagonsOfWay(id_way);
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
                if (wagon == null) return (int)errors_base.not_wir_db;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_wim_db;
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way;
                wagon.SetStationWagon_old(wim.id_station, id_way_on, lead_time, position_on, null, user);
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
                    rt.SetResult((int)errors_base.cancel_save_changes);
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
                if (wagon == null) return (int)errors_base.not_open_wir;  // Нет перечня вагонов
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // Неуказан путь приема
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;       //  Нет открытой записи положения вагона. (Если вагон защел тогда вагон всегда должен гдето стоять!)
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way; // Нет вагон стоит не натом пути по которому нужно провести операцию.
                wagon.SetStationWagon_old(id_station_on, id_way_on, date_stop, position_on, null, user);
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
                        lrt.SetResult((int)errors_base.cancel_save_changes);
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
        //TODO: ! Удалить старая операция отправки
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="position_on"></param>
        /// <param name="num_sostav"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendingWagon(ref EFDbContext context, int id_way_from, int id_outer_ways, int position_on, int num_sostav, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_open_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way;
                // Проверим вагон уже стоит ?
                if (wim.id_outer_way == id_outer_ways && wim.position == position_on) return 0; // Вагон отправлен пропустить операцию
                // Вагон не стоит, переставим.
                string note_sostav = "Состав №" + num_sostav.ToString();
                wagon.SetSendingWagon_old(id_outer_ways, lead_time, position_on, note_sostav, user);
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
        //TODO: ! Удалить старая операция отправки
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
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DislocationWagons(context={0}, id_way_from={1}, id_outer_ways={2}, num_sostav={3}, lead_time={4}, wagons={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_way_from, id_outer_ways, num_sostav, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        //TODO: ! Удалить старая операция отправки
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

        /// <summary>
        /// Выполнить операцию отправить вагон в составе на станцию АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="position_on"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagon"></param>
        /// <param name="num_sostav"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int SendWagon(ref EFDbContext context, int id_way_from, int id_outer_ways, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string num_sostav, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFDbContext();
                }
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (wagon == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;                  // В базе данных нет открытой записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                if (wim.id_way != id_way_from) return (int)errors_base.wagon_not_way;   // Вагон не стоит на пути
                // Проверим вагон уже стоит ?
                if (wim.id_outer_way == id_outer_ways && wim.position == position_on) return 0; // Вагон отправлен пропустить операцию
                // Вагон не стоит, переставим.

                // Установим и закроем операцию отправления -5              
                WagonInternalOperation new_operation = wagon.SetOpenOperation(5, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, "Состав:" + num_sostav, user).SetCloseOperation(lead_time, null, user);
                if (new_operation == null) return (int)errors_base.err_create_wio_db;   // Ошибка создания новой операции над вагоном.

                // Установим и вагон на внешний путь
                WagonInternalMovement new_movement = wagon.SetSendingWagon(id_outer_ways, lead_time, position_on, num_sostav, null, user);
                if (new_movement == null) return (int)errors_base.err_create_wim_db;   // Ошибка создания новой позиции вагона.
                // Зададим сылку на операцию
                new_movement.WagonInternalOperation = new_operation;
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendWagon(context={0}, id_way_from={1}, id_outer_ways={2}, position_on={3}, num_sostav={4}, lead_time={5}, wagon={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_way_from, id_outer_ways, position_on, num_sostav, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return (int)errors_base.global; // Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Выполнить операцию отправить вагоны на станцию АМКР
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way_from"></param>
        /// <param name="id_outer_ways"></param>
        /// <param name="lead_time"></param>
        /// <param name="wagons"></param>
        /// <param name="num_sostav"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer SendWagonsOfStation(int id_way_from, int id_outer_ways, DateTime lead_time, List<ListOperationWagon> wagons, string num_sostav, string locomotive1, string locomotive2, string user)
        {
            DateTime start = DateTime.Now;
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                EFDbContext context = new EFDbContext();
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                //Проверим и скорректируем нового состава
                if (String.IsNullOrWhiteSpace(num_sostav))
                {
                    num_sostav = id_outer_ways.ToString() + '-' + lead_time.ToString("ddMMyyyyHHmmss");
                }
                List<WagonInternalRoutesPosition> List_wir = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in wagons.OrderBy(w => w.position).ToList())
                {
                    List_wir.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }

                if (List_wir != null && List_wir.Count() > 0)
                {
                    // Выполним сортировку позиций по возрастанию
                    List<WagonInternalRoutes> wagon_position = List_wir.OrderBy(w => w.new_position).Select(w => w.wir).ToList();

                    int position = 1;


                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = SendWagon(ref context, id_way_from, id_outer_ways, position, lead_time, wagon, num_sostav, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                // 
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                    // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                    if (rt.result > 0)
                    {
                        string mess = String.Format("Операция отправки вагонов на станцию АМКР. Код выполнения = {0}. Путь отправки = {1}, внешний путь приема = {2}, номер состава = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                            rt.result, id_way_from, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2, rt.count, rt.moved, rt.skip, rt.error);
                        mess.WarningLog(servece_owner, eventID);
                        mess.EventLog(rt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Операция отправки вагонов на станцию АМКР."), start, stop, rt.result);
                        int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
                        if (result_rnw > 0)
                        {
                            // Применим перенумерацию
                            int res_renum = context.SaveChanges();
                        }
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SendWagonsOfStation(id_way_from={0}, id_outer_ways={1}, lead_time={2}, List_wir={3}, num_sostav={4}, locomotive1={5}, locomotive2={6}, user={7})",
                    id_way_from, id_outer_ways, lead_time, wagons, num_sostav, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        ///// <summary>
        ///// Выполнить операцию отправить вагоны на станцию АМКР
        ///// </summary>
        ///// <param name="id_way_from"></param>
        ///// <param name="wagons"></param>
        ///// <param name="id_outer_ways"></param>
        ///// <param name="lead_time"></param>
        ///// <param name="locomotive1"></param>
        ///// <param name="locomotive2"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int SendWagonsOfStation(int id_way_from, List<ListOperationWagon> wagons, int id_outer_ways, DateTime lead_time, string locomotive1, string locomotive2, string user)
        //{
        //    try
        //    {
        //        DateTime start = DateTime.Now;
        //        ResultTransfer res = new ResultTransfer(0);
        //        //Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        EFDbContext context = new EFDbContext();
        //        // Отправляем все вагоны
        //        // Номер состава
        //        string num_sostav = id_outer_ways.ToString() + '-' + lead_time.ToString("ddMMyyyyHHmmss");
        //        res = SendWagonsOfStation(ref context, id_way_from, id_outer_ways, lead_time, wagons, num_sostav, locomotive1, locomotive2, user);
        //        // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
        //        if (res.result > 0)
        //        {
        //            int result_rnw = RenumberingWagons(ref context, id_way_from, 1);
        //            if (result_rnw > 0)
        //            {
        //                // Применим перенумерацию
        //                context.SaveChanges();
        //            }
        //        }
        //        string mess = String.Format("Операция отправки вагонов на станцию АМКР. Код выполнения = {0}. Путь отправки = {1}, внешний путь приема = {2}, номер состава = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
        //            res.result, id_way_from, id_outer_ways, num_sostav, lead_time, locomotive1, locomotive2,
        //            res.count, res.moved, res.skip, res.error);
        //        mess.WarningLog(servece_owner, eventID);
        //        mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
        //        DateTime stop = DateTime.Now;
        //        servece_owner.ServicesToLog(eventID, String.Format("Операция отправки вагонов на станцию АМКР."), start, stop, res.result);

        //        return res.result;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("SendWagonsOfStation(id_way_from={0}, wagons={1}, id_outer_ways={2}, lead_time={3}, locomotive1={4}, locomotive2={5}, user={6})",
        //            id_way_from, wagons, id_outer_ways, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
        //        return -1;// Возвращаем id=-1 , Ошибка
        //    }
        //}
        #endregion

        #region  Операция "Принять вагон"
        //TODO: ! Удалить старая операция приема
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
        public int ArrivalWagon_old(ref EFDbContext context, int id_outer_way, int id_way_on, int position_on, DateTime lead_time, WagonInternalRoutes wagon, string locomotive1, string locomotive2, string user)
        {
            try
            {
                if (wagon == null) return (int)errors_base.not_open_wir;
                // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // Неуказан путь приема
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;
                if (wim.id_outer_way != id_outer_way) return (int)errors_base.wagon_not_outerway;
                // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position_on) return 0; // Вагон принят пропустить операцию
                // Вагон не принят, принять.
                string note_sostav = wim.note + "- принят";
                wagon.SetStationWagon_old(id_station_on, id_way_on, lead_time, position_on, note_sostav, user);
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
        //TODO: ! Удалить старая операция приема        
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
                        int result = ArrivalWagon_old(ref context, id_outer_way, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, user);
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
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagons(context={0},id_outer_ways ={1}, reverse={2}, id_way_on={3}, side_on={4}, lead_time={5}, wagons={6}, locomotive1={7}, locomotive2={8}, user={9})",
                    context, id_outer_way, reverse, id_way_on, side_on, lead_time, wagons, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
            }
        }
        //TODO: ! Удалить старая операция приема        
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

        /// <summary>
        /// Принять прибывающий вагон состава с внешнего пути
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_outer_way"></param>
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
                if (wagon == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                // Определим станцию и путь приема
                Directory_Ways way = context.Directory_Ways.Where(w => w.id == id_way_on).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db;         // В базе данных нет записи указанной строки пути
                if (way.way_delete != null) return (int)errors_base.way_is_delete;  // Путь удален
                if (way.way_close != null) return (int)errors_base.way_is_close;    // Путь закрыт
                int id_station_on = way.id_station;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;                  // В базе данных нет открытой записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                if (wim.id_outer_way != id_outer_way) return (int)errors_base.wagon_not_outerway; // вагон  не стоит на указаном перегоне
                // Проверим вагон уже стоит ?
                if (wim.id_way == id_way_on && wim.position == position_on) return 0; // Вагон уже принят пропустить операцию
                // Вагон не принят, принять.
                string note_sostav = "Состав:" + wim.num_sostav + "- принят";

                // Установим и закроем операцию принять -6              
                WagonInternalOperation new_operation = wagon.SetOpenOperation(6, lead_time.AddMinutes(-10), null, null, locomotive1, locomotive2, note_sostav, user).SetCloseOperation(lead_time, null, user);
                if (new_operation == null) return (int)errors_base.err_create_wio_db;   // Ошибка создания новой операции над вагоном.

                // Установим и вагон на путь станции
                WagonInternalMovement new_movement = wagon.SetStationWagon(id_station_on, id_way_on, lead_time, position_on, null, user);

                if (new_movement == null) return (int)errors_base.err_create_wim_db;   // Ошибка создания новой позиции вагона.
                // Зададим сылку на операцию
                new_movement.WagonInternalOperation = new_operation;
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagon(context={0}, id_outer_ways={1}, id_way_on={2}, position_on={3}, lead_time={4}, wagon={5}, locomotive1={6}, locomotive2={7}, user={8})",
                    context, id_outer_way, id_way_on, position_on, lead_time, wagon, locomotive1, locomotive2, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Принять прибывающий состав с внешнего пути
        /// </summary>
        /// <param name="id_outer_way"></param>
        /// <param name="wagons"></param>
        /// <param name="id_way_on"></param>
        /// <param name="head"></param>
        /// <param name="lead_time"></param>
        /// <param name="locomotive1"></param>
        /// <param name="locomotive2"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultTransfer ArrivalWagonsOfStation(int id_outer_way, List<ListOperationWagon> wagons, int id_way_on, bool head, DateTime lead_time, string locomotive1, string locomotive2, string user)
        {
            DateTime start = DateTime.Now;
            ResultTransfer rt = new ResultTransfer(wagons.Count());
            try
            {
                EFDbContext context = new EFDbContext();
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                List<WagonInternalRoutesPosition> List_wir = new List<WagonInternalRoutesPosition>();
                // Пройдемся по вагонам отсортировав их по позиции
                foreach (ListOperationWagon sw in wagons.OrderBy(w => w.position).ToList())
                {
                    List_wir.Add(new WagonInternalRoutesPosition() { wir = context.WagonInternalRoutes.Where(r => r.id == sw.wir_id).FirstOrDefault(), new_position = sw.position });
                }

                if (List_wir != null && List_wir.Count() > 0)
                {
                    // Выполним сортировку позиций по возрастанию
                    List<WagonInternalRoutes> wagon_position = List_wir.OrderBy(w => w.new_position).Select(w => w.wir).ToList();
                    
                    //Подготовим путь приема(перестроим позиции)
                    int res_renum = RenumberingWagons(ref context, id_way_on, (head == true ? (wagons.Count() + 1) : 1));
                    // Определим позицию переноса вагонов
                    int position = head == true ? 1 : context.GetNextPosition(id_way_on);

                    foreach (WagonInternalRoutes wagon in wagon_position)
                    {
                        int result = ArrivalWagon(ref context, id_outer_way, id_way_on, position, lead_time, wagon, locomotive1, locomotive2, user);
                        rt.SetMovedResult(result, wagon.num);
                        position++;
                    }
                }
                // 
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                    // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                    if (rt.result > 0)
                    {
                        string mess = String.Format("Операция принять состав на станцию АМКР. Код выполнения = {0}. внешний путь = {1}, путь приема = {2}, голова = {3}, время выполнения операции = {4}, локомотив-1 = {5}, локомотив-2 = {6}. Результат переноса [выбрано для переноса = {7}, перенесено = {8}, пропущено = {9}, ошибок переноса = {10}].",
                            rt.result, id_outer_way, id_way_on, head, lead_time, locomotive1, locomotive2, rt.count, rt.moved, rt.skip, rt.error);
                        mess.WarningLog(servece_owner, eventID);
                        mess.EventLog(rt.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                        DateTime stop = DateTime.Now;
                        servece_owner.ServicesToLog(eventID, String.Format("Операция принять состав на станцию АМКР."), start, stop, rt.result);
                    }
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ArrivalWagonsOfStation(id_outer_way={0}, wagons={1}, id_way_on={2}, head={3}, lead_time={4}, locomotive1={5}, locomotive2={6}, user={7})",
                    id_outer_way, wagons, id_way_on, head, lead_time, locomotive1, locomotive2, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
                return rt;// Возвращаем id=-1 , Ошибка
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
                if (wagon == null) return (int)errors_base.not_open_wir;
                // Получим текущее положение вагона
                WagonInternalMovement wim = wagon.GetLastMovement();
                if (wim == null) return (int)errors_base.not_open_wir;
                // Проверим вагон уже стоит ?
                if (wim.id_station == id_station && wim.id_way == id_way && wim.position == position) return 0; // Вагон стоит на станции на пути и в позиции, пропустить операцию
                string note = "Перенесён по состоянию парка";
                wagon.SetStationWagon_old(id_station, id_way, lead_time, position, note, user);
                // Установим и закроем операцию ручная расстановка -3              
                wagon.SetOpenOperation(8, lead_time.AddMinutes(-10), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonParkState(context={0}, id_station={1}, id_way={2}, position={3}, lead_time={4}, wagon={5}, user={6})",
                    context, id_station, id_way, position, lead_time, wagon, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
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
                            rt.SetMovedResult((int)errors_base.not_open_wir, wagon.num); // вагон не заходил на АМКР
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
                    rt.SetResult((int)errors_base.not_input_value);
                }
                // Проверка на ошибки и сохранение результата
                if (rt.error == 0)
                {
                    rt.SetResult(context.SaveChanges());
                }
                else
                {
                    rt.SetResult((int)errors_base.cancel_save_changes);
                }
                return rt;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("ApplyWagonsParkState(context={0}, id_station={1}, wagons_ps={2}, lead_time={3}, user={4})",
                    context, id_station, wagons_ps, lead_time, user), servece_owner, eventID);
                rt.SetResult((int)errors_base.global);
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
                res.SetResult((int)errors_base.global);
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
                WagonInternalOperation wio = wagon.GetLastOperation();
                if (wio == null) return (int)errors_base.not_wio_db;
                if (wio.id_operation == 9) return (int)errors_base.wagon_lock_operation; // Операция предявлен (заблокирована)
                string note = "Перенесен для предъявления";
                wagon.SetStationWagon_old(id_station, id_way_on, lead_time, position, note, user);
                // Установим и закроем операцию ручная расстановка -3              
                wagon.SetOpenOperation(8, lead_time.AddMinutes(-1), null, null, null, null, null, user).SetCloseOperation(lead_time, null, user);
                //context.Update(wagon); // Обновим контекст
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationTransferProvideWagon(context={0}, id_station={1}, id_way_on={2}, position={3}, lead_time={4}, wagon={5}, user={6})",
                    context, id_station, id_way_on, position, lead_time, wagon, user), servece_owner, eventID);
                return (int)errors_base.global;// Возвращаем id=-1 , Ошибка
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
                                res.SetResult((int)errors_base.cancel_save_changes);
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
                    res.SetResult((int)errors_base.not_dir_way_of_db); // Указаного пути нет!
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
                    res.SetResult((int)errors_base.not_dir_way_of_db); // Указаного пути нет!
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
                if (wio.id_operation < 8 || wio.id_operation > 9) return (int)errors_base.wagon_not_operation; // Операция не предъявить
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
                                //if (car.num == 51231488)
                                //{
                                //    string s = "";
                                //}
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

        #region ОПЕРАЦИИ ОБНОВЛЕНИЯ ДОКУМЕНТОВ ЭПД

        /// <summary>
        /// получить текущий документ на сданный на УЗ вагон
        /// </summary>
        /// <param name="car"></param>
        /// <param name="start_date"></param>
        /// <returns></returns>
        public UZ.UZ_DOC GetSendingEPD(OutgoingCars car, DateTime? start_date)
        {
            try
            {
                UZ.UZ_SMS uz_sms = new UZ.UZ_SMS(this.servece_owner);
                // Проверим вагон
                if (car == null) return null;
                if (String.IsNullOrWhiteSpace(car.num_doc))
                {
                    // документ не определен
                    UZ.UZ_DOC uz_doc = uz_sms.GetDocumentOfDB_NumShipper(car.num, new int[] { 7932 }, start_date);
                    return uz_doc;
                }
                else
                {
                    // документ определен обновим его
                    EFUZ_DOC_OUT ef_uzdoc = new EFUZ_DOC_OUT(new EFDbContext());
                    UZ_DOC_OUT uz_doc_old = ef_uzdoc.Get(car.num_doc);
                    UZ.UZ_DOC uz_doc_new = uz_sms.GetDocumentOfDB_NumDoc(car.num_doc);
                    if ((uz_doc_new != null && uz_doc_old != null && uz_doc_old.revision < uz_doc_new.revision) || (uz_doc_new != null && uz_doc_old == null))
                    {
                        return uz_doc_new;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSendingEPD(car={0}, start_date={1})",
                    car, start_date), servece_owner, eventID);
                return null;
            }
        }

        #region ДОКУМЕНТ Outgoing_UZ_Vagon_Pay
        /// <summary>
        /// Получить список платежек по вагону
        /// </summary>
        /// <param name="pays"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Vagon_Pay> CreateOutgoing_UZ_Vagon_Pay(List<UZ.PAY_V> pays)
        {
            try
            {
                List<Outgoing_UZ_Vagon_Pay> list_vag_pays = new List<Outgoing_UZ_Vagon_Pay>();

                // Пройдемся по платежкам
                foreach (UZ.PAY_V pay in pays.ToList())
                {
                    Outgoing_UZ_Vagon_Pay new_pay = new Outgoing_UZ_Vagon_Pay()
                    {
                        id = 0,
                        id_vagon = 0,
                        kod = pay.kod,
                        summa = (int)pay.summa,
                    };
                    list_vag_pays.Add(new_pay);
                }

                return list_vag_pays;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Vagon_Pay(pays={0})",
                    pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить пратежки по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="out_uz_vag"></param>
        /// <param name="pays"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon_Pay(ref EFDbContext context, Outgoing_UZ_Vagon out_uz_vag, List<UZ.PAY_V> pays, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Vagon_Pay ef_out_vag_pay = new EFOutgoing_UZ_Vagon_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Vagon_Pay> list_vag_pays = CreateOutgoing_UZ_Vagon_Pay(pays);
                result.count = list_vag_pays.Count();

                if (out_uz_vag.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Vagon_Pay vag_pay in list_vag_pays)
                    {
                        out_uz_vag.Outgoing_UZ_Vagon_Pay.Add(vag_pay);
                        result.AddInsert();
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Vagon_Pay> old_list_vag_pay = out_uz_vag.Outgoing_UZ_Vagon_Pay.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Vagon_Pay vag_pay in list_vag_pays)
                    {
                        Outgoing_UZ_Vagon_Pay exist_doc_pay = ef_out_vag_pay.Context.Where(p => p.id_vagon == out_uz_vag.id && p.kod == vag_pay.kod).FirstOrDefault();
                        if (exist_doc_pay != null)
                        {
                            // есть - обновить
                            exist_doc_pay.summa = vag_pay.summa;
                            ef_out_vag_pay.Update(exist_doc_pay);
                            old_list_vag_pay.Remove(exist_doc_pay);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            out_uz_vag.Outgoing_UZ_Vagon_Pay.Add(vag_pay);
                            result.AddInsert();
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_vag_pay.Delete(old_list_vag_pay.Select(p => p.id));
                    result.delete = old_list_vag_pay.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon_Pay(context={0}, out_uz_vag={1}, pays={2}, user={3})",
                    context, out_uz_vag, pays, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Vagon_Acts
        /// <summary>
        /// Получить список актов по вагонам из ЭПД
        /// </summary>
        /// <param name="acts"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Vagon_Acts> CreateOutgoing_UZ_Vagon_Acts(List<UZ.ACTS> acts)
        {
            try
            {
                List<Outgoing_UZ_Vagon_Acts> list_vag_acts = new List<Outgoing_UZ_Vagon_Acts>();

                // Пройдемся по актам
                foreach (UZ.ACTS act in acts.ToList())
                {
                    // Проверим документ на вагон?
                    if (!String.IsNullOrWhiteSpace(act.vagon_nom))
                    {
                        Outgoing_UZ_Vagon_Acts new_act = new Outgoing_UZ_Vagon_Acts()
                        {
                            id = 0,
                            id_vagon = 0,
                            date_akt = act.date_akt,
                            date_dved = act.date_dved,
                            nom_akt = act.nom_akt,
                            nom_dved = act.nom_dved,
                            prichina_akt = act.prichina_akt,
                            stn_akt = act.stn_akt != null ? (int?)int.Parse(act.stn_akt) : null,
                            stn_name_akt = act.stn_name_akt,
                            type = act.type != null ? (int?)int.Parse(act.type) : null,
                            vagon_nom = act.vagon_nom != null ? (int?)int.Parse(act.vagon_nom) : null,
                        };

                        list_vag_acts.Add(new_act);
                    }
                }
                return list_vag_acts;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Vagon_Acts(acts={0})",
                    acts), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить Акты по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="out_uz_vag"></param>
        /// <param name="acts"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon_Acts(ref EFDbContext context, Outgoing_UZ_Vagon out_uz_vag, List<UZ.ACTS> acts, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Vagon_Acts ef_out_vag_acts = new EFOutgoing_UZ_Vagon_Acts(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Vagon_Acts> list_vag_acts = CreateOutgoing_UZ_Vagon_Acts(acts);
                result.count = list_vag_acts.Count();

                if (out_uz_vag.id == 0)
                {
                    // Документ только создали, добавим акты
                    foreach (Outgoing_UZ_Vagon_Acts vag_act in list_vag_acts)
                    {
                        // Проверим Акт по текущему вагону
                        if (vag_act.vagon_nom == out_uz_vag.num)
                        {
                            out_uz_vag.Outgoing_UZ_Vagon_Acts.Add(vag_act);
                            result.AddInsert();
                        };
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Vagon_Acts> old_list_vag_acts = out_uz_vag.Outgoing_UZ_Vagon_Acts.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Vagon_Acts vag_act in list_vag_acts)
                    {
                        Outgoing_UZ_Vagon_Acts exist_vag_act = ef_out_vag_acts.Context.Where(a => a.id_vagon == out_uz_vag.id && a.vagon_nom == vag_act.vagon_nom && a.nom_akt == vag_act.nom_akt).FirstOrDefault();
                        if (exist_vag_act != null)
                        {
                            // есть - обновить
                            exist_vag_act.date_akt = vag_act.date_akt;
                            exist_vag_act.date_dved = vag_act.date_dved;
                            exist_vag_act.nom_akt = vag_act.nom_akt;
                            exist_vag_act.nom_dved = vag_act.nom_dved;
                            exist_vag_act.prichina_akt = vag_act.prichina_akt;
                            exist_vag_act.stn_akt = vag_act.stn_akt;
                            exist_vag_act.stn_name_akt = vag_act.stn_name_akt;
                            exist_vag_act.type = vag_act.type;

                            ef_out_vag_acts.Update(exist_vag_act);
                            old_list_vag_acts.Remove(exist_vag_act);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            // Проверим Акт по текущему вагону
                            if (vag_act.vagon_nom == out_uz_vag.num)
                            {
                                out_uz_vag.Outgoing_UZ_Vagon_Acts.Add(vag_act);
                                result.AddInsert();
                            };
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_vag_acts.Delete(old_list_vag_acts.Select(p => p.id));
                    result.delete = old_list_vag_acts.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon_Acts(context={0}, out_uz_vag={1}, acts={2}, user={3})",
                    context, out_uz_vag, acts, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Cont_Pay
        /// <summary>
        /// Создать список платежек по контейнеру из данных ЭПД
        /// </summary>
        /// <param name="pays"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Cont_Pay> CreateOutgoing_UZ_Cont_Pay(List<UZ.PAY_K> pays)
        {
            try
            {
                List<Outgoing_UZ_Cont_Pay> list_cont_pays = new List<Outgoing_UZ_Cont_Pay>();

                // Пройдемся по платежкам
                foreach (UZ.PAY_K pay in pays.ToList())
                {
                    Outgoing_UZ_Cont_Pay new_pay = new Outgoing_UZ_Cont_Pay()
                    {
                        id = 0,
                        id_cont = 0,
                        kod = pay.kod,
                        summa = (int)pay.summa,
                    };
                    list_cont_pays.Add(new_pay);
                }

                return list_cont_pays;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Cont_Pay(pays={0})",
                    pays), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить платежки по контейнеру
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cont"></param>
        /// <param name="pays"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Cont_Pay(ref EFDbContext context, Outgoing_UZ_Vagon_Cont cont, List<UZ.PAY_K> pays, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Cont_Pay ef_out_count_pay = new EFOutgoing_UZ_Cont_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Cont_Pay> list_cont_pays = CreateOutgoing_UZ_Cont_Pay(pays);
                result.count = list_cont_pays.Count();

                if (cont.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Cont_Pay cont_pay in list_cont_pays)
                    {
                        cont.Outgoing_UZ_Cont_Pay.Add(cont_pay);
                        result.AddInsert();
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Cont_Pay> old_list_cont_pay = cont.Outgoing_UZ_Cont_Pay.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Cont_Pay cont_pay in list_cont_pays)
                    {
                        Outgoing_UZ_Cont_Pay exist_cont_pay = ef_out_count_pay.Context.Where(d => d.id_cont == cont.id && d.kod == cont_pay.kod).FirstOrDefault();
                        if (exist_cont_pay != null)
                        {
                            // есть - обновить
                            exist_cont_pay.summa = cont_pay.summa;
                            ef_out_count_pay.Update(exist_cont_pay);
                            old_list_cont_pay.Remove(exist_cont_pay);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            cont.Outgoing_UZ_Cont_Pay.Add(cont_pay);
                            result.AddInsert();
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_count_pay.Delete(old_list_cont_pay.Select(p => p.id));
                    result.delete = old_list_cont_pay.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Cont_Pay(context={0}, cont={1}, pays={2}, user={3})",
                    context, cont, pays, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Vagon_Cont
        /// <summary>
        /// Создать список справочных строк по контейнерам из данных документа
        /// </summary>
        /// <param name="context"></param>
        /// <param name="conts"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Vagon_Cont> CreateOutgoing_UZ_Vagon_Cont(ref EFDbContext context, List<UZ.CONT> conts, string user)
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

                IDSDirectory ids_dir = new IDSDirectory(this.servece_owner, context);
                List<Outgoing_UZ_Vagon_Cont> list_cont = new List<Outgoing_UZ_Vagon_Cont>();

                foreach (UZ.CONT cont in conts)
                {
                    UZ.COLLECT_K collectk = cont.collect_k;
                    List<UZ.ZPU_K> zpu = cont.zpu_k.ToList();

                    int? code_gng = collectk.kod_gng != null ? (int?)int.Parse(collectk.kod_gng) : null;
                    string name_gng = collectk.name_gng;
                    Directory_CargoGNG cargo_gng = code_gng != null ? ids_dir.GetDirectory_CargoGNG((int)code_gng, name_gng, true, user) : null;

                    int? code_etsng = collectk.kod_etsng != null ? (int?)int.Parse(collectk.kod_etsng) : null;
                    string name_etsng = collectk.name_etsng;
                    Directory_CargoETSNG cargo_etsng = code_etsng != null ? ids_dir.GetDirectory_CargoETSNG((int)code_etsng, name_etsng, true, user) : null;
                    // Проверим привязку строки груза ЕТСНГ к справочнику грузов, если нет добавим 
                    Directory_Cargo cargo = ids_dir.GetDirectory_Cargo(cargo_etsng, true, user);
                    // Создадим контейнер
                    Outgoing_UZ_Vagon_Cont new_cont = new Outgoing_UZ_Vagon_Cont()
                    {
                        id = 0,
                        id_vagon = 0,
                        nom_cont = cont.nom_cont,
                        kod_tiporazmer = cont.kod_tiporazmer,
                        gruzp = cont.gruzp,
                        ves_tary_arc = cont.ves_tary_arc,
                        kol_pac = collectk != null ? collectk.kol_pac : null,
                        pac = collectk != null ? collectk.pac : null,
                        vesg = collectk != null ? collectk.vesg : null,
                        nom_zpu = zpu != null && zpu.Count() > 0 ? zpu[0].nom_zpu : null,
                    };
                    new_cont.Directory_CargoGNG = cargo_gng;
                    new_cont.Directory_Cargo = cargo;
                    list_cont.Add(new_cont);
                }
                return list_cont;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Vagon_Cont(context={0}, conts={1}, user={2})",
                    context, conts, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновим информацию по контенерам на вагоны
        /// </summary>
        /// <param name="context"></param>
        /// <param name="out_uz_vag"></param>
        /// <param name="conts"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon_Cont(ref EFDbContext context, Outgoing_UZ_Vagon out_uz_vag, List<UZ.CONT> conts, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Vagon_Cont ef_out_vag_cont = new EFOutgoing_UZ_Vagon_Cont(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Vagon_Cont> list_out_vag_cont = CreateOutgoing_UZ_Vagon_Cont(ref context, conts, user);
                result.count = list_out_vag_cont.Count();
                // вагон существует или создан вновь
                if (out_uz_vag.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Vagon_Cont vag_cont in list_out_vag_cont)
                    {
                        List<UZ.PAY_K> paysk = conts.Find(c => c.nom_cont == vag_cont.nom_cont).pay_k.ToList();
                        ResultUpdateDB res_vag_cont_pay = UpdateOutgoing_UZ_Cont_Pay(ref context, vag_cont, paysk, user);
                        if (res_vag_cont_pay.result >= 0)
                        {
                            out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont);
                            result.AddInsert();
                        }
                        else
                        {
                            result.SetResult((int)errors_base.error_update_out_cont_pay); // Ошибка обновления документов (контейнера на вагон)
                        }
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Vagon_Cont> old_list_out_vag_cont = out_uz_vag.Outgoing_UZ_Vagon_Cont.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Vagon_Cont vag_cont in list_out_vag_cont)
                    {
                        Outgoing_UZ_Vagon_Cont exist_out_vag_cont = ef_out_vag_cont.Context.Where(c => c.id_vagon == out_uz_vag.id && c.nom_cont == vag_cont.nom_cont).FirstOrDefault();
                        if (exist_out_vag_cont != null)
                        {
                            // есть - обновить
                            List<UZ.PAY_K> paysk = conts.Find(c => c.nom_cont == vag_cont.nom_cont).pay_k.ToList();
                            ResultUpdateDB res_vag_cont_pay = UpdateOutgoing_UZ_Cont_Pay(ref context, vag_cont, paysk, user);
                            if (res_vag_cont_pay.result >= 0)
                            {
                                exist_out_vag_cont.kod_tiporazmer = vag_cont.kod_tiporazmer;
                                exist_out_vag_cont.gruzp = vag_cont.gruzp;
                                exist_out_vag_cont.ves_tary_arc = vag_cont.ves_tary_arc;
                                exist_out_vag_cont.kol_pac = vag_cont.kol_pac;
                                exist_out_vag_cont.pac = vag_cont.pac;
                                exist_out_vag_cont.vesg = vag_cont.vesg;
                                exist_out_vag_cont.nom_zpu = vag_cont.nom_zpu;
                                ef_out_vag_cont.Update(exist_out_vag_cont);
                                old_list_out_vag_cont.Remove(exist_out_vag_cont);
                                result.AddUpdate();
                            }
                            else
                            {
                                result.SetResult((int)errors_base.error_update_out_cont_pay); // Ошибка обновления документов (контейнера на вагон)
                            }
                        }
                        else
                        {
                            // нет - добавить
                            List<UZ.PAY_K> paysk = conts.Find(c => c.nom_cont == vag_cont.nom_cont).pay_k.ToList();
                            ResultUpdateDB res_vag_cont_pay = UpdateOutgoing_UZ_Cont_Pay(ref context, vag_cont, paysk, user);
                            if (res_vag_cont_pay.result >= 0)
                            {
                                out_uz_vag.Outgoing_UZ_Vagon_Cont.Add(vag_cont);
                                result.AddInsert();
                            }
                            else
                            {
                                result.SetResult((int)errors_base.error_update_out_cont_pay); // Ошибка обновления документов (контейнера на вагон)
                            }
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_vag_cont.Delete(old_list_out_vag_cont.Select(p => p.id));
                    result.delete = old_list_out_vag_cont.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon_Cont(context={0}, out_uz_vag={1}, conts={2}, user={3})",
                    context, out_uz_vag, conts, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Vagon
        /// <summary>
        /// Обнавить документ по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="document"></param>
        /// <param name="epd_car"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagon(ref EFDbContext context, Outgoing_UZ_Document document, EPDOutgoingCar epd_car, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                EFOutgoing_UZ_Vagon ef_out_uz_vag = new EFOutgoing_UZ_Vagon(context);
                IDSDirectory ids_dir = new IDSDirectory(this.servece_owner, context);

                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (epd_car != null && epd_car.epd != null)
                {
                    OutgoingCars out_car = ef_out_car.Context.Where(c => c.id == epd_car.id_outgoing_car).FirstOrDefault();
                    if (out_car != null)
                    {
                        Outgoing_UZ_Vagon out_uz_vag = ef_out_uz_vag.Context.Where(v => v.id_car == epd_car.id_outgoing_car).FirstOrDefault();
                        if (out_uz_vag != null)
                        {
                            // получим ЭПД на вагон
                            UZ.VAGON vagon = epd_car.epd.otpr.vagon.ToList().Find(v => v.nomer == out_car.num.ToString());
                            List<UZ.CONT> conts = epd_car.epd.otpr.cont.ToList().Where(c => c.nom_vag == out_car.num).ToList();
                            List<UZ.ACTS> acts = epd_car.epd.otpr.acts.ToList();

                            if (vagon != null)
                            {
                                // Определим коллекции по документу на вагон и контейнер
                                UZ.COLLECT_V collect_v = vagon.collect_v != null && vagon.collect_v.Count() > 0 ? vagon.collect_v[0] : null;
                                UZ.COLLECT_K collect_k = conts != null && conts.Count() > 0 ? conts[0].collect_k : null;
                                List<UZ.PAY_V> pays_v = vagon.pay_v.ToList();
                                // 
                                int? code = null;
                                string name = null;
                                int? vesg = null;
                                // Проверим по агонам
                                if (collect_v != null)
                                {
                                    code = collect_v.kod_gng != null ? (int?)int.Parse(collect_v.kod_gng) : null;
                                    name = collect_v.name_gng;
                                    vesg = collect_v.vesg;
                                }
                                // Проверим на контейнер
                                if (collect_k != null)
                                {
                                    code = collect_k.kod_gng != null ? (int?)int.Parse(collect_k.kod_gng) : null;
                                    name = collect_k.name_gng;
                                    vesg = collect_k.vesg;
                                }

                                // Если неопределен код гнг, добавить
                                if (out_uz_vag.id_cargo_gng != null && code != null)
                                {
                                    Directory_CargoGNG cargo_gng = code != null ? ids_dir.GetDirectory_CargoGNG((int)code, name, true, user) : null;
                                    out_uz_vag.Directory_CargoGNG = cargo_gng;
                                }
                                // 
                                out_uz_vag.id_document = document.id > 0 ? (long?)document.id : null;
                                out_uz_vag.gruzp = vagon.gruzp;
                                out_uz_vag.u_tara = vagon.u_tara;
                                out_uz_vag.ves_tary_arc = vagon.ves_tary_arc;
                                out_uz_vag.vesg = vesg;
                                out_uz_vag.change = DateTime.Now;
                                out_uz_vag.change_user = user;
                                // Добавим контейнера если есть
                                ResultUpdateDB res_vag_cont = UpdateOutgoing_UZ_Vagon_Cont(ref context, out_uz_vag, conts, user);
                                if (res_vag_cont.result >= 0)
                                {
                                    // Добавим Акты
                                    ResultUpdateDB res_vag_acts = UpdateOutgoing_UZ_Vagon_Acts(ref context, out_uz_vag, acts, user);
                                    if (res_vag_acts.result >= 0)
                                    {
                                        // добавим платежки
                                        ResultUpdateDB res_vag_pay = UpdateOutgoing_UZ_Vagon_Pay(ref context, out_uz_vag, pays_v, user);
                                        if (res_vag_pay.result >= 0)
                                        {
                                            ef_out_uz_vag.Update(out_uz_vag);
                                            if (document.Outgoing_UZ_Vagon != null && document.Outgoing_UZ_Vagon.Count() > 0)
                                            {
                                                Outgoing_UZ_Vagon vag_exist = document.Outgoing_UZ_Vagon.ToList().Find(v => v.num == out_uz_vag.num);
                                                if (vag_exist != null)
                                                {
                                                    // Удалить
                                                    document.Outgoing_UZ_Vagon.Remove(vag_exist);
                                                }

                                            }
                                            document.Outgoing_UZ_Vagon.Add(out_uz_vag);
                                            //document.Outgoing_UZ_Vagon   out_uz_vag.
                                            result.SetResult(res_vag_cont.result + res_vag_acts.result + res_vag_pay.result);
                                        }
                                        else
                                        {
                                            result.SetResult((int)errors_base.error_update_out_vag_pay); // Ошибка обновления документов (платежки на вагон)
                                        }
                                    }
                                    else
                                    {
                                        result.SetResult((int)errors_base.error_update_out_vag_acts); // Ошибка обновления документов (акты на вагон)                                        
                                    }
                                }
                                else
                                {
                                    result.SetResult((int)errors_base.error_update_out_vag_cont); // Ошибка обновления документов (контейнера на вагон)  
                                }
                            }
                            else
                            {
                                result.SetResult((int)errors_base.not_vagon_epd_document); // ошибка указанного вагона нет в документе
                            }
                        }
                        else
                        {
                            result.SetResult((int)errors_base.not_out_uz_vag_db); // документ на ваго не найден
                        }
                    }
                    else
                    {
                        result.SetResult((int)errors_base.not_outgoing_cars_db); // в базе нет данного вагона на отправку
                    }
                }
                else
                {
                    result.SetResult((int)errors_base.not_epd_document); // нет ЭПД на вагон
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagon(context={0}, document={1}, epd_car={2}, user={3})",
                    context, document, epd_car, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);

            }
            return result;
        }
        /// <summary>
        /// Обновить информацию по группам вагонов
        /// </summary>
        /// <param name="context"></param>
        /// <param name="document"></param>
        /// <param name="list_cars"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Vagons(ref EFDbContext context, Outgoing_UZ_Document document, List<EPDOutgoingCar> list_cars, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
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
                result.count = list_cars.Count();
                foreach (EPDOutgoingCar epd_vagon in list_cars)
                {
                    ResultUpdateDB res_vagon = UpdateOutgoing_UZ_Vagon(ref context, document, epd_vagon, user);
                    if (res_vagon.result >= 0)
                    {
                        result.SetUpdateResult(res_vagon.result, epd_vagon.id_outgoing_car);
                    }
                    else
                    {
                        result.SetResult((int)errors_base.error_update_out_vag); // Ошибка обновления документов (на вагон)
                    }
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Vagons(context={0}, document={1}, list_cars={2}, user={3})",
                    context, document, list_cars, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);

            }
            return result;
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Document_Pay
        /// <summary>
        /// Создать список Outgoing_UZ_Document_Pay
        /// </summary>
        /// <param name="pls"></param>
        /// <returns></returns>
        public List<Outgoing_UZ_Document_Pay> CreateOutgoing_UZ_Document_Pay(List<UZ.PL> pls)
        {
            try
            {
                List<Outgoing_UZ_Document_Pay> list_doc_pays = new List<Outgoing_UZ_Document_Pay>();

                foreach (UZ.PL pl in pls)
                {
                    // Пройдемся по платежкам
                    foreach (UZ.PAY pay in pl.pay.ToList())
                    {
                        Outgoing_UZ_Document_Pay new_pay = new Outgoing_UZ_Document_Pay()
                        {
                            id = 0,
                            id_document = 0,
                            code_payer = int.Parse(pl.kod_plat),
                            kod = pay.kod,
                            summa = (int)pay.summa,
                            type_payer = int.Parse(pl.type),
                        };
                        list_doc_pays.Add(new_pay);
                    }
                }
                return list_doc_pays;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateOutgoing_UZ_Document_Pay(pls={0})",
                    pls), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Добавить или обновить платежки по документу
        /// </summary>
        /// <param name="context"></param>
        /// <param name="document"></param>
        /// <param name="pls"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateDB UpdateOutgoing_UZ_Document_Pay(ref EFDbContext context, Outgoing_UZ_Document document, List<UZ.PL> pls, string user)
        {
            ResultUpdateDB result = new ResultUpdateDB();
            try
            {
                EFOutgoing_UZ_Document_Pay ef_out_doc_pay = new EFOutgoing_UZ_Document_Pay(context);
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Получим Outgoing_UZ_Document_Pay по данным документа
                List<Outgoing_UZ_Document_Pay> list_doc_pays = CreateOutgoing_UZ_Document_Pay(pls);
                result.count = list_doc_pays.Count();

                if (document.id == 0)
                {
                    // Документ только создали, добавим pay
                    foreach (Outgoing_UZ_Document_Pay doc_pay in list_doc_pays)
                    {
                        document.Outgoing_UZ_Document_Pay.Add(doc_pay);
                        result.AddInsert();
                    }
                }
                else
                {
                    // Список существующих платежек
                    List<Outgoing_UZ_Document_Pay> old_list_doc_pay = document.Outgoing_UZ_Document_Pay.ToList();
                    // Сравнить
                    foreach (Outgoing_UZ_Document_Pay doc_pay in list_doc_pays)
                    {
                        Outgoing_UZ_Document_Pay exist_doc_pay = ef_out_doc_pay.Context.Where(d => d.code_payer == doc_pay.code_payer && d.type_payer == doc_pay.type_payer && d.kod == doc_pay.kod).FirstOrDefault();
                        if (exist_doc_pay != null)
                        {
                            // есть - обновить
                            exist_doc_pay.summa = doc_pay.summa;
                            ef_out_doc_pay.Update(exist_doc_pay);
                            old_list_doc_pay.Remove(exist_doc_pay);
                            result.AddUpdate();
                        }
                        else
                        {
                            // нет - добавить
                            document.Outgoing_UZ_Document_Pay.Add(doc_pay);
                            result.AddInsert();
                        }
                    }
                    // Удалим исключенные платежки
                    ef_out_doc_pay.Delete(old_list_doc_pay.Select(p => p.id));
                    result.delete = old_list_doc_pay.Select(p => p.id).Count();
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Document_Pay(context={0})",
                    context), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;
            }
        }
        #endregion

        #region ДОКУМЕНТ Outgoing_UZ_Document
        /// <summary>
        /// Обновить документ на группу вагонов + обновить вагоны...
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_doc_uz"></param>
        /// <param name="list_cars"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateOutgoing_UZ_Document(ref EFDbContext context, string id_doc_uz, List<EPDOutgoingCar> list_cars, string user)
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
                IDSDirectory ids_dir = new IDSDirectory(this.servece_owner);
                EFOutgoing_UZ_Document ef_out_uz_doc = new EFOutgoing_UZ_Document(context);

                if (list_cars == null || list_cars.Count() == 0) return (int)errors_base.not_input_list_wagons;
                // Получим и обрботаем документы
                UZ.UZ_DOC epd = list_cars[0].epd;
                UZ.OTPR otpr = epd.otpr;
                // грузооотправители и грузополучатели
                List<UZ.CLIENT> clients = epd.otpr.client.ToList();
                UZ.CLIENT client_from = clients != null && clients.Count() > 0 ? clients[0] : null;
                UZ.CLIENT client_on = clients != null && clients.Count() > 1 ? clients[1] : null;
                if (client_on != null && client_on.kod != null)
                {
                    Directory_Shipper shipper = ids_dir.GetDirectory_Shipper(int.Parse(client_on.kod), client_on.name, true, user);
                }
                // маршруты
                List<UZ.ROUTE> route = epd.otpr.route.ToList();
                // Определим внешнюю станцию
                if (route != null && route.Count() > 0 && route[0].stn_to != null)
                {
                    Directory_ExternalStation station = ids_dir.GetDirectory_ExternalStation(int.Parse(route[0].stn_to), route[0].name_to, true, user);
                }
                List<UZ.JOINT> joints = route != null && route.Count() > 0 ? route[0].joint.ToList() : null;
                // Получим погран переход
                UZ.JOINT joint = joints.Find(j => j.admin == 22);
                if (joint != null && joint.stn != null)
                {
                    Directory_BorderCheckpoint border_checkpoint = ids_dir.GetDirectory_BorderCheckpoint(int.Parse(joint.stn), joint.stn_name, true, user);
                }
                // Платники
                List<UZ.PL> pls = epd.otpr.pl.ToList();
                UZ.PL pl_from = pls != null && pls.Count() > 0 ? pls.Find(p => p.type == "0") : null;
                if (pl_from != null)
                {
                    // Проверим и создадим в базе платника по отправлению
                    Directory_PayerSender payer = ids_dir.GetDirectory_PayerSender(pl_from.kod_plat, pl_from.name_plat, true, user);
                    List<UZ.PAY> pays_from = pl_from.pay.ToList();
                }
                // Штемпель
                List<UZ.SHTEMPEL> shtempels = epd.otpr.shtempel.ToList();
                // 
                UZ.TEXT text = epd.otpr.text;
                // Вагоны
                List<UZ.VAGON> vagons = epd.otpr.vagon.ToList();
                // Проверим документ создан
                Outgoing_UZ_Document uz_doc = ef_out_uz_doc.Context.Where(d => d.id_doc_uz == id_doc_uz).FirstOrDefault();
                if (uz_doc == null)
                {
                    // Документ не создан. Создать документ
                    uz_doc = new Outgoing_UZ_Document()
                    {
                        id = 0,
                        id_doc_uz = id_doc_uz,
                        nom_doc = otpr.nom_doc,
                        code_stn_from = route != null && route.Count() > 0 && route[0].stn_from != null ? (int?)int.Parse(route[0].stn_from) : null,
                        code_stn_to = route != null && route.Count() > 0 && route[0].stn_to != null ? (int?)int.Parse(route[0].stn_to) : null,
                        country_nazn = otpr != null ? otpr.country_nazn : null,
                        code_border_checkpoint = joint != null && joint.stn != null ? (int?)int.Parse(joint.stn) : null,
                        cross_date = joint != null && joint.cross_time != null ? (DateTime?)joint.cross_time : null,
                        code_shipper = client_from != null && client_from.kod != null ? (int?)int.Parse(client_from.kod) : null,
                        code_consignee = client_on != null && client_on.kod != null ? (int?)int.Parse(client_on.kod) : null,
                        vid = otpr != null ? otpr.vid : null,
                        code_payer = pl_from != null ? pl_from.kod_plat : null,
                        distance_way = otpr != null ? otpr.distance_way : null,
                        osum = otpr != null ? otpr.osum : null,
                        date_sozdan = otpr != null ? otpr.date_sozdan : null,
                        date_otpr = otpr != null ? otpr.date_otpr : null,
                        date_pr = otpr != null ? otpr.date_pr : null,
                        date_grpol = otpr != null ? otpr.date_grpol : null,
                        date_vid = otpr != null ? otpr.date_vid : null,
                        info_sht = null,
                        name_gr = text != null ? text.name_gr : null,
                        note = null,
                        create = DateTime.Now,
                        create_user = user,
                    };
                }
                else
                {
                    // Документ найден, обновить
                    uz_doc.code_stn_from = route != null && route.Count() > 0 && route[0].stn_from != null ? (int?)int.Parse(route[0].stn_from) : null;
                    uz_doc.code_stn_to = route != null && route.Count() > 0 && route[0].stn_to != null ? (int?)int.Parse(route[0].stn_to) : null;
                    uz_doc.country_nazn = otpr != null ? otpr.country_nazn : null;
                    uz_doc.code_border_checkpoint = joint != null && joint.stn != null ? (int?)int.Parse(joint.stn) : null;
                    uz_doc.cross_date = joint != null && joint.cross_time != null ? (DateTime?)joint.cross_time : null;
                    uz_doc.code_shipper = client_from != null && client_from.kod != null ? (int?)int.Parse(client_from.kod) : null;
                    uz_doc.code_consignee = client_on != null && client_on.kod != null ? (int?)int.Parse(client_on.kod) : null;
                    uz_doc.vid = otpr != null ? otpr.vid : null;
                    uz_doc.code_payer = pl_from != null ? pl_from.kod_plat : null;
                    uz_doc.distance_way = otpr != null ? otpr.distance_way : null;
                    uz_doc.osum = otpr != null ? otpr.osum : null;
                    uz_doc.date_sozdan = otpr != null ? otpr.date_sozdan : null;
                    uz_doc.date_otpr = otpr != null ? otpr.date_otpr : null;
                    uz_doc.date_pr = otpr != null ? otpr.date_pr : null;
                    uz_doc.date_grpol = otpr != null ? otpr.date_grpol : null;
                    uz_doc.date_vid = otpr != null ? otpr.date_vid : null;
                    uz_doc.info_sht = null;
                    uz_doc.name_gr = text != null ? text.name_gr : null;
                    uz_doc.note = null;
                    uz_doc.change = DateTime.Now;
                    uz_doc.change_user = user;
                }
                // Добаим грузополучателя
                //uz_doc.Directory_Shipper = shipper;
                // добавить или обновить к документу платежки
                ResultUpdateDB res_doc_pay = UpdateOutgoing_UZ_Document_Pay(ref context, uz_doc, pls, user);
                if (res_doc_pay.result >= 0)
                {
                    ResultUpdateDB res_doc_vagons = UpdateOutgoing_UZ_Vagons(ref context, uz_doc, list_cars, user);
                    if (res_doc_vagons.result >= 0)
                    {
                        // Без ошибок, добавим вагоны

                        if (uz_doc.id > 0)
                        {
                            ef_out_uz_doc.Update(uz_doc);
                        }
                        else
                        {
                            ef_out_uz_doc.Add(uz_doc);
                        }
                        // Добавить документ ЭПД в базу данных
                        EFUZ_DOC_OUT ef_uzdoc = new EFUZ_DOC_OUT(context);
                        UZ_DOC_OUT doc = ef_uzdoc.Get(epd.id_doc);
                        if (doc == null)
                        {
                            string code_from = epd.sender_code != null ? epd.sender_code : "0";
                            doc = new UZ_DOC_OUT()
                            {
                                num_doc = epd.id_doc,
                                revision = epd.revision,
                                num_uz = epd.otpr != null ? epd.otpr.nom_doc : null,
                                status = (int)epd.status,
                                code_from = code_from,
                                code_on = epd.recipient_code,
                                dt = epd.dt,
                                xml_doc = epd.xml,
                            };
                            ef_uzdoc.Add(doc);
                        }
                        else
                        {
                            // Ревизия документа выше чем ревизия сохраненного документа
                            if (doc.revision < epd.revision)
                            {
                                string code_from = epd.sender_code != null ? epd.sender_code : "0";
                                doc.num_doc = epd.id_doc;
                                doc.revision = epd.revision;
                                doc.num_uz = epd.otpr != null ? epd.otpr.nom_doc : null;
                                doc.status = (int)epd.status;
                                doc.code_from = code_from;
                                doc.code_on = epd.recipient_code;
                                doc.dt = epd.dt;
                                doc.xml_doc = epd.xml;
                                ef_uzdoc.Update(doc);
                            }
                        }
                        // Обновим документ отправки
                        EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                        foreach (EPDOutgoingCar epd_car in list_cars)
                        {
                            // Получим вагон в отправлении
                            OutgoingCars out_car = ef_out_car.Context.Where(c => c.id == epd_car.id_outgoing_car).FirstOrDefault();
                            if (out_car != null)
                            {
                                out_car.num_doc = doc.num_doc;
                                out_car.UZ_DOC_OUT = doc;
                                ef_out_car.Update(out_car);
                            }
                            else
                            {
                                return (int)errors_base.not_outgoing_cars_db; // Ошибка обновления вагона по отправке
                            }
                        }
                        return 1;
                    }
                    else
                    {
                        // Ошибка добавления вагонов
                        return (int)errors_base.error_update_out_vag; // Ошибка обновления документов (вагоны к документу)
                    }
                }
                else
                {
                    return (int)errors_base.error_update_out_doc_pay; // Ошибка обновления документов (платежка на вагон)
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateOutgoing_UZ_Document(context={0}, id_doc_uz={1}, list_cars={2}, user={3})",
                    context, id_doc_uz, list_cars, user), servece_owner, eventID);
                return (int)errors_base.global;
            }
        }
        #endregion

        /// <summary>
        /// Операция обновить документы ЭПД по составу
        /// </summary>
        /// <param name="id_outgoing_sostav"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultID OperationUpdateEPDSendingSostav(long id_outgoing_sostav, string user)
        {
            OperationResultID rt = new OperationResultID();
            try
            {
                EFDbContext context = new EFDbContext();
                EFOutgoingSostav ef_out_sostav = new EFOutgoingSostav(context);
                EFOutgoingCars ef_out_car = new EFOutgoingCars(context);
                OutgoingSostav sostav = ef_out_sostav.Context.Where(s => s.id == id_outgoing_sostav).FirstOrDefault();
                if (sostav != null)
                {
                    // Состав определен (сдан или отправлен)
                    if (sostav.status >= 2 && sostav.status <= 3)
                    {
                        List<OutgoingCars> list_out_car = sostav.OutgoingCars.Where(c => c.outgoing != null).ToList();
                        if (list_out_car != null && list_out_car.Count() > 0)
                        {
                            List<EPDOutgoingCar> list_update_epd = new List<EPDOutgoingCar>(); // Список для обновления
                            List<int> list_num = new List<int>();
                            // Обновим документы 
                            foreach (OutgoingCars car in list_out_car)
                            {
                                UZ.UZ_DOC new_uz_doc = GetSendingEPD(car, sostav.date_readiness_amkr);
                                if (new_uz_doc != null)
                                {
                                    EPDOutgoingCar new_update_epd = new EPDOutgoingCar()
                                    {
                                        id_outgoing_car = car.id,
                                        epd = new_uz_doc
                                    };
                                    list_update_epd.Add(new_update_epd); // добавим  в список обновления
                                }
                                else
                                {
                                    list_num.Add(car.num);
                                }

                            }
                            // Сгруппируем документы по id_doc уз
                            List<IGrouping<string, EPDOutgoingCar>> group_outgoing_car = list_update_epd.ToList().GroupBy(d => d.epd.id_doc).ToList();
                            // Пройдемся по документам
                            foreach (IGrouping<string, EPDOutgoingCar> out_cars in group_outgoing_car)
                            {
                                List<EPDOutgoingCar> list_cars = out_cars.ToList();
                                // Выполним обновление всего пула документов
                                int result = UpdateOutgoing_UZ_Document(ref context, out_cars.Key, list_cars, user);
                                // Запомним результат
                                foreach (EPDOutgoingCar car in list_cars)
                                {
                                    rt.SetResultOperation(result, car.id_outgoing_car);
                                }
                            }
                            // Проверка на ошибку
                            if (rt.error == 0)
                            {
                                //sostav.change = DateTime.Now;
                                //sostav.change_user = user;
                                //ef_out_sostav.Update(sostav);
                                if (rt.listResult.Count() > 0)
                                {
                                    rt.SetResult(context.SaveChanges());
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
                e.ExceptionMethodLog(String.Format("OperationUpdateEPDSendingSostav(id_outgoing_sostav={0}, user={1})",
                    id_outgoing_sostav, user), servece_owner, eventID);
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

        #region Отчеты "Операции"
        /// <summary>
        /// Получить список вагонов с опрецией отправка за указаный период времени
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        public List<wagon_operation_send> GetWagonsOperationOfSend(DateTime start, DateTime stop)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                context.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter dstart = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter dstop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                System.Data.SqlClient.SqlParameter id_operation = new System.Data.SqlClient.SqlParameter("@id_operation", 5);
                string sql = "select * from [IDS].[get_view_wagons_of_operation](@start,@stop,@id_operation)";
                List<wagon_operation_send> list = context.Database.SqlQuery<wagon_operation_send>(sql, dstart, dstop, id_operation).ToList();
                context.Database.CommandTimeout = null;
                return list;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsOperationOfSend(start={0}, stop={1})",
                    start, stop), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Получить составы с вагонами с оперецией отправка за указанный период времени
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        public List<sostav_operation_send> GetSostavWagonsOperationOfSend(DateTime start, DateTime stop)
        {
            try
            {
                int id = 1;
                List<sostav_operation_send> list_sostav = new List<sostav_operation_send>();
                List<wagon_operation_send> list = GetWagonsOperationOfSend(start, stop);
                if (list != null && list.Count() > 0)
                {
                    // Сгруппируем по времени операции
                    List<IGrouping<DateTime, wagon_operation_send>> wagons_date = list.OrderBy(c => c.operation_start).ToList()
                                    .ToList()
                                    .GroupBy(w => w.operation_start)
                                    .ToList();
                    // Пройдемся по индексу поезда
                    foreach (IGrouping<DateTime, wagon_operation_send> gr_outer_way in wagons_date.ToList())
                    {
                        DateTime operation_start = gr_outer_way.Key;
                        // Сгруппируем по перегону
                        List<IGrouping<int?, wagon_operation_send>> wagons_outer = gr_outer_way
                            .ToList()
                            .GroupBy(w => w.id_outer_way)
                            .ToList();

                        foreach (IGrouping<int?, wagon_operation_send> wagons_sostav in wagons_outer.ToList())
                        {
                            // Получим вагоны состава
                            List<wagon_operation_send> wagons = wagons_sostav.OrderBy(w => w.wim_position).ToList();
                            // Проверим есть вагоны
                            if (wagons != null && wagons.Count() > 0)
                            {
                                // Вагоны есть, создадим строку состав
                                sostav_operation_send sostav = new sostav_operation_send()
                                {
                                    id = id,
                                    id_operation = wagons[0].id_operation,
                                    operation_name_ru = wagons[0].operation_name_ru,
                                    operation_name_en = wagons[0].operation_name_en,
                                    operation_start = wagons[0].operation_start,
                                    operation_end = wagons[0].operation_end,
                                    operation_create = wagons.OrderByDescending(w => w.operation_create).FirstOrDefault().operation_create,
                                    operation_create_user = wagons[0].operation_create_user,
                                    operation_locomotive1 = wagons[0].operation_locomotive1,
                                    operation_locomotive2 = wagons[0].operation_locomotive2,
                                    from_id_station = wagons[0].from_id_station,
                                    from_station_name_ru = wagons[0].from_station_name_ru,
                                    from_station_name_en = wagons[0].from_station_name_en,
                                    from_station_abbr_ru = wagons[0].from_station_abbr_ru,
                                    from_station_abbr_en = wagons[0].from_station_abbr_en,
                                    from_id_way = wagons[0].from_id_way,
                                    from_id_park = wagons[0].from_id_park,
                                    from_way_num_ru = wagons[0].from_way_num_ru,
                                    from_way_num_en = wagons[0].from_way_num_en,
                                    from_way_name_ru = wagons[0].from_way_name_ru,
                                    from_way_name_en = wagons[0].from_way_name_en,
                                    from_way_abbr_ru = wagons[0].from_way_abbr_ru,
                                    from_way_abbr_en = wagons[0].from_way_abbr_en,
                                    id_outer_way = wagons[0].id_outer_way,
                                    name_outer_way_ru = wagons[0].name_outer_way_ru,
                                    name_outer_way_en = wagons[0].name_outer_way_en,
                                    outer_way_close = wagons[0].outer_way_close,
                                    outer_way_delete = wagons[0].outer_way_delete,
                                    outer_way_note = wagons[0].outer_way_note,
                                    id_station_on = wagons[0].id_station_on,
                                    on_station_name_ru = wagons[0].on_station_name_ru,
                                    on_station_name_en = wagons[0].on_station_name_en,
                                    on_station_abbr_ru = wagons[0].on_station_abbr_ru,
                                    on_station_abbr_en = wagons[0].on_station_abbr_en,
                                    count_wagon_send = wagons.Count(),
                                    count_wagon_arrival = wagons.Where(w => w.outer_way_end != null).Count(),
                                    wagons = wagons.ToList(),
                                };
                                id++;
                                list_sostav.Add(sostav);
                            }
                        }

                    }
                }
                return list_sostav;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetSostavWagonsOperationOfSend(start={0}, stop={1})",
                    start, stop), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }
        /// <summary>
        /// Получить список вагонов с операцией отправка и прибытие за указаный период времени
        /// </summary>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <returns></returns>
        public List<wagon_send_arrival> GetWagonsOperationOfSendArrival(DateTime start, DateTime stop)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                context.Database.CommandTimeout = 300;
                System.Data.SqlClient.SqlParameter dstart = new System.Data.SqlClient.SqlParameter("@start", start);
                System.Data.SqlClient.SqlParameter dstop = new System.Data.SqlClient.SqlParameter("@stop", stop);
                string sql = "select * from [IDS].[get_view_wagons_of_operation_send_arrival](@start,@stop)";
                List<wagon_send_arrival> list = context.Database.SqlQuery<wagon_send_arrival>(sql, dstart, dstop).ToList();
                context.Database.CommandTimeout = null;
                return list;
            }

            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetWagonsOperationOfSendArrival(start={0}, stop={1})",
                    start, stop), servece_owner, eventID);
                return null; // Глобальная ошибка
            }
        }

        //public List<sostav_send_arrival> GetSostavWagonsOperationOfSendArrival(DateTime start, DateTime stop)
        //{
        //    try
        //    {
        //        int id = 1;
        //        List<sostav_send_arrival> list_sostav = new List<sostav_send_arrival>();
        //        List<wagon_send_arrival> list = GetWagonsOperationOfSendArrival(start, stop);
        //        if (list != null && list.Count() > 0)
        //        {
        //            // Сгруппируем по времени операции
        //            List<IGrouping<DateTime, wagon_send_arrival>> wagons_date = list.OrderBy(c => c.from_operation_end).ToList()
        //                            .ToList()
        //                            .GroupBy(w => w.from_operation_end)
        //                            .ToList();
        //            // Пройдемся по индексу поезда
        //            foreach (IGrouping<DateTime, wagon_send_arrival> gr_outer_way in wagons_date.ToList())
        //            {
        //                DateTime operation_start = gr_outer_way.Key;
        //                // Сгруппируем по перегону
        //                List<IGrouping<int?, wagon_send_arrival>> wagons_outer = gr_outer_way
        //                    .ToList()
        //                    .GroupBy(w => w.id_outer_way)
        //                    .ToList();

        //                foreach (IGrouping<int?, wagon_send_arrival> wagons_sostav in wagons_outer.ToList())
        //                {
        //                    // Получим вагоны состава
        //                    List<wagon_send_arrival> wagons = wagons_sostav.OrderBy(w => w.wim_position).ToList();
        //                    // Проверим есть вагоны
        //                    if (wagons != null && wagons.Count() > 0)
        //                    {
        //                        // Вагоны есть, создадим строку состав
        //                        sostav_send_arrival sostav = new sostav_send_arrival()
        //                        {
        //                            id = id,
        //                            id_operation = wagons[0].id_operation,
        //                            operation_name_ru = wagons[0].operation_name_ru,
        //                            operation_name_en = wagons[0].operation_name_en,
        //                            operation_start = wagons[0].operation_start,
        //                            operation_end = wagons[0].operation_end,
        //                            operation_create = wagons.OrderByDescending(w => w.operation_create).FirstOrDefault().operation_create,
        //                            operation_create_user = wagons[0].operation_create_user,
        //                            operation_locomotive1 = wagons[0].operation_locomotive1,
        //                            operation_locomotive2 = wagons[0].operation_locomotive2,
        //                            from_id_station = wagons[0].from_id_station,
        //                            from_station_name_ru = wagons[0].from_station_name_ru,
        //                            from_station_name_en = wagons[0].from_station_name_en,
        //                            from_station_abbr_ru = wagons[0].from_station_abbr_ru,
        //                            from_station_abbr_en = wagons[0].from_station_abbr_en,
        //                            from_id_way = wagons[0].from_id_way,
        //                            from_id_park = wagons[0].from_id_park,
        //                            from_way_num_ru = wagons[0].from_way_num_ru,
        //                            from_way_num_en = wagons[0].from_way_num_en,
        //                            from_way_name_ru = wagons[0].from_way_name_ru,
        //                            from_way_name_en = wagons[0].from_way_name_en,
        //                            from_way_abbr_ru = wagons[0].from_way_abbr_ru,
        //                            from_way_abbr_en = wagons[0].from_way_abbr_en,
        //                            id_outer_way = wagons[0].id_outer_way,
        //                            name_outer_way_ru = wagons[0].name_outer_way_ru,
        //                            name_outer_way_en = wagons[0].name_outer_way_en,
        //                            outer_way_close = wagons[0].outer_way_close,
        //                            outer_way_delete = wagons[0].outer_way_delete,
        //                            outer_way_note = wagons[0].outer_way_note,
        //                            id_station_on = wagons[0].id_station_on,
        //                            on_station_name_ru = wagons[0].on_station_name_ru,
        //                            on_station_name_en = wagons[0].on_station_name_en,
        //                            on_station_abbr_ru = wagons[0].on_station_abbr_ru,
        //                            on_station_abbr_en = wagons[0].on_station_abbr_en,
        //                            count_wagon_send = wagons.Count(),
        //                            count_wagon_arrival = wagons.Where(w => w.outer_way_end != null).Count(),
        //                            wagons = wagons.ToList(),
        //                        };
        //                        id++;
        //                        list_sostav.Add(sostav);
        //                    }
        //                }

        //            }
        //        }
        //        return list_sostav;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetSostavWagonsOperationOfSendArrival(start={0}, stop={1})",
        //            start, stop), servece_owner, eventID);
        //        return null; // Глобальная ошибка
        //    }
        //}

        #endregion
    }
}

