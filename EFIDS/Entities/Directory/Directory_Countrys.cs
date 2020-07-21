namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Countrys")]
    public partial class Directory_Countrys
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Countrys()
        {
            Directory_Wagons = new HashSet<Directory_Wagons>();
            Directory_Railway = new HashSet<Directory_Railway>();

        }

        public int id { get; set; }

        public int? code_sng { get; set; }

        public int? code_europe { get; set; }

        public int? code_iso { get; set; }

        [Required]
        [StringLength(100)]
        public string countrys_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string countrys_name_en { get; set; }

        [Required]
        [StringLength(10)]
        public string country_abbr_ru { get; set; }

        [Required]
        [StringLength(10)]
        public string country_abbr_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Wagons> Directory_Wagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Railway> Directory_Railway { get; set; }
    }
}
