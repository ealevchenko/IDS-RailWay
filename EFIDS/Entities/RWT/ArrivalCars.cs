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
        public long id { get; set; }

        public long? id_arrival { get; set; }

        public int num { get; set; }

        public int position { get; set; }

        public int position_arrival { get; set; }

        [StringLength(200)]
        public string note { get; set; }

        public DateTime arrival { get; set; }

        [Required]
        [StringLength(50)]
        public string arrival_user { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public DateTime change { get; set; }

        [Required]
        [StringLength(50)]
        public string change_user { get; set; }

        public virtual ArrivalSostav ArrivalSostav { get; set; }
    }
}
