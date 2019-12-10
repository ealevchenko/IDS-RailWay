namespace EFUZ.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFUZ.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=UZ")
        {
        }

        public virtual DbSet<Directory_Cargo> Directory_Cargo { get; set; }
        public virtual DbSet<Directory_Countrys> Directory_Countrys { get; set; }
        public virtual DbSet<Directory_InternalRailroad> Directory_InternalRailroad { get; set; }
        public virtual DbSet<Directory_States> Directory_States { get; set; }
        public virtual DbSet<Directory_Stations> Directory_Stations { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Directory_InternalRailroad>()
                .HasMany(e => e.Directory_Stations)
                .WithOptional(e => e.Directory_InternalRailroad)
                .HasForeignKey(e => e.id_ir);

            modelBuilder.Entity<Directory_States>()
                .HasMany(e => e.Directory_Countrys)
                .WithOptional(e => e.Directory_States)
                .HasForeignKey(e => e.id_state);

            modelBuilder.Entity<Directory_States>()
                .HasMany(e => e.Directory_InternalRailroad)
                .WithRequired(e => e.Directory_States)
                .HasForeignKey(e => e.id_state)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Directory_Cargo>().HasIndex(u => u.code_etsng);

        }
    }
}
