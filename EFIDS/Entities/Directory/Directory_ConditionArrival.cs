namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_ConditionArrival")]
    public partial class Directory_ConditionArrival
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Directory_ConditionArrival()
        {
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            Outgoing_UZ_Vagon = new HashSet<Outgoing_UZ_Vagon>();
            WagonInternalOperation = new HashSet<WagonInternalOperation>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string condition_name_ru { get; set; }

        [Required]
        [StringLength(100)]
        public string condition_name_en { get; set; }

        [Required]
        [StringLength(20)]
        public string condition_abbr_ru { get; set; }

        [Required]
        [StringLength(20)]
        public string condition_abbr_en { get; set; }

        public bool? red { get; set; }

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

        public bool? repairs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outgoing_UZ_Vagon> Outgoing_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalOperation> WagonInternalOperation { get; set; }
    }
}
