namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Reason_Discrepancy")]
    public partial class Directory_Reason_Discrepancy
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Reason_Discrepancy()
        {
            OutgoingCars = new HashSet<OutgoingCars>();
            OutgoingCars1 = new HashSet<OutgoingCars>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string reason_discrepancy_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string reason_discrepancy_name_en { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public DateTime? delete { get; set; }

        [StringLength(50)]
        public string delete_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingCars> OutgoingCars { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingCars> OutgoingCars1 { get; set; }
    }
}
