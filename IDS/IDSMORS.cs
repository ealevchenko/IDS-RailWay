using EFIDS.Concrete;
using EFIDS.Entities;
using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS
{
    public class WTMotionSignals
    {
        public long id_wt { get; set; }
        public int nvagon { get; set; }
        public int? st_disl { get; set; }
        public string nst_disl { get; set; }
        public int? kodop { get; set; }
        public string nameop { get; set; }
        public string full_nameop { get; set; }
        public DateTime? dt { get; set; }
        public int? st_form { get; set; }
        public string nst_form { get; set; }
        public int? idsost { get; set; }
        public string nsost { get; set; }
        public int? st_nazn { get; set; }
        public string nst_nazn { get; set; }
        public int? ntrain { get; set; }
        public int? st_end { get; set; }
        public string nst_end { get; set; }
        public int? kgr { get; set; }
        public string nkgr { get; set; }
        public int id_cargo { get; set; }
        public int? kgrp { get; set; }
        public decimal? ves { get; set; }
        public DateTime? updated { get; set; }
        public int? kgro { get; set; }
        public int? km { get; set; }
        public int station_from { get; set; }
        public int station_end { get; set; }
        public int route { get; set; }
        public int? shipper { get; set; }
        public int? consignee { get; set; }
        public int location { get; set; }
        public int condition { get; set; }
        public int type_flight { get; set; }
        public DateTime? start_flight { get; set; }
        public DateTime? start_turnover { get; set; }
        public int? duration_flight { get; set; }
        public int? duration_turnover { get; set; }
        public string note { get; set; }
    }
    /// <summary>
    /// Описание маршрута вагона
    /// </summary>
    public enum ids_route : int
    {
        not = 0,
        amkr = 1,
        send = 2,
        client = 3,
        ret = 4,
    }
    /// <summary>
    /// Местонахождение вагона
    /// </summary>
    public enum ids_location_wagon : int
    {
        not = 0,
        moves = 1,
        loading_unloading = 2,
    }
    /// <summary>
    /// Состояние вагона
    /// </summary>
    public enum ids_condition_wagon : int
    {
        not = 0,
        empty = 1,  // Порожний
        loaded = 2, // Груженный
    }
    /// <summary>
    /// Виды рейсов
    /// </summary>
    public enum ids_type_flight_wagon : int
    {
        not = 0,
        loading = 1,        // Погрузка
        loaded_flight = 2,  // Груженный
        unloading = 3,      // Выгрузка
        empty_flight = 4,   // Порожний
    }

    public class IDSMORS
    {
        private eventID eventID = eventID.IDS_IDSMORS;
        protected service servece_owner = service.Null;

        public IDSMORS()
        {

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="servece_owner"></param>
        public IDSMORS(service servece_owner)
        {
            this.servece_owner = servece_owner;
        }
        /// <summary>
        /// Получить список вагонов по которым заведены карточки
        /// </summary>
        /// <returns></returns>
        public List<int> GetNumCarsOfAMKR()
        {
            try
            {
                EFCardsWagons ef_card = new EFCardsWagons(new EFDbContext());
                List<int> list_num = new List<int>();
                list_num = ef_card.Context.Select(c => c.num).ToList();
                return list_num;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetNumCarsOfAMKR()"), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        ///  Вернуть последнюю обработаную запись ID nолученую их таблицы WT
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public long? GetLastIDWTWagonsMotionSignals(int num)
        {

            try
            {
                EFWagonsMotionSignals ef_wms = new EFWagonsMotionSignals(new EFDbContext());
                WagonsMotionSignals wms = ef_wms.Context.Where(s => s.nvagon == num).OrderByDescending(c => c.dt).FirstOrDefault();
                return wms != null ? (long?)wms.id_wt : null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetLastIDWTWagonsMotionSignals(num={0})", num), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Вернуть тип владения вагоном
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public int? GetTypeOwnerShipOfNum(int num)
        {

            try
            {
                EFCardsWagons ef_card = new EFCardsWagons(new EFDbContext());
                CardsWagons card = ef_card.Context.Where(c=>c.num ==num).FirstOrDefault();
                return card!=null ? (int?)card.id_type_ownership : null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetTypeOwnerShipOfNum(num={0})", num), servece_owner, eventID);
                return null;
            }
        }

        public WTMotionSignals GetLastWTMotionSignals(int num)
        {

            try
            {
                EFWagonsMotionSignals ef_wms = new EFWagonsMotionSignals(new EFDbContext());
                WagonsMotionSignals wms = ef_wms.Context.Where(s => s.nvagon == num).OrderByDescending(c => c.dt).FirstOrDefault();
                return wms != null ? new WTMotionSignals
                {
                    id_wt = wms.id_wt,
                    nvagon = wms.nvagon,
                    st_disl = wms.st_disl,
                    nst_disl = wms.nst_disl,
                    kodop = wms.kodop,
                    nameop = wms.nameop,
                    full_nameop = wms.full_nameop,
                    dt = wms.dt,
                    st_form = wms.st_form,
                    nst_form = wms.nst_form,
                    idsost = wms.idsost,
                    nsost = wms.nsost,
                    st_nazn = wms.st_nazn,
                    nst_nazn = wms.nst_nazn,
                    ntrain = wms.ntrain,
                    st_end = wms.st_end,
                    nst_end = wms.nst_end,
                    kgr = wms.kgr,
                    nkgr = wms.nkgr,
                    id_cargo = wms.id_cargo,
                    kgrp = wms.kgrp,
                    ves = wms.ves,
                    updated = wms.updated,
                    kgro = wms.kgro,
                    km = wms.km,
                    station_from = wms.station_from,
                    station_end = wms.station_end,
                    shipper = wms.shipper,
                    consignee = wms.consignee,
                    location = wms.location,
                    condition = wms.condition,
                    type_flight = wms.type_flight,
                    start_flight = wms.start_flight,
                    start_turnover = wms.start_turnover,
                    duration_flight = wms.duration_flight,
                    duration_turnover = wms.duration_turnover,
                    note = wms.note,
                } : null;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetLastWTMotionSignals(num={0})", num), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить карачку вагона
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public CardsWagons GetCardsWagonsOfNum(int num)
        {
            try
            {
                EFCardsWagons ef_card = new EFCardsWagons(new EFDbContext());
                CardsWagons card = ef_card.Context.Where(c => c.num == num).FirstOrDefault();
                return card;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetCardsWagonsOfNum(num={0})", num), servece_owner, eventID);
                return null;
            }
        }

        public long SetWagonsMotionSignals(WTMotionSignals wtms)
        {
            try {
                EFWagonsMotionSignals ef_wms = new EFWagonsMotionSignals(new EFDbContext());
                WagonsMotionSignals wms = new WagonsMotionSignals { 
                    id = 0,
                    id_wt= wtms.id_wt ,
                    nvagon= wtms.nvagon ,
                    st_disl= wtms.st_disl ,
                    nst_disl= wtms.nst_disl ,
                    kodop= wtms.kodop ,
                    nameop= wtms.nameop ,
                    full_nameop= wtms.full_nameop ,
                    dt= wtms.dt ,
                    st_form= wtms.st_form ,
                    nst_form= wtms.nst_form ,
                    idsost= wtms.idsost ,
                    nsost= wtms.nsost ,
                    st_nazn= wtms.st_nazn ,
                    nst_nazn= wtms.nst_nazn ,
                    ntrain= wtms.ntrain ,
                    st_end= wtms.st_end ,
                    nst_end= wtms.nst_end ,
                    kgr= wtms.kgr ,
                    nkgr= wtms.nkgr ,
                    id_cargo= wtms.id_cargo ,
                    kgrp= wtms.kgrp ,
                    ves= wtms.ves ,
                    updated= wtms.updated ,
                    kgro= wtms.kgro ,
                    km= wtms.km ,
                    station_from= wtms.station_from ,
                    station_end= wtms.station_end ,
                    route= wtms.route ,
                    shipper= wtms.shipper ,
                    consignee= wtms.consignee ,
                    location= wtms.location ,
                    condition= wtms.condition ,
                    type_flight= wtms.type_flight ,
                    start_flight= wtms.start_flight ,
                    start_turnover= wtms.start_turnover ,
                    duration_flight= wtms.duration_flight ,
                    duration_turnover= wtms.duration_turnover            
                };
                ef_wms.Add(wms);
                int result = ef_wms.Save();
                return result>0 ? wms.id : result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SetWagonsMotionSignals(wtms={0})", wtms), servece_owner, eventID);
                return -1;
            }
        }

        public int SetWagonsMotionSignals(List<WTMotionSignals> list)
        {
            try
            {
                EFWagonsMotionSignals ef_wms = new EFWagonsMotionSignals(new EFDbContext());
                List<WagonsMotionSignals> wms_list = list.Select( w=>new WagonsMotionSignals
                {
                    id = 0,
                    id_wt = w.id_wt,
                    nvagon = w.nvagon,
                    st_disl = w.st_disl,
                    nst_disl = w.nst_disl,
                    kodop = w.kodop,
                    nameop = w.nameop,
                    full_nameop = w.full_nameop,
                    dt = w.dt,
                    st_form = w.st_form,
                    nst_form = w.nst_form,
                    idsost = w.idsost,
                    nsost = w.nsost,
                    st_nazn = w.st_nazn,
                    nst_nazn = w.nst_nazn,
                    ntrain = w.ntrain,
                    st_end = w.st_end,
                    nst_end = w.nst_end,
                    kgr = w.kgr,
                    nkgr = w.nkgr,
                    id_cargo = w.id_cargo,
                    kgrp = w.kgrp,
                    ves = w.ves,
                    updated = w.updated,
                    kgro = w.kgro,
                    km = w.km,
                    station_from = w.station_from,
                    station_end = w.station_end,
                    route = w.route,
                    shipper = w.shipper,
                    consignee = w.consignee,
                    location = w.location,
                    condition = w.condition,
                    type_flight = w.type_flight,
                    start_flight = w.start_flight,
                    start_turnover = w.start_turnover,
                    duration_flight = w.duration_flight,
                    duration_turnover = w.duration_turnover
                }).ToList();
                ef_wms.Add(wms_list);
                int result = ef_wms.Save();
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("SetWagonsMotionSignals(list={0})", list), servece_owner, eventID);
                return -1;
            }
        }
    }
}
