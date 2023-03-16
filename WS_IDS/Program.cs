using WS_IDS;

System.Environment.CurrentDirectory = System.AppDomain.CurrentDomain.BaseDirectory;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<UpdateRent>();
    }).ConfigureLogging(logging =>
    {
        logging.ClearProviders();
        logging.AddConsole();
        logging.AddDebug();
        logging.AddLog4Net();
    })
    .Build();

await host.RunAsync();
