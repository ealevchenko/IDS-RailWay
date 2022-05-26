using EFIDS.Concrete;
using EFIDS.Entities;
using IDS.Helper;
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
    public class IDS_Directory : IDS_Base
    {
        private eventID eventID = eventID.IDS_Direct;
        private bool select_uz_info = false;

        public IDS_Directory()
            : base()
        {

        }

        public IDS_Directory(service servece_owner)
            : base(servece_owner)
        {

        }

        #region СПРАВОЧНИК ЖЕЛЕЗНЫХ ДОРОГ (IDS.Directory_Railway)
        ///// <summary>
        ///// Получить строку справочника железных дорог по имени администрации
        ///// </summary>
        ///// <param name="adm"></param>
        ///// <returns></returns>
        //public Directory_Railway GetDirectory_RailwayOfNameAdm(ref EFDbContext context, string adm)
        //{
        //    try
        //    {
        //        // Проверим название администрации
        //        if (!String.IsNullOrWhiteSpace(adm))
        //        {
        //            Directory_Railway dir_rw = context.Context.Where(r => r.railway_abbr_ru == adm).FirstOrDefault();
        //            return dir_rw;
        //        }
        //        return null;

        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetCode_Directory_RailwayOfNameAdm(adm={0})", adm), servece_owner, eventID);
        //        return null;
        //    }
        //}

        #endregion

        #region СПРАВОЧНИК РОД ВАГОНА (IDS.Directory_GenusWagons )
        /// <summary>
        /// Метод чтения рода вагона из справочника "Род вагона ИДС" по коду уз, если рода нет в справочнике и установлен признак add=true, 
        /// род будет  добавлена в справочник "Род вагона ИДС" по умолчанию.
        /// </summary>
        /// <param name="rod"></param>
        /// <param name="name"></param>
        /// <param name="abbr"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_GenusWagons GetDirectory_GenusWagons(int? rod, string name, string abbr, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_GenusWagons genus = GetDirectory_GenusWagons(ref context, rod, name, abbr, add, user);
                if (genus != null)
                {
                    if (context.Entry(genus).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return genus;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_GenusWagons(rod={0}, name={1}, abbr={2}, add={3}, user={4})", rod, name, abbr, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения рода вагона из справочника "Род вагона ИДС" по коду уз, если рода нет в справочнике и установлен признак add=true, 
        /// род будет  добавлена в справочник "Род вагона ИДС" по умолчанию. (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="rod"></param>
        /// <param name="name"></param>
        /// <param name="abbr"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        /// 
        public Directory_GenusWagons GetDirectory_GenusWagons(ref EFDbContext context, int? rod, string name, string abbr, bool add, string user)
        {
            try
            {
                // Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                };
                // если неопределено имя, определим по умолчанию
                if (string.IsNullOrWhiteSpace(name))
                {
                    name = "Неопределённо";
                };
                // если неопределено имя, определим по умолчанию
                if (string.IsNullOrWhiteSpace(abbr))
                {
                    abbr = "-";
                };
                EFDirectory_GenusWagons ef_dir_genus = new EFDirectory_GenusWagons(context);
                // Определим основной код
                Directory_GenusWagons genus = ef_dir_genus.Context.Where(g => g.rod_uz == rod & g.rod_default == true).FirstOrDefault();
                if (genus == null)
                {
                    // Попробуем уточняющий
                    genus = ef_dir_genus.Context.Where(g => g.rod_uz == rod).FirstOrDefault();
                    if (genus == null && add)
                    {
                        // Создадим по умолчанию
                        genus = new Directory_GenusWagons()
                        {
                            id = 0,
                            abbr_ru = abbr.Trim(),
                            genus_ru = name.Trim(),
                            abbr_en = abbr.Trim(),
                            genus_en = name.Trim(),
                            rod_uz = rod,
                            rod_default = null,
                            create = DateTime.Now,
                            create_user = user
                        };
                        ef_dir_genus.Add(genus);
                    }
                }
                return genus;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_GenusWagons(context={0} rod={1}, name={2}, abbr={3}, add={4}, user={5})", context, rod, name, abbr, add, user), servece_owner, eventID);
                return null;
            }
        }

        //public bool isDirectory_GenusWagons(int id_genus, int? rod)
        //{
        //    try
        //    {
        //        Directory_GenusWagons genus = ef_genus.Context.Where(g => g.id == id_genus & g.rod_uz == rod).FirstOrDefault();
        //        return genus != null ? true : false;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("isDirectory_GenusWagons(id_genus={0},rod={1})", id_genus, rod), servece_owner, eventID);
        //        return false;
        //    }
        //}

        #endregion

        #region СПРАВОЧНИК ВЛАДЕЛЬЦЕВ ВАГОНА (IDS.Directory_OwnersWagons )
        /// <summary>
        /// Метод чтения владельца из справочника "Владельцев ИДС" по имени, если владельца нет в справочнике и установлен признак add=true, 
        /// владелец будет добавлена в справочник "Владельцев ИДС".
        /// </summary>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_OwnersWagons GetDirectory_OwnersWagons(string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_OwnersWagons owner = GetDirectory_OwnersWagons(ref context, name, add, user);
                if (owner != null)
                {
                    if (context.Entry(owner).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return owner;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_OwnersWagons(name={0}, add={1}, user={2})", name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения владельца из справочника "Владельцев ИДС" по имени, если владельца нет в справочнике и установлен признак add=true, 
        /// владелец будет добавлена в справочник "Владельцев ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_OwnersWagons GetDirectory_OwnersWagons(ref EFDbContext context, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // проверим имя владельца
                if (String.IsNullOrWhiteSpace(name)) return null; // Выходим, неопределено имя владельца
                EFDirectory_OwnersWagons ef_dir_owner = new EFDirectory_OwnersWagons(context);

                Directory_OwnersWagons owner = ef_dir_owner.Context.Where(g => g.owner_ru.ToUpper().Trim() == name.ToUpper().Trim()).FirstOrDefault();
                // Проверим наличие 
                if (owner == null && add)
                {
                    // Определим по умолчанию
                    owner = new Directory_OwnersWagons()
                    {
                        id = 0,
                        owner_ru = name.Trim(),
                        owner_en = name.Trim(),
                        abbr_ru = name.Substring(0, name.Length > 20 ? 20 : name.Length).Trim(),
                        abbr_en = name.Substring(0, name.Length > 20 ? 20 : name.Length).Trim(),
                        local_use = false,
                        create = DateTime.Now,
                        create_user = user
                    };

                    ef_dir_owner.Add(owner);
                }
                return owner;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_OwnersWagons(context={0}, name={1}, add={2}, user={3})", context, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ОПЕРАТОРОВ (IDS.Directory_OperatorsWagons)
        /// <summary>
        /// Метод чтения оператора из справочника "Операторов вагонов ИДС" по имени, если оператора нет в справочнике и установлен признак add=true, 
        /// оператор будет добавлен в справочник "Операторов вагонов ИДС".
        /// </summary>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_OperatorsWagons GetDirectory_OperatorsWagons(string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                EFDbContext context = new EFDbContext();
                Directory_OperatorsWagons oper_wag = GetDirectory_OperatorsWagons(ref context, name, add, user);
                if (oper_wag != null)
                {
                    if (context.Entry(oper_wag).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return oper_wag;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_OperatorsWagons(name={0}, add={1}, user={2})", name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения оператора из справочника "Операторов вагонов ИДС" по имени, если оператора нет в справочнике и установлен признак add=true, 
        /// оператор будет добавлен в справочник "Операторов вагонов ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_OperatorsWagons GetDirectory_OperatorsWagons(ref EFDbContext context, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                // проверим имя владельца
                if (String.IsNullOrWhiteSpace(name)) return null; // Выходим, неопределено имя владельца
                EFDirectory_OperatorsWagons ef_dir_oper_wag = new EFDirectory_OperatorsWagons(context);

                Directory_OperatorsWagons oper_wag = ef_dir_oper_wag.Context.Where(g => g.operators_ru.ToUpper().Trim() == name.ToUpper().Trim()).FirstOrDefault();
                // Проверим наличие 
                if (oper_wag == null && add)
                {
                    // Определим по умолчанию
                    oper_wag = new Directory_OperatorsWagons()
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
                        create_user = user
                    };

                    ef_dir_oper_wag.Add(oper_wag);
                }
                return oper_wag;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_OperatorsWagons(context={0}, name={1}, add={2}, user={3})", context, name, add, user), servece_owner, eventID);
                return null;
            }
        }

        #endregion

        #region СПРАВОЧНИК ВНЕШНИХ СТАНЦИЙ (Directory_ExternalStation)
        /// <summary>
        /// Метод чтения станции из справочника "Внешних станций ИДС" по коду, если станции нет в справочнике и установлен признак add=true, 
        /// станция будет найдена в справочнике БД УЗ и добавлена в справочник "Внешних станций ИДС".
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
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_ExternalStation ext_station = GetDirectory_ExternalStation(ref context, code, name, add, user);
                if (ext_station != null)
                {
                    if (context.Entry(ext_station).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return ext_station;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_ExternalStation(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения станции из справочника "Внешних станций ИДС" по коду, если станции нет в справочнике и установлен признак add=true, 
        /// станция будет найдена в справочнике БД УЗ и добавлена в справочник "Внешних станций ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_ExternalStation GetDirectory_ExternalStation(ref EFDbContext context, int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDirectory_ExternalStation ef_dir_ext_station = new EFDirectory_ExternalStation(context);
                EFDirectory_InlandRailway ef_dir_ir = new EFDirectory_InlandRailway(context);

                Directory_ExternalStation station = ef_dir_ext_station.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (station == null && add)
                {
                    // Определим по умолчанию
                    station = new Directory_ExternalStation()
                    {
                        code = code,
                        station_name_ru = name.Trim(),
                        station_name_en = name.Trim(),
                        code_inlandrailway = 0,// До выяснения
                        create = DateTime.Now,
                        create_user = user
                    };
                    // Станция не найдена, но стоит признак создать автоматически
                    // Обратимся в справочник УЗ
                    WebAPIClientUZ_GOV client_uz = new WebAPIClientUZ_GOV(base.servece_owner);
                    List<UZStationInfo> list_station_uz = client_uz.GetInfoStationOfCode(code);
                    if (list_station_uz != null && list_station_uz.Count() > 0)
                    {
                        // Станция получена
                        UZStationInfo station_uz = list_station_uz[0];
                        station.code = station_uz.code;
                        station.station_name_ru = station_uz.name.Trim();
                        station.station_name_en = station_uz.name.Trim();
                        // Поиск дороги
                        Directory_InlandRailway dir_ir = ef_dir_ir.Context.Where(r => r.inlandrailway_name_ru.ToLower().Trim() == station_uz.ir.ToLower().Trim()).FirstOrDefault();
                        if (dir_ir != null)
                        {
                            station.code_inlandrailway = dir_ir.code;
                        }
                    }
                    ef_dir_ext_station.Add(station);
                }
                return station;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_ExternalStation(context={0}, code={1}, name={2}, add={3}, user={4})", context, code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ПОГРАН ПЕРЕХОДОВ (Directory_BorderCheckpoint)
        /// <summary>
        /// Метод чтения станции погран перехода из справочника "Погран переходов ИДС" по коду, если станции нет в справочнике и установлен признак add=true, 
        /// станция будет найдена в справочнике БД УЗ и добавлена в справочник "Погран переходов ИДС".
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
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_BorderCheckpoint ext_station = GetDirectory_BorderCheckpoint(ref context, code, name, add, user);
                if (ext_station != null)
                {
                    if (context.Entry(ext_station).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return ext_station;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_BorderCheckpoint(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения станции погран перехода из справочника "Погран переходов ИДС" по коду, если станции нет в справочнике и установлен признак add=true, 
        /// станция будет найдена в справочнике БД УЗ и добавлена в справочник "Погран переходов ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_BorderCheckpoint GetDirectory_BorderCheckpoint(ref EFDbContext context, int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDirectory_BorderCheckpoint ef_dir_bc = new EFDirectory_BorderCheckpoint(context);
                EFDirectory_InlandRailway ef_dir_ir = new EFDirectory_InlandRailway(context);


                //EFUZ.Concrete.EFDbContext uz_context = new EFUZ.Concrete.EFDbContext();
                //EFUZ.Concrete.EFDirectory_Stations ef_uz_station = new EFUZ.Concrete.EFDirectory_Stations(uz_context);


                Directory_BorderCheckpoint station = ef_dir_bc.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (station == null && add)
                {
                    // Определим по умолчанию
                    station = new Directory_BorderCheckpoint()
                    {
                        code = code,
                        station_name_ru = name,
                        station_name_en = name,
                        code_inlandrailway = 0,// До выяснения
                        create = DateTime.Now,
                        create_user = user
                    };
                    // Станция не найдена, но стоит признак создать автоматически
                    // Обратимся в справочник УЗ
                    WebAPIClientUZ_GOV client_uz = new WebAPIClientUZ_GOV(base.servece_owner);
                    List<UZStationInfo> list_station_uz = client_uz.GetInfoStationOfCode(code);
                    if (list_station_uz != null && list_station_uz.Count() > 0)
                    {
                        // Станция получена
                        UZStationInfo station_uz = list_station_uz[0];
                        station.code = station_uz.code;
                        station.station_name_ru = station_uz.name;
                        station.station_name_en = station_uz.name;
                        // Поиск дороги
                        Directory_InlandRailway dir_ir = ef_dir_ir.Context.Where(r => r.inlandrailway_name_ru.ToLower().Trim() == station_uz.ir.ToLower().Trim()).FirstOrDefault();
                        if (dir_ir != null)
                        {
                            station.code_inlandrailway = dir_ir.code;
                        }
                    }
                    ef_dir_bc.Add(station);
                }
                return station;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_BorderCheckpoint(context={0}, code={1}, name={2}, add={3}, user={4})", context, code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ГРУЗООТПРАВИТЕЛЕЙ (в нашу сторону) и ГРУЗОПОЛУЧАТЕЛЕЙ от нас  (Directory_Shipper)
        /// <summary>
        /// Метод чтения грузоотправителя из справочника "Грузоотправителей ИДС" по коду, если грузоотправителя нет в справочнике и установлен признак add=true, 
        /// грузоотправитель будет создан по вх данным и добавлен в справочник "Грузоотправителей ИДС".
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Shipper GetDirectory_Shipper(int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_Shipper shipper = GetDirectory_Shipper(ref context, code, name, add, user);
                if (shipper != null)
                {
                    if (context.Entry(shipper).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return shipper;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_Shipper(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения грузоотправителя из справочника "Грузоотправителей ИДС" по коду, если грузоотправителя нет в справочнике и установлен признак add=true, 
        /// грузоотправитель будет создан по вх данным и добавлен в справочник "Грузоотправителей ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_Shipper GetDirectory_Shipper(ref EFDbContext context, int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDirectory_Shipper ef_shipper = new EFDirectory_Shipper(context);

                Directory_Shipper shipper = ef_shipper.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (shipper == null && add)
                {
                    // Определим по умолчанию
                    shipper = new Directory_Shipper()
                    {
                        code = code,
                        shipper_name_ru = name,
                        shipper_name_en = name,
                        create = DateTime.Now,
                        create_user = user
                    };

                    ef_shipper.Add(shipper);
                }
                return shipper;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_Shipper(context={0}, code={1}, name={2}, add={3}, user={4})", context, code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ПЛАТИЛЬЩИКОВ ПО ОТПРАВКЕ (Directory_PayerSender)
        /// <summary>
        /// Метод чтения платильщика по отправке из справочника "Платильщики по отправке ИДС" по коду, если платильщика нет в справочнике и установлен признак add=true, 
        /// платильщик будет создан по вх данным и добавлен в справочник "Платильщики по отправке ИДС".
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_PayerSender GetDirectory_PayerSender(string code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_PayerSender ps = GetDirectory_PayerSender(ref context, code, name, add, user);
                if (ps != null)
                {
                    if (context.Entry(ps).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return ps;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_PayerSender(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения платильщика по отправке из справочника "Платильщики по отправке ИДС" по коду, если платильщика нет в справочнике и установлен признак add=true, 
        /// платильщик будет создан по вх данным и добавлен в справочник "Платильщики по отправке ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_PayerSender GetDirectory_PayerSender(ref EFDbContext context, string code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDirectory_PayerSender ef_ps = new EFDirectory_PayerSender(context);

                Directory_PayerSender ps = ef_ps.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (ps == null && add)
                {
                    // Определим по умолчанию
                    ps = new Directory_PayerSender()
                    {
                        code = code,
                        payer_name_ru = name,
                        payer_name_en = name,
                        create = DateTime.Now,
                        create_user = user
                    };

                    ef_ps.Add(ps);
                }
                return ps;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_PayerSender(context={0}, code={1}, name={2}, add={3}, user={4})", context, code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ГРУЗОВ ЕТСНГ (Directory_CargoETSNG)
        /// <summary>
        /// Метод чтения груза ЕТСНГ из справочника "Грузов ЕТ СНГ ИДС" по коду, если груза нет в справочнике и установлен признак add=true, 
        /// груз будет создан по вх данным и добавлен в справочник "Грузов ЕТ СНГ ИДС".
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_CargoETSNG GetDirectory_CargoETSNG(int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_CargoETSNG obj = GetDirectory_CargoETSNG(ref context, code, name, add, user);
                if (obj != null)
                {
                    if (context.Entry(obj).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return obj;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_CargoETSNG(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения груза ЕТСНГ из справочника "Грузов ЕТ СНГ ИДС" по коду, если груза нет в справочнике и установлен признак add=true, 
        /// груз будет создан по вх данным и добавлен в справочник "Грузов ЕТ СНГ ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_CargoETSNG GetDirectory_CargoETSNG(ref EFDbContext context, int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDirectory_CargoETSNG ef_dir_cargo = new EFDirectory_CargoETSNG(context);

                Directory_CargoETSNG obj = ef_dir_cargo.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (obj == null && add)
                {
                    // Уточним имя если груз не задан
                    if (String.IsNullOrWhiteSpace(name))
                    {
                        UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ 
                        EFUZ.Entities.Directory_Cargo cargo_uz = uz_directory.GetCorrectCargo(code);
                        name = cargo_uz != null ? cargo_uz.name_etsng : "Название груза ЕТСНГ не определено!";
                    }
                    // Определим по умолчанию
                    obj = new Directory_CargoETSNG()
                    {
                        id = 0,
                        code = code,
                        cargo_etsng_name_ru = name.Substring(0, name.Length > 250 ? 250 : name.Length).Trim(),
                        cargo_etsng_name_en = name.Substring(0, name.Length > 250 ? 250 : name.Length).Trim(),
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_dir_cargo.Add(obj);
                }
                return obj;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_CargoETSNG(context={0}, code={1}, name={2}, add={3}, user={4})", context, code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ГРУЗОВ ГНГ (Directory_CargoGNG)
        /// <summary>
        /// Метод чтения груза ГНГ из справочника "Грузов ГНГ ИДС" по коду, если груза нет в справочнике и установлен признак add=true, 
        /// груз будет создан по вх данным и добавлен в справочник "Грузов ГНГ ИДС".
        /// </summary>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_CargoGNG GetDirectory_CargoGNG(int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDbContext context = new EFDbContext();
                Directory_CargoGNG obj = GetDirectory_CargoGNG(ref context, code, name, add, user);
                if (obj != null)
                {
                    if (context.Entry(obj).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        int res_add = context.SaveChanges();
                    }
                }
                return obj;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_CargoGNGETSNG(code={0}, name={1}, add={2}, user={3})", code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Метод чтения груза ГНГ из справочника "Грузов ГНГ ИДС" по коду, если груза нет в справочнике и установлен признак add=true, 
        /// груз будет создан по вх данным и добавлен в справочник "Грузов ГНГ ИДС". (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="code"></param>
        /// <param name="name"></param>
        /// <param name="add"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Directory_CargoGNG GetDirectory_CargoGNG(ref EFDbContext context, int code, string name, bool add, string user)
        {
            try
            {
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }

                EFDirectory_CargoGNG ef_dir_cargo = new EFDirectory_CargoGNG(context);

                Directory_CargoGNG obj = ef_dir_cargo.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (obj == null && add)
                {
                    // Уточним имя если груз не задан
                    if (String.IsNullOrWhiteSpace(name))
                    {
                        UZDirectory uz_directory = new UZDirectory(this.servece_owner);// Подключим библиотеку УЗ 
                        EFUZ.Entities.Directory_Cargo cargo_uz = uz_directory.GetCargoOfCodeGNG(code);
                        name = cargo_uz != null ? cargo_uz.name_gng : "Название груза ГНГ не определено!";
                    }
                    // Определим по умолчанию
                    obj = new Directory_CargoGNG()
                    {
                        id = 0,
                        code = code,
                        cargo_gng_name_ru = name.Substring(0, name.Length > 250 ? 250 : name.Length).Trim(),
                        cargo_gng_name_en = name.Substring(0, name.Length > 250 ? 250 : name.Length).Trim(),
                        create = DateTime.Now,
                        create_user = user
                    };
                    ef_dir_cargo.Add(obj);
                }
                return obj;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDirectory_CargoGNG(context={0}, code={1}, name={2}, add={3}, user={4})", context, code, name, add, user), servece_owner, eventID);
                return null;
            }
        }
        #endregion

        #region СПРАВОЧНИК ВАГОНОВ (IDS.Directory_Wagons)
        /// <summary>
        /// Проверка номера вогона на соответсвие системной нумерации, (контрольная сумма)
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
        /// <summary>
        /// Метод выполнения операции чтения данных с картачки вагона ИДС с автоматическим обновлением по текущим даным БД УЗ, 
        /// если информации нет оздается строка по вагону с по данным БД УЗ.
        /// </summary>
        /// <param name="num"></param>
        /// <param name="adm"></param>
        /// <param name="rod"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="not_check_numeration"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultObject OperationCreateUpdateWagon(int num, int adm, int? rod, int kol_os, string usl_tip, bool not_check_numeration, string user)
        {
            try
            {
                EFDbContext context = new EFDbContext();
                //Проверим и скорректируем пользователя
                if (String.IsNullOrWhiteSpace(user))
                {
                    user = System.Environment.UserDomainName + @"\" + System.Environment.UserName;
                }
                ResultObject res_obj = OperationCreateUpdateWagon(ref context, num, adm, rod, kol_os, usl_tip, not_check_numeration, user);
                if (res_obj!= null && res_obj.result>=0 && res_obj.obj != null)
                {
                    if (context.Entry((Directory_Wagons)res_obj.obj).State != System.Data.Entity.EntityState.Unchanged)
                    {
                        res_obj.result = context.SaveChanges();
                    }
                }
                return res_obj;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateUpdateWagon(num={0}, adm={1}, rod={2}, kol_os={3}, usl_tip={4}, not_check_numeration={5}, user={6})",
                    num, adm, rod, kol_os, usl_tip, not_check_numeration, user), servece_owner, eventID);
                return null;// (int)errors_base.global;
            }
        }
        /// <summary>
        /// Метод выполнения операции чтения данных с картачки вагона ИДС с автоматическим обновлением по текущим даным БД УЗ, 
        /// если информации нет оздается строка по вагону с по данным БД УЗ. (но изменения будут приняты после выполнения context.SaveChanges())
        /// </summary>
        /// <param name="context"></param>
        /// <param name="num"></param>
        /// <param name="adm"></param>
        /// <param name="rod"></param>
        /// <param name="kol_os"></param>
        /// <param name="usl_tip"></param>
        /// <param name="not_check_numeration"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultObject OperationCreateUpdateWagon(ref EFDbContext context, int num, int adm, int? rod, int kol_os, string usl_tip, bool not_check_numeration, string user)
        {
            ResultObject result = new ResultObject();
            try
            {
                // Проверка номера вагона
                if (!not_check_numeration)
                {
                    if (!IsCorrectNumCar(num))
                    {
                        result.result = (int)errors_base.error_sys_numeration_wagon; // Ошибка системной нумерации вагона
                        return result;
                    }

                }
                else
                {
                    if (num <= 0)
                    {
                        result.result = (int)errors_base.error_numeration_wagon; // Ошибка системной нумерации вагона (вагон не может быть отрицательным или равен 0)
                        return result;
                    }
                }
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
                WebAPIClientUZ_GOV client = new WebAPIClientUZ_GOV(this.servece_owner); // Подключим WebAPI справочник УЗ
                // Получим информацию из БД УЗ
                UZWagonInfo info = this.select_uz_info ? client.GetInfoWagonOfNum(num): null;
                //int? id_type_ownership = null;
                // Определим АДМ -> id_countrys
                Directory_Railway dir_rw = (info != null ? context.Directory_Railway.Where(r => r.railway_abbr_ru == info.admin).FirstOrDefault() : null);
                int id_countrys = dir_rw != null ? dir_rw.id_countrys : 0;
                // Определим род вагона (Поищим в ИДС если нет создадим по умолчанию и вернем)
                Directory_GenusWagons dir_genus_ids = GetDirectory_GenusWagons(ref context, rod, null, null, true, user);
                // род вагона
                int id_genus = dir_genus_ids != null ? dir_genus_ids.id : 0; // Нашли вернем id иначе по "До выяснения"
                // Определим владельца
                Directory_OwnersWagons dir_owner_ids = null;
                if (info != null)
                {
                    dir_owner_ids = GetDirectory_OwnersWagons(ref context, info.owner, true, user);
                }
                int id_owner = (dir_owner_ids != null ? dir_owner_ids.id : 0);   // Нашли вернем id иначе по "До выяснения"
                // Определим оператора УЗ
                Directory_OperatorsWagons dir_operator_ids = null;
                if (info != null)
                {
                    dir_operator_ids = GetDirectory_OperatorsWagons(ref context, info.operat, true, user);
                }
                int? id_operator_uz = (dir_operator_ids != null ? dir_operator_ids.id : 0);   // Нашли вернем id иначе по "До выяснения"

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
                        id_type_ownership = null,
                        factory_number = null,
                        inventory_number = null,
                        year_built = null,
                        exit_ban = not_check_numeration, // если запрет проверки нумерации, тогда это вагоны внутренние
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
                    result.obj = wagon;
                    result.mode = mode_obj.add;
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
                    if ((wagon.id_genus == 0 && id_genus == 0) || (wagon.id_countrys == 0 && id_countrys == 0))
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
                    //wagon.id_type_ownership = (id_type_ownership != null && wagon.id_type_ownership == null && id_type_ownership != wagon.id_type_ownership ? id_type_ownership : wagon.id_type_ownership);
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
                    result.obj = wagon;
                    result.mode = mode_obj.update;
                }
                // вернем вагон
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("OperationCreateUpdateWagon(context={0}, num={1}, adm={2}, rod={3}, kol_os={4}, usl_tip={5},not_check_numeration={6}, user={7})",
                    context, num, adm, rod, kol_os, usl_tip, not_check_numeration, user), servece_owner, eventID);
                result.result = (int)errors_base.global;
                return result;
            }
        }
        #endregion
    }
}
