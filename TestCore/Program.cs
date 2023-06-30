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

namespace HelloApp
{
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


        public static void Main(string[] args)
        {
            try
            {
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
            catch (Exception e)
            {

            }
            Console.Read();
        }
    }
}
