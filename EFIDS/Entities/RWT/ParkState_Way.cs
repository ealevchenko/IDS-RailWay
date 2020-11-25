namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ParkState_Way")]
    public partial class ParkState_Way
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ParkState_Way()
        {
            ParkState_Wagon = new HashSet<ParkState_Wagon>();
        }

        public int id { get; set; }

        public int id_park_state_station { get; set; }

        public int id_way { get; set; }

        public int position { get; set; }

        [StringLength(100)]
        public string note { get; set; }

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

        //public virtual Directory_Ways Directory_Ways { get; set; }

        public virtual ParkState_Station ParkState_Station { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParkState_Wagon> ParkState_Wagon { get; set; }
    }
}
