using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Test.TestModule;

namespace Test
{


    //public class ststion_uz
    //{
    //    public int code { get; set; }
    //    public string name { get; set; }
    //    public string name_uk { get; set; }
    //    public string admin { get; set; }
    //    public string ir { get; set; }
    //    public string node { get; set; }
    //}

    class Program
    {
        static void Main(string[] args)
        {

            //string ar = "WEB_UI.Areas.IDSMORS.Controllers.HomeController";

            //int n = ar.IndexOf("Areas.");

            //int n1 = ar.IndexOf(".Controllers");
            //ar = ar.Substring(ar.IndexOf("Areas.") + 6, ar.IndexOf(".Controllers") - (ar.IndexOf("Areas.") + 6));




            /// ВЫБОРКА СТАНЦИЙ ИЗ УЗ

            //try
            //{
            //    /// ВЫБОРКА СТАНЦИЙ ИЗ УЗ

            //    //String.Format("Выполняем запрос к WebAPI, url:{0}, api_comand {1}, metod {2}, accept {3}", url, api_comand, metod, accept).WriteInformation(eventID);
            //    //HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(@"https://uz.gov.ua/car_info/index.php?func=print&site_nv=52724994");
            //    HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(@"https://www.uz.gov.ua/nsi_cargo_stations/Nsi_Stan.php");

            //    request.Method = "POST";
            //    request.PreAuthenticate = true;
            //    request.Credentials = CredentialCache.DefaultCredentials;
            //    request.Accept = "text/html";
            //    //request.Accept = "application/json";
            //    request.ContentType = "application/x-www-form-urlencoded";
            //    //request.ContentType = "application/json";

            //    //string postData = "B1=%D0%9F%D0%BE%D1%88%D1%83%D0%BA&D2=n_stan&R1=1&T1=&T2=449909&T3=&T4=&T5=";
            //    //string postData = "B1=%D0%9F%D0%BE%D1%88%D1%83%D0%BA&D2=n_stan&R1=1&T1=&T2=0011518&T3=&T4=&T5=";
            //    //string postData = "B1=%D0%9F%D0%BE%D1%88%D1%83%D0%BA&D2=n_stan&R1=1&T1=&T2=&T3=22&T4=&T5=";
            //    string postData = "B1=%D0%9F%D0%BE%D1%88%D1%83%D0%BA&D2=n_stan&R1=1&T1=&T2=454606&T3=22&T4=&T5=";
            //    Encoding encoding = Encoding.UTF8;
            //    byte[] byte1 = encoding.GetBytes(postData);
            //    request.ContentLength = byte1.Length;
            //    Stream st = request.GetRequestStream();
            //    st.Write(byte1, 0, byte1.Length);
            //    st.Close();

            //    try
            //    {
            //        using (System.Net.WebResponse response = request.GetResponse())
            //        {
            //            try
            //            {
            //                using (System.IO.StreamReader rd = new System.IO.StreamReader(response.GetResponseStream()))
            //                {
            //                    string result = rd.ReadToEnd();
            //                    //PM > Install - Package HtmlAgilityPack - Version 1.11.17
            //                    HtmlDocument htmlSnippet = new HtmlDocument();
            //                    string sstr = "<br><table border='1' bgcolor='#ffffff' align=center cellpadding='1' cellspacing='0' height='20' width='600'>";
            //                    int indexOfSubstring = result.IndexOf(sstr);
            //                    if (indexOfSubstring > 0)
            //                    {
            //                        string text = result.Remove(0, (indexOfSubstring + sstr.Length));
            //                        indexOfSubstring = text.IndexOf("</table>");
            //                        if (indexOfSubstring > 0)
            //                        {
            //                            string res_tab = text.Remove(indexOfSubstring);
            //                            if (!String.IsNullOrWhiteSpace(res_tab))
            //                            {
            //                                // таблица определена
            //                                htmlSnippet.LoadHtml(res_tab);
            //                                List<ststion_uz> list_ststion_uz = new List<ststion_uz>();
            //                                foreach (HtmlNode link in htmlSnippet.DocumentNode.SelectNodes("//tr"))
            //                                {
            //                                    string value = link.InnerHtml;
            //                                    value = value.Replace("&nbsp;", "");
            //                                    if (!String.IsNullOrWhiteSpace(value))
            //                                    {
            //                                        // подстрока tr определена
            //                                        HtmlDocument html_tr = new HtmlDocument();
            //                                        html_tr.LoadHtml(value);
            //                                        List<string> list_fields = new List<string>();
            //                                        foreach (HtmlNode field in html_tr.DocumentNode.SelectNodes("//td"))
            //                                        {
            //                                            string value_fl = field.InnerHtml;
            //                                            if (value_fl == "<b> Код: </b>") break; // Пропустим заглавие
            //                                            value_fl = value_fl.Replace("&nbsp;", "");
            //                                            list_fields.Add(value_fl);
            //                                        }
            //                                        if (list_fields.Count() == 6)
            //                                        {
            //                                            ststion_uz str = new ststion_uz()
            //                                            {
            //                                                code = !String.IsNullOrWhiteSpace(list_fields[0]) ? int.Parse(list_fields[0]) : 0,
            //                                                name = !String.IsNullOrWhiteSpace(list_fields[1]) ? list_fields[1] : null,
            //                                                name_uk = !String.IsNullOrWhiteSpace(list_fields[2]) ? list_fields[2] : null,
            //                                                admin = !String.IsNullOrWhiteSpace(list_fields[3]) ? list_fields[3] : null,
            //                                                ir = !String.IsNullOrWhiteSpace(list_fields[4]) ? list_fields[4] : null,
            //                                                node = !String.IsNullOrWhiteSpace(list_fields[5]) ? list_fields[5] : null,
            //                                            };
            //                                            list_ststion_uz.Add(str);
            //                                        }

            //                                    }
            //                                }
            //                                //
            //                            }
            //                        }
            //                    }



            //                    //int indexOfSubstring = result.IndexOf("<td>11518");
            //                    //if (indexOfSubstring == -1) return;
            //                    //string text = result.Remove(0,indexOfSubstring);
            //                    //indexOfSubstring = text.IndexOf("</tr>");
            //                    //if (indexOfSubstring == -1) return;
            //                    //string text1 = text.Remove(indexOfSubstring);
            //                    //htmlSnippet.LoadHtml(text1);

            //                    //List<string> hrefTags = new List<string>();

            //                    //// <br><table border='1' bgcolor='#ffffff' align=center cellpadding='1' cellspacing='0' height='20' width='600'>

            //                    //foreach (HtmlNode link in htmlSnippet.DocumentNode.SelectNodes("//td"))
            //                    //{
            //                    //    //HtmlAttribute att = link.Attributes["href"];
            //                    //    //hrefTags.Add(att.Value);
            //                    //    string value = link.InnerHtml;
            //                    //    value = value.Replace("&nbsp;", "");
            //                    //    hrefTags.Add(value);
            //                    //}
            //                }
            //            }
            //            catch (Exception e)
            //            {

            //            }
            //        }
            //    }
            //    catch (Exception e)
            //    {

            //    }
            //}
            //catch (Exception e)
            //{

            //}

            //double value = 11.94;
            //Console.WriteLine(Math.Round(value, 1, MidpointRounding.AwayFromZero));

            #region Test_KIS Тест Кис
            Test_KIS tkis = new Test_KIS();
            //tkis.EFKIS_Vagon_Sob();
            //tkis.EFKIS_GetCurrentVAGON_SOB();
            //tkis.KISDirectory_GetCurrent_KOMETA_VAGON_SOB();
            //tkis.EFKIS_PROM_SOSTAV_GetProm_SostavAndCount();
            //tkis.KISTransfer_TransferOutgoingIDSOfKis();
            #endregion

            #region Test_IDS Тест ИДС
            Test_IDS tids = new Test_IDS();
            //tids.IDSTransfer_AddArrival();

            //tids.IDS_GetDirectory_ExternalStation();                        // Тест считования и создания внешней станции

            //tids.IDSDirectory_GetID_Directory_StationOfCodeCS();
            //tids.IDSDirectory_GetCurrentDirectory_CarsOfNum();
            //tids.IDSDirectory_OperationAutoPositionWayOfPark();       // авто-коррекция положения пути в парке
            //tids.IDSDirectory_OperationSetPositionWayOfPark();        // установить новое положения пути в парке
            //tids.IDSDirectory_OperationDown1PositionWayOfPark();      // установить положения пути ниже на 1 позицию
            //tids.IDSDirectory_OperationUp1PositionWayOfPark();        // установить положения пути выше на 1 позицию
            //tids.IDS_GetDirectory_UpdateOwnersWagonsOfDB_UZ();        // Тест обновления владельцев в карточке вагона по данным БД УЗ
            //tids.IDS_GetDirectory_ChangeNumWagon();                     // Тест перенумерации вагона

            //tids.IDS_GetDirectory_CorrectDateTime_Of_Directory_WagonsRenf();      // Админ. коррекция даты аренды по номеру вагона()
            //tids.IDS_GetDirectory_CorrectDateTime_Of_Directory_WagonsRenf_all();  // Админ. коррекция даты аренды  по всему спраочнику()
            //tids.IDS_Directory_UpdateArrivalRentWagon();                            // Тест обновления входящей аренды после изменения операторов
            tids.IDS_Directory_UpdateArrivalRentWagons();                           // Тест обновления входящей аренды после изменения операторов на несколько вагонов

            //tids.IDSTransfer_GetNumDoc();
            //tids.IDSDirectory_IsCorrectNumCar();
            //tids.GetActs();
            //tids.GetDocs();
            //tids.IDSMORS_GetLastIDWTWagonsMotionSignals();
            //tids.SetNum_UZ();

            //tids.IDSTransfer_InsertOutgoingSostavOfKis();         // Перенос составов на ИДС в отправленные по данным КИС
            //tids.IDSTransfer_IncomingArrivalSostav();             // Открытие WIR по прибытию состава
            //tids.IDSTransfer_IncomingArrivalSostav_All();         // Перенос всех принятых составов на АМКР с открытием WIR
            //tids.IDSTransfer_SetStationOutgoingWagonsOfKIS()      // Найти и поставить все вагоны по отправляемому составу на станцию и путь отправки АМКР (По данным КИС, операция перед закрытием WIR отправка состава на УЗ)
            //tids.IDSTransfer_SendingOutgoingSostav();             // Закрытие WIR отправка состава на УЗ

            //tids.IDS_SAP_GetCurrentIncomingSupplyOfWebSAP();      // Чтение и обновление строки САП входящие поставки
            //tids.IDS_SAP_UpdateIncomingSupply();                  // Обновление данных по входящей поставке
            //tids.IDSThread_Start_UpdateIncomingSupply();          // Тест потока "Обновление данных по входящей поставке"

            //tids.IDS_SAP_UpdateSAPOutgoingSupply();                   // Тест "Обновление данных по исходящей поставке поставке"

            //tids.IDS_WIR_RenumberingWagons();                         // Перенумерация с указанной позиции
            //tids.IDS_WIR_DislocationWagons();                         // Операция дислокация
            //tids.IDS_WIR_DislocationWagonsOfStation();                // Операция дислокация
            //tids.IDS_WIR_DissolutionWagonsOfStation();                // Операция роспуск
            //tids.IDS_WIR_SendingWagonsOfStation();                    // Операция роспуск
            //tids.IDS_WIR_ArrivalWagonsOfStation();                    // Операция роспуск
            //tids.IDS_WIR_OperationReturnProvideWagons();              // Тест операции вернуть пръедявленый состав

            ////tids.IDS_WIR_OperationUpdateEPDSendingSostav();           // Тест операции обновления ЭПД состава который отправили

            //tids.IDS_WIR_GetWagonsOperationOfSend();                  // Тест формирования отчета операции отправки (вагоны)
            //tids.IDS_WIR_GetSostavWagonsOperationOfSend();            // Тест формирования отчета операции отправки (состав-вагоны)

            //tids.IDS_WIR_UpdateArrivalEPD();                          // Тест функции сервиса обновления входящих документов
            //tids.IDS_WIR_UpdateSendingEPD();                          // Тест функции сервиса обновления исходящих документов

            //tids.IDS_WIR_OperationIncomingWagon();                    // Тест переноса вагона в левую сторону
            //tids.IDS_WIR_OperationUpdateUZ_DOC1();                    // Тест поиска документа по номеру накладной и номеру вагона
            //tids.IDS_WIR_OperationUpdateUZ_DOC2();                    // Тест поиска документа по номеру вагона грузополучателям , станциям и времени
            //tids.IDS_WIR_OperationUpdateUZ_DOC3();                    // Тест поиска документа по номеру вагона грузополучателям , станциям и времени
            //tids.IDS_WIR_OperationManualSearchIncomingWagon();        // Тест поиска вагонов введенных в ручную

            //tids.IDS_WIR_GetReportBorderCrossingOfNums();             // Тест поиска вагонов прошедших погран переход

            //tids.IDS_WIR_UpdateArrival_UZ_Vagon_Of_CardWagon();       //  Тест обновление принятого вагона по данным обновленного справочника
            //tids.IDS_WIR_UpdateArrival_UZ_Documents();                //  Тест обновление документов по принятым вагонам (род, адм...) после обновления справочника
            ///tids.IDS_WIR_Update_Arrival_UZ_Doc_Of_ID_DOC();           // Обновим базу данных по входящим вагонам из ЭПД найденного по id_doc (внутренему)
            ////tids.IDS_WIR_Update_Arrival_UZ_Doc();                       // Обновим базу данных по входящим вагонам из ЭПД найденного по id_doc (внутренему)

            //tids.IDS_WIR_UpdateOutgoing_UZ_Document();                //  Тест обновление документов по отправленным вагонам (род, адм...) после обновления справочника

            //tids.IDS_WIR_UpdateOutgoing_Async();
            //tids.IDS_WIR_UpdateOutgoing_Parallel();            
            //tids.IDS_WIR_UpdateOutgoing_Thread();

            //tids.IDS_Arhiv_Update_UZ_DOC_PDF();                           // Тестируем обновление документов в архиве

            //tids.IDS_WIR_UpdateOperationOutgoingSostav();                 // 
            //tids.IDS_WIR_UpdateOperationOutgoingSostav_date();            // 

            //tids.IDS_WIR_ServiceChangeUsageFeePeriod();                   //  Тест обновление периодов
            //tids.IDS_WIR_GetExchangeRate();
            //tids.IDS_WIR_CalcUsageFeeOfIncomingSostav();                    //  Тест Расчет платы за пользование по принятому составу
            //tids.IDS_WIR_CalcUsageFeeOfOutgoingSostav();                    //  Тест Расчет платы за пользование по сданному составу
            //tids.IDS_WIR_CalcUsageFeeOfOutgoingSostavOfPeriod();          //  Расчет платы за пользование по сданным составам за выбранный период
            #endregion

            #region Test_Logs тест логирования
            Test_Logs tlogs = new Test_Logs();

            //tlogs.FLOG_FileLogs();
            //tlogs.ELOG_EventLogs();
            //tlogs.DBLOG_DataBaseLogs();

            #endregion

            #region Test_Metrans тест Метранса
            Test_Metrans tmt = new Test_Metrans();
            //tmt.MTTransfer_TransferApproaches();
            //tmt.MTTransfer_TransferArrival();
            //tmt.MTTransfer_TransferArrivalAPI(); // Тест переноса метранса через API
            //tmt.MTThread_SFTPTransfer();
            //tmt.MTTransfer_WebApiClientMT();
            //tmt.MTThread_Start_TransferWT();
            //tmt.MTTransfer_InsertIDSArrivalSostav();
            //tmt.MTTransfer_TransferWagonsMotionSignals();
            //tmt.MTTransfer_TransferWagonsMotionSignalsOfNum();
            //tmt.MTTransfer_RewriteIDSArrivalSostav();


            #endregion

            #region Test_UZ тест логирования
            Test_UZ tuz = new Test_UZ();
            //tuz.UZ_WebApiClientUZWagon();
            //tuz.UZ_WebAPIClientUZ_GOV_Wagon(); // Тест нового запроса вагон из базы УЗ
            //tuz.UZ_WebAPIClientUZ_GOV_Station(); // Тест нового запроса станции из базы УЗ
            //tuz.UZ_XML();
            //tuz.UZ_SMS_GetOTPR();
            //tuz.UZ_SMS_GetUZ_DOC_Of_NumDoc();  // Поиск в УЗ по номеру документа
            //tuz.UZ_SMS_GetUZ_DOC_Of_NumWagons();  // Поиск в УЗ по номеру вагона
            //tuz.UZ_SMS_GetOTPROfXML();
            //tuz.UZ_SMS_GetDocumentOfDB_Num();
            //tuz.UZ_SMS_GetArrivalDocumentOfDB_Num();
            //tuz.UZ_SMS_GetOutgoingDocumentOfDB_NumShipper(); //Получить ЭПД из промежуточной базы на вагон который отправили
            //tuz.UZ_SMS_GetDocumentOfDB_NumConsignees();
            //tuz.UZ_SMS_GetLastDTOfUZ_Data(); // тест получить время последней записи промежуточной базы

            //tuz.UZ_SMS_GetDocument_of_id_doc();
            //tuz.UZ_SMS_GetDocument_of_db_id_doc();
            #endregion

            #region Администрирование
            //tids.IDS_WIR_CloseWir();          // Административной функции закрыть внутренее перемещение
            //tids.IDS_WIR_DeleteDoubleWir();   // Административной функции закрыть задвоение операций и дислокаций внутренего перемещения
            //tids.IDS_WIR_ReturnWagons();      // Административной функции вернуть вагон из отправки
            //tids.IDS_WIR_Update_EPD();        // Административной Обновить ЭПД по составам (список id составов [KRR-PA-CNT-Railway].[IDS].[OutgoingSostav])
            //tids.IDS_WIR_IncomingWagon();    // Административной функции поставить вагон на путь ИДС (если была ошибка вставки)
            //tids.IDS_Directory_ClearDirectory_Cargo();    // Административной функции очистить от дублей справочник грузов
            #endregion

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
