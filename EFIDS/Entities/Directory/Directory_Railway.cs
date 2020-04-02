namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Railway")]
    public partial class Directory_Railway
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Railway()
        {
            Directory_InlandRailway = new HashSet<Directory_InlandRailway>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [Required]
        [StringLength(150)]
        public string railway_name_ru { get; set; }

        [Required]
        [StringLength(150)]
        public string railway_name_en { get; set; }

        [Required]
        [StringLength(10)]
        public string railway_abbr_ru { get; set; }

        [Required]
        [StringLength(10)]
        public string railway_abbr_en { get; set; }

        public int id_countrys { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_Countrys Directory_Countrys { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_InlandRailway> Directory_InlandRailway { get; set; }
    }
}
