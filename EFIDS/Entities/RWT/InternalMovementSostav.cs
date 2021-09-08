namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.InternalMovementSostav")]
    public partial class InternalMovementSostav
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InternalMovementSostav()
        {
            InternalMovementCars = new HashSet<InternalMovementCars>();
        }

        public int id { get; set; }

        [StringLength(50)]
        public string num { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InternalMovementCars> InternalMovementCars { get; set; }
    }
}
