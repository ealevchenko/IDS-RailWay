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

                // Перенесем вагоны 
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
    }
}
