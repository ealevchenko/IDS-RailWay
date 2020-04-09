namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_LimitingLoading")]
    public partial class Directory_LimitingLoading
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_LimitingLoading()
        {
            Directory_Cars = new HashSet<Directory_Cars>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string limiting_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string limiting_name_en { get; set; }

        [Required]
        [StringLength(30)]
        public string limiting_abbr_ru { get; set; }

        [Required]
        [StringLength(30)]
        public string limiting_abbr_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Cars> Directory_Cars { get; set; }
    }
}
