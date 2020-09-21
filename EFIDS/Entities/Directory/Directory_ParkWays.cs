namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_ParkWays")]
    public partial class Directory_ParkWays
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_ParkWays()
        {
            Directory_Ways = new HashSet<Directory_Ways>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string park_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string park_name_en { get; set; }

        [Required]
        [StringLength(50)]
        public string park_abbr_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string park_abbr_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Ways> Directory_Ways { get; set; }
    }
}
