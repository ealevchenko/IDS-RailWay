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
        public int? station_from { get; set; }
        public int? station_end { get; set; }
        public int? shipper { get; set; }
        public int? consignee { get; set; }
        public int? location { get; set; }
        public int? condition { get; set; }
        public int? type_flight { get; set; }
        public DateTime? start_flight { get; set; }
        public DateTime? start_turnover { get; set; }
        public int? duration_flight { get; set; }
        public int? duration_turnover { get; set; }
        public string note { get; set; }
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
        public List<int> GetNumCarsOfAMKR() {
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
        public long? GetLastIDWTWagonsMotionSignals(int num) {

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

        public WTMotionSignals GetLastWTMotionSignals(int num)
        {

            try
            {
                EFWagonsMotionSignals ef_wms = new EFWagonsMotionSignals(new EFDbContext());
                WagonsMotionSignals wms = ef_wms.Context.Where(s => s.nvagon == num).OrderByDescending(c => c.dt).FirstOrDefault();
                return wms != null ? new WTMotionSignals {
                    id_wt = wms.id,
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
                e.ExceptionMethodLog(String.Format("GetLastIDWTWagonsMotionSignals(num={0})", num), servece_owner, eventID);
                return null;
            }
        }
    }
}
