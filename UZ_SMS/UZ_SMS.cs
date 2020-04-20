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
using gohubclientcomLib;
//using EFUZ.Concrete;
//using EFUZ.Entities;

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

    public class myGohubConnection : GohubConnection, IGohubConnection
    {
        public myGohubConnection(string host, int port) : base(host, port) { }

        public void Close()
        {
            throw new NotImplementedException();
        }

        GohubComDocument IGohubConnection.QueryDocument(string docId)
        {
            throw new NotImplementedException();
        }

        public GohubComDocument QueryNextDocument(int Revision)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.OpenPrivateKey(string password)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.ReclaimDocument(string docId)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.DeleteDocument(string docId)
        {
            throw new NotImplementedException();
        }

        GohubComAttachment IGohubConnection.QueryAttachment(string attachmentId)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.DeleteAttachment(string attachmentId)
        {
            throw new NotImplementedException();
        }

        public bool ClearAllFilters()
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.QueryAndSaveDocumentPrintableForm(string docId, string path)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.QueryAndSaveFdu92PrintableForm(string docId, string path)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.QueryAndSaveGu45PrintableForm(string docId, string path)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.QueryAndSaveGu46PrintableForm(string docId, string path)
        {
            throw new NotImplementedException();
        }

        GohubComFdu92 IGohubConnection.QueryFdu92(string Id)
        {
            throw new NotImplementedException();
        }

        public GohubComFdu92 QueryNextFdu92(int Revision)
        {
            throw new NotImplementedException();
        }

        GohubComGu46 IGohubConnection.QueryGu46(string Id)
        {
            throw new NotImplementedException();
        }

        public GohubComGu46 QueryNextGu46(int Revision)
        {
            throw new NotImplementedException();
        }

        GohubComGu45 IGohubConnection.QueryGu45(string Id)
        {
            throw new NotImplementedException();
        }

        public GohubComGu45 QueryNextGu45(int Revision)
        {
            throw new NotImplementedException();
        }

        GohubComEData IGohubConnection.QueryEData(string eDataId)
        {
            throw new NotImplementedException();
        }

        public GohubComEData QueryNextEData(ulong Revision)
        {
            throw new NotImplementedException();
        }

        GohubComPiPackage IGohubConnection.QueryPiPackage(string eDataId)
        {
            throw new NotImplementedException();
        }

        public GohubComPiPackage QueryNextPiPackage(ulong Revision)
        {
            throw new NotImplementedException();
        }

        public GohubComPiPackage AddEDataToPiPackage(GohubComEData eData, string PiPackageId)
        {
            throw new NotImplementedException();
        }

        GohubComGu27 IGohubConnection.QueryGu27(string gu27Id)
        {
            throw new NotImplementedException();
        }

        public GohubComGu27 QueryNextGu27(int Revision)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.ReclaimGu27(string gu27Id)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.DeleteGu27(string gu27Id)
        {
            throw new NotImplementedException();
        }

        bool IGohubConnection.QueryAndSaveGu27PrintableForm(string gu27Id, string path)
        {
            throw new NotImplementedException();
        }

        GohubComAttachment IGohubConnection.QueryAttachmentWithUserData(string attachmentId)
        {
            throw new NotImplementedException();
        }

        public string GetMPMonths()
        {
            throw new NotImplementedException();
        }

        public void QueryAndSaveOrdersForMonthWithRelogin(string month, string login, string password, string path)
        {
            throw new NotImplementedException();
        }

        public bool SaveDocumentPrintableForm(string docId, string path)
        {
            throw new NotImplementedException();
        }

        public void SaveOrdersForMonthWithRelogin(string month, string login, string password, string path)
        {
            throw new NotImplementedException();
        }

        GohubComEData IGohubConnection.QueryEDataForAttachment(string attachmentId)
        {
            throw new NotImplementedException();
        }

        public GohubComInfServsDoc QueryInfServsDoc(ulong docId)
        {
            throw new NotImplementedException();
        }

        public GohubComInfServsDoc QueryNextInfServsDoc(ulong Revision)
        {
            throw new NotImplementedException();
        }

        public bool OpenPrivateKeyFromPath(string password, string path)
        {
            throw new NotImplementedException();
        }

        public GohubComFdu92 QueryFdu92ByNumber(string registration_esr, string registration_num)
        {
            throw new NotImplementedException();
        }

        GohubComDispatchInfo IGohubConnection.QueryDispatchInfo(string dispatch_esr, string arrival_num)
        {
            throw new NotImplementedException();
        }

        public GohubComGu45 QueryGu45ByNumber(string registration_esr, string registration_num, string registration_date)
        {
            throw new NotImplementedException();
        }

        public GohubComGu46 QueryGu46ByNumber(string registration_esr, string registration_num)
        {
            throw new NotImplementedException();
        }

        public GohubComSignerInfo Signer => throw new NotImplementedException();

        public int FilterByDocumentStatus { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByDocumentNumber { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByWagonNumber { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByDepartureClientCode { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByDeparturePayerCode { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByDepartureStationCode { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByArrivalClientCode { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByArrivalPayerCode { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FilterByArrivalStationCode { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }

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
            string DeparturePayerCode, string DepartureStationCode, string ArrivalClientCode, string ArrivalPayerCode, string ArrivalStationCode)
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

                    foreach (GohubDocument document in connection.QueryDocuments(0))
                    {
                        list.Add(document);
                    }
                }
                return list;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetEPD_UZ_Of_Filter()"), servece_owner, eventID);
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
                List<GohubDocument> docs = GetEPD_UZ_Of_Filter(null, DocumentNumber, GohubDocumentStatus.Unknown, null, null, null, null, null, null);
                return docs;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetEPD_UZ_Of_NumDoc(DocumentNumber={0})", DocumentNumber), servece_owner, eventID);
                return null;
            }
        }
        /// <summary>
        /// Получитм документ УЗ по номеру документа
        /// </summary>
        /// <param name="DocumentNumber"></param>
        /// <returns></returns>
        public List<UZ_DOC> GetUZ_DOC_Of_NumDoc(string DocumentNumber)
        {
            try
            {
                List<UZ_DOC> list = new List<UZ_DOC>();
                List<GohubDocument> docs = GetEPD_UZ_Of_NumDoc(DocumentNumber);
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
                    UZ_DOC uz_doc = new UZ_DOC()
                    {
                        id_doc = doc.Id,
                        revision = doc.Revision,
                        status = GetStatus(doc.Status.ToString()),
                        sender_code = sender_code,
                        recipient_code = recipient_code,
                        dt = doc.TimeStamp,
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
                e.ExceptionMethodLog(String.Format("GetUZ_DOC_Of_NumDoc(DocumentNumber={0})", DocumentNumber), servece_owner, eventID);
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
                case "Recieved": return uz_status.recieved;
                case "Uncredited": return uz_status.uncredited;
                case "Accepted": return uz_status.accepted;
                case "Delivered": return uz_status.delivered;
                case "Draft": return uz_status.draft;
                case "Registered": return uz_status.registered;
                case "Canceled": return uz_status.canceled;
                default: return null;
            }
        }
        /// <summary>
        /// Получить XML перевозочного документа из промежуточной базой KRR-PA-VIZ-Other_DATA по номеру вагона
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
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

        #endregion

        ///// <summary>
        ///// Получить Электронный перевозочный документ OTPR
        ///// </summary>
        ///// <param name="xml"></param>
        ///// <returns></returns>
        //public OTPR GetECD_OTPR(string xml)
        //{
        //    try
        //    {
        //        XmlDocument xDoc = new XmlDocument();
        //        xDoc.LoadXml(xml);
        //        // получим корневой элемент
        //        XmlElement xRoot = xDoc.DocumentElement;
        //        OTPR otpr = new OTPR();
        //        //UZ_XML_DOC(xRoot, ref otpr);
        //        string xml_out = null;
        //        UZ_XML_DOC(xRoot, ref xml_out);

        //        return otpr;
        //    }
        //    catch (Exception e)
        //    {
        //        e.ExceptionMethodLog(String.Format("GetECD_OTPR(xml={0})", xml), this.servece_owner, this.eventID);
        //        return null;
        //    }
        //}

        //private void UZ_XML_DOC(XmlElement xRoot, ref OTPR otpr)
        //{
        //    foreach (XmlNode xnode in xRoot)
        //    {
        //        //foreach (XmlNode node_doc in xnode.ChildNodes)
        //        //{
        //        // если узел - document-data
        //        if (xnode.Name == "document-data")
        //        {
        //            foreach (XmlNode child_node_doc in xnode.ChildNodes)
        //            {
        //                // если узел - document-data
        //                if (child_node_doc.Name == "uz-rwc-doc")
        //                {
        //                    UZ_XML_DOC((XmlElement)child_node_doc, ref otpr);
        //                }
        //                // если узел - document-data
        //                if (child_node_doc.Name == "changes")
        //                {
        //                    //// Применить изменения
        //                    //foreach (XmlNode changes_node in child_node_doc.ChildNodes)
        //                    //{
        //                    //    string target = getAttributes<string>(changes_node, "target");

        //                    //    if (changes_node.Name == "delete")
        //                    //    {

        //                    //    }
        //                    //    if (changes_node.Name == "update")
        //                    //    {

        //                    //    }
        //                    //    if (changes_node.Name == "insert")
        //                    //    {

        //                    //    }
        //                    //}
        //                    //OTPR g = otpr;
        //                }

        //                // если узел - document-data
        //                if (child_node_doc.Name == "OTPR")
        //                {
        //                    // атрибуты
        //                    GetAttributes(child_node_doc, ref otpr);
        //                    foreach (XmlNode otpr_node in child_node_doc.ChildNodes)
        //                    {
        //                        switch (otpr_node.Name)
        //                        {
        //                            case "ACTS": { GetTagACTS(otpr_node, ref otpr); break; }
        //                            case "CARRIER": { GetTagCARRIER(otpr_node, ref otpr); break; }
        //                            case "CIM_INFO": { GetTagCIM_INFO(otpr_node, ref otpr); break; }
        //                            case "CLIENT": { GetTagCLIENT(otpr_node, ref otpr); break; }
        //                            case "COM_COND": { GetTagCOM_COND(otpr_node, ref otpr); break; }
        //                            case "CONT": { GetTagCONT(otpr_node, ref otpr); break; }
        //                            case "FRONTIER_MARK": { GetTagFRONTIER_MARK(otpr_node, ref otpr); break; }
        //                            case "OTPRDP": { GetTagOTPRDP(otpr_node, ref otpr); break; }
        //                            case "PAC": { GetTagPAC(otpr_node, ref otpr); break; }
        //                            case "PASS_MARK": { GetTagPASS_MARK(otpr_node, ref otpr); break; }
        //                            case "PL": { GetTagPL(otpr_node, ref otpr); break; }
        //                            case "PROLONGATION": { GetTagPROLONGATION(otpr_node, ref otpr); break; }
        //                            case "ROUTE": { GetTagROUTE(otpr_node, ref otpr); break; }
        //                            case "RW_STAT": { GetTagRW_STAT(otpr_node, ref otpr); break; }
        //                            case "REFUSE_EPD": { GetTagREFUSE_EPD(otpr_node, ref otpr); break; }
        //                            case "REISSUE_INFO": { GetTagREISSUE_INFO(otpr_node, ref otpr); break; }
        //                            case "SCHEMA": { GetTagSCHEMA(otpr_node, ref otpr); break; }
        //                            case "SENDER_DOC": { GetTagSENDER_DOC(otpr_node, ref otpr); break; }
        //                            case "SEND_STAT": { GetTagSEND_STAT(otpr_node, ref otpr); break; }
        //                            case "SHTEMPEL": { GetTagSHTEMPEL(otpr_node, ref otpr); break; }
        //                            case "SPEC_COND": { GetTagSPEC_COND(otpr_node, ref otpr); break; }
        //                            case "TAKS": { GetTagTAKS(otpr_node, ref otpr); break; }
        //                            case "TEXT": { GetTagTEXT(otpr_node, ref otpr); break; }
        //                            case "VAGON": { GetTagVAGON(otpr_node, ref otpr); break; }
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //        // если узел - changes
        //        if (xnode.Name == "signature")
        //        {
        //            foreach (XmlNode childnode in xnode.ChildNodes)
        //            {

        //            }
        //        }
        //        //}
        //    }
        //}

    }
}
