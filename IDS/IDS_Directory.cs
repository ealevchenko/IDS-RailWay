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

        public IDS_Directory()
            : base()
        {

        }

        public IDS_Directory(service servece_owner)
            : base(servece_owner)
        {

        }

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


                //EFUZ.Concrete.EFDbContext uz_context = new EFUZ.Concrete.EFDbContext();
                //EFUZ.Concrete.EFDirectory_Stations ef_uz_station = new EFUZ.Concrete.EFDirectory_Stations(uz_context);


                Directory_ExternalStation station = ef_dir_ext_station.Context.Where(s => s.code == code).FirstOrDefault();
                // Проверим наличие станции
                if (station == null && add)
                {
                    // Определим по умолчанию
                    station = new Directory_ExternalStation()
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

    }
}
