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
    public class IDSDirectory
    {
        private eventID eventID = eventID.IDS_Directory;
        protected service servece_owner = service.Null;

        EFDirectory_Station ef_station = new EFDirectory_Station(new EFDbContext());
        EFDirectory_Consignee ef_сonsignee = new EFDirectory_Consignee(new EFDbContext());
        EFDirectory_Cars ef_car = new EFDirectory_Cars(new EFDbContext());
        EFDirectory_Countrys ef_countrys = new EFDirectory_Countrys(new EFDbContext());
        EFDirectory_GenusWagons ef_genus = new EFDirectory_GenusWagons(new EFDbContext());
        EFDirectory_OwnersWagons ef_owner = new EFDirectory_OwnersWagons(new EFDbContext());
        EFDirectory_OperatorsWagons ef_operator = new EFDirectory_OperatorsWagons(new EFDbContext());

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
                int id_genus = card != null ? card.id_genus_wagon : GetID_Directory_GenusWagonsOfRod(rod, true, user);
                int id_owner = card != null ? card.id_owner_wagon : GetID_Directory_OwnersWagonsOfName(info.owner, true, user);
                int? id_operator = card != null && card.id_operator_wagon != null ? (int)card.id_operator_wagon : GetID_Directory_OperatorsWagonsOfName(info.operat, true, user);
                int? id_type_ownership = card != null ? (int?)card.id_type_ownership : null;
                // Создадим новую запись
                Directory_Cars new_car = new Directory_Cars()
                {
                    id = 0,
                    num = num,
                    id_countrys = id_countrys,
                    // если есть старая запись и она соответсвует группе род, тогда переносим, инчи новый род
                    id_genus = last_car != null && isDirectory_GenusWagons(last_car.id_genus, rod) ?   last_car.id_genus : id_genus,
                    id_owner = id_owner,
                    // если есть старая запись и в ней стоит блокировка изменения оператора тогда переносим блокировку, иначе нет блокировки
                    ban_changes_operator = last_car !=null && last_car.ban_changes_operator == true ? true : false,
                    // если есть старая запись и в ней стоит блокировка изменения оператора тогда переносим старого оператора, иначе нового оператора
                    id_operator = last_car != null && last_car.ban_changes_operator == true ? last_car.id_operator : id_operator,
                    // защита иногда нет значения                    
                    gruzp = info.carrying_capacity!=null ? (double)info.carrying_capacity : 0,
                    kol_os = kol_os,
                    usl_tip = usl_tip,
                    date_rem_uz = info.repair_date,
                    date_rem_vag = last_car != null ? last_car.date_rem_vag : null, // если есть старая запись унаследуем свойсво дата ремонта на вагоне
                    id_limiting = last_car != null ? last_car.id_limiting : null,  // если есть старая запись унаследуем свойсво лимит погрузки
                    id_type_ownership = id_type_ownership,
                    // если есть старая запись и в ней стоит блокировка изменения оператора тогда переносим начало аренды, иначе пустое поле                    
                    rent_start =  (last_car != null && last_car.ban_changes_operator == true) || (last_car != null && last_car.ban_changes_operator == false && last_car.id_operator == id_operator) ? last_car.rent_start : null,
                    rent_end = null,
                    note = "Запрет выхода:" + info.exit_ban + "; Другие запреты:" + (info.other_bans != null ? info.other_bans.Replace("<br>", "") : ""),
                    sobstv_kis = null,
                    create = DateTime.Now,
                    create_user = user,
                };
                // Если есть старая запись проверим на изменения
                if (last_car != null)
                {
                    if (last_car.id_countrys != new_car.id_countrys ||
                        !isDirectory_GenusWagons(last_car.id_genus, rod) ||
                        last_car.id_owner != new_car.id_owner ||
                        (last_car.ban_changes_operator == false && last_car.id_operator != new_car.id_operator) ||
                        last_car.gruzp != new_car.gruzp ||
                        last_car.kol_os != new_car.kol_os ||
                        last_car.date_rem_uz != new_car.date_rem_uz ||
                        last_car.id_type_ownership != new_car.id_type_ownership)
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
        #endregion
    }
}
