using log4net;
using log4net.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDSLogs
{
    public static class FileLogs
    {
        private static ILog log = LogManager.GetLogger("LOGGER");

        static FileLogs()
        {
            XmlConfigurator.Configure();
        }

        public static void ErrorToFile(this string message)
        {
            log.Error(message);
        }

        public static void ErrorToFile(this string message, Exception ex)
        {
            log.Error(message, ex);
        }

        public static void DebugToFile(this string message)
        {
            log.Debug(message);
        }

        public static void DebugToFile(this string message, Exception ex)
        {
            log.Debug(message, ex);
        }

        public static void InformationToFile(this string message)
        {
            log.Info(message);
        }

        public static void InformationToFile(this string message, Exception ex)
        {
            log.Info(message, ex);
        }

        public static void WarningToFile(this string message)
        {
            log.Warn(message);
        }

        public static void WarningToFile(this string message, Exception ex)
        {
            log.Warn(message, ex);
        }

        public static void FatalToFile(this string message)
        {
            log.Fatal(message);
        }

        public static void FatalToFile(this string message, Exception ex)
        {
            log.Fatal(message, ex);
        }
        /// <summary>
        /// Сохранить ошибку выполнения метода
        /// </summary>
        /// <param name="e"></param>
        /// <param name="method"></param>
        //public static void SaveErrorMethod(this Exception e, string method, bool blog)
        //{
        //    Console.WriteLine(e.ToString());
        //    String.Format("Ошибка выполнения метода {0}", method).ErrorToFile(e);
        //}

    }
}
