namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_WagonsCondition")]
    public partial class Directory_WagonsCondition
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_WagonsCondition()
        {
            CardsWagonsRepairs = new HashSet<CardsWagonsRepairs>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string condition_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_en { get; set; }

        [Required]
        [StringLength(100)]
        public string condition_en { get; set; }

        public bool red { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }
    }
}
