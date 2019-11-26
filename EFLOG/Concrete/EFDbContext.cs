namespace EFLOG.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFLOG.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=log")
        {
        }

        public virtual DbSet<Errors> Errors { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<Services> Services { get; set; }
        public virtual DbSet<StatusServices> StatusServices { get; set; }
        public virtual DbSet<WebErrors> WebErrors { get; set; }
        public virtual DbSet<WebVisit> WebVisit { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
