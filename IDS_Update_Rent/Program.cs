using IDS_Update_Rent;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<UpdateRent>();
    })
    .Build();

await host.RunAsync();
