namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_DEPO")]
    public partial class Directory_DEPO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_DEPO()
        {
            CardsWagonsRepairs = new HashSet<CardsWagonsRepairs>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        public int code_station { get; set; }

        [Required]
        [StringLength(50)]
        public string depo_ru { get; set; }

        [Required]
        [StringLength(50)]
        public string depo_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagonsRepairs> CardsWagonsRepairs { get; set; }
    }
}
