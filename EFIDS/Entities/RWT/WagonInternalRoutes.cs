namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.WagonInternalRoutes")]
    public partial class WagonInternalRoutes
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WagonInternalRoutes()
        {
            WagonInternalMovement = new HashSet<WagonInternalMovement>();
            WagonInternalOperation = new HashSet<WagonInternalOperation>();
            WagonInternalRoutes1 = new HashSet<WagonInternalRoutes>();
        }

        public long id { get; set; }

        public int num { get; set; }

        public long? id_arrival_car { get; set; }

        public long? id_sap_incoming_supply { get; set; }

        public bool? doc_outgoing_car { get; set; }

        public long? id_outgoing_car { get; set; }

        public long? id_sap_outbound_supply { get; set; }

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

        public virtual ArrivalCars ArrivalCars { get; set; }

        public virtual Directory_Wagons Directory_Wagons { get; set; }

        public virtual OutgoingCars OutgoingCars { get; set; }

        public virtual SAPIncomingSupply SAPIncomingSupply { get; set; }

        public virtual SAPOutgoingSupply SAPOutgoingSupply { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalMovement> WagonInternalMovement { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalOperation> WagonInternalOperation { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalRoutes> WagonInternalRoutes1 { get; set; }

        public virtual WagonInternalRoutes WagonInternalRoutes2 { get; set; }
    }
}
