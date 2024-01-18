// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EF_IDS.Concrete;
using EF_IDS.Entities;
using System.Diagnostics.Metrics;
using System.Net;
using System.Text;
using System.Text.Json;
using IDS_;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Extensions.Logging;
using Helper;

namespace HelloApp
{
    public class Runner
    {
        private readonly ILogger<Runner> _logger;

        public Runner(ILogger<Runner> logger)
        {
            _logger = logger;
        }

        public void DoAction(string name)
        {
            _logger.LogDebug(20, "Doing hard work! {Action}", name);
        }
    }

    public class Program
    {
        //public class ApplicationContext : DbContext
        //{
        //    public virtual DbSet<ArrivalCar> ArrivalCars { get; set; }

        //    public ApplicationContext()
        //    {
        //        //Database.EnsureCreated();
        //    }

        //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //    {
        //        //optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=helloappdb;Trusted_Connection=True;");
        //        optionsBuilder.UseSqlServer("Data Source=krr-sql-paclx03;Initial Catalog=KRR-PA-CNT-Railway;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False;");
        //    }
        //}




        //class Person
        //{
        //    public string Name { get; }
        //    public int Age { get; set; }
        //    public Person(string name, int age)
        //    {
        //        Name = name;
        //        Age = age;
        //    }
        //}

        //public class ExchangeRate
        //{
        //    public int? r030 { get; set; }
        //    public string txt { get; set; }
        //    public decimal? rate { get; set; }
        //    public string cc { get; set; }
        //    public string exchangedate { get; set; }
        //}

        //
        public static void Main(string[] args)
        {
            //NLog.ILogger logger = LogManager.GetCurrentClassLogger();

            ILogger<Program> logger = LoggerFactory.Create(builder => builder.AddNLog()).CreateLogger<Program>();
            try
            {
                //IConfiguration Configuration = new ConfigurationBuilder()
                //  .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                //  .AddEnvironmentVariables()
                //  .AddCommandLine(args)
                //  .Build();

                //var loggerFactory = LoggerFactory.Create(builder =>
                //{
                //    builder.AddConsole();
                //});
                //ILogger<Program> logger = loggerFactory.CreateLogger<Program>();

                //logger.LogInformation("Start {Description}.", "fun");

                var config = new ConfigurationBuilder()
                    .SetBasePath(System.IO.Directory.GetCurrentDirectory()) //From NuGet Package Microsoft.Extensions.Configuration.Json
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .Build();

                WebClientGIVC client_givc = new WebClientGIVC(logger, config);
                string res = client_givc.GetReq1892();

                //using var servicesProvider = new ServiceCollection()
                //    .AddTransient<Runner>() // Runner is the custom class
                //    .AddLogging(loggingBuilder =>
                //    {
                //        // configure Logging with NLog
                //        loggingBuilder.ClearProviders();
                //        loggingBuilder.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                //        loggingBuilder.AddNLog(config);
                //    }).BuildServiceProvider();

                //var runner = servicesProvider.GetRequiredService<Runner>();
                //runner.DoAction("Action1");

                ////IDS_WIR ids_wir = new IDS_WIR(logger, config);
                //////ids_wir.ClearDoubling_Directory_WagonsRent(null);
                ////ids_wir.UpdateOperationArrivalSostav(284389, null);

                //Console.WriteLine("Hello, World!");



                //Person tom = new Person("Tom", 37);
                //string json = JsonSerializer.Serialize(tom);
                //Console.WriteLine(json);
                //Person? restoredPerson = JsonSerializer.Deserialize<Person>(json);
                //Console.WriteLine(restoredPerson?.Name); // Tom

                //string reqUrl = $"https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
                //ServicePointManager.Expect100Continue = true;
                //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                //       | SecurityProtocolType.Tls11
                //       | SecurityProtocolType.Tls12;
                ////| SecurityProtocolType.Ssl3;
                //HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(reqUrl);
                //request.Method = "GET";
                //request.Accept = "application/json";
                //request.ContentType = "application/json; charset=utf-8";//"application/x-www-form-urlencoded";
                //try
                //{
                //    using (System.Net.WebResponse response = request.GetResponse())
                //    {
                //        try
                //        {
                //            using (System.IO.StreamReader rd = new System.IO.StreamReader(response.GetResponseStream()))
                //            {
                //                string json = rd.ReadToEnd();
                //                List<ExchangeRate>? restoredPerson = JsonSerializer.Deserialize<List<ExchangeRate>>(json);
                //                //Console.WriteLine(restoredPerson?.Name); // Tom
                //            }
                //        }
                //        catch (Exception e)
                //        {

                //        }
                //    }
                //}
                //catch (Exception e)
                //{


                //}

                //using (EFDbContext db = new EFDbContext())
                //{
                //    // создаем два объекта User
                //    //User user1 = new User { Name = "Tom", Age = 33 };
                //    //User user2 = new User { Name = "Alice", Age = 26 };

                //    //// добавляем их в бд
                //    //db.Users.Add(user1);
                //    //db.Users.Add(user2);
                //    //db.SaveChanges();
                //    //Console.WriteLine("Объекты успешно сохранены");

                //    // получаем объекты из бд и выводим на консоль
                //    //var Cars = db.ArrivalCars.ToList();
                //    //Console.WriteLine("Список объектов:");
                //    //foreach (var u in Cars)
                //    //{
                //    //    Console.WriteLine($"{u.Id}.{u.IdArrival} - {u.Num}");
                //    //}
                //}

            }
            catch (Exception ex)
            {
                // NLog: catch any exception and log it.
                //logger.Error(ex, "Stopped program because of exception");
                logger.LogError(ex, "Stopped program because of exception");
                throw;
            }
            finally
            {
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                LogManager.Shutdown();
            }
            Console.WriteLine("Press ANY key to exit");
            Console.ReadKey();
        }
    }
}
