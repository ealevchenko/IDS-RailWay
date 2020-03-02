namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_ModelsWagons")]
    public partial class Directory_ModelsWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_ModelsWagons()
        {
            CardsWagons = new HashSet<CardsWagons>();
        }

        [Key]
        [StringLength(20)]
        public string code { get; set; }

        [Required]
        [StringLength(250)]
        public string model_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string model_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagons> CardsWagons { get; set; }
    }
}
