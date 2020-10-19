using EFLOG.Abstract;
using EFLOG.Concrete;
using EFLOG.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDSLogs
{
    public enum Level : int
    {
        Information = 0, Warning = 1, Error = 2, Critical = 3
    }

    public enum EventStatus : int
    {
        Error = -1,
        No_Actions = 0,
        Ok = 1,
    }

    public static class DataBaseLogs
    {

        static DataBaseLogs()
        {

        }

        static private string GetIP()
        {
            string ips = "";
            System.Net.IPAddress[] list_ip = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName()).AddressList;
            if (list_ip.Count() > 0)
            {
                ips = list_ip[list_ip.Count() - 1].ToString();
            }
            //foreach (System.Net.IPAddress ip in System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName()).AddressList)
            //{
            //    ips += ip.ToString() + "; ";
            //}

            return ips.Trim();
        }

        #region Logs

        static private long SaveLogs(this string message, int? id_services, int? id_eventID, Level level)
        {
            try
            {
                EFLogs ef_logs = new EFLogs(new EFDbContext());

                Logs new_log = new Logs()
                {
                    id = 0,
                    date_time = DateTime.Now,
                    user_name = System.Environment.UserDomainName + @"\" + System.Environment.UserName,
                    user_host_name = System.Environment.MachineName,
                    user_host_address = GetIP(),
                    physical_path = System.Environment.CommandLine,
                    service = id_services,
                    event_id = id_eventID,
                    level = (int)level,
                    message = message
                };

                ef_logs.Add(new_log);
                ef_logs.Save();
                ef_logs.Refresh(new_log);
                return new_log.id;
            }
            catch (Exception e)
            {
                Console.WriteLine(String.Format("Ошибка выполнения метода SaveLogs(id_services={0}, id_eventID={1}, level={2}, message={3}). Exception:{4}", id_services, id_eventID, level, message, e));
                return -1;
            }
        }

        #region Information
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        static public long InformationToDB(this string message)
        {
            return message.SaveLogs(null, null, Level.Information);
        }
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>
        static public long InformationToDB(this string message, int? id_services, int? id_eventID)
        {
            return message.SaveLogs(id_services, id_eventID, Level.Information);
        }
        #endregion

        #region Warning
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        static public long WarningToDB(this string message)
        {
            return message.SaveLogs(null, null, Level.Warning);
        }
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>
        static public long WarningToDB(this string message, int? id_services, int? id_eventID)
        {
            return message.SaveLogs(id_services, id_eventID, Level.Warning);
        }
        #endregion

        #region Error
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        static public long ErrorToDB(this string message)
        {
            return message.SaveLogs(null, null, Level.Error);
        }
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>
        static public long ErrorToDB(this string message, int? id_services, int? id_eventID)
        {
            return message.SaveLogs(id_services, id_eventID, Level.Error);
        }
        #endregion

        #region Critical
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        static public long CriticalToDB(this string message)
        {
            return message.SaveLogs(null, null, Level.Critical);
        }
        /// <summary>
        /// Сохранить лог типа информация в бд
        /// </summary>
        /// <param name="message"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>
        static public long CriticalToDB(this string message, int? id_services, int? id_eventID)
        {
            return message.SaveLogs(id_services, id_eventID, Level.Critical);
        }
        #endregion

        #endregion

        #region Exception

        static private long SaveLogs(this Exception e, string message, int? id_services, int? id_eventID)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(message) && message.Length > 2000) {
                    message = message.Substring(0, 1999);
                }


                if (e.InnerException != null)
                {
                    e.InnerException.SaveLogs(message, id_services, id_eventID);
                }
                EFErrors ef_errors = new EFErrors(new EFDbContext());

                Errors new_log = new Errors()
                {
                    id = 0,
                    date_time = DateTime.Now,
                    user_name = System.Environment.UserDomainName + @"\" + System.Environment.UserName,
                    user_host_name = System.Environment.MachineName,
                    user_host_address = GetIP(),
                    physical_path = System.Environment.CommandLine,
                    service = id_services,
                    event_id = id_eventID,
                    hresult = e.HResult,
                    inner_exception = e.InnerException != null ? e.InnerException.Message : null,
                    user_message = message,
                    source = e.Source,
                    stack_trace = e.StackTrace,
                    message = e.Message
                };

                ef_errors.Add(new_log);
                ef_errors.Save();
                ef_errors.Refresh(new_log);
                return new_log.id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(String.Format("Ошибка выполнения метода SaveLogs(id_services={0}, id_eventID={1}, message={2}). Exception:{3}", id_services, id_eventID, message, ex));
                return -1;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        /// <param name="id_services"></param>
        /// <param name="id_eventID"></param>
        /// <returns></returns>

        static public long ExceptionToDB(this Exception e, string user_message, int? id_services, int? id_eventID)
        {
            return SaveLogs(e, user_message, id_services, id_eventID);
        }

        static public long ExceptionToDB(this Exception e, int? id_services, int? id_eventID)
        {
            return SaveLogs(e, null, id_services, id_eventID);
        }

        static public long ExceptionToDB(this Exception e, string user_message)
        {
            return SaveLogs(e, user_message, null, null);
        }

        static public long ExceptionToDB(this Exception e)
        {
            return ExceptionToDB(e, null, null);
        }
        #endregion

        #region Event

        static private long SaveLogs(this string events, string status, int? id_services, int? id_eventID)
        {
            try
            {
                EFEvents ef_event = new EFEvents(new EFDbContext());

                Events new_events = new Events()
                {
                    id = 0,
                    date_time = DateTime.Now,
                    user_name = System.Environment.UserDomainName + @"\" + System.Environment.UserName,
                    user_host_name = System.Environment.MachineName,
                    user_host_address = GetIP(),
                    physical_path = System.Environment.CommandLine,
                    service = id_services,
                    event_id = id_eventID,
                    _event = events,
                    status = status,
                };

                ef_event.Add(new_events);
                ef_event.Save();
                ef_event.Refresh(new_events);
                return new_events.id;
            }
            catch (Exception e)
            {
                Console.WriteLine(String.Format("Ошибка выполнения метода SaveLogs(id_services={0}, id_eventID={1}, events={2}, status={3}). Exception:{4}", id_services, id_eventID, events, status, e));
                return -1;
            }
        }

        static public long EventToDB(this string events, string status, int? id_services, int? id_eventID)
        {
            return events.SaveLogs(status, id_services, id_eventID);
        }

        static public long EventOfServicesToDB(this string events, string status, int? id_services)
        {
            return events.SaveLogs(status, id_services, null);
        }

        static public long EventOfeventIDToDB(this string events, string status, int? id_eventID)
        {
            return events.SaveLogs(status, null, id_eventID);
        }

        static public long EventToDB(this string events, string status)
        {
            return events.SaveLogs(status, null, null);
        }

        static public long EventToDB(this string events, EventStatus status, int? id_services, int? id_eventID)
        {
            return events.SaveLogs(status.ToString(), id_services, id_eventID);
        }

        static public long EventOfServicesToDB(this string events, EventStatus status, int? id_services)
        {
            return events.SaveLogs(status.ToString(), id_services, null);
        }

        static public long EventOfeventIDToDB(this string events, EventStatus status, int? id_eventID)
        {
            return events.SaveLogs(status.ToString(), null, id_eventID);
        }

        static public long EventToDB(this string events, EventStatus status)
        {
            return events.SaveLogs(status.ToString(), null, null);
        }

        #endregion

        #region Services

        static private long SaveServices(this int? id_services, int? event_id, string description, DateTime start, DateTime stop, int code)
        {
            try
            {
                EFServices ef_services = new EFServices(new EFDbContext());
                TimeSpan ts = stop - start;
                int cur_ms = (int)ts.TotalMilliseconds;

                Services new_services = new Services()
                {
                    id = 0,
                    service = id_services,
                    event_id = event_id,
                    description = description,
                    start = start,
                    stop = stop,
                    duration = cur_ms,
                    code_return = code,
                };

                ef_services.Add(new_services);
                ef_services.Save();
                ef_services.Refresh(new_services);
                return new_services.id;
            }
            catch (Exception e)
            {
                Console.WriteLine(String.Format("Ошибка выполнения метода SaveServices(id_services={0},event_id={1}, description={2}, start={3}, stop={4}, code={5}). Exception:{6}", id_services, event_id, description, start, stop, code, e));
                return -1;
            }
        }

        static public long ServicesToDB(this int? id_services, int? event_id, string description, DateTime start, DateTime stop, int code)
        {
            return id_services.SaveServices(event_id, description, start, stop, code);
        }

        static public long ServicesToDB(this int? id_services, string description, DateTime start, DateTime stop, int code)
        {
            return id_services.SaveServices(null, description, start, stop, code);
        }

        static public long EventIDToDB(this int? event_id, string description, DateTime start, DateTime stop, int code)
        {
            return SaveServices(null, event_id, description, start, stop, code);
        }

        static public long ServicesToDB(this int? id_services, int? event_id, DateTime start, DateTime stop, int code)
        {
            return id_services.SaveServices(event_id, null, start, stop, code);
        }

        static public long ServicesToDB(this int? id_services, DateTime start, DateTime stop, int code)
        {
            return id_services.SaveServices(null, null, start, stop, code);
        }

        static public long EventIDToDB(this int? event_id, DateTime start, DateTime stop, int code)
        {
            return SaveServices(null, event_id, null, start, stop, code);
        }
        #endregion

        #region WebVisit

        static public long SaveVisit(this string user_name, bool? authentication,
            string authentication_type, string user_host_name,
            string user_host_address, string url,
            string physical_path, string areas, string controller,
            string action, string roles_access, bool? access)
        {
            try
            {
                EFWebVisit ef_visit = new EFWebVisit(new EFDbContext());
                WebVisit new_visit = new WebVisit()
                {
                    id = 0,
                    date_time = DateTime.Now,
                    user_name = user_name,
                    authentication = authentication,
                    authentication_type = authentication_type,
                    user_host_name = user_host_name,
                    user_host_address = user_host_address,
                    url = url,
                    physical_path = physical_path,
                    areas = areas,
                    controller = controller,
                    action = action,
                    roles_access = roles_access,
                    access = access
                };

                ef_visit.Add(new_visit);
                ef_visit.Save();
                ef_visit.Refresh(new_visit);
                return new_visit.id;
            }
            catch (Exception e)
            {
                Console.WriteLine(String.Format("Ошибка выполнения метода SaveVisit(user_name={0},authentication={1}, authentication_type={2}, user_host_name={3}, user_host_address={4}, url={5}, physical_path={6}, areas={7}, controller={8}, action={9}, roles_access={10}, access={11}). Exception:{12}",
                    user_name, authentication, authentication_type, user_host_name, user_host_address, url, physical_path, areas, controller, action, roles_access, access, e));
                return -1;
            }
        }

        #endregion

        #region WebError

        static public long SaveWebException(this Exception Exception, string user_name, bool? authentication,
                        string authentication_type, string user_host_name,
                        string user_host_address, string url,
                        string physical_path,string user_agent,string request_type, 
                        int? HttpCode)
        {
            try
            {
                EFWebErrors ef_err = new EFWebErrors(new EFDbContext());
                // Запись циклических ошибок
                if (Exception.InnerException != null)
                {
                    Exception.InnerException.SaveWebException(user_name, 
                        authentication, authentication_type, 
                        user_host_name, user_host_address, url, 
                        physical_path, user_agent, request_type, null);
                }
                WebErrors new_err = new WebErrors()
                {
                    id = 0,
                    date_time = DateTime.Now,
                    user_name = user_name,
                    authentication = authentication,
                    authentication_type = authentication_type,
                    user_host_name = user_host_name,
                    user_host_address = user_host_address,
                    url = url,
                    physical_path = physical_path,
                    user_agent = user_agent,
                    request_type = request_type,
                    httpcode = HttpCode,
                    hresult = Exception.HResult,
                    inner_exception = Exception.InnerException != null ? Exception.InnerException.Message : null,
                    message = Exception.Message,
                    source = Exception.Source,
                    stack_trace = Exception.StackTrace,
                };

                ef_err.Add(new_err);
                ef_err.Save();
                ef_err.Refresh(new_err);
                return new_err.id;
            }
            catch (Exception e)
            {
                Console.WriteLine(String.Format("Ошибка выполнения метода SaveWebException(Exception={0},user_name={1}, authentication={2}, authentication_type={3}, user_host_name={4}, user_host_address={5}, url={6}, physical_path={7}, user_agent={8}, request_type={9}, HttpCode={10}). Exception:{11}",
                    Exception, user_name, authentication, authentication_type, user_host_name, user_host_address, url, physical_path, user_agent, request_type, HttpCode, e));
                return -1;
            }
        }

        #endregion
    }
}
