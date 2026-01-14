using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class WebApiToken
{
    private string url_token;
    private string userName;
    private string password;
    private static string token;

    public WebApiToken1(ILogger<Object> logger, IConfiguration configuration)
	{
        _logger = logger;
        _configuration = configuration;
        userName = _configuration["GIVC:userName"];
        password = _configuration["GIVC:password"];
        url_token = _configuration["GIVC:url_token"];
    }

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

            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                   | SecurityProtocolType.Tls11
                   | SecurityProtocolType.Tls12
                   | SecurityProtocolType.Ssl3;

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
}
