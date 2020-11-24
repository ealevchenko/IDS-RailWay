namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.ParkState_Wagon")]
    public partial class ParkState_Wagon
    {
        public int id { get; set; }

        public int id_park_state_way { get; set; }

        public int num { get; set; }

        public int position { get; set; }

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

        public virtual ParkState_Way ParkState_Way { get; set; }
    }
}
