using EFIDS.Concrete;
using EFIDS.Entities;
using EFIDS.Helper;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UZ;

namespace IDS
{
    // TODO! убрать в общий справочник
    public enum errors_ids_dir : int
    {
        global = -1,
        cancel_save_changes = -2,               // Отмена сохранений изменений в базе данных (были ошибки по ходу выполнения всей операции)
        error_input_value = -100,
        not_list_nums = -101,                    // Ошибка нет списка вагонов
        error_id_rent_wagon = -102,             // Ошибка нет id аренды не существует
        error_last_id_rent_wagon = -103,        // Ошибка последней id аренды не существует
        not_wagon_of_db = -201,                 // Указаного вагона нет в базе
        error_set_date = -202,                  // Ошибка сохранения даты 
        not_open_rent = -203,                  // Ошибка нет открытой аренды       
    }

    public class IDSDirectory : IDS_Base
    {
        private eventID eventID = eventID.IDS_Directory;
        //protected service servece_owner = service.Null;

        EFDirectory_Station ef_station = null;
        EFDirectory_Consignee ef_сonsignee = null;
        EFDirectory_Wagons ef_wag = null;
        EFDirectory_WagonsRent ef_wag_rent = null;
        EFDirectory_Countrys ef_countrys = null;
        EFDirectory_GenusWagons ef_genus = null;
        EFDirectory_OwnersWagons ef_owner = null;
        EFDirectory_OperatorsWagons ef_operator = null;
        EFDirectory_Railway ef_rw = null;
        EFDirectory_CargoGNG ef_cargo_gng = null;
        EFDirectory_CargoETSNG ef_cargo_etsng = null;
        EFDirectory_Cargo ef_cargo = null;
        EFDirectory_Shipper ef_shipper = null;
        EFDirectory_PayerSender ef_paysender = null;
        EFDirectory_ExternalStation ef_ext_station = null;
        EFDirectory_BorderCheckpoint ef_bord_chek = null;

        public IDSDirectory()
            : base()
        {
            CreateContex(new EFDbContext());
        }

        public IDSDirectory(service servece_owner)
            : base(servece_owner)
        {
            CreateContex(new EFDbContext());
        }

        public IDSDirectory(EFDbContext context)
            : base()
        {
            CreateContex(context);
        }
        public IDSDirectory(service servece_owner, EFDbContext context)
            : base(servece_owner)
        {
            CreateContex(context);
        }

        private void CreateContex(EFDbContext context)
        {
            this.ef_station = new EFDirectory_Station(context);
            this.ef_сonsignee = new EFDirectory_Consignee(context);
            this.ef_wag = new EFDirectory_Wagons(context);
            this.ef_wag_rent = new EFDirectory_WagonsRent(context);
            this.ef_countrys = new EFDirectory_Countrys(context);
            this.ef_genus = new EFDirectory_GenusWagons(context);
            this.ef_owner = new EFDirectory_OwnersWagons(context);
            this.ef_operator = new EFDirectory_OperatorsWagons(context);
            this.ef_rw = new EFDirectory_Railway(context);
            this.ef_cargo_gng = new EFDirectory_CargoGNG(context);
            this.ef_cargo_etsng = new EFDirectory_CargoETSNG(context);
            this.ef_cargo = new EFDirectory_Cargo(context);
            this.ef_shipper = new EFDirectory_Shipper(context);
            this.ef_paysender = new EFDirectory_PayerSender(context);
            this.ef_ext_station = new EFDirectory_ExternalStation(context);
            this.ef_bord_chek = new EFDirectory_BorderCheckpoint(context);
        }

        #region СПРАВОЧНИК ВНУТРЕННИХ СТАНЦИЙ ПРЕДПРИЯТИЯ (IDS.Directory_Station )
        /// <summary>
        /// Определить id станции из справочника "ВНУТРЕННИХ СТАНЦИЙ ПРЕДПРИЯТИЯ" системы IDS  по коду станции УЗ (с контрольной суммой), 
        /// если станция отсутствует: (add = true)  - добавить в справочник новую строку по данным справочника "СТАНЦИЙ УЗ"; (add = false) строка не добавляется;
        /// Результат id строки справочника "ВНУТРЕННИХ СТАНЦИЙ ПРЕДПРИЯТИЯ" или 0:строка не найдена; -1: Ошибка;
        /// </summary>
        /// <param name="code_cs"></param>
        /// <param name="add"></param>
        /// <returns></returns>
        public int GetID_Directory_StationOfCodeCS(int code_cs, bool add)
        {
            try
            {
                Directory_Station station = ef_station.Context.Where(s => s.code == code_cs).FirstOrDefault();
                if (station == null && add)
                {
                    // Строки нет но есть признак добавить, тогда создаем новую станцию   
                    // Получим строку станции УЗ по коду cs
                    UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                    EFUZ.Entities.Directory_Stations uz_station = uz_directory.GetStationsOfCodeCS(code_cs);
                    if (uz_station != null)
                    {
                        // По указанному коду есть станция, создадим строку для внутреннего справочника станций
                        station = new Directory_Station()
                        {
                            id = 0,
                            station_name_ru = uz_station.station,
                            station_name_en = uz_station.station,
                            station_abbr_ru = uz_station.station,
                            station_abbr_en = uz_station.station,
                            exit_uz = false,
                            station_uz = true,
                            code = uz_station.code_cs
                        };
                        ef_station.Add(station);
                        int result = ef_station.Save();
                    }
                }
                return station != null ? station.id : 0; // 0 - возвращается если поиск не дал результатов 
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetID_Directory_StationOfCodeCS(code_cs={0},add={1})", code_cs, add), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Определить id станции из справочника "ВНУТРЕННИХ СТАНЦИЙ ПРЕДПРИЯТИЯ" системы IDS  по 4-x значному коду станции УЗ (по 4-x значному коду происходит коррекция на код с контрольной суммой), 
        /// если станция отсутствует: (add = true)  - добавить в справочник новую строку по данным справочника "СТАНЦИЙ УЗ"; (add = false) строка не добавляется;
        /// Результат id строки справочника "ВНУТРЕННИХ СТАНЦИЙ ПРЕДПРИЯТИЯ" или 0:строка не найдена; -1: Ошибка;
        /// </summary>
        /// <param name="code"></param>
        /// <param name="add"></param>
        /// <returns></returns>
        public int GetID_Directory_StationOfCodeCorrect(int code, bool add)
        {
            try
            {
                UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                int code_station_from = uz_directory.GetCodeCSCorrectStations(code, false);
                return GetID_Directory_StationOfCodeCS(code_station_from, add);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetID_Directory_StationOfCodeCorrect(code={0},add={1})", code, add), servece_owner, eventID);
                return -1;
            }
        }
        #endregion

        #region СПРАВОЧНИК КОДОВ ГРУЗОПОЛУЧАТЕЛЕЙ ПРЕДПРИЯТИЯ (IDS.Directory_Consignee )
        /// <summary>
        /// Проверим соответсвует указаный код грузополучателя коду грузополучателя в справочнике
        /// </summary>
        /// <param name="auxiliary"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public bool IsConsignee(bool auxiliary, int code)
        {
            Directory_Consignee consignee = ef_сonsignee.Context.Where(c => c.auxiliary == auxiliary & c.code == code).FirstOrDefault();
            return consignee != null ? true : false;
        }
        #endregion

        #region СПРАВОЧНИК Стран (IDS.Directory_Countrys )
        /// <summary>
        /// Получить id страны 
        /// </summary>
        /// <param name="code_cs"></param>
        /// <param name="add"></param>
        /// <returns></returns>
        public int GetID_Directory_CountrysOfAdm(int adm, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_Countrys country = ef_countrys.Context.Where(c => c.code_sng == adm).FirstOrDefault();
                if (country == null)
                {
                    UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                    //TODO: доработать формирование справочника автоматически через библиотеку УЗ
                }
                return country != null ? country.id : 0; // 0 - возвращается если поиск не дал результатов 
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetID_Directory_CountrysOfAdm(adm={0},add={1})", adm, add), servece_owner, eventID);
                return -1;
            }
        }
        #endregion

        #region СПРАВОЧНИК РОД ВАГОНА (IDS.Directory_GenusWagons )

        public int GetID_Directory_GenusWagonsOfRod(int? rod, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_GenusWagons genus = ef_genus.Context.Where(g => g.rod_uz == rod & g.rod_default == true).FirstOrDefault();
                if (genus == null)
                {
                    UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                    //TODO: доработать формирование справочника автоматически через библиотеку УЗ
                }
                return genus != null ? genus.id : 0; // 0 - возвращается если поиск не дал результатов 
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetID_Directory_GenusWagonsOfRod(rod={0},add={1})", rod, add), servece_owner, eventID);
                return -1;
            }
        }

        public bool isDirectory_GenusWagons(int id_genus, int? rod)
        {
            try
            {
                Directory_GenusWagons genus = ef_genus.Context.Where(g => g.id == id_genus & g.rod_uz == rod).FirstOrDefault();
                return genus != null ? true : false;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("isDirectory_GenusWagons(id_genus={0},rod={1})", id_genus, rod), servece_owner, eventID);
                return false;
            }
        }

        #endregion

        #region СПРАВОЧНИК ВЛАДЕЛЬЦЕВ ВАГОНА (IDS.Directory_OwnersWagons )

        public int GetID_Directory_OwnersWagonsOfName(string name, bool add, string user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name)) return 0;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_OwnersWagons owner = ef_owner.Context.Where(g => g.owner_ru.ToUpper() == name.ToUpper()).FirstOrDefault();
                if (owner == null)
                {
                    owner = new Directory_OwnersWagons()
                    {
                        id = 0,
                        owner_ru = name.Trim(),
                        owner_en = name.Trim(),
                        abbr_ru = name.Substring(0, name.Length > 20 ? 20 : name.Length).Trim(),
                        abbr_en = name.Substring(0, name.Length > 20 ? 20 : name.Length).Trim(),
                        local_use = false,
                        create = DateTime.Now,
                        create_user = user,
                    };
                    ef_owner.Add(owner);
                    int res = ef_owner.Save();
                }
                return owner != null ? owner.id : 0; // 0 - возвращается если поиск не дал результатов 
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetID_Directory_OwnersWagonsOfName(name={0},add={1})", name, add), servece_owner, eventID);
                return -1;
            }
        }

        #endregion

        #region СПРАВОЧНИК ОПЕРАТОРОВ (IDS.Directory_OperatorsWagons )

        public int? GetID_Directory_OperatorsWagonsOfName(string name, bool add, string user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name)) return null;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_OperatorsWagons oper = ef_operator.Context.Where(g => g.operators_ru.ToUpper() == name.ToUpper()).FirstOrDefault();
                if (oper == null)
                {
                    oper = new Directory_OperatorsWagons()
                    {
                        id = 0,
                        operators_ru = name.Trim(),
                        operators_en = name.Trim(),
                        abbr_ru = name.Substring(0, name.Length > 20 ? 20 : name.Length).Trim(),
                        abbr_en = name.Substring(0, name.Length > 20 ? 20 : name.Length).Trim(),
                        local_use = false,
                        paid = false,
                        rop = false,
                        color = null,
                        create = DateTime.Now,
                        create_user = user,
                    };
                    ef_operator.Add(oper);
                    int res = ef_operator.Save();
                }
                return oper != null ? oper.id : 0; // 0 - возвращается если поиск не дал результатов 
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetID_Directory_OwnersWagonsOfName(name={0},add={1})", name, add), servece_owner, eventID);
                return -1;
            }
        }

        #endregion

        #region СПРАВОЧНИК ВАГОНОВ НОВЫЙ (IDS.Directory_Wagons)
        /// <summary>
        /// проверка номера вагона на контрольную сумму
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        //public bool IsCorrectNumCar(int num)
        //{
        //    try
        //    {
        //        if (num < 10000000) return false;
        //        if (num > 99999999) return false;

        //        string number = num.ToString().Remove(num.ToString().Length - 1);
        //        int cs = int.Parse(num.ToString().Remove(0, num.ToString().Length - 1));
        //        char[] array = number.ToCharArray();
        //        int[] kof = new int[7] { 2, 1, 2, 1, 2, 1, 2 };
        //        int result = 0;
        //        int index = 0;
        //        foreach (char n in array)
        //        {
        //            int n_i = int.Parse(n.ToString());
        //            int res_i = n_i * kof[index];
        //            index++;
        //            // скорректируем
        //            if (res_i > 9)
        //            {
        //                string res_kor_i = res_i.ToString();
        //                res_i = int.Parse(res_kor_i[0].ToString()) + int.Parse(res_kor_i[1].ToString());
        //            }
        //            result += res_i;
        //        }

        //        result = result + cs;

        //        double ost = result % 10.0;
        //        return ost == 0.0 ? true : false;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("IsCorrectNumCar(num={0})", num), servece_owner, eventID);
        //        return false;
        //    }
        //}
        /// <summary>
        /// Операция обновления вагона (с обязателным обновлением основной информации из справочника УЗ) в справочнике ИДС 
        /// (если вагона нет создаст вагон и первую аренду по входным данным и данным УЗ, МОРС)
        /// </summary>
        /// <param name="num"></param>
        /// <param name="adm"></param>
        /// <param name="rod"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Wagons OperationCreateUpdateWagon(int num, int adm, int? rod, int kol_os, string usl_tip, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                Directory_Wagons wagon = OperationCreateUpdateWagon(ref context, num, adm, rod, kol_os, usl_tip, user);
                int result = context.SaveChanges();
                if (result > 0)
                {
                    EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(context);
                    wagon = ef_wag.Refresh(wagon);
                    return wagon;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateUpdateWagon(num={0}, adm={1}, rod={2}, kol_os={3}, usl_tip={4}, user={5})",
                    num, adm, rod, kol_os, usl_tip, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Операция обновления вагона указанного контекста (с обязателным обновлением основной информации из справочника УЗ) в справочнике ИДС 
        /// (если вагона нет создаст вагон и первую аренду по входным данным и данным УЗ, МОРС)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="num"></param>
        /// <param name="adm"></param>
        /// <param name="rod"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Wagons OperationCreateUpdateWagon(ref EFDbContext context, int num, int adm, int? rod, int kol_os, string usl_tip, string user)
        {
            try
            {
                //TODO: Проверка номера вагона
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

                IDSMORS mors = new IDSMORS(this.servece_owner);                 // Подключим справочник МОРС
                WebAPIClientUZ_GOV client = new WebAPIClientUZ_GOV(this.servece_owner); // Подключим WebAPI справочник УЗ

                // Определим справочные данные из системы МОРС
                CardsWagons card = mors.GetCardsWagonsOfNum(num);
                // Получим информацию из БД УЗ
                UZWagonInfo info = client.GetInfoWagonOfNum(num);
                // Определим основные данные из УЗ и МОРС
                int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
                // Определим АДМ -> id_countrys
                Directory_Railway dir_rw = (info != null ? GetDirectory_RailwayOfNameAdm(info.admin) : null);
                int id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
                // род вагона
                int id_genus = GetID_Directory_GenusWagonsOfRod(rod, true, user);
                // Определим владельца
                int id_owner = (info != null ? GetID_Directory_OwnersWagonsOfName(info.owner, true, user) : 0);   // Владелец
                // Определим оператора УЗ
                int? id_operator_uz = (info != null ? GetID_Directory_OperatorsWagonsOfName(info.operat, true, user) : 0);// Оператор по справочнику УЗ

                bool? bit_warning; // по умолчанию выставить

                EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(context);

                // Получим вагон из справочника
                //Directory_Wagons wagon = context.Directory_Wagons.Where(c => c.num == num).FirstOrDefault();
                Directory_Wagons wagon = ef_wag.Context.Where(c => c.num == num).ToList().FirstOrDefault();
                if (wagon == null)
                {
                    // Вагона нет, создадим вагон
                    wagon = new Directory_Wagons()
                    {
                        num = num,
                        id_countrys = id_countrys,
                        id_genus = id_genus > -1 ? id_genus : 0,
                        id_owner = id_owner > -1 ? id_owner : 0,
                        // Бит внимание выставим всегда на новые вагоны
                        bit_warning = true,
                        id_operator = id_operator_uz > -1 ? id_operator_uz : null,
                        change_operator = DateTime.Now,
                        gruzp = (info != null && info.carrying_capacity != null ? (double)info.carrying_capacity : 0),
                        tara = (info != null && info.tara != null ? (double?)info.tara : null),
                        kol_os = kol_os,
                        usl_tip = usl_tip,
                        date_rem_uz = (info != null ? info.repair_date : null),
                        date_rem_vag = null,
                        id_type_ownership = id_type_ownership,
                        factory_number = null,
                        inventory_number = null,
                        year_built = null,
                        exit_ban = null,
                        sign = null,
                        note = (info != null ? "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : "") : "Ошибка подключения к БД УЗ"),
                        sobstv_kis = null, // TODO: ненужно
                        closed_route = (info != null && info.closed_route != null ? true : false), // если стоит плюсик 
                        new_construction = (info != null ? info.new_construction : null),
                        create = DateTime.Now,
                        create_user = user,
                    };
                    // Если вагон создается в справочнике первая аренда согласно даным УЗ
                    Directory_WagonsRent wagon_rent = new Directory_WagonsRent()
                    {
                        id = 0,
                        num = num,
                        id_operator = null, // не указываем оператора
                        id_limiting = null,
                        rent_start = null, // не указываем время
                        rent_end = null,
                        create = DateTime.Now,
                        create_user = user,
                        parent_id = null,
                    };
                    wagon.Directory_WagonsRent.Add(wagon_rent);
                    ef_wag.Add(wagon);
                    //context.Entry(wagon).State = System.Data.Entity.EntityState.Added;

                }
                else
                {
                    var id_operator = wagon.id_operator;
                    var change_operator = wagon.change_operator;
                    // Определим изменение оператора УЗ
                    if ((wagon.id_operator == null && id_operator_uz != null) || (wagon.id_operator != null && wagon.id_operator != id_operator_uz))
                    {
                        // Оператор новый
                        id_operator = id_operator_uz;
                        change_operator = DateTime.Now;
                        bit_warning = true;
                    }
                    else
                    {
                        // Оператор старый
                        bit_warning = false;
                    }
                    // Установим бит внимание
                    if (id_genus == 0 || id_countrys == 0)
                    {
                        bit_warning = true;
                    }
                    // Вагона есть обновим
                    wagon.id_countrys = (wagon.id_countrys == 0 && id_countrys > 0 ? id_countrys : wagon.id_countrys);
                    wagon.id_genus = (wagon.id_genus == 0 && id_genus > 0 ? id_genus : wagon.id_genus);
                    wagon.id_owner = (wagon.id_owner != id_owner ? id_owner : wagon.id_owner);
                    wagon.bit_warning = bit_warning;
                    wagon.change_operator = change_operator;
                    //wagon.sobstv_kis = null;
                    wagon.id_operator = id_operator;
                    wagon.kol_os = (wagon.kol_os == 0 && kol_os > 0 ? kol_os : wagon.kol_os);
                    wagon.usl_tip = (wagon.usl_tip == null && usl_tip != null ? usl_tip : wagon.usl_tip);
                    //wagon.date_rem_vag = wagon.date_rem_vag;
                    wagon.id_type_ownership = (id_type_ownership != null && wagon.id_type_ownership == null && id_type_ownership != wagon.id_type_ownership ? id_type_ownership : wagon.id_type_ownership);
                    //wagon.sign = wagon.sign;
                    wagon.change = DateTime.Now;
                    wagon.change_user = user;
                    if (info != null)
                    {
                        wagon.date_rem_uz = info.repair_date;
                        wagon.gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : wagon.gruzp;
                        wagon.tara = info.tara != null ? (double?)info.tara : wagon.tara;
                        wagon.note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : "");
                        wagon.closed_route = info.closed_route != null ? true : false;// если стоит плюсик 
                        wagon.new_construction = info.new_construction;
                    }
                    ef_wag.Update(wagon);
                    //context.Entry(wagon).State = System.Data.Entity.EntityState.Modified;
                }
                // вернем вагон
                return wagon;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateUpdateWagon(context={0}, num={1}, adm={2}, rod={3}, kol_os={4}, usl_tip={5}, user={6})",
                    context, num, adm, rod, kol_os, usl_tip, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить строку справочника вагона 
        /// </summary>
        /// <param name="num"></param>
        /// <param name="id_countrys"></param>
        /// <param name="id_genus"></param>
        /// <param name="gruzp"></param>
        /// <param name="tara"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="date_rem_vag"></param>
        /// <param name="id_type_ownership"></param>
        /// <param name="sign"></param>
        /// <param name="factory_number"></param>
        /// <param name="inventory_number"></param>
        /// <param name="year_built"></param>
        /// <param name="exit_ban"></param>
        /// <param name="id_operator"></param>
        /// <param name="start_rent"></param>
        /// <param name="id_limiting"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon OperationUpdateWagon(int num, int id_countrys, int id_genus, double? gruzp, double? tara, int kol_os, string usl_tip,
            DateTime? date_rem_vag, int? id_type_ownership, int? sign, string factory_number, string inventory_number, int? year_built, bool? exit_ban, int? id_operator, DateTime? start_rent, int? id_limiting, string user)
        {
            OperationResultWagon result = new OperationResultWagon();
            try
            {
                EFDbContext context = new EFDbContext();
                result.SetResultOperation(OperationUpdateWagon(ref context, num, id_countrys, id_genus, gruzp, tara, kol_os, usl_tip, date_rem_vag,
                    id_type_ownership, sign, factory_number, inventory_number, year_built, exit_ban, id_operator, start_rent, id_limiting, user), num);
                // Если нет ошибок тогда обновим базу
                if (result.error == 0)
                {
                    result.SetResult(context.SaveChanges());
                }
                else
                {
                    result.SetResult((int)errors_ids_dir.cancel_save_changes); // Ошибка изменение было отменено
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagon(num={0}, id_countrys={1}, id_genus={2}, gruzp={3}, tara={4}, kol_os={5}, usl_tip={6}, date_rem_vag={7}, id_type_ownership={8}, sign={9}, factory_number={10}, inventory_number={11}, year_built={12}, exit_ban={13}, id_operator={14}, start_rent={15}, id_limiting={16}, user={17})",
                  num, id_countrys, id_genus, gruzp, tara, kol_os, usl_tip, date_rem_vag, id_type_ownership, sign, factory_number, inventory_number, year_built, exit_ban, id_operator, start_rent, id_limiting, user), servece_owner, eventID);
                result.SetResult((int)errors_ids_dir.global);// Ошибка нет списка id
            }
            return result;
        }
        /// <summary>
        /// Обновить информацию по вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="num"></param>
        /// <param name="adm"></param>
        /// <param name="rod"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateWagon(ref EFDbContext context, int num, int id_countrys, int id_genus, double? gruzp, double? tara, int kol_os, string usl_tip,
            DateTime? date_rem_vag, int? id_type_ownership, int? sign, string factory_number, string inventory_number, int? year_built, bool? exit_ban, int? id_operator, DateTime? start_rent, int? id_limiting, string user)
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
                // Вагоны
                EFDirectory_Wagons ef_vag = new EFDirectory_Wagons(context);
                // Получим вагон
                Directory_Wagons wagon = ef_vag.Context.Where(w => w.num == num).FirstOrDefault();
                if (wagon == null) return (int)errors_ids_dir.not_wagon_of_db;// Нет вагона в базе данных
                bool bit_warning = false;
                // Установим бит внимание
                if (id_genus == 0 || id_countrys == 0)
                {
                    bit_warning = true;
                }
                // Вагона есть обновим
                wagon.id_countrys = ((wagon.id_countrys == 0 && id_countrys > 0) || (wagon.id_countrys > 0 && id_countrys > 0 && wagon.id_countrys != id_countrys) ? id_countrys : wagon.id_countrys);
                wagon.id_genus = (((wagon.id_genus == 0 && id_genus > 0) || (wagon.id_genus > 0 && id_genus > 0 && wagon.id_genus != id_genus)) ? id_genus : wagon.id_genus);
                //wagon.bit_warning = bit_warning;
                wagon.kol_os = ((wagon.kol_os == 0 && kol_os > 0) || (wagon.kol_os > 0 && kol_os > 0 && wagon.kol_os != kol_os) ? kol_os : wagon.kol_os);
                wagon.usl_tip = (wagon.usl_tip == null && usl_tip != null ? usl_tip : (wagon.usl_tip != null && usl_tip == null ? null :  wagon.usl_tip));
                wagon.date_rem_vag = date_rem_vag;
                wagon.id_type_ownership = id_type_ownership;
                wagon.sign = sign;
                wagon.gruzp = gruzp != null ? (double)gruzp : wagon.gruzp;
                wagon.tara = tara != null ? (double?)tara : wagon.tara;
                wagon.factory_number = factory_number;
                wagon.inventory_number = inventory_number;
                wagon.year_built = year_built;
                wagon.exit_ban = exit_ban;
                wagon.bit_warning = bit_warning; // Бит внимание
                wagon.change = DateTime.Now;
                wagon.change_user = user;
                // Обновим оператора
                int result_rent = OperationUpdateWagonRent(ref context, ref wagon, (id_operator != null && start_rent != null ? true : false), id_operator, start_rent, true, id_limiting, user);
                // Применим обновление
                ef_wag.Update(wagon);
                // если все Ок тогда 1 
                return result_rent > 0 ? 1 : result_rent; // Вернем результат
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagon(context={0}, num={1}, id_countrys={2}, id_genus={3}, gruzp={4}, tara={5}, kol_os={6}, usl_tip={7}, date_rem_vag={8}, id_type_ownership={9}, sign={10}, factory_number={11}, inventory_number={12}, year_built={13}, exit_ban={14}, id_operator={15}, start_rent={16}, id_limiting={17}, user={18})",
                 context, num, id_countrys, id_genus, gruzp, tara, kol_os, usl_tip, date_rem_vag, id_type_ownership, sign, factory_number, inventory_number, year_built, exit_ban, id_operator, start_rent, id_limiting, user), servece_owner, eventID);
                return (int)errors_ids_dir.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция обновления вагона указанного контекста (с обязателным обновлением основной информации из справочника УЗ) в справочнике ИДС 
        /// (если вагона нет создаст вагон и первую аренду по данным УЗ, МОРС)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="num"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Wagons OperationCreateUpdateWagon(ref EFDbContext context, int num, string user)
        {
            try
            {
                //TODO: Проверка номера вагона

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
                return OperationCreateUpdateWagon(ref context, num, 0, null, 0, null, user);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateUpdateWagon(context={0}, num={1}, user={2})", context, num, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновим аренду по указанному вагону
        /// </summary>
        /// <param name="context"></param>
        /// <param name="wagon"></param>
        /// <param name="edit_operator"></param>
        /// <param name="id_operator"></param>
        /// <param name="start_rent"></param>
        /// <param name="edit_limiting"></param>
        /// <param name="id_limiting"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateWagonRent(ref EFDbContext context, ref Directory_Wagons wagon, bool edit_operator, int? id_operator, DateTime? start_rent, bool edit_limiting, int? id_limiting, string user)
        {
            try
            {
                // Найдем открытую аренду
                Directory_WagonsRent rent_last = wagon.Directory_WagonsRent.Where(r => r.rent_end == null).OrderByDescending(c => c.id).FirstOrDefault();

                // Проверим если аренды есть а открытой нет, тогда ошибка последняя аренда закрыта
                if (wagon.Directory_WagonsRent.Count() > 0 && rent_last == null) return (int)errors_ids_dir.not_open_rent;// Нет открытой аренды

                // Начнем обновление 
                // Проверим создавать новую аренду
                if (rent_last == null || (edit_operator && rent_last != null && rent_last.id_operator != null && rent_last.id_operator != id_operator))
                {
                    // Создаем новую строку аренды
                    // Если есть старая
                    if (rent_last != null)
                    {
                        // Закроем старую если не закрыта
                        if (rent_last.rent_start > start_rent) return (int)errors_ids_dir.error_set_date;// Ошибка дата конца аренды меньше или равна началу аренды
                        rent_last.rent_end = rent_last.rent_end == null ? start_rent : rent_last.rent_end;
                    }
                    // Оператор новый создадим новую строку аренды
                    Directory_WagonsRent new_rent = new Directory_WagonsRent()
                    {
                        id = 0,
                        num = wagon.num,
                        id_operator = id_operator,
                        id_limiting = edit_limiting ? id_limiting : (rent_last != null ? rent_last.id_limiting : null),
                        rent_start = start_rent,
                        rent_end = null,
                        create = (DateTime)start_rent,
                        create_user = user,
                        change = null,
                        change_user = null,
                        parent_id = rent_last != null ? (int?)rent_last.id : null,
                    };
                    wagon.Directory_WagonsRent.Add(new_rent);
                }
                else
                {
                    // Правим оператора
                    if (edit_operator)
                    {
                        // Правим первую аренду
                        if (rent_last.id_operator == null)
                        {
                            rent_last.id_operator = id_operator;
                        }
                        if (rent_last.rent_end != null)
                        {
                            // Если аренда закрыта
                            if (start_rent > rent_last.rent_end) return (int)errors_ids_dir.error_set_date;// Ошибка дата конца аренды меньше или равна началу аренды
                        }
                        // Оператор старый обновим дату аренды
                        if (rent_last.rent_start == null || rent_last.rent_start >= start_rent)
                        {
                            rent_last.rent_start = start_rent;
                            if (rent_last.Directory_WagonsRent2 != null)
                            {
                                rent_last.Directory_WagonsRent2.rent_end = start_rent;
                            }
                        }
                    }
                    // Правим лимит
                    if (edit_limiting)
                    {
                        rent_last.id_limiting = id_limiting;
                    }
                }
                if (rent_last != null)
                {
                    // Оновим штамп изменений
                    rent_last.change = start_rent;
                    rent_last.change_user = user;
                }
                //Установить бит требующий внимания
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagonRent(context={0}, vagon={1}, edit_operator={2}, id_operator ={3}, start_rent={4}, edit_limiting ={5}, id_limiting={6},user={7})",
                   context, wagon, edit_operator, id_operator, start_rent, edit_limiting, id_limiting, user), servece_owner, eventID);
                return (int)errors_ids_dir.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция обновления информации на вагон указанного контекста  по оператору или ограничению (с обязателным обновлением основной информации из справочника УЗ) в справочнике ИДС 
        /// (если вагона нет создаст вагон и первую аренду по данным УЗ, МОРС)
        /// </summary>
        /// <param name="context"></param>
        /// <param name="num"></param>
        /// <param name="edit_operator"></param>
        /// <param name="id_operator"></param>
        /// <param name="start_rent"></param>
        /// <param name="edit_limiting"></param>
        /// <param name="id_limiting"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpdateWagon(ref EFDbContext context, int num, bool edit_operator, int? id_operator, DateTime? start_rent, bool edit_limiting, int? id_limiting, string user)
        {
            try
            {
                // Проверим на ошибки
                if ((!edit_operator && !edit_limiting) || (edit_operator && id_operator == null && start_rent == null)
                    //|| (edit_limiting && id_limiting == null)
                    )
                {
                    return (int)errors_ids_dir.error_input_value;// Ошибка входных данных
                }
                // Проверка контекста
                if (context == null)
                {
                    context = new EFDbContext();
                }
                // Проверим наличие вагона в базе ИДС если нет создать по данным УЗ если есть обновить по данным УЗ
                Directory_Wagons wagon = OperationCreateUpdateWagon(ref context, num, user);
                // Проверим вагон в базе 
                if (wagon == null) return (int)errors_ids_dir.not_wagon_of_db;// Указаного вагона нет в базе
                // Добавим оператора
                int result_rent = OperationUpdateWagonRent(ref context, ref wagon, edit_operator, id_operator, start_rent, edit_limiting, id_limiting, user);
                // Установка бита требуется внимание
                if (wagon.id_operator == null || wagon.id_countrys == 0 || wagon.id_countrys == 0)
                {
                    wagon.bit_warning = true;
                }
                else
                {
                    wagon.bit_warning = false;
                }
                // если все Ок тогда 1 
                return result_rent > 0 ? 1 : result_rent; // Вернем результат
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagons(context={0}, num={1}, edit_operator={2}, id_operator ={3}, start_rent={4}, edit_limiting ={5}, id_limiting={6},user={7})",
                   context, num, edit_operator, id_operator, start_rent, edit_limiting, id_limiting, user), servece_owner, eventID);
                return (int)errors_ids_dir.global;// Возвращаем id=-1 , Ошибка
            }
        }
        /// <summary>
        /// Операция обновления справочника вагонов
        /// </summary>
        /// <param name="list_nums"></param>
        /// <param name="edit_operator"></param>
        /// <param name="id_operator"></param>
        /// <param name="start_rent"></param>
        /// <param name="edit_limiting"></param>
        /// <param name="id_limiting"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OperationResultWagon OperationUpdateWagons(List<int> list_nums, bool edit_operator, int? id_operator, DateTime? start_rent, bool edit_limiting, int? id_limiting, string user)
        {
            OperationResultWagon result = new OperationResultWagon();
            try
            {
                //DateTime start = DateTime.Now;
                // Проверим на ошибки
                if (list_nums == null)
                {
                    result.SetResult((int)errors_ids_dir.not_list_nums);// Ошибка нет списка номеров
                }

                if ((!edit_operator && !edit_limiting) || (edit_operator && id_operator == null && start_rent == null)
                    //|| (edit_limiting && id_limiting == null)
                    )
                {
                    result.SetResult((int)errors_ids_dir.error_input_value);// Ошибка нет данных по оператору
                }

                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                foreach (int num in list_nums)
                {
                    int res = OperationUpdateWagon(ref context, num, edit_operator, id_operator, start_rent, edit_limiting, id_limiting, user);
                    result.SetResultOperation(res, num);
                }
                // Если нет ошибок тогда обновим базу
                if (result.error == 0)
                {
                    int res_upd = context.SaveChanges();
                    if (res_upd > 0) {
                        // Обновить информацию по прибытию этих вагонов
                        IDS_Directory ids_dir = new IDS_Directory(servece_owner);
                        foreach (int num in list_nums) {
                            ids_dir.UpdateArrivalRentWagon(num, (DateTime)start_rent, user);
                        }
                    }
                    result.SetResult(res_upd);
                }
                else
                {
                    result.SetResult((int)errors_ids_dir.cancel_save_changes); // Ошибка изменение было отменено
                }
                string mess = String.Format("Справочник вагонов, смена оператора {0} или ограничения погрузки {1} по группе вагонов. Код выполнения = {2}. Список вагонов = {3}, новый оператор = {4}, начало аренды = {5}, ограничение погрузки = {6}. Результат выполнения [Кол вагонов = {7}, ошибок выполнения = {8}].",
                    edit_operator, edit_limiting, result.result, String.Join(";", list_nums.ToArray()), id_operator, id_limiting, start_rent, list_nums.Count(), result.error);
                mess.WarningLog(servece_owner, eventID);
                mess.EventLog(result.result < 0 ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID);
                //DateTime stop = DateTime.Now;
                //servece_owner.ServicesToLog(eventID, String.Format("Операция смены оператора по группе вагонов"), start, stop, result.result);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWagons(list_nums={0}, edit_operator={1}, id_operator ={2}, start_rent={3}, edit_limiting ={4}, id_limiting={5},user={6})",
                    list_nums, edit_operator, id_operator, start_rent, edit_limiting, id_limiting, user), servece_owner, eventID);
                result.SetResult((int)errors_ids_dir.global);// Ошибка нет списка id
            }
            return result;
        }
        #endregion

        #region СПРАВОЧНИК ПУТЕЙ (IDS.Directory_Ways)
        /// <summary>
        /// Выполнить операцию автоматической корекции позиции пути в парке
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationAutoPositionWayOfPark(ref EFDbContext context, int id_station, int id_park, string user)
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
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                // Получим пути удаленные и активные по даной станции и парку
                List<Directory_Ways> ways_delete = ef_way.Context.Where(w => w.id_station == id_station && w.id_park == id_park && w.way_delete != null).ToList();
                List<Directory_Ways> ways_active = ef_way.Context.Where(w => w.id_station == id_station && w.id_park == id_park && w.way_delete == null).ToList();
                foreach (Directory_Ways way in ways_delete.ToList())
                {
                    way.position_way = 0;
                    way.note = "Удален, но остались архивные ссылки";
                    ef_way.Update(way);
                }
                int position = 1;
                foreach (Directory_Ways way in ways_active.OrderBy(w => w.position_way).ToList())
                {
                    way.position_way = position;
                    ef_way.Update(way);
                    way.note = null;
                    position++;
                }
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationAutoPositionWayOfPark(context={0}, id_station={1}, id_park={2}, user={3})",
                    context, id_station, id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Выполнить операцию автоматической корекции позиции пути в парке
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationAutoPositionWayOfPark(int id_station, int id_park, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int result = OperationAutoPositionWayOfPark(ref context, id_station, id_park, user);
                if (result > 0)
                {
                    return context.SaveChanges();
                }
                else return result;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationAutoPositionWayOfPark(id_station={0}, id_park={1}, user={2})",
                    id_station, id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Выполнить операцию переноса указаного пути на любую позицию
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <param name="position"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationSetPositionWayOfPark(ref EFDbContext context, int id, int position, string user)
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

                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                Directory_Ways way = ef_way.Context.Where(w => w.id == id).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db; // Нет пути
                if (way.position_way == position) return 0;                 // Пропустить новая позиция соответсвует старой
                // Получим все пути по даной станции и парку
                List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null).ToList();
                if (position <= 0 || ways.Count() < position) return (int)errors_base.input_position_error; // Ошибка, неправильно указана позиция
                if (way.position_way < position)
                {
                    // Сдвинуть вверх
                    int current_position = way.position_way;
                    int start_position = way.position_way + 1;
                    int stop_position = position;
                    // сместим промежуточные позиции вверх
                    do
                    {
                        Directory_Ways way_edit = ways.Where(w => w.position_way == start_position).FirstOrDefault();
                        way_edit.position_way = current_position;
                        ef_way.Update(way_edit);
                        current_position++;
                        start_position++;
                    }
                    while (current_position < stop_position);
                    way.position_way = position;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                }
                else
                {
                    // сдвинуть вниз
                    int res_down = OperationDownPositionWayOfPark(ref context, ways, way.position_way, position, user);
                    way.position_way = position;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                }

                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationSetPositionWayOfPark(context={0}, id={1}, position={2}, user={3})",
                    context, id, position, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига позиций вниз
        /// </summary>
        /// <param name="context"></param>
        /// <param name="ways"></param>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDownPositionWayOfPark(ref EFDbContext context, List<Directory_Ways> ways, int start, int? stop, string user)
        {
            try
            {
                if (ways == null || ways.Count() == 0) return 0;
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
                // если конечная позиция не указана тогда просто сдвинуть в низ с определенной позиции
                if (stop == null)
                {
                    Directory_Ways last_ways = ways.OrderByDescending(w => w.position_way).FirstOrDefault();
                    stop = last_ways.position_way;
                }

                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                // сдвинуть вниз
                int current_position = (int)stop + 1;
                int start_position = (int)stop;
                int stop_position = start;
                int count = 0;
                // сместим промежуточные позиции вверх
                do
                {
                    Directory_Ways way_edit = ways.Where(w => w.position_way == start_position).FirstOrDefault();
                    if (way_edit != null)
                    {
                        way_edit.position_way = current_position;
                        way_edit.change_user = user;
                        way_edit.change = DateTime.Now;
                        ef_way.Update(way_edit);
                    }
                    current_position--;
                    start_position--;
                    count++;
                }
                while (start_position >= stop_position);
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDownPositionWayOfPark(context={0}, ways={1}, start={2}, stop={2}, user={3})",
                    context, ways, start, stop, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига позиций вверх
        /// </summary>
        /// <param name="context"></param>
        /// <param name="ways"></param>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUpPositionWayOfPark(ref EFDbContext context, List<Directory_Ways> ways, int start, int? stop, string user)
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
                // если конечная позиция не указана тогда просто сдвинуть вверх с определенной позиции
                if (stop == null)
                {
                    Directory_Ways last_ways = ways.OrderByDescending(w => w.position_way).FirstOrDefault();
                    stop = last_ways.position_way;
                }

                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                // сдвинуть вниз
                //int current_position = start - 1;
                //int start_position = start;
                //int stop_position = (int)stop;
                int current_position = start;
                int start_position = start + 1;
                int stop_position = (int)stop;
                int count = 0;
                // сместим промежуточные позиции вверх
                do
                {
                    Directory_Ways way_edit = ways.Where(w => w.position_way == start_position).FirstOrDefault();
                    if (way_edit != null)
                    {
                        way_edit.position_way = current_position;
                        way_edit.change_user = user;
                        way_edit.change = DateTime.Now;
                        ef_way.Update(way_edit);
                    }
                    current_position++;
                    start_position++;
                    count++;
                }
                while (start_position <= stop_position);
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpPositionWayOfPark(context={0}, ways={1}, start={2}, stop={2}, user={3})",
                    context, ways, start, stop, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция свига на одни позицию вниз
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDown1PositionWayOfPark(ref EFDbContext context, int id, string user)
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

                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                Directory_Ways way = ef_way.Context.Where(w => w.id == id).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db; // Нет пути
                // Получим все пути по даной станции и парку
                Directory_Ways way_last = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null).OrderByDescending(p => p.position_way).FirstOrDefault();
                if (way_last.position_way == way.position_way) return 0; // Отмена, дошли до нижнего придела.
                Directory_Ways way_down = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null && w.position_way == way.position_way + 1).FirstOrDefault();
                way.position_way++;
                way.change_user = user;
                way.change = DateTime.Now;
                ef_way.Update(way);
                if (way_down != null)
                {
                    way_down.position_way--;
                    way_down.change_user = user;
                    way_down.change = DateTime.Now;
                    ef_way.Update(way_down);
                }
                return 2;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDown1PositionWayOfPark(context={0}, id={1}, user={2})",
                    context, id, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция свига на одни позицию вниз
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDown1PositionWayOfPark(int id, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int result = OperationDown1PositionWayOfPark(ref context, id, user);
                if (result > 0)
                {
                    return context.SaveChanges();
                }
                else return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDown1PositionWayOfPark(id={0}, user={1})",
                    id, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига на одну позицию вверх
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUp1PositionWayOfPark(ref EFDbContext context, int id, string user)
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

                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                Directory_Ways way = ef_way.Context.Where(w => w.id == id).FirstOrDefault();
                if (way == null) return (int)errors_base.not_dir_way_of_db; // Нет пути
                // Получим все пути по даной станции и парку
                if (way.position_way == 1) return 0; // Отмена, дошли до верхнего придела.
                Directory_Ways way_up = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null && w.position_way == way.position_way - 1).FirstOrDefault();
                way.position_way--;
                way.change_user = user;
                way.change = DateTime.Now;
                ef_way.Update(way);
                if (way_up != null)
                {
                    way_up.position_way++;
                    way_up.change_user = user;
                    way_up.change = DateTime.Now;
                    ef_way.Update(way_up);
                }

                return 2;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUp1PositionWayOfPark(context={0}, id={1}, user={2})",
                    context, id, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига на одну позицию вверх
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUp1PositionWayOfPark(int id, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int result = OperationUp1PositionWayOfPark(ref context, id, user);
                if (result > 0)
                {
                    return context.SaveChanges();
                }
                else return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUp1PositionWayOfPark(id={0}, user={1})",
                    id, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция добавить путь
        /// </summary>
        /// <param name="way"></param>
        /// <returns></returns>
        public int OperationInsertWayOfPark(Directory_Ways way)
        {
            try
            {
                if (way == null) return (int)errors_base.not_input_value;

                EFDbContext context = new EFDbContext();
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                // Получим все пути по даной станции и парку
                List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null).OrderBy(p => p.position_way).ToList();
                Directory_Ways last_ways = ways.OrderByDescending(w => w.position_way).FirstOrDefault();
                int last_position = 0;
                if (last_ways != null)
                {
                    last_position = last_ways.position_way;
                    // Позиция парка как у последней позиции
                    way.position_park = last_ways.position_park;
                }
                else
                {
                    // Путей по станции и парку нет - новый парк
                    Directory_Ways last_position_park = ef_way.Context.Where(w => w.id_station == way.id_station && w.way_delete == null).OrderByDescending(w => w.position_park).FirstOrDefault();
                    // Парк создается заново
                    if (last_position_park != null)
                    {
                        way.position_park = last_position_park.position_park + 1;
                    }
                    else
                    {
                        way.position_park = 1;
                    }
                }
                if (way.position_way > last_position + 1) return (int)errors_base.input_position_error; // Ошибка, неправильно указана позиция 
                if (way.position_way <= last_position)
                {
                    // Требуется смещение
                    int res_down = OperationDownPositionWayOfPark(ref context, ways, way.position_way, null, way.create_user);
                }
                ef_way.Add(way);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationInsertWayOfPark(way={0})",
                    way), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция удалить путь из парка (путь будет полностью удален- если ошибка, тогда в поле "delete"- будет установлена дата удаления и путь в системе будет невидем
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_way"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDeleteWayOfPark(int id_way, string user)
        {
            try
            {
                // Проверка контекста
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                EFWagonInternalMovement ef_wim = new EFWagonInternalMovement(context);
                // Получим пути удаленные и активные по даной станции и парку
                Directory_Ways way_del = ef_way.Context.Where(w => w.id == id_way).FirstOrDefault();
                if (way_del == null) return (int)errors_base.not_dir_way_of_db; // Нет пути
                int position = way_del.position_way;
                ef_way.Delete(way_del.id);
                //
                List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == way_del.id_station && w.id_park == way_del.id_park && w.way_delete == null).OrderBy(p => p.position_way).ToList();
                Directory_Ways last_ways = ways.OrderByDescending(w => w.position_way).FirstOrDefault();
                // Попытка удалить полностью
                //int res_del_full = context.SaveChanges();
                int res_del_full = ef_way.Save();
                if (res_del_full < 0)
                {
                    //TODO: ПОСТАВИТЬ ПРОВЕРКУ НАЛИЧИЕ ВАГОНОВ НА ПУТИ
                    List<WagonInternalMovement> cars = ef_wim.Context.Where(w => w.id_way == way_del.id && w.way_end == null).ToList();
                    if (cars != null && cars.Count() > 0) return (int)errors_base.way_is_not_null; // На пути стоят вагоны
                    // Ошибка удаления 
                    way_del.way_delete = DateTime.Now;
                    way_del.position_way = 0;
                    way_del.note = "Удален но остались архивные ссылки";
                    ef_way.Update(way_del);
                    res_del_full = ef_way.Save();
                }
                // Сдвиг
                // Получим все пути по даной станции и парку
                if (position < last_ways.position_way)
                {
                    // Требуется смещение
                    //int res_down = OperationUpPositionWayOfPark(ref context, ways, position + 1, null, user);
                    int res_down = OperationUpPositionWayOfPark(ref context, ways, position, null, user);
                }
                int res_move = context.SaveChanges();
                return res_move == 0 ? res_del_full : res_move;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDeleteWayOfPark(id_way={0}, user={1})",
                    id_way, user), servece_owner, eventID);
                return -1;
            }
        }
        // Операция обновить путь 
        public int OperationUpdateWayOfPark(Directory_Ways way, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (way == null) return (int)errors_base.not_input_value;
                EFDbContext context = new EFDbContext();
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                Directory_Ways way_old = ef_way.Context.Where(w => w.id == way.id).FirstOrDefault();
                if (way_old == null) return (int)errors_base.not_input_value;
                // Получим все пути по даной станции и парку
                List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null).OrderBy(p => p.position_way).ToList();
                Directory_Ways last_ways = ways.OrderByDescending(w => w.position_way).FirstOrDefault();
                int last_position = 0;
                if (last_ways != null)
                {
                    last_position = last_ways.position_way;
                }
                // Проверим если позиции не совпадают тогда двигаем, еслинет тогда только правим
                if (way_old.id_park == way.id_park)
                {
                    if (way.position_way > last_position + 1) return (int)errors_base.input_position_error; // Ошибка, неправильно указана позиция                     
                    // Парк не меняли
                    if (way_old.position_way == 0)
                    {
                        // сдвинуть вниз с новой позиции и до конца
                        int res_down = OperationDownPositionWayOfPark(ref context, ways, way.position_way, null, user);
                    }
                    else
                    {
                        // Позиция не равна 0, смещаем
                        if (way_old.position_way != way.position_way)
                        {
                            if (way_old.position_way < way.position_way)
                            {
                                // Сдвинуть вверх
                                int res_up = OperationUpPositionWayOfPark(ref context, ways, way_old.position_way, way.position_way, user);
                            }
                            else
                            {
                                // сдвинуть вниз
                                int res_down = OperationDownPositionWayOfPark(ref context, ways, way.position_way, way_old.position_way, user);
                            }
                        }
                    }
                    // Позиция как задано
                    way_old.position_park = way.position_park;
                    way_old.position_way = way.position_way;
                }
                else
                {
                    // Парк меняли, позиция по умолчанию 1
                    //int res_down = OperationDownPositionWayOfPark(ref context, ways, 1, null, user);
                    // Определим последнюю позицию пути в новом парке
                    Directory_Ways last_position_ways = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null).OrderByDescending(w => w.position_way).FirstOrDefault();
                    // Определим последнюю позицию парка на станции                  
                    Directory_Ways last_position_park = ef_way.Context.Where(w => w.id_station == way.id_station && w.way_delete == null).OrderByDescending(w => w.position_park).FirstOrDefault();
                    // Определим новые позиции парка и пути
                    if (last_position_ways != null)
                    {
                        way_old.position_park = last_position_ways.position_park;
                        way_old.position_way = last_position_ways.position_way + 1; // Поставим в конец, парк уже есть
                    }
                    else
                    {
                        // Парк создается заново
                        if (last_position_park != null)
                        {
                            way_old.position_park = last_position_park.position_park + 1;
                        }
                        else
                        {
                            way_old.position_park = 1;
                        }
                        way_old.position_way = 1; // Поставим в начало
                    }
                }
                // Обновим данные по путь
                way_old.id_station = way.id_station;
                way_old.id_park = way.id_park;

                way_old.way_num_ru = way.way_num_ru;
                way_old.way_num_en = way.way_num_en;
                way_old.way_name_ru = way.way_name_ru;
                way_old.way_name_en = way.way_name_en;
                way_old.way_abbr_ru = way.way_abbr_ru;
                way_old.way_abbr_en = way.way_abbr_en;
                way_old.capacity = way.capacity;
                way_old.deadlock = way.deadlock;
                way_old.crossing_uz = way.crossing_uz;
                way_old.crossing_amkr = way.crossing_amkr;
                way_old.id_devision = way.id_devision;
                way_old.dissolution = way.dissolution;
                way_old.output_dissolution = way.output_dissolution;
                way_old.way_close = way.way_close;
                way_old.way_delete = way.way_delete;
                way_old.note = way.note;
                way_old.create = way.create;
                way_old.create_user = way.create_user;
                way_old.change = DateTime.Now;
                way_old.change_user = user;
                ef_way.Update(way_old);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUpdateWayOfPark(way={0}, user={1})",
                    way, user), servece_owner, eventID);
                return -1;
            }
        }
        #endregion


        #region СПРАВОЧНИК ПАРКОВ (IDS.Directory_ParkWays)
        /// <summary>
        /// Выполнить операцию автоматической корекции позиции парков по станции
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationAutoPositionParkOfStation(ref EFDbContext context, int id_station, string user)
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
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                // Получим пути удаленные и активные по даной станции и парку
                List<Directory_Ways> ways_delete = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete != null).ToList();
                List<Directory_Ways> ways_active = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete == null).ToList();
                foreach (Directory_Ways way in ways_delete.ToList())
                {
                    way.position_park = 0;
                    way.position_way = 0;
                    way.note = "Удален, но остались архивные ссылки";
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                }
                int position = 0;
                int id_park = 0;
                foreach (Directory_Ways way in ways_active.OrderBy(w => w.id_park).ToList())
                {
                    if (id_park != way.id_park)
                    {
                        position++;
                        id_park = way.id_park;
                    }
                    way.position_park = position;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                    way.note = null;
                }
                return 1;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationAutoPositionParkOfStation(context={0}, id_station={1}, user={2})",
                    context, id_station, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Выполнить операцию автоматической корекции позиции парков по станции
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationAutoPositionParkOfStation(int id_station, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int result = OperationAutoPositionParkOfStation(ref context, id_station, user);
                if (result > 0)
                {
                    return context.SaveChanges();
                }
                else return result;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationAutoPositionParkOfStation(id_station={0}, user={1})",
                    id_station, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига парка на одну позицию вверх
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUp1PositionParkOfStation(int id_station, int id_park, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int result = OperationUp1PositionParkOfStation(ref context, id_station, id_park, user);
                if (result > 0)
                {
                    return context.SaveChanges();
                }
                else return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUp1PositionParkOfStation(id_station={0}, id_park={1}, user={2})",
                    id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига парка на одну позицию вверх
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationUp1PositionParkOfStation(ref EFDbContext context, int id_station, int id_park, string user)
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
                int count = 0;
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == id_station && w.id_park == id_park).ToList();
                if (ways == null || ways.Count() == 0) return (int)errors_base.not_dir_park_station_of_db; // Нет пути
                // Получим все пути по даной станции и парку
                if (ways[0].position_park == 1) return 0; // Отмена, дошли до верхнего придела.
                int position = ways[0].position_park;
                List<Directory_Ways> ways_up = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete == null && w.position_park == position - 1).ToList();
                foreach (Directory_Ways way in ways_up)
                {
                    way.position_park = position;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                    count++;
                }
                foreach (Directory_Ways way in ways)
                {
                    way.position_park = position - 1;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                    count++;
                }
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationUp1PositionParkOfStation(context={0}, id_station={1}, id_park={2}, user={3})",
                    context, id_station, id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига парка на одну позицию вниз
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDown1PositionParkOfStation(int id_station, int id_park, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                int result = OperationDown1PositionParkOfStation(ref context, id_station, id_park, user);
                if (result > 0)
                {
                    return context.SaveChanges();
                }
                else return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDown1PositionParkOfStation(id_station={0}, id_park={1}, user={2})",
                    id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига парка на одну позицию вниз
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id_station"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDown1PositionParkOfStation(ref EFDbContext context, int id_station, int id_park, string user)
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
                int count = 0;
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == id_station && w.id_park == id_park).ToList();
                if (ways == null || ways.Count() == 0) return (int)errors_base.not_dir_park_station_of_db; // Нет пути
                // Определим последнюю позицию по количеству парков на станции
                int last_position = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete == null).GroupBy(p => p.id_park).Count();
                // Получим все пути по даной станции и парку
                if (ways[0].position_park >= last_position) return 0; // Отмена, дошли до верхнего придела.
                int position = ways[0].position_park;
                List<Directory_Ways> ways_up = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete == null && w.position_park == position + 1).ToList();
                foreach (Directory_Ways way in ways_up)
                {
                    way.position_park = position;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                    count++;
                }
                foreach (Directory_Ways way in ways)
                {
                    way.position_park = position + 1;
                    way.change_user = user;
                    way.change = DateTime.Now;
                    ef_way.Update(way);
                    count++;
                }
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDown1PositionParkOfStation(context={0}, id_station={1}, id_park={2}, user={3})",
                    context, id_station, id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Операция сдвига позиций вниз
        /// </summary>
        /// <param name="context"></param>
        /// <param name="ways"></param>
        /// <param name="start"></param>
        /// <param name="stop"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationDownPositionParkOfStation(ref EFDbContext context, List<Directory_Ways> ways, int start, int? stop, string user)
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
                // если конечная позиция не указана тогда просто сдвинуть в низ с определенной позиции
                if (stop == null)
                {
                    int last_position = ways.Where(w => w.way_delete == null).GroupBy(p => p.id_park).Count();
                    stop = last_position;
                }

                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                // сдвинуть вниз
                int current_position = (int)stop + 1;
                int start_position = (int)stop;
                int stop_position = start;
                int count = 0;
                // сместим промежуточные позиции вверх
                do
                {
                    Directory_Ways way_edit = ways.Where(w => w.position_way == start_position).FirstOrDefault();
                    way_edit.position_way = current_position;
                    way_edit.change_user = user;
                    way_edit.change = DateTime.Now;
                    ef_way.Update(way_edit);
                    current_position--;
                    start_position--;
                    count++;
                }
                while (start_position >= stop_position);
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationDownPositionWayOfPark(context={0}, ways={1}, start={2}, stop={2}, user={3})",
                    context, ways, start, stop, user), servece_owner, eventID);
                return -1;
            }
        }
        /// <summary>
        /// Добавить парк в станцию
        /// </summary>
        /// <param name="id_station"></param>
        /// <param name="position"></param>
        /// <param name="id_park"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public int OperationInsertParkOfStation(int id_station, int position, int id_park, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                EFDirectory_Ways ef_way = new EFDirectory_Ways(context);
                EFDirectory_ParkWays ef_park_ways = new EFDirectory_ParkWays(context);
                EFDirectory_Station ef_station = new EFDirectory_Station(context);
                Directory_Station station = ef_station.Context.Where(s => s.id == id_station).FirstOrDefault();
                if (station == null) return (int)errors_base.not_dir_station_of_db; // Нет указаной станции в базе данных
                Directory_ParkWays park = ef_park_ways.Context.Where(p => p.id == id_park).FirstOrDefault();
                if (park == null) return (int)errors_base.not_dir_park_of_db; // Нет указаного парка в базе данных
                // определим последнюю позицию по паркам
                int last_position = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete == null).GroupBy(p => p.id_park).Count();
                // если указаная позиция больше чем существует позиций, корректируем ее
                if (position <= last_position)
                {
                    List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == id_station && w.way_delete == null).OrderBy(p => p.position_park).ToList();
                    // Требуется смещение
                    int res_down = OperationDownPositionParkOfStation(ref context, ways, position, null, user);
                }
                else
                {
                    position = last_position + 1; // Корректируем следующая за последней.
                }




                //// Получим все пути по даной станции и парку
                //List<Directory_Ways> ways = ef_way.Context.Where(w => w.id_station == way.id_station && w.id_park == way.id_park && w.way_delete == null).OrderBy(p => p.position_way).ToList();
                //Directory_Ways last_ways = ways.OrderByDescending(w => w.position_way).FirstOrDefault();
                //if (way.position_way > last_ways.position_way + 1) return (int)errors_base.input_position_error; // Ошибка, неправильно указана позиция 
                //if (way.position_way <= last_ways.position_way)
                //{
                //    // Требуется смещение
                //    int res_down = OperationDownPositionWayOfPark(ref context, ways, way.position_way, null, way.create_user);
                //}
                //ef_way.Add(way);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationInsertParkOfStation(id_station={0}, position={1}, id_park={2}, user={2})",
                    id_station, position, id_park, user), servece_owner, eventID);
                return -1;
            }
        }
        #endregion



        #region СПРАВОЧНИК ЖЕЛЕЗНЫХ ДОРОГ (IDS.Directory_Railway)
        /// <summary>
        /// Получить строку справочника железных дорог по имени администрации
        /// </summary>
        /// <param name="adm"></param>
        /// <returns></returns>
        public Directory_Railway GetDirectory_RailwayOfNameAdm(string adm)
        {
            try
            {
                // Проверим название администрации
                if (!String.IsNullOrWhiteSpace(adm))
                {
                    Directory_Railway dir_rw = ef_rw.Context.Where(r => r.railway_abbr_ru == adm).FirstOrDefault();
                    return dir_rw;
                }
                return null;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCode_Directory_RailwayOfNameAdm(adm={0})", adm), servece_owner, eventID);
                return null;
            }
        }

        #endregion

        #region СПРАВОЧНИК ГРУЗОВ ГНГ (Directory_CargoGNG)

        public Directory_CargoGNG GetDirectory_CargoGNG(int code, string name, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                //EFDirectory_CargoGNG ef_cargo_gng = new EFDirectory_CargoGNG(context);
                Directory_CargoGNG cargo = ef_cargo_gng.Context.Where(c => c.code == code).FirstOrDefault();
                if (cargo == null && add)
                {
                    if (String.IsNullOrWhiteSpace(name))
                    {
                        UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ 
                        EFUZ.Entities.Directory_Cargo cargo_uz = uz_directory.GetCargoOfCodeGNG(code);
                        name = cargo_uz != null ? cargo_uz.name_gng : "Название груза ГНГ не определено!";
                    }
                    cargo = new Directory_CargoGNG()
                    {
                        id = 0,
                        code = code,
                        cargo_gng_name_ru = name,
                        cargo_gng_name_en = name,
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_cargo_gng.Add(cargo);
                }
                return cargo;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_CargoGNG(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }

        #endregion

        #region СПРАВОЧНИК ГРУЗОВ ЕТСНГ (Directory_CargoETSNG)

        public Directory_CargoETSNG GetDirectory_CargoETSNG(int code, string name, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_CargoETSNG cargo = ef_cargo_etsng.Context.Where(c => c.code == code).FirstOrDefault();
                if (cargo == null && add)
                {
                    if (String.IsNullOrWhiteSpace(name))
                    {
                        UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ 
                        EFUZ.Entities.Directory_Cargo cargo_uz = uz_directory.GetCorrectCargo(code);
                        name = cargo_uz != null ? cargo_uz.name_etsng : "Название груза ЕТСНГ не определено!";
                    }
                    cargo = new Directory_CargoETSNG()
                    {
                        id = 0,
                        code = code,
                        cargo_etsng_name_ru = name,
                        cargo_etsng_name_en = name,
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_cargo_etsng.Add(cargo);
                }
                return cargo;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_CargoETSNG(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }

        #endregion

        #region СПРАВОЧНИК ГРУЗОВ  (Directory_Cargo)

        public Directory_Cargo GetDirectory_Cargo(Directory_CargoETSNG cargo_etsng, bool add, string user)
        {
            try
            {
                if (cargo_etsng == null) return null;
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_Cargo cargo = ef_cargo.Context.Where(c => c.id_cargo_etsng == cargo_etsng.id).FirstOrDefault();
                if (cargo == null && add)
                {
                    cargo = new Directory_Cargo()
                    {
                        id = 0,
                        id_group = 0, // до выяснения
                        cargo_name_ru = cargo_etsng.cargo_etsng_name_ru.Substring(0, 50),
                        cargo_name_en = cargo_etsng.cargo_etsng_name_en.Substring(0, 50),
                        code_sap = null,
                        sending = null,
                        create = DateTime.Now,
                        create_user = user
                    };
                    cargo.Directory_CargoETSNG = cargo_etsng;
                    ef_cargo.Add(cargo);
                }
                return cargo;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_Cargo(cargo_etsng={0}, add={1}, user={2})", cargo_etsng, add, user), servece_owner, eventID);
                return null;
            }
        }

        #endregion

        #region СПРАВОЧНИК ГРУЗООТПРАВИТЕЛЕЙ (в нашу сторону) и ГРУЗОПОЛУЧАТЕЛЕЙ от нас  (Directory_Shipper)

        public Directory_Shipper GetDirectory_Shipper(int code, string name, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_Shipper shipper = ef_shipper.Context.Where(s => s.code == code).FirstOrDefault();
                if (shipper == null && add)
                {
                    shipper = new Directory_Shipper()
                    {
                        code = code,
                        shipper_name_ru = name.Length > 100 ? name.Substring(0, 100) : name, // обрежим до 100
                        shipper_name_en = name.Length > 100 ? name.Substring(0, 100) : name,
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_shipper.Add(shipper);
                    ef_shipper.Save();
                }
                return shipper;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_Shipper(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК   (Directory_PayerSender)

        public Directory_PayerSender GetDirectory_PayerSender(string code, string name, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_PayerSender payer = ef_paysender.Context.Where(s => s.code == code).FirstOrDefault();
                if (payer == null && add)
                {
                    payer = new Directory_PayerSender()
                    {
                        code = code,
                        payer_name_ru = name,
                        payer_name_en = name,
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_paysender.Add(payer);
                    ef_paysender.Save();
                }
                return payer;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_PayerSender(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ВНЕШНИХ СТАНЦИЙ (Directory_ExternalStation)
        /// <summary>
        /// Получить или добавить новую внешнюю станцию 
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_ExternalStation GetDirectory_ExternalStation(int code, string name, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                Directory_ExternalStation station = ef_ext_station.Context.Where(s => s.code == code).FirstOrDefault();
                if (station == null && add)
                {
                    UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                    int id_irw = 0; // По умолчанию "До выяснения"

                    EFUZ.Entities.Directory_InternalRailroad uz_irw = uz_directory.GetDirectory_InternalRailroadOfStationCode_CS(code);
                    if (uz_irw != null)
                    {
                        id_irw = uz_irw.code;
                    }

                    station = new Directory_ExternalStation()
                    {
                        code = code,
                        station_name_ru = name,
                        station_name_en = name,
                        code_inlandrailway = id_irw,
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_ext_station.Add(station);
                    ef_ext_station.Save();
                }
                return station;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_ExternalStation(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ПОГРАН ПЕРЕХОДОВ (Directory_BorderCheckpoint)
        /// <summary>
        /// Получить или добавить новый погран переход
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_BorderCheckpoint GetDirectory_BorderCheckpoint(int code, string name, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                Directory_BorderCheckpoint bc = ef_bord_chek.Context.Where(s => s.code == code).FirstOrDefault();
                if (bc == null && add)
                {
                    UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ
                    int id_irw = 0; // По умолчанию "До выяснения"

                    EFUZ.Entities.Directory_InternalRailroad uz_irw = uz_directory.GetDirectory_InternalRailroadOfStationCode_CS(code);
                    if (uz_irw != null)
                    {
                        id_irw = uz_irw.code;
                    }

                    bc = new Directory_BorderCheckpoint()
                    {
                        code = code,
                        station_name_ru = name,
                        station_name_en = name,
                        code_inlandrailway = id_irw,
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_bord_chek.Add(bc);
                    ef_bord_chek.Save();
                }
                return bc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_BorderCheckpoint(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion
    }
}

