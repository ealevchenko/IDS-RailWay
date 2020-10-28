namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_Locomotive")]
    public partial class Directory_Locomotive
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_Locomotive()
        {
            WagonInternalOperation = new HashSet<WagonInternalOperation>();
            WagonInternalOperation1 = new HashSet<WagonInternalOperation>();
        }

        [Key]
        [StringLength(20)]
        public string locomotive { get; set; }

        public int id_locomotive_status { get; set; }

        [StringLength(20)]
        public string factory_number { get; set; }

        [StringLength(20)]
        public string inventory_number { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_LocomotiveStatus Directory_LocomotiveStatus { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalOperation> WagonInternalOperation { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalOperation> WagonInternalOperation1 { get; set; }
    }
}
