namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_PoligonTravelWagons")]
    public partial class Directory_PoligonTravelWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_PoligonTravelWagons()
        {
            CardsWagons = new HashSet<CardsWagons>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string poligon_travel_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string abbr_en { get; set; }

        [Required]
        [StringLength(100)]
        public string poligon_travel_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CardsWagons> CardsWagons { get; set; }
    }
}
