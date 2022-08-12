using IDSLogs.Enum;
using IDSLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Globalization;
using System.Xml.Linq;
using System.Configuration;
using TMSoft.Gohub.Client;
using EFUZ.Concrete;
using EFUZ.Entities;
using System.IO;

namespace UZ
{
    public enum uz_status : int
    {
        unknown = 0,	            //	 Статус невідомий
        draft = 1,	                //	 Чернетка
        sending = 2,	            //	 Документ передається товарному касиру
        registered = 3,	            //	 Документ переданий товарному касиру
        reclaiming = 4, 	        //	 Документ відкликається від товарного касира
        accepted = 5,	            //	 Вантаж прийнято до перевезення
        delivered = 6,	            //	 Вантаж прибув
        recieved = 7,	            //	 Вантаж отримано одержувачем
        uncredited = 8,	            //	 Документ розкредитовано товарним касиром
        recieved_draft = 9,	        //	 Вантаж отримано одержувачем і редагується
        recieved_sending = 10,	    //	 Вантаж отримано одержувачем і переданий товарному касиру 
        recieved_reclaiming = 11,	//	 Вантаж отримано одержувачем і відкликається від товарного касира
        canceled = 12,	            //	 Документ зіпсований товарним касиром
        locked = 13,	            //	 Документ заблокований
    }

    /// <summary>
    /// TODO: Удалить после изменения прибытия (!!! Использую в отправках)
    /// </summary>
    public class UZ_DOC
    {
        public string id_doc { get; set; }
        public int revision { get; set; }
        public uz_status? status { get; set; }
        public string sender_code { get; set; }
        public string recipient_code { get; set; }
        public DateTime? dt { get; set; }
        public string xml { get; set; }
        public string xml_final { get; set; }
        public OTPR otpr { get; set; }
    }
    /// <summary>
    /// Класс набора данных документов по прибытию из промежуточной базы
    /// </summary>
    public class UZ_DOC_FULL
    {
        public string id_doc { get; set; }
        public int revision { get; set; }
        public int? num_uz { get; set; }
        public uz_status? status { get; set; }
        public string sender_code { get; set; }
        public string recipient_code { get; set; }
        public DateTime? dt { get; set; }
        public string xml { get; set; }
        public string xml_final { get; set; }
        public OTPR otpr { get; set; }
    }

    public class UZ_SMS
    {
        private eventID eventID = eventID.UZ_SMS;
        protected service servece_owner = service.Null;
        protected string host;
        protected int port;
        protected GohubConnection connection;

        public UZ_SMS()
        {
            try
            {
                this.host = ConfigurationManager.AppSettings["SMS_HOST"].ToString();
                this.port = int.Parse(ConfigurationManager.AppSettings["SMS_PORT"].ToString());
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UZ_SMS()"), this.servece_owner, eventID);
            }
        }

        public UZ_SMS(string host, int port)
        {
            this.host = host;
            this.port = port;
        }

        public UZ_SMS(service servece_owner)
        {
            try
            {
                this.servece_owner = servece_owner;
                this.host = ConfigurationManager.AppSettings["SMS_HOST"].ToString();
                this.port = int.Parse(ConfigurationManager.AppSettings["SMS_PORT"].ToString());
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("UZ_SMS(servece_owner={0})", servece_owner), this.servece_owner, eventID);
            }
        }

        public UZ_SMS(string host, int port, service servece_owner)
        {
            this.servece_owner = servece_owner;
            this.host = host;
            this.port = port;
        }

        #region

        public string IntsToString(int[] source, char sep)
        {
            if (source == null) return null;
            string list = "";
            foreach (int i in source)
            {
                list += i.ToString() + sep;
            }
            if (!String.IsNullOrWhiteSpace(list)) { return list.Remove(list.Length - 1); } else { return null; }
        }
        #endregion


        public bool Connection(string host, int port)
        {
            try
            {
                this.host = host;
                this.port = port;
                return Connection();

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Connection(host={0}, port={1})", host, port), this.servece_owner, eventID);
                return false;
            }






        }
        /// <summary>
        /// Подключится к модулю согласования
        /// </summary>
        /// <returns></returns>
        public bool Connection()
        {
            try
            {
                this.connection = new GohubConnection(this.host, this.port);
                Console.WriteLine("OK");
                return true;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Connection()"), this.servece_owner, eventID);
                return false;
            }
        }

        /// <summary>
        /// Получить OTPR по ID документа СМС
        /// </summary>
        /// <param name="id_doc"></param>
        /// <returns></returns>
        public OTPR GetOTPR(string id_doc)
        {
            if (this.connection == null)
            {
                Connection();
            }
            if (this.connection != null)
            {
                GohubDocument doc = this.connection.QueryDocument(id_doc);
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                //return convert.FinalXMLToOTPR(convert.XMLToFinalXML(doc.GetXmlText()));
                return convert.XMLToOTPR(doc.GetXmlText());
            }
            return null;
        }
        /// <summary>
        /// Получить OTPR из XML
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public OTPR GetOTPROfXML(string xml)
        {
            UZ_Convert convert = new UZ_Convert(this.servece_owner);
            return convert.XMLToOTPR(xml);
            //return convert.FinalXMLToOTPR(convert.XMLToFinalXML(xml));
        }

        /// <summary>
        /// Получитм документ применив фильтр
        /// </summary>
        /// <param name="df"></param>
        /// <returns></returns>
        public List<GohubDocument> GetEPD_UZ_Of_Filter(string WagonNumber, string DocumentNumber, GohubDocumentStatus DocumentStatus, string DepartureClientCode,
            string DeparturePayerCode, string DepartureStationCode, string ArrivalClientCode, string ArrivalPayerCode, string ArrivalStationCode, int count)
        {
            try
            {
                List<GohubDocument> list = new List<GohubDocument>();

                if (this.connection == null)
                {
                    Connection();
                }
                if (this.connection != null)
                {
                    connection.DocumentFilter.WagonNumber = WagonNumber;
                    connection.DocumentFilter.DocumentNumber = DocumentNumber;
                    connection.DocumentFilter.DocumentStatus = DocumentStatus;
                    connection.DocumentFilter.DepartureClientCode = DepartureClientCode;
                    connection.DocumentFilter.DeparturePayerCode = DeparturePayerCode;
                    connection.DocumentFilter.DepartureStationCode = DepartureStationCode;
                    connection.DocumentFilter.ArrivalClientCode = ArrivalClientCode;
                    connection.DocumentFilter.ArrivalPayerCode = ArrivalPayerCode;
                    connection.DocumentFilter.ArrivalStationCode = ArrivalStationCode;

                    int index = 0;
                    foreach (GohubDocument document in connection.QueryDocuments(0))
                    {
                        index++;
                        list.Add(document);
                        if (index == count) { return list; }
                    }
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetEPD_UZ_Of_Filter(WagonNumber={0}, DocumentNumber={1})", WagonNumber, DocumentNumber), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получитм документ по номеру документа
        /// </summary>
        /// <param name="DocumentNumber"></param>
        /// <returns></returns>
        public List<GohubDocument> GetEPD_UZ_Of_NumDoc(string DocumentNumber)
        {
            try
            {
                List<GohubDocument> docs = GetEPD_UZ_Of_Filter(null, DocumentNumber, GohubDocumentStatus.Unknown, null, null, null, null, null, null, 0);
                return docs;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetEPD_UZ_Of_NumDoc(DocumentNumber={0})", DocumentNumber), servece_owner, eventID);
                return null;
            }
        }
        public List<GohubDocument> GetEPD_UZ_Of_NumWagon(string WagonNumber)
        {
            try
            {
                List<GohubDocument> docs = GetEPD_UZ_Of_Filter(WagonNumber, null, GohubDocumentStatus.Unknown, null, null, null, null, null, null, 0);
                return docs;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetEPD_UZ_Of_NumWagon(WagonNumber={0})", WagonNumber), servece_owner, eventID);
                return null;
            }
        }

        public void GetUZ_Document_Of_doc_id(string documentId)
        {
            try
            {

                if (this.connection == null)
                {
                    Connection();
                }
                if (this.connection != null)
                {
                    byte[] doc = connection.QueryDocumentPrintableForm(documentId);
                    File.WriteAllBytes(@"d:\" + documentId + ".pdf", doc);
                }
                return;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetUZ_Document_Of_doc_id(WagonNumber={0})", documentId), servece_owner, eventID);
                return;
            }
        }

        /// <summary>
        /// Получитм документ УЗ по номеру документа
        /// </summary>
        /// <param name="DocumentNumber"></param>
        /// <returns></returns>
        //TODO: !!! Убрать использую Get_UZ_DOC_SMS_Of_NumDoc(string DocumentNumber)
        //public List<UZ_DOC> GetUZ_DOC_Of_NumDoc(string DocumentNumber)
        //{
        //    try
        //    {
        //        List<UZ_DOC> list = new List<UZ_DOC>();
        //        List<GohubDocument> docs = GetEPD_UZ_Of_NumDoc(DocumentNumber);
        //        if (docs == null) return null;
        //        foreach (GohubDocument doc in docs)
        //        {

        //            UZ_Convert convert = new UZ_Convert(this.servece_owner);
        //            string xml_final = convert.XMLToFinalXML(doc.GetXmlText());
        //            OTPR otpr = convert.FinalXMLToOTPR(xml_final);
        //            string sender_code = null;
        //            string recipient_code = null;
        //            if (otpr != null && otpr.client.Count() == 2)
        //            {
        //                sender_code = otpr.client[0].kod;
        //                recipient_code = otpr.client[1].kod;
        //            }
        //            UZ_DOC uz_doc = new UZ_DOC()
        //            {
        //                id_doc = doc.Id,
        //                revision = doc.Revision,
        //                status = GetStatus(doc.Status.ToString()),
        //                sender_code = sender_code,
        //                recipient_code = recipient_code,
        //                //dt = doc.TimeStamp,
        //                xml = doc.GetXmlText(),
        //                xml_final = xml_final,
        //                otpr = otpr
        //            };
        //            list.Add(uz_doc);
        //        }
        //        return list;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetUZ_DOC_Of_NumDoc(DocumentNumber={0})", DocumentNumber), servece_owner, eventID);
        //        return null;
        //    }
        //}
        /// <summary>
        /// Получитм документ УЗ по номеру документа 
        /// </summary>
        /// <param name="DocumentNumber"></param>
        /// <returns></returns>
        public List<UZ_DOC_FULL> Get_UZ_DOC_SMS_Of_NumDoc(string DocumentNumber)
        {
            try
            {
                List<UZ_DOC_FULL> list = new List<UZ_DOC_FULL>();
                List<GohubDocument> docs = GetEPD_UZ_Of_NumDoc(DocumentNumber);
                if (docs == null) return null;
                foreach (GohubDocument doc in docs)
                {
                    UZ_Convert convert = new UZ_Convert(this.servece_owner);
                    string xml = doc.GetXmlText();
                    string xml_final = convert.XMLToFinalXML(xml);
                    OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                    string sender_code = null;
                    string recipient_code = null;
                    if (otpr != null && otpr.client.Count() == 2)
                    {
                        sender_code = otpr.client[0].kod;
                        recipient_code = otpr.client[1].kod;
                    }
                    DateTime? dt;
                    try
                    {
                        if (doc.TimeStamp != null)
                        {
                            dt = doc.TimeStamp;
                        }
                        else
                        {
                            dt = otpr != null ? otpr.date_otpr : null;
                        }
                    }
                    catch
                    {
                        dt = otpr != null ? otpr.date_otpr : null;
                    }
                    UZ_DOC_FULL uz_doc = new UZ_DOC_FULL()
                    {
                        id_doc = doc.Id,
                        revision = doc.Revision,
                        num_uz = int.Parse(DocumentNumber),
                        status = GetStatus(doc.Status.ToString()),
                        sender_code = sender_code,
                        recipient_code = recipient_code,
                        dt = dt,
                        xml = doc.GetXmlText(),
                        xml_final = xml_final,
                        otpr = otpr
                    };
                    list.Add(uz_doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Get_UZ_DOC_SMS_Of_NumDoc(DocumentNumber={0})", DocumentNumber), servece_owner, eventID);
                return null;
            }
        }

        public List<UZ_DOC_FULL> Get_UZ_DOC_SMS_Of_NumWagon(string WagonNumber)
        {
            try
            {
                List<UZ_DOC_FULL> list = new List<UZ_DOC_FULL>();
                List<GohubDocument> docs = GetEPD_UZ_Of_NumWagon(WagonNumber);
                if (docs == null) return null;
                foreach (GohubDocument doc in docs)
                {

                    UZ_Convert convert = new UZ_Convert(this.servece_owner);
                    string xml_final = convert.XMLToFinalXML(doc.GetXmlText());
                    OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                    string sender_code = null;
                    string recipient_code = null;
                    if (otpr != null && otpr.client.Count() == 2)
                    {
                        sender_code = otpr.client[0].kod;
                        recipient_code = otpr.client[1].kod;
                    }
                    DateTime? dt;
                    try
                    {
                        dt = doc.TimeStamp;
                    }
                    catch
                    {
                        dt = null;
                    }
                    UZ_DOC_FULL uz_doc = new UZ_DOC_FULL()
                    {
                        id_doc = doc.Id,
                        revision = doc.Revision,
                        num_uz = otpr != null ? otpr.nom_doc : null,
                        status = GetStatus(doc.Status.ToString()),
                        sender_code = sender_code,
                        recipient_code = recipient_code,
                        dt = dt,
                        xml = doc.GetXmlText(),
                        xml_final = xml_final,
                        otpr = otpr
                    };
                    list.Add(uz_doc);
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Get_UZ_DOC_SMS_Of_NumWagon(WagonNumber={0})", WagonNumber), servece_owner, eventID);
                return null;
            }
        }
        #region Работа с промежуточной базой KRR-PA-VIZ-Other_DATA
        /// <summary>
        /// Получить статус по названию в базе
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public uz_status? GetStatus(string status)
        {
            switch (status)
            {
                case "Unknown": return uz_status.unknown;                   //Статус неизвестен
                case "Draft": return uz_status.draft;                       // Черновик
                case "Sending": return uz_status.sending;                   // Документ передается товарному кассиру
                case "Registered": return uz_status.registered;             //	 Документ переданий товарному касиру
                case "Reclaiming": return uz_status.reclaiming;             //	 Документ відкликається від товарного касира
                case "Accepted": return uz_status.accepted;                 //	 Вантаж прийнято до перевезення
                case "Delivered": return uz_status.delivered;               //	 Вантаж прибув
                case "Recieved": return uz_status.recieved;                 //	 Вантаж отримано одержувачем
                case "Uncredited": return uz_status.uncredited;             //	 Документ розкредитовано товарним касиром
                case "RecDraft": return uz_status.recieved_draft;           //	 Вантаж отримано одержувачем і редагується                  
                case "RecSending": return uz_status.recieved_sending;       //	 Вантаж отримано одержувачем і переданий товарному касиру 
                case "RecReclaiming": return uz_status.recieved_reclaiming; //	 Вантаж отримано одержувачем і відкликається від товарного касира              
                case "Canceled": return uz_status.canceled;                 //	 Документ зіпсований товарним касиром
                // locked = 13,	            //	 Документ заблокований
                default: return null;
            }
        }
        /// <summary>
        /// Получить XML перевозочного документа из промежуточной базой KRR-PA-VIZ-Other_DATA по номеру вагона
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        //TODO: !!! Убрать использую Get_UZ_DOC_SDB_Of_Num(int num)
        public UZ_DOC GetDocumentOfDB_Num(int num)
        {
            try
            {
                UZ_DOC doc = null;
                EFUZ_VagonData ef_vagon = new EFUZ_VagonData(new EFSMSDbContext());
                EFUZ_Data ef_data = new EFUZ_Data(new EFSMSDbContext());
                UZ_VagonData vagon = ef_vagon.Context.Where(v => v.nomer == num.ToString()).OrderByDescending(c => c.dt).FirstOrDefault();
                if (vagon != null)
                {
                    // вагон найден. найдем документ
                    UZ_Data data = ef_data.Context.Where(d => d.doc_Id == vagon.nom_doc).FirstOrDefault();
                    if (data != null)
                    {
                        UZ_Convert convert = new UZ_Convert(this.servece_owner);
                        string xml_final = convert.XMLToFinalXML(data.raw_xml);
                        OTPR otpr = convert.FinalXMLToOTPR(xml_final);

                        // Документ найден 
                        doc = new UZ_DOC();
                        doc.id_doc = data.doc_Id;
                        doc.revision = data.doc_Revision;
                        doc.status = GetStatus(data.doc_Status);
                        doc.sender_code = data.depart_code;
                        doc.recipient_code = data.arrived_code;
                        doc.dt = data.dt;
                        doc.xml = data.raw_xml;
                        doc.xml_final = xml_final;
                        doc.otpr = otpr;
                    }
                }
                return doc;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDocumentOfDB_Num(num={0})", num), this.servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить XML перевозочного документа из промежуточной базой KRR-PA-VIZ-Other_DATA по номеру вагона отправленый в адрес перечня (кодов грузополучателей 7932, 6302, 659) на перечень станций УЗ Кривого Рога
        /// </summary>
        /// <param name="num"></param>
        /// <param name="consignees"></param>
        /// <param name="stations"></param>
        /// <param name="dt_arrival"></param>
        /// <returns></returns>
        //TODO: !!! Убрать использую Get_UZ_DOC_SDB_Of_Num_Date(int num, List<int> consignees, List<int> stations, DateTime? dt_arrival, int period)
        public UZ_DOC GetDocumentOfDB_NumConsigneesStations(int num, int[] consignees, int[] stations, DateTime? dt_arrival)
        {
            try
            {
                UZ_DOC doc = null;
                EFUZ_Data ef_data = new EFUZ_Data(new EFSMSDbContext());
                string sql = "SELECT *  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] " +
                    "where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer] = " + num.ToString() + ") and [arrived_code] in (0," + IntsToString(consignees, ',') + ",'none') order by[dt] desc";
                List<UZ_Data> list_uz_data = ef_data.Database.SqlQuery<UZ_Data>(sql).ToList();
                if (list_uz_data != null && list_uz_data.Count() > 0)
                {
                    UZ_Convert convert = new UZ_Convert(this.servece_owner);
                    foreach (UZ_Data uzd in list_uz_data)
                    {
                        DateTime new_dt = ((DateTime)dt_arrival).AddHours(-36);
                        int period = -36;
                        //!!! Проверка на старый документ на 36 часов годен затем только вручную
                        //if ((dt_arrival != null && uzd.update_dt != null && ((DateTime)dt_arrival).AddHours(period) <= uzd.update_dt) || (dt_arrival != null && uzd.update_dt == null  && uzd.dt != null && ((DateTime)dt_arrival).AddHours(period) <= uzd.dt))
                        string xml_final = convert.XMLToFinalXML(uzd.raw_xml);
                        OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                        DateTime? end_date = otpr != null ? otpr.srok_end : null;

                        if ((dt_arrival != null && end_date != null && dt_arrival <= end_date) || (dt_arrival != null && uzd.update_dt != null && ((DateTime)dt_arrival).AddHours(period) <= uzd.update_dt) || (dt_arrival != null && uzd.update_dt == null && uzd.dt != null && ((DateTime)dt_arrival).AddHours(period) <= uzd.dt))
                        {
                            // Проверим есть вагон в этом документе
                            if (otpr != null && otpr.vagon != null && otpr.vagon.Count() > 0)
                            {
                                int searsh_vag = otpr.vagon.Where(v => v.nomer == num.ToString()).Count();
                                if (searsh_vag > 0 && otpr != null && otpr.route != null && otpr.route.Count() > 0)
                                {
                                    if (!String.IsNullOrWhiteSpace(otpr.route[0].stn_to))
                                    {
                                        int res = (stations != null && stations.Count() > 0 ? stations.Where(s => s.ToString() == otpr.route[0].stn_to.ToString()).Count() : 0);
                                        if (res > 0)
                                        {
                                            // Документ найден 
                                            doc = new UZ_DOC();
                                            doc.id_doc = uzd.doc_Id;
                                            doc.revision = uzd.doc_Revision;
                                            doc.status = GetStatus(uzd.doc_Status);
                                            doc.sender_code = uzd.depart_code;
                                            doc.recipient_code = uzd.arrived_code;
                                            doc.dt = uzd.dt;
                                            doc.xml = uzd.raw_xml;
                                            doc.xml_final = xml_final;
                                            doc.otpr = otpr;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDocumentOfDB_NumConsigneesStations(num={0}, consignees={1}, stations={2},  dt_arrival={3})", num, consignees, stations, dt_arrival), this.servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить XML перевозочного документа из промежуточной базой KRR-PA-VIZ-Other_DATA по номеру вагона отправленыйх по перечню кодов грузоотправителей начиная с указаной даты, со статусом Accepted
        /// </summary>
        /// <param name="num"></param>
        /// <param name="shipper"></param>
        /// <param name="start_date"></param>
        /// <returns></returns>
        public UZ_DOC GetDocumentOfDB_NumShipper(int num, int[] shipper, DateTime? start_date)
        {
            try
            {
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                UZ_DOC doc = null;
                EFUZ_Data ef_data = new EFUZ_Data(new EFSMSDbContext());
                DateTime new_dt = ((DateTime)start_date).AddHours(0);

                string sql = @"SELECT *  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] " +
                    "where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer] = '" + num.ToString() + "') and [depart_code] in (0," + IntsToString(shipper, ',') + ",'none') and [doc_Status] in (N'Accepted', N'Delivered', N'Recieved', N'Uncredited') and update_dt >= convert(datetime,'" + new_dt.ToString("yyyy-MM-dd HH:mm:ss") + "',120)" +
                    //" and CONVERT(nvarchar(max), raw_xml) like(N'%" + num.ToString() + "%') " + 
                    " order by [dt]";
                //UZ_Data uzd = ef_data.Database.SqlQuery<UZ_Data>(sql).FirstOrDefault();
                List<UZ_Data> list_uzd = ef_data.Database.SqlQuery<UZ_Data>(sql).ToList();
                foreach (UZ_Data uzd in list_uzd)
                {
                    if (uzd != null)
                    {
                        string xml_final = convert.XMLToFinalXML(uzd.raw_xml);
                        OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                        if (otpr != null && otpr.vagon != null && otpr.vagon.Count() > 0)
                        {
                            // Проверим вагон пренадлежит документу
                            UZ.VAGON vagon = otpr.vagon.ToList().Find(v => v.nomer == num.ToString());
                            if (vagon != null)
                            {
                                // Документ найден 
                                doc = new UZ_DOC();
                                doc.id_doc = uzd.doc_Id;
                                doc.revision = uzd.doc_Revision;
                                doc.status = GetStatus(uzd.doc_Status);
                                doc.sender_code = uzd.depart_code;
                                doc.recipient_code = uzd.arrived_code;
                                doc.dt = uzd.dt;
                                doc.xml = uzd.raw_xml;
                                doc.xml_final = xml_final;
                                doc.otpr = otpr;
                                break;
                            }
                            else
                            {

                            }
                        }
                    }
                }
                return doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDocumentOfDB_NumShipper(num={0}, shipper={1}, start_date={2})", num, shipper, start_date), this.servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        ///  Получить обновленный документ
        /// </summary>
        /// <param name="num_doc"></param>
        /// <returns></returns>
        public UZ_DOC GetDocumentOfDB_NumDoc(string num_doc)
        {
            try
            {
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                UZ_DOC doc = null;
                EFUZ_Data ef_data = new EFUZ_Data(new EFSMSDbContext());
                UZ_Data uzd = ef_data.Context.Where(d => d.doc_Id == num_doc).FirstOrDefault();
                if (uzd != null)
                {
                    string xml_final = convert.XMLToFinalXML(uzd.raw_xml);
                    OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                    // Документ найден 
                    doc = new UZ_DOC();
                    doc.id_doc = uzd.doc_Id;
                    doc.revision = uzd.doc_Revision;
                    doc.status = GetStatus(uzd.doc_Status);
                    doc.sender_code = uzd.depart_code;
                    doc.recipient_code = uzd.arrived_code;
                    doc.dt = uzd.dt;
                    doc.xml = uzd.raw_xml;
                    doc.xml_final = xml_final;
                    doc.otpr = otpr;
                }
                return doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDocumentOfDB_NumDoc(num_doc={0})", num_doc), this.servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить документы по вагону по указаным грузополучателям за указаный интервал
        /// </summary>
        /// <param name="num"></param>
        /// <param name="consignees"></param>
        /// <param name="days"></param>
        /// <returns></returns>
        public List<UZ_DOC> GetDocumentOfDB_NumConsignees(int num, int[] consignees, int days)
        {
            try
            {
                EFUZ_Data ef_data = new EFUZ_Data(new EFSMSDbContext());
                string sql = "SELECT *  FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] " +
                    "where [doc_Id] in (SELECT [nom_doc] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_VagonData] where [nomer] = " + num.ToString() + ") and [arrived_code] in (0," + IntsToString(consignees, ',') + ",'none') order by[dt] desc";
                List<UZ_Data> list_uz_data = ef_data.Database.SqlQuery<UZ_Data>(sql).ToList();
                // Выберем все документы за указаный период
                List<UZ_DOC> result = new List<UZ_DOC>();
                DateTime start = DateTime.Now.AddDays(-1 * days);
                foreach (UZ_Data uz_doc in list_uz_data)
                {
                    if (uz_doc.update_dt != null)
                    {
                        if (uz_doc.update_dt >= start)
                        {
                            UZ_DOC doc = Convert_UZ_Data_To_UZ_DOC(uz_doc);
                            if (doc != null)
                            {
                                result.Add(doc);
                            }
                        }
                    }
                    else
                    {
                        if (uz_doc.dt >= start)
                        {
                            UZ_DOC doc = Convert_UZ_Data_To_UZ_DOC(uz_doc);
                            if (doc != null)
                            {
                                result.Add(doc);
                            }
                        }
                    }
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetDocumentOfDB_NumConsignees(num={0}, consignees={1}, days={2})", num, consignees, days), this.servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить UZ_DOC документ из UZ_Data (Промежуточной базы)
        /// </summary>
        /// <param name="uz_doc"></param>
        /// <returns></returns>
        public UZ_DOC Convert_UZ_Data_To_UZ_DOC(UZ_Data uz_doc)
        {
            try
            {
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                string xml_final = convert.XMLToFinalXML(uz_doc.raw_xml);
                OTPR otpr = convert.FinalXMLToOTPR(xml_final);

                // Документ найден 
                UZ_DOC doc = new UZ_DOC()
                {
                    id_doc = uz_doc.doc_Id,
                    revision = uz_doc.doc_Revision,
                    status = GetStatus(uz_doc.doc_Status),
                    sender_code = uz_doc.depart_code,
                    recipient_code = uz_doc.arrived_code,
                    dt = uz_doc.dt,
                    xml = uz_doc.raw_xml,
                    xml_final = xml_final,
                    otpr = otpr,
                };
                return doc;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Convert_UZ_Data_To_UZ_DOC(doc={0})", uz_doc), this.servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получить последнее время записи в промежуточную базу
        /// </summary>
        /// <returns></returns>
        public DateTime? GetLastDT_UZ_DOC()
        {
            try
            {
                EFUZ_Data ef_data = new EFUZ_Data(new EFSMSDbContext());
                string sql = "SELECT top(1)[dt] FROM [KRR-PA-VIZ-Other_DATA].[dbo].[UZ_Data] order by dt desc";
                DateTime last_uz_data = ef_data.Database.SqlQuery<DateTime>(sql).FirstOrDefault();
                return last_uz_data;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetLastDT_UZ_DOC()"), this.servece_owner, eventID);
                return null;
            }
        }

        public List<UZ_DOC_FULL> Get_UZ_DOC_SDB_Of_Num(int num)
        {
            try
            {
                EFSMSDbContext context = new EFSMSDbContext();
                List<UZ_DOC_FULL> list_result = new List<UZ_DOC_FULL>();
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                // Сделаем выборку 
                System.Data.SqlClient.SqlParameter p_num = new System.Data.SqlClient.SqlParameter("@num", num);
                string sql = "select * from [dbo].[get_UZ_Data_of_num](@num)";
                List<UZ_Data> list_uz_data = context.Database.SqlQuery<UZ_Data>(sql, p_num).ToList();

                if (list_uz_data != null)
                {
                    foreach (UZ_Data uz_data in list_uz_data)
                    {
                        string xml_final = convert.XMLToFinalXML(uz_data.raw_xml);
                        OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                        UZ_DOC_FULL doc = new UZ_DOC_FULL()
                        {
                            id_doc = uz_data.doc_Id,
                            revision = uz_data.doc_Revision,
                            num_uz = otpr != null ? otpr.nom_doc : null,
                            status = GetStatus(uz_data.doc_Status),
                            sender_code = uz_data.depart_code,
                            recipient_code = uz_data.arrived_code,
                            dt = uz_data.dt,
                            xml = uz_data.raw_xml,
                            xml_final = xml_final,
                            otpr = otpr,
                        };
                        list_result.Add(doc);
                    }
                }
                return list_result;

            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Get_UZ_DOC_SDB_Of_Num(num={0})", num), this.servece_owner, eventID);
                return null;
            }
        }
        public UZ_DOC_FULL Get_UZ_DOC_SDB_Of_Num_NumDoc(int num, int num_doc)
        {
            try
            {
                UZ_DOC_FULL result = null;
                EFSMSDbContext context = new EFSMSDbContext();
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                // Сделаем выборку 
                System.Data.SqlClient.SqlParameter p_num = new System.Data.SqlClient.SqlParameter("@num", num.ToString());
                string sql = "select * from [dbo].[get_UZ_Data_of_num](@num)";
                List<UZ_Data> list_uz_data = context.Database.SqlQuery<UZ_Data>(sql, p_num).ToList();

                if (list_uz_data != null)
                {
                    foreach (UZ_Data uz_data in list_uz_data)
                    {
                        string xml_final = convert.XMLToFinalXML(uz_data.raw_xml);
                        OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                        if (otpr != null && otpr.nom_doc == num_doc)
                        {
                            result = new UZ_DOC_FULL()
                            {
                                id_doc = uz_data.doc_Id,
                                revision = uz_data.doc_Revision,
                                num_uz = otpr != null ? otpr.nom_doc : null,
                                status = GetStatus(uz_data.doc_Status),
                                sender_code = uz_data.depart_code,
                                recipient_code = uz_data.arrived_code,
                                dt = uz_data.dt,
                                xml = uz_data.raw_xml,
                                xml_final = xml_final,
                                otpr = otpr,
                            };
                            break;
                        }

                    }
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Get_UZ_DOC_SDB_Of_Num_NumDoc(num={0}, num_doc={1})", num, num_doc), this.servece_owner, eventID);
                return null;
            }
        }
        public UZ_DOC_FULL Get_UZ_DOC_SDB_Of_Num_Date(int num, List<int> consignees, List<int> stations, DateTime? dt_arrival, int period)
        {
            try
            {
                UZ_DOC_FULL result = null;
                EFSMSDbContext context = new EFSMSDbContext();
                UZ_Convert convert = new UZ_Convert(this.servece_owner);
                // Сделаем выборку 
                System.Data.SqlClient.SqlParameter p_num = new System.Data.SqlClient.SqlParameter("@num", num.ToString());
                string sql = "select * from [dbo].[get_UZ_Data_of_num](@num) order by[dt] desc";
                List<UZ_Data> list_uz_data = context.Database.SqlQuery<UZ_Data>(sql, p_num).ToList();
                if (list_uz_data != null)
                {
                    foreach (UZ_Data uz_data in list_uz_data)
                    {
                        if (consignees.Contains(!string.IsNullOrWhiteSpace(uz_data.arrived_code) ? int.Parse(uz_data.arrived_code) : -1) == true)
                        {
                            string xml_final = convert.XMLToFinalXML(uz_data.raw_xml);
                            OTPR otpr = convert.FinalXMLToOTPR(xml_final);
                            DateTime? end_date = otpr != null ? otpr.srok_end : null;
                            // Проверим на время
                            if ((dt_arrival != null && end_date != null && dt_arrival <= end_date) ||
                                (dt_arrival != null && uz_data.update_dt != null && ((DateTime)dt_arrival).AddHours(period) <= uz_data.update_dt) ||
                                (dt_arrival != null && uz_data.update_dt == null && uz_data.dt != null && ((DateTime)dt_arrival).AddHours(period) <= uz_data.dt))
                            {
                                // Проверим есть вагон в этом документе
                                if (otpr != null && otpr.vagon != null && otpr.vagon.Count() > 0)
                                {
                                    int searsh_vag = otpr.vagon.Where(v => v.nomer == num.ToString()).Count();
                                    if (searsh_vag > 0 && otpr != null && otpr.route != null && otpr.route.Count() > 0)
                                    {
                                        if (!String.IsNullOrWhiteSpace(otpr.route[0].stn_to))
                                        {
                                            int res = (stations != null && stations.Count() > 0 ? stations.Where(s => s.ToString() == otpr.route[0].stn_to.ToString()).Count() : 0);
                                            if (res > 0)
                                            {
                                                result = new UZ_DOC_FULL()
                                                {
                                                    id_doc = uz_data.doc_Id,
                                                    revision = uz_data.doc_Revision,
                                                    num_uz = otpr != null ? otpr.nom_doc : null,
                                                    status = GetStatus(uz_data.doc_Status),
                                                    sender_code = uz_data.depart_code,
                                                    recipient_code = uz_data.arrived_code,
                                                    dt = uz_data.dt,
                                                    xml = uz_data.raw_xml,
                                                    xml_final = xml_final,
                                                    otpr = otpr,
                                                };
                                                break;
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                return result;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Get_UZ_DOC_SDB_Of_Num_Date(num={0}, consignees={1}, stations={2}, dt_arrival={3}, period={4})", num, consignees, stations, dt_arrival, period), this.servece_owner, eventID);
                return null;
            }
        }
        #endregion
    }
}
