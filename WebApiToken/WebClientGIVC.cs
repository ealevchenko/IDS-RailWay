using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helper
{
    public class WebClientGIVC
    {
        private readonly ILogger<Object> _logger;
        private readonly IConfiguration _configuration;
        private string url;
        private string url_token;
        private string userName;
        private string password;

        private WebApiToken web_api = null;
        public WebClientGIVC(ILogger<Object> logger, IConfiguration configuration)
        {
            try
            {
                _logger = logger;
                _configuration = configuration;
                userName = _configuration["GIVC:userName"];
                password = _configuration["GIVC:password"];
                url = _configuration["GIVC:url"];
                url_token = _configuration["GIVC:url_token"];
                web_api = new WebApiToken(logger, userName, password, url, url_token);
            }
            catch (Exception e)
            {
                _logger.LogError(String.Format("WebClientGIVC(), Exception={0}", e));

            }
        }
        public string GetReq1892()
        {
            if (String.IsNullOrWhiteSpace(url)) return null;
            string resp = web_api.GetApiValues("GetData/req1892" + String.Format("?kod_stan_beg={0}&kod_stan_end={1}", 467004, 467201));
            return resp;
        }
    }
}
