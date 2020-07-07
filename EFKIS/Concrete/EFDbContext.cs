using EFKIS.Entities.KOMETA;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFKIS.Concrete
{
    public class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=KIS")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("KOMETA");
        }

        public DbSet<VAGON_SOB> VAGON_SOB { get; set; } // аренда вагонов
    }
}
