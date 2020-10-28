namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.Directory_OuterWays")]
    public partial class Directory_OuterWays
    {
        public int id { get; set; }

        [Required]
        [StringLength(150)]
        public string name_outer_way_ru { get; set; }

        [Required]
        [StringLength(150)]
        public string name_outer_way_en { get; set; }

        public int id_station_from { get; set; }

        public int? id_park_from { get; set; }

        public int? id_way_from { get; set; }

        public bool? side_from { get; set; }

        public int id_station_on { get; set; }

        public int? id_park_on { get; set; }

        public int? id_way_on { get; set; }

        public bool? side_on { get; set; }

        public bool working_way { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime? change { get; set; }

        [StringLength(50)]
        public string change_user { get; set; }

        public virtual Directory_ParkWays Directory_ParkWays { get; set; }

        public virtual Directory_ParkWays Directory_ParkWays1 { get; set; }

        public virtual Directory_Station Directory_Station { get; set; }

        public virtual Directory_Station Directory_Station1 { get; set; }

        public virtual Directory_Ways Directory_Ways { get; set; }

        public virtual Directory_Ways Directory_Ways1 { get; set; }
    }
}
