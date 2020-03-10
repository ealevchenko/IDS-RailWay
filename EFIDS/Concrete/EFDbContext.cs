namespace EFIDS.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFIDS.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=IDS")
        {
        }

        // RWT
        public virtual DbSet<ArrivalCars> ArrivalCars { get; set; }
        public virtual DbSet<ArrivalSostav> ArrivalSostav { get; set; }
        public virtual DbSet<UZ_DOC> UZ_DOC { get; set; }


        // MORS
        public virtual DbSet<CardsWagons> CardsWagons { get; set; }
        public virtual DbSet<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }
        public virtual DbSet<ParksListWagons> ParksListWagons { get; set; }
        public virtual DbSet<ParksWagons> ParksWagons { get; set; }
        public virtual DbSet<WagonsMotionSignals> WagonsMotionSignals { get; set; }

        // Справочники
        public virtual DbSet<Directory_Consignee> Directory_Consignee { get; set; }
        public virtual DbSet<Directory_DEPO> Directory_DEPO { get; set; }
        public virtual DbSet<Directory_GenusWagons> Directory_GenusWagons { get; set; }
        public virtual DbSet<Directory_LessorsWagons> Directory_LessorsWagons { get; set; }
        public virtual DbSet<Directory_ModelsWagons> Directory_ModelsWagons { get; set; }
        public virtual DbSet<Directory_OperatorsWagons> Directory_OperatorsWagons { get; set; }
        public virtual DbSet<Directory_OwnersWagons> Directory_OwnersWagons { get; set; }
        public virtual DbSet<Directory_PoligonTravelWagons> Directory_PoligonTravelWagons { get; set; }
        public virtual DbSet<Directory_SpecialConditions> Directory_SpecialConditions { get; set; }
        public virtual DbSet<Directory_TypeOwnerShip> Directory_TypeOwnerShip { get; set; }
        public virtual DbSet<Directory_TypesRepairsWagons> Directory_TypesRepairsWagons { get; set; }
        public virtual DbSet<Directory_TypeWagons> Directory_TypeWagons { get; set; }
        public virtual DbSet<Directory_WagonManufacturers> Directory_WagonManufacturers { get; set; }
        public virtual DbSet<Directory_WagonsCondition> Directory_WagonsCondition { get; set; }
        public virtual DbSet<Directory_Station> Directory_Station { get; set; }
        // Доступ к сайту
        public virtual DbSet<WebAccess> WebAccess { get; set; }
        public virtual DbSet<WebView> WebView { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            // MORS
            modelBuilder.Entity<WagonsMotionSignals>()
                .Property(e => e.ves)
                .HasPrecision(18, 3);
            // RWT
            modelBuilder.Entity<ArrivalSostav>()
                .HasMany(e => e.ArrivalCars)
                .WithOptional(e => e.ArrivalSostav)
                .HasForeignKey(e => e.id_arrival);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.ArrivalSostav)
                .WithRequired(e => e.Directory_Station)
                .HasForeignKey(e => e.id_station_from)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Station>()
                .HasMany(e => e.ArrivalSostav1)
                .WithOptional(e => e.Directory_Station1)
                .HasForeignKey(e => e.id_station_on);
            //
            modelBuilder.Entity<CardsWagons>()
                .HasMany(e => e.ParksListWagons)
                .WithRequired(e => e.CardsWagons)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ParksWagons>()
                .HasMany(e => e.ParksListWagons)
                .WithRequired(e => e.ParksWagons)
                .HasForeignKey(e => e.id_park_wagon)
                .WillCascadeOnDelete(false);
            
            modelBuilder.Entity<CardsWagons>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithRequired(e => e.CardsWagons)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_DEPO>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithOptional(e => e.Directory_DEPO)
                .HasForeignKey(e => e.code_depo);

            modelBuilder.Entity<Directory_GenusWagons>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_GenusWagons)
                .HasForeignKey(e => e.id_genus_wagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_LessorsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_LessorsWagons)
                .HasForeignKey(e => e.id_lessor_wagon);

            modelBuilder.Entity<Directory_OperatorsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_OperatorsWagons)
                .HasForeignKey(e => e.id_operator_wagon);

            modelBuilder.Entity<Directory_OwnersWagons>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_OwnersWagons)
                .HasForeignKey(e => e.id_owner_wagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_PoligonTravelWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_PoligonTravelWagons)
                .HasForeignKey(e => e.id_poligon_travel_wagon);

            modelBuilder.Entity<Directory_SpecialConditions>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_SpecialConditions)
                .HasForeignKey(e => e.id_special_conditions);

            modelBuilder.Entity<Directory_TypeOwnerShip>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_TypeOwnerShip)
                .HasForeignKey(e => e.id_type_ownership)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_TypesRepairsWagons>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithRequired(e => e.Directory_TypesRepairsWagons)
                .HasForeignKey(e => e.id_type_repair_wagon)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_TypesRepairsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithRequired(e => e.Directory_TypesRepairsWagons)
                .HasForeignKey(e => e.id_type_repairs)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_TypeWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_TypeWagons)
                .HasForeignKey(e => e.id_type_wagon);

            modelBuilder.Entity<Directory_WagonManufacturers>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_WagonManufacturers)
                .HasForeignKey(e => e.id_wagon_manufacturer);

            modelBuilder.Entity<Directory_WagonsCondition>()
                .HasMany(e => e.CardsWagonsRepairs)
                .WithOptional(e => e.Directory_WagonsCondition)
                .HasForeignKey(e => e.id_wagons_condition);

            modelBuilder.Entity<Directory_ModelsWagons>()
                .HasMany(e => e.CardsWagons)
                .WithOptional(e => e.Directory_ModelsWagons)
                .HasForeignKey(e => e.code_model_wagon);
        }
    }
}
