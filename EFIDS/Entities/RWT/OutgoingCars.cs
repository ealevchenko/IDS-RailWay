namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.OutgoingCars")]
    public partial class OutgoingCars
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OutgoingCars()
        {
            WagonInternalRoutes = new HashSet<WagonInternalRoutes>();
        }
        
        public long id { get; set; }

        public long? id_outgoing { get; set; }

        public int num { get; set; }

        public int position { get; set; }

        public int? position_outgoing { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime? date_outgoing_act { get; set; }

        public DateTime? outgoing { get; set; }

        [StringLength(50)]
        public string outgoing_user { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public long? id_outgoing_uz_vagon { get; set; }

        public virtual Directory_Wagons Directory_Wagons { get; set; }

        public virtual OutgoingSostav OutgoingSostav { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WagonInternalRoutes> WagonInternalRoutes { get; set; }
    }
}
