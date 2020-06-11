namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_TypeDivision")]
    public partial class Directory_TypeDivision
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_TypeDivision()
        {
            Directory_Divisions = new HashSet<Directory_Divisions>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(250)]
        public string type_devisions_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string type_devisions_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Divisions> Directory_Divisions { get; set; }
    }
}
