namespace EFMT.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFMT.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=metrans")
        {
        }

        public virtual DbSet<ApproachesCars> ApproachesCars { get; set; }
        public virtual DbSet<ApproachesSostav> ApproachesSostav { get; set; }
        public virtual DbSet<ArrivalCars> ArrivalCars { get; set; }
        public virtual DbSet<ArrivalSostav> ArrivalSostav { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApproachesCars>()
                .HasMany(e => e.ApproachesCars1)
                .WithOptional(e => e.ApproachesCars2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<ApproachesSostav>()
                .HasMany(e => e.ApproachesCars)
                .WithRequired(e => e.ApproachesSostav)
                .HasForeignKey(e => e.id_sostav)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApproachesSostav>()
                .HasMany(e => e.ApproachesSostav1)
                .WithOptional(e => e.ApproachesSostav2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<ArrivalCars>()
                .HasMany(e => e.ArrivalCars1)
                .WithOptional(e => e.ArrivalCars2)
                .HasForeignKey(e => e.parent_id);

            modelBuilder.Entity<ArrivalSostav>()
                .HasMany(e => e.ArrivalCars)
                .WithRequired(e => e.ArrivalSostav)
                .HasForeignKey(e => e.id_sostav)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ArrivalSostav>()
                .HasMany(e => e.ArrivalSostav1)
                .WithOptional(e => e.ArrivalSostav2)
                .HasForeignKey(e => e.Parent_id);
        }
    }
}
