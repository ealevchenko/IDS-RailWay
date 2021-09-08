namespace EFIDS.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IDS.InternalMovementCars")]
    public partial class InternalMovementCars
    {
        public int id { get; set; }

        public int id_sostav { get; set; }

        public long id_wim { get; set; }

        [StringLength(250)]
        public string note { get; set; }

        public DateTime create { get; set; }

        [Required]
        [StringLength(50)]
        public string create_user { get; set; }

        public virtual InternalMovementSostav InternalMovementSostav { get; set; }

        public virtual WagonInternalMovement WagonInternalMovement { get; set; }
    }
}
