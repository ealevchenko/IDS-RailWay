namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_InlandRailway")]
    public partial class Directory_InlandRailway
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_InlandRailway()
        {
            Directory_ExternalStation = new HashSet<Directory_ExternalStation>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [Required]
        [StringLength(150)]
        public string inlandrailway_name_ru { get; set; }

        [Required]
        [StringLength(150)]
        public string inlandrailway_name_en { get; set; }

        [Required]
        [StringLength(20)]
        public string inlandrailway_abbr_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string inlandrailway_abbr_en { get; set; }

        public int code_railway { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_ExternalStation> Directory_ExternalStation { get; set; }

        public virtual Directory_Railway Directory_Railway { get; set; }
    }
}
