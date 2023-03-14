// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EF_IDS.Concrete;
using EF_IDS.Entities;

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
        public static void Main(string[] args)
        {
            try
            {
                using (EFDbContext db = new EFDbContext())
                {
                    // создаем два объекта User
                    //User user1 = new User { Name = "Tom", Age = 33 };
                    //User user2 = new User { Name = "Alice", Age = 26 };

                    //// добавляем их в бд
                    //db.Users.Add(user1);
                    //db.Users.Add(user2);
                    //db.SaveChanges();
                    //Console.WriteLine("Объекты успешно сохранены");

                    // получаем объекты из бд и выводим на консоль
                    var Cars = db.ArrivalCars.ToList();
                    Console.WriteLine("Список объектов:");
                    foreach (var u in Cars)
                    {
                        Console.WriteLine($"{u.Id}.{u.IdArrival} - {u.Num}");
                    }
                }

            }
            catch (Exception e)
            {

            }
            Console.Read();
        }
    }
}
