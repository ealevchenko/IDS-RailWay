namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_SpecialConditions")]
    public partial class Directory_SpecialConditions
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_SpecialConditions()
        {
            CardsWagons = new HashSet<CardsWagons>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string special_conditions_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string special_conditions_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagons> CardsWagons { get; set; }
    }
}
