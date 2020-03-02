namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_OperatorsWagons")]
    public partial class Directory_OperatorsWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_OperatorsWagons()
        {
            CardsWagons = new HashSet<CardsWagons>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string operators_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_en { get; set; }

        [Required]
        [StringLength(100)]
        public string operators_en { get; set; }

        public bool paid { get; set; }

        public bool rop { get; set; }

        public bool local_use { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagons> CardsWagons { get; set; }
    }
}
