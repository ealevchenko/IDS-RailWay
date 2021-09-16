namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WagonInternalOperation")]
    public partial class WagonInternalOperation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WagonInternalOperation()
        {
            WagonInternalMovement = new HashSet<WagonInternalMovement>();
            WagonInternalOperation1 = new HashSet<WagonInternalOperation>();
        }


        public long id { get; set; }

        public long id_wagon_internal_routes { get; set; }

        public int id_operation { get; set; }

        public DateTime operation_start { get; set; }

        public DateTime? operation_end { get; set; }

        public int id_condition { get; set; }

        public int id_loading_status { get; set; }

        [StringLength(20)]
        public string locomotive1 { get; set; }

        [StringLength(20)]
        public string locomotive2 { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? close { get; set; }

        [StringLength(50)]
        public string close_user { get; set; }

        public long? parent_id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMovement> WagonInternalMovement { get; set; }

        public virtual Directory_Locomotive Directory_Locomotive { get; set; }

        public virtual Directory_Locomotive Directory_Locomotive1 { get; set; }

        public virtual Directory_ConditionArrival Directory_ConditionArrival { get; set; }

        public virtual Directory_WagonLoadingStatus Directory_WagonLoadingStatus { get; set; }

        public virtual Directory_WagonOperations Directory_WagonOperations { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalOperation> WagonInternalOperation1 { get; set; }

        public virtual WagonInternalOperation WagonInternalOperation2 { get; set; }

        public virtual WagonInternalRoutes WagonInternalRoutes { get; set; }
    }
}
