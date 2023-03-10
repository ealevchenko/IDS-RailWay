using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDS_Update_Rent
{
    public class UpdateRent1 : IHostedService, IDisposable
    {

        protected static object locker_test = new object();
        protected bool run = false;
        private int executionCount = 0;
        private readonly ILogger<UpdateRent1> _logger;
        private Timer? _timer = null;

        public UpdateRent1(ILogger<UpdateRent1> logger)
        {
            _logger = logger;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(1));
            

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
            Task.Delay(2000).Wait();
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
