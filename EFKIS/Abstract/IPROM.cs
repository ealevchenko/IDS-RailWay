using EFKIS.Entities.PROM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Abstract
{
    public interface IPROM
    {
        #region  Prom_Sostav

        IQueryable<Prom_Sostav> GetProm_Sostav();
        IQueryable<Prom_Sostav> GetProm_Sostav(DateTime start, DateTime stop);
        IQueryable<Prom_Sostav> GetInputProm_Sostav();
        IQueryable<Prom_Sostav> GetInputProm_Sostav(DateTime start, DateTime stop);
        IQueryable<Prom_Sostav> GetInputProm_Sostav(DateTime start, DateTime stop, bool sort);
        IQueryable<Prom_Sostav> GetOutputProm_Sostav();
        IQueryable<Prom_Sostav> GetOutputProm_Sostav(DateTime start, DateTime stop);
        IQueryable<Prom_Sostav> GetOutputProm_Sostav(DateTime start, DateTime stop, bool sort);

        IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount();
        IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount(DateTime start, DateTime stop);
        IQueryable<Prom_SostavAndCount> GetProm_SostavAndCount(int? natur, int? day, int? month, int? year, int? hour, int? minute);
        #endregion

        #region Prom_NatHist
        //IQueryable<Prom_NatHist> GetProm_NatHist();
        IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute);
        IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute, bool? sort);
        IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfNaturStationDate(int natur, int station, int day, int month, int year, bool? sort);
        Prom_NatHist GetArrivalProm_NatHistOfNaturNumStationDate(int natur, int num_vag, int station, int day, int month, int year);
        IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfVagonLess(int num_vag, DateTime start, bool sort);
        IQueryable<Prom_NatHist> GetArrivalProm_NatHistOfVagonLessEqual(int num_vag, DateTime start, bool sort);
        IQueryable<Prom_NatHist> GetSendingProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute);
        IQueryable<Prom_NatHist> GetSendingProm_NatHistOfNaturDateTime(int natur, int day, int month, int year, int hour, int minute, bool? sort);
        IQueryable<Prom_NatHist> GetSendingProm_NatHistOfNaturDate(int natur, int day, int month, int year, bool? sort);
        Prom_NatHist GetSendingProm_NatHistOfNaturNumDateTime(int natur, int num, int day, int month, int year, int hour, int minute);
        Prom_NatHist GetSendingProm_NatHistOfNumDateTime(int num, int day, int month, int year, int hour, int minute);
        IQueryable<Prom_NatHist> GetSendingProm_NatHistOfVagonMore(int num_vag, DateTime start, bool sort);
        IQueryable<Prom_NatHist> GetSendingProm_NatHistOfVagonMoreEqual(int num_vag, DateTime start, bool sort);
        #endregion

        #region Prom_NatHistAndSostav
        IQueryable<Prom_NatHistAndSostav> GetProm_NatHistAndSostav();
        IQueryable<Prom_NatHistAndSostav> GetProm_NatHistAndSostav(int num);
        #endregion

    }
}
