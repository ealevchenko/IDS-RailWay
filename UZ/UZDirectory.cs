using EFUZ.Concrete;
using EFUZ.Entities;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UZ
{
    public class UZDirectory
    {
        private eventID eventID = eventID.UZ_Directory;
        protected service servece_owner = service.Null;

        EFDirectory_Cargo ef_cargo = new EFDirectory_Cargo(new EFDbContext());
        EFDirectory_Stations ef_station = new EFDirectory_Stations(new EFDbContext());


        public UZDirectory()
        {

        }

        public UZDirectory(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }

        #region Directory_Cargo
        /// <summary>
        /// Получить все строки справочника грузов
        /// </summary>
        /// <returns></returns>
        public IQueryable<Directory_Cargo> GetCargo()
        {
            try
            {
                return ef_cargo.Get().AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("GetCargo()"), this.servece_owner, this.eventID);
                return null;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id_cargo"></param>
        /// <returns></returns>
        public Directory_Cargo GetCargo(int id)
        {
            try
            {
                return ef_cargo.Get(id);
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("GetCargo(id={0})", id), this.servece_owner, this.eventID);
                return null;
            }
        }

        public int SaveCargo(Directory_Cargo Directory_Cargo)
        {
            try
            {
                ef_cargo.AddOrUpdate(Directory_Cargo);
                ef_cargo.Save();
                return ef_cargo.Refresh(Directory_Cargo).id;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SaveCargo(Directory_Cargo={0})", Directory_Cargo), this.servece_owner, this.eventID);
                return -1;
            }
        }

        public int DeleteCargo(int id)
        {
            try
            {
                ef_cargo.Delete(id);
                return ef_cargo.Save();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeleteCargo(id={0})", id), this.servece_owner, this.eventID);
                return -1;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="code_etsng"></param>
        /// <returns></returns>
        public Directory_Cargo GetCargoOfCodeETSNG(int code_etsng)
        {
            //return ef_cargo.Get().Where(c => c.code_etsng == code_etsng).FirstOrDefault();
            return ef_cargo.Context.Where(c => c.code_etsng == code_etsng).FirstOrDefault();
            //return ef_cargo.Database.SqlQuery<Directory_Cargo>("SELECT [id] ,[code_etsng] ,[name_etsng] ,[code_gng] ,[name_gng] ,[id_sap] FROM [UZ].[Directory_Cargo] where [code_etsng] = " + code_etsng.ToString() + " order by [id]").FirstOrDefault();
        }
        /// <summary>
        /// Вернуть список грузов по указаному деапазону кодов ETSNG
        /// </summary>
        /// <param name="code_start"></param>
        /// <param name="code_stop"></param>
        /// <returns></returns>
        public IQueryable<Directory_Cargo> GetCargoOfCodeETSNG(int code_etsng_start, int code_etsng_stop)
        {
            //return ef_cargo.Get().Where(c => c.code_etsng >= code_etsng_start & c.code_etsng <= code_etsng_stop).AsQueryable();
            return ef_cargo.Context.Where(c => c.code_etsng >= code_etsng_start & c.code_etsng <= code_etsng_stop).AsQueryable();
            //return ef_cargo.Database.SqlQuery<Directory_Cargo>("SELECT [id] ,[code_etsng] ,[name_etsng] ,[code_gng] ,[name_gng] ,[id_sap] FROM [UZ].[Directory_Cargo] where [code_etsng] >= " + code_etsng_start.ToString() + " and [code_etsng] <= " + code_etsng_stop.ToString() + " order by [id]").AsQueryable();

        }
        /// <summary>
        /// Вернуть уточненую строку ReferenceCargo
        /// </summary>
        /// <param name="code_etsng"></param>
        /// <returns></returns>
        public Directory_Cargo GetCorrectCargo(int code_etsng)
        {
            Directory_Cargo ref_cargo = GetCargoOfCodeETSNG(code_etsng);
            if (ref_cargo == null)
            {
                ref_cargo = GetCargoOfCodeETSNG(code_etsng * 10, (code_etsng * 10) + 9).FirstOrDefault();
            }
            return ref_cargo;
        }
        /// <summary>
        /// Вернуть откорректированный код ETSNG
        /// </summary>
        /// <param name="code_etsng"></param>
        /// <returns></returns>
        public int GetCodeCorrectCargo(int code_etsng)
        {
            Directory_Cargo ref_cargo = GetCorrectCargo(code_etsng);
            return ref_cargo != null ? ref_cargo.code_etsng : code_etsng;
        }
        /// <summary>
        /// Вернуть код ETSNG (без коррекции)
        /// </summary>
        /// <param name="code_etsng"></param>
        /// <returns></returns>
        public int GetCodeCargoOfCodeETSNG(int code_etsng)
        {
            Directory_Cargo cargo = GetCargoOfCodeETSNG(code_etsng);
            return cargo != null ? cargo.code_etsng : code_etsng;
        }
        /// <summary>
        /// Вернуть строку спраочника груза по коду ГНГ
        /// </summary>
        /// <param name="code_gng"></param>
        /// <returns></returns>
        public Directory_Cargo GetCargoOfCodeGNG(int code_gng)
        {
            return ef_cargo.Context.Where(c => c.code_gng == code_gng).FirstOrDefault();
        }
        #endregion

        #region Directory_Stations

        public IQueryable<Directory_Stations> GetStations()
        {
            try
            {
                return ef_station.Get().AsQueryable();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GeStations()"), this.servece_owner, this.eventID);
                return null;
            }
        }

        public Directory_Stations GetStations(int id)
        {
            try
            {
                return ef_station.Get(id);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GeStations(id={0})", id), this.servece_owner, this.eventID);
                return null;
            }
        }

        public int SaveStations(Directory_Stations Directory_Stations)
        {
            try
            {
                ef_station.AddOrUpdate(Directory_Stations);
                ef_station.Save();
                return ef_station.Refresh(Directory_Stations).id;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SaveStations(Directory_Stations={0})", Directory_Stations), this.servece_owner, this.eventID);
                return -1;
            }
        }

        public int DeleteStations(int id)
        {
            try
            {
                ef_station.Delete(id);
                return ef_station.Save();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("DeleteStations(id={0})", id), this.servece_owner, this.eventID);
                return -1;
            }
        }

        public Directory_Stations GetStationsOfCode(int code)
        {
            try
            {
                //return ef_station.Get().Where(c => c.code == code).FirstOrDefault();
                return ef_station.Context.Where(c => c.code == code).FirstOrDefault();
                //return ef_station.Database.SqlQuery<Directory_Stations>("SELECT [id],[code],[code_cs],[station],[id_ir] FROM [UZ].[Directory_Stations] where [code] = " + code.ToString() + " order by 1").FirstOrDefault();

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetStationsOfCode(code={0})", code), this.servece_owner, this.eventID);
                return null;
            }
        }

        public IQueryable<Directory_Stations> GetStationsOfCode(int code_start, int code_stop)
        {
            try
            {
                //return ef_station.Get().Where(c => c.code >= code_start & c.code <= code_stop).AsQueryable();
                return ef_station.Context.Where(c => c.code >= code_start & c.code <= code_stop).AsQueryable();                
                //return ef_station.Database.SqlQuery<Directory_Stations>("SELECT [id],[code],[code_cs],[station],[id_ir] FROM [UZ].[Directory_Stations] where [code] >= " + code_start.ToString() + " and [code] <= " + code_stop.ToString() + " order by 1").AsQueryable();

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetStationsOfCode(code_start={0}, code_stop={1})", code_start, code_stop), this.servece_owner, this.eventID);
                return null;
            }
        }
        /// <summary>
        /// Вернуть строку станции по скорректированному коду c проверкой текущего кода или нет (добавляем в конец вариант 0..9)
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public Directory_Stations GetCorrectStationsOfCode(int code, bool check)
        {
            try
            {
                Directory_Stations ref_station = null;
                if (check) { ref_station = GetStationsOfCode(code); }
                if (ref_station == null)
                {
                    ref_station = GetStationsOfCode(code * 10, (code * 10) + 9).FirstOrDefault();
                }
                return ref_station;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCorrectStationsOfCode(code={0})", code), this.servece_owner, this.eventID);
                return null;
            }
        }

        public Directory_Stations GetStationsOfCodeCS(int code_cs)
        {
            try
            {
                return ef_station.Get().Where(c => c.code_cs == code_cs).FirstOrDefault();
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetStationsOfCode(code_cs={0})", code_cs), this.servece_owner, this.eventID);
                return null;
            }
        }

        public int GetCodeCorrectStations(int code, bool check)
        {
            Directory_Stations ref_station = GetCorrectStationsOfCode(code, check);
            return ref_station != null ? ref_station.code : code;
        }

        public int GetCodeCSCorrectStations(int code, bool check)
        {
            Directory_Stations ref_station = GetCorrectStationsOfCode(code, check);
            return ref_station != null && ref_station.code_cs!=null ? (int)ref_station.code_cs : code;
        }

        #endregion


    }
}
