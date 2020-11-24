namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ParkState_Station")]
    public partial class ParkState_Station
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ParkState_Station()
        {
            ParkState_Way = new HashSet<ParkState_Way>();
        }

        public int id { get; set; }

        public int id_station { get; set; }

        public DateTime state_on { get; set; }

        [Required]
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

        public virtual Directory_Station Directory_Station { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParkState_Way> ParkState_Way { get; set; }
    }
}
