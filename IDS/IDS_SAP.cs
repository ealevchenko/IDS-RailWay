using EFIDS.Concrete;
using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using IDS.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    //public class view_wagons
    //{
    //    public long wir_id { get; set; }
    //    public long wim_id { get; set; }
    //    public long? wio_id { get; set; }
    //    public DateTime sample_datetime { get; set; }
    //    public int num { get; set; }
    //    public int position { get; set; }
    //    public int? id_operator { get; set; }
    //    public string operators_ru { get; set; }
    //    public string operators_en { get; set; }
    //    public string operator_abbr_ru { get; set; }
    //    public string operator_abbr_en { get; set; }
    //    public DateTime? operator_rent_start { get; set; }
    //    public DateTime? operator_rent_end { get; set; }
    //    public bool? operator_paid { get; set; }
    //    public string operator_color { get; set; }
    //    public bool? operator_monitoring_idle_time { get; set; }
    //    public int? id_limiting_loading { get; set; }
    //    public string limiting_name_ru { get; set; }
    //    public string limiting_name_en { get; set; }
    //    public string limiting_abbr_ru { get; set; }
    //    public string limiting_abbr_en { get; set; }
    //    public int? id_owner_wagon { get; set; }
    //    public string owner_wagon_ru { get; set; }
    //    public string owner_wagon_en { get; set; }
    //    public string owner_wagon_abbr_ru { get; set; }
    //    public string owner_wagon_abbr_en { get; set; }
    //    public int? wagon_adm { get; set; }
    //    public string wagon_adm_name_ru { get; set; }
    //    public string wagon_adm_name_en { get; set; }
    //    public string wagon_adm_abbr_ru { get; set; }
    //    public string wagon_adm_abbr_en { get; set; }
    //    public int? wagon_rod { get; set; }
    //    public string wagon_rod_name_ru { get; set; }
    //    public string wagon_rod_name_en { get; set; }
    //    public string wagon_rod_abbr_ru { get; set; }
    //    public string wagon_rod_abbr_en { get; set; }
    //    public string wagon_type_ru { get; set; }
    //    public string wagon_type_en { get; set; }
    //    public string arrival_condition_name_ru { get; set; }
    //    public string arrival_condition_name_en { get; set; }
    //    public string arrival_condition_abbr_ru { get; set; }
    //    public string arrival_condition_abbr_en { get; set; }
    //    public bool? arrival_condition_red { get; set; }
    //    public bool? arrival_condition_repairs { get; set; }
    //    public string current_condition_name_ru { get; set; }
    //    public string current_condition_name_en { get; set; }
    //    public string current_condition_abbr_ru { get; set; }
    //    public string current_condition_abbr_en { get; set; }
    //    public bool? current_condition_red { get; set; }
    //    public bool? current_condition_repairs { get; set; }
    //    public DateTime? wagon_date_rem_uz { get; set; }
    //    public double? wagon_gruzp_doc { get; set; }
    //    public double? wagon_gruzp_uz { get; set; }
    //    public string arrival_cargo_group_name_ru { get; set; }
    //    public string arrival_cargo_group_name_en { get; set; }
    //    public string arrival_cargo_name_ru { get; set; }
    //    public string arrival_cargo_name_en { get; set; }
    //    public int? arrival_id_sertification_data { get; set; }
    //    public string arrival_sertification_data_ru { get; set; }
    //    public string arrival_sertification_data_en { get; set; }
    //    public int? arrival_id_commercial_condition { get; set; }
    //    public string arrival_commercial_condition_ru { get; set; }
    //    public string arrival_commercial_condition_en { get; set; }
    //    public int? arrival_station_from_code { get; set; }
    //    public string arrival_station_from_name_ru { get; set; }
    //    public string arrival_station_from_name_en { get; set; }
    //    public int? arrival_shipper_code { get; set; }
    //    public string arrival_shipper_name_ru { get; set; }
    //    public string arrival_shipper_name_en { get; set; }
    //    public int? accepted_id_station_amkr { get; set; }
    //    public string accepted_station_amkr_name_ru { get; set; }
    //    public string accepted_station_amkr_name_en { get; set; }
    //    public string accepted_station_amkr_abbr_ru { get; set; }
    //    public string accepted_station_amkr_abbr_en { get; set; }
    //    public int? arrival_id_station_amkr { get; set; }
    //    public string arrival_station_amkr_name_ru { get; set; }
    //    public string arrival_station_amkr_name_en { get; set; }
    //    public string arrival_station_amkr_abbr_ru { get; set; }
    //    public string arrival_station_amkr_abbr_en { get; set; }
    //    public string arrival_division_amkr_code { get; set; }
    //    public string arrival_division_amkr_name_ru { get; set; }
    //    public string arrival_division_amkr_name_en { get; set; }
    //    public string arrival_division_amkr_abbr_ru { get; set; }
    //    public string arrival_division_amkr_abbr_en { get; set; }
    //    public int? current_id_loading_status { get; set; }
    //    public string current_loading_status_ru { get; set; }
    //    public string current_loading_status_en { get; set; }
    //    public int? current_wagon_busy { get; set; }
    //    public int? current_id_operation { get; set; }
    //    public string current_operation_name_ru { get; set; }
    //    public string current_operation_name_en { get; set; }
    //    public DateTime? current_operation_start { get; set; }
    //    public DateTime? current_operation_end { get; set; }
    //    public int? arrival_duration { get; set; }
    //    public int? arrival_idle_time { get; set; }
    //    public decimal? arrival_usage_fee { get; set; }
    //    public int current_id_station_amkr { get; set; }
    //    public string current_station_amkr_name_ru { get; set; }
    //    public string current_station_amkr_name_en { get; set; }
    //    public string current_station_amkr_abbr_ru { get; set; }
    //    public string current_station_amkr_abbr_en { get; set; }
    //    public int? current_station_duration { get; set; }
    //    public int? current_way_duration { get; set; }
    //    public int? current_station_idle_time { get; set; }
    //    public int current_id_way { get; set; }
    //    public int? current_id_park { get; set; }
    //    public string current_way_num_ru { get; set; }
    //    public string current_way_num_en { get; set; }
    //    public string current_way_name_ru { get; set; }
    //    public string current_way_name_en { get; set; }
    //    public string current_way_abbr_ru { get; set; }
    //    public string current_way_abbr_en { get; set; }
    //    public DateTime current_way_start { get; set; }
    //    public DateTime? current_way_end { get; set; }
    //    public string current_wim_note { get; set; }
    //    public int? current_id_outer_way { get; set; }
    //    public string current_outer_way_name_ru { get; set; }
    //    public string current_outer_way_name_en { get; set; }
    //    public DateTime? current_outer_way_start { get; set; }
    //    public DateTime? current_outer_way_end { get; set; }
    //    public string sap_incoming_supply_num { get; set; }
    //    public string sap_incoming_supply_pos { get; set; }
    //    public DateTime? sap_incoming_supply_date { get; set; }
    //    public TimeSpan? sap_incoming_supply_time { get; set; }
    //    public string sap_incoming_supply_warehouse_code { get; set; }
    //    public string sap_incoming_supply_warehouse_name { get; set; }
    //    public string sap_incoming_supply_cargo_code { get; set; }
    //    public string sap_incoming_supply_cargo_name { get; set; }

    //    public string sap_outgoing_supply_num { get; set; }
    //    public DateTime? sap_outgoing_supply_date { get; set; }
    //    public string sap_outgoing_supply_cargo_name { get; set; }
    //    public string sap_outgoing_supply_cargo_code { get; set; }
    //    public string sap_outgoing_supply_shipper_name { get; set; }
    //    public string sap_outgoing_supply_shipper_code { get; set; }
    //    public string sap_outgoing_supply_destination_station_name { get; set; }
    //    public string sap_outgoing_supply_destination_station_code { get; set; }
    //    public string sap_outgoing_supply_border_checkpoint_name { get; set; }
    //    public string sap_outgoing_supply_border_checkpoint_code { get; set; }
    //    public double? sap_outgoing_supply_netto { get; set; }
    //    public string sap_outgoing_supply_warehouse_code { get; set; }
    //    public string sap_outgoing_supply_warehouse_name { get; set; }
    //    public string sap_outgoing_supply_responsible_post { get; set; }
    //    public string sap_outgoing_supply_responsible_fio { get; set; }
    //    public string sap_outgoing_supply_payer_code { get; set; }
    //    public string sap_outgoing_supply_payer_name { get; set; }

    //    public string instructional_letters_num { get; set; }
    //    public DateTime? instructional_letters_datetime { get; set; }
    //    public int? instructional_letters_station_code { get; set; }
    //    public string instructional_letters_station_name { get; set; }
    //    public string instructional_letters_note { get; set; }
    //    public int? wagon_brutto_doc { get; set; }
    //    public int? wagon_brutto_amkr { get; set; }
    //    public int? wagon_tara_doc { get; set; }
    //    public double? wagon_tara_uz { get; set; }
    //    public int? wagon_tara_arc_doc { get; set; }
    //    public int? wagon_vesg_doc { get; set; }
    //    public int? wagon_vesg_amkr { get; set; }
    //    public int? diff_vesg { get; set; }
    //    public bool? doc_outgoing_car { get; set; }
    //    public int? arrival_nom_doc { get; set; }
    //    public int? arrival_nom_main_doc { get; set; }
    //    public string arrival_composition_index { get; set; }
    //    public DateTime? arrival_date_adoption { get; set; }
    //    public int? outgoing_id_return { get; set; }
    //    public string outgoing_return_cause_ru { get; set; }
    //    public string outgoing_return_cause_en { get; set; }
    //    public DateTime? outgoing_date { get; set; }
    //    public int? outgoing_sostav_status { get; set; }
    //    public string wagon_ban_uz { get; set; }
    //    public bool? wagon_closed_route { get; set; }
    //    public string wir_note { get; set; }
    //}

    public class wagons_sap_os
    {
        public long wir_id { get; set; }
        public int num { get; set; }
        public DateTime? arrival_date_adoption { get; set; }
    }

    public class IDS_SAP : IDS_Base
    {
        private eventID eventID = eventID.IDS_IDSSAP;
        private int day_approach_limit = 30; // Количество дней, ожидания вагона с подходов
        public int Day_approach_limit { get { return this.day_approach_limit; } set { this.day_approach_limit = value; } }// TODO: Удалить 

        public IDS_SAP()
            : base()
        {

        }

        public IDS_SAP(service servece_owner)
            : base(servece_owner)
        {

        }

        #region ОБНОВЛЕНИЕ ВХОДЯЩЕЙ ПОСТАВКИ

        /// <summary>
        /// Обновить строку САП
        /// </summary>
        /// <param name="sap_is"></param>
        /// <returns></returns>
        public SAPIncomingSupply GetCurrentIncomingSupplyOfWebSAP(SAPIncomingSupply sap_is)
        {
            try
            {
                WebAPIClientSAP web_sap = new WebAPIClientSAP(this.servece_owner);
                IncomingSupply incoming_supply = web_sap.GetIncomingSupply(sap_is.id, sap_is.num_doc_uz.Trim(), sap_is.num.ToString().Trim());
                if (incoming_supply != null)
                {

                    string data = null;
                    string time = null;
                    if (!String.IsNullOrWhiteSpace(incoming_supply.ERDAT))
                    {
                        data = incoming_supply.ERDAT.Insert(4, "-").Insert(7, "-");
                    }
                    if (!String.IsNullOrWhiteSpace(incoming_supply.ETIME))
                    {
                        time = incoming_supply.ETIME.Insert(2, ":").Insert(5, ":");
                    }
                    sap_is.VBELN = incoming_supply.VBELN;
                    sap_is.NUM_VBELN = !String.IsNullOrWhiteSpace(incoming_supply.PSNR) ? incoming_supply.PSNR : null;
                    sap_is.WERKS = incoming_supply.WERKS;
                    sap_is.LGORT = incoming_supply.LGORT;
                    sap_is.LGOBE = incoming_supply.LGOBE;
                    sap_is.ERDAT = !String.IsNullOrWhiteSpace(data) ? (DateTime?)DateTime.Parse(data, CultureInfo.CreateSpecificCulture("ru-RU")).Date : null;
                    sap_is.ETIME = !String.IsNullOrWhiteSpace(time) ? (TimeSpan?)TimeSpan.Parse(time, CultureInfo.CreateSpecificCulture("ru-RU")) : null;
                    sap_is.LGORT_10 = incoming_supply.LGORT_10;
                    sap_is.LGOBE_10 = incoming_supply.LGOBE_10;
                    sap_is.MATNR = incoming_supply.MATNR;
                    sap_is.MAKTX = incoming_supply.MAKTX;
                    sap_is.NAME_SH = incoming_supply.NAME_SH;
                    sap_is.KOD_R_10 = incoming_supply.KOD_R_10;

                }
                sap_is.attempt = sap_is.attempt + 1;
                return sap_is;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentIncomingSupplyOfWebSAP(sap_is={0})", sap_is), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Метод выполняет списочный запрсос в САП получает ответ, и возвращает скорректированую строку SAPIncomingSupply
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public List<SAPIncomingSupply> GetCurrentIncomingSupplyOfWebSAP(List<SAPIncomingSupply> list)
        {
            try
            {
                List<SAPIncomingSupply> new_list = new List<SAPIncomingSupply>();
                foreach (SAPIncomingSupply sap_is in list)
                {
                    SAPIncomingSupply new_sap_is = GetCurrentIncomingSupplyOfWebSAP(sap_is);
                    new_list.Add(new_sap_is);
                }
                return new_list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentIncomingSupplyOfWebSAP(list={0})", list), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Обновить информацию о входящей поставке
        /// </summary>
        /// <param name="sap_is"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public SAPIncomingSupply GetUpdateIncomingSupplyOfWebSAP(SAPIncomingSupply sap_is, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                WebAPIClientSAP web_sap = new WebAPIClientSAP(this.servece_owner);
                string num_doc_uz = sap_is.num_doc_uz.Trim();
                IncomingSupply incoming_supply = web_sap.GetIncomingSupply(sap_is.id, num_doc_uz, sap_is.num.ToString().Trim());

                // Проверка на документ с нулем впереди
                if (incoming_supply == null && sap_is.num_doc_uz != null && sap_is.num_doc_uz.Length <= 6)
                {
                    // Добавим 0 и поищем еще
                    num_doc_uz = "0" + sap_is.num_doc_uz.Trim();
                    incoming_supply = web_sap.GetIncomingSupply(sap_is.id, num_doc_uz, sap_is.num.ToString().Trim());
                    if (incoming_supply == null)
                    {
                        // Добавим 00 и поищем еще
                        num_doc_uz = "00" + sap_is.num_doc_uz.Trim();
                        incoming_supply = web_sap.GetIncomingSupply(sap_is.id, num_doc_uz, sap_is.num.ToString().Trim());
                    }
                }

                if (incoming_supply != null)
                {

                    string data = null;
                    string time = null;
                    sap_is.num_doc_uz = num_doc_uz;
                    if (!String.IsNullOrWhiteSpace(incoming_supply.ERDAT))
                    {
                        data = incoming_supply.ERDAT.Insert(4, "-").Insert(7, "-");
                    }
                    if (!String.IsNullOrWhiteSpace(incoming_supply.ETIME))
                    {
                        time = incoming_supply.ETIME.Insert(2, ":").Insert(5, ":");
                    }
                    sap_is.VBELN = incoming_supply.VBELN;
                    sap_is.NUM_VBELN = !String.IsNullOrWhiteSpace(incoming_supply.PSNR) ? incoming_supply.PSNR : null;
                    sap_is.WERKS = incoming_supply.WERKS;
                    sap_is.LGORT = incoming_supply.LGORT;
                    sap_is.LGOBE = incoming_supply.LGOBE;
                    sap_is.ERDAT = !String.IsNullOrWhiteSpace(data) ? (DateTime?)DateTime.Parse(data, CultureInfo.CreateSpecificCulture("ru-RU")).Date : null;
                    sap_is.ETIME = !String.IsNullOrWhiteSpace(time) ? (TimeSpan?)TimeSpan.Parse(time, CultureInfo.CreateSpecificCulture("ru-RU")) : null;
                    sap_is.LGORT_10 = incoming_supply.LGORT_10;
                    sap_is.LGOBE_10 = incoming_supply.LGOBE_10;
                    sap_is.MATNR = incoming_supply.MATNR;
                    sap_is.MAKTX = incoming_supply.MAKTX;
                    sap_is.NAME_SH = incoming_supply.NAME_SH;
                    sap_is.KOD_R_10 = incoming_supply.KOD_R_10;
                    sap_is.change = DateTime.Now;
                    sap_is.change_user = user;
                }
                sap_is.attempt = sap_is.attempt + 1;
                return sap_is;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetUpdateIncomingSupplyOfWebSAP(sap_is={0}, user={1})", sap_is, user), servece_owner, eventID);
                return null;// Ошибка
            }
        }
        /// <summary>
        /// Обновить информацию по всем входящим поставкам по указаному вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="list_cargo"></param>
        /// <param name="num"></param>
        /// <param name="gr_sap_is"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateID UpdateIncomingSupply(ref EFDbContext context, List<int> list_cargo, int num, List<SAPIncomingSupply> gr_sap_is, string user)
        {
            ResultUpdateID result = new ResultUpdateID(0);
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
                EFSAPIncomingSupply ef_sap = new EFSAPIncomingSupply(context);
                EFArrivalCars ef_ac = new EFArrivalCars(context);
                EFArrival_UZ_Vagon ef_uz_vag = new EFArrival_UZ_Vagon(context);
                // Определим количество вх. поставок по указаному вагону
                int count_is = gr_sap_is.Count();
                // Пройдемся по всем записям вх пост. отсортированых по возрастанию (последняя актуальная)
                foreach (SAPIncomingSupply sap in gr_sap_is.OrderBy(w => w.id).ToList())
                {
                    // Это последняя запись (или единственная)
                    if (count_is == 1)
                    {
                        // Это Актуальная запиь
                        ArrivalCars car = ef_ac.Context.Where(c => c.id == sap.id_arrival_car).FirstOrDefault();
                        if (car != null)
                        {
                            Arrival_UZ_Vagon uz_vag = ef_uz_vag.Context.Where(c => c.id == car.id_arrival_uz_vagon).FirstOrDefault();
                            if (uz_vag != null)
                            {
                                // Определить вагон на территории АМКР
                                WagonInternalRoutes last_wir = context.GetLastWagon(num);
                                if (last_wir != null && last_wir.close == null)
                                {
                                    // Вагон на территории АМКР
                                    // Проверим на груз
                                    int id_cargo = list_cargo.ToList().Find(x => x == uz_vag.id_cargo);

                                    if (id_cargo == 0)
                                    {
                                        // Обновить 
                                        SAPIncomingSupply sap_up = GetUpdateIncomingSupplyOfWebSAP(sap, user);
                                        // Обновим запись
                                        ef_sap.Update(sap_up);
                                        result.SetUpdateResult(1, sap_up.id); // Ок
                                    }
                                    else
                                    {
                                        // Закрыть этот вагон, по грузу
                                        sap.note = "Строка закрыта по данному грузу не формируется входящая поставка";
                                        sap.close = DateTime.Now;
                                        sap.close_user = user;
                                        // Обновим запись
                                        ef_sap.Update(sap);
                                        //result.AddClose();
                                        result.SetCloseResult(1, sap.id); // Ок
                                    }
                                }
                                else
                                {
                                    // Закрыть это вагон вагон за территорией АМКР
                                    sap.note = "Строка закрыта, вагона нет на территории АМКР";
                                    sap.close = DateTime.Now;
                                    sap.close_user = user;
                                    // Обновим запись
                                    ef_sap.Update(sap);
                                    //result.AddClose();
                                    result.SetCloseResult(1, sap.id); // Ок
                                }
                            }
                            else
                            {
                                DateTime limit_data = DateTime.Now.AddDays(-1 * this.day_approach_limit);
                                // Проверка на время ожидания с подходов.
                                if (sap.create >= limit_data)
                                {
                                    // Вагон на подходах и лимит времени не прошол
                                    // Обновить 
                                    SAPIncomingSupply sap_up = GetUpdateIncomingSupplyOfWebSAP(sap, user);
                                    // Обновим запись
                                    sap.note = "Вагон на подходах";
                                    ef_sap.Update(sap_up);
                                    result.SetUpdateResult(1, sap_up.id); // Ок
                                }
                                else
                                {
                                    // Вагон не принят, закрыть
                                    sap.note = "Строка закрыта, вагон не принят на АМКР";
                                    sap.close = DateTime.Now;
                                    sap.close_user = user;
                                    // Обновим запись
                                    ef_sap.Update(sap);
                                    //result.AddClose();
                                    result.SetCloseResult(1, sap.id); // Ок                                
                                }
                            }
                        }
                        else
                        {
                            result.SetResult((int)errors_base.not_arrival_cars_db); // Ошибка и выход
                        }
                    }
                    else
                    {
                        // Закроем запись это старая
                        sap.note = "Строка закрыта, запись не актуальная";
                        sap.close = DateTime.Now;
                        sap.close_user = user;
                        // Обновим запись
                        ef_sap.Update(sap);
                        //result.AddClose();
                        result.SetCloseResult(1, sap.id); // Ок
                    }
                    count_is--;
                }
                // Обновим в базе
                if (result.error == 0 && result.result == 0)
                {
                    // Если без ошибок, тогда записываем результат применения 
                    result.SetResult(context.SaveChanges());
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateIncomingSupply(context = {0}, list_cargo = {1}, num = {2}, gr_sap_is = {3}, user = {4})", context, list_cargo, num, gr_sap_is, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Ошибка
            }
        }
        /// <summary>
        /// Сгруппировать входящие поставки по номерам вагонов и обновить информацию по всем входящим поставкам по кждому вагону 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="list_cargo"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultUpdateWagon UpdateListIncomingSupply(ref EFDbContext context, List<int> list_cargo, string user)
        {
            ResultUpdateWagon result = new ResultUpdateWagon(0);
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

                EFSAPIncomingSupply ef_sap = new EFSAPIncomingSupply(context);

                List<IGrouping<int, SAPIncomingSupply>> group_sap_is = ef_sap
                    .Context
                    .Where(s => s.close == null)
                    .ToList()
                    .GroupBy(g => g.num)
                    .ToList();

                // Определим количество
                result.count = group_sap_is.Count();
                int count_wag = result.count;
                foreach (IGrouping<int, SAPIncomingSupply> gr_sap_is in group_sap_is.ToList())
                {
                    // Номер вагона
                    int num = gr_sap_is.Key;
                    //Console.WriteLine("Обрабатываю вагон №{0}, Кол. вх. пост. = {1}, уже ошибок = {2}.", num, gr_sap_is.Count(), result.error);
                    ResultUpdateID res_wag = UpdateIncomingSupply(ref context, list_cargo, num, gr_sap_is.OrderBy(w => w.id).ToList(), user);
                    result.SetUpdateResult(res_wag.result, num);
                    result.close += res_wag.close;
                    result.skip += res_wag.skip;
                    string mess = String.Format("Обработал вагон №{0}, Код выполнения={1}. Осталось обработать={2}", num, res_wag.result, count_wag--);
                    if (res_wag.result >= 0)
                    {
                        mess.InformationLog(servece_owner, eventID);
                    }
                    else
                    {
                        mess.ErrorLog(servece_owner, eventID);
                    }

                    //Console.WriteLine("Обработал вагон №{0}, Код выполнения = {1}. Осталось обработать = {2}", num, res_wag.result, count_wag--);
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateListIncomingSupply(context = {0}, list_cargo = {1}, user = {2})", context, list_cargo, user), servece_owner, eventID);
                result.SetResult((int)errors_base.global);
                return result;// Ошибка
            }
        }
        /// <summary>
        /// Выполнить сервис "Обновить все текущие входяшие поставки"
        /// </summary>
        /// <param name="list_cargo"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateListIncomingSupply(List<int> list_cargo, string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultUpdateWagon res = new ResultUpdateWagon(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();

                // Обновим вагоны 
                res = UpdateListIncomingSupply(ref context, list_cargo, user);
                // Если операция успешна, перенумеруем позиции на пути с которого ушли вагоны
                if (res.error == 0)
                {
                    res.SetResult(context.SaveChanges());
                }
                string mess = String.Format("Операция обновления информации входящей поставки на вагоны. Код выполнения = {0}. Результат обновления [определено {1} вагонов, обновлено {2}, пропущено {3}, закрыто строк {4}, ошибок обновления {5}].",
                    res.result, res.count, res.update, res.skip, res.close, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция обновления входящей поставки"), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateListIncomingSupply(list_cargo = {0}, user = {1})", list_cargo, user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }

        #endregion

        #region ОБНОВЛЕНИЕ ИСХОДЯЩЕЙ ПОСТАВКИ
        /// <summary>
        /// Обновим входящую поставку в WIR 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_wir"></param>
        /// <param name="out_sypp"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateWIR_SAPOutgoingSupply(ref EFDbContext context, long id_wir, Out_Supply out_sypp, string user)
        {
            try
            {
                if (context == null)
                {
                    context = new EFIDS.Concrete.EFDbContext();
                };
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFWagonInternalRoutes ef_wir = new EFWagonInternalRoutes(context);
                EFSAPOutgoingSupply ef_sap_os = new EFSAPOutgoingSupply(context);

                // Получим wir
                WagonInternalRoutes wir = ef_wir.Context.Where(w => w.id == id_wir).FirstOrDefault();
                if (wir == null) return (int)errors_base.not_wir_db; // В базе данных нет записи по WagonInternalRoutes (Внутреннее перемещение вагонов)
                // Проверим sap исходящая поставка указана
                if (wir.id_sap_outbound_supply != null)
                {
                    SAPOutgoingSupply sap_os = ef_sap_os.Context.Where(s => s.id == wir.id_sap_outbound_supply).FirstOrDefault();
                    if (sap_os == null) return (int)errors_base.not_sap_os_db; // В базе данных нет записи по SAPOutgoingSupply (SAP Исходящая поставка)
                    // Проверим id соответсвуют (SAPOutgoingSupply и Out_Supply)
                    if (sap_os.id_out_supply == out_sypp.id)
                    {
                        // Соответсвует обновим
                        sap_os.id_outgoing_car = wir.id_outgoing_car;
                        sap_os.num = wir.num;
                        sap_os.VBELN = out_sypp.VBELN;
                        sap_os.ERDAT = out_sypp.ERDAT;
                        sap_os.ZBEZEI = out_sypp.ZBEZEI;
                        sap_os.STAWN = out_sypp.STAWN;
                        sap_os.NAME1_AG = out_sypp.NAME1_AG;
                        sap_os.KUNNR_AG = out_sypp.KUNNR_AG;
                        sap_os.ZRWNAME = out_sypp.ZRWNAME;
                        sap_os.ZENDSTAT = out_sypp.ZENDSTAT;
                        sap_os.ZCRSTNAME = out_sypp.ZCRSTNAME;
                        sap_os.ZCROSSSTAT = out_sypp.ZCROSSSTAT;
                        sap_os.ZZVES_NETTO = out_sypp.ZZVES_NETTO;
                        sap_os.ABTNR = out_sypp.ABTNR;
                        sap_os.VTEXT = out_sypp.VTEXT;
                        sap_os.ZZDOLG = out_sypp.ZZDOLG;
                        sap_os.ZZFIO = out_sypp.ZZFIO;
                        sap_os.ZZPLATEL = out_sypp.ZZPLATEL;
                        sap_os.ZZNAME_PLATEL = out_sypp.ZZNAME_PLATEL;
                        //sap_os.note = out_sypp.note,
                        sap_os.change = DateTime.Now;
                        sap_os.change_user = user;
                        ef_sap_os.Update(sap_os);
                        return 2; // Обновлена
                    }
                    else
                    {
                        ef_sap_os.Delete(sap_os.id);
                        // не соответсвует, удалим (и создадим новый)
                    }
                }
                // Содадим и добавим новую исходящую поставку
                SAPOutgoingSupply sap_os_new = new SAPOutgoingSupply()
                {
                    id = 0,
                    id_out_supply = 0,
                    id_outgoing_car = wir.id_outgoing_car,
                    num = wir.num,
                    VBELN = out_sypp.VBELN.Trim(),
                    ERDAT = out_sypp.ERDAT,
                    ZBEZEI = out_sypp.ZBEZEI.Trim(),
                    STAWN = out_sypp.STAWN.Trim(),
                    NAME1_AG = out_sypp.NAME1_AG.Trim(),
                    KUNNR_AG = out_sypp.KUNNR_AG.Trim(),
                    ZRWNAME = out_sypp.ZRWNAME.Trim(),
                    ZENDSTAT = out_sypp.ZENDSTAT.Trim(),
                    ZCRSTNAME = out_sypp.ZCRSTNAME.Trim(),
                    ZCROSSSTAT = out_sypp.ZCROSSSTAT.Trim(),
                    ZZVES_NETTO = out_sypp.ZZVES_NETTO,
                    ABTNR = out_sypp.ABTNR.Trim(),
                    VTEXT = out_sypp.VTEXT.Trim(),
                    ZZDOLG = out_sypp.ZZDOLG.Trim(),
                    ZZFIO = out_sypp.ZZFIO.Trim(),
                    ZZPLATEL = out_sypp.ZZPLATEL.Trim(),
                    ZZNAME_PLATEL = out_sypp.ZZNAME_PLATEL.Trim(),
                    note = null,
                    create = DateTime.Now,
                    create_user = user,
                };
                sap_os_new.Out_Supply = out_sypp;
                ef_sap_os.Add(sap_os_new);
                wir.SAPOutgoingSupply = sap_os_new;
                ef_wir.Update(wir);
                return 1; // Добавлена новая
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateWIR_SAPOutgoingSupply(context = {0}, id_wir = {1}, cur_out_sypp = {2}, user = {3})", context, id_wir, out_sypp, user), servece_owner, eventID);
                return (int)errors_base.global;
            }
        }

        /// <summary>
        /// Обновим САП Входящие поставки
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateSAPOutgoingSupply(string user)
        {
            try
            {
                DateTime start = DateTime.Now;
                ResultUpdateWagon res = new ResultUpdateWagon(0);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();

                EFOut_Supply ef_out_sypp = new EFOut_Supply(context);


                string sql = "select * from [IDS].[get_view_wagons_of_balance]() where id_operator is null or id_operator NOT IN (SELECT [id_operator]  FROM [KRR-PA-CNT-Railway].[IDS].[Directory_OperatorsWagonsGroup] where [group] in ('amkr_vz'))";
                List<wagons_sap_os> list_all_wagons = context.Database.SqlQuery<wagons_sap_os>(sql).ToList();
                int count = list_all_wagons.Count();
                res.count = count;
                foreach (wagons_sap_os wagons in list_all_wagons)
                {
                    // Дата прибытия вагона
                    DateTime? dt = ((DateTime)wagons.arrival_date_adoption).Date;
                    // Выберем подходящую исходящую поставку
                    Out_Supply cur_out_sypp = ef_out_sypp.Context.Where(s => s.TRAID == wagons.num.ToString() && s.ERDAT >= dt).OrderBy(c => c.ERDAT).FirstOrDefault();
                    int res_upd = 0;
                    if (cur_out_sypp != null)
                    {
                        res_upd = UpdateWIR_SAPOutgoingSupply(ref context, wagons.wir_id, cur_out_sypp, user);
                        if (res_upd > 0)
                        {
                            if (res_upd == 1)
                            {
                                res.SetInsertResult(res_upd, wagons.num);
                            }
                            else
                            {
                                res.SetUpdateResult(res_upd, wagons.num);
                            }
                        }
                        else
                        {
                            res.SetSkipResult(res_upd, wagons.num);
                        }
                    }
                    else
                    {
                        res.SetSkipResult(res_upd, wagons.num);
                    }
                    Console.WriteLine("Вагон {0}, Код обновления ИП {1} осталось вагонов {2}", wagons.num, res_upd, --count);
                }
                // Если операция успешна, сохраним результат
                if (res.error == 0)
                {
                    res.SetResult(context.SaveChanges());
                }
                string mess = String.Format("Операция обновления информации исходящей поставки на вагоны. Код выполнения = {0}. Результат обновления [на АМКР определено {1} вагонов, добавлено ИП:{2}, обновлено ИП:{3}, пропущено ИП:{4}, закрыто ИП:{5}, ошибок обновления ИП:{6}].",
                    res.result, res.count, res.add, res.update, res.skip, res.close, res.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(res.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                DateTime stop = DateTime.Now;
                servece_owner.ServicesToLog(eventID, String.Format("Операция обновления исходящей поставки поставки"), start, stop, res.result);
                return res.result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UpdateSAPOutgoingSupply(user = {0})", user), servece_owner, eventID);
                return -1;// Возвращаем id=-1 , Ошибка
            }
        }
        #endregion
    }
}
