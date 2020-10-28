namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Station")]
    public partial class Directory_Station
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Station()
        {
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            ArrivalSostav = new HashSet<ArrivalSostav>();
            ArrivalSostav1 = new HashSet<ArrivalSostav>();
            Directory_Ways = new HashSet<Directory_Ways>();
            OutgoingSostav = new HashSet<OutgoingSostav>();
            OutgoingSostav1 = new HashSet<OutgoingSostav>();
            WagonInternalMovement = new HashSet<WagonInternalMovement>();
            Directory_OuterWays = new HashSet<Directory_OuterWays>();
            Directory_OuterWays1 = new HashSet<Directory_OuterWays>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string station_name_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string station_name_en { get; set; }

        [Required]
        [StringLength(50)]
        public string station_abbr_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string station_abbr_en { get; set; }

        public bool exit_uz { get; set; }

        public bool station_uz { get; set; }

        public bool? default_side { get; set; }

        public int? code { get; set; }

        public int? idle_time { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalSostav> ArrivalSostav { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalSostav> ArrivalSostav1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Ways> Directory_Ways { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingSostav> OutgoingSostav { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingSostav> OutgoingSostav1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMovement> WagonInternalMovement { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_OuterWays> Directory_OuterWays { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_OuterWays> Directory_OuterWays1 { get; set; }
    }
}
