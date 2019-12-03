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

    public static class DataBaseLogs
    {

        static DataBaseLogs()
        {

        }

        static private string GetIP()
        {
            string ips = "";
            foreach (System.Net.IPAddress ip in System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName()).AddressList)
            {
                ips += ip.ToString() + "; ";
            }
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

        #endregion
    }
}
