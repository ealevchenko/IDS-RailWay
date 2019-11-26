using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDSLogs
{
    public static class EventLogs
    {
        static private EventLog elog;
        static private string _eventSourceName;
        static private string _logName;

        static EventLogs()
        {
            try { 
                _eventSourceName = ConfigurationManager.AppSettings["ESourceName"].ToString();
                _logName = ConfigurationManager.AppSettings["ELogName"].ToString();            
            }
            catch (Exception e)
            {
                _eventSourceName = "IDSLog";
                _logName = "IDSLogFile";
            }

            try
            {
                if (!EventLog.SourceExists(_eventSourceName))
                {
                    EventLog.CreateEventSource(_eventSourceName, _logName);
                }
                elog = new EventLog();
                elog.Source = _eventSourceName; elog.Log = _logName;
            }
            catch (Exception e)
            {
                elog = null;
            }
        }

        #region Information
        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        public static void InformationToEvent(this string message)
        {
            if (elog != null) elog.WriteEntry(message, EventLogEntryType.Information);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        public static void InformationToEvent(this string message, int? id_services, int? id_eventID)
        {
            if (elog != null)
            {
                if (id_services != null) elog.WriteEntry(message, EventLogEntryType.Information, (id_eventID != null ? (int)id_eventID : 0), (short)id_services);
                else elog.WriteEntry(message, EventLogEntryType.Information, (id_eventID != null ? (int)id_eventID : 0));
            }
        }
        #endregion

        #region Warning
        /// <summary>
        /// Сохранить лог Warning
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        static public void WarningToEvent(this string message)
        {
            if (elog != null) elog.WriteEntry(message, EventLogEntryType.Warning);
        }
        /// <summary>
        /// Сохранить лог Warning
        /// </summary>
        /// <param name="message"></param>
        /// <param name="services"></param>
        /// <param name="eventID"></param>
        /// <returns></returns>
        static public void WarningToEvent(this string message, int? id_services, int? id_eventID)
        {
            if (elog != null)
            {
                if (id_services != null) elog.WriteEntry(message, EventLogEntryType.Warning, (id_eventID != null ? (int)id_eventID : 0), (short)id_services);
                else elog.WriteEntry(message, EventLogEntryType.Warning, (id_eventID != null ? (int)id_eventID : 0));
            }
        }
        #endregion

        #region Error
        /// <summary>
        /// Сохранить лог Error
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        static public void ErrorToEvent(this string message)
        {
            if (elog != null) elog.WriteEntry(message, EventLogEntryType.Error);
        }
        /// <summary>
        /// Сохранить лог Error
        /// </summary>
        /// <param name="message"></param>
        /// <param name="services"></param>
        /// <param name="eventID"></param>
        /// <returns></returns>
        static public void ErrorToEvent(this string message, int? id_services, int? id_eventID)
        {
            if (elog != null)
            {
                if (id_services != null) elog.WriteEntry(message, EventLogEntryType.Error, (id_eventID != null ? (int)id_eventID : 0), (short)id_services);
                else elog.WriteEntry(message, EventLogEntryType.Error, (id_eventID != null ? (int)id_eventID : 0));
            }
        }

        //TODO: По необходимости описать логирование событий SuccessAudit = 8, FailureAudit = 16

        #endregion

        #region Exception
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="user_message"></param>
        /// <returns></returns>
        private static string GetErrorMessage(Exception ex, string user_message)
        {
            if (!String.IsNullOrWhiteSpace(user_message))
            {
                return String.Format("UserMesage: {0}, Source: {1}, HResult {2}, Message:  {3}, InnerException: {4}", user_message, ex.Source, ex.HResult, ex.Message, ex.InnerException != null ? ex.InnerException.Message : null);
            }
            else
            {
                return String.Format("Source: {0}, HResult {1}, Message:  {2}, InnerException: {3}", ex.Source, ex.HResult, ex.Message, ex.InnerException != null ? ex.InnerException.Message : null);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        public static string GetErrorMessage(Exception ex)
        {
            return GetErrorMessage(ex, null);
        }
        /// <summary>
        /// Сохранить лог Exception
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="user_message"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>
        public static void ExceptionToEvent(this Exception ex, string user_message, int? id_services, int? id_eventID)
        {
            if (elog != null)
            {
                if (ex.InnerException != null) ExceptionToEvent(ex.InnerException, user_message, id_services, id_eventID);
                EventLogs.ErrorToEvent(GetErrorMessage(ex, user_message), id_services, id_eventID);
            }

        }
        /// <summary>
        /// Сохранить лог Exception
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>
        public static void ExceptionToEvent(this Exception ex, int? id_services, int? id_eventID)
        {
            if (elog != null)
            {
                if (ex.InnerException != null) ExceptionToEvent(ex.InnerException, id_services, id_eventID);
                EventLogs.ErrorToEvent(GetErrorMessage(ex), id_services, id_eventID);
            }
        }
        /// <summary>
        /// Сохранить лог Exception
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="user_message"></param>
        /// <returns></returns>
        public static void ExceptionToEvent(this Exception ex, string user_message)
        {
            if (elog != null)
            {
                if (ex.InnerException != null) ExceptionToEvent(ex.InnerException, user_message);
                EventLogs.ErrorToEvent(GetErrorMessage(ex, user_message));
            }
        }
        /// <summary>
        /// Сохранить лог Exception
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        public static void ExceptionToEvent(this Exception ex)
        {
            if (elog != null)
            {
                if (ex.InnerException != null) ExceptionToEvent(ex.InnerException);
                EventLogs.ErrorToEvent(GetErrorMessage(ex));
            }
        }
        #endregion

    }
}
