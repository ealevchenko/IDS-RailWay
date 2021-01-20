namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.OutgoingSostav")]
    public partial class OutgoingSostav
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OutgoingSostav()
        {
            OutgoingCars = new HashSet<OutgoingCars>();
        }

        public long id { get; set; }

        public int num_doc { get; set; }

        public int id_station_from { get; set; }

        public int id_way_from { get; set; }

        public int? id_station_on { get; set; }

        public DateTime date_readiness_amkr { get; set; }

        public DateTime? date_end_inspection_acceptance_delivery { get; set; }

        public DateTime? date_end_inspection_loader { get; set; }

        public DateTime? date_end_inspection_vagonnik { get; set; }

        public DateTime? date_show_wagons { get; set; }

        public DateTime? date_readiness_uz { get; set; }

        public DateTime? date_outgoing { get; set; }

        public DateTime? date_outgoing_act { get; set; }

        public DateTime? date_departure { get; set; }

        [StringLength(50)]
        public string composition_index { get; set; }

        public int status { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_Station Directory_Station { get; set; }

        public virtual Directory_Station Directory_Station1 { get; set; }

        public virtual Directory_Ways Directory_Ways { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutgoingCars> OutgoingCars { get; set; }
    }
}
