using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDSLogs
{
    public static class IDSLog
    {

        // Вкл\Отк логирования в журналы Windows
        static bool _eLog = false;                  // Пользовательских сообщений 
        static bool _eLogException = false;         // Исключений(Exception)
        static bool _eLogEvent = false;             // Событий системы
        static bool _eLogServices = false;          // Событий сервисов

        // Вкл\Отк логирования в базу данных
        static bool _dbLog = false;                 // Пользовательских сообщений
        static bool _dbLogException = false;        // Исключений(Exception)
        static bool _dbLogEvent = false;            // Событий системы
        static bool _dbLogServices = false;         // Событий сервисов

        // Вкл\Отк логирования в файл на диске
        static bool _fLog = false;                  // Пользовательских сообщений
        static bool _fLogException = false;         // Исключений(Exception)
        static bool _fLogEvent = false;             // Событий системы
        static bool _fLogServices = false;          // Событий сервисов

        static IDSLog()
        {
            try
            {
                _eLog = bool.Parse(ConfigurationManager.AppSettings["ELog"].ToString());
                _eLogException = bool.Parse(ConfigurationManager.AppSettings["ELogException"].ToString());
                _eLogException = bool.Parse(ConfigurationManager.AppSettings["ELogEvent"].ToString());
                _eLogException = bool.Parse(ConfigurationManager.AppSettings["ELogServices"].ToString());

                _dbLog = bool.Parse(ConfigurationManager.AppSettings["DBLog"].ToString());
                _dbLogException = bool.Parse(ConfigurationManager.AppSettings["DBLogException"].ToString());
                _dbLogException = bool.Parse(ConfigurationManager.AppSettings["DBLogEvent"].ToString());
                _dbLogException = bool.Parse(ConfigurationManager.AppSettings["DBLogServices"].ToString());

                _fLog = bool.Parse(ConfigurationManager.AppSettings["FLog"].ToString());
                _fLogException = bool.Parse(ConfigurationManager.AppSettings["FLogException"].ToString());
                _fLogException = bool.Parse(ConfigurationManager.AppSettings["FLogEvent"].ToString());
                _fLogException = bool.Parse(ConfigurationManager.AppSettings["FLogServices"].ToString());

            }
            catch (Exception e)
            {
                Console.WriteLine(String.Format("Ошибка чтения IDSLog.AppSettings:(), Exception: {0}",e));
            }
        }

        public static void InitLog(
            bool eLogs, bool eLogErrors, bool eLogEvent, bool eLogServices,
            bool dbLogs, bool dbLogErrors, bool dbLogEvent, bool dbLogServices,
            bool fLogs, bool fLogErrors, bool fLogEvent, bool fLogServices)
        {
            _eLog = eLogs;
            _eLogException = eLogErrors;
            _eLogEvent = eLogEvent;
            _eLogServices = eLogServices;

            _dbLog = dbLogs;
            _dbLogException = dbLogErrors;
            _dbLogEvent = dbLogEvent;
            _dbLogServices = dbLogServices;

            _fLog = fLogs;
            _fLogException = fLogErrors;
            _fLogEvent = fLogEvent;
            _fLogServices = fLogServices;

        }

        //public static void LogError(Exception e, string message)
        //{
        //    Console.WriteLine(e.ToString());
        //    FileLogs.SaveError(message, e);
        //}
        #region Вспомогательные функции
        public static string GetSource(service service, eventID eventID)
        {
            return String.Format("[service.{0}, eventID.{1}] ", service, eventID);
        }
        #endregion

        #region Information



        public static void InformationToEvent(this string log, service service, eventID eventID)
        {
            log.InformationToEvent((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void InformationToEvent(this string log, service service)
        {
            log.InformationToEvent((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void InformationToEvent(this string log, eventID eventID)
        {
            log.InformationToEvent(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void InformationToDB(this string log, service service, eventID eventID)
        {
            log.InformationToDB((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void InformationToDB(this string log, service service)
        {
            log.InformationToDB((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void InformationToDB(this string log, eventID eventID)
        {
            log.InformationToDB(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void InformationToFile(this string log, service service, eventID eventID)
        {
            (GetSource(service, eventID) + log).InformationToFile();
        }

        public static void InformationToFile(this string log, service service)
        {
            (GetSource(service, eventID.Null) + log).InformationToFile();
        }

        public static void InformationToFile(this string log, eventID eventID)
        {
            (GetSource(service.Null, eventID) + log).InformationToFile();
        }

        public static void InformationLog(this string message, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nInformation: {2}", service, eventID, message));
            if (elog) message.InformationToEvent(service, eventID);
            if (dblog) message.InformationToDB(service, eventID);
            if (flog) message.InformationToFile(service, eventID);
        }

        public static void InformationLog(this string message, service service, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\nInformation: {1}", service, message));
            if (elog) message.InformationToEvent(service);
            if (dblog) message.InformationToDB(service);
            if (flog) message.InformationToFile(service);
        }

        public static void InformationLog(this string message, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\neventID: {0}\nInformation: {1}", eventID, message));
            if (elog) message.InformationToEvent(eventID);
            if (dblog) message.InformationToDB(eventID);
            if (flog) message.InformationToFile(eventID);
        }

        public static void InformationLog(this string message, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nInformation: {0}", message));
            if (elog) message.InformationToEvent();
            if (dblog) message.InformationToDB();
            if (flog) message.InformationToFile();
        }

        public static void InformationLog(this string message, service service, eventID eventID)
        {
            message.InformationLog(service, eventID, _eLog, _dbLog, _fLog);
        }

        public static void InformationLog(this string message, service service)
        {
            message.InformationLog(service, _eLog, _dbLog, _fLog);
        }

        public static void InformationLog(this string message, eventID eventID)
        {
            message.InformationLog(eventID, _eLog, _dbLog, _fLog);
        }

        public static void InformationLog(this string message)
        {
            message.InformationLog(_eLog, _dbLog, _fLog);
        }

        #endregion

        #region Warning



        public static void WarningToEvent(this string log, service service, eventID eventID)
        {
            log.WarningToEvent((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void WarningToEvent(this string log, service service)
        {
            log.WarningToEvent((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void WarningToEvent(this string log, eventID eventID)
        {
            log.WarningToEvent(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void WarningToDB(this string log, service service, eventID eventID)
        {
            log.WarningToDB((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void WarningToDB(this string log, service service)
        {
            log.WarningToDB((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void WarningToDB(this string log, eventID eventID)
        {
            log.WarningToDB(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void WarningToFile(this string log, service service, eventID eventID)
        {
            (GetSource(service, eventID) + log).WarningToFile();
        }

        public static void WarningToFile(this string log, service service)
        {
            (GetSource(service, eventID.Null) + log).WarningToFile();
        }

        public static void WarningToFile(this string log, eventID eventID)
        {
            (GetSource(service.Null, eventID) + log).WarningToFile();
        }

        public static void WarningLog(this string message, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nWarning: {2}", service, eventID, message));
            if (elog) message.WarningToEvent(service, eventID);
            if (dblog) message.WarningToDB(service, eventID);
            if (flog) message.WarningToFile(service, eventID);
        }

        public static void WarningLog(this string message, service service, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\nWarning: {1}", service, message));
            if (elog) message.WarningToEvent(service);
            if (dblog) message.WarningToDB(service);
            if (flog) message.WarningToFile(service);
        }

        public static void WarningLog(this string message, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\neventID: {0}\nWarning: {1}", eventID, message));
            if (elog) message.WarningToEvent(eventID);
            if (dblog) message.WarningToDB(eventID);
            if (flog) message.WarningToFile(eventID);
        }

        public static void WarningLog(this string message, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nWarning: {0}", message));
            if (elog) message.WarningToEvent();
            if (dblog) message.WarningToDB();
            if (flog) message.WarningToFile();
        }

        public static void WarningLog(this string message, service service, eventID eventID)
        {
            message.WarningLog(service, eventID, _eLog, _dbLog, _fLog);
        }

        public static void WarningLog(this string message, service service)
        {
            message.WarningLog(service, _eLog, _dbLog, _fLog);
        }

        public static void WarningLog(this string message, eventID eventID)
        {
            message.WarningLog(eventID, _eLog, _dbLog, _fLog);
        }

        public static void WarningLog(this string message)
        {
            message.WarningLog(_eLog, _dbLog, _fLog);
        }

        #endregion

        #region Error

        public static void ErrorToEvent(this string log, service service, eventID eventID)
        {
            log.ErrorToEvent((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ErrorToEvent(this string log, service service)
        {
            log.ErrorToEvent((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void ErrorToEvent(this string log, eventID eventID)
        {
            log.ErrorToEvent(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ErrorToDB(this string log, service service, eventID eventID)
        {
            log.ErrorToDB((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ErrorToDB(this string log, service service)
        {
            log.ErrorToDB((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void ErrorToDB(this string log, eventID eventID)
        {
            log.ErrorToDB(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ErrorToFile(this string log, service service, eventID eventID)
        {
            (GetSource(service, eventID) + log).ErrorToFile();
        }

        public static void ErrorToFile(this string log, service service)
        {
            (GetSource(service, eventID.Null) + log).ErrorToFile();
        }

        public static void ErrorToFile(this string log, eventID eventID)
        {
            (GetSource(service.Null, eventID) + log).ErrorToFile();
        }

        public static void ErrorLog(this string message, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nError: {2}", service, eventID, message));
            if (elog) message.ErrorToEvent(service, eventID);
            if (dblog) message.ErrorToDB(service, eventID);
            if (flog) message.ErrorToFile(service, eventID);
        }

        public static void ErrorLog(this string message, service service, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\nError: {1}", service, message));
            if (elog) message.ErrorToEvent(service);
            if (dblog) message.ErrorToDB(service);
            if (flog) message.ErrorToFile(service);
        }

        public static void ErrorLog(this string message, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\neventID: {0}\nError: {1}", eventID, message));
            if (elog) message.ErrorToEvent(eventID);
            if (dblog) message.ErrorToDB(eventID);
            if (flog) message.ErrorToFile(eventID);
        }

        public static void ErrorLog(this string message, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nError: {0}", message));
            if (elog) message.ErrorToEvent();
            if (dblog) message.ErrorToDB();
            if (flog) message.ErrorToFile();
        }

        public static void ErrorLog(this string message, service service, eventID eventID)
        {
            message.ErrorLog(service, eventID, _eLog, _dbLog, _fLog);
        }

        public static void ErrorLog(this string message, service service)
        {
            message.ErrorLog(service, _eLog, _dbLog, _fLog);
        }

        public static void ErrorLog(this string message, eventID eventID)
        {
            message.ErrorLog(eventID, _eLog, _dbLog, _fLog);
        }

        public static void ErrorLog(this string message)
        {
            message.ErrorLog(_eLog, _dbLog, _fLog);
        }

        #endregion

        #region Exception

        public static void ExceptionToEvent(this Exception ex, string log, service service, eventID eventID)
        {
            ex.ExceptionToEvent(log, (service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToEvent(this Exception ex, string log, service service)
        {
            ex.ExceptionToEvent(log, (service == service.Null ? (int?)null : (int)service), null);
        }

        public static void ExceptionToEvent(this Exception ex, string log, eventID eventID)
        {
            ex.ExceptionToEvent(log, null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToEvent(this Exception ex, service service, eventID eventID)
        {
            ex.ExceptionToEvent((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToEvent(this Exception ex, service service)
        {
            ex.ExceptionToEvent((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void ExceptionToEvent(this Exception ex, eventID eventID)
        {
            ex.ExceptionToEvent(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToDB(this Exception ex, string log, service service, eventID eventID)
        {
            ex.ExceptionToDB(log, (service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToDB(this Exception ex, string log, service service)
        {
            ex.ExceptionToDB(log, (service == service.Null ? (int?)null : (int)service), null);
        }

        public static void ExceptionToDB(this Exception ex, string log, eventID eventID)
        {
            ex.ExceptionToDB(log, null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToDB(this Exception ex, service service, eventID eventID)
        {
            ex.ExceptionToDB((service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToDB(this Exception ex, service service)
        {
            ex.ExceptionToDB((service == service.Null ? (int?)null : (int)service), null);
        }

        public static void ExceptionToDB(this Exception ex, eventID eventID)
        {
            ex.ExceptionToDB(null, (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void ExceptionToFile(this Exception ex, string log, service service, eventID eventID)
        {
            ex.ExceptionToFile(GetSource(service, eventID) + log);
        }

        public static void ExceptionToFile(this Exception ex, string log, service service)
        {
            ex.ExceptionToFile(GetSource(service, eventID.Null) + log);
        }

        public static void ExceptionToFile(this Exception ex, string log, eventID eventID)
        {
            ex.ExceptionToFile(GetSource(service.Null, eventID) + log);
        }

        public static void ExceptionToFile(this Exception ex, service service, eventID eventID)
        {
            ex.ExceptionToFile(GetSource(service, eventID));
        }

        public static void ExceptionToFile(this Exception ex, service service)
        {
            ex.ExceptionToFile(GetSource(service, eventID.Null));
        }

        public static void ExceptionToFile(this Exception ex, eventID eventID)
        {
            ex.ExceptionToFile(GetSource(service.Null, eventID));
        }


        public static void ExceptionLog(this Exception ex, string message, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nmessage: {2}\nException: {3}", service, eventID, message, ex));
            if (elog) ex.ExceptionToEvent(message, service, eventID);
            if (dblog) ex.ExceptionToDB(message, service, eventID);
            if (flog) ex.ExceptionToFile(message, service, eventID);
        }

        public static void ExceptionLog(this Exception ex, string message, service service, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\nmessage: {1}\nException: {2}", service, message, ex));
            if (elog) ex.ExceptionToEvent(message, service);
            if (dblog) ex.ExceptionToDB(message, service);
            if (flog) ex.ExceptionToFile(message, service);
        }

        public static void ExceptionLog(this Exception ex, string message, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\neventID: {0}\nmessage: {1}\nException: {2}", eventID, message, ex));
            if (elog) ex.ExceptionToEvent(message, eventID);
            if (dblog) ex.ExceptionToDB(message, eventID);
            if (flog) ex.ExceptionToFile(message, eventID);
        }

        public static void ExceptionLog(this Exception ex, string message, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nmessage: {0}\nException: {1}", message, ex));
            if (elog) ex.ExceptionToEvent(message);
            if (dblog) ex.ExceptionToDB(message);
            if (flog) ex.ExceptionToFile(message);
        }

        public static void ExceptionLog(this Exception ex, string message, service service, eventID eventID)
        {
            ex.ExceptionLog(message, service, eventID, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex, string message, service service)
        {
            ex.ExceptionLog(message, service, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex, string message, eventID eventID)
        {
            ex.ExceptionLog(message, eventID, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex, string message)
        {
            ex.ExceptionLog(message, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nException: {2}", service, eventID, ex));
            if (elog) ex.ExceptionToEvent(service, eventID);
            if (dblog) ex.ExceptionToDB(service, eventID);
            if (flog) ex.ExceptionToFile(service, eventID);
        }

        public static void ExceptionLog(this Exception ex, service service, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\nException: {1}", service, ex));
            if (elog) ex.ExceptionToEvent(service);
            if (dblog) ex.ExceptionToDB(service);
            if (flog) ex.ExceptionToFile(service);
        }

        public static void ExceptionLog(this Exception ex, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\neventID: {0}\nException: {1}", eventID, ex));
            if (elog) ex.ExceptionToEvent(eventID);
            if (dblog) ex.ExceptionToDB(eventID);
            if (flog) ex.ExceptionToFile(eventID);
        }

        public static void ExceptionLog(this Exception ex, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nException: {0}", ex));
            if (elog) ex.ExceptionToEvent();
            if (dblog) ex.ExceptionToDB();
            if (flog) ex.ExceptionToFile();
        }

        public static void ExceptionLog(this Exception ex, service service, eventID eventID)
        {
            ex.ExceptionLog(service, eventID, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex, service service)
        {
            ex.ExceptionLog(service, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex, eventID eventID)
        {
            ex.ExceptionLog(eventID, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionLog(this Exception ex)
        {
            ex.ExceptionLog(_eLogException, _dbLogException, _fLogException);
        }


        public static string GetMessageMethod(string method)
        {
            return String.Format("Ошибка выполнения метода {0}", method);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            ex.ExceptionLog(GetMessageMethod(method), service, eventID, elog, dblog, flog);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, service service, bool elog, bool dblog, bool flog)
        {
            ex.ExceptionLog(GetMessageMethod(method), service, elog, dblog, flog);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, eventID eventID, bool elog, bool dblog, bool flog)
        {
            ex.ExceptionLog(GetMessageMethod(method), eventID, elog, dblog, flog);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, bool elog, bool dblog, bool flog)
        {
            ex.ExceptionLog(GetMessageMethod(method), elog, dblog, flog);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, service service, eventID eventID)
        {
            ex.ExceptionMethodLog(method, service, eventID, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, service service)
        {
            ex.ExceptionMethodLog(method, service, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionMethodLog(this Exception ex, string method, eventID eventID)
        {
            ex.ExceptionMethodLog(method, eventID, _eLogException, _dbLogException, _fLogException);
        }

        public static void ExceptionMethodLog(this Exception ex, string method)
        {
            ex.ExceptionMethodLog(method, _eLogException, _dbLogException, _fLogException);
        }


        #endregion

        #region Event

        public static void EventToDB(this string events, string status, service service, eventID eventID)
        {
            events.EventToDB(status, (service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void EventToDB(this string events, EventStatus status, service service, eventID eventID)
        {
            events.EventToDB(status, (service == service.Null ? (int?)null : (int)service), (eventID == eventID.Null ? (int?)null : (int)eventID));
        }

        public static void EventToLog(this string events, string status, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nevents: {2}\nstatus: {3}", service, eventID, events, status));

            if (elog) (events + ", status:" + status).WarningToEvent(service, eventID); // в лог записывается как событие Warning
            if (dblog) events.EventToDB(status, service, eventID);
            if (flog) (events + ", status:" + status).WarningToFile(service, eventID);
        }

        public static void EventToLog(this string events, EventStatus status, service service, eventID eventID, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\neventID: {1}\nevents: {2}\nstatus: {3}", service, eventID, events, status));

            if (elog) (events + ", status:" + status).WarningToEvent(service, eventID); // в лог записывается как событие Warning
            if (dblog) events.EventToDB(status, service, eventID);
            if (flog) (events + ", status:" + status).WarningToFile(service, eventID);
        }

        public static void EventToLog(this string events, string status, service service, bool elog, bool dblog, bool flog)
        {
            events.EventToLog(status, service, eventID.Null, elog, dblog, flog);
        }

        public static void EventToLog(this string events, EventStatus status, service service, bool elog, bool dblog, bool flog)
        {
            events.EventToLog(status, service, eventID.Null, elog, dblog, flog);
        }

        public static void EventToLog(this string events, string status, eventID eventID, bool elog, bool dblog, bool flog)
        {
            events.EventToLog(status, service.Null, eventID, elog, dblog, flog);
        }

        public static void EventToLog(this string events, EventStatus status, eventID eventID, bool elog, bool dblog, bool flog)
        {
            events.EventToLog(status, service.Null, eventID, elog, dblog, flog);
        }

        public static void EventToLog(this string events, string status, bool elog, bool dblog, bool flog)
        {
            events.EventToLog(status, service.Null, eventID.Null, elog, dblog, flog);
        }

        public static void EventToLog(this string events, EventStatus status, bool elog, bool dblog, bool flog)
        {
            events.EventToLog(status, service.Null, eventID.Null, elog, dblog, flog);
        }


        public static void EventToLog(this string events, string status, service service)
        {
            events.EventToLog(status, service, eventID.Null, _eLogEvent, _dbLogEvent, _fLogEvent);
        }

        public static void EventToLog(this string events, EventStatus status, service service)
        {
            events.EventToLog(status, service, eventID.Null, _eLogEvent, _dbLogEvent, _fLogEvent);
        }

        public static void EventToLog(this string events, string status, eventID eventID)
        {
            events.EventToLog(status, service.Null, eventID, _eLogEvent, _dbLogEvent, _fLogEvent);
        }

        public static void EventToLog(this string events, EventStatus status, eventID eventID)
        {
            events.EventToLog(status, service.Null, eventID, _eLogEvent, _dbLogEvent, _fLogEvent);
        }

        public static void EventToLog(this string events, string status)
        {
            events.EventToLog(status, service.Null, eventID.Null, _eLogEvent, _dbLogEvent, _fLogEvent);
        }

        public static void EventToLog(this string events, EventStatus status)
        {
            events.EventToLog(status, service.Null, eventID.Null, _eLogEvent, _dbLogEvent, _fLogEvent);
        }

        #endregion

        #region Services

        private static string GetServices(this service service, DateTime start, DateTime stop, int code)
        {
            TimeSpan ts = stop - start;
            int cur_ms = (int)ts.TotalMilliseconds;
            return String.Format("service:{0}, запущен:{1}, остановлен:{2}, время выполнения (мс): {3}, код выполнения: {4}", service.ToString(), start, stop, cur_ms, code);
        }

        static public long ServicesToDB(this service service, DateTime start, DateTime stop, int code)
        {
            return ((int)service).ServicesToDB(start, stop, code);
        }

        public static void ServicesToLog(this service service, DateTime start, DateTime stop, int code, bool elog, bool dblog, bool flog)
        {
            Console.WriteLine(String.Format("\nservice: {0}\nstart: {1}\nstop: {2}\ncode: {3}", service, start, stop, code));
            if (elog) service.GetServices(start, stop, code).WarningToEvent(service); // в лог записывается как событие Warning
            if (dblog) service.ServicesToDB(start, stop, code);
            if (flog) service.GetServices(start, stop, code).DebugToFile();
        }
        public static void ServicesToLog(this service service, DateTime start, DateTime stop, int code)
        {
            service.ServicesToLog(start, stop, code, _eLogServices, _dbLogServices, _fLogServices);
        }
        #endregion

        //#region Services
        ///// <summary>
        ///// Записать статус сервиса после выполнения
        ///// </summary>
        ///// <param name="id_service"></param>
        ///// <param name="start"></param>
        ///// <param name="stop"></param>
        ///// <returns></returns>
        //public static long WriteStatusServices(this service service, DateTime start, DateTime stop)
        //{
        //    return MServicesLog.WriteLogStatusServices(service, start, stop);
        //}
        ///// <summary>
        ///// Записать статус сервиса при запуске
        ///// </summary>
        ///// <param name="id_service"></param>
        ///// <param name="start"></param>
        ///// <returns></returns>
        //public static long WriteStatusServices(this service service, DateTime start)
        //{
        //    return MServicesLog.WriteLogStatusServices(service, start);
        //}
        //#endregion

        ///// <summary>
        ///// Возращает скорректированую ошибку eventID + error_code
        ///// </summary>
        ///// <param name="ev"></param>
        ///// <param name="error_code"></param>
        ///// <returns></returns>
        //static public int GetEventIDErrorCode(this eventID ev, int error_code)
        //{
        //    return ((int)ev * (-10)) + error_code;
        //}
    }
}
