namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WagonInternalMovement")]
    public partial class WagonInternalMovement
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WagonInternalMovement()
        {
            WagonInternalMoveCargo = new HashSet<WagonInternalMoveCargo>();
            WagonInternalMoveCargo1 = new HashSet<WagonInternalMoveCargo>();
            WagonInternalMovement1 = new HashSet<WagonInternalMovement>();
        }

        public long id { get; set; }

        public long id_wagon_internal_routes { get; set; }

        public int id_station { get; set; }

        public int id_way { get; set; }

        public DateTime way_start { get; set; }

        public DateTime? way_end { get; set; }

        public int? id_outer_way { get; set; }

        public DateTime? outer_way_start { get; set; }

        public DateTime? outer_way_end { get; set; }

        public int position { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? close { get; set; }

        [StringLength(50)]
        public string close_user { get; set; }

        public long? parent_id { get; set; }

        public long? id_wio { get; set; }

        [StringLength(50)]
        public string num_sostav { get; set; }

        public DateTime? filing_start { get; set; }

        public DateTime? filing_end { get; set; }

        public long? id_filing { get; set; }

        public virtual Directory_Station Directory_Station { get; set; }

        public virtual Directory_Ways Directory_Ways { get; set; }

        public virtual Directory_OuterWays Directory_OuterWays { get; set; }
        public virtual WagonFiling WagonFiling { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMoveCargo> WagonInternalMoveCargo { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMoveCargo> WagonInternalMoveCargo1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMovement> WagonInternalMovement1 { get; set; }

        public virtual WagonInternalMovement WagonInternalMovement2 { get; set; }

        public virtual WagonInternalRoutes WagonInternalRoutes { get; set; }

        public virtual WagonInternalOperation WagonInternalOperation { get; set; }
    }
}
