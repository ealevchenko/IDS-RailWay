using IDS;
using IDSLogs.Enum;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS_Update_Rent
{
    public class UpdateRent : IHostedService, IDisposable
    {

        protected static object locker_test = new object();
        protected bool run = false;
        private int executionCount = 0;
        private readonly ILogger<UpdateRent> _logger;
        private readonly IConfiguration _configuration;
        private Timer? _timer = null;
        private IDS_WIR ids_epd = null;

        public UpdateRent(ILogger<UpdateRent> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            service service = service.IDS_UpdateRent;
            this.ids_epd = new IDS_WIR(service);

            string cs = configuration.GetConnectionString("IDS");

            //var Connect = configuration.GetSection("ConnectionStrings\IDS");
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(10));
            

            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            if (run) { 
            _logger.LogWarning(
                "Занят:", run);
                return;
            }
            lock (locker_test)
            {
                run = true;
            }
            var count = Interlocked.Increment(ref executionCount);

            _logger.LogInformation(
                "Таймер. Count: {Count}", count);
            //Task.Delay(2000).Wait();
            this.ids_epd.UpdateOperationOutgoingSostav(DateTime.Now.AddDays(-10), null);
            lock (locker_test)
            {
                run = false;
            }
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }

}
