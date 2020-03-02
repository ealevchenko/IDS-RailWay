namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ParksWagons")]
    public partial class ParksWagons
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ParksWagons()
        {
            ParksListWagons = new HashSet<ParksListWagons>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(250)]
        public string name_park_ru { get; set; }

        [Required]
        [StringLength(250)]
        public string name_park_en { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParksListWagons> ParksListWagons { get; set; }
    }
}
