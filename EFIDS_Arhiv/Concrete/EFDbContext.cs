using EFIDS_Arhiv.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace EFIDS_Arhiv.Concrete
{
    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=IDS_ARHIV")
        {
        }

        public virtual DbSet<UZ_DOC_PDF> UZ_DOC_PDF { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UZ_DOC_PDF>()
                .Property(e => e.num_nakl)
                .IsFixedLength()
                .IsUnicode(false);
        }
    }
}
