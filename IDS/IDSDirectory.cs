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
        EFDirectory_Cars ef_car = new EFDirectory_Cars(new EFDbContext());
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

        #region СПРАВОЧНИК ВАГОНОВ (IDS.Directory_Cars )

        public Directory_Cars GetCurrentDirectory_CarsOfNum(int num, string user)
        {
            try
            {
                if (this.transfer_new_car_of_kis)
                {
                    int result_add_new_car = InsertNewDirectory_Cars(num, user);
                    if (result_add_new_car != 0)
                    {
                        String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, код выполнения : {1}", num, result_add_new_car).WarningLog(servece_owner, this.eventID);
                    }
                }
                Directory_Cars car = this.ef_car
                    .Context
                    .Where(w => w.num == num)
                    .ToList()
                    .Select(m => m.GetDirectory_Cars()).OrderByDescending(c => c.rent_start).FirstOrDefault();
                return car;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentDirectory_CarsOfNum(num={0})", num), servece_owner, eventID);
                return null;
            }
        }
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
        public Directory_Cars GetCurrentDirectory_CarsOfNum(int num, int adm, int? rod, int kol_os, string usl_tip, bool create_dir, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                if (this.transfer_new_car_of_kis)
                {
                    int result_add_new_car = InsertNewDirectory_Cars(num, user);
                    if (result_add_new_car != 0)
                    {
                        String.Format("В справочник 'ВАГОНОВ ИДС' - добавлен новый вагон №{0}, код выполнения : {1}", num, result_add_new_car).WarningLog(servece_owner, this.eventID);
                    }
                }
                WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner);
                IDSMORS mors = new IDSMORS(this.servece_owner);
                // Получим информацию из БД УЗ
                UZWagonInfo info = client.GetInfoWagonOfNum(num);
                // Получим информ ацию последнюю запись из БД ИДС
                Directory_Cars last_car = this.ef_car
                    .Context.Where(c => c.num == num)
                    .OrderByDescending(c => c.create)
                    .ToList()
                    .Select(c => c.GetDirectory_Cars())
                    .FirstOrDefault();

                if (info == null & last_car == null) return null; // Данніх нет вернем null (можно вернуть пустую запись)
                // Определим справочные данные
                CardsWagons card = mors.GetCardsWagonsOfNum(num);
                int id_countrys = GetID_Directory_CountrysOfAdm(adm, true, user);
                int id_genus = GetID_Directory_GenusWagonsOfRod(rod, true, user);
                int id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);
                int? id_operator_uz = (info != null ? GetID_Directory_OperatorsWagonsOfName(info.operat, true, user) : null);
                // Оператор ручной , если есть предыдущая запись берем ее иначе читаем текущий по ГИС
                int? id_operator = (last_car != null ? last_car.id_operator : info != null ? GetID_Directory_OperatorsWagonsOfName(info.operat, true, user) : null);
                // Признак изменения оператора
                bool ban_changes_operator = false;
                // Не определен оператор в ручную, новый оператор по ГИС отличается от старого
                if (id_operator == null || (last_car != null && last_car.id_operator_uz != id_operator_uz))
                {
                    ban_changes_operator = true;
                }
                int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
                // Создадим новую запись
                Directory_Cars new_car = new Directory_Cars()
                {
                    id = 0,
                    num = num,
                    id_countrys = id_countrys,
                    // если есть старая запись и она соответсвует группе род, тогда переносим, инчи новый род
                    id_genus = last_car != null && isDirectory_GenusWagons(last_car.id_genus, rod) ? last_car.id_genus : id_genus,
                    id_owner = id_owner,
                    id_operator_uz = id_operator_uz,
                    ban_changes_operator = ban_changes_operator,
                    id_operator = id_operator,                                      // !! Меняем по изменению - в ручную
                    // защита иногда нет значения                    
                    gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
                    kol_os = kol_os,
                    usl_tip = (usl_tip == "" ? null : usl_tip),
                    date_rem_uz = info.repair_date,
                    date_rem_vag = last_car != null ? last_car.date_rem_vag : null, // если есть старая запись унаследуем свойсво дата ремонта на вагоне
                    id_limiting = last_car != null ? last_car.id_limiting : null,   // !! Меняем по изменению id_operator - в ручную
                    id_type_ownership = id_type_ownership,
                    rent_start = (last_car != null ? last_car.rent_start : null),   // !! Меняем по изменению id_operator - в ручную
                    rent_end = null,
                    sign = (last_car != null ? last_car.sign : null),               // !! Меняем по изменению id_operator - в ручную
                    note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
                    sobstv_kis = (last_car != null ? last_car.sobstv_kis : null),   // !! Меняем по изменению id_operator - в ручную
                    create = DateTime.Now,
                    create_user = user,
                };
                // Если есть старая запись проверим на изменения
                if (last_car != null)
                {
                    if (
                        last_car.id_countrys != new_car.id_countrys ||
                        !isDirectory_GenusWagons(last_car.id_genus, rod) ||
                        last_car.id_owner != new_car.id_owner ||
                        last_car.id_operator_uz != new_car.id_operator_uz ||
                        last_car.gruzp != new_car.gruzp ||
                        last_car.kol_os != new_car.kol_os ||
                        last_car.date_rem_uz != new_car.date_rem_uz ||
                        last_car.id_type_ownership != new_car.id_type_ownership
                        )
                    {
                        // Изменено
                        return new_car;
                    }
                    else
                    {
                        // Не изменено
                        return last_car;
                    }
                }
                // Вагон зашел первій раз
                return new_car;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCurrentDirectory_CarsOfNum(num={0},create_dir={1})", num, create_dir), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Создать справочник вагонов по данным КИС
        /// </summary>
        /// <returns></returns>
        public int CreateDirectory_CarsInKIS()
        {

            try
            {
                string user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                KISDirectory kis_dir = new KISDirectory(this.servece_owner);// Подключим библиотеку КИС


                List<KOMETA_VAGON_SOB> list_cars_kis = kis_dir.GetCurrent_KOMETA_VAGON_SOB();

                int count = list_cars_kis.Count();
                foreach (KOMETA_VAGON_SOB vag_kis in list_cars_kis.ToList())
                {
                    //EFDirectory_Cars ef_car = new EFDirectory_Cars(new EFDbContext());
                    int result = InsertNewDirectory_Cars(vag_kis.N_VAGON, user);
                    count--;
                    Console.WriteLine("Перенес вагон №{0}, код {1}, осталось перенести {2}", vag_kis.N_VAGON, result, count);
                }

                return 0;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateDirectory_CarsInKIS()"), servece_owner, eventID);
                return -1;
            }

        }
        /// <summary>
        /// Добавить в справочник новый вагон (по справочнику КИС и справочнику операторов и ограничений ИРЫ)
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public int InsertNewDirectory_Cars(int num, string user)
        {
            try
            {
                KISDirectory kis_dir = new KISDirectory(this.servece_owner);// Подключим библиотеку КИС
                IDSMORS mors = new IDSMORS(this.servece_owner);
                EFDirectory_Cars_KIS ef_car_kis = new EFDirectory_Cars_KIS(new EFDbContext());
                WebAPIClientUZ client = new WebAPIClientUZ(this.servece_owner);
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                KOMETA_VAGON_SOB vag_kis = kis_dir.GetCurrent_KOMETA_VAGON_SOB(num);


                Directory_Cars car_old = ef_car.Context.Where(c => c.num == num).FirstOrDefault();
                if (car_old == null)
                {
                    //Console.WriteLine("Переношу вагон №{0}", num);
                    // Определим справочные данные
                    CardsWagons card = mors.GetCardsWagonsOfNum(num);
                    // Получим строку из справочника Иры
                    Directory_Cars_KIS dir_car_kis = ef_car_kis.Context.Where(c => c.num == num).FirstOrDefault();
                    // Получим информацию из БД УЗ
                    UZWagonInfo info = client.GetInfoWagonOfNum(num);
                    int id_countrys = 0;
                    int id_owner = 0;   // Владелец
                    int? id_operator = dir_car_kis != null ? dir_car_kis.id_operator : null; // Оператор по справочнику ИДС (выставлен Ирой)
                    int? id_operator_uz = null; // Оператор по справочнику УЗ
                    int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;

                    // Обработаем информацию из БД УЗ
                    if (info != null)
                    {
                        Directory_Railway dir_rw = GetDirectory_RailwayOfNameAdm(info.admin);
                        id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
                        id_owner = GetID_Directory_OwnersWagonsOfName(info.owner, true, user);
                        id_operator_uz = GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);
                    }

                    if (dir_car_kis != null)
                    {
                        // Вагон обработан Ирой
                        if (info != null)
                        {
                            // Есть информация по УЗ
                            Directory_Cars new_car = new Directory_Cars()
                            {
                                id = 0,
                                num = num,
                                id_countrys = id_countrys,
                                id_genus = (int)dir_car_kis.id_genus,
                                id_owner = id_owner,
                                ban_changes_operator = false,
                                id_operator = id_operator,
                                id_operator_uz = id_operator_uz,
                                gruzp = info.carrying_capacity != null ? (double)info.carrying_capacity : 0,
                                kol_os = 0,
                                usl_tip = null,
                                date_rem_uz = info.repair_date,
                                date_rem_vag = null,
                                id_limiting = dir_car_kis.id_limiting,
                                id_type_ownership = id_type_ownership,
                                rent_start = vag_kis.DATE_AR,
                                rent_end = null,
                                sign = null,
                                note = "Запрет выхода:" + (info.exit_ban != null ? info.exit_ban : "нет") + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
                                sobstv_kis = vag_kis.SOB,
                                create = DateTime.Now,
                                create_user = user,
                            };
                            //Console.WriteLine("Записываю вагон №{0}, id_owner = {1}", num, id_owner);
                            ef_car.Add(new_car);
                            int res = ef_car.Save();
                            return res;
                        }
                        else
                        {
                            // Нет информации по уз
                            Console.WriteLine("Нет информации по УЗ на вагон №{0}", num);
                            return 0;
                        }
                    }
                    else
                    {
                        // Это новый вагон
                        Console.WriteLine("Нет информации в справочнике ИРЫ на вагон №{0}", num);
                        return 0;
                    }
                }
                else
                {
                    Console.WriteLine("Вагон №{0} - уже перенесен, пропускаю", num);
                    return 0;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateDirectory_CarsInKIS()"), servece_owner, eventID);
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

    }
}
