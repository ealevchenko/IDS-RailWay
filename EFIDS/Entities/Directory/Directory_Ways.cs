namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Ways")]
    public partial class Directory_Ways
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Ways()
        {
            ArrivalSostav = new HashSet<ArrivalSostav>();
            OutgoingSostav = new HashSet<OutgoingSostav>();
            WagonInternalMovement = new HashSet<WagonInternalMovement>();
            Directory_OuterWays = new HashSet<Directory_OuterWays>();
            Directory_OuterWays1 = new HashSet<Directory_OuterWays>();
        }
        public int id { get; set; }

        public int id_station { get; set; }

        public int id_park { get; set; }

        public int position_park { get; set; }

        public int position_way { get; set; }

        [Required]
        [StringLength(20)]
        public string way_num_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string way_num_en { get; set; }

        [Required]
        [StringLength(100)]
        public string way_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string way_name_en { get; set; }

        [Required]
        [StringLength(50)]
        public string way_abbr_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string way_abbr_en { get; set; }

        public int? capacity { get; set; }

        public bool? deadlock { get; set; }

        public bool? crossing_uz { get; set; }

        public bool? crossing_amkr { get; set; }

        public int? id_devision { get; set; }

        [Required]
        [StringLength(100)]
        public string note { get; set; }

        public bool? dissolution { get; set; }

        public bool? output_dissolution { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalSostav> ArrivalSostav { get; set; }

        public virtual Directory_Divisions Directory_Divisions { get; set; }

        public virtual Directory_ParkWays Directory_ParkWays { get; set; }

        public virtual Directory_Station Directory_Station { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingSostav> OutgoingSostav { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMovement> WagonInternalMovement { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_OuterWays> Directory_OuterWays { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_OuterWays> Directory_OuterWays1 { get; set; }
    }
}
