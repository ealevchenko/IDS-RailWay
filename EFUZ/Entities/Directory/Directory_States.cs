namespace EFUZ.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UZ.Directory_States")]
    public partial class Directory_States
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_States()
        {
            Directory_Countrys = new HashSet<Directory_Countrys>();
            Directory_InternalRailroad = new HashSet<Directory_InternalRailroad>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string state { get; set; }

        [Required]
        [StringLength(250)]
        public string name_network { get; set; }

        [Required]
        [StringLength(10)]
        public string abb_ru { get; set; }

        [Required]
        [StringLength(10)]
        public string abb_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Countrys> Directory_Countrys { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_InternalRailroad> Directory_InternalRailroad { get; set; }
    }
}
