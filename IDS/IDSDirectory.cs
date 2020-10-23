using EFIDS.Concrete;
using EFIDS.Entities;
using EFIDS.Helper;
using IDSLogs;
using IDSLogs.Enum;
using KIS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UZ;

namespace IDS
{
    public class IDSDirectory
    {
        private eventID eventID = eventID.IDS_Directory;
        protected service servece_owner = service.Null;
        private bool transfer_new_car_of_kis = false;
        public bool Transfer_new_car_of_kis { get { return this.transfer_new_car_of_kis; } set { this.transfer_new_car_of_kis = value; } }

        EFDirectory_Station ef_station = new EFDirectory_Station(new EFDbContext());
        EFDirectory_Consignee ef_сonsignee = new EFDirectory_Consignee(new EFDbContext());
        EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(new EFDbContext());
        EFDirectory_WagonsRent ef_wag_rent = new EFDirectory_WagonsRent(new EFDbContext());
        EFDirectory_Countrys ef_countrys = new EFDirectory_Countrys(new EFDbContext());
        EFDirectory_GenusWagons ef_genus = new EFDirectory_GenusWagons(new EFDbContext());
        EFDirectory_OwnersWagons ef_owner = new EFDirectory_OwnersWagons(new EFDbContext());
        EFDirectory_OperatorsWagons ef_operator = new EFDirectory_OperatorsWagons(new EFDbContext());
        EFDirectory_Railway ef_rw = new EFDirectory_Railway(new EFDbContext());


        public IDSDirectory()
        {

        }

        public IDSDirectory(service servece_owner)
        {
            this.servece_owner = servece_owner;
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

        #region СПРАВОЧНИК ВАГОНОВ СТАРЫЙ -УДАЛИТЬ (IDS.Directory_Cars )
        //public Directory_Cars GetCurrentDirectory_CarsOfNum(int num, string user)
        //{
        //    try
        //    {
        //        if (this.transfer_new_car_of_kis)
        //        {
        //            int result_add_new_car = InsertNewDirectory_Cars(num, user);
        //            if (result_add_new_car != 0)
        //            {
        //                String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, код выполнения : {1}", num, result_add_new_car).WarningLog(servece_owner, this.eventID);
        //            }
        //        }
        //        Directory_Cars car = this.ef_car
        //            .Context
        //            .Where(w => w.num == num)
        //            .ToList()
        //            .Select(m => m.GetDirectory_Cars()).OrderByDescending(c => c.rent_start).FirstOrDefault();
        //        return car;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetCurrentDirectory_CarsOfNum(num={0})", num), servece_owner, eventID);
        //        return null;
        //    }
        //}
        /// <summary>
        /// Получить актуальную запись из карточки по вагону
        /// </summary>
        /// <param name="num"></param>
        /// <param name="adm"></param>
        /// <param name="rod"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="create_dir"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        //public Directory_Cars GetCurrentDirectory_CarsOfNum(int num, int adm, int? rod, int kol_os, string usl_tip, bool create_dir, string user)
        //{
        //    try
        //    {
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }
        //        if (this.transfer_new_car_of_kis)
        //        {
        //            int result_add_new_car = InsertNewDirectory_Cars(num, user);
        //            if (result_add_new_car != 0)
        //            {
        //                String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, код выполнения : {1}", num, result_add_new_car).WarningLog(servece_owner, this.eventID);
        //            }
        //        }
        //        WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner);
        //        IDSMORS mors = new IDSMORS(this.servece_owner);
        //        // Получим информацию из БД УЗ
        //        UZWagonInfo info = client.GetInfoWagonOfNum(num);
        //        // Получим информ ацию последнюю запись из БД ИДС
        //        Directory_Cars last_car = this.ef_car
        //            .Context.Where(c => c.num == num)
        //            .OrderByDescending(c => c.create)
        //            .ToList()
        //            .Select(c => c.GetDirectory_Cars())
        //            .FirstOrDefault();

        //        if (info == null & last_car == null) return null; // Данніх нет вернем null (можно вернуть пустую запись)
        //        // Определим справочные данные
        //        CardsWagons card = mors.GetCardsWagonsOfNum(num);
        //        int id_countrys = GetID_Directory_CountrysOfAdm(adm, true, user);
        //        int id_genus = GetID_Directory_GenusWagonsOfRod(rod, true, user);
        //        int id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);
        //        int? id_operator_uz = (info != null ? GetID_Directory_OperatorsWagonsOfName(info.operat, true, user) : null);
        //        // Оператор ручной , если есть предыдущая запись берем ее иначе читаем текущий по ГИС
        //        int? id_operator = (last_car != null ? last_car.id_operator : info != null ? GetID_Directory_OperatorsWagonsOfName(info.operat, true, user) : null);
        //        // Признак изменения оператора (по умалчанию предыдущий могли не прореагировать на смену оператора а помянялась колосная пара)
        //        bool ban_changes_operator = last_car != null ? (bool)last_car.ban_changes_operator : false;
        //        // Не определен оператор в ручную, новый оператор по ГИС отличается от старого
        //        if (id_operator == null || (last_car != null && last_car.id_operator_uz != id_operator_uz))
        //        {
        //            ban_changes_operator = true;
        //        }
        //        // Проверка на род вагона
        //        if ((last_car != null && rod == null) || (last_car != null && rod != null && isDirectory_GenusWagons(last_car.id_genus, rod)))
        //        {
        //            id_genus = last_car.id_genus;
        //        }

        //        int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
        //        // Создадим новую запись
        //        Directory_Cars new_car = new Directory_Cars()
        //        {
        //            id = 0,
        //            num = num,
        //            id_countrys = id_countrys,
        //            // если есть старая запись и она соответсвует группе род, тогда переносим, инчи новый род
        //            id_genus = id_genus,
        //            id_owner = id_owner,
        //            id_operator_uz = id_operator_uz,
        //            ban_changes_operator = ban_changes_operator,
        //            id_operator = id_operator,                                      // !! Меняем по изменению - в ручную
        //            // защита иногда нет значения                    
        //            gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
        //            kol_os = kol_os,
        //            usl_tip = (usl_tip == "" ? null : usl_tip),
        //            date_rem_uz = info.repair_date,
        //            date_rem_vag = last_car != null ? last_car.date_rem_vag : null, // если есть старая запись унаследуем свойсво дата ремонта на вагоне
        //            id_limiting = last_car != null ? last_car.id_limiting : null,   // !! Меняем по изменению id_operator - в ручную
        //            id_type_ownership = id_type_ownership,
        //            rent_start = (last_car != null ? last_car.rent_start : null),   // !! Меняем по изменению id_operator - в ручную
        //            rent_end = null,
        //            sign = (last_car != null ? last_car.sign : null),               // !! Меняем по изменению id_operator - в ручную
        //            note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
        //            sobstv_kis = (last_car != null ? last_car.sobstv_kis : null),   // !! Меняем по изменению id_operator - в ручную
        //            create = DateTime.Now,
        //            create_user = user,
        //        };
        //        // Если есть старая запись проверим на изменения
        //        if (last_car != null)
        //        {
        //            if (
        //                last_car.id_countrys != new_car.id_countrys ||
        //                (rod != null && !isDirectory_GenusWagons(last_car.id_genus, rod)) ||
        //                last_car.id_owner != new_car.id_owner ||
        //                last_car.id_operator_uz != new_car.id_operator_uz ||
        //                last_car.gruzp != new_car.gruzp ||
        //                last_car.kol_os != new_car.kol_os ||
        //                last_car.date_rem_uz != new_car.date_rem_uz ||
        //                last_car.id_type_ownership != new_car.id_type_ownership
        //                )
        //            {
        //                // Изменено
        //                return new_car;
        //            }
        //            else
        //            {
        //                // Не изменено
        //                return last_car;
        //            }
        //        }
        //        // Вагон зашел первій раз
        //        return new_car;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetCurrentDirectory_CarsOfNum(num={0},create_dir={1})", num, create_dir), servece_owner, eventID);
        //        return null;
        //    }
        //}
        /// <summary>
        /// Создать справочник вагонов по данным КИС
        /// </summary>
        /// <returns></returns>
        //public int CreateDirectory_CarsInKIS()
        //{

        //    try
        //    {
        //        string user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        KISDirectory kis_dir = new KISDirectory(this.servece_owner);// Подключим библиотеку КИС


        //        List<KOMETA_VAGON_SOB> list_cars_kis = kis_dir.GetCurrent_KOMETA_VAGON_SOB();

        //        int count = list_cars_kis.Count();
        //        foreach (KOMETA_VAGON_SOB vag_kis in list_cars_kis.ToList())
        //        {
        //            //EFDirectory_Cars ef_car = new EFDirectory_Cars(new EFDbContext());
        //            int result = InsertNewDirectory_Cars(vag_kis.N_VAGON, user);
        //            count--;
        //            Console.WriteLine("Перенес вагон №{0}, код {1}, осталось перенести {2}", vag_kis.N_VAGON, result, count);
        //        }

        //        return 0;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("CreateDirectory_CarsInKIS()"), servece_owner, eventID);
        //        return -1;
        //    }

        //}
        /// <summary>
        /// Добавить в справочник новый вагон (по справочнику КИС и справочнику операторов и ограничений ИРЫ)
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        //public int InsertNewDirectory_Cars(int num, string user)
        //{
        //    try
        //    {
        //        KISDirectory kis_dir = new KISDirectory(this.servece_owner);// Подключим библиотеку КИС
        //        IDSMORS mors = new IDSMORS(this.servece_owner);
        //        EFDirectory_Cars_KIS ef_car_kis = new EFDirectory_Cars_KIS(new EFDbContext());
        //        WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner);
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        KOMETA_VAGON_SOB vag_kis = kis_dir.GetCurrent_KOMETA_VAGON_SOB(num);


        //        Directory_Cars car_old = ef_car.Context.Where(c => c.num == num).FirstOrDefault();
        //        if (car_old == null)
        //        {
        //            //Console.WriteLine("Переношу вагон №{0}", num);
        //            // Определим справочные данные
        //            CardsWagons card = mors.GetCardsWagonsOfNum(num);
        //            // Получим строку из справочника Иры
        //            Directory_Cars_KIS dir_car_kis = ef_car_kis.Context.Where(c => c.num == num).FirstOrDefault();
        //            // Получим информацию из БД УЗ
        //            UZWagonInfo info = client.GetInfoWagonOfNum(num);
        //            int id_countrys = 0;
        //            int id_owner = 0;   // Владелец
        //            int? id_operator = dir_car_kis != null ? dir_car_kis.id_operator : null; // Оператор по справочнику ИДС (выставлен Ирой)
        //            int? id_operator_uz = null; // Оператор по справочнику УЗ
        //            int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;

        //            // Обработаем информацию из БД УЗ
        //            if (info != null)
        //            {
        //                Directory_Railway dir_rw = GetDirectory_RailwayOfNameAdm(info.admin);
        //                id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
        //                id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);
        //                id_operator_uz = GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);
        //            }

        //            if (dir_car_kis != null)
        //            {
        //                // Вагон обработан Ирой
        //                if (info != null)
        //                {
        //                    // Есть информация по УЗ
        //                    Directory_Cars new_car = new Directory_Cars()
        //                    {
        //                        id = 0,
        //                        num = num,
        //                        id_countrys = id_countrys,
        //                        id_genus = (int)dir_car_kis.id_genus,
        //                        id_owner = id_owner,
        //                        ban_changes_operator = vag_kis != null ? vag_kis.SOB != dir_car_kis.id_sob_kis ? true : false : false,
        //                        id_operator = id_operator,
        //                        id_operator_uz = id_operator_uz,
        //                        gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
        //                        kol_os = 0,
        //                        usl_tip = null,
        //                        date_rem_uz = info.repair_date,
        //                        date_rem_vag = null,
        //                        id_limiting = dir_car_kis.id_limiting,
        //                        id_type_ownership = id_type_ownership,
        //                        rent_start = (vag_kis != null ? (DateTime?)vag_kis.DATE_AR : null),
        //                        rent_end = null,
        //                        sign = null,
        //                        note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
        //                        sobstv_kis = dir_car_kis.id_sob_kis, //vag_kis.SOB,
        //                        create = DateTime.Now,
        //                        create_user = user,
        //                    };
        //                    //Console.WriteLine("Записываю вагон №{0}, id_owner = {1}", num, id_owner);
        //                    ef_car.Add(new_car);
        //                    int res = ef_car.Save();
        //                    return res;
        //                }
        //                else
        //                {
        //                    // Нет информации по уз
        //                    Console.WriteLine("Нет информации по УЗ на вагон №{0}", num);
        //                    return 0;
        //                }
        //            }
        //            else
        //            {
        //                // Это новый вагон
        //                Console.WriteLine("Нет информации в справочнике ИРЫ на вагон №{0}", num);
        //                return 0;
        //            }
        //        }
        //        else
        //        {
        //            Console.WriteLine("Вагон №{0} - уже перенесен, пропускаю", num);
        //            return 0;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("CreateDirectory_CarsInKIS()"), servece_owner, eventID);
        //        return -1;
        //    }

        //}
        #endregion

        #region СПРАВОЧНИК ВАГОНОВ НОВЫЙ (IDS.Directory_Wagons)
        /// <summary>
        /// проверка номера вагона на контрольную сумму
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public bool IsCorrectNumCar(int num)
        {
            try
            {
                if (num < 10000000) return false;
                if (num > 99999999) return false;

                string number = num.ToString().Remove(num.ToString().Length - 1);
                int cs = int.Parse(num.ToString().Remove(0, num.ToString().Length - 1));
                char[] array = number.ToCharArray();
                int[] kof = new int[7] { 2, 1, 2, 1, 2, 1, 2 };
                int result = 0;
                int index = 0;
                foreach (char n in array)
                {
                    int n_i = int.Parse(n.ToString());
                    int res_i = n_i * kof[index];
                    index++;
                    // скорректируем
                    if (res_i > 9)
                    {
                        string res_kor_i = res_i.ToString();
                        res_i = int.Parse(res_kor_i[0].ToString()) + int.Parse(res_kor_i[1].ToString());
                    }
                    result += res_i;
                }

                result = result + cs;

                double ost = result % 10.0;
                return ost == 0.0 ? true : false;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("IsCorrectNumCar(num={0})", num), servece_owner, eventID);
                return false;
            }
        }

        ///// <summary>
        ///// Получить вагон если нет создать первую строку и вернуть
        ///// </summary>
        ///// <param name="num"></param>
        ///// <param name="adm"></param>
        ///// <param name="rod"></param>
        ///// <param name="kol_os"></param>
        ///// <param name="usl_tip"></param>
        ///// <param name="create_dir"></param>
        ///// <param name="user"></param>
        ///// <param name="create"></param>
        ///// <returns></returns>
        //public Directory_Wagons GetDirectory_WagonsOfNum(int num, int adm, int? rod, int kol_os, string usl_tip, string user)
        //{
        //    try
        //    {
        //        //EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(new EFDbContext());
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }
        //        // Проверим наличие
        //        Directory_Wagons wagon = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();
        //        int id_genus = GetID_Directory_GenusWagonsOfRod(rod, true, user);
        //        // Проверим вагон в справочнике если нет создаем первую строку
        //        if (wagon == null)
        //        {
        //            int result_add_new_car = 0;
        //            // Вагона нет в справочнике, создадим первую строку
        //            if (this.transfer_new_car_of_kis)
        //            {
        //                // Создадим первую строку по данным КИС
        //                result_add_new_car = CreateFirstNew_Directory_Wagons_Directory_WagonsRent_IN_KIS(num, kol_os, usl_tip, user);
        //                if (result_add_new_car != 0)
        //                {
        //                    String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, источник - текущие данные и данные системы КИС, код выполнения : {1}", num, result_add_new_car).WarningLog(servece_owner, this.eventID);
        //                }
        //            }
        //            else
        //            {
        //                // Создадим первую строку по исходным данным
        //                result_add_new_car = CreateFirstNew_Directory_Wagons_Directory_WagonsRent(num, id_genus, kol_os, usl_tip, null, null, null, null, user);
        //                if (result_add_new_car != 0)
        //                {
        //                    String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, источник - текущие данные, код выполнения : {1}", num, result_add_new_car).WarningLog(servece_owner, this.eventID);
        //                }
        //            }
        //            // Если вагон добавлен вернем новые данные
        //            if (result_add_new_car > 0)
        //            {
        //                wagon = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();
        //            }
        //            return wagon;
        //        }
        //        else
        //        {
        //            // Если вагон есть обновим информацию
        //            wagon = GetAdd_Update_Directory_Wagons(num, id_genus, kol_os, usl_tip, wagon.sobstv_kis, user);
        //        }
        //        return wagon;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetCurrentDirectory_CarsOfNum(num={0})", num), servece_owner, eventID);
        //        return null;
        //    }
        //}
        ///// <summary>
        ///// Создать первую строку справочника вагонов по данным КИС и Справочника Иры
        ///// </summary>
        ///// <param name="num"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int CreateFirstNew_Directory_Wagons_Directory_WagonsRent_IN_KIS(int num, int kol_os, string usl_tip, string user)
        //{
        //    try
        //    {
        //        //EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(new EFDbContext());
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }
        //        Directory_Wagons wagon_old = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();
        //        // Проверим вагон в справочнике
        //        if (wagon_old == null)
        //        {
        //            // Подключим и найдем вагон в справочнике Иры
        //            EFDirectory_Cars_KIS ef_car_kis = new EFDirectory_Cars_KIS(new EFDbContext());
        //            Directory_Cars_KIS dir_car_kis = ef_car_kis.Context.Where(c => c.num == num).FirstOrDefault();
        //            // Подключим и найдем вагон в КИС
        //            KISDirectory kis_dir = new KISDirectory(this.servece_owner);    // Подключим библиотеку КИС
        //            KOMETA_VAGON_SOB vag_kis = kis_dir.GetCurrent_KOMETA_VAGON_SOB(num);// Получим текущего оператора по КИС

        //            //Console.WriteLine("Записываю вагон №{0}, id_owner = {1}", num, id_owner);
        //            int id_genus = dir_car_kis != null ? (int)dir_car_kis.id_genus : 0;
        //            // Определим оператора АМКР и начало аренды
        //            int? id_operator_amkr = dir_car_kis != null ? dir_car_kis.id_operator : null;   // Оператор по справочнику ИДС (выставлен Ирой)
        //            DateTime? rent_start = (vag_kis != null ? (DateTime?)vag_kis.DATE_AR : null);   // Начало аренды из справочника КИС
        //            int? id_limiting = dir_car_kis != null ? dir_car_kis.id_limiting : null;        // лимит погрузки по справочнику ИДС (выставлен Ирой)
        //            int? id_sob_kis = dir_car_kis != null ? dir_car_kis.id_sob_kis : null;          // id_operator_kis по справочнику ИДС (выставлен Ирой)
        //            if (vag_kis != null && dir_car_kis != null && vag_kis.SOB != dir_car_kis.id_sob_kis)
        //            {
        //                id_operator_amkr = null;
        //                rent_start = null;
        //                id_limiting = null;
        //                id_sob_kis = null;
        //            }
        //            int result = CreateFirstNew_Directory_Wagons_Directory_WagonsRent(num, id_genus, kol_os, usl_tip, id_operator_amkr, rent_start, id_limiting, id_sob_kis, user);
        //            return result;
        //        }
        //        else
        //        {
        //            Console.WriteLine("Вагон №{0} - уже перенесен, пропускаю", num);
        //            return 0;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("CreateFirstNewDirectory_Wagons(num={0}, user={1})", num, user), servece_owner, eventID);
        //        return -1;
        //    }
        //}
        ///// <summary>
        ///// Создать первую строку справочника вагонов
        ///// </summary>
        ///// <param name="num"></param>
        ///// <param name="id_genus"></param>
        ///// <param name="id_operator_amkr"></param>
        ///// <param name="sobstv_kis"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public int CreateFirstNew_Directory_Wagons_Directory_WagonsRent(int num, int id_genus, int kol_os, string usl_tip, int? id_operator_amkr, DateTime? rent_start, int? id_limiting, int? sobstv_kis, string user)
        //{
        //    try
        //    {
        //        //EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(new EFDbContext());
        //        //EFDirectory_WagonsRent ef_wag_rent = new EFDirectory_WagonsRent(new EFDbContext());
        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }


        //        Directory_Wagons new_wagon = GetFirstNewDirectory_Wagons(num, id_genus, kol_os, usl_tip, sobstv_kis, user);
        //        if (new_wagon != null)
        //        {
        //            // Строка создана, добавим аренду
        //            Directory_WagonsRent new_wag_rent = new Directory_WagonsRent()
        //            {
        //                id = 0,
        //                num = num,
        //                id_operator = id_operator_amkr,
        //                id_limiting = id_limiting,
        //                rent_start = rent_start,
        //                rent_end = null,
        //                create = DateTime.Now,
        //                create_user = user,
        //                parent_id = null,
        //            };
        //            new_wagon.Directory_WagonsRent.Add(new_wag_rent);
        //            ef_wag.AddOrUpdate(new_wagon);
        //            int res = ef_wag.Save();
        //            //if (res > 0)
        //            //{
        //            //    // Строка создана, добавим аренду
        //            //    Directory_WagonsRent new_wag_rent = new Directory_WagonsRent()
        //            //    {
        //            //        id = 0,
        //            //        num = new_wagon.num,
        //            //        id_operator = id_operator_amkr,
        //            //        id_limiting = id_limiting,
        //            //        rent_start = rent_start,
        //            //        rent_end = null,
        //            //        create = DateTime.Now,
        //            //        create_user = user,
        //            //        parent_id = null,
        //            //    };
        //            //    ef_wag_rent.Add(new_wag_rent);
        //            //    int res_rent = ef_wag_rent.Save();
        //            //    return res_rent;
        //            //}
        //            return res;
        //        }
        //        else
        //        {
        //            // Ошибка или нет информации на уз
        //            return -1;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("CreateFirstNew_Directory_Wagons_Directory_WagonsRent(num={0}, id_genus={1}, id_operator_amkr={2}, sobstv_kis={3}, user={4})", num, id_genus, id_operator_amkr, sobstv_kis, user), servece_owner, eventID);
        //        return -1;
        //    }
        //}
        ///// <summary>
        ///// Вернуть первый раз создаваемую строку справочника вагонов
        ///// </summary>
        ///// <param name="num"></param>
        ///// <param name="id_genus"></param>
        ///// <param name="id_operator_amkr"></param>
        ///// <param name="sobstv_kis"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        ////public Directory_Wagons GetFirstNewDirectory_Wagons(int num, int id_genus, int? sobstv_kis, string user)
        ////{
        ////    try
        ////    {
        ////        IDSMORS mors = new IDSMORS(this.servece_owner);                 // Подключим справочник МОРС
        ////        WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner); // Подключим WebAPI справочник УЗ

        ////        // Проверим и скорректируем пользователя
        ////        if (String.IsNullOrWhiteSpace(user))
        ////        {
        ////            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        ////        }

        ////        // Определим справочные данные из системы МОРС
        ////        CardsWagons card = mors.GetCardsWagonsOfNum(num);
        ////        // Получим строку из справочника Иры

        ////        // Получим информацию из БД УЗ
        ////        UZWagonInfo info = client.GetInfoWagonOfNum(num);
        ////        int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
        ////        // Вагон обработан Ирой
        ////        if (info != null)
        ////        {
        ////            Directory_Railway dir_rw = GetDirectory_RailwayOfNameAdm(info.admin);
        ////            int id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
        ////            int id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);// Владелец
        ////            int? id_operator_uz = GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);// Оператор по справочнику УЗ
        ////            bool bit_warning = false;
        ////            // Определим бит внимания требуется корреция (не определен род, адм, оператор)
        ////            if (id_genus == 0 || id_countrys == 0 || id_operator_uz == 0)
        ////            {
        ////                bit_warning = true;
        ////            }
        ////            // Есть информация по УЗ
        ////            Directory_Wagons new_wagon = new Directory_Wagons()
        ////            {
        ////                num = num,
        ////                id_countrys = id_countrys > -1 ? id_countrys : 0,
        ////                id_genus = id_genus > -1 ? id_genus : 0,
        ////                id_owner = id_owner > -1 ? id_owner : 0,
        ////                bit_warning = bit_warning,
        ////                id_operator = id_operator_uz,
        ////                change_operator = DateTime.Now,
        ////                gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
        ////                kol_os = 0,
        ////                usl_tip = null,
        ////                date_rem_uz = info.repair_date,
        ////                date_rem_vag = null,
        ////                id_type_ownership = id_type_ownership,
        ////                sign = null,
        ////                note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
        ////                sobstv_kis = sobstv_kis,
        ////                create = DateTime.Now,
        ////                create_user = user,
        ////            };
        ////            return new_wagon;
        ////        }
        ////        else
        ////        {
        ////            // Нет информации по уз
        ////            Console.WriteLine("Нет информации по УЗ на вагон №{0}", num);
        ////            return null;
        ////        }
        ////    }
        ////    catch (Exception e)
        ////    {
        ////        e.ExceptionMethodLog(String.Format("GetFirstNewDirectory_Wagons(num={0}, id_genus={1}, sobstv_kis={2}, user={3})", num, id_genus, sobstv_kis, user), servece_owner, eventID);
        ////        return null;
        ////    }
        ////}

        //public Directory_Wagons GetFirstNewDirectory_Wagons(int num, int id_genus, int kol_os, string usl_tip, int? sobstv_kis, string user)
        //{
        //    try
        //    {
        //        return GetAdd_Update_Directory_Wagons(num, id_genus, kol_os, usl_tip, sobstv_kis, user);
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetFirstNewDirectory_Wagons(num={0}, id_genus={1}, sobstv_kis={2}, user={3})", num, id_genus, sobstv_kis, user), servece_owner, eventID);
        //        return null;
        //    }
        //}
        ///// <summary>
        ///// Получить новую или обновить старую строку справочника
        ///// </summary>
        ///// <param name="num"></param>
        ///// <param name="id_genus"></param>
        ///// <param name="kol_os"></param>
        ///// <param name="usl_tip"></param>
        ///// <param name="sobstv_kis"></param>
        ///// <param name="user"></param>
        ///// <returns></returns>
        //public Directory_Wagons GetAdd_Update_Directory_Wagons(int num, int id_genus, int kol_os, string usl_tip, int? sobstv_kis, string user)
        //{
        //    try
        //    {
        //        //EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(new EFDbContext());
        //        //EFDirectory_WagonsRent ef_wag_rent = new EFDirectory_WagonsRent(new EFDbContext());
        //        IDSMORS mors = new IDSMORS(this.servece_owner);                 // Подключим справочник МОРС
        //        WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner); // Подключим WebAPI справочник УЗ

        //        // Проверим и скорректируем пользователя
        //        if (String.IsNullOrWhiteSpace(user))
        //        {
        //            user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
        //        }

        //        // Проверим наличие
        //        Directory_Wagons wagon_old = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();

        //        // Определим справочные данные из системы МОРС
        //        CardsWagons card = mors.GetCardsWagonsOfNum(num);
        //        // Получим строку из справочника Иры

        //        // Получим информацию из БД УЗ
        //        UZWagonInfo info = client.GetInfoWagonOfNum(num);
        //        int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
        //        // Вагон обработан Ирой
        //        if (info != null)
        //        {
        //            Directory_Railway dir_rw = GetDirectory_RailwayOfNameAdm(info.admin);
        //            int id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
        //            int id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);// Владелец
        //            int? id_operator_uz = GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);// Оператор по справочнику УЗ
        //            bool bit_warning = false;
        //            // Определим бит внимания требуется корреция (не определен род, адм, оператор)
        //            if (id_genus == 0 || id_countrys == 0 || id_operator_uz == 0)
        //            {
        //                bit_warning = true;
        //            }
        //            // Есть информация по УЗ
        //            if (wagon_old == null)
        //            {
        //                Directory_Wagons new_wagon = new Directory_Wagons()
        //                {
        //                    num = num,
        //                    id_countrys = id_countrys > -1 ? id_countrys : 0,
        //                    id_genus = id_genus > -1 ? id_genus : 0,
        //                    id_owner = id_owner > -1 ? id_owner : 0,
        //                    bit_warning = bit_warning,
        //                    id_operator = id_operator_uz,
        //                    change_operator = DateTime.Now,
        //                    gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
        //                    kol_os = kol_os,
        //                    usl_tip = usl_tip,
        //                    date_rem_uz = info.repair_date,
        //                    date_rem_vag = null,
        //                    id_type_ownership = id_type_ownership,
        //                    sign = null,
        //                    note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
        //                    sobstv_kis = sobstv_kis,
        //                    create = DateTime.Now,
        //                    create_user = user,
        //                };
        //                return new_wagon;
        //            }
        //            else
        //            {
        //                // Обновим информацию
        //                wagon_old.id_countrys = (wagon_old.id_countrys == 0 && id_countrys > 0 ? id_countrys : wagon_old.id_countrys);
        //                wagon_old.id_genus = (wagon_old.id_genus == 0 && id_genus > 0 ? id_genus : wagon_old.id_genus);
        //                wagon_old.id_owner = (wagon_old.id_owner != id_owner ? id_owner : wagon_old.id_owner);
        //                wagon_old.bit_warning = bit_warning;
        //                wagon_old.change_operator = (wagon_old.id_operator != id_operator_uz ? DateTime.Now : wagon_old.change_operator);
        //                wagon_old.sobstv_kis = (wagon_old.id_operator != id_operator_uz ? null : wagon_old.sobstv_kis);
        //                wagon_old.id_operator = (wagon_old.id_operator != id_operator_uz ? id_operator_uz : wagon_old.id_operator);
        //                wagon_old.gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : wagon_old.gruzp;

        //                wagon_old.kol_os = (wagon_old.kol_os == 0 && kol_os > 0 ? kol_os : wagon_old.kol_os);
        //                wagon_old.usl_tip = (wagon_old.usl_tip == null && usl_tip != null ? usl_tip : wagon_old.usl_tip);
        //                wagon_old.date_rem_uz = info.repair_date;
        //                //wagon_old.date_rem_vag = wagon_old.date_rem_vag;
        //                wagon_old.id_type_ownership = id_type_ownership;
        //                //wagon_old.sign = wagon_old.sign;
        //                wagon_old.note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : "");
        //                wagon_old.change = DateTime.Now;
        //                wagon_old.change_user = user;
        //                return wagon_old;

        //            }
        //        }
        //        else
        //        {
        //            // Нет информации по уз вернем старую запись
        //            Console.WriteLine("Нет информации по УЗ на вагон №{0}", num);
        //            return wagon_old;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetAdd_Update_Directory_Wagons(num={0}, id_genus={1}, sobstv_kis={2}, user={3})", num, id_genus, sobstv_kis, user), servece_owner, eventID);
        //        return null;
        //    }
        //}
        public Directory_Wagons GetDirectory_WagonsOfNum(int num, int adm, int? rod, int kol_os, string usl_tip, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Проверим наличие
                Directory_Wagons wagon = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();
                int id_genus = GetID_Directory_GenusWagonsOfRod(rod, true, user);
                // Проверим вагон в справочнике если нет создаем первую строку
                if (wagon == null)
                {
                    if (this.transfer_new_car_of_kis)
                    {
                        wagon = CreateDirectory_Wagons_IN_KIS(num, id_genus, kol_os, usl_tip, user);
                    }
                    else
                    {
                        wagon = CreateDirectory_Wagons(num, id_genus, kol_os, usl_tip, null, null, null, null, user);
                    }
                    // Сохраним изменения
                    ef_wag.Add(wagon);
                    int result_create = ef_wag.Save();
                    String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, код выполнения : {1}", num, result_create).WarningLog(servece_owner, this.eventID);
                }
                else
                {
                    // Если вагон есть обновим информацию
                    Directory_WagonsRent current_wagon_rent = wagon.Directory_WagonsRent.Where(r => r.rent_end == null).OrderByDescending(r => r.rent_start).FirstOrDefault();
                    wagon = UpdateDirectory_Wagons(num, id_genus, kol_os, usl_tip, (current_wagon_rent != null ? current_wagon_rent.id_operator : null), (current_wagon_rent != null ? current_wagon_rent.rent_start : null), (current_wagon_rent != null ? current_wagon_rent.id_limiting : null), wagon.sobstv_kis, user);
                    // Сохраним изменения
                    ef_wag.Update(wagon);
                    int result_create = ef_wag.Save();
                }
                // Обновим информацию и верем
                wagon = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();
                return wagon;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentDirectory_CarsOfNum(num={0}, adm={1}, rod={2}, kol_os={3}, usl_tip={4}, user={5})", num, adm, rod, kol_os, usl_tip, user), servece_owner, eventID);
                return null;
            }
        }

        public Directory_Wagons CreateDirectory_Wagons_IN_KIS(int num, int id_genus, int kol_os, string usl_tip, string user)
        {
            try
            {
                //EFDirectory_Wagons ef_wag = new EFDirectory_Wagons(new EFDbContext());
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // Подключим и найдем вагон в справочнике Иры
                EFDirectory_Cars_KIS ef_car_kis = new EFDirectory_Cars_KIS(new EFDbContext());
                Directory_Cars_KIS dir_car_kis = ef_car_kis.Context.Where(c => c.num == num).FirstOrDefault();
                // Подключим и найдем вагон в КИС
                KISDirectory kis_dir = new KISDirectory(this.servece_owner);    // Подключим библиотеку КИС
                KOMETA_VAGON_SOB vag_kis = kis_dir.GetCurrent_KOMETA_VAGON_SOB(num);// Получим текущего оператора по КИС

                //Console.WriteLine("Записываю вагон №{0}, id_owner = {1}", num, id_owner);
                id_genus = dir_car_kis != null ? (int)dir_car_kis.id_genus : id_genus;
                // Определим оператора АМКР и начало аренды
                int? id_operator_amkr = dir_car_kis != null ? dir_car_kis.id_operator : null;   // Оператор по справочнику ИДС (выставлен Ирой)
                DateTime? rent_start = (vag_kis != null ? (DateTime?)vag_kis.DATE_AR : null);   // Начало аренды из справочника КИС
                int? id_limiting = dir_car_kis != null ? dir_car_kis.id_limiting : null;        // лимит погрузки по справочнику ИДС (выставлен Ирой)
                int? id_sob_kis = dir_car_kis != null ? dir_car_kis.id_sob_kis : null;          // id_operator_kis по справочнику ИДС (выставлен Ирой)
                if (vag_kis != null && dir_car_kis != null && vag_kis.SOB != dir_car_kis.id_sob_kis)
                {
                    id_operator_amkr = null;
                    rent_start = null;
                    id_limiting = null;
                    id_sob_kis = null;
                }
                Directory_Wagons wagons = CreateDirectory_Wagons(num, id_genus, kol_os, usl_tip, id_operator_amkr, rent_start, id_limiting, id_sob_kis, user);
                return wagons;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateFirstNewDirectory_Wagons(num={0}, id_genus={1}, kol_os={2}, usl_tip={3}, user={4})", num, id_genus, kol_os, usl_tip, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Создать строку справочника вагонов 
        /// </summary>
        /// <param name="num"></param>
        /// <param name="id_genus"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="id_operator_amkr"></param>
        /// <param name="rent_start"></param>
        /// <param name="id_limiting"></param>
        /// <param name="sobstv_kis"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Wagons CreateDirectory_Wagons(int num, int id_genus, int kol_os, string usl_tip, int? id_operator_amkr, DateTime? rent_start, int? id_limiting, int? sobstv_kis, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                IDSMORS mors = new IDSMORS(this.servece_owner);                 // Подключим справочник МОРС
                WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner); // Подключим WebAPI справочник УЗ

                // Проверим наличие
                Directory_Wagons wagon = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();

                if (wagon == null)
                {
                    // Определим справочные данные из системы МОРС
                    CardsWagons card = mors.GetCardsWagonsOfNum(num);
                    // Получим строку из справочника Иры

                    // Получим информацию из БД УЗ
                    UZWagonInfo info = client.GetInfoWagonOfNum(num);
                    int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
                    // Вагон обработан Ирой
                    if (info != null)
                    {
                        Directory_Railway dir_rw = GetDirectory_RailwayOfNameAdm(info.admin);
                        int id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
                        int id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);// Владелец
                        int? id_operator_uz = GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);// Оператор по справочнику УЗ
                        bool bit_warning = false;
                        // Определим бит внимания требуется корреция (не определен род, адм, оператор)
                        if (id_genus == 0 || id_countrys == 0 || id_operator_uz == 0 || (id_operator_amkr == null || id_operator_amkr == 0))
                        {
                            bit_warning = true;
                        }
                        Directory_Wagons new_wagon = new Directory_Wagons()
                        {
                            num = num,
                            id_countrys = id_countrys > -1 ? id_countrys : 0,
                            id_genus = id_genus > -1 ? id_genus : 0,
                            id_owner = id_owner > -1 ? id_owner : 0,
                            bit_warning = bit_warning,
                            id_operator = id_operator_uz,
                            change_operator = DateTime.Now,
                            gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
                            tara = info.tara != null ? (double?)info.tara : null,
                            kol_os = kol_os,
                            usl_tip = usl_tip,
                            date_rem_uz = info.repair_date,
                            date_rem_vag = null,
                            id_type_ownership = id_type_ownership,
                            factory_number = null,
                            inventory_number = null,
                            year_built = null,
                            exit_ban = null,
                            sign = null,
                            note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
                            sobstv_kis = sobstv_kis,
                            create = DateTime.Now,
                            create_user = user,
                        };

                        List<Directory_WagonsRent> list_wagon_rent = UpdateDirectory_WagonsRent(new_wagon.Directory_WagonsRent.ToList(), num, id_operator_amkr, rent_start, id_limiting, user);
                        new_wagon.Directory_WagonsRent = list_wagon_rent != null ? list_wagon_rent : new List<Directory_WagonsRent>();
                        return new_wagon;
                    }
                    else
                    {
                        // Нет информации по уз вернем старую запись
                        Console.WriteLine("Нет информации по УЗ на вагон №{0}", num);
                        return null;
                    }
                }
                else
                {
                    // отправить на обновление
                    wagon = UpdateDirectory_Wagons(num, id_genus, kol_os, usl_tip, id_operator_amkr, rent_start, id_limiting, sobstv_kis, user);
                }
                return wagon;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateDirectory_Wagons(num={0}, id_genus={1}, kol_os={2}, usl_tip={3}, id_operator_amkr={4}, rent_start={5}, id_limiting={6}, sobstv_kis={7}, user={8})",
                    num, id_genus, kol_os, usl_tip, id_operator_amkr, rent_start, id_limiting, sobstv_kis, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить запись строки справочника вагона
        /// </summary>
        /// <param name="num"></param>
        /// <param name="id_genus"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="id_operator_amkr"></param>
        /// <param name="rent_start"></param>
        /// <param name="id_limiting"></param>
        /// <param name="sobstv_kis"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Wagons UpdateDirectory_Wagons(int num, int id_genus, int kol_os, string usl_tip, int? id_operator_amkr, DateTime? rent_start, int? id_limiting, int? sobstv_kis, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                IDSMORS mors = new IDSMORS(this.servece_owner);                 // Подключим справочник МОРС
                WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner); // Подключим WebAPI справочник УЗ

                // Проверим наличие
                Directory_Wagons wagon = ef_wag.Context.Where(c => c.num == num).FirstOrDefault();

                if (wagon != null)
                {
                    // Определим справочные данные из системы МОРС
                    CardsWagons card = mors.GetCardsWagonsOfNum(num);
                    // Получим строку из справочника Иры

                    // Получим информацию из БД УЗ
                    UZWagonInfo info = client.GetInfoWagonOfNum(num);
                    int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
                    // Вагон обработан Ирой
                    if (info != null)
                    {
                        Directory_Railway dir_rw = GetDirectory_RailwayOfNameAdm(info.admin);
                        int id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
                        int id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);// Владелец
                        int? id_operator_uz = GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);// Оператор по справочнику УЗ
                        bool bit_warning = false;
                        double gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0;
                        // Определим бит внимания требуется корреция (не определен род, адм, оператор)
                        if (id_genus == 0 || id_countrys == 0 || id_operator_uz == 0 || (id_operator_amkr == null || id_operator_amkr == 0))
                        {
                            bit_warning = true;
                        }

                        //if ((wagon.id_countrys == 0 && id_countrys > 0) || (wagon.id_countrys > 0 && wagon.id_countrys != id_countrys) ||
                        //    (wagon.id_genus == 0 && id_genus > 0) || (wagon.id_genus > 0 && wagon.id_genus != id_genus) ||
                        //    (wagon.id_owner == 0 && id_owner > 0) || (wagon.id_owner > 0 && wagon.id_owner != id_owner) ||
                        //    (wagon.id_operator == null && id_operator_uz != null) || (wagon.id_operator != null && id_operator_uz != null && wagon.id_operator != id_operator_uz) ||
                        //    (gruzp > 0 && wagon.gruzp != gruzp) || 
                        //    (wagon.kol_os == 0 && kol_os > 0) || (wagon.kol_os > 0 && wagon.kol_os != kol_os) ||
                        //    )
                        //{
                        // Обновим информацию
                        wagon.id_countrys = (wagon.id_countrys == 0 && id_countrys > 0 ? id_countrys : wagon.id_countrys);
                        wagon.id_genus = (wagon.id_genus == 0 && id_genus > 0 ? id_genus : wagon.id_genus);
                        wagon.id_owner = (wagon.id_owner != id_owner ? id_owner : wagon.id_owner);
                        wagon.bit_warning = bit_warning;
                        wagon.change_operator = (wagon.id_operator != id_operator_uz ? DateTime.Now : wagon.change_operator);
                        wagon.sobstv_kis = (wagon.id_operator != id_operator_uz ? null : wagon.sobstv_kis);
                        wagon.id_operator = (wagon.id_operator != id_operator_uz ? id_operator_uz : wagon.id_operator);
                        wagon.gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : wagon.gruzp;
                        wagon.tara = info.tara != null ? (double?)info.tara : wagon.tara;
                        wagon.kol_os = (wagon.kol_os == 0 && kol_os > 0 ? kol_os : wagon.kol_os);
                        wagon.usl_tip = (wagon.usl_tip == null && usl_tip != null ? usl_tip : wagon.usl_tip);
                        wagon.date_rem_uz = info.repair_date;
                        //wagon.date_rem_vag = wagon.date_rem_vag;
                        wagon.id_type_ownership = id_type_ownership;
                        //wagon.sign = wagon.sign;
                        wagon.note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : "");
                        wagon.change = DateTime.Now;
                        wagon.change_user = user;
                        //}
                        List<Directory_WagonsRent> list_wagon_rent = UpdateDirectory_WagonsRent(wagon.Directory_WagonsRent.ToList(), num, id_operator_amkr, rent_start, id_limiting, user);
                        wagon.Directory_WagonsRent = list_wagon_rent != null ? list_wagon_rent : new List<Directory_WagonsRent>();
                    }
                    else
                    {
                        // Нет информации по уз вернем старую запись
                        Console.WriteLine("Нет информации по УЗ на вагон №{0}", num);
                        return wagon;
                    }
                }
                else
                {
                    // отправить на добавление и вернуть новый
                    wagon = CreateDirectory_Wagons(num, id_genus, kol_os, usl_tip, id_operator_amkr, rent_start, id_limiting, sobstv_kis, user);
                }
                return wagon;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateDirectory_Wagons(num={0}, id_genus={1}, kol_os={2}, usl_tip={3}, id_operator_amkr={4}, rent_start={5}, id_limiting={6}, sobstv_kis={7}, user={8})",
                    num, id_genus, kol_os, usl_tip, id_operator_amkr, rent_start, id_limiting, sobstv_kis, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Обновить список аренд
        /// </summary>
        /// <param name="list_wagon_rent"></param>
        /// <param name="num"></param>
        /// <param name="id_operator_amkr"></param>
        /// <param name="rent_start"></param>
        /// <param name="id_limiting"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<Directory_WagonsRent> UpdateDirectory_WagonsRent(List<Directory_WagonsRent> list_wagon_rent, int num, int? id_operator_amkr, DateTime? rent_start, int? id_limiting, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                if (list_wagon_rent == null || list_wagon_rent.Count() == 0)
                {
                    Directory_WagonsRent wagon_rent = new Directory_WagonsRent()
                    {
                        id = 0,
                        num = num,
                        id_operator = id_operator_amkr,
                        id_limiting = id_limiting,
                        rent_start = rent_start,
                        rent_end = null,
                        create = DateTime.Now,
                        create_user = user,
                        parent_id = null,
                    };
                    list_wagon_rent.Add(wagon_rent);
                    //return list_wagon_rent;
                }
                else
                {
                    Directory_WagonsRent current_wagon_rent = list_wagon_rent.Where(r => r.rent_end == null).OrderByDescending(r => r.rent_start).FirstOrDefault();
                    // Поменялся оператор?
                    if (id_operator_amkr != null && current_wagon_rent.id_operator != id_operator_amkr)
                    {
                        // Да оператор поменялся, создадим новую строку
                        // Закроем старую
                        current_wagon_rent.rent_end = rent_start;
                        current_wagon_rent.change = DateTime.Now;
                        current_wagon_rent.change_user = user;
                        // Создадим новую
                        Directory_WagonsRent wagon_rent = new Directory_WagonsRent()
                        {
                            id = 0,
                            num = num,
                            id_operator = id_operator_amkr,
                            id_limiting = id_limiting,
                            rent_start = rent_start,
                            rent_end = null,
                            create = DateTime.Now,
                            create_user = user,
                            parent_id = current_wagon_rent.id,
                        };
                        list_wagon_rent.Add(wagon_rent);
                    }
                    else
                    {
                        // Нет оператор не изменился, проверим изменение аренды или лимита
                        if ((rent_start != null && current_wagon_rent.rent_start != rent_start)
                            || (current_wagon_rent.id_limiting != id_limiting))
                        {
                            current_wagon_rent.rent_start = rent_start != null && current_wagon_rent.rent_start != rent_start ? rent_start : current_wagon_rent.rent_start;
                            current_wagon_rent.id_limiting = current_wagon_rent.id_limiting != id_limiting ? id_limiting : current_wagon_rent.id_limiting;
                            current_wagon_rent.change = DateTime.Now;
                            current_wagon_rent.change_user = user;
                        }
                    }
                    //return list_wagon_rent;

                }
                return list_wagon_rent;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("AddDirectory_WagonsRent(list_wagon_rent={0}, num={1}, id_operator_amkr={2}, rent_start={3}, id_limiting={4}, user={5})",
                    list_wagon_rent, num, id_operator_amkr, rent_start, id_limiting, user), servece_owner, eventID);
                return null;
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

    }
}
