namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_CargoETSNG")]
    public partial class Directory_CargoETSNG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_CargoETSNG()
        {
            Directory_Cargo = new HashSet<Directory_Cargo>();
        }

        public int id { get; set; }

        public int code { get; set; }

        [Required]
        [StringLength(250)]
        public string cargo_etsng_name_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string cargo_etsng_name_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Cargo> Directory_Cargo { get; set; }
    }
}
