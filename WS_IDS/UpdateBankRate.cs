using EF_IDS.Concrete;
using IDS_;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IDS_.ClientBank;

namespace WS_IDS
{
    public class UpdateBankRate : IHostedService, IDisposable
    {

        protected static object locker_test = new object();
        protected bool run = false;
        private readonly ILogger<UpdateBankRate> _logger;
        private readonly IConfiguration _configuration;
        private int interval = 1000 * 60 * 60;                                // Интервал выполнения таймера

        private Timer? _timer = null;
        private ClientBank cl_bank = null;

        public UpdateBankRate(ILogger<UpdateBankRate> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            interval = int.Parse(configuration["Interval:UpdateBankRate"]);
            cl_bank = new ClientBank(logger, configuration);
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Start UpdateBankRate, interval{0}", interval);
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(interval));
            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            if (run)
            {
                _logger.LogWarning("UpdateBankRate - is run, skip work!", run);
                return;
            }
            lock (locker_test)
            {
                run = true;
            }
            //var count = Interlocked.Increment(ref executionCount);
            //_logger.LogInformation("Таймер. Count: {Count}", count);
            List<BankRate> list = this.cl_bank.GetBankRates();
            lock (locker_test)
            {
                run = false;
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Stop UpdateBankRate");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
