using IDSLogs.Enum;
using IDSLogs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

namespace WebApiClient
{
    public class WebApiToken
    {
        private eventID eventID = eventID.WebApiToken;

        private string APP_PATH;
        private string userName;
        private string password;
        private static string token;
        public bool error;

        public WebApiToken(string url, string userName, string password)
        {
            try
            {
                this.error = false;
                this.APP_PATH = url;
                this.userName = userName;
                this.password = password;
                Dictionary<string, string> tokenDictionary = GetTokenDictionary(userName, password);
                bool keyExistance = tokenDictionary.ContainsKey("access_token");
                if (keyExistance) token = tokenDictionary["access_token"];
            }
            catch (Exception e)
            {
                this.error = true;
                e.ExceptionMethodLog(String.Format("WebApiToken(url={0}, userName={1}, password={2})", url, userName, password), eventID);
            }
        }

        // получение токена
        public Dictionary<string, string> GetTokenDictionary(string userName, string password)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(APP_PATH)) return null;
                var pairs = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>( "grant_type", "password" ),
                    new KeyValuePair<string, string>( "username", userName ),
                    new KeyValuePair<string, string> ( "Password", password )
                };
                var content = new FormUrlEncodedContent(pairs);

                //HttpClientHandler handler = new HttpClientHandler()
                //{
                //    Proxy = new WebProxy("http://krr-sec-proxy00.europe.mittalco.com:8080", false),
                //    PreAuthenticate = false,
                //    UseDefaultCredentials = false,
                //    //Credentials = new System.Net.NetworkCredential(@"europe\ealevchenko1", "Yfcnz_04201601"),
                //    UseProxy = true,
                //};
                //handler.Proxy.Credentials = new NetworkCredential(@"europe\ealevchenko1", "Yfcnz_04201601");
                //handler.UseDefaultCredentials = false;
                //handler.PreAuthenticate = true;
                //handler.UseProxy = true;

                //using (var client = new HttpClient(handler))
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromMinutes(10);
                    //var encoding = new ASCIIEncoding();
                    //var authHeader = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(encoding.GetBytes(string.Format("{0}:{1}", @"europe\ealevchenko1", "Yfcnz_04201601"))));
                    //client.DefaultRequestHeaders.Authorization = authHeader;

                    var response =
                        client.PostAsync(APP_PATH + "/Token", content).Result;
                    String.Format("Web API METRANS Connect [AbsoluteUri :{0}, user : {1} status:{2}", response.RequestMessage.RequestUri.AbsoluteUri, userName, response.StatusCode).WarningLog(eventID);
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        string err = "Ошибка выполнения client.PostAsync :" + response.ToString();
                        err.ErrorLog(eventID);
                    }
                    var result = response.Content.ReadAsStringAsync().Result;
                    // Десериализация полученного JSON-объекта
                    Dictionary<string, string> tokenDictionary =
                        JsonConvert.DeserializeObject<Dictionary<string, string>>(result);
                    return tokenDictionary;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetTokenDictionary(userName={0}, password={1})", userName, password), eventID);
                return null;
            }
        }

        // создаем http-клиента с токеном 
        public HttpClient CreateClient(string accessToken = "")
        {
            try
            {
                var client = new HttpClient();
                client.Timeout = TimeSpan.FromMinutes(10); // Добавил таймаут 10 мин
                if (!string.IsNullOrWhiteSpace(accessToken))
                {
                    client.DefaultRequestHeaders.Authorization =
                        new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                }
                return client;
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("CreateClient(accessToken={0})", accessToken), eventID);
                return null;
            }
        }

        // получаем информацию о клиенте 
        public string GetUserInfo(string token)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(APP_PATH)) return null;
                using (var client = CreateClient(token))
                {
                    if (client == null) return null;
                    var response = client.GetAsync(APP_PATH + "/api/Account/UserInfo").Result;
                    return response.Content.ReadAsStringAsync().Result;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetUserInfo(token={0})", token), eventID);
                return null;
            }
        }

        // обращаемся по маршруту api/values 
        public string GetValues(string token)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(APP_PATH)) return null;
                using (var client = CreateClient(token))
                {
                    if (client == null) return null;
                    var response = client.GetAsync(APP_PATH + "/api/WagonsTracking?note&st_form&nsost&st_nazn&from=2&st_disl&dt1&dt2&vagonlg_id").Result;
                    return response.Content.ReadAsStringAsync().Result;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetValues(token={0})", token), eventID);
                return null;
            }
        }

        public string GetApiValues(string api_comand)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(APP_PATH)) return null;
                using (var client = CreateClient(token))
                {
                    if (client == null) return null;
                    var response = client.GetAsync(APP_PATH + api_comand).Result;
                    String.Format("Web API METRANS GetAsync [requestUri :{0}, status:{1}", APP_PATH + api_comand, response.StatusCode).WarningLog(eventID);
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        string err = response.ToString();
                        err.ErrorLog(eventID);

                    }
                    return response.Content.ReadAsStringAsync().Result;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetApiValues(api_comand={0})", api_comand), eventID);
                return null;
            }
        }

        public string PostApiValues(string api_comand)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(APP_PATH)) return null;
                using (var client = CreateClient(token))
                {
                    if (client == null) return null;
                    var response = client.PostAsync(APP_PATH + api_comand, null).Result;
                    String.Format("Web API METRANS GetAsync [requestUri :{0}, status:{1}", APP_PATH + api_comand, response.StatusCode).WarningLog(eventID);
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        string err = response.ToString();
                        err.ErrorLog(eventID);
                    }
                    return response.Content.ReadAsStringAsync().Result;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetApiValues(api_comand={0})", api_comand), eventID);
                return null;
            }
        }

        public T JSONStringToClass<T>(string JSONString)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(JSONString)) return default(T);
                DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(typeof(T));
                byte[] byteArray = Encoding.UTF8.GetBytes(JSONString);
                //byte[] byteArray = Encoding.ASCII.GetBytes(contents);
                MemoryStream stream = new MemoryStream(byteArray);
                return (T)jsonSerializer.ReadObject(stream);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("JSONStringToClass<T:{0}>(JSONString={1})", typeof(T).Name, JSONString), eventID);
                return default(T);
            }
        }

        public T GetJSONSelect<T>(string api_comand)
        {
            try
            {
                string resp = GetApiValues(api_comand);
                return JSONStringToClass<T>(resp);
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("GetJSONSelect<T>(api_comand={0})", api_comand), eventID);
                return default(T);
            }
        }

    }

    public class WebApiURL
    {
        private eventID eventID = eventID.WebApiURL;
        private string url;

        public WebApiURL(string url)
        {
            this.url = url;
        }
        /// <summary>
        /// Отправить запрос и получить ответ
        /// </summary>
        /// <param name="url"></param>
        /// <param name="api_comand"></param>
        /// <param name="metod"></param>
        /// <param name="accept"></param>
        /// <returns></returns>
        public string Select(string url, string api_comand, string metod, string accept)
        {
            try
            {
                //String.Format("Выполняем запрос к WebAPI, url:{0}, api_comand {1}, metod {2}, accept {3}", url, api_comand, metod, accept).WriteInformation(eventID);
                HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url + api_comand);
                request.Method = metod;
                request.PreAuthenticate = true;
                request.Credentials = CredentialCache.DefaultCredentials;
                request.Accept = accept;
                try
                {
                    using (System.Net.WebResponse response = request.GetResponse())
                    {
                        try
                        {
                            using (System.IO.StreamReader rd = new System.IO.StreamReader(response.GetResponseStream()))
                            {
                                return rd.ReadToEnd();
                            }
                        }
                        catch (Exception e)
                        {
                            e.ExceptionLog(String.Format("Ошибка создания StreamReader ответа, команда {0}, метод {1}, accept {2}", api_comand, metod, accept), this.eventID);
                            return null;
                        }
                    }
                }
                catch (Exception e)
                {
                    e.ExceptionLog(String.Format("Ошибка получения ответа WebResponse, команда {0}, метод {1}, accept {2}", api_comand, metod, accept), this.eventID);
                    return null;
                }
            }
            catch (Exception e)
            {
                e.ExceptionMethodLog(String.Format("Select(url={0},api_comand={1},metod={2},accept={3})", url, api_comand, metod, accept), this.eventID);
                return null;
            }
        }
    }
}
