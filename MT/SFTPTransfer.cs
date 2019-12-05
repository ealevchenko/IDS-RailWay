using IDSLogs;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tamir.SharpSsh;

namespace MT
{
    public enum sftp_transfer_error : int
    {
        clobal_error = -1,
        not_fromFilePaths = -2,
        coincide_fromFilePaths_toDirPath = -3,
        not_connect = -4,
        null_client_sftp = -5,
    }

    public class SFTPTransfer
    {
        private eventID eventID = eventID.MT_SFTPTransfer;
        private service servece_owner = service.Null;
        private Sftp client_sftp;

        private string host;
        private int port;
        private string user;
        private string psw;

        private string _fromPathsHost;  // Путь для чтения файлов из host
        public string fromPathsHost { get { return this._fromPathsHost; } set { this._fromPathsHost = value; } }
        private string _toPathsHost;    // Путь для записи файлов в host
        public string toPathsHost { get { return this._toPathsHost; } set { this._toPathsHost = value; } }
        private string _FileFiltrHost = "*.*";  // Фильтр файлов из host
        public string FileFiltrHost { get { return this._FileFiltrHost; } set { this._FileFiltrHost = value; } }
        private string _fromDirPath;   // Путь для чтения файлов для загрузки в host
        public string fromDirPath { get { return this._fromDirPath; } set { this._fromDirPath = value; } }
        private string _toTMPDirPath = Path.GetTempPath();     // Путь к временной папки для записи файлов из host для дальнейшей обработки
        public string toTMPDirPath { get { return this._toTMPDirPath; } set { this._toTMPDirPath = value; } }
        private string _toDirPath = null; // Путь для записи файлов из host для постоянного хранения
        public string toDirPath { get { return this._toDirPath; } set { this._toDirPath = value; } }
        private string _FileFiltr = "*.*";  // Фильтр файлов для загрузки в host
        public string FileFiltr { get { return this._FileFiltr; } set { this._FileFiltr = value; } }
        private bool _DeleteFileHost = false; // Признак удаления файлов после копирования из host
        public bool DeleteFileHost { get { return this._DeleteFileHost; } set { this._DeleteFileHost = value; } }
        private bool _DeleteFileDir = false; // Признак удаления файлов после копирования из папки
        public bool DeleteFileDir { get { return this._DeleteFileDir; } set { this._DeleteFileDir = value; } }
        private bool _RewriteFile = false;  // Признак перезаписи файлов в директории приемнике если совподает название файда
        public bool RewriteFile { get { return this._RewriteFile; } set { this._RewriteFile = value; } }

        public SFTPTransfer(string host, int port, string user, string psw)
        {
            this.host = host;
            this.port = port;
            this.user = user;
            this.psw = psw;
        }
        public SFTPTransfer(string host, int port, string user, string psw, service servece_owner)
        {
            this.host = host;
            this.port = port;
            this.user = user;
            this.psw = psw;
            this.servece_owner = servece_owner;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool Connect()
        {

            this.client_sftp = new Sftp(this.host, this.user);
            this.client_sftp.Password = this.psw;
            try
            {
                this.client_sftp.Connect(this.port);
            }
            catch (Exception e)
            {
                e.ExceptionLog(String.Format("Ошибка подключения sftp-клиента, Host:{0} ", this.host), this.servece_owner, this.eventID);
                return false;
            }
            return true;
        }
        /// <summary>
        /// 
        /// </summary>
        public void Close()
        {
            this.client_sftp.Close();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        protected bool ExistFile(string file)
        {
            FileInfo fInfo = new FileInfo(file);
            return fInfo.Exists;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fromFilePaths"></param>
        /// <param name="fromFileFiltr"></param>
        /// <param name="toTMPDirPath"></param>
        /// <param name="toDirPath"></param>
        /// <param name="fromDeleteFile"></param>
        /// <param name="toRewriteFile"></param>
        /// <returns></returns>
        public int CopySFTPFile(string fromFilePaths, string fromFileFiltr, string toTMPDirPath, string toDirPath, bool fromDeleteFile, bool toRewriteFile)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(fromFilePaths) | String.IsNullOrWhiteSpace(toTMPDirPath))
                {
                    String.Format("Метод SFTPTransfer.CopySFTPFile() :Не определен путь копирования fromFilePaths:{0}, toDirPath:{1}.", fromFilePaths, toDirPath).ErrorLog(servece_owner, this.eventID);
                    return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.not_fromFilePaths);
                }
                if (toDirPath == toTMPDirPath)
                {
                    String.Format("Метод SFTPTransfer.CopySFTPFile() :Путь для постоянного хранения перенесённых файлов toDirPath:{0}, совпадает с временным хранилищем для обработки toTMPDirPath:{1}.", toDirPath, toTMPDirPath).ErrorLog(servece_owner, this.eventID);
                    return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.coincide_fromFilePaths_toDirPath);
                }
                if (this.client_sftp == null) return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.null_client_sftp);
                string[] listfromFile = this.client_sftp.GetFileList(fromFilePaths + "//" + fromFileFiltr);
                if (listfromFile == null || listfromFile.Count() == 0)
                {
                    return 0;
                }
                int count = 0;
                int cdel = 0;
                foreach (string file in listfromFile)
                {
                    // Если указана папка перенос в постоянное хранилище
                    if (!String.IsNullOrWhiteSpace(toDirPath))
                    {
                        if (this.client_sftp == null) return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.null_client_sftp);
                        client_sftp.Get(fromFilePaths + "//" + file, toDirPath + "\\");
                    }
                    // Переносим во временное хранилище
                    if ((toRewriteFile) | (!toRewriteFile & !ExistFile(toTMPDirPath + "\\" + file)))
                    {
                        if (this.client_sftp == null) return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.null_client_sftp);
                        client_sftp.Get(fromFilePaths + "//" + file, toTMPDirPath + "\\");
                        count++;
                    }
                    // Удалим файлы из host
                    if (fromDeleteFile)
                    {
                        if (this.client_sftp == null) return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.null_client_sftp);
                        client_sftp.Rm(fromFilePaths + "//" + file);
                        cdel++;
                    }
                }
                string mess = String.Format("На сервере SFTP:{0}{1}(филтр поиска:{2}) найдено {3} файлов, перенесено {4}", this.host, fromFilePaths, fromFileFiltr, listfromFile.Count(), count);
                if (fromDeleteFile) { mess = String.Format(mess + ", удаленно {0}", cdel); }
                mess.InformationLog(servece_owner, this.eventID);
                if (listfromFile != null && listfromFile.Count() > 0) { mess.EventLog(listfromFile.Count() != count ? EventStatus.Error : EventStatus.Ok, servece_owner, eventID); }
                return count;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CopySFTPFile(fromFilePaths={0}, fromFileFiltr={1}, toTMPDirPath={2}, toDirPath={3}, fromDeleteFile={4}, toRewriteFile={5})",
                    fromFilePaths, fromFileFiltr, toTMPDirPath, toDirPath, fromDeleteFile, toRewriteFile), this.servece_owner, eventID);
                return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.clobal_error);
            }
        }
        /// <summary>
        /// Копировать из SFTP в указаную папку
        /// </summary>
        /// <returns></returns>
        public int CopySFTPFile()
        {
            return CopySFTPFile(this._fromPathsHost, this._FileFiltrHost, this._toTMPDirPath, this._toDirPath, this._DeleteFileHost, this._RewriteFile);
        }
        /// <summary>
        /// Полное копирование из SFTP в указаную папку 
        /// </summary>
        /// <param name="fromFilePaths"></param>
        /// <param name="fromFileFiltr"></param>
        /// <param name="toDirPath"></param>
        /// <param name="fromDeleteFile"></param>
        /// <param name="toRewriteFile"></param>
        /// <returns></returns>
        public int CopyToDir(string fromFilePaths, string fromFileFiltr, string toTMPDirPath, string toDirPath, bool fromDeleteFile, bool toRewriteFile)
        {
            try
            {
                int res = 0;
                if (Connect())
                {
                    res = CopySFTPFile(fromFilePaths, fromFileFiltr, toTMPDirPath, toDirPath, fromDeleteFile, toRewriteFile);
                    Close();
                }
                else
                {
                    res = this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.not_connect);
                }
                return res;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CopyToDir(fromFilePaths={0}, fromFileFiltr={1}, toTMPDirPath={2}, toDirPath={3}, fromDeleteFile={4}, toRewriteFile={5})",
                    fromFilePaths, fromFileFiltr, toTMPDirPath, toDirPath, fromDeleteFile, toRewriteFile), this.servece_owner, eventID);
                return this.eventID.GetEventIDErrorCode((int)sftp_transfer_error.clobal_error);
            }
        }
        /// <summary>
        /// Полное копирование из SFTP в указаную папку 
        /// </summary>
        /// <returns></returns>
        public int CopyToDir()
        {
            return CopyToDir(this._fromPathsHost, this._FileFiltrHost, this._toTMPDirPath, this._toDirPath, this._DeleteFileHost, this._RewriteFile);
        }
    }
}
