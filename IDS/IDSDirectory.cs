using EFIDS.Concrete;
using EFIDS.Entities;
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
                    if (uz_station != null) { 
                        // По указанному коду есть станция, создадим строку для внутреннего справочника станций
                        station = new Directory_Station()
                        {
                             id =0, 
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
    }
}
