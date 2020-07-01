using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Test.TestModule;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {

            //string ar = "WEB_UI.Areas.IDSMORS.Controllers.HomeController";

            //int n = ar.IndexOf("Areas.");

            //int n1 = ar.IndexOf(".Controllers");
            //ar = ar.Substring(ar.IndexOf("Areas.") + 6, ar.IndexOf(".Controllers") - (ar.IndexOf("Areas.") + 6));

            //try
            //{
            //    //String.Format("Выполняем запрос к WebAPI, url:{0}, api_comand {1}, metod {2}, accept {3}", url, api_comand, metod, accept).WriteInformation(eventID);
            //    HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(@"https://uz.gov.ua/car_info/index.php?func=print&site_nv=52724994");
            //    request.Method = "GET";
            //    request.PreAuthenticate = true;
            //    request.Credentials = CredentialCache.DefaultCredentials;
            //    request.Accept = "text/html";
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
            //                    htmlSnippet.LoadHtml(result);

            //                    List<string> hrefTags = new List<string>();

            //                    foreach (HtmlNode link in htmlSnippet.DocumentNode.SelectNodes("//td"))
            //                    {
            //                        //HtmlAttribute att = link.Attributes["href"];
            //                        //hrefTags.Add(att.Value);
            //                        string value = link.InnerHtml;
            //                        value = value.Replace("&nbsp;", "");
            //                        hrefTags.Add(value);
            //                    }
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







            #region Test_IDS Тест ИДС
            Test_IDS tids = new Test_IDS();
            //tids.IDSTransfer_AddArrival();
            //tids.IDSDirectory_GetID_Directory_StationOfCodeCS();
            //tids.IDSDirectory_GetCurrentDirectory_CarsOfNum();
            //tids.IDSTransfer_GetNumDoc();
            //tids.GetActs();
            //tids.GetDocs();
            //tids.IDSMORS_GetLastIDWTWagonsMotionSignals();
            tids.SetNum_UZ();
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
            //tmt.MTThread_SFTPTransfer();
            //tmt.MTTransfer_WebApiClientMT();
            //tmt.MTThread_Start_TransferWT();
            //tmt.MTTransfer_InsertIDSArrivalSostav();
            //tmt.MTTransfer_TransferWagonsMotionSignals();
            //tmt.MTTransfer_TransferWagonsMotionSignalsOfNum();

            #endregion

            #region Test_UZ тест логирования
            Test_UZ tuz = new Test_UZ();
            //tuz.UZ_WebApiClientUZWagon();
            //tuz.UZ_XML();
            //tuz.UZ_SMS_GetOTPR();
            //tuz.UZ_SMS_GetUZ_DOC_Of_NumDoc();
            //tuz.UZ_SMS_GetOTPROfXML();
            //tuz.UZ_SMS_GetDocumentOfDB_Num();
            //tuz.UZ_SMS_GetArrivalDocumentOfDB_Num();
            #endregion

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
