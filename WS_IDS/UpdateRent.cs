using EF_IDS.Concrete;
using IDS_;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WS_IDS
{
    public class UpdateRent : IHostedService, IDisposable
    {

        protected static object locker_test = new object();
        protected bool run = false;
        //private int executionCount = 0;
        private readonly ILogger<UpdateRent> _logger;
        private readonly IConfiguration _configuration;
        private int interval = 1000;                                // Интервал выполнения таймера
        private int control_period = 10;                            // Период контроля отправленных составов (дней)

        private Timer? _timer = null;
        private IDS_WIR ids_wir = null;

        public UpdateRent(ILogger<UpdateRent> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            interval = int.Parse(configuration["Interval:UpdateRent"]);
            control_period = int.Parse(configuration["Control:UpdateRent"]);

            this.ids_wir = new IDS_WIR(logger, configuration);

        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Start UpdateRent, interval{0}", interval);
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(interval));
            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            if (run)
            {
                _logger.LogWarning("UpdateRent - is run, skip work!", run);
                return;
            }
            lock (locker_test)
            {
                run = true;
            }
            //var count = Interlocked.Increment(ref executionCount);
            //_logger.LogInformation("Таймер. Count: {Count}", count);
            this.ids_wir.UpdateOperationOutgoingSostav(DateTime.Now.AddDays(-10), null);
            lock (locker_test)
            {
                run = false;
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Stop UpdateRent");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
