using BatcherService;
using BatcherService.Interfaces;
using BatcherService.Services;
using System.Reflection;
using WS_IDS;

System.Environment.CurrentDirectory = System.AppDomain.CurrentDomain.BaseDirectory;

try
{
    IHost host = Host.CreateDefaultBuilder(args)
        .UseWindowsService()
        .ConfigureServices(services =>
        {
            services.AddHostedService<UpdateRent>();
        }).ConfigureLogging(logging =>
        {
            logging.ClearProviders();
            logging.AddConsole();
            logging.AddDebug();
            //logging.AddLog4Net();
        })
        .Build();

    await host.RunAsync();
}
catch (Exception e)
{
    Console.Write(e.Message);
}




