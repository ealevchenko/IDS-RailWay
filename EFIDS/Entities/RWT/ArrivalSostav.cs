namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ArrivalSostav")]
    public partial class ArrivalSostav
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ArrivalSostav()
        {
            Arrival_UZ_Vagon = new HashSet<Arrival_UZ_Vagon>();
            ArrivalCars = new HashSet<ArrivalCars>();
        }

        public long id { get; set; }

        public long? id_arrived { get; set; }

        public long? id_sostav { get; set; }

        public int train { get; set; }

        [Required]
        [StringLength(50)]
        public string composition_index { get; set; }

        public DateTime date_arrival { get; set; }

        public DateTime? date_adoption { get; set; }

        public DateTime? date_adoption_act { get; set; }

        public int? id_station_from { get; set; }

        public int? id_station_on { get; set; }

        public int? id_way { get; set; }

        public bool? numeration { get; set; }

        public int? num_doc { get; set; }

        public int? count { get; set; }

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

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Arrival_UZ_Vagon> Arrival_UZ_Vagon { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ArrivalCars> ArrivalCars { get; set; }

        public virtual Directory_Station Directory_Station { get; set; }

        public virtual Directory_Station Directory_Station1 { get; set; }

        public virtual Directory_Ways Directory_Ways { get; set; }
    }
}
