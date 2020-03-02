namespace EFUZ.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFUZ.Entities;

    public partial class EFSMSDbContext : DbContext
    {
        public EFSMSDbContext()
            : base("name=SMS")
        {
        }

        public virtual DbSet<UZ_Data> UZ_Data { get; set; }
        public virtual DbSet<UZ_VagonData> UZ_VagonData { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UZ_VagonData>()
                .Property(e => e.nomer)
                .IsFixedLength();
        }
    }
}
