namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_TypesRepairsWagons")]
    public partial class Directory_TypesRepairsWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_TypesRepairsWagons()
        {
            CardsWagonsRepairs = new HashSet<CardsWagonsRepairs>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(10)]
        public string abbr_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string type_repairs_ru { get; set; }

        [Required]
        [StringLength(10)]
        public string abbr_en { get; set; }

        [Required]
        [StringLength(50)]
        public string type_repairs_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }
    }
}
