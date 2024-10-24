namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ArrivalCars")]
    public partial class ArrivalCars
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ArrivalCars()
        {
            SAPIncomingSupply = new HashSet<SAPIncomingSupply>();
            WagonInternalRoutes = new HashSet<WagonInternalRoutes>();
        }

        public long id { get; set; }

        public long? id_arrival { get; set; }

        public int num { get; set; }

        public int position { get; set; }

        public int? position_arrival { get; set; }

        public int consignee { get; set; }

        [StringLength(50)]
        public string num_doc { get; set; }

        public long? id_transfer { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime? date_adoption_act { get; set; }

        public long? id_arrival_uz_vagon { get; set; }

        public DateTime? arrival { get; set; }

        [StringLength(50)]
        public string arrival_user { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual ArrivalSostav ArrivalSostav { get; set; }

        public virtual UZ_DOC UZ_DOC { get; set; }
        
        public virtual Arrival_UZ_Vagon Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SAPIncomingSupply> SAPIncomingSupply { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalRoutes> WagonInternalRoutes { get; set; }
    }
}
