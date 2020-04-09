namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_TypeOwnerShip")]
    public partial class Directory_TypeOwnerShip
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_TypeOwnerShip()
        {
            CardsWagons = new HashSet<CardsWagons>();
            Directory_Cars = new HashSet<Directory_Cars>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string type_ownership_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string type_ownership_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagons> CardsWagons { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Directory_Cars> Directory_Cars { get; set; }
    }
}
